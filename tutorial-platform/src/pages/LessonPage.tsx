import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { LessonSidebar, LessonTopNavigation } from "../components/LessonNavigation";
import { LessonContent } from "../components/LessonContent";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { Spinner } from "../components/Spinner";
import { TableOfContents } from "../components/TableOfContents";
import { fetchLesson, fetchLessonNavigation, lessonPath, type LessonRecord, type LessonNavTrack } from "../services/lessonService";
import { parseLessonHtml } from "../utils/lessonContent";

// Remembers panel visibility across lessons and reloads.
function usePersistentToggle(key: string): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(() => window.localStorage.getItem(key) !== "closed");
  const toggle = () =>
    setIsOpen((value) => {
      window.localStorage.setItem(key, value ? "closed" : "open");
      return !value;
    });
  return [isOpen, toggle];
}

// Common learner template: used by every track whose lessons are stored as HTML.
export function LessonPage() {
  const { track = "", title = "" } = useParams();
  const { user } = useAuth();
  const [showLeft, toggleLeft] = usePersistentToggle("lesson-left-panel");
  const [showRight, toggleRight] = usePersistentToggle("lesson-right-panel");
  const [tracks, setTracks] = useState<LessonNavTrack[] | null>(null);
  const [lesson, setLesson] = useState<LessonRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchLessonNavigation()
      .then((result) => !cancelled && setTracks(result))
      .catch((reason: Error) => !cancelled && setError(reason.message));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!title) return;
    let cancelled = false;
    setLesson(null);
    setError("");
    fetchLesson(track, title)
      .then((result) => !cancelled && setLesson(result))
      .catch((reason: Error) => !cancelled && setError(reason.message));
    return () => {
      cancelled = true;
    };
  }, [track, title]);

  const parsed = useMemo(() => (lesson ? parseLessonHtml(lesson.bodyHtml) : null), [lesson]);

  const siblings = tracks?.find((item) => item.track === track)?.lessons ?? [];
  const index = siblings.findIndex((item) => item.title === title);
  const previous = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 ? (siblings[index + 1] ?? null) : null;

  if (!title && siblings[0]) {
    return <Navigate to={lessonPath(track, siblings[0].title)} replace />;
  }

  const scrollToSection = (hash: string) => {
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#eef2ff,#faf5ff_45%,#f8fafc)] text-slate-900">
      <div className="mx-auto w-full max-w-none px-2 py-3 sm:px-3 md:px-4 md:py-5">
        <header className="mb-5 space-y-3 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-sm backdrop-blur sm:p-5">
          <Link to="/" className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Tutorial Platform
          </Link>
          {tracks ? <LessonTopNavigation tracks={tracks} currentTrack={track === "angularinterview" ? "angular" : track} /> : null}
        </header>

        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleLeft}
            aria-expanded={showLeft}
            className="rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50"
          >
            {showLeft ? "⟨ Hide Lessons" : "⟩ Show Lessons"}
          </button>
          <button
            type="button"
            onClick={toggleRight}
            aria-expanded={showRight}
            className="rounded-lg border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50"
          >
            {showRight ? "⟩ Hide Contents" : "⟨ Show Contents"}
          </button>
        </div>

        <div className={`grid gap-4 ${showLeft ? "lg:grid-cols-[250px_minmax(0,1fr)]" : ""}`}>
        {showLeft ? <LessonSidebar track={tracks?.find((item) => item.track === track)} currentTitle={title} /> : null}
        <div className="min-w-0">
        {error ? (
          <section role="alert" className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700">
            {error}
          </section>
        ) : null}

        {!error && !lesson ? (
          <div role="status" className="flex h-96 items-center justify-center gap-3 rounded-3xl bg-white/70 text-sm text-slate-600">
            <Spinner className="h-6 w-6 border-2 border-slate-300 border-t-indigo-600" />
            Loading lesson...
          </div>
        ) : null}

        {lesson && parsed ? (
          <div className={`grid gap-4 ${showRight ? "xl:grid-cols-[minmax(0,1fr)_240px]" : ""}`}>
            <main className="min-w-0 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Day {lesson.order} · {lesson.level} · {lesson.estimatedMinutes} min
              </p>
              <div className="mb-6 mt-2 flex flex-wrap items-start justify-between gap-3">
                <h1 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">{lesson.title}</h1>
                {user?.role === "admin" ? (
                  <Link
                    to={`/admin/html-lessons?track=${encodeURIComponent(lesson.track)}&title=${encodeURIComponent(lesson.title)}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50"
                  >
                    Edit
                  </Link>
                ) : null}
              </div>

              <LessonContent lesson={parsed} />

              <nav aria-label="Lesson pagination" className="mt-10 flex justify-between gap-3 border-t border-slate-200 pt-6">
                {previous ? (
                  <Link to={lessonPath(track, previous.title)} className="rounded-full bg-slate-800 px-5 py-2 font-semibold text-white">
                    « Previous
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link to={lessonPath(track, next.title)} className="rounded-full bg-indigo-600 px-5 py-2 font-semibold text-white">
                    Next »
                  </Link>
                ) : null}
              </nav>
            </main>

            {showRight ? (
              <div className="xl:sticky xl:top-6 xl:self-start">
                <TableOfContents items={parsed.toc} onHashLinkClick={scrollToSection} />
              </div>
            ) : null}
          </div>
        ) : null}
        </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
