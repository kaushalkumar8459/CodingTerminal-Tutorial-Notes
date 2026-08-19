---
title: Reusable Logic Patterns
slug: day-034-reusable-logic-patterns
dayLabel: Day 34
level: Intermediate
estimatedMinutes: 120
order: 34
track: react
---
# Day 34 [Intermediate]: Reusable Logic Patterns

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [1. What Makes Logic Reusable?](#1-what-makes-logic-reusable)
- [2. Hook Contracts](#2-hook-contracts)
- [3. `useFetch` and Async Lifecycle](#3-usefetch-and-async-lifecycle)
- [4. Refetch and Request Identity](#4-refetch-and-request-identity)
- [5. Debouncing](#5-debouncing)
- [6. Pagination](#6-pagination)
- [7. Cancellation and Race Conditions](#7-cancellation-and-race-conditions)
- [8. Hook Composition](#8-hook-composition)
- [9. UI vs Logic Responsibility](#9-ui-vs-logic-responsibility)
- [10. Avoiding Over-Abstraction](#10-avoiding-over-abstraction)
- [11. Complete Jobs Explorer](#11-complete-jobs-explorer)
- [12. Accessibility and UX](#12-accessibility-and-ux)
- [13. Testing Strategy](#13-testing-strategy)
- [14. Common Mistakes](#14-common-mistakes)
- [15. Debugging Lab](#15-debugging-lab)
- [16. Hands-on Labs](#16-hands-on-labs)
- [Assessment Quiz](#assessment-quiz)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Production Checklist](#production-checklist)
- [Final Project](#final-project)
- [Self Check](#self-check)
- [Day 34 Outcome](#day-34-outcome)

## Goal

Build reusable hooks for **async data, debouncing, pagination, cancellation, and interaction state**, while learning how to design small contracts instead of one giant generic hook.

## Prerequisites

- Day 33 custom hooks
- `useState`, `useEffect`, `useCallback`
- `useRef`
- Fetch/HTTP basics
- cleanup and `AbortController`
- basic accessibility

## Learning Outcomes

By the end of this lesson you can:

- identify logic that is genuinely reusable
- design a small custom-hook contract
- build a cancellation-aware async hook
- distinguish HTTP failures, network failures, and cancellation
- implement debounce correctly with cleanup
- build bounded pagination
- reason about stale responses and request identity
- compose hooks without coupling unrelated concerns
- test hook behavior independently
- recognize when a server-state library is a better choice

## 1. What Makes Logic Reusable?

Reusable logic is behavior that can be expressed without owning a specific screen's markup.

Good candidates:

- debounce timing
- pagination state
- keyboard shortcuts
- online/offline state
- async request lifecycle
- subscriptions
- local-storage synchronization

Poor candidates:

- a hook that returns a particular page's JSX
- a hook with dozens of unrelated flags
- an abstraction created after seeing only one use case

A useful rule:

```text
Repeated behavior + stable responsibility + clear API
                         ↓
                  reusable hook
```

## 2. Hook Contracts

A hook should expose a small, predictable API.

For async data, a useful contract is:

```jsx
const {
  data,
  loading,
  error,
  refetch,
} = useFetch(url);
```

The component owns presentation. The hook owns behavior.

For a reusable hook, document:

- inputs
- outputs
- initial state
- error semantics
- cleanup behavior
- cancellation behavior
- dependency expectations

## 3. `useFetch` and Async Lifecycle

A robust fetch hook should consider:

- initial loading
- success
- HTTP errors
- network errors
- cancellation
- dependency changes
- retry/refetch
- stale responses
- unmount cleanup

Example teaching implementation:

```jsx
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function run() {
      setState((current) => ({
        data: current.data,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!active) return;
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error.name === "AbortError") return;
        if (!active) return;
        setState({ data: null, loading: false, error });
      }
    }

    run();

    return () => {
      active = false;
      controller.abort();
    };
  }, [url]);

  return state;
}
```

### Important distinction

`fetch()` does not reject merely because the server returns `404` or `500`. Check `response.ok` yourself.

Cancellation is also not the same as failure:

```text
success       → show data
HTTP failure  → show error
network error → show error
abort         → normally show nothing
```

For production applications, consider a server-state library once caching, deduplication, invalidation, retries, background refetching, and synchronization become substantial requirements.

## 4. Refetch and Request Identity

A refetch should create a new request without causing an accidental effect loop.

```jsx
const [requestVersion, setRequestVersion] = useState(0);

const refetch = useCallback(() => {
  setRequestVersion((version) => version + 1);
}, []);

useEffect(() => {
  // request using url + requestVersion
}, [url, requestVersion]);
```

The returned API should include `refetch`:

```jsx
return { data, loading, error, refetch };
```

When several requests can overlap, cancellation is useful, but a **request identity/version guard** can provide an additional correctness boundary:

```jsx
const requestIdRef = useRef(0);

async function run() {
  const requestId = ++requestIdRef.current;
  const result = await load();

  if (requestId !== requestIdRef.current) return;
  // safe to publish result
}
```

Do not assume cancellation is the only possible solution to stale-result problems.

## 5. Debouncing

Debouncing waits until input has remained unchanged for a specified period before publishing the new value.

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
R → Re → Rea → Reac → React
    ↓ reset timer after every change

400ms without typing
        ↓
publish "React"
```

Debouncing reduces request frequency. It does **not** by itself solve stale responses.

### Debounce vs throttle

- **Debounce:** run after activity pauses.
- **Throttle:** allow execution at most once per interval.

## 6. Pagination

Pagination should own page state, not a specific API endpoint.

```jsx
function usePagination({ initialPage = 1, totalPages = Infinity } = {}) {
  const [page, setPage] = useState(Math.max(1, initialPage));

  const next = () => {
    setPage((current) => Math.min(current + 1, totalPages));
  };

  const prev = () => {
    setPage((current) => Math.max(1, current - 1));
  };

  const goToPage = (nextPage) => {
    if (!Number.isInteger(nextPage)) return;
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return { page, next, prev, goToPage };
}
```

A production implementation should also define what happens when `totalPages` changes and the current page becomes invalid.

```jsx
useEffect(() => {
  setPage((current) => Math.min(current, Math.max(1, totalPages)));
}, [totalPages]);
```

## 7. Cancellation and Race Conditions

Consider a search:

```text
Request A: "rea"
Request B: "react"
```

If B finishes first and A finishes later, A can overwrite the newer result unless the implementation prevents it.

Cancellation:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

For stronger correctness, combine cancellation with request identity when the architecture allows overlapping work.

```text
new input
   ↓
new request identity
   ↓
cancel old request when possible
   ↓
ignore stale result if it still arrives
```

## 8. Hook Composition

Prefer small hooks with clear responsibilities:

```text
useSearch
   ↓
useDebounce
   ↓
query construction
   ↓
usePagination
   ↓
useFetch
   ↓
UI
```

Composition is often better than:

```text
useEverythingForJobsPage()
```

Each hook should have one primary reason to change.

## 9. UI vs Logic Responsibility

Avoid:

```jsx
function useFetch() {
  return <Spinner />; // ❌
}
```

Prefer:

```jsx
return { data, loading, error, refetch };
```

The component decides whether to render a spinner, skeleton, retry button, empty state, or inline error.

Reusable logic can still expose accessibility-relevant state, but it should not own page-specific presentation.

## 10. Avoiding Over-Abstraction

Avoid an abstraction like:

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

Prefer:

```text
useDebounce + usePagination + useFetch
```

Create a domain-specific composite hook only after its contract is proven across multiple consumers.

## 11. Complete Jobs Explorer

```jsx
function JobsExplorer() {
  const { query, setQuery, clear } = useSearch();
  const debouncedQuery = useDebounce(query, 400);
  const { page, next, prev } = usePagination();

  const url = useMemo(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
    params.set("page", String(page));
    return `/api/jobs?${params.toString()}`;
  }, [debouncedQuery, page]);

  const { data, loading, error, refetch } = useFetch(url);

  return (
    <main>
      <h1>Jobs Explorer</h1>

      <label htmlFor="jobs-search">Search jobs</label>
      <input
        id="jobs-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={clear}>Clear</button>

      {loading && <p role="status">Loading jobs…</p>}
      {error && (
        <div role="alert">
          <p>Unable to load jobs.</p>
          <button type="button" onClick={refetch}>Retry</button>
        </div>
      )}

      {!loading && !error && data?.items?.length === 0 && (
        <p>No jobs found.</p>
      )}

      <ul>
        {data?.items?.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>

      <button type="button" onClick={prev} disabled={page <= 1}>
        Previous
      </button>
      <span aria-live="polite">Page {page}</span>
      <button
        type="button"
        onClick={next}
        disabled={!data?.hasNextPage}
      >
        Next
      </button>
    </main>
  );
}
```

The important lesson is not the screen itself. It is the separation of responsibilities.

## 12. Accessibility and UX

Reusable hooks should enable good UI states rather than hide them.

The Jobs Explorer should support:

- an associated `<label>`
- keyboard interaction
- a programmatically identifiable loading state
- an accessible error state
- disabled pagination controls when appropriate
- a meaningful empty state
- retry without losing the user's search

Avoid announcing every intermediate debounce value as if it were a result.

## 13. Testing Strategy

Test each hook's public behavior independently.

### `useDebounce`

- initial value
- delayed update
- timer reset
- cleanup
- changed delay

### `usePagination`

- initial page
- previous boundary
- next boundary
- direct navigation
- invalid page input
- changing `totalPages`

### `useFetch`

- initial loading
- success
- HTTP error
- network error
- cancellation
- dependency change
- refetch
- stale-result protection

Use fake timers for debounce tests and controlled promises/mocks for race-condition tests.

Then test the composed Jobs Explorer as a user-facing feature.

## 14. Common Mistakes

1. Forgetting `response.ok`.
2. Treating cancellation as a visible error.
3. Debouncing without clearing the previous timer.
4. Assuming debounce solves request races.
5. Allowing page 0 or an invalid page.
6. Returning JSX from a reusable data hook.
7. Creating a hook with too many unrelated responsibilities.
8. Refetching by changing dependencies in an unintended loop.
9. Clearing useful existing data every time a request starts without considering UX.
10. Trusting a stale response merely because the request completed successfully.
11. Recreating an abstraction before there are multiple real consumers.
12. Rebuilding mature server-state behavior when a dedicated library is more appropriate.

## 15. Debugging Lab

### Bug 1 — stale search result

Request A starts before Request B but finishes afterward.

**Task:** prevent A from replacing B.

### Bug 2 — debounce never fires

A timer is recreated but the previous timer is not cleaned up.

**Task:** add effect cleanup.

### Bug 3 — pagination escapes bounds

`next()` continues after the final page.

**Task:** clamp against `totalPages` or server-provided `hasNextPage`.

### Bug 4 — retry loop

`refetch` changes a dependency that causes another state change which triggers another refetch.

**Task:** draw the dependency graph and make the trigger explicit.

### Bug 5 — cancellation shown as an error

An `AbortError` reaches the UI.

**Task:** treat intentional cancellation separately.

## 16. Hands-on Labs

### Lab 1 — Build `useDebounce`

Implement the hook with timer cleanup and tests.

### Lab 2 — Build `usePagination`

Add bounds, `goToPage`, and changing `totalPages` support.

### Lab 3 — Build `useFetch`

Add loading, data, error, HTTP validation, cancellation, and retry.

### Lab 4 — Add race protection

Use cancellation and/or request identity to prevent stale results.

### Lab 5 — Compose

Build a debounced, paginated search screen using independent hooks.

### Lab 6 — Production hardening

Add accessibility, tests, retry behavior, empty states, and a server-state-library decision note.

## Assessment Quiz

1. What does debouncing solve?
2. Why does debouncing not completely solve request races?
3. Why should a fetch hook check `response.ok`?
4. What should happen to an intentionally aborted request?
5. Why separate pagination from fetching?
6. What is hook composition?
7. Why can a request-ID guard complement `AbortController`?
8. When is a hook too generic?
9. Why should reusable hooks avoid page-specific JSX?
10. When should server-state management move to a dedicated library?

### Answers

1. It delays publication until input stops changing for the configured interval.
2. Requests already started can still finish out of order.
3. Fetch resolves normally for many HTTP error statuses.
4. Usually ignore it as an intentional lifecycle event.
5. It keeps pagination reusable and independent of an API contract.
6. It means combining focused hooks to build higher-level behavior.
7. Cancellation is not a universal guarantee that an old result cannot be observed.
8. When it accumulates unrelated options and responsibilities.
9. Presentation belongs to the consuming component.
10. When caching, invalidation, deduplication, retries, background synchronization, or query lifecycle become substantial.

## Interview Questions and Answers

**Q: Why use `AbortController` in a fetch hook?**  
To cancel obsolete work and clean up requests when dependencies change or a component unmounts.

**Q: Is debounce the same as throttle?**  
No. Debounce waits for a pause; throttle limits how frequently work can execute.

**Q: Why shouldn't `useFetch` render a spinner?**  
Because reusable logic should expose behavior/state while the consumer owns presentation.

**Q: What happens if two requests race?**  
An older response can overwrite newer state unless requests are cancelled or responses are coordinated.

**Q: Why check `response.ok`?**  
Because `fetch` does not reject simply because the server returned a `4xx` or `5xx` response.

**Q: When would you use TanStack Query instead of building `useFetch`?**  
When the application needs mature server-state capabilities such as caching, invalidation, deduplication, retries, background refetching, and query lifecycle management.

**Q: What is the biggest custom-hook design mistake?**  
Hiding too many unrelated concerns behind a single API that becomes difficult to understand and test.

## Production Checklist

- [ ] Hook API is small and documented.
- [ ] Inputs and outputs are explicit.
- [ ] Effect dependencies are correct.
- [ ] Timers/listeners/requests are cleaned up.
- [ ] Cancellation is distinguished from failure.
- [ ] Stale responses cannot corrupt current state.
- [ ] HTTP status handling is explicit.
- [ ] Existing data retention/loading UX is intentional.
- [ ] Pagination boundaries are safe.
- [ ] Accessibility is owned by the UI layer.
- [ ] Hooks are independently testable.
- [ ] No unnecessary `useCallback`/`useMemo` was added merely for appearance.
- [ ] Abstraction is justified by real reuse.
- [ ] A dedicated server-state library has been considered for complex requirements.

## Final Project

Build a **Jobs Explorer** with:

- debounced search
- pagination
- loading/error/empty states
- cancellation
- stale-result protection
- retry
- reusable `useSearch`, `useDebounce`, `usePagination`, and `useFetch`
- accessible controls
- hook-level tests
- a short architecture note explaining why the hooks remain separate

### Acceptance Criteria

- Search does not request on every keystroke.
- Changing the query cancels or safely supersedes obsolete work.
- Older results cannot overwrite newer results.
- Pagination never produces an invalid page.
- Retry does not create an effect loop.
- Loading, error, empty, and success states are distinguishable.
- Keyboard and screen-reader basics are supported.
- Each hook has one clear responsibility.
- Tests cover both normal and failure paths.

## Self Check

- [ ] I can explain logic reuse vs state sharing.
- [ ] I can design a small hook contract.
- [ ] I can build a cancellation-safe fetch hook.
- [ ] I understand debounce vs cancellation vs race protection.
- [ ] I can build bounded pagination.
- [ ] I can compose small hooks.
- [ ] I can test asynchronous hook behavior.
- [ ] I know when not to create a generic hook.
- [ ] I can explain when a server-state library becomes appropriate.

## Day 34 Outcome

You can now build reusable async and interaction primitives with clear contracts, cleanup, cancellation, race protection, testing, and accessibility-aware composition.

Day 35 applies these patterns in a complete **Search and Filter application**.