---
title: Reusable Logic Patterns
slug: day-034-reusable-logic-patterns
dayLabel: Day 34
level: Intermediate
estimatedMinutes: 150
order: 34
track: react
---
# Day 34 [Intermediate]: Reusable Logic Patterns

## Goal

Build reusable hooks for async data, debouncing, pagination, cancellation, race protection, and interaction state. The focus is not creating a giant generic hook; it is designing small contracts that remain understandable, testable, and composable.

## Prerequisites

- Day 33 custom hooks
- `useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`
- Fetch/HTTP basics
- cleanup and `AbortController`
- accessibility basics

## Learning Outcomes

By the end of this lesson you can:

- identify genuinely reusable behavior
- design a small hook contract
- model async lifecycle states explicitly
- distinguish HTTP failures, network failures, and cancellation
- implement debounce with cleanup
- build bounded pagination
- prevent stale responses with cancellation and request identity
- compose focused hooks
- preserve useful existing data during refreshes
- test async behavior and race conditions
- recognize when server-state libraries are more appropriate
- avoid over-abstraction

## 1. What Makes Logic Reusable?

Reusable logic is behavior that can be expressed without owning a particular screen's markup.

Good candidates:

- debounce timing
- pagination state
- keyboard shortcuts
- online/offline subscriptions
- async request lifecycle
- local-storage synchronization
- reusable validation or interaction state

Poor candidates:

- a hook that returns page-specific JSX
- a hook with dozens of unrelated flags
- an abstraction created after only one use case

A useful rule:

```text
Repeated behavior + stable responsibility + clear API
                         ↓
                  reusable hook
```

## 2. Hook Contracts

A hook should expose a small, predictable API.

```jsx
const {
  data,
  status,
  error,
  isRefreshing,
  refetch,
} = useFetch(url);
```

Document:

- inputs
- outputs
- initial state
- status semantics
- error semantics
- cleanup behavior
- cancellation behavior
- dependency expectations
- whether existing data is retained during refresh

### Prefer explicit status semantics

A boolean-only API can become ambiguous. A useful model is:

```text
idle → loading → success
             ↘ error
success → refreshing → success
                   ↘ error-with-data
```

`loading` and `refreshing` should not necessarily mean the same UX state.

## 3. `useFetch` and Async Lifecycle

A robust fetch hook should consider initial loading, success, HTTP errors, network errors, cancellation, dependency changes, retry/refetch, stale responses, and unmount cleanup.

```jsx
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    status: "loading",
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function run() {
      setState((current) => ({
        data: current.data,
        status: current.data == null ? "loading" : "refreshing",
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

        setState({ data, status: "success", error: null });
      } catch (error) {
        if (error?.name === "AbortError") return;
        if (!active) return;

        setState((current) => ({
          data: current.data,
          status: "error",
          error,
        }));
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

`fetch()` does not reject merely because the server returns `404` or `500`; check `response.ok`.

Cancellation is normally a lifecycle event, not a user-visible failure:

```text
success       → show data
HTTP failure  → show error
network error → show error
abort         → normally ignore
```

For production applications, consider a server-state library when caching, deduplication, invalidation, retries, background refetching, and synchronization become substantial requirements.

## 4. Refetch and Request Identity

A refetch should create a new request without causing an effect loop.

```jsx
const [requestVersion, setRequestVersion] = useState(0);

const refetch = useCallback(() => {
  setRequestVersion((version) => version + 1);
}, []);

useEffect(() => {
  // request using url + requestVersion
}, [url, requestVersion]);
```

When several requests can overlap, cancellation is useful, but request identity is an additional correctness boundary:

```jsx
const requestIdRef = useRef(0);

async function run() {
  const requestId = ++requestIdRef.current;
  const result = await load();

  if (requestId !== requestIdRef.current) return;
  publish(result);
}
```

The important distinction is:

```text
AbortController → asks old work to stop
Request identity → refuses stale work if it still completes
```

Using both can make async behavior more robust.

## 5. Debouncing

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

Debouncing reduces request frequency; it does not solve stale responses.

```text
R → Re → Rea → Reac → React
    ↓ reset timer after every change

400ms without typing
        ↓
publish "React"
```

**Debounce:** wait for inactivity.  
**Throttle:** limit execution frequency over time.

## 6. Pagination

Pagination should own page state, not a particular API endpoint.

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

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(1, totalPages)));
  }, [totalPages]);

  return { page, next, prev, goToPage };
}
```

For API-driven pagination, a server-provided `hasNextPage` can be more reliable than guessing from a local `totalPages` value.

## 7. Cancellation and Race Conditions

Consider:

```text
Request A: "rea"
Request B: "react"
```

If B finishes first and A finishes later, A must not overwrite B.

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

For stronger protection, combine cancellation with a request/version guard when overlapping work is possible.

```text
new input
   ↓
new request identity
   ↓
cancel old request when possible
   ↓
ignore stale result if it still arrives
```

### Cancellation is not the same as error handling

Never show a generic "Network error" merely because a request was intentionally aborted.

## 8. Hook Composition

Prefer focused hooks:

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

This is usually easier to reason about than:

```text
useEverythingForJobsPage()
```

Each hook should have one primary responsibility.

## 9. UI vs Logic Responsibility

Avoid:

```jsx
function useFetch() {
  return <Spinner />; // ❌
}
```

Prefer:

```jsx
return { data, status, error, refetch };
```

The component decides whether to render a spinner, skeleton, retry button, empty state, or inline error.

## 10. Avoiding Over-Abstraction

Avoid a hook like:

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

Prefer focused primitives such as:

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

  const { data, status, error, refetch } = useFetch(url);
  const isBusy = status === "loading" || status === "refreshing";

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

      {status === "loading" && <p role="status">Loading jobs…</p>}
      {status === "refreshing" && <p role="status">Updating results…</p>}

      {status === "error" && (
        <div role="alert">
          <p>Unable to load jobs.</p>
          <button type="button" onClick={refetch}>Retry</button>
        </div>
      )}

      {status === "success" && data?.items?.length === 0 && (
        <p>No jobs found.</p>
      )}

      <ul aria-busy={isBusy}>
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
        disabled={!data?.hasNextPage || isBusy}
      >
        Next
      </button>
    </main>
  );
}
```

The important lesson is the separation of responsibilities, not the page markup.

## 12. Accessibility and UX

Reusable hooks should enable good UI states rather than hide presentation.

The Jobs Explorer should support:

- associated labels
- keyboard interaction
- identifiable loading status
- accessible error state
- disabled pagination at boundaries
- meaningful empty state
- retry without losing search input
- preserving useful existing data during refresh where appropriate

Avoid announcing every intermediate debounce value as if it were a completed result.

## 13. Testing Strategy

Test each hook's observable contract.

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
- existing-data behavior during refresh

Use fake timers for debounce tests and controlled promises/mocks for race-condition tests.

Then test the composed feature as a user-facing flow.

## 14. Common Mistakes

1. Forgetting `response.ok`.
2. Treating cancellation as a visible error.
3. Debouncing without clearing the previous timer.
4. Assuming debounce solves request races.
5. Allowing invalid pagination.
6. Returning JSX from a reusable data hook.
7. Creating a hook with unrelated responsibilities.
8. Refetching through an unintended dependency loop.
9. Clearing useful existing data on every request without considering UX.
10. Trusting a stale response because it completed successfully.
11. Recreating an abstraction before there are multiple consumers.
12. Rebuilding mature server-state behavior unnecessarily.
13. Using memoization to compensate for an unclear API contract.

## 15. Debugging Lab

### Bug 1 — stale search result

Request A starts before Request B but finishes afterward.

**Task:** prevent A from replacing B.

### Bug 2 — debounce never fires

A timer is recreated but the previous timer is not cleaned up.

**Task:** add effect cleanup.

### Bug 3 — pagination escapes bounds

`next()` continues after the final page.

**Task:** clamp against `totalPages` or use server-provided `hasNextPage`.

### Bug 4 — retry loop

`refetch` changes a dependency that causes another state change which triggers another refetch.

**Task:** draw the dependency graph and make the trigger explicit.

### Bug 5 — cancellation shown as an error

An `AbortError` reaches the UI.

**Task:** treat intentional cancellation separately.

### Bug 6 — refresh destroys useful data

The UI replaces existing results with a blank loading screen on every refresh.

**Task:** model `refreshing` separately and decide whether old data should remain visible.

## 16. Hands-on Labs

### Lab 1 — Build `useDebounce`

Implement timer cleanup and tests.

### Lab 2 — Build `usePagination`

Add bounds, `goToPage`, and changing `totalPages` support.

### Lab 3 — Build `useFetch`

Add loading, data, error, HTTP validation, cancellation, and retry.

### Lab 4 — Add race protection

Use cancellation and/or request identity to prevent stale results.

### Lab 5 — Compose

Build a debounced, paginated search screen using independent hooks.

### Lab 6 — Production hardening

Add accessibility, tests, retry behavior, empty states, refresh-with-data behavior, and a server-state-library decision note.

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
11. Why distinguish initial loading from refreshing?
12. What does preserving old data during refresh improve?

### Answers

1. It delays publication until input stops changing for the configured interval.
2. Requests already started can still finish out of order.
3. `fetch` resolves normally for many HTTP error statuses.
4. Usually ignore it as an intentional lifecycle event.
5. It keeps pagination reusable and independent of an API contract.
6. It means combining focused hooks to build higher-level behavior.
7. Cancellation is not a universal guarantee that an old result cannot be observed.
8. When it accumulates unrelated options and responsibilities.
9. Presentation belongs to the consuming component.
10. When caching, invalidation, deduplication, retries, background synchronization, or query lifecycle become substantial.
11. They represent different UX states: first load may have no data, while refresh can keep existing data visible.
12. It avoids unnecessary UI flicker and preserves useful context while newer data is loading.

## Interview Questions and Answers

### Beginner

**Q: Why use `AbortController` in a fetch hook?**  
To cancel obsolete work and clean up requests when dependencies change or a component unmounts.

**Q: Is debounce the same as throttle?**  
No. Debounce waits for a pause; throttle limits how frequently work can execute.

### Intermediate

**Q: Why shouldn't `useFetch` render a spinner?**  
Reusable logic should expose behavior/state while the consumer owns presentation.

**Q: What happens if two requests race?**  
An older response can overwrite newer state unless requests are cancelled or responses are coordinated by request identity.

**Q: Why check `response.ok`?**  
Because `fetch` does not reject simply because the server returned a `4xx` or `5xx` response.

### Advanced

**Q: Why use both cancellation and request identity?**  
Cancellation reduces wasted work, while request identity protects correctness if cancellation is late, unsupported, or a result has already escaped the transport boundary.

**Q: When would you use TanStack Query instead of building `useFetch`?**  
When the application needs mature server-state capabilities such as caching, invalidation, deduplication, retries, background refetching, and query lifecycle management.

**Q: What is the biggest custom-hook design mistake?**  
Hiding too many unrelated concerns behind a single API that becomes difficult to understand and test.

**Q: Why distinguish `loading` and `refreshing`?**  
Because the UI often needs different behavior when there is no data versus when useful existing data can remain visible during a refresh.

## Production Checklist

- [ ] Hook API is small and documented.
- [ ] Inputs and outputs are explicit.
- [ ] Status semantics are unambiguous.
- [ ] Effect dependencies are correct.
- [ ] Timers/listeners/requests are cleaned up.
- [ ] Cancellation is distinguished from failure.
- [ ] Stale responses cannot corrupt current state.
- [ ] HTTP status handling is explicit.
- [ ] Existing-data retention during refresh is intentional.
- [ ] Pagination boundaries are safe.
- [ ] Accessibility is owned by the UI layer.
- [ ] Hooks are independently testable.
- [ ] No unnecessary `useCallback`/`useMemo` was added.
- [ ] Abstraction is justified by real reuse.
- [ ] A dedicated server-state library has been considered for complex requirements.

## Final Project

Build a **Jobs Explorer** with:

- debounced search
- pagination
- loading/error/empty states
- refresh-with-data behavior
- cancellation
- stale-result protection
- retry
- reusable `useSearch`, `useDebounce`, `usePagination`, and `useFetch`
- accessible controls
- hook-level tests
- an architecture note explaining why the hooks remain separate

### Acceptance Criteria

- Search does not request on every keystroke.
- Changing the query cancels or safely supersedes obsolete work.
- Older results cannot overwrite newer results.
- Pagination never produces an invalid page.
- Retry does not create an effect loop.
- Loading, refreshing, error, empty, and success states are distinguishable.
- Existing useful data is preserved during refresh when appropriate.
- Keyboard and screen-reader basics are supported.
- Each hook has one clear responsibility.
- Tests cover normal, failure, cancellation, and race paths.

## Self Check

- [ ] I can explain logic reuse vs state sharing.
- [ ] I can design a small hook contract.
- [ ] I can build a cancellation-safe fetch hook.
- [ ] I understand debounce vs cancellation vs race protection.
- [ ] I can build bounded pagination.
- [ ] I can compose small hooks.
- [ ] I can distinguish initial loading from refreshing.
- [ ] I can test asynchronous hook behavior.
- [ ] I know when not to create a generic hook.
- [ ] I can explain when a server-state library becomes appropriate.

## Day 34 Outcome

You can now build reusable async and interaction primitives with clear contracts, cleanup, cancellation, race protection, refresh-aware UX, testing, accessibility-aware composition, and a practical understanding of when not to abstract.

**Next:** Day 35 — Search and Filter application, applying these reusable patterns in a complete feature.
