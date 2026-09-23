import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_AUTH_API_BASE_URL?.trim() || "";

type ExperienceLevel = "any" | "fresher" | "junior" | "mid" | "senior";

type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string | null;
  source: string;
  applyUrl: string;
  description: string;
  experienceLevel: Exclude<ExperienceLevel, "any">;
  salary: string | null;
  remote: boolean;
};

type JobSourceInfo = {
  id: string;
  name: string;
  homepageUrl: string;
  requiresApiKey: boolean;
  configured: boolean;
};

type JobSourceDisplayStatus = "searching" | "ok" | "error" | "skipped";

type JobSourceResult = {
  id: string;
  name: string;
  status: JobSourceDisplayStatus;
  count: number;
  message?: string;
};

const LEVEL_LABELS: Record<ExperienceLevel, string> = {
  any: "Any level",
  fresher: "Fresher",
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
};

type DatePostedFilter = "any" | "today" | "week" | "month" | "custom";

const DATE_POSTED_LABELS: Record<DatePostedFilter, string> = {
  any: "Any time",
  today: "Today",
  week: "Last 7 days",
  month: "Last 30 days",
  custom: "Custom range",
};

const DATE_POSTED_MS: Record<"today" | "week" | "month", number> = {
  today: 86_400_000,
  week: 7 * 86_400_000,
  month: 30 * 86_400_000,
};

const LEVEL_BADGE_STYLES: Record<Exclude<ExperienceLevel, "any">, string> = {
  fresher: "bg-emerald-50 text-emerald-700",
  junior: "bg-sky-50 text-sky-700",
  mid: "bg-slate-100 text-slate-700",
  senior: "bg-violet-50 text-violet-700",
};

// External search deep-links only — these portals have no public free API and forbid scraping.
const EXTERNAL_SEARCH_LINKS = [
  {
    name: "LinkedIn",
    build: (query: string, location: string) =>
      `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
  },
  {
    name: "Naukri",
    build: (query: string, location: string) =>
      `https://www.naukri.com/${encodeURIComponent(query.replace(/\s+/g, "-").toLowerCase() || "jobs")}-jobs-in-${encodeURIComponent(location.replace(/\s+/g, "-").toLowerCase() || "india")}`,
  },
  {
    name: "Indeed",
    build: (query: string, location: string) =>
      `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}`,
  },
];

function formatPostedAt(postedAt: string | null) {
  if (!postedAt) return "Date unknown";
  const date = new Date(postedAt);
  if (Number.isNaN(date.getTime())) return "Date unknown";
  const daysAgo = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 30) return `${daysAgo}d ago`;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function stripHtml(html: string, maxLength = 220) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text;
}

export function JobsPage() {
  const [searchText, setSearchText] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("any");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [sources, setSources] = useState<JobSourceInfo[]>([]);
  const [sourceResults, setSourceResults] = useState<JobSourceResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isParsingWithAi, setIsParsingWithAi] = useState(false);
  const [status, setStatus] = useState<{ message: string; isError: boolean } | null>(null);
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  // Client-side quick filters applied on top of the already-fetched jobs (no re-fetch needed).
  const [portalFilter, setPortalFilter] = useState<Set<string>>(new Set());
  const [companyFilter, setCompanyFilter] = useState<Set<string>>(new Set());
  const [levelFilter, setLevelFilter] = useState<ExperienceLevel>("any");
  const [datePostedFilter, setDatePostedFilter] = useState<DatePostedFilter>("any");
  const [customDateFrom, setCustomDateFrom] = useState("");
  const [customDateTo, setCustomDateTo] = useState("");

  useEffect(() => {
    if (!apiBaseUrl) return;
    fetch(`${apiBaseUrl}/jobs/sources`)
      .then((response) => response.json())
      .then((data) => setSources(data.sources ?? []))
      .catch(() => setSources([]));
  }, []);

  async function runSearch(nextQuery: string, nextLocation: string, nextLevel: ExperienceLevel) {
    if (!apiBaseUrl) {
      setStatus({ message: "Configure VITE_AUTH_API_BASE_URL to search jobs.", isError: true });
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setHasSearched(true);
    // Show every known source as "searching" immediately, before the response arrives.
    setSourceResults(
      sources.map((source) => ({
        id: source.id,
        name: source.name,
        status: source.configured ? "searching" : "skipped",
        count: 0,
      })),
    );

    try {
      const url = new URL(`${apiBaseUrl}/jobs`);
      if (nextQuery) url.searchParams.set("query", nextQuery);
      if (nextLocation) url.searchParams.set("location", nextLocation);
      if (nextLevel !== "any") url.searchParams.set("experienceLevel", nextLevel);

      const response = await fetch(url);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to load jobs.");
      }

      setJobs(data.jobs ?? []);
      setSourceResults(data.sourceResults ?? []);
      setPortalFilter(new Set());
      setCompanyFilter(new Set());
      setLevelFilter("any");
      setDatePostedFilter("any");
      setCustomDateFrom("");
      setCustomDateTo("");
      setOpenDetailsId(null);
      if ((data.jobs ?? []).length === 0) {
        setStatus({ message: "No jobs found. Try different keywords or location.", isError: false });
      }
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : "Unable to load jobs.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await runSearch(query.trim(), location.trim(), experienceLevel);
  }

  async function handleAiSearch() {
    const trimmedText = searchText.trim();
    if (!trimmedText) {
      setStatus({ message: "Type a search sentence first, e.g. 'remote react jobs for freshers'.", isError: true });
      return;
    }

    if (!apiBaseUrl) {
      setStatus({ message: "Configure VITE_AUTH_API_BASE_URL to use AI search.", isError: true });
      return;
    }

    setIsParsingWithAi(true);
    setStatus(null);

    try {
      const response = await fetch(`${apiBaseUrl}/jobs/parse-query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmedText }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to parse search text.");
      }

      const criteria = data.criteria as { query: string; location: string; experienceLevel: ExperienceLevel };
      setQuery(criteria.query);
      setLocation(criteria.location);
      setExperienceLevel(criteria.experienceLevel);
      await runSearch(criteria.query, criteria.location, criteria.experienceLevel);
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : "Unable to parse search text.",
        isError: true,
      });
    } finally {
      setIsParsingWithAi(false);
    }
  }

  const homepageById = new Map(sources.map((source) => [source.id, source.homepageUrl]));

  const STATUS_ROW_STYLES: Record<JobSourceDisplayStatus, string> = {
    searching: "text-cyan-700",
    ok: "text-emerald-700",
    error: "text-rose-700",
    skipped: "text-slate-400",
  };

  const STATUS_LABEL: Record<JobSourceDisplayStatus, string> = {
    searching: "⏳ Searching…",
    ok: "✅ Searched",
    error: "⚠️ Failed",
    skipped: "○ Skipped",
  };

  // Before a search runs, show the known portals as "not started yet" so the panel is never empty.
  const portalRows: Array<{ id: string; name: string; homepageUrl?: string; status: JobSourceDisplayStatus; count: number; message?: string }> =
    sourceResults.length > 0
      ? sourceResults.map((result) => ({ ...result, homepageUrl: homepageById.get(result.id) }))
      : sources.map((source) => ({
          id: source.id,
          name: source.name,
          homepageUrl: source.homepageUrl,
          status: "skipped" as const,
          count: 0,
          message: source.configured ? "Not searched yet" : "Needs an API key configured on the server",
        }));

  function toggleSetValue(setter: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) {
    setter((previous) => {
      const next = new Set(previous);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  }

  const companyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    jobs.forEach((job) => counts.set(job.company, (counts.get(job.company) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const dateThresholdMs =
      datePostedFilter === "any" || datePostedFilter === "custom" ? null : DATE_POSTED_MS[datePostedFilter];
    const now = Date.now();
    const fromTime = customDateFrom ? new Date(customDateFrom).getTime() : null;
    // Include the entire "to" day by pushing the boundary to its end (23:59:59.999).
    const toTime = customDateTo ? new Date(customDateTo).getTime() + 86_400_000 - 1 : null;

    return jobs.filter((job) => {
      if (portalFilter.size > 0 && !portalFilter.has(job.source)) return false;
      if (companyFilter.size > 0 && !companyFilter.has(job.company)) return false;
      if (levelFilter !== "any" && job.experienceLevel !== levelFilter) return false;
      if (dateThresholdMs !== null) {
        if (!job.postedAt) return false;
        const postedTime = new Date(job.postedAt).getTime();
        if (Number.isNaN(postedTime) || now - postedTime > dateThresholdMs) return false;
      }
      if (datePostedFilter === "custom" && (fromTime !== null || toTime !== null)) {
        if (!job.postedAt) return false;
        const postedTime = new Date(job.postedAt).getTime();
        if (Number.isNaN(postedTime)) return false;
        if (fromTime !== null && postedTime < fromTime) return false;
        if (toTime !== null && postedTime > toTime) return false;
      }
      return true;
    });
  }, [jobs, portalFilter, companyFilter, levelFilter, datePostedFilter, customDateFrom, customDateTo]);

  const hasActiveQuickFilters =
    portalFilter.size > 0 ||
    companyFilter.size > 0 ||
    levelFilter !== "any" ||
    datePostedFilter !== "any" ||
    Boolean(customDateFrom) ||
    Boolean(customDateTo);

  function clearQuickFilters() {
    setPortalFilter(new Set());
    setCompanyFilter(new Set());
    setLevelFilter("any");
    setDatePostedFilter("any");
    setCustomDateFrom("");
    setCustomDateTo("");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff,#fff8e7_42%,#eef2ff)] text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 transition hover:text-cyan-700"
        >
          &larr; Back to Home
        </Link>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Tools</p>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-950 sm:text-3xl">💼 Job Search</h1>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Search jobs aggregated from multiple portals in one place. Applying redirects you to the original job portal.
        </p>

        <div className="mt-6 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_300px] xl:items-start">
          {/* Left: search controls */}
          <aside className="xl:sticky xl:top-2 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur sm:p-6">
            <label className="text-sm font-semibold text-slate-700" htmlFor="job-ai-search">
              🤖 Search with a sentence (AI-assisted)
            </label>
            <div className="mt-2 flex flex-col gap-2">
              <input
                id="job-ai-search"
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="e.g. remote react jobs for freshers in Bangalore"
                className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleAiSearch}
                disabled={isParsingWithAi}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isParsingWithAi ? (
                  <>
                    <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Thinking...
                  </>
                ) : "AI Search"}
              </button>
            </div>

            <div className="my-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or filter manually
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSearch} className="grid gap-3">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Keywords (e.g. react developer)"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
              />
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
              />
              <select
                value={experienceLevel}
                onChange={(event) => setExperienceLevel(event.target.value as ExperienceLevel)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoading ? (
                  <>
                    <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Searching...
                  </>
                ) : "Search"}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="w-full font-semibold">More sources:</span>
              {EXTERNAL_SEARCH_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.build(query, location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 font-semibold text-slate-700 transition hover:bg-cyan-50"
                >
                  Search on {link.name} ↗
                </a>
              ))}
            </div>
          </aside>

          {/* Middle: results */}
          <div className="min-w-0">
            {status ? (
              <p className={`mb-3 text-sm ${status.isError ? "text-rose-600" : "text-slate-600"}`}>{status.message}</p>
            ) : null}

            {!isLoading && jobs.length > 0 ? (
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span>
                  Showing <strong className="text-slate-900">{filteredJobs.length}</strong> of{" "}
                  <strong className="text-slate-900">{jobs.length}</strong> jobs
                </span>
                {hasActiveQuickFilters ? (
                  <button
                    type="button"
                    onClick={clearQuickFilters}
                    className="font-semibold text-cyan-700 underline-offset-2 hover:underline"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            ) : null}

            {isLoading ? (
              <ul className="space-y-3">
                {[0, 1, 2].map((key) => (
                  <li key={key} className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-slate-100" />
                    <div className="mt-3 h-3 w-1/2 rounded bg-slate-100" />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {filteredJobs.map((job) => (
                  <li
                    key={job.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.55)] transition hover:shadow-[0_16px_32px_-20px_rgba(15,23,42,0.65)] sm:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="text-base font-bold text-slate-950 sm:text-lg">{job.title}</h2>
                        <p className="mt-1 text-sm text-slate-700">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-semibold capitalize text-cyan-800">
                          {job.source}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOpenDetailsId((current) => (current === job.id ? null : job.id))}
                          aria-expanded={openDetailsId === job.id}
                          title="Show details"
                          className="rounded-full border border-slate-300 px-1.5 py-0.5 text-xs font-bold text-slate-500 transition hover:border-cyan-500 hover:text-cyan-700"
                        >
                          ⓘ
                        </button>
                      </div>
                    </div>

                    {openDetailsId === job.id ? (
                      <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-700">
                        <p><span className="font-semibold text-slate-900">Company:</span> {job.company}</p>
                        <p><span className="font-semibold text-slate-900">Location:</span> {job.location}</p>
                        <p><span className="font-semibold text-slate-900">Source:</span> {job.source}</p>
                        {job.description ? (
                          <p className="mt-1.5 text-slate-600">{stripHtml(job.description)}</p>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className={`rounded-md px-2 py-1 font-semibold capitalize ${LEVEL_BADGE_STYLES[job.experienceLevel]}`}>
                        {job.experienceLevel}
                      </span>
                      {job.remote ? (
                        <span className="rounded-md bg-teal-50 px-2 py-1 font-semibold text-teal-700">Remote</span>
                      ) : null}
                      {job.salary ? (
                        <span className="rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700">{job.salary}</span>
                      ) : null}
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">{formatPostedAt(job.postedAt)}</span>
                    </div>

                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                    >
                      Apply on {job.source} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {!isLoading && hasSearched && jobs.length === 0 && !status ? (
              <p className="mt-8 text-center text-sm text-slate-500">No jobs found. Try different keywords.</p>
            ) : null}

            {!isLoading && hasSearched && jobs.length > 0 && filteredJobs.length === 0 ? (
              <p className="mt-8 text-center text-sm text-slate-500">
                No jobs match your filters.{" "}
                <button type="button" onClick={clearQuickFilters} className="font-semibold text-cyan-700 underline-offset-2 hover:underline">
                  Clear filters
                </button>
              </p>
            ) : null}

            {!hasSearched && !isLoading ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center text-sm text-slate-500">
                Search above to see aggregated job listings from all connected portals.
              </div>
            ) : null}
          </div>


          {/* Right: portal status + dynamic filters */}
          <div className="flex flex-col gap-4 xl:sticky xl:top-2">
            {portalRows.length > 0 ? (
              <section
                aria-live="polite"
                className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur"
              >
                <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  <span>Job Portal</span>
                  <span className="text-right">Status</span>
                  <span className="text-right">Jobs Found</span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {portalRows.map((row) => {
                    const isSelected = portalFilter.has(row.id);
                    const isClickable = row.status === "ok" && row.count > 0;
                    return (
                      <li
                        key={row.id}
                        role={isClickable ? "button" : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                        onClick={isClickable ? () => toggleSetValue(setPortalFilter, row.id) : undefined}
                        onKeyDown={
                          isClickable
                            ? (event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  toggleSetValue(setPortalFilter, row.id);
                                }
                              }
                            : undefined
                        }
                        aria-pressed={isClickable ? isSelected : undefined}
                        title={
                          isClickable
                            ? `Filter results to only ${row.name}`
                            : row.status === "ok"
                              ? `Found ${row.count} jobs`
                              : row.message
                        }
                        className={`grid grid-cols-[1fr_auto_auto] items-center gap-2 px-4 py-2 text-sm transition ${isClickable ? "cursor-pointer hover:bg-cyan-50" : ""} ${isSelected ? "bg-cyan-50" : ""}`}
                      >
                        <span className="font-semibold text-slate-800">
                          {isSelected ? "☑ " : ""}
                          {row.homepageUrl ? (
                            <a
                              href={row.homepageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="hover:text-cyan-700 hover:underline"
                            >
                              {row.name} ↗
                            </a>
                          ) : (
                            row.name
                          )}
                        </span>
                        <span className={`text-right text-xs font-semibold ${STATUS_ROW_STYLES[row.status]}`}>
                          {STATUS_LABEL[row.status]}
                        </span>
                        <span className="text-right text-xs font-semibold text-slate-600">
                          {row.status === "ok" ? row.count : "—"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {portalFilter.size > 0 ? (
                  <button
                    type="button"
                    onClick={() => setPortalFilter(new Set())}
                    className="w-full border-t border-slate-100 px-4 py-2 text-left text-xs font-semibold text-cyan-700 hover:bg-cyan-50"
                  >
                    Clear portal filter
                  </button>
                ) : null}
              </section>
            ) : null}

            {jobs.length > 0 ? (
              <section className="overflow-hidden rounded-2xl border border-white/60 bg-white/90 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.55)] backdrop-blur">
                <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Filters
                </div>

                <div className="p-4">
                  <p className="text-xs font-semibold text-slate-600">Experience level</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {Object.entries(LEVEL_LABELS).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setLevelFilter(value as ExperienceLevel)}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                          levelFilter === value ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-xs font-semibold text-slate-600">Date posted</p>
                  <select
                    value={datePostedFilter}
                    onChange={(event) => setDatePostedFilter(event.target.value as DatePostedFilter)}
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  >
                    {Object.entries(DATE_POSTED_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>

                  {datePostedFilter === "custom" ? (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <label className="text-xs text-slate-600">
                        From
                        <input
                          type="date"
                          value={customDateFrom}
                          max={customDateTo || undefined}
                          onChange={(event) => setCustomDateFrom(event.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs"
                        />
                      </label>
                      <label className="text-xs text-slate-600">
                        To
                        <input
                          type="date"
                          value={customDateTo}
                          min={customDateFrom || undefined}
                          max={new Date().toISOString().slice(0, 10)}
                          onChange={(event) => setCustomDateTo(event.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs"
                        />
                      </label>
                    </div>
                  ) : null}

                  {companyCounts.length > 0 ? (
                    <>
                      <p className="mt-4 text-xs font-semibold text-slate-600">Company</p>
                      <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto pr-1">
                        {companyCounts.map(([company, count]) => (
                          <li key={company}>
                            <label className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-1.5 py-1 text-xs text-slate-700 hover:bg-slate-50">
                              <span className="flex min-w-0 items-center gap-1.5">
                                <input
                                  type="checkbox"
                                  checked={companyFilter.has(company)}
                                  onChange={() => toggleSetValue(setCompanyFilter, company)}
                                  className="shrink-0"
                                />
                                <span className="truncate">{company}</span>
                              </span>
                              <span className="shrink-0 text-slate-400">{count}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

