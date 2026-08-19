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

export function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---")) {
    return { frontmatter: {} as Record<string, string>, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: {} as Record<string, string>, body: markdown };
  }

  const rawFrontmatter = markdown.slice(3, endIndex).trim();
  const body = markdown.slice(endIndex + 4).replace(/^\r?\n/, "");
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
  const response = await fetch(`/${tutorial.contentPath}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Unable to load ${tutorial.contentPath}`);
  }

  const rawContent = await response.text();
  const { frontmatter, body } = parseFrontmatter(rawContent);

  return {
    title: frontmatter.title ?? tutorial.title,
    slug: frontmatter.slug ?? tutorial.slug,
    dayLabel: frontmatter.dayLabel ?? tutorial.dayLabel,
    level: (frontmatter.level as TutorialMeta["level"]) ?? tutorial.level,
    estimatedMinutes: Number(
      frontmatter.estimatedMinutes ?? tutorial.estimatedMinutes,
    ),
    order: Number(frontmatter.order ?? tutorial.order),
    track: (frontmatter.track as TutorialMeta["track"]) ?? tutorial.track,
    body,
    contentPath: tutorial.contentPath,
    fileName: tutorial.fileName,
    youtubeVideos: parseYouTubeVideosField(frontmatter.youtubeVideos),
  };
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
    const response = await fetch(`${contentApiBaseUrl}/tutorials/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...document,
        rawContent: buildFrontmatter(document),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        message: errorText || "Save failed on the content backend.",
      };
    }

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
