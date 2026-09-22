import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const modulesRoot = path.join(rootDir, "public", "tutorials", "angular", "modules");
const tutorialsFile = path.join(rootDir, "src", "data", "tutorials.ts");
const searchIndexFile = path.join(rootDir, "public", "search-index.json");

function toPosixPath(input) {
  return input.replaceAll("\\", "/");
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith("---")) {
    return { frontmatter: {}, body: markdown };
  }
  const endIndex = markdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: markdown };
  }
  const rawFrontmatter = markdown.slice(3, endIndex).trim();
  const body = markdown.slice(endIndex + 4).replace(/^\r?\n/, "");
  const frontmatter = {};

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
  const headings = [];
  for (const line of markdownBody.split(/\r?\n/)) {
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (match) {
      headings.push(match[2].trim());
    }
  }
  return headings;
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

async function walkModuleDayFiles() {
  const moduleDirs = (await fs.readdir(modulesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const files = [];
  for (const moduleDir of moduleDirs) {
    const daysDir = path.join(modulesRoot, moduleDir, "days");
    let dayFiles;
    try {
      dayFiles = await fs.readdir(daysDir);
    } catch {
      continue;
    }
    for (const fileName of dayFiles.sort()) {
      if (!/^day-\d{3}.*\.md$/i.test(fileName)) {
        continue;
      }
      files.push({
        absolutePath: path.join(daysDir, fileName),
        contentPath: toPosixPath(
          path.relative(path.join(rootDir, "public"), path.join(daysDir, fileName)),
        ),
        fileName,
      });
    }
  }
  return files;
}

async function buildEntries() {
  const files = await walkModuleDayFiles();
  const entries = [];

  for (const file of files) {
    const markdown = await fs.readFile(file.absolutePath, "utf8");
    const { frontmatter, body } = stripFrontmatter(markdown);

    const slug = frontmatter.slug || file.fileName.replace(/\.md$/i, "");
    const order = Number(frontmatter.order) || Number(slug.match(/day-(\d{3})/i)?.[1]) || 0;
    const dayLabel = frontmatter.dayLabel || `Day ${order}`;
    const title = frontmatter.title || slug;
    const level = frontmatter.level || "Beginner";
    const estimatedMinutes = Number(frontmatter.estimatedMinutes) || 60;

    entries.push({
      track: "angular",
      slug,
      dayLabel,
      title,
      level,
      estimatedMinutes,
      order,
      fileName: file.fileName,
      contentPath: file.contentPath,
      headings: extractHeadings(body),
      text: stripMarkdownSyntax(body).slice(0, 7000),
    });
  }

  entries.sort((a, b) => a.order - b.order);
  return entries;
}

async function updateTutorialsFile(entries) {
  let content = await fs.readFile(tutorialsFile, "utf8");

  // Remove any existing angular entries for idempotency.
  content = content.replace(/ {2}\{\n {4}track: "angular",[\s\S]*?\n {2}\},\n/g, "");

  const entryBlocks = entries
    .map((entry) => {
      const escapedTitle = entry.title.replaceAll('"', '\\"');
      return [
        "  {",
        `    track: "angular",`,
        `    slug: "${entry.slug}",`,
        `    dayLabel: "${entry.dayLabel}",`,
        `    title: "${escapedTitle}",`,
        `    level: "${entry.level}",`,
        `    estimatedMinutes: ${entry.estimatedMinutes},`,
        `    order: ${entry.order},`,
        `    fileName: "${entry.fileName}",`,
        `    contentPath: "${entry.contentPath}",`,
        "  },",
      ].join("\n");
    })
    .join("\n");

  content = content.replace(/\n\];/, `\n${entryBlocks}\n];`);

  if (!/angular: \[\] as TutorialMeta\[\],/.test(content)) {
    content = content.replace(
      /(java: \[\] as TutorialMeta\[\],)/,
      "angular: [] as TutorialMeta[],\n    $1",
    );
  }

  await fs.writeFile(tutorialsFile, content, "utf8");
}

async function updateSearchIndex(entries) {
  const raw = await fs.readFile(searchIndexFile, "utf8");
  const index = JSON.parse(raw);
  const withoutAngular = index.filter((item) => item.track !== "angular");

  const angularSearchEntries = entries.map((entry) => ({
    track: entry.track,
    slug: entry.slug,
    title: entry.title,
    dayLabel: entry.dayLabel,
    level: entry.level,
    estimatedMinutes: entry.estimatedMinutes,
    order: entry.order,
    contentPath: entry.contentPath,
    headings: entry.headings,
    text: entry.text,
  }));

  const merged = [...withoutAngular, ...angularSearchEntries];
  await fs.writeFile(searchIndexFile, `${JSON.stringify(merged)}\n`, "utf8");
}

async function main() {
  const entries = await buildEntries();
  await updateTutorialsFile(entries);
  await updateSearchIndex(entries);
  console.log(`Added ${entries.length} Angular tutorial entries to tutorials.ts and search-index.json.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
