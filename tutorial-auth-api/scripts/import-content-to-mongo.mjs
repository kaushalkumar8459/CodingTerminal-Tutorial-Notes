import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const currentDir = process.cwd();
const projectRoot = path.resolve(currentDir, "..");
const sourceRoot = path.resolve(projectRoot, "tutorial-platform", "public", "coding");
const uri = process.env.MONGODB_URI?.trim() || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB_NAME?.trim() || "tutorial_platform";
const collectionName = process.env.MONGODB_LESSONS_COLLECTION?.trim() || "lessons";

function normalizeTrack(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "javascript";
}

function parseFrontmatter(markdown) {
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

async function main() {
  try {
    const rootCheck = await fs.stat(sourceRoot).catch(() => null);
    if (!rootCheck || !rootCheck.isDirectory()) {
      throw new Error(`Source folder not found: ${sourceRoot}`);
    }

    const files = await walkMarkdownFiles(sourceRoot);

    if (files.length === 0) {
      console.log(`No markdown files found under ${sourceRoot}`);
      return;
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    let imported = 0;

    for (const filePath of files) {
      const relativePath = path.relative(sourceRoot, filePath).split(path.sep).join("/");
      const relativeParts = relativePath.split("/");
      const trackSegment = relativeParts[0] ?? "javascript";
      const fileName = path.basename(filePath, ".md");
      const markdown = await fs.readFile(filePath, "utf8");
      const { frontmatter, body } = parseFrontmatter(markdown);

      const title = String(frontmatter.title || extractTitle(body)).trim();
      const slug = slugify(frontmatter.slug || fileName);
      const order = Number(frontmatter.order || extractDayNumber(fileName) || 1);
      const track = normalizeTrack(trackSegment);
      const moduleNumber = Number(frontmatter.moduleNumber || 1);
      const moduleSlug = String(frontmatter.moduleSlug || `module-${moduleNumber}`).trim();
      const dayLabel = String(frontmatter.dayLabel || extractDayLabel(fileName, title)).trim();
      const level = String(frontmatter.level || "Beginner").trim() || "Beginner";
      const estimatedMinutes = Number(frontmatter.estimatedMinutes || 30);

      const lessonDocument = {
        track,
        slug,
        title,
        dayLabel,
        level,
        estimatedMinutes,
        order,
        moduleNumber,
        moduleSlug,
        contentPath: `coding/${relativePath}`,
        body,
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
    }

    console.log(`Imported ${imported} lesson documents into MongoDB (${dbName}.${collectionName})`);
    console.log(`Source folder: ${sourceRoot}`);
    await client.close();
  } catch (error) {
    console.error("Import failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

main();
