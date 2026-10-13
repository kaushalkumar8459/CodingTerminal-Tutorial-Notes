import { cached, invalidateCache } from "./apiCache";
import { getAuthHeaders } from "./authHeaders";

const baseUrl = import.meta.env.VITE_CONTENT_API_BASE_URL?.trim() ?? "";

export type LessonLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

// Lessons are identified by track + title; there is no slug.
export type LessonNavItem = {
  track: string;
  title: string;
  level: LessonLevel;
  order: number;
  moduleNumber: number;
  estimatedMinutes: number;
};

export type HtmlNavSection = { label: string; path: string };

export type LessonNavTrack = {
  track: string;
  label: string;
  sections: HtmlNavSection[];
  moduleTitles: Record<string, string>;
  lessons: LessonNavItem[];
};

export type LessonRecord = LessonNavItem & {
  status: string;
  isActive: boolean;
  bodyHtml: string;
  updatedAt?: string;
};

export type LessonInput = Partial<
  Pick<LessonRecord, "title" | "level" | "estimatedMinutes" | "order" | "moduleNumber" | "status" | "isActive">
> & { bodyHtml: string };

export const lessonPath = (track: string, title: string) => `/learn/${encodeURIComponent(track)}/${encodeURIComponent(title)}`;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!baseUrl) {
    throw new Error("Configure VITE_CONTENT_API_BASE_URL to load lessons from the backend.");
  }

  const response = await fetch(`${baseUrl}${path}`, { cache: "no-store", ...init });
  const payload = (await response.json().catch(() => null)) as ({ ok?: boolean; message?: string } & T) | null;

  if (!response.ok || !payload) {
    throw new Error(payload?.message ?? `Request failed (${response.status}).`);
  }
  return payload;
}

const writeInit = (method: "PUT" | "POST", input: LessonInput): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json", ...getAuthHeaders() },
  body: JSON.stringify(input),
});

export async function fetchLessonNavigation(options: { includeInactive?: boolean } = {}) {
  const query = options.includeInactive ? "?includeInactive=1" : "";
  return cached(`html-lessons:nav${query}`, async () =>
    (await request<{ tracks: LessonNavTrack[] }>(`/api/html-lessons/nav${query}`, { headers: getAuthHeaders() })).tracks,
  );
}

export async function fetchLesson(track: string, title: string) {
  const path = `/api/html-lessons/${encodeURIComponent(track)}/${encodeURIComponent(title)}`;
  return cached(`html-lessons:${path}`, async () => (await request<{ lesson: LessonRecord }>(path, { headers: getAuthHeaders() })).lesson);
}

// Returns the stored title, which changes when the admin renames a lesson.
export async function saveLesson(track: string, title: string, input: LessonInput) {
  const result = await request<{ title: string }>(
    `/api/html-lessons/${encodeURIComponent(track)}/${encodeURIComponent(title)}`,
    writeInit("PUT", input),
  );
  invalidateCache("html-lessons:");
  return result.title;
}

export type CodingLessonListItem = { track: string; slug: string; title: string; order: number; isActive?: boolean };

export type CodingLessonRecord = CodingLessonListItem & {
  bodyHtml?: string;
  contextHtml?: string;
  solutionHtml?: string;
};

export type CodingLessonInput = Partial<Pick<CodingLessonRecord, "title" | "order" | "isActive" | "bodyHtml" | "contextHtml" | "solutionHtml">>;

const codingAdminPath = (track: string, slug?: string) =>
  `/api/admin/coding-lessons/${encodeURIComponent(track)}${slug ? `/${encodeURIComponent(slug)}` : ""}`;

export async function fetchCodingLessonList(track: string) {
  return (await request<{ lessons: CodingLessonListItem[] }>(codingAdminPath(track), { headers: getAuthHeaders() })).lessons;
}

export async function fetchCodingLessonForEdit(track: string, slug: string) {
  return (await request<{ lesson: CodingLessonRecord }>(codingAdminPath(track, slug), { headers: getAuthHeaders() })).lesson;
}

export async function saveCodingLesson(track: string, slug: string, input: CodingLessonInput) {
  await request<{ ok: boolean }>(codingAdminPath(track, slug), {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(input),
  });
  invalidateCache("coding:");
}

export async function createLesson(track: string, input: LessonInput) {
  const result = await request<{ title: string }>(`/api/html-lessons/${encodeURIComponent(track)}`, writeInit("POST", input));
  invalidateCache("html-lessons:");
  return result.title;
}
