import { useMemo } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { MainNavigation } from "./components/MainNavigation";
import { JavaScriptSubNavigation } from "./components/JavaScriptSubNavigation";
import { HTMLSubNavigation } from "./components/HTMLSubNavigation";
import { CodingNav } from "./components/CodingNav";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TopProgressBar } from "./components/TopProgressBar";
import { getCodingLessonsByTrack } from "./data/codingLessons";
import { getCodingTrackLabel, isCodingTrackKey } from "./data/codingTracks";
import { CodingPage } from "./pages/CodingPage";
import { DatabaseExplorerPage } from "./pages/DatabaseExplorerPage";
import { LessonAdminPage } from "./pages/LessonAdminPage";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import { TextToSpeechPage } from "./pages/TextToSpeechPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { YouTubeDetailsPage } from "./pages/YouTubeDetailsPage";

// Tutorial tracks handled by the shared database-backed lesson page.
const LEARN_TRACKS = ["html", "javascript", "java", "react", "angular", "angularinterview", "nodejs", "python", "nextjs"] as const;

function CodingLayout() {
  const { track: routeTrack } = useParams();
  const track = routeTrack && isCodingTrackKey(routeTrack) ? routeTrack : "javascript";
  const trackLabel = getCodingTrackLabel(track);
  const trackLessons = useMemo(() => getCodingLessonsByTrack(track), [track]);
  const defaultLesson = trackLessons[0];

  if (trackLessons.length === 0) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 sm:p-8">
        No coding practice days are available for this track yet.
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] text-slate-900">
      <TopProgressBar />
      <div className="mx-auto max-w-350 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10">
        <header className="mb-4 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-4 md:mb-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">{trackLabel} Coding Practice</p>
          <h1 className="mt-2 text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl md:text-4xl">
            Practice {trackLabel} Day by Day
          </h1>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:mt-3 sm:text-sm sm:leading-6 md:text-base">
            No question-count limits — work through as many problems as each day needs.
          </p>

          <MainNavigation currentTrack={track === "htmlinterview" ? "html" : "javascript"} />
          {track === "javascript" ||
          track === "javascriptproblemsolving" ||
          track === "javascriptrealinterview" ||
          track === "javascriptbrowser" ||
          track === "javascriptinterviewrevision" ||
          track === "javascriptmachinecoding" ||
          track === "typescript" ? (
            <JavaScriptSubNavigation />
          ) : null}
          {track === "htmlinterview" ? <HTMLSubNavigation /> : null}
        </header>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
          <CodingNav track={track} lessons={trackLessons} />
          <main className="min-w-0">
            <Routes>
              <Route index element={<Navigate to={`${defaultLesson.slug}`} replace />} />
              <Route path=":slug" element={<CodingPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/tools/text-to-speech" element={<TextToSpeechPage />} />
      <Route path="/tools/youtube-details" element={<YouTubeDetailsPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <LessonAdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/learn/:track/:title?" element={<LessonPage />} />
      {LEARN_TRACKS.map((track) => (
        track === "angularinterview" ? (
          <Route key={track} path="/angularinterview/*" element={<Navigate to="/learn/angularinterview" replace />} />
        ) : (
        <Route key={track} path={`/${track}/*`} element={<Navigate to={`/learn/${track}`} replace />} />
        )
      ))}
      <Route
        path="/admin/html-lessons"
        element={
          <ProtectedRoute requiredRole="admin">
            <LessonAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/database"
        element={
          <ProtectedRoute requiredRole="admin">
            <DatabaseExplorerPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/learn/react" replace />} />
      <Route path="/coding" element={<Navigate to="/coding/javascript" replace />} />
      <Route path="/coding/:track/*" element={<CodingLayout />} />
      <Route path="/:track/*" element={<Navigate to="/learn/react" replace />} />
      <Route path="*" element={<Navigate to="/learn/react" replace />} />
    </Routes>
  );
}

export default App;
