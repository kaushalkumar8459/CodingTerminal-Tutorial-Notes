import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { tracks, type TrackKey } from "../data/tracks";
import { getTutorialsByTrack } from "../data/tutorials";

type MainNavigationProps = Readonly<{
  currentTrack: TrackKey;
}>;

type TrackLink = {
  key: TrackKey;
  label: string;
  to: string;
};

function getTrackBadgeLabel(track: TrackKey) {
  if (track === "javascript") {
    return "JS";
  }

  if (track === "java") {
    return "J";
  }

  if (track === "react") {
    return "R";
  }

  if (track === "python") {
    return "Py";
  }

  if (track === "nodejs") {
    return "N";
  }

  return "Nx";
}

export function MainNavigation(props: Readonly<MainNavigationProps>) {
  const { currentTrack } = props;
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const hashSuffix = location.hash ?? "";

  const trackLinks = useMemo(() => {
    const links: TrackLink[] = [];

    for (const track of tracks) {
      const firstLesson = getTutorialsByTrack(track.key)[0];

      if (!firstLesson) {
        continue;
      }

      links.push({
        key: track.key,
        label: track.label,
        to: `/${track.key}/tutorial/${firstLesson.slug}${hashSuffix}`,
      });
    }

    return links;
  }, [hashSuffix]);

  if (trackLinks.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Primary navigation menu"
      className="space-y-3 rounded-2xl border border-slate-200/70 bg-white/90 p-2 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.55)] backdrop-blur"
    >
      <div className="overflow-hidden rounded-[18px] border border-slate-800 bg-slate-950">
        <div className="flex items-stretch gap-0 overflow-x-auto whitespace-nowrap">
          {trackLinks.map((track) => {
            const isActive = track.key === currentTrack;

            return (
              <Link
                key={track.key}
                to={track.to}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-12 shrink-0 items-center border-r border-slate-800 px-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition sm:px-5 sm:text-sm ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-100 hover:bg-slate-800/90 hover:text-white"
                }`}
              >
                <span className={`mr-2 inline-flex min-w-7 items-center justify-center rounded-md px-2 py-1 text-[10px] font-bold leading-none ${
                  isActive ? "bg-cyan-200 text-cyan-950" : "bg-slate-700 text-cyan-100"
                }`} aria-hidden="true">
                  {getTrackBadgeLabel(track.key)}
                </span>
                {track.label}
              </Link>
            );
          })}

          <div className="flex h-12 shrink-0 items-center px-3 text-slate-300">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 px-1">
        {isAuthenticated ? (
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
            {user?.role === "admin" ? "Admin" : "User"}: {user?.username}
          </span>
        ) : null}

        {user?.role === "admin" ? (
          <Link
            to="/admin"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50 sm:text-sm"
          >
            Edit
          </Link>
        ) : null}

        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50 sm:text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-cyan-50 sm:text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
