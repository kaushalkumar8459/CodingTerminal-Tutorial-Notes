import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { tracks as staticTracks } from "../data/tracks";
import { lessonPath, type LessonNavTrack } from "../services/lessonService";

const authButtonClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-indigo-50 sm:text-sm";

function buildTrackLinks(tracks: LessonNavTrack[]) {
  const served = new Map(tracks.map((track) => [track.track, track]));
  const links = staticTracks
    .filter((track) => !("hidden" in track && track.hidden))
    .map((track) => {
      const backendTrack = served.get(track.key);
      const firstLesson = backendTrack?.lessons[0];
      return firstLesson ? { key: track.key as string, label: track.label as string, to: lessonPath(track.key, firstLesson.title) } : null;
    })
    .filter((link) => link !== null);

  for (const track of tracks) {
    if (track.track === "angularinterview") continue;
    if (!links.some((link) => link.key === track.track) && track.lessons[0]) {
      links.push({ key: track.track, label: track.label, to: lessonPath(track.track, track.lessons[0].title) });
    }
  }
  return links;
}

// Top menus: tracks (static list + backend), then the active track's sections from the backend.
export function LessonTopNavigation({ tracks, currentTrack }: Readonly<{ tracks: LessonNavTrack[]; currentTrack: string }>) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const activeTrack = tracks.find((track) => track.track === currentTrack);
  const trackLinks = buildTrackLinks(tracks);
  const toolLinks = [
    { label: "Text to Speech", to: "/tools/text-to-speech" },
    { label: "YouTube Details", to: "/tools/youtube-details" },
    ...(user?.role === "admin" ? [{ label: "Database", to: "/admin/database" }] : []),
  ];
  // Longest matching prefix wins so /coding/javascript does not also light up /coding/javascriptbrowser.
  const activeSectionPath = [...(activeTrack?.sections ?? [])]
    .filter((section) => pathname.startsWith(section.path))
    .sort((a, b) => b.path.length - a.path.length)[0]?.path;

  return (
    <div className="space-y-3">
      <nav aria-label="Tracks" className="overflow-hidden rounded-[18px] border border-slate-800 bg-slate-950">
        <div className="flex items-stretch overflow-x-auto whitespace-nowrap">
          {trackLinks.map((track) => {
            const isActive = track.key === currentTrack;
            return (
              <Link
                key={track.key}
                to={track.to}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-12 shrink-0 items-center border-r border-slate-800 px-5 text-sm font-semibold uppercase tracking-[0.16em] transition ${
                  isActive ? "bg-slate-100 text-slate-950" : "text-slate-100 hover:bg-slate-800"
                }`}
              >
                {track.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <nav aria-label="Tools" className="flex items-stretch overflow-x-auto whitespace-nowrap rounded-xl border border-slate-200 bg-white">
          <span className="flex h-9 items-center border-r border-slate-200 bg-slate-50 px-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Tools
          </span>
          {toolLinks.map((tool) => {
            const isActive = pathname.startsWith(tool.to);
            return (
              <Link
                key={tool.to}
                to={tool.to}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-9 items-center border-r border-slate-200 px-4 text-sm font-semibold transition last:border-r-0 ${
                  isActive ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-indigo-50"
                }`}
              >
                {tool.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-wrap items-center gap-2">
        {user ? (
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
            {user.role === "admin" ? "Admin" : "User"}: {user.username}
          </span>
        ) : null}
        {user?.role === "admin" ? (
          <Link to="/admin" className={authButtonClass}>
            Edit
          </Link>
        ) : null}
        {user ? (
          <button type="button" onClick={logout} className={authButtonClass}>
            Logout
          </button>
        ) : (
          <Link to="/login" className={authButtonClass}>
            Login
          </Link>
        )}
        </div>
      </div>

      {activeTrack ? (
        <nav aria-label={`${activeTrack.label} sections`} className="overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50/80">
          <div className="flex items-stretch overflow-x-auto whitespace-nowrap">
            {activeTrack.sections.map((section) => {
              const isActive = section.path === activeSectionPath;
              return (
                <Link
                  key={section.label}
                  to={section.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex h-10 shrink-0 items-center border-r border-indigo-100 px-4 text-sm font-semibold transition ${
                    isActive ? "bg-indigo-600 text-white" : "text-indigo-900 hover:bg-indigo-100"
                  }`}
                >
                  {section.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </div>
  );
}

// Left menu: lessons grouped under their module, each shown as "Day {order}".
export function LessonSidebar({
  track,
  currentTitle,
}: Readonly<{ track: LessonNavTrack | undefined; currentTitle: string }>) {
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());

  if (!track) return null;

  const toggleModule = (moduleNumber: number) =>
    setCollapsed((previous) => {
      const next = new Set(previous);
      if (!next.delete(moduleNumber)) next.add(moduleNumber);
      return next;
    });

  const modules = new Map<number, LessonNavTrack["lessons"]>();
  for (const lesson of track.lessons) {
    modules.set(lesson.moduleNumber, [...(modules.get(lesson.moduleNumber) ?? []), lesson]);
  }

  return (
    <aside
      aria-label={`${track.label} lessons`}
      className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto"
    >
      {[...modules.entries()]
        .sort(([a], [b]) => a - b)
        .map(([moduleNumber, lessons]) => {
          const isOpen = !collapsed.has(moduleNumber);
          return (
          <section key={moduleNumber} className="mb-3 last:mb-0">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleModule(moduleNumber)}
              className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-100"
            >
              <span>
                Module {moduleNumber}
                {track.moduleTitles[moduleNumber] ? ` · ${track.moduleTitles[moduleNumber]}` : ""}
              </span>
              <span aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </span>
            </button>
            {isOpen ? (
            <ul className="mt-1 space-y-1">
              {lessons.map((lesson) => {
                const isActive = lesson.title === currentTitle;
                return (
                  <li key={lesson.title}>
                    <Link
                      to={lessonPath(track.track, lesson.title)}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${
                        isActive ? "bg-indigo-600 font-semibold text-white" : "text-slate-700 hover:bg-indigo-50"
                      }`}
                    >
                      <span className="font-semibold">Day {lesson.order}</span>
                      <span className={isActive ? "text-indigo-100" : "text-slate-500"}> · {lesson.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            ) : null}
          </section>
          );
        })}
    </aside>
  );
}
