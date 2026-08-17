import type { TocItem } from "../types/tutorial";

export function stripFrontmatter(markdown: string) {
  if (!markdown.startsWith("---")) {
    return markdown;
  }

  const endMarker = "\n---";
  const endIndex = markdown.indexOf(endMarker, 3);

  if (endIndex === -1) {
    return markdown;
  }

  return markdown.slice(endIndex + endMarker.length).replace(/^\r?\n/, "");
}

export function stripLeadingH1(markdown: string) {
  return markdown.replace(/^#\s+.+\r?\n(?:\r?\n)?/, "");
}

function normalizeHeadingText(rawHeading: string) {
  return rawHeading
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .trim();
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function extractTableOfContents(markdown: string): TocItem[] {
  const headingMatches = markdown.matchAll(/^(##|###)\s+(.+)$/gm);
  const usedIds = new Map<string, number>();

  return Array.from(headingMatches).map((match) => {
    const hashes = match[1];
    const text = normalizeHeadingText(match[2]);
    const baseId = slugifyHeading(text);
    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);

    return {
      level: hashes.length,
      text,
      id: duplicateCount > 0 ? `${baseId}-${duplicateCount}` : baseId,
    };
  });
}
