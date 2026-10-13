import { cached } from "./apiCache";

export type CodingQuestionHtml = {
  id: string;
  order: number;
  number: number;
  section: string;
  promptHtml: string;
  answerHtml: string;
};

export type CodingLessonContent = {
  practiceHtml: string;
  contextHtml: string;
  solutionHtml: string;
  questionsHtml: CodingQuestionHtml[];
};

const apiBaseUrl = import.meta.env.VITE_CONTENT_API_BASE_URL?.trim() ?? "";

export function loadCodingLessonContent(lesson: { track: string; slug: string }): Promise<CodingLessonContent> {
  return cached(`coding:${lesson.track}:${lesson.slug}`, () => fetchCodingLessonContent(lesson));
}

async function fetchCodingLessonContent(lesson: { track: string; slug: string }): Promise<CodingLessonContent> {
  if (!apiBaseUrl) throw new Error("VITE_CONTENT_API_BASE_URL is not configured.");
  const url = `${apiBaseUrl}/api/lessons?track=${encodeURIComponent(lesson.track)}&slug=${encodeURIComponent(lesson.slug)}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Content API returned HTTP ${response.status} for ${lesson.slug}.`);

  const payload = (await response.json()) as { lesson?: (Partial<CodingLessonContent> & { bodyHtml?: string }) | null };
  const content: CodingLessonContent = {
    practiceHtml: payload.lesson?.practiceHtml ?? payload.lesson?.bodyHtml ?? "",
    contextHtml: payload.lesson?.contextHtml ?? "",
    solutionHtml: payload.lesson?.solutionHtml ?? "",
    questionsHtml: Array.isArray(payload.lesson?.questionsHtml) ? payload.lesson.questionsHtml : [],
  };
  if (!content.practiceHtml.trim() && content.questionsHtml.length === 0) {
    throw new Error(`No HTML practice content found for ${lesson.slug}.`);
  }
  return content;
}
