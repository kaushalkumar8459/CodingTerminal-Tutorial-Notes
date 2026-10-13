import DOMPurify from "dompurify";
import type { TocItem } from "../types/lesson";

export type LessonSegment =
  | { kind: "html"; key: string; html: string }
  | { kind: "example"; key: string; code: string; language: "html" | "javascript" };

export type ParsedLesson = { segments: LessonSegment[]; toc: TocItem[] };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

// Splits stored HTML so example blocks can become interactive React components.
export function parseLessonHtml(storedHtml: string): ParsedLesson {
  const clean = DOMPurify.sanitize(storedHtml, { USE_PROFILES: { html: true } });
  const doc = new DOMParser().parseFromString(clean, "text/html");

  const toc: TocItem[] = [];
  const usedIds = new Map<string, number>();
  doc.body.querySelectorAll("h2, h3").forEach((heading) => {
    const text = heading.textContent?.trim() ?? "";
    const baseId = slugify(text) || "section";
    const count = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, count + 1);
    const id = count > 0 ? `${baseId}-${count}` : baseId;
    heading.id = id;
    // Only h2 sections are listed; repeated h3 labels (Theory, Key Points) would flood the contents.
    if (heading.tagName === "H2") toc.push({ level: 2, text, id });
  });

  const segments: LessonSegment[] = [];
  let buffer = "";
  const flush = () => {
    if (buffer) {
      segments.push({ kind: "html", key: `html-${segments.length}`, html: buffer });
      buffer = "";
    }
  };

  for (const element of Array.from(doc.body.children)) {
    if (element.matches("div.lesson-example")) {
      flush();
      const codeElement = element.querySelector("code");
      segments.push({
        kind: "example",
        key: `example-${segments.length}`,
        code: codeElement?.textContent ?? "",
        language: /\blanguage-(js|javascript)\b/.test(codeElement?.className ?? "") ? "javascript" : "html",
      });
    } else {
      buffer += element.outerHTML;
    }
  }
  flush();

  return { segments, toc };
}
