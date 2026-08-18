---
title: Reusable Logic Patterns
slug: day-034-reusable-logic-patterns
dayLabel: Day 34
level: Intermediate
estimatedMinutes: 75
order: 34
track: react
---
# Day 34 [Intermediate]: Reusable Logic Patterns

## Goal

Build reusable hooks for **async data, debouncing, pagination, and cancellation**, while learning where abstraction helps and where it becomes too generic.

## Prerequisites

- Day 33 custom hooks
- `useEffect`
- `useRef`
- Fetch/HTTP basics
- cleanup and `AbortController`

## 1. A Reusable Hook Needs a Contract

A hook should expose a small, predictable API.

For async data, a useful starting contract is:

```jsx
const {
  data,
  loading,
  error,
  refetch,
} = useFetch(url);
```

The consuming component owns the UI decision. The hook owns reusable behavior.

## 2. `useFetch`: Correct Async Lifecycle

A robust fetch hook needs to consider:

- initial loading
- success
- HTTP errors
- network errors
- cancellation
- dependency changes
- retry/refetch
- stale responses

```jsx
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function run() {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error.name === "AbortError") return;
        setState({ data: null, loading: false, error });
      }
    }

    run();
    return () => controller.abort();
  }, [url]);

  return state;
}
```

For production use, consider a dedicated server-state library when caching, deduplication, invalidation, retries, and synchronization become substantial requirements.

## 3. Refetch API

A refetch function is useful when a user explicitly requests another attempt.

A good design must avoid accidentally creating an effect loop. One approach is to keep a request version in state:

```jsx
const [requestId, setRequestId] = useState(0);

useEffect(() => {
  // request
}, [url, requestId]);

const refetch = useCallback(() => setRequestId((id) => id + 1), []);
```

The exact implementation can vary, but the dependency graph should remain understandable.

## 4. Debouncing

Debouncing means waiting until input has remained unchanged for a specified period before publishing the new value.

```jsx
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

Timeline:

```text
User types: R → Re → Rea → Reac → React
                  ↓ reset timer each time
No typing for 400ms
                  ↓
Publish "React"
```

Debouncing reduces request frequency; it does not guarantee that old requests cannot race with new ones. Cancellation or response coordination is still important.

## 5. Pagination

A reusable pagination hook can own page navigation but should not assume how data is fetched.

```jsx
function usePagination({ initialPage = 1, totalPages = Infinity } = {}) {
  const [page, setPage] = useState(initialPage);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return { page, next, prev, goToPage };
}
```

A hook like this should not know about a particular API endpoint.

## 6. Combining Pagination With Server Data

```jsx
const { page, next, prev } = usePagination({ totalPages });
const url = `/api/jobs?page=${page}`;
const { data, loading, error } = useFetch(url);
```

The composition is clearer than one giant `useJobsExplorer` hook that contains every concern.

## 7. Cancellation and Race Conditions

Consider:

```text
Request A: "rea"
Request B: "react"
```

If B completes first and A completes later, an unprotected implementation can overwrite the newer result with stale data.

`AbortController` can cancel the old request:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

Cancellation is especially useful when the underlying API supports it.

## 8. Hook Composition

Prefer small hooks with clear responsibilities:

```text
useSearch
   ↓
useDebounce
   ↓
URL/query construction
   ↓
useFetch
   ↓
UI state
```

This makes each unit easier to test and replace.

## 9. Do Not Put UI Into Reusable Logic

Avoid:

```jsx
function useFetch() {
  return <Spinner />; // ❌
}
```

Prefer:

```jsx
return { data, loading, error };
```

The component decides whether the UI should be a spinner, skeleton, inline status, or something else.

## 10. Avoid Generic Hook Overload

Bad abstraction:

```jsx
useApi({
  mode,
  transform,
  retry,
  pagination,
  debounce,
  cache,
  optimistic,
  ...
});
```

This may hide too much behavior. Compose smaller primitives unless a stable domain-specific abstraction has emerged.

## 11. Complete Jobs Explorer Example

```jsx
function JobsExplorer() {
  const { query, setQuery, clear } = useSearch();
  const debouncedQuery = useDebounce(query, 400);
  const { page, next, prev } = usePagination();

  const params = new URLSearchParams({
    q: debouncedQuery,
    page: String(page),
  });

  const { data, loading, error } = useFetch(`/api/jobs?${params}`);

  return (
    <main>
      <label htmlFor="jobs-search">Search jobs</label>
      <input
        id="jobs-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={clear}>Clear</button>

      {loading && <p>Loading jobs…</p>}
      {error && <p role="alert">Unable to load jobs.</p>}
      {data?.items?.length === 0 && <p>No jobs found.</p>}

      {data?.items?.map((job) => (
        <article key={job.id}>{job.title}</article>
      ))}

      <button type="button" onClick={prev}>Previous</button>
      <button type="button" onClick={next}>Next</button>
    </main>
  );
}
```

The example demonstrates composition, but the hooks remain independently reusable.

## 12. Error Semantics

A reusable hook should distinguish cancellation from an actual failure.

```jsx
catch (error) {
  if (error.name === "AbortError") return;
  // real error
}
```

Do not show "Request failed" to a user merely because the component unmounted and its request was intentionally cancelled.

## 13. Testing Strategy

Test each hook's public behavior independently:

### `useDebounce`
- initial value
- delayed update
- timer reset when value changes
- cleanup

### `usePagination`
- initial page
- next/previous boundaries
- direct navigation

### `useFetch`
- loading
- success
- HTTP error
- network error
- cancellation
- dependency change

Then test the composed feature to verify that the hooks work together.

## Common Mistakes

1. Fetch hook does not check `response.ok`.
2. Debounce without cleanup creates stale timers.
3. Pagination allows page 0 or beyond the final page.
4. Cancellation is treated as an error.
5. Hook returns UI instead of behavior.
6. One hook owns unrelated responsibilities.
7. Refetch changes dependencies in a way that causes an unintended loop.
8. A stale request can overwrite newer results.

## Hands-on Labs

### Lab 1 — Build `useDebounce`
Implement and test the timer cleanup.

### Lab 2 — Build `usePagination`
Add bounds and `goToPage`.

### Lab 3 — Build `useFetch`
Add loading/error/data and HTTP validation.

### Lab 4 — Add cancellation
Verify that changing the URL cancels the previous request.

### Lab 5 — Compose
Build a debounced, paginated search screen using the three hooks.

## Assessment

1. What does debouncing solve?
2. Why does debouncing not completely solve request races?
3. Why should a reusable fetch hook check `response.ok`?
4. What should happen to an aborted request?
5. Why separate pagination from fetching?
6. What is hook composition?
7. When is a hook too generic?
8. When should server-state management move to a dedicated library?

## Interview Questions

**Q: Why use `AbortController` in a fetch hook?**  
To cancel obsolete requests and avoid unnecessary work when dependencies change or a component unmounts.

**Q: Is debounce the same as throttle?**  
No. Debounce waits for a pause; throttle limits execution to a maximum frequency over time.

**Q: Why shouldn't `useFetch` render a spinner?**  
Reusable logic should expose state; the consuming component should own presentation.

**Q: What happens if two requests race?**  
An older response can overwrite newer state unless requests are cancelled or responses are otherwise coordinated.

**Q: When would you use TanStack Query instead of building `useFetch`?**  
When the application needs mature server-state features such as caching, invalidation, deduplication, retries, background refetching, and query lifecycle management.

## Final Project

Build a **Jobs Explorer** with:

- debounced search
- pagination
- loading/error/empty states
- cancellation
- retry
- reusable `useSearch`, `useDebounce`, `usePagination`, and `useFetch`
- clean hook contracts

Document the responsibility of each hook and why the hooks are composed instead of merged into one large abstraction.

## Self Check

- [ ] I can build a cancellation-safe fetch hook.
- [ ] I understand debounce vs cancellation.
- [ ] I can design bounded pagination.
- [ ] I can compose small hooks.
- [ ] I know when not to create a generic hook.
- [ ] I can explain when a server-state library becomes appropriate.

## Day 34 Outcome

You can now build reusable async and interaction primitives with clear responsibilities. Day 35 applies these patterns in a complete **search and filter application**.