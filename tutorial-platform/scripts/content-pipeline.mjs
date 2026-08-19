import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const tutorialsRoot = path.join(rootDir, "public", "tutorials");
const generatedTutorialsFile = path.join(
  rootDir,
  "src",
  "data",
  "tutorials.ts",
);
const searchIndexFile = path.join(rootDir, "public", "search-index.json");
const knownTracks = ["react", "nodejs", "python", "nextjs", "java"];
const lessonFilePattern = /^day-\d{3}(?:_\d+)?-.+\.md$/i;

function toPosixPath(input) {
  return input.replaceAll("\\", "/");
}

async function walkMarkdownFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(absolutePath);
    }
  }

  return files;
}

function titleFromSlug(slug) {
  return slug
    .replace(/^day-\d{3}(?:_\d+)?-/, "")
    .replace(/^nodejs-day-\d{3}(?:_\d+)?-/, "")
    .replace(/^python-day-\d{3}(?:_\d+)?-/, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/\bJsx\b/g, "JSX")
    .replace(/\bApi\b/g, "API")
    .replace(/\bDom\b/g, "DOM")
    .replace(/\bRtk\b/g, "RTK")
    .replace(/\bSsr\b/g, "SSR")
    .replace(/\bSsg\b/g, "SSG")
    .replace(/\bIsr\b/g, "ISR")
    .replace(/\bE2e\b/g, "E2E")
    .replace(/\bRhf\b/g, "RHF")
    .replace(/\bCicd\b/g, "CICD");
}

function normalizeSlug(input) {
  return String(input)
    .toLowerCase()
    .trim()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_]+|[-_]+$/g, "");
}

function deriveSlug(frontmatterSlug, fileName) {
  const fileNameSlug = normalizeSlug(fileName.replace(/\.md$/i, ""));
  const isSplitDayLesson = /^day-\d{3}_\d+-/i.test(fileName);

  if (isSplitDayLesson) {
    return fileNameSlug;
  }

  if (!frontmatterSlug) {
    return fileNameSlug;
  }

  return normalizeSlug(frontmatterSlug);
}

function isLessonMarkdownFileName(fileName) {
  return lessonFilePattern.test(fileName);
}

function detectTrackFromFileName(fileName) {
  if (fileName.startsWith("nodejs-")) {
    return "nodejs";
  }

  if (fileName.startsWith("python-")) {
    return "python";
  }

  return "react";
}

function deriveLevel(titleLine) {
  const match = titleLine.match(/\[(Beginner|Intermediate|Advanced)\]/i);
  return (match?.[1] ?? "Beginner").replace(/^./, (s) => s.toUpperCase());
}

function deriveDayLabel(titleLine, slug, fallbackOrder) {
  const fromSplitSlug = slug.match(/day-(\d{3})_(\d+)/i);
  if (fromSplitSlug) {
    return `Day ${Number(fromSplitSlug[1])}_${fromSplitSlug[2]}`;
  }

  const fromTitle = titleLine.match(/^#\s*Day\s+(\d+)/i);
  if (fromTitle) {
    return `Day ${Number(fromTitle[1])}`;
  }

  const fromSlug = slug.match(/day-(\d{3})/i);
  if (fromSlug) {
    return `Day ${Number(fromSlug[1])}`;
  }

  return `Day ${fallbackOrder}`;
}

function deriveStoredDayLabel(
  frontmatterDayLabel,
  titleLine,
  slug,
  fallbackOrder,
  fileName,
) {
  if (/^day-\d{3}_\d+-/i.test(fileName)) {
    return deriveDayLabel(titleLine, slug, fallbackOrder);
  }

  return String(
    frontmatterDayLabel || deriveDayLabel(titleLine, slug, fallbackOrder),
  ).trim();
}

function deriveOrder(slug, fallbackOrder) {
  const match = slug.match(/day-(\d{3})/i);
  if (match) {
    return Number(match[1]);
  }

  return fallbackOrder;
}

function deriveEstimatedMinutes(title) {
  const normalized = title.toLowerCase();

  if (
    normalized.includes("mini project") ||
    normalized.includes("capstone") ||
    normalized.includes("simulation")
  ) {
    return 45;
  }

  if (
    normalized.includes("review") ||
    normalized.includes("architecture") ||
    normalized.includes("readiness")
  ) {
    return 35;
  }

  return 30;
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
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function extractTitleFromHeading(markdownBody, fallback) {
  const firstHeading = markdownBody.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (!firstHeading) {
    return fallback;
  }

  const fromColon = firstHeading.split(":").slice(1).join(":").trim();
  if (fromColon) {
    return fromColon;
  }

  const withoutLevelTag = firstHeading
    .replace(/\[(Beginner|Intermediate|Advanced)\]/i, "")
    .trim();
  return withoutLevelTag || fallback;
}

function extractHeadings(markdownBody) {
  const headings = [];
  for (const line of markdownBody.split(/\r?\n/)) {
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) {
      continue;
    }
    headings.push({ level: match[1] === "##" ? 2 : 3, text: match[2].trim() });
  }
  return headings;
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/["'`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractMarkdownLinks(markdownBody) {
  const markdownWithoutCode = markdownBody
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ");

  const links = [];
  const regex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match = regex.exec(markdownWithoutCode);

  while (match) {
    links.push(match[1]);
    match = regex.exec(markdownWithoutCode);
  }

  return links;
}

async function listMarkdownFilesByTrack() {
  const entries = await fs.readdir(tutorialsRoot, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const track = entry.name;
      const trackDir = path.join(tutorialsRoot, track);
      const markdownFiles = await walkMarkdownFiles(trackDir);

      for (const absolutePath of markdownFiles) {
        const fileName = path.basename(absolutePath);

        if (!isLessonMarkdownFileName(fileName)) {
          continue;
        }

        files.push({
          track,
          fileName,
          absolutePath,
          relativePath: toPosixPath(
            path.relative(path.join(rootDir, "public"), absolutePath),
          ),
        });
      }
      continue;
    }

    if (
      entry.name.toLowerCase().endsWith(".md") &&
      isLessonMarkdownFileName(entry.name)
    ) {
      const absolutePath = path.join(tutorialsRoot, entry.name);
      const stats = await fs.stat(absolutePath);

      if (!stats.isFile()) {
        continue;
      }

      const track = detectTrackFromFileName(entry.name);
      files.push({
        track,
        fileName: entry.name,
        absolutePath,
        relativePath: toPosixPath(
          path.relative(path.join(rootDir, "public"), absolutePath),
        ),
      });
    }
  }

  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

async function ensureTrackFolders() {
  for (const track of knownTracks) {
    await fs.mkdir(path.join(tutorialsRoot, track), { recursive: true });
  }
}

async function migrateTutorialFolders() {
  await ensureTrackFolders();
  const entries = await fs.readdir(tutorialsRoot, { withFileTypes: true });
  let movedCount = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".md")) {
      continue;
    }

    const track = detectTrackFromFileName(entry.name);
    const fromPath = path.join(tutorialsRoot, entry.name);
    const toPath = path.join(tutorialsRoot, track, entry.name);

    await fs.rename(fromPath, toPath);
    movedCount += 1;
  }

  return movedCount;
}

async function upsertFrontmatter() {
  const files = await listMarkdownFilesByTrack();
  let updatedCount = 0;

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const markdown = await fs.readFile(file.absolutePath, "utf8");
    const { frontmatter, body } = stripFrontmatter(markdown);
    const slug = deriveSlug(frontmatter.slug, file.fileName);
    const extractedTitle = extractTitleFromHeading(body, titleFromSlug(slug));
    const level =
      String(frontmatter.level || deriveLevel(markdown)).trim() || "Beginner";
    const order = Number(frontmatter.order || deriveOrder(slug, index + 1));
    const dayLabel = deriveStoredDayLabel(
      frontmatter.dayLabel,
      markdown,
      slug,
      order,
      file.fileName,
    );
    const estimatedMinutes = Number(
      frontmatter.estimatedMinutes || deriveEstimatedMinutes(extractedTitle),
    );
    const track = file.track;

    const nextFrontmatter = [
      "---",
      `title: ${extractedTitle}`,
      `slug: ${slug}`,
      `dayLabel: ${dayLabel}`,
      `level: ${level}`,
      `estimatedMinutes: ${estimatedMinutes}`,
      `order: ${order}`,
      `track: ${track}`,
      "---",
      "",
    ].join("\n");

    const nextContent = `${nextFrontmatter}${body.replace(/^\s+/, "")}`;
    await fs.writeFile(file.absolutePath, nextContent, "utf8");
    updatedCount += 1;
  }

  return updatedCount;
}

async function collectTutorialEntries() {
  const files = await listMarkdownFilesByTrack();
  const entries = [];

  for (const file of files) {
    const markdown = await fs.readFile(file.absolutePath, "utf8");
    const { frontmatter, body } = stripFrontmatter(markdown);

    const slug = deriveSlug(frontmatter.slug, file.fileName);
    const title = String(
      frontmatter.title || extractTitleFromHeading(body, titleFromSlug(slug)),
    ).trim();
    const track = file.track;
    const level = String(frontmatter.level || "Beginner").trim();
    const dayLabel = deriveStoredDayLabel(
      frontmatter.dayLabel,
      markdown,
      slug,
      1,
      file.fileName,
    );
    const estimatedMinutes = Number(
      frontmatter.estimatedMinutes || deriveEstimatedMinutes(title),
    );
    const order = Number(frontmatter.order || deriveOrder(slug, 1));

    entries.push({
      track,
      slug,
      dayLabel,
      title,
      level,
      estimatedMinutes,
      order,
      fileName: file.fileName,
      contentPath: file.relativePath,
      body,
      absolutePath: file.absolutePath,
    });
  }

  entries.sort((a, b) => {
    if (a.track !== b.track) {
      return a.track.localeCompare(b.track);
    }
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.slug.localeCompare(b.slug);
  });

  return entries;
}

async function generateTutorialDataFile() {
  const entries = await collectTutorialEntries();
  const lines = [];
  const trackKeys = [...new Set(entries.map((entry) => entry.track))].sort();

  lines.push('import type { TutorialMeta } from "../types/tutorial";');
  lines.push("");
  lines.push("export const tutorials: TutorialMeta[] = [");

  for (const entry of entries) {
    lines.push("  {");
    lines.push(`    track: "${entry.track}",`);
    lines.push(`    slug: "${entry.slug}",`);
    lines.push(`    dayLabel: "${entry.dayLabel}",`);
    lines.push(`    title: "${entry.title.replaceAll('"', '\\"')}",`);
    lines.push(`    level: "${entry.level}",`);
    lines.push(`    estimatedMinutes: ${entry.estimatedMinutes},`);
    lines.push(`    order: ${entry.order},`);
    lines.push(`    fileName: "${entry.fileName}",`);
    lines.push(`    contentPath: "${entry.contentPath}",`);
    lines.push("  },");
  }

  lines.push("];\n");
  lines.push("const tutorialsByTrack = tutorials.reduce(");
  lines.push("  (accumulator, tutorial) => {");
  lines.push("    const trackList = accumulator[tutorial.track] ?? [];");
  lines.push("    trackList.push(tutorial);");
  lines.push("    accumulator[tutorial.track] = trackList;");
  lines.push("    return accumulator;");
  lines.push("  },");
  lines.push("  {");
  for (const trackKey of trackKeys) {
    lines.push(`    ${trackKey}: [] as TutorialMeta[],`);
  }
  lines.push("  },");
  lines.push(");\n");
  lines.push("const tutorialByTrackAndSlug = tutorials.reduce(");
  lines.push("  (accumulator, tutorial) => {");
  lines.push(
    "    accumulator.set(`${tutorial.track}::${tutorial.slug}`, tutorial);",
  );
  lines.push("    return accumulator;");
  lines.push("  },");
  lines.push("  new Map<string, TutorialMeta>(),");
  lines.push(");\n");
  lines.push(
    'export function getTutorialsByTrack(track: TutorialMeta["track"]) {',
  );
  lines.push("  return tutorialsByTrack[track];");
  lines.push("}\n");
  lines.push(
    'export function getTutorialBySlug(track: TutorialMeta["track"], slug: string) {',
  );
  lines.push("  return tutorialByTrackAndSlug.get(`${track}::${slug}`);");
  lines.push("}");

  await fs.writeFile(generatedTutorialsFile, `${lines.join("\n")}\n`, "utf8");
  return entries;
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

async function generateSearchIndex(entries) {
  const index = entries.map((entry) => {
    const headings = extractHeadings(entry.body).map((heading) => heading.text);
    const plainText = stripMarkdownSyntax(entry.body).slice(0, 7000);

    return {
      track: entry.track,
      slug: entry.slug,
      title: entry.title,
      dayLabel: entry.dayLabel,
      level: entry.level,
      estimatedMinutes: entry.estimatedMinutes,
      order: entry.order,
      contentPath: entry.contentPath,
      headings,
      text: plainText,
    };
  });

  await fs.writeFile(searchIndexFile, `${JSON.stringify(index)}\n`, "utf8");
}

async function validateContent(entries) {
  const issues = [];
  const slugMap = new Map();

  for (const entry of entries) {
    const uniqueKey = `${entry.track}::${entry.slug}`;

    if (slugMap.has(uniqueKey)) {
      issues.push(`Duplicate slug in same track: ${entry.track}/${entry.slug}`);
    }
    slugMap.set(uniqueKey, true);

    if (!entry.title) {
      issues.push(`Missing title in frontmatter: ${entry.contentPath}`);
    }
    if (!entry.dayLabel) {
      issues.push(`Missing dayLabel in frontmatter: ${entry.contentPath}`);
    }
    if (!entry.level) {
      issues.push(`Missing level in frontmatter: ${entry.contentPath}`);
    }
    if (!entry.track) {
      issues.push(`Missing track in frontmatter: ${entry.contentPath}`);
    }

    const h1Exists = /^#\s+.+/m.test(entry.body);
    if (!h1Exists) {
      issues.push(`Missing H1 heading: ${entry.contentPath}`);
    }

    const headingSet = new Set(
      extractHeadings(entry.body).map((heading) =>
        slugifyHeading(heading.text),
      ),
    );
    const links = extractMarkdownLinks(entry.body);

    for (const link of links) {
      if (/^(https?:|mailto:|tel:)/i.test(link)) {
        continue;
      }

      if (link.startsWith("#")) {
        const hash = slugifyHeading(link.slice(1));
        if (!headingSet.has(hash)) {
          issues.push(`Broken hash link ${link} in ${entry.contentPath}`);
        }
        continue;
      }

      const [linkPath, hashPart] = link.split("#");
      const resolvedPath = path.resolve(
        path.dirname(entry.absolutePath),
        linkPath,
      );

      try {
        const stats = await fs.stat(resolvedPath);
        if (!stats.isFile()) {
          issues.push(
            `Linked path is not a file: ${link} in ${entry.contentPath}`,
          );
        } else if (hashPart) {
          const linkedMarkdown = await fs.readFile(resolvedPath, "utf8");
          const linkedBody = stripFrontmatter(linkedMarkdown).body;
          const linkedHeadings = new Set(
            extractHeadings(linkedBody).map((heading) =>
              slugifyHeading(heading.text),
            ),
          );
          const normalizedHash = slugifyHeading(hashPart);
          if (!linkedHeadings.has(normalizedHash)) {
            issues.push(`Broken linked hash ${link} in ${entry.contentPath}`);
          }
        }
      } catch {
        issues.push(`Broken file link ${link} in ${entry.contentPath}`);
      }
    }
  }

  if (issues.length > 0) {
    console.error("Content validation failed:\n");
    for (const issue of issues) {
      console.error(`- ${issue}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validation passed for ${entries.length} tutorial files.`);
}

async function run() {
  const command = process.argv[2] ?? "sync";

  if (!command || command === "sync") {
    const moved = await migrateTutorialFolders();
    const updated = await upsertFrontmatter();
    const entries = await generateTutorialDataFile();
    await generateSearchIndex(entries);
    await validateContent(entries);
    console.log(`Moved ${moved} files into track folders.`);
    console.log(`Updated frontmatter in ${updated} files.`);
    console.log(`Generated tutorial metadata for ${entries.length} files.`);
    return;
  }

  if (command === "validate") {
    const entries = await collectTutorialEntries();
    await validateContent(entries);
    return;
  }

  if (command === "generate") {
    const entries = await generateTutorialDataFile();
    await generateSearchIndex(entries);
    console.log(
      `Generated tutorial metadata and search index for ${entries.length} files.`,
    );
    return;
  }

  if (command === "frontmatter") {
    const updated = await upsertFrontmatter();
    console.log(`Updated frontmatter in ${updated} files.`);
    return;
  }

  if (command === "migrate") {
    const moved = await migrateTutorialFolders();
    console.log(`Moved ${moved} files into track folders.`);
    return;
  }

  console.error(`Unknown command: ${command}`);
  process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
