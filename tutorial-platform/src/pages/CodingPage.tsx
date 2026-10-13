import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LessonContent } from "../components/LessonContent";
import { QuestionAnswerContent } from "../components/QuestionAnswerContent";
import { PracticeEditor } from "../components/PracticeEditor";
import { Spinner } from "../components/Spinner";
import { getCodingLessonBySlug, getCodingLessonsByTrack } from "../data/codingLessons";
import { getCodingTrackLabel, isCodingTrackKey } from "../data/codingTracks";
import { loadCodingLessonContent, type CodingLessonContent } from "../services/codingContent";
import { parseLessonHtml } from "../utils/lessonContent";

const contentPairCache = new Map<string, CodingLessonContent>();
type ViewMode = "practice" | "solution";

export function CodingPage() {
  const { track: routeTrack, slug } = useParams();
  const track = routeTrack && isCodingTrackKey(routeTrack) ? routeTrack : "javascript";
  const trackLabel = getCodingTrackLabel(track);
  const lesson = slug ? getCodingLessonBySlug(track, slug) : undefined;
  const lessons = useMemo(() => getCodingLessonsByTrack(track), [track]);

  const [practiceHtml, setPracticeHtml] = useState("");
  const [contextHtml, setContextHtml] = useState("");
  const [solutionHtml, setSolutionHtml] = useState("");
  const [questionsHtml, setQuestionsHtml] = useState<CodingLessonContent["questionsHtml"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("practice");

  const currentIndex = lesson ? lessons.findIndex((item) => item.slug === lesson.slug) : -1;
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined;
  const hasQuestions = questionsHtml.length > 0;
  const hasSolution = Boolean(solutionHtml.trim());

  useEffect(() => setViewMode("practice"), [lesson]);

  useEffect(() => {
    if (!lesson) {
      setError("This practice day is not available.");
      setIsLoading(false);
      setPracticeHtml("");
      setContextHtml("");
      setSolutionHtml("");
      setQuestionsHtml([]);
      return;
    }

    let isMounted = true;
    const cacheKey = `${track}::${lesson.slug}`;
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError("");
        const content = contentPairCache.get(cacheKey) ?? await loadCodingLessonContent({ track, slug: lesson.slug });
        contentPairCache.set(cacheKey, content);
        if (!isMounted) return;
        setPracticeHtml(content.practiceHtml);
        setContextHtml(content.contextHtml);
        setSolutionHtml(content.solutionHtml);
        setQuestionsHtml(content.questionsHtml);
      } catch (reason) {
        if (!isMounted) return;
        setError(reason instanceof Error ? reason.message : "Failed to load lesson content.");
        setPracticeHtml("");
        setContextHtml("");
        setSolutionHtml("");
        setQuestionsHtml([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadContent();
    return () => {
      isMounted = false;
    };
  }, [lesson, track]);

  if (!lesson) {
    return <section className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-rose-700">This practice day is not available.</section>;
  }

  const displayedHtml = viewMode === "solution" ? solutionHtml : practiceHtml;

  return (
    <article className="space-y-4">
      <header className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase text-indigo-700">{trackLabel} Coding Practice</p>
        <h1 className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">Day {lesson.order}: {lesson.title}</h1>
        {!hasQuestions ? (
          <div className="mt-4 inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
            <button type="button" onClick={() => setViewMode("practice")} aria-pressed={viewMode === "practice"} className={`rounded-md px-4 py-2 text-sm font-semibold ${viewMode === "practice" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}>
              Practice
            </button>
            <button type="button" onClick={() => setViewMode("solution")} disabled={!hasSolution} aria-pressed={viewMode === "solution"} className={`rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-40 ${viewMode === "solution" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}>
              Solution
            </button>
          </div>
        ) : null}
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
        {isLoading ? (
          <p className="flex items-center gap-2 text-sm text-slate-600"><Spinner className="h-4 w-4 border-2 border-slate-300 border-t-indigo-600" />Loading {viewMode}...</p>
        ) : error ? (
          <p className="text-sm text-rose-700">{error}</p>
        ) : hasQuestions ? (
          <>
            {contextHtml.trim() ? <div className="mb-5"><LessonContent lesson={parseLessonHtml(contextHtml)} /></div> : null}
            <QuestionAnswerContent questions={questionsHtml} />
          </>
        ) : viewMode === "solution" && !hasSolution ? (
          <p className="text-sm text-slate-600">The solution for this day has not been added yet.</p>
        ) : (
          <LessonContent lesson={parseLessonHtml(displayedHtml)} />
        )}
      </section>

      <PracticeEditor storageKey={`coding:${track}:${lesson.slug}`} defaultValue={`// Day ${lesson.order}: ${lesson.title}\n// Write your solution here and click Run.\n`} />

      <nav className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4" aria-label="Practice days">
        {previousLesson ? <Link to={`/coding/${track}/${previousLesson.slug}`} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">← Day {previousLesson.order}</Link> : <span />}
        {nextLesson ? <Link to={`/coding/${track}/${nextLesson.slug}`} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Day {nextLesson.order} →</Link> : <span />}
      </nav>
    </article>
  );
}
