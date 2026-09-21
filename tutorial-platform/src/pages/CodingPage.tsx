import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MarkdownLesson } from "../components/MarkdownLesson";
import { PracticeEditor } from "../components/PracticeEditor";
import { getCodingLessonBySlug, getCodingLessonsByTrack } from "../data/codingLessons";
import { getCodingTrackLabel, isCodingTrackKey } from "../data/codingTracks";

const markdownCache = new Map<string, string>();
type ViewMode = "practice" | "solution";

export function CodingPage() {
  const { track: routeTrack, slug } = useParams();
  const track = routeTrack && isCodingTrackKey(routeTrack) ? routeTrack : "javascript";
  const trackLabel = getCodingTrackLabel(track);
  const isRealInterviewTrack = track === "javascriptrealinterview";

  const lessons = useMemo(() => getCodingLessonsByTrack(track), [track]);
  const lesson = slug ? getCodingLessonBySlug(track, slug) : undefined;

  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("practice");

  const currentIndex = lesson ? lessons.findIndex((item) => item.slug === lesson.slug) : -1;
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined;

  useEffect(() => {
    setViewMode("practice");
  }, [lesson]);

  useEffect(() => {
    if (!lesson) {
      setError("This practice day is not available.");
      setIsLoading(false);
      setMarkdown("");
      return;
    }

    const activePath = viewMode === "solution" ? lesson.solutionPath : lesson.contentPath;

    if (!activePath) {
      setIsLoading(false);
      setError("");
      setMarkdown("");
      return;
    }

    let isMounted = true;

    const loadMarkdown = async () => {
      try {
        setIsLoading(true);
        setError("");

        const cached = markdownCache.get(activePath);
        if (cached) {
          setMarkdown(cached);
          return;
        }

        const response = await fetch(`/${activePath}`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Unable to load ${activePath}`);
        }

        const content = await response.text();
        if (isMounted) {
          markdownCache.set(activePath, content);
          setMarkdown(content);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load content.");
          setMarkdown("");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadMarkdown();

    return () => {
      isMounted = false;
    };
  }, [lesson, viewMode]);

  if (!lesson) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 sm:p-8">
        This practice day is not available.
      </section>
    );
  }

  return (
    <article className="space-y-4">
      <header className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">
          {trackLabel} Coding Practice
        </p>
        <h1 className="mt-1 text-lg font-extrabold text-slate-950 sm:text-2xl">
          {lesson.dayLabel}: {lesson.title}
        </h1>

        {!isRealInterviewTrack ? <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setViewMode("practice")}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition sm:text-sm ${
              viewMode === "practice" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📘 Practice
          </button>
          <button
            type="button"
            onClick={() => setViewMode("solution")}
            disabled={!lesson.hasSolution}
            title={lesson.hasSolution ? "Show solution" : "Solution coming soon"}
            className={`rounded-lg px-4 py-1.5 text-xs font-bold transition sm:text-sm ${
              viewMode === "solution" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600 hover:text-slate-900"
            } ${!lesson.hasSolution ? "cursor-not-allowed opacity-50" : ""}`}
          >
            ✅ Solution
          </button>
        </div> : null}
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] sm:p-6">
        {viewMode === "solution" && !lesson.hasSolution ? (
          <p className="text-sm text-slate-600">The solution for this day hasn't been added yet — check back soon.</p>
        ) : isLoading ? (
          <p className="text-sm text-slate-600">Loading {viewMode}...</p>
        ) : error ? (
          <p className="text-sm text-rose-700">{error}</p>
        ) : (
          <MarkdownLesson markdown={markdown} onHashLinkClick={() => {}} useSolutionEditor={isRealInterviewTrack} />
        )}
      </div>

      <PracticeEditor
        storageKey={`coding:${track}:${lesson.slug}`}
        defaultValue={`// ${lesson.dayLabel}: ${lesson.title}\n// Write your solution here and click Run.\n`}
      />

      <nav className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 sm:p-4">
        {previousLesson ? (
          <Link
            to={`/coding/${track}/${previousLesson.slug}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
          >
            ← {previousLesson.dayLabel}
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link
            to={`/coding/${track}/${nextLesson.slug}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-cyan-50"
          >
            {nextLesson.dayLabel} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
