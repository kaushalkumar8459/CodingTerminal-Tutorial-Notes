import { useMemo, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { MainNavigation } from "./components/MainNavigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { TopProgressBar } from "./components/TopProgressBar";
import { TutorialNav } from "./components/TutorialNav";
import { getTrackLabel, isTrackKey } from "./data/tracks";
import { getTutorialsByTrack } from "./data/tutorials";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { TutorialPage } from "./pages/TutorialPage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";

function TutorialLayout() {
  const { track: routeTrack } = useParams();
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  const track = routeTrack && isTrackKey(routeTrack) ? routeTrack : "react";
  const trackLabel = getTrackLabel(track);
  const trackTutorials = useMemo(() => getTutorialsByTrack(track), [track]);
  const defaultTutorial = trackTutorials[0];

  if (trackTutorials.length === 0) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-700 sm:p-8">
        No lessons are available for this track yet.
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] text-slate-900">
      <TopProgressBar />
      <div className="mx-auto max-w-350 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10">
        <header className="mb-4 rounded-2xl border border-white/60 bg-white/75 p-3 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-4 md:mb-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">{trackLabel} Learning Path</p>
          <h1 className="mt-2 text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl md:text-4xl">
            Master {trackLabel} Step by Step with Daily Practical Lessons
          </h1>
          <p className="mt-2 text-xs leading-5 text-slate-700 sm:mt-3 sm:text-sm sm:leading-6 md:text-base">
            Follow a beginner-friendly path with clear explanations, coding examples, mini exercises, and progress-focused lesson pages.
          </p>

          <MainNavigation currentTrack={track} />
        </header>

        <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsLeftPanelCollapsed((value) => !value)}
            aria-label={isLeftPanelCollapsed ? 'Show lessons panel' : 'Hide lessons panel'}
            className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50"
          >
            {isLeftPanelCollapsed ? '⟩ Show Lessons' : '⟨ Hide Lessons'}
          </button>
          <button
            type="button"
            onClick={() => setIsRightPanelCollapsed((value) => !value)}
            aria-label={isRightPanelCollapsed ? 'Show on this page panel' : 'Hide on this page panel'}
            className="rounded-xl border border-slate-300 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50"
          >
            {isRightPanelCollapsed ? '⟨ Show Contents' : '⟩ Hide Contents'}
          </button>
        </div>

        <div className={`grid gap-4 sm:gap-6 ${isLeftPanelCollapsed ? "" : "lg:grid-cols-[290px_minmax(0,1fr)]"}`}>
          {!isLeftPanelCollapsed ? <TutorialNav track={track} tutorials={trackTutorials} /> : null}
          <main className="min-w-0">
            <Routes>
              <Route index element={<Navigate to={`tutorial/${defaultTutorial.slug}`} replace />} />
              <Route
                path="tutorial/:slug"
                element={
                  <TutorialPage
                    isRightPanelCollapsed={isRightPanelCollapsed}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  const firstReactTutorial = getTutorialsByTrack("react")[0];

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={`/react/tutorial/${firstReactTutorial.slug}`} replace />} />
      <Route path="/:track/*" element={<TutorialLayout />} />
      <Route path="*" element={<Navigate to={`/react/tutorial/${firstReactTutorial.slug}`} replace />} />
    </Routes>
  );
}

export default App;
