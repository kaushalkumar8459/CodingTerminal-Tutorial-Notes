import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const htmlRoot = path.join(rootDir, "public", "tutorials", "html");
const tutorialsFile = path.join(rootDir, "src", "data", "tutorials.ts");
const searchIndexFile = path.join(rootDir, "public", "search-index.json");

function stripFrontmatter(markdown) {
  if (!markdown.startsWith("---")) {
    return { frontmatter: {}, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: markdown };
  }

  const frontmatter = {};
  const rawFrontmatter = markdown.slice(3, endIndex).trim();
  const body = markdown.slice(endIndex + 4).replace(/^\r?\n/, "");

  for (const line of rawFrontmatter.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    const quoted = value.match(/^"(.*)"$/);
    if (quoted) {
      value = quoted[1];
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function extractHeadings(markdownBody) {
  return markdownBody
    .split(/\r?\n/)
    .flatMap((line) => line.match(/^(##|###)\s+(.+)$/)?.[2].trim() ?? []);
}

function stripMarkdownSyntax(text) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\(([^)]+)\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function buildEntries() {
  const fileNames = (await fs.readdir(htmlRoot))
    .filter((fileName) => /^day-\d+.*\.md$/i.test(fileName))
    .sort();
  const entries = [];

  for (const fileName of fileNames) {
    const markdown = await fs.readFile(path.join(htmlRoot, fileName), "utf8");
    const { frontmatter, body } = stripFrontmatter(markdown);
    const slug = frontmatter.slug || fileName.replace(/\.md$/i, "");
    const order = Number(frontmatter.order) || Number(slug.match(/day-(\d+)/i)?.[1]) || 0;
    const contentPath = `tutorials/html/${fileName}`;

    entries.push({
      track: "html",
      slug,
      dayLabel: frontmatter.dayLabel || `Day ${order}`,
      title: frontmatter.title || slug,
      level: frontmatter.level || "Beginner",
      estimatedMinutes: Number(frontmatter.estimatedMinutes) || 30,
      order,
      fileName,
      contentPath,
      headings: extractHeadings(body),
      text: stripMarkdownSyntax(body).slice(0, 7000),
    });
  }

  entries.sort((first, second) => first.order - second.order);
  return entries;
}

async function updateTutorialsFile(entries) {
  let content = await fs.readFile(tutorialsFile, "utf8");
  const newline = content.includes("\r\n") ? "\r\n" : "\n";

  content = content.replace(/const tutorialsChunkHTML: TutorialMeta\[\] = \[[\s\S]*?\r?\n\];\r?\n\r?\n/, "");
  content = content.replace(/ {2}\.\.\.tutorialsChunkHTML,\r?\n/, "");

  const entryBlocks = entries
    .map((entry) => [
      "  {",
      `    track: "html",`,
      `    slug: ${JSON.stringify(entry.slug)},`,
      `    dayLabel: ${JSON.stringify(entry.dayLabel)},`,
      `    title: ${JSON.stringify(entry.title)},`,
      `    level: ${JSON.stringify(entry.level)},`,
      `    estimatedMinutes: ${entry.estimatedMinutes},`,
      `    order: ${entry.order},`,
      `    fileName: ${JSON.stringify(entry.fileName)},`,
      `    contentPath: ${JSON.stringify(entry.contentPath)},`,
      "  },",
    ].join(newline))
    .join(newline);

  const chunk = `const tutorialsChunkHTML: TutorialMeta[] = [${newline}${entryBlocks}${newline}];${newline}${newline}`;
  const exportMarker = /export const tutorials: TutorialMeta\[\] = \[(\r?\n)/;
  content = content.replace(
    exportMarker,
    (match) => `${chunk}${match}  ...tutorialsChunkHTML,${newline}`,
  );

  if (!/html: \[\] as TutorialMeta\[\],/.test(content)) {
    content = content.replace(
      /(angular: \[\] as TutorialMeta\[\],)/,
      "html: [] as TutorialMeta[],\n    $1",
    );
  }

  await fs.writeFile(tutorialsFile, content, "utf8");
}

async function updateSearchIndex(entries) {
  const index = JSON.parse(await fs.readFile(searchIndexFile, "utf8"));
  const withoutHTML = index.filter((item) => item.track !== "html");
  const htmlEntries = entries.map(({ headings, text, ...entry }) => ({
    ...entry,
    headings,
    text,
  }));

  await fs.writeFile(searchIndexFile, `${JSON.stringify([...withoutHTML, ...htmlEntries])}\n`, "utf8");
}

async function main() {
  const entries = await buildEntries();
  await updateTutorialsFile(entries);
  await updateSearchIndex(entries);
  console.log(`Added ${entries.length} HTML tutorial entries to tutorials.ts and search-index.json.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});