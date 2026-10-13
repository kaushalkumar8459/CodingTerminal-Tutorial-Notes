import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LessonEditor } from "../components/LessonEditor";
import { Spinner } from "../components/Spinner";
import { codingTracks } from "../data/codingTracks";
import {
  fetchCodingLessonForEdit,
  fetchCodingLessonList,
  saveCodingLesson,
  type CodingLessonListItem,
  type CodingLessonRecord,
} from "../services/lessonService";

const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm";
const PARTS = [
  { key: "bodyHtml", label: "Practice" },
  { key: "contextHtml", label: "Context" },
  { key: "solutionHtml", label: "Solution" },
] as const;
type PartKey = (typeof PARTS)[number]["key"];

export function CodingLessonAdmin() {
  const [params, setParams] = useSearchParams();
  const track = params.get("track") ?? codingTracks[0].key;
  const slug = params.get("slug") ?? "";
  const [lessons, setLessons] = useState<CodingLessonListItem[]>([]);
  const [lesson, setLesson] = useState<CodingLessonRecord | null>(null);
  const [part, setPart] = useState<PartKey>("bodyHtml");
  const [source, setSource] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);

  const select = (next: { track: string; slug?: string }) => setParams({ kind: "coding", ...next });

  useEffect(() => {
    let cancelled = false;
    setLessons([]);
    fetchCodingLessonList(track)
      .then((result) => {
        if (cancelled) return;
        setLessons(result);
        if (!slug && result[0]) setParams({ kind: "coding", track, slug: result[0].slug }, { replace: true });
      })
      .catch((reason: Error) => !cancelled && setStatus({ message: reason.message, isError: true }));
    return () => {
      cancelled = true;
    };
    // The default lesson is only chosen when the track changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLesson(null);
    fetchCodingLessonForEdit(track, slug)
      .then((result) => {
        if (cancelled) return;
        setLesson(result);
        setStatus(null);
      })
      .catch((reason: Error) => !cancelled && setStatus({ message: reason.message, isError: true }));
    return () => {
      cancelled = true;
    };
  }, [track, slug]);

  const update = <K extends keyof CodingLessonRecord>(key: K, value: CodingLessonRecord[K]) =>
    setLesson((current) => (current ? { ...current, [key]: value } : current));

  const handleSave = async () => {
    if (!lesson) return;
    setIsSaving(true);
    try {
      await saveCodingLesson(track, slug, {
        title: lesson.title,
        order: lesson.order,
        isActive: lesson.isActive,
        bodyHtml: lesson.bodyHtml ?? "",
        contextHtml: lesson.contextHtml ?? "",
        solutionHtml: lesson.solutionHtml ?? "",
      });
      setStatus({ message: "Saved to database.", isError: false });
    } catch (reason) {
      setStatus({ message: (reason as Error).message, isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Coding Lesson Editor</h1>
        <div className="flex gap-2">
          {lesson ? (
            <Link to={`/coding/${track}/${slug}`} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">
              View lesson
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!lesson || isSaving}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {status ? (
        <p role="status" className={`rounded-md px-3 py-2 text-sm ${status.isError ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"}`}>
          {status.message}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Coding track
          <select className={`${inputClass} mt-1`} value={track} onChange={(event) => select({ track: event.target.value })}>
            {codingTracks.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Lesson
          <select className={`${inputClass} mt-1`} value={slug} onChange={(event) => select({ track, slug: event.target.value })}>
            {lessons.map((item) => (
              <option key={item.slug} value={item.slug}>Day {item.order} — {item.title}</option>
            ))}
          </select>
        </label>
      </div>

      {slug && !lesson && !status?.isError ? (
        <p role="status" className="flex items-center gap-2 text-sm text-slate-600">
          <Spinner className="h-4 w-4 border-2 border-slate-300 border-t-indigo-600" />
          Loading lesson...
        </p>
      ) : null}

      {lesson ? (
        <>
          <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
            <label className="text-sm font-semibold">
              Title
              <input className={inputClass} value={lesson.title} onChange={(event) => update("title", event.target.value)} />
            </label>
            <label className="text-sm font-semibold">
              Day (order)
              <input type="number" min={1} className={inputClass} value={lesson.order} onChange={(event) => update("order", Number(event.target.value))} />
            </label>
            <label className="flex items-center gap-2 pt-6 text-sm font-semibold">
              <input type="checkbox" checked={lesson.isActive !== false} onChange={(event) => update("isActive", event.target.checked)} />
              Active (visible to learners)
            </label>
          </section>

          <div className="flex gap-2" role="tablist">
            {PARTS.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={part === item.key}
                onClick={() => setPart(item.key)}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${part === item.key ? "bg-slate-900 text-white" : "border border-slate-300 bg-white"}`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSource((value) => !value)}
              className="ml-auto rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold"
            >
              {source ? "Rich text" : "HTML source"}
            </button>
          </div>

          {source ? (
            <textarea
              aria-label={`${part} HTML`}
              className={`${inputClass} h-[28rem] font-mono`}
              spellCheck={false}
              value={lesson[part] ?? ""}
              onChange={(event) => update(part, event.target.value)}
            />
          ) : (
            <LessonEditor
              key={`${slug}:${part}`}
              documentKey={`${slug}:${part}`}
              html={lesson[part] ?? ""}
              onChange={(html) => update(part, html)}
            />
          )}
        </>
      ) : null}
    </div>
  );
}
