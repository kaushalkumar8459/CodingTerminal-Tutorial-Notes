import type { TrackKey } from "./tracks";

export type SearchIndexEntry = {
  track: TrackKey;
  slug: string;
  title: string;
  dayLabel: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  estimatedMinutes: number;
  order: number;
  contentPath: string;
  headings: string[];
  text: string;
};

type PreparedSearchEntry = {
  track: TrackKey;
  slug: string;
  searchableText: string;
};

let cachedSearchIndex: SearchIndexEntry[] | null = null;
let pendingSearchIndexRequest: Promise<SearchIndexEntry[]> | null = null;
let cachedPreparedIndex: PreparedSearchEntry[] | null = null;
const queryResultCache = new Map<string, string[]>();

function normalizeQuery(query: string) {
  return query.trim().toLowerCase();
}

function prepareIndex(entries: SearchIndexEntry[]) {
  return entries.map((entry) => ({
    track: entry.track,
    slug: entry.slug,
    searchableText:
      `${entry.title} ${entry.dayLabel} ${entry.level} ${entry.headings.join(" ")} ${entry.text}`.toLowerCase(),
  }));
}

export async function loadSearchIndex() {
  if (cachedSearchIndex) {
    return cachedSearchIndex;
  }

  if (!pendingSearchIndexRequest) {
    pendingSearchIndexRequest = fetch("/search-index.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load search index.");
        }

        const payload = (await response.json()) as SearchIndexEntry[];
        cachedSearchIndex = payload;
        cachedPreparedIndex = prepareIndex(payload);
        queryResultCache.clear();
        return payload;
      })
      .finally(() => {
        pendingSearchIndexRequest = null;
      });
  }

  return pendingSearchIndexRequest;
}

export async function searchLessonSlugs(track: TrackKey, query: string) {
  const normalized = normalizeQuery(query);

  if (!normalized) {
    return [] as string[];
  }

  await loadSearchIndex();
  const prepared = cachedPreparedIndex ?? [];
  const cacheKey = `${track}::${normalized}`;
  const cached = queryResultCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const results = prepared
    .filter(
      (entry) =>
        entry.track === track && entry.searchableText.includes(normalized),
    )
    .map((entry) => entry.slug);

  // Keep cache bounded to avoid unbounded memory growth with many unique queries.
  if (queryResultCache.size > 120) {
    const oldestKey = queryResultCache.keys().next().value;
    if (oldestKey) {
      queryResultCache.delete(oldestKey);
    }
  }

  queryResultCache.set(cacheKey, results);

  return results;
}
