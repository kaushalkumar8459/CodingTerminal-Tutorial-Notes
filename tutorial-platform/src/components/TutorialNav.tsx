import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { searchLessonSlugs } from "../data/searchIndex";
import type { TrackKey } from "../data/tracks";
import type { TutorialMeta } from "../types/tutorial";

type TutorialNavProps = {
  track: TrackKey;
  tutorials: TutorialMeta[];
};

export function TutorialNav({ track, tutorials }: Readonly<TutorialNavProps>) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchSlugSet, setSearchSlugSet] = useState<Set<string> | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleTutorials = useMemo(() => {
    if (!normalizedQuery) {
      return tutorials;
    }

    return tutorials.filter((tutorial) => {
      if (!searchSlugSet) {
        return tutorial.title.toLowerCase().includes(normalizedQuery);
      }

      return searchSlugSet.has(tutorial.slug);
    });
  }, [normalizedQuery, searchSlugSet, tutorials]);

  useEffect(() => {
    if (!normalizedQuery) {
      setSearchSlugSet(null);
      setIsSearching(false);
      return;
    }

    if (normalizedQuery.length < 2) {
      // Keep 1-char searches instant by title-only filtering.
      setSearchSlugSet(null);
      setIsSearching(false);
      return;
    }

    let isCancelled = false;

    const runSearch = async () => {
      try {
        setIsSearching(true);
        const slugs = await searchLessonSlugs(track, normalizedQuery);

        if (isCancelled) {
          return;
        }

        setSearchSlugSet(new Set(slugs));
      } catch {
        if (!isCancelled) {
          setSearchSlugSet(new Set());
        }
      } finally {
        if (!isCancelled) {
          setIsSearching(false);
        }
      }
    };

    void runSearch();

    return () => {
      isCancelled = true;
    };
  }, [normalizedQuery, track]);

  useEffect(() => {
    if (!isMobileDrawerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileDrawerOpen]);

  return (
    <>
      <aside className="rounded-3xl border border-slate-200/70 bg-white/80 p-4 shadow-[0_12px_35px_-20px_rgba(15,23,42,0.55)] backdrop-blur sm:p-5 lg:sticky lg:top-6 lg:h-[calc(100vh-7.5rem)] lg:overflow-y-auto lg:overscroll-contain">
        <div className="flex items-center justify-between lg:block">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Lessons</h2>
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="rounded-lg border border-slate-300 bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 lg:hidden"
          >
            Browse
          </button>
        </div>

        <div className="mt-3 hidden lg:block">
          <label htmlFor="lesson-search" className="sr-only">Search lessons</label>
          <input
            id="lesson-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search lessons..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-500"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            {isSearching ? "Searching..." : `${visibleTutorials.length} result${visibleTutorials.length === 1 ? "" : "s"}`}
          </p>
          {query.trim().length === 1 ? <p className="text-[11px] text-slate-500">Type 2+ letters for full-text search.</p> : null}
        </div>

        <ul className="mt-4 hidden space-y-2 lg:block">
          {visibleTutorials.map((tutorial) => (
            <li key={tutorial.slug} className="min-w-0">
              <NavLink
                to={`/${track}/tutorial/${tutorial.slug}`}
                className={({ isActive }) =>
                  `block rounded-2xl border px-3 py-3 transition sm:px-4 ${
                    isActive
                      ? "border-cyan-400 bg-cyan-50 text-slate-950"
                      : "border-transparent bg-slate-50/70 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/70"
                  }`
                }
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{tutorial.dayLabel}</p>
                <p className="text-sm font-semibold leading-snug">{tutorial.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {tutorial.level} • {tutorial.estimatedMinutes} mins
                </p>
              </NavLink>
            </li>
          ))}
          {!isSearching && visibleTutorials.length === 0 ? (
            <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600">
              No lessons found for "{query.trim()}".
            </li>
          ) : null}
        </ul>
      </aside>

      {isMobileDrawerOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-[1px] lg:hidden" onClick={() => setIsMobileDrawerOpen(false)}>
          <section
            className="absolute inset-x-0 bottom-0 max-h-[78vh] rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Lessons</h3>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mb-3">
              <label htmlFor="lesson-search-mobile" className="sr-only">Search lessons</label>
              <input
                id="lesson-search-mobile"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search lessons..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-500"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                {isSearching ? "Searching..." : `${visibleTutorials.length} result${visibleTutorials.length === 1 ? "" : "s"}`}
              </p>
              {query.trim().length === 1 ? <p className="text-[11px] text-slate-500">Type 2+ letters for full-text search.</p> : null}
            </div>

            <ul className="max-h-[62vh] space-y-2 overflow-y-auto pr-1">
              {visibleTutorials.map((tutorial) => (
                <li key={tutorial.slug} className="min-w-0">
                  <NavLink
                    to={`/${track}/tutorial/${tutorial.slug}`}
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl border px-3 py-3 transition sm:px-4 ${
                        isActive
                          ? "border-cyan-400 bg-cyan-50 text-slate-950"
                          : "border-transparent bg-slate-50/70 text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/70"
                      }`
                    }
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{tutorial.dayLabel}</p>
                    <p className="text-sm font-semibold leading-snug">{tutorial.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {tutorial.level} • {tutorial.estimatedMinutes} mins
                    </p>
                  </NavLink>
                </li>
              ))}
              {!isSearching && visibleTutorials.length === 0 ? (
                <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600">
                  No lessons found for "{query.trim()}".
                </li>
              ) : null}
            </ul>
          </section>
        </div>
      ) : null}
    </>
  );
}
