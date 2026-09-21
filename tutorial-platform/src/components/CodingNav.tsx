import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import type { CodingTrackKey } from "../data/codingTracks";
import type { CodingLessonMeta } from "../data/codingLessons";

type CodingNavProps = {
  track: CodingTrackKey;
  lessons: CodingLessonMeta[];
};

export function CodingNav({ track, lessons }: Readonly<CodingNavProps>) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleLessons = useMemo(() => {
    if (!normalizedQuery) {
      return lessons;
    }

    return lessons.filter(
      (lesson) =>
        lesson.title.toLowerCase().includes(normalizedQuery) ||
        lesson.dayLabel.toLowerCase().includes(normalizedQuery),
    );
  }, [lessons, normalizedQuery]);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.55)] sm:p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xs">
        {lessons.length} Practice Days
      </p>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search practice days..."
        aria-label="Search coding practice days"
        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-cyan-500"
      />

      <nav aria-label="Coding practice days" className="mt-3 max-h-[70vh] space-y-1 overflow-y-auto pr-1">
        {visibleLessons.map((lesson) => (
          <NavLink
            key={lesson.slug}
            to={`/coding/${track}/${lesson.slug}`}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-cyan-100 text-cyan-950"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <span className="mr-2 text-xs font-semibold text-cyan-700">{lesson.dayLabel}</span>
            {lesson.title}
          </NavLink>
        ))}

        {visibleLessons.length === 0 ? (
          <p className="px-3 py-2 text-sm text-slate-500">No matching practice days.</p>
        ) : null}
      </nav>
    </aside>
  );
}
