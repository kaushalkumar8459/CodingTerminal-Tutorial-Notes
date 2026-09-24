import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const interviewRoot = path.join(rootDir, "public", "tutorials", "angular", "interview");
const tutorialsFile = path.join(rootDir, "src", "data", "tutorials.ts");
const searchIndexFile = path.join(rootDir, "public", "search-index.json");

function toPosixPath(input) {
  return input.replaceAll("\\", "/");
}

function extractTitle(body, fallback) {
  const topicMatch = body.match(/^##\s*Topic\s*\n+\s*\*\*(.+?)\*\*/m);
  if (topicMatch) {
    return topicMatch[1].trim();
  }

  const h1Match = body.match(/^#\s*(.+)$/m);
  if (!h1Match) {
    return fallback;
  }

  let text = h1Match[1].trim();
  text = text.replace(/^Day\s+\d+\s*/i, "");
  text = text.replace(/^Interview Questions\s*/i, "");
  text = text.replace(/^[—-]\s*/, "");
  text = text.replace(/^Interview Questions\s*/i, "");
  text = text.replace(/^[—-]\s*/, "");
  return text.trim() || fallback;
}

function extractHeadings(body) {
  const headings = [];
  for (const line of body.split(/\r?\n/)) {
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

async function buildEntries() {
  const fileNames = (await fs.readdir(interviewRoot)).filter((name) =>
    /^day-\d{3}(-alt)?\.md$/i.test(name),
  );

  const entries = [];

  for (const fileName of fileNames.sort()) {
    const absolutePath = path.join(interviewRoot, fileName);
    const body = await fs.readFile(absolutePath, "utf8");
    const match = fileName.match(/^day-(\d{3})(-alt)?\.md$/i);
    const dayNumber = Number(match[1]);
    const isAlt = Boolean(match[2]);
    const slug = fileName.replace(/\.md$/i, "");
    const dayLabel = `Day ${dayNumber}`;
    const fallbackTitle = isAlt
      ? `Day ${dayNumber} Interview Questions (Alternate)`
      : `Day ${dayNumber} Interview Questions`;
    const title = extractTitle(body, fallbackTitle);

    entries.push({
      track: "angularinterview",
      slug,
      dayLabel,
      title: isAlt ? `${title} (Alternate)` : title,
      level: "Beginner",
      estimatedMinutes: 20,
      order: isAlt ? dayNumber * 10 + 1 : dayNumber * 10,
      fileName,
      contentPath: toPosixPath(
        path.relative(path.join(rootDir, "public"), absolutePath),
      ),
      headings: extractHeadings(body),
      text: stripMarkdownSyntax(body).slice(0, 7000),
    });
  }

  entries.sort((a, b) => a.order - b.order);
  return entries;
}

async function updateTutorialsFile(entries) {
  let content = await fs.readFile(tutorialsFile, "utf8");

  content = content.replace(/ {2}\{\n {4}track: "angularinterview",[\s\S]*?\n {2}\},\n/g, "");
  content = content.replace(/const tutorialsChunkAngularInterview: TutorialMeta\[\] = \[[\s\S]*?\n\];\n\n/, "");
  content = content.replace(/ {2}\.\.\.tutorialsChunkAngularInterview,\n/, "");

  const entryBlocks = entries
    .map((entry) => {
      const escapedTitle = entry.title.replaceAll('"', '\\"');
      return [
        "  {",
        `    track: "angularinterview",`,
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

  const chunkDeclaration = `const tutorialsChunkAngularInterview: TutorialMeta[] = [\n${entryBlocks}\n];\n\n`;
  const exportMarker = "export const tutorials: TutorialMeta[] = [\n";
  content = content.replace(
    exportMarker,
    `${chunkDeclaration}${exportMarker}  ...tutorialsChunkAngularInterview,\n`,
  );

  if (!/angularinterview: \[\] as TutorialMeta\[\],/.test(content)) {
    content = content.replace(
      /(java: \[\] as TutorialMeta\[\],)/,
      "angularinterview: [] as TutorialMeta[],\n    $1",
    );
  }

  await fs.writeFile(tutorialsFile, content, "utf8");
}

async function updateSearchIndex(entries) {
  const raw = await fs.readFile(searchIndexFile, "utf8");
  const index = JSON.parse(raw);
  const withoutTrack = index.filter((item) => item.track !== "angularinterview");

  const searchEntries = entries.map((entry) => ({
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

  const merged = [...withoutTrack, ...searchEntries];
  await fs.writeFile(searchIndexFile, `${JSON.stringify(merged)}\n`, "utf8");
}

// NOTE: tutorials.ts is split into tutorialsChunkN consts because a single huge
// object-literal array trips TypeScript's TS2590 (union type too complex) once
// entry count gets into the thousands. If this script pushes the total high
// enough to hit that again, re-chunk the objects array into ~150-entry const
// arrays spread into the final `tutorials` export.
async function main() {
  const entries = await buildEntries();
  await updateTutorialsFile(entries);
  await updateSearchIndex(entries);
  console.log(`Added ${entries.length} Angular Interview tutorial entries to tutorials.ts and search-index.json.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
