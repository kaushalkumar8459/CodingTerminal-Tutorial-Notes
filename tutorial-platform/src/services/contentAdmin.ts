import type { TutorialMeta, TutorialVideo } from "../types/tutorial";

export type TutorialDocument = {
  title: string;
  slug: string;
  dayLabel: string;
  level: TutorialMeta["level"];
  estimatedMinutes: number;
  order: number;
  track: TutorialMeta["track"];
  body: string;
  contentPath: string;
  fileName: string;
  youtubeVideos: TutorialVideo[];
};

type SaveTutorialResult = {
  ok: boolean;
  message: string;
};

const contentApiBaseUrl =
  import.meta.env.VITE_CONTENT_API_BASE_URL?.trim() ?? "";
const LESSON_DOCUMENT_CACHE_TTL_MS = 5 * 60 * 1000;
const lessonDocumentCache = new Map<
  string,
  { expiresAt: number; document: TutorialDocument }
>();

export function clearLessonDocumentCache() {
  lessonDocumentCache.clear();
}

export function parseFrontmatter(markdown: string) {
  const normalizedMarkdown = markdown.replace(/^\uFEFF/, "");

  if (!normalizedMarkdown.startsWith("---")) {
    return { frontmatter: {} as Record<string, string>, body: normalizedMarkdown };
  }

  const endIndex = normalizedMarkdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {} as Record<string, string>, body: normalizedMarkdown };
  }

  const rawFrontmatter = normalizedMarkdown.slice(3, endIndex).trim();
  const body = normalizedMarkdown.slice(endIndex + 4).replace(/^\r?\n/, "");
  const frontmatter: Record<string, string> = {};

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

function normalizeVideoEntry(video: Partial<TutorialVideo>) {
  const title = video.title?.trim() ?? "";
  const url = video.url?.trim() ?? "";
  const description = video.description?.trim() ?? "";

  if (!title || !url) {
    return null;
  }

  return {
    title,
    url,
    ...(description ? { description } : {}),
  };
}

export function parseYouTubeVideosField(
  rawValue: string | undefined,
): TutorialVideo[] {
  if (!rawValue?.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => normalizeVideoEntry(item as Partial<TutorialVideo>))
      .filter((item): item is TutorialVideo => Boolean(item));
  } catch {
    return rawValue
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title = "", url = "", description = ""] = line
          .split("|")
          .map((part) => part.trim());
        return normalizeVideoEntry({ title, url, description });
      })
      .filter((item): item is TutorialVideo => Boolean(item));
  }
}

export function formatYouTubeVideoList(videos: TutorialVideo[]) {
  return videos
    .map((video) =>
      [video.title, video.url, video.description ?? ""]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" | "),
    )
    .join("\n");
}

function serializeYouTubeVideos(videos: TutorialVideo[]) {
  return JSON.stringify(
    videos
      .map((video) => normalizeVideoEntry(video))
      .filter((item): item is TutorialVideo => Boolean(item)),
  );
}

function buildFrontmatter(document: TutorialDocument) {
  return [
    "---",
    `title: ${document.title}`,
    `slug: ${document.slug}`,
    `dayLabel: ${document.dayLabel}`,
    `level: ${document.level}`,
    `estimatedMinutes: ${document.estimatedMinutes}`,
    `order: ${document.order}`,
    `track: ${document.track}`,
    `youtubeVideos: ${serializeYouTubeVideos(document.youtubeVideos)}`,
    "---",
    "",
    document.body,
  ].join("\n");
}

export async function loadTutorialDocument(
  tutorial: TutorialMeta,
): Promise<TutorialDocument> {
  const cacheKey = `${tutorial.track}::${tutorial.slug}`;
  const cachedEntry = lessonDocumentCache.get(cacheKey);

  if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
    return cachedEntry.document;
  }

  if (cachedEntry) {
    lessonDocumentCache.delete(cacheKey);
  }

  if (!contentApiBaseUrl) {
    throw new Error("VITE_CONTENT_API_BASE_URL is not configured.");
  }

  const apiUrl = `${contentApiBaseUrl}/api/lessons?track=${encodeURIComponent(tutorial.track)}&slug=${encodeURIComponent(tutorial.slug)}`;
  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status} for ${tutorial.slug}.`);
  }

  const payload = (await response.json()) as {
    lesson?: Partial<TutorialDocument> & { body?: string } | null;
  };
  const lesson = payload.lesson;

  if (!lesson?.body) {
    throw new Error(`No backend content found for ${tutorial.track}/${tutorial.slug}.`);
  }

  const { frontmatter, body } = parseFrontmatter(lesson.body);

  const document: TutorialDocument = {
    title: frontmatter.title ?? lesson.title ?? tutorial.title,
    slug: frontmatter.slug ?? lesson.slug ?? tutorial.slug,
    dayLabel: frontmatter.dayLabel ?? lesson.dayLabel ?? tutorial.dayLabel,
    level:
      (frontmatter.level as TutorialMeta["level"]) ??
      (lesson.level as TutorialMeta["level"]) ??
      tutorial.level,
    estimatedMinutes: Number(
      frontmatter.estimatedMinutes ??
        lesson.estimatedMinutes ??
        tutorial.estimatedMinutes,
    ),
    order: Number(frontmatter.order ?? lesson.order ?? tutorial.order),
    track:
      (frontmatter.track as TutorialMeta["track"]) ??
      (lesson.track as TutorialMeta["track"]) ??
      tutorial.track,
    body,
    contentPath: lesson.contentPath ?? tutorial.contentPath,
    fileName: lesson.fileName ?? tutorial.fileName,
    youtubeVideos: parseYouTubeVideosField(frontmatter.youtubeVideos),
  };

  lessonDocumentCache.set(cacheKey, {
    expiresAt: Date.now() + LESSON_DOCUMENT_CACHE_TTL_MS,
    document,
  });

  return document;
}

export async function loadCodingLessonMarkdown(
  lesson: { track: string; slug: string },
  mode: "practice" | "solution",
): Promise<string> {
  if (!contentApiBaseUrl) {
    throw new Error("VITE_CONTENT_API_BASE_URL is not configured.");
  }

  const apiUrl = `${contentApiBaseUrl}/api/lessons?track=${encodeURIComponent(lesson.track)}&slug=${encodeURIComponent(lesson.slug)}`;
  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status} for ${lesson.slug}.`);
  }

  const payload = (await response.json()) as {
    lesson?: { body?: string; solutionBody?: string } | null;
  };
  const markdown = mode === "solution"
    ? payload.lesson?.solutionBody
    : payload.lesson?.body;

  if (!markdown?.trim()) {
    throw new Error(`No ${mode} content found in the backend for ${lesson.slug}.`);
  }

  return markdown;
}

export async function saveTutorialDocument(
  document: TutorialDocument,
): Promise<SaveTutorialResult> {
  if (!contentApiBaseUrl) {
    return {
      ok: false,
      message:
        "Configure VITE_CONTENT_API_BASE_URL to enable saving through the separate backend.",
    };
  }

  try {
    const response = await fetch(`${contentApiBaseUrl}/api/lessons/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: document.track,
        slug: document.slug,
        title: document.title,
        dayLabel: document.dayLabel,
        level: document.level,
        estimatedMinutes: document.estimatedMinutes,
        order: document.order,
        moduleNumber: 1,
        moduleSlug: "module-1",
        contentPath: document.contentPath,
        rawContent: buildFrontmatter(document),
        youtubeVideos: document.youtubeVideos,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        message: errorText || "Save failed on the content backend.",
      };
    }

    clearLessonDocumentCache();

    return {
      ok: true,
      message: "Content saved successfully.",
    };
  } catch {
    return {
      ok: false,
      message: `Unable to reach content backend at ${contentApiBaseUrl}. Ensure backend is running and restart frontend after env changes.`,
    };
  }
}
