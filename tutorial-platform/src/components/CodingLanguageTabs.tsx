import { Link } from "react-router-dom";
import { codingTracks, type CodingTrackKey } from "../data/codingTracks";
import { getAvailableCodingTracks } from "../data/codingLessons";

type CodingLanguageTabsProps = {
  currentTrack: CodingTrackKey;
};

export function CodingLanguageTabs({ currentTrack }: Readonly<CodingLanguageTabsProps>) {
  const availableTrackKeys = new Set(getAvailableCodingTracks());
  const availableTracks = codingTracks.filter((track) => availableTrackKeys.has(track.key));

  if (availableTracks.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Coding practice languages" className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-[0_10px_28px_-20px_rgba(15,23,42,0.55)]">
      <div className="flex items-stretch gap-0 overflow-x-auto whitespace-nowrap">
        {availableTracks.map((track) => {
          const isActive = track.key === currentTrack;

          return (
            <Link
              key={track.key}
              to={`/coding/${track.key}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-11 shrink-0 items-center border-r border-slate-100 px-4 text-xs font-semibold uppercase tracking-[0.14em] transition sm:px-5 ${
                isActive ? "bg-cyan-100 text-cyan-950" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {track.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
