import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LessonEditor } from "../components/LessonEditor";
import { LessonTopNavigation } from "../components/LessonNavigation";
import { LessonContent } from "../components/LessonContent";
import { CodingLessonAdmin } from "./CodingLessonAdmin";
import {
  createLesson,
  fetchLesson,
  fetchLessonNavigation,
  lessonPath,
  saveLesson,
  type LessonRecord,
  type LessonLevel,
  type LessonNavTrack,
} from "../services/lessonService";
import { LESSON_TEMPLATE_HTML } from "../templates/lessonTemplate";
import { parseLessonHtml } from "../utils/lessonContent";

const LEVELS: LessonLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"];
const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm";

export function LessonAdminPage() {
  const [params, setParams] = useSearchParams();
  const [navTracks, setNavTracks] = useState<LessonNavTrack[]>([]);
  const isCoding = params.get("kind") === "coding";

  useEffect(() => {
    fetchLessonNavigation({ includeInactive: true }).then(setNavTracks).catch(() => undefined);
  }, []);

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 sm:p-6">
      <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
        Tutorial Platform
      </Link>
      <LessonTopNavigation tracks={navTracks} currentTrack={isCoding ? "" : (params.get("track") ?? "html")} />
      <div className="flex gap-2" role="tablist" aria-label="Lesson type">
        {(["tutorial", "coding"] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            role="tab"
            aria-selected={isCoding === (kind === "coding")}
            onClick={() => setParams(kind === "coding" ? { kind } : {})}
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              isCoding === (kind === "coding") ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white"
            }`}
          >
            {kind === "coding" ? "Coding Practice" : "Tutorial"}
          </button>
        ))}
      </div>
      {isCoding ? <CodingLessonAdmin /> : <TutorialLessonAdmin />}
    </div>
  );
}

function TutorialLessonAdmin() {
  const [params, setParams] = useSearchParams();
  const [tracks, setTracks] = useState<LessonNavTrack[]>([]);
  const [lesson, setLesson] = useState<LessonRecord | null>(null);
  const [html, setHtml] = useState("");
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [revision, setRevision] = useState(0);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const track = params.get("track") ?? "html";
  const title = params.get("title") ?? "";

  const reloadNav = () => fetchLessonNavigation({ includeInactive: true }).then(setTracks);

  useEffect(() => {
    fetchLessonNavigation({ includeInactive: true })
      .then((result) => {
        setTracks(result);
        const first = result.find((item) => item.track === track)?.lessons[0];
        if (!params.get("title") && first) setParams({ track, title: first.title }, { replace: true });
      })
      .catch((reason: Error) => setStatus({ message: reason.message, isError: true }));
    // Runs once; later changes come from the selected lesson.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!title) return;
    let cancelled = false;
    setLesson(null);
    fetchLesson(track, title)
      .then((result) => {
        if (cancelled) return;
        setLesson(result);
        setHtml(result.bodyHtml);
        setRevision((value) => value + 1);
        setStatus(null);
      })
      .catch((reason: Error) => !cancelled && setStatus({ message: reason.message, isError: true }));
    return () => {
      cancelled = true;
    };
  }, [track, title]);

  const preview = useMemo(() => (view === "preview" ? parseLessonHtml(html) : null), [view, html]);
  const lessons = tracks.find((item) => item.track === track)?.lessons ?? [];

  const update = <K extends keyof LessonRecord>(key: K, value: LessonRecord[K]) =>
    setLesson((current) => (current ? { ...current, [key]: value } : current));

  const handleSave = async () => {
    if (!lesson) return;
    setIsSaving(true);
    try {
      const savedTitle = await saveLesson(lesson.track, title, {
        title: lesson.title,
        level: lesson.level,
        estimatedMinutes: lesson.estimatedMinutes,
        order: lesson.order,
        moduleNumber: lesson.moduleNumber,
        status: lesson.status,
        isActive: lesson.isActive,
        bodyHtml: html,
      });
      await reloadNav();
      setStatus({ message: "Saved to database.", isError: false });
      if (savedTitle !== title) setParams({ track, title: savedTitle }, { replace: true });
    } catch (reason) {
      setStatus({ message: (reason as Error).message, isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreate = async () => {
    try {
      const created = await createLesson(track, {
        title: newTitle,
        order: lessons.length + 1,
        bodyHtml: LESSON_TEMPLATE_HTML,
      });
      await reloadNav();
      setNewTitle("");
      setParams({ track, title: created });
    } catch (reason) {
      setStatus({ message: (reason as Error).message, isError: true });
    }
  };

  const applyTemplate = () => {
    if (!window.confirm("Replace the current content with the standard lesson template?")) return;
    setHtml(LESSON_TEMPLATE_HTML);
    setRevision((value) => value + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Lesson Editor</h1>
        <div className="flex gap-2">
          {lesson ? (
            <Link to={lessonPath(lesson.track, title)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">
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
          Track
          <select
            className={`${inputClass} mt-1`}
            value={track}
            onChange={(event) => {
              const nextTrack = event.target.value;
              const first = tracks.find((item) => item.track === nextTrack)?.lessons[0];
              setParams(first ? { track: nextTrack, title: first.title } : { track: nextTrack });
            }}
          >
            {tracks.map((item) => <option key={item.track} value={item.track}>{item.label}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">
          Lesson
          <select className={`${inputClass} mt-1`} value={title} onChange={(event) => setParams({ track, title: event.target.value })}>
            {lessons.map((item) => (
              <option key={item.title} value={item.title}>
                Day {item.order} — {item.title}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <label className="block flex-1 text-sm font-semibold">
            New lesson title
            <input className={`${inputClass} mt-1`} value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
          </label>
          <button
            type="button"
            disabled={!newTitle.trim()}
            onClick={() => void handleCreate()}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold disabled:opacity-50"
          >
            Create from template
          </button>
        </div>
      </div>

      {lesson ? (
        <>
          <section className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-semibold">
              Title
              <input className={inputClass} value={lesson.title} onChange={(event) => update("title", event.target.value)} />
            </label>
            <label className="text-sm font-semibold">
              Day (order)
              <input type="number" min={1} className={inputClass} value={lesson.order} onChange={(event) => update("order", Number(event.target.value))} />
            </label>
            <label className="text-sm font-semibold">
              Module number
              <input
                type="number"
                min={0}
                className={inputClass}
                value={lesson.moduleNumber}
                onChange={(event) => update("moduleNumber", Number(event.target.value))}
              />
            </label>
            <label className="text-sm font-semibold">
              Level
              <select className={inputClass} value={lesson.level} onChange={(event) => update("level", event.target.value as LessonLevel)}>
                {LEVELS.map((level) => (
                  <option key={level}>{level}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold">
              Estimated minutes
              <input
                type="number"
                min={1}
                className={inputClass}
                value={lesson.estimatedMinutes}
                onChange={(event) => update("estimatedMinutes", Number(event.target.value))}
              />
            </label>
            <label className="flex items-center gap-2 pt-6 text-sm font-semibold">
              <input type="checkbox" checked={lesson.isActive} onChange={(event) => update("isActive", event.target.checked)} />
              Active (visible to learners)
            </label>
          </section>

          <div className="flex flex-wrap items-center gap-2" role="tablist">
            {(["edit", "preview"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={view === tab}
                onClick={() => setView(tab)}
                className={`rounded-md px-4 py-2 text-sm font-semibold ${view === tab ? "bg-slate-900 text-white" : "border border-slate-300 bg-white"}`}
              >
                {tab === "edit" ? "Edit" : "Preview"}
              </button>
            ))}
            <button type="button" onClick={applyTemplate} className="ml-auto rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold">
              Apply standard template
            </button>
          </div>

          {view === "edit" ? (
            <LessonEditor key={revision} documentKey={String(revision)} html={html} onChange={setHtml} />
          ) : preview ? (
            <div className="rounded-xl border border-slate-300 bg-white p-6">
              <LessonContent lesson={preview} />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
