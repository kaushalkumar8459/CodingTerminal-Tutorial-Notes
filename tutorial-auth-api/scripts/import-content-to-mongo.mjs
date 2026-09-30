import { promises as fs } from "node:fs";
import { setServers } from "node:dns";
import path from "node:path";
import process from "node:process";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const currentDir = process.cwd();
const runtimeMode = process.env.NODE_ENV === "production" ? "production" : "development";

dotenv.config({ path: path.resolve(currentDir, `.env.${runtimeMode}`) });
dotenv.config();

const projectRoot = path.basename(currentDir) === "tutorial-auth-api"
  ? path.resolve(currentDir, "..")
  : currentDir;

// "coding/" and "tutorials/" both use track "javascript" for their JS base folder,
// so importing both by default would merge two unrelated curricula together.
// Pass --include-coding to also import public/coding once that overlap is resolved.
const includeCoding = process.argv.includes("--include-coding");
const sourceRoots = [
  { key: "tutorials", absolutePath: path.resolve(projectRoot, "tutorial-platform", "public", "tutorials") },
  ...(includeCoding
    ? [{ key: "coding", absolutePath: path.resolve(projectRoot, "tutorial-platform", "public", "coding") }]
    : []),
];
const uri = process.env.MONGODB_URI?.trim() || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform";
const collectionName = process.env.MONGODB_LESSONS_COLLECTION?.trim() || "codingterminallearning_lessons";
const dnsServers = (process.env.MONGODB_DNS_SERVERS?.trim() || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (uri.startsWith("mongodb+srv://")) {
  setServers(dnsServers);
}

// Base language ids, ordered longest/most-specific first so variant tracks
// (e.g. "javascriptmachinecoding", "angularinterview") resolve correctly.
const KNOWN_LANGUAGES = [
  "typescript",
  "javascript",
  "angular",
  "nextjs",
  "nodejs",
  "python",
  "react",
  "java",
];

function resolveLanguageFromTrack(track) {
  const normalized = String(track).trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const match = KNOWN_LANGUAGES.find((language) => normalized.startsWith(language));
  return match || normalized || "general";
}

function normalizeTrack(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "javascript";
}

function parseFrontmatter(markdown) {
  const normalizedMarkdown = markdown.replace(/^\uFEFF/, "");

  if (!normalizedMarkdown.startsWith("---")) {
    return { frontmatter: {}, body: normalizedMarkdown };
  }

  const endIndex = normalizedMarkdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {}, body: normalizedMarkdown };
  }

  const rawFrontmatter = normalizedMarkdown.slice(3, endIndex).trim();
  const body = normalizedMarkdown.slice(endIndex + 4).replace(/^\r?\n/, "");
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

function extractTitle(body) {
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  return "Untitled Lesson";
}

function extractDayNumber(fileName) {
  const match = fileName.match(/day-(\d{3})/i);
  return match ? Number(match[1]) : 0;
}

function extractDayLabel(fileName, title) {
  const dayMatch = fileName.match(/day-(\d{3})/i);
  if (dayMatch) {
    return `Day ${Number(dayMatch[1])}`;
  }

  const titleMatch = title.match(/Day\s+(\d+)/i);
  if (titleMatch) {
    return `Day ${Number(titleMatch[1])}`;
  }

  return "Day 1";
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "lesson";
}

async function walkMarkdownFiles(directoryPath, files = []) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      await walkMarkdownFiles(absolutePath, files);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(absolutePath);
    }
  }

  return files;
}

async function collectMarkdownFiles(root, languageFilter) {
  if (!languageFilter) {
    return walkMarkdownFiles(root.absolutePath);
  }

  if (root.key === "tutorials") {
    const languagePath = path.join(root.absolutePath, languageFilter);
    const languageDirectory = await fs.stat(languagePath).catch(() => null);
    return languageDirectory?.isDirectory() ? walkMarkdownFiles(languagePath) : [];
  }

  const entries = await fs.readdir(root.absolutePath, { withFileTypes: true });
  const languageDirectories = entries.filter(
    (entry) => entry.isDirectory() && resolveLanguageFromTrack(entry.name) === languageFilter,
  );
  const files = [];

  for (const entry of languageDirectories) {
    await walkMarkdownFiles(path.join(root.absolutePath, entry.name), files);
  }

  return files;
}

async function main() {
  try {
    const args = process.argv.slice(2);
    const languageFilter = args.find((arg) => !arg.startsWith("--"))?.trim().toLowerCase() || null;
    const includeAll = args.includes("--all");

    if (!languageFilter && !includeAll) {
      throw new Error("Specify a language (e.g. javascript) or pass --all to import every tutorial folder.");
    }

    const validRoots = [];

    for (const root of sourceRoots) {
      const rootCheck = await fs.stat(root.absolutePath).catch(() => null);
      if (rootCheck?.isDirectory()) {
        validRoots.push(root);
      } else {
        console.log(`Skipping missing source folder: ${root.absolutePath}`);
      }
    }

    if (validRoots.length === 0) {
      throw new Error("No valid source folders found (coding/tutorials).");
    }

    console.log(`Import scope: ${languageFilter || "all tutorial folders"}`);

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.createIndex({ track: 1, slug: 1 }, { unique: true });
    await collection.createIndex({ language: 1, order: 1 });

    let imported = 0;
    const importedByLanguage = new Map();

    for (const root of validRoots) {
      const files = await collectMarkdownFiles(root, languageFilter);
      const solutionBodies = new Map();

      if (root.key === "coding") {
        for (const filePath of files) {
          const relativeParts = path.relative(root.absolutePath, filePath).split(path.sep);
          const solutionsIndex = relativeParts.findIndex(
            (part, index) => index > 0 && part.toLowerCase() === "solutions",
          );

          if (solutionsIndex === -1) {
            continue;
          }

          const practiceParts = [
            ...relativeParts.slice(0, solutionsIndex),
            ...relativeParts.slice(solutionsIndex + 1),
          ];
          const practicePath = path.join(root.absolutePath, ...practiceParts);
          const solutionMarkdown = await fs.readFile(filePath, "utf8");
          solutionBodies.set(practicePath, parseFrontmatter(solutionMarkdown).body);
        }
      }

      for (const filePath of files) {
        const relativePath = path.relative(root.absolutePath, filePath).split(path.sep).join("/");
        const relativeParts = relativePath.split("/");
        if (root.key === "coding" && relativeParts.some((part) => part.toLowerCase() === "solutions")) {
          continue;
        }
        const trackSegment = relativeParts[0] ?? "javascript";
        const fileName = path.basename(filePath, ".md");
        const markdown = await fs.readFile(filePath, "utf8");
        const { frontmatter, body } = parseFrontmatter(markdown);

        const title = String(frontmatter.title || extractTitle(body)).trim();
        const slug = slugify(frontmatter.slug || fileName);
        const order = Number(frontmatter.order || extractDayNumber(fileName) || 1);
        const track = normalizeTrack(trackSegment);
        const moduleNumber = Number(frontmatter.moduleNumber ?? 0);
        const moduleSlug = String(frontmatter.moduleSlug || `module-${moduleNumber}`).trim();
        const dayLabel = String(frontmatter.dayLabel || extractDayLabel(fileName, title)).trim();
        const level = String(frontmatter.level || "Beginner").trim() || "Beginner";
        const estimatedMinutes = Number(frontmatter.estimatedMinutes || 30);
        const language = resolveLanguageFromTrack(track);

        if (languageFilter && language !== languageFilter) {
          continue;
        }

        const lessonDocument = {
          language,
          track,
          slug,
          title,
          dayLabel,
          level,
          estimatedMinutes,
          order,
          moduleNumber,
          moduleSlug,
          contentPath: `${root.key}/${relativePath}`,
          body,
          ...(solutionBodies.has(filePath) ? { solutionBody: solutionBodies.get(filePath) } : {}),
          youtubeVideos: [],
          status: "active",
          isActive: true,
          deletedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await collection.updateOne(
          { track, slug },
          { $set: lessonDocument },
          { upsert: true },
        );

        imported += 1;
        importedByLanguage.set(language, (importedByLanguage.get(language) ?? 0) + 1);
      }
    }

    console.log(`Imported ${imported} lesson documents into MongoDB (${dbName}.${collectionName})`);
    for (const [language, count] of importedByLanguage) {
      console.log(`  ${language}: ${count}`);
    }
    await client.close();
  } catch (error) {
    console.error("Import failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

main();
