import type { TutorialMeta, TutorialVideo } from "../types/tutorial";
import type { CodingQuestionAnswer } from "../types/codingQuestionAnswer";

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
    lesson?: (Partial<TutorialDocument> & { body?: string; youtubeVideos?: TutorialVideo[] }) | null;
  };
  const lesson = payload.lesson;

  if (!lesson?.body) {
    throw new Error(`No backend content found for ${tutorial.track}/${tutorial.slug}.`);
  }

  // Older saves embedded frontmatter directly in body; strip it defensively so it never
  // duplicates the lesson's own fields (title, level, etc.) that are already stored separately.
  const { body } = parseFrontmatter(lesson.body);

  const document: TutorialDocument = {
    title: lesson.title ?? tutorial.title,
    slug: lesson.slug ?? tutorial.slug,
    dayLabel: lesson.dayLabel ?? tutorial.dayLabel,
    level: (lesson.level as TutorialMeta["level"]) ?? tutorial.level,
    estimatedMinutes: Number(lesson.estimatedMinutes ?? tutorial.estimatedMinutes),
    order: Number(lesson.order ?? tutorial.order),
    track: (lesson.track as TutorialMeta["track"]) ?? tutorial.track,
    body,
    contentPath: lesson.contentPath ?? tutorial.contentPath,
    fileName: lesson.fileName ?? tutorial.fileName,
    youtubeVideos: Array.isArray(lesson.youtubeVideos) ? lesson.youtubeVideos : [],
  };

  lessonDocumentCache.set(cacheKey, {
    expiresAt: Date.now() + LESSON_DOCUMENT_CACHE_TTL_MS,
    document,
  });

  return document;
}

export type LessonSummary = {
  slug: string;
  title: string;
  contentPath: string;
  order: number;
};

// Lists everything actually stored in MongoDB for a track, independent of the frontend's static catalog.
export async function fetchLessonsSummaryByTrack(track: string): Promise<LessonSummary[]> {
  if (!contentApiBaseUrl) {
    throw new Error("VITE_CONTENT_API_BASE_URL is not configured.");
  }

  const apiUrl = `${contentApiBaseUrl}/api/lessons?track=${encodeURIComponent(track)}`;
  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status} for track "${track}".`);
  }

  const payload = (await response.json()) as {
    lessons?: Array<{ slug?: string; title?: string; contentPath?: string; order?: number }>;
  };

  return (payload.lessons ?? []).map((lesson) => ({
    slug: lesson.slug ?? "",
    title: lesson.title ?? "",
    contentPath: lesson.contentPath ?? "",
    order: Number(lesson.order ?? 0),
  }));
}

export async function loadCodingLessonPair(
  lesson: { track: string; slug: string },
): Promise<{
  practice: string;
  contextMarkdown: string;
  solution: string;
  questions: CodingQuestionAnswer[];
}> {
  if (!contentApiBaseUrl) {
    throw new Error("VITE_CONTENT_API_BASE_URL is not configured.");
  }

  const apiUrl = `${contentApiBaseUrl}/api/lessons?track=${encodeURIComponent(lesson.track)}&slug=${encodeURIComponent(lesson.slug)}`;
  const response = await fetch(apiUrl, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Content API returned HTTP ${response.status} for ${lesson.slug}.`);
  }

  const payload = (await response.json()) as {
    lesson?: {
      body?: string;
      contextMarkdown?: string;
      solutionBody?: string;
      questions?: CodingQuestionAnswer[];
    } | null;
  };
  const practice = payload.lesson?.body ?? "";
  const questions = Array.isArray(payload.lesson?.questions) ? payload.lesson.questions : [];

  if (!practice.trim() && questions.length === 0) {
    throw new Error(`No practice content found in the backend for ${lesson.slug}.`);
  }

  return {
    practice,
    contextMarkdown: payload.lesson?.contextMarkdown ?? "",
    solution: payload.lesson?.solutionBody ?? "",
    questions,
  };
}

export async function loadCodingLessonMarkdown(
  lesson: { track: string; slug: string },
  mode: "practice" | "solution",
): Promise<string> {
  const content = await loadCodingLessonPair(lesson);
  const markdown = mode === "solution" ? content.solution : content.practice;

  if (!markdown.trim()) {
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
        rawContent: document.body,
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
