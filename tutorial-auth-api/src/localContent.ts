import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { appConfig, resolveLanguageFromTrack } from "./config.js";
import type { TutorialLessonDocument } from "./contentDb.js";

type LocalTutorialSource = {
  track: string;
  roots: string[];
};

// Add each frontend track and its local content folders here.
export const LOCAL_TUTORIAL_CATALOG: LocalTutorialSource[] = [
  { track: "javascript", roots: ["tutorials/javascript", "coding/JavaScript"] },
  { track: "javascriptproblemsolving", roots: ["coding/JavaScriptProblemSolving"] },
  { track: "javascriptrealinterview", roots: ["coding/JavaScriptRealInterview"] },
  { track: "javascriptbrowser", roots: ["coding/JavaScriptBrowser"] },
  { track: "javascriptinterviewrevision", roots: ["coding/JavaScriptInterviewRevision"] },
  { track: "javascriptmachinecoding", roots: ["coding/JavaScriptMachineCoding"] },
  { track: "typescript", roots: ["coding/TypeScript"] },
  { track: "java", roots: ["tutorials/java", "coding/Java"] },
  { track: "react", roots: ["tutorials/react"] },
  { track: "angular", roots: ["tutorials/angular/modules"] },
  { track: "angularinterview", roots: ["tutorials/angular/interview"] },
  { track: "nodejs", roots: ["tutorials/nodejs", "coding/NodeJS"] },
  { track: "python", roots: ["tutorials/python"] },
  { track: "nextjs", roots: ["tutorials/nextjs"] },
  { track: "html", roots: ["tutorials/html"] },
  { track: "htmlinterview", roots: ["coding/htmlinterview"] },
];

type Frontmatter = Record<string, string>;

let lessonIndexPromise: Promise<Map<string, TutorialLessonDocument[]>> | null = null;

function parseMarkdown(markdown: string) {
  const normalized = markdown.replace(/^\uFEFF/, "");
  const frontmatterMatch = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const frontmatter: Frontmatter = {};

  if (!frontmatterMatch) {
    return { frontmatter, body: normalized };
  }

  for (const line of frontmatterMatch[1].split(/\r?\n/)) {
    if (/^\s/.test(line)) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    frontmatter[key] = value.replace(/^(["'])(.*)\1$/, "$2");
  }

  return {
    frontmatter,
    body: normalized.slice(frontmatterMatch[0].length),
  };
}

function getDayNumber(fileName: string) {
  return Number(fileName.match(/^day-(\d+)/i)?.[1] ?? 0);
}

function getTitle(frontmatter: Frontmatter, body: string, slug: string) {
  if (frontmatter.title) return frontmatter.title;

  const heading = body.match(/^#\s*Day\s*\d+\s*(?:\[[^\]]+\]\s*)?(?:[—–:-]\s*)?(.+)$/m)?.[1];
  if (heading) return heading.trim();

  return slug
    .replace(/^day-\d+(?:[_-]\d+)?[-_]?/i, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function collectMarkdownFiles(directory: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files: string[] = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "solutions") continue;
      files.push(...await collectMarkdownFiles(path.join(directory, entry.name)));
    } else if (
      entry.isFile() &&
      /^day-\d+(?:[_-]\d+)?(?:[-_].+)?\.md$/i.test(entry.name)
    ) {
      files.push(path.join(directory, entry.name));
    }
  }
  return files;
}

async function readLessonFile(
  track: string,
  filePath: string,
): Promise<TutorialLessonDocument> {
  const markdown = await readFile(filePath, "utf8");
  const { frontmatter, body } = parseMarkdown(markdown);
  const fileName = path.basename(filePath);
  const slug = frontmatter.slug || fileName.replace(/\.md$/i, "");
  const relativePath = path.relative(appConfig.content.localRoot, filePath).split(path.sep).join("/");
  const moduleMatch = relativePath.match(/(?:^|\/)modules\/(\d+)-([^/]+)/i);
  const modifiedAt = (await stat(filePath)).mtime;
  const order = Number(frontmatter.order) || getDayNumber(fileName);

  const lesson: TutorialLessonDocument = {
    language: resolveLanguageFromTrack(track),
    track,
    slug,
    title: getTitle(frontmatter, body, slug),
    dayLabel: frontmatter.dayLabel || `Day ${getDayNumber(fileName)}`,
    level: (frontmatter.level as TutorialLessonDocument["level"]) || "Beginner",
    estimatedMinutes: Number(frontmatter.estimatedMinutes) || 30,
    order,
    moduleNumber: Number(frontmatter.moduleNumber) || Number(moduleMatch?.[1]) || 0,
    moduleSlug: frontmatter.moduleSlug || moduleMatch?.[2] || "module-0",
    contentPath: relativePath,
    body,
    youtubeVideos: [],
    createdAt: modifiedAt,
    updatedAt: modifiedAt,
  };

  const solutionPath = path.join(path.dirname(filePath), "solutions", fileName);
  try {
    lesson.solutionBody = (await readFile(solutionPath, "utf8")).replace(/^\uFEFF/, "");
  } catch {
    // Tutorials without separate solution files simply omit solutionBody.
  }

  return lesson;
}

async function buildLessonIndex() {
  const lessonsByTrack = new Map<string, TutorialLessonDocument[]>();
  const seen = new Set<string>();

  for (const source of LOCAL_TUTORIAL_CATALOG) {
    for (const root of source.roots) {
      const rootPath = path.resolve(appConfig.content.localRoot, root);
      for (const filePath of await collectMarkdownFiles(rootPath)) {
        const lesson = await readLessonFile(source.track, filePath);
        const key = `${lesson.track}::${lesson.slug}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const trackLessons = lessonsByTrack.get(source.track) ?? [];
        trackLessons.push(lesson);
        lessonsByTrack.set(source.track, trackLessons);
      }
    }
  }

  for (const lessons of lessonsByTrack.values()) {
    lessons.sort((left, right) => left.order - right.order || left.slug.localeCompare(right.slug));
  }
  return lessonsByTrack;
}

async function getLessonIndex() {
  if (!lessonIndexPromise) {
    lessonIndexPromise = buildLessonIndex();
  }
  try {
    return await lessonIndexPromise;
  } catch (error) {
    lessonIndexPromise = null;
    throw error;
  }
}

export async function findLocalLessonByTrackAndSlug(track: string, slug: string) {
  const lessonsByTrack = await getLessonIndex();
  return lessonsByTrack.get(track)?.find((lesson) => lesson.slug === slug) ?? null;
}

export async function findLocalLessonsByTrack(track: string) {
  const lessonsByTrack = await getLessonIndex();
  return lessonsByTrack.get(track) ?? [];
}