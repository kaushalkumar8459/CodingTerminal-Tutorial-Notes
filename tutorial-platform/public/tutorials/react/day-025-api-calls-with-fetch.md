---
title: API Calls with Fetch
slug: day-025-api-calls-with-fetch
dayLabel: Day 25
level: Intermediate
estimatedMinutes: 180
order: 25
track: react
---
# Day 25 [Intermediate]: API Calls with `fetch`

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [API Request Mental Model](#api-request-mental-model)
- [Topic by Topic](#topic-by-topic)
- [Request State Machine](#request-state-machine)
- [End-to-End Practical](#end-to-end-practical)
- [Reference Implementation](#reference-implementation)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment Quiz](#assessment-quiz)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Production Checklist](#production-checklist)
- [Verification Checklist](#verification-checklist)
- [Day 25 Outcome](#day-25-outcome)

## Goal

Build a production-minded React screen that fetches remote data with the browser `fetch` API and correctly handles:

- request lifecycle
- loading, success, empty, and error states
- HTTP errors
- JSON parsing errors
- cancellation
- changing query dependencies
- stale responses and race conditions
- retry
- query parameters
- GET and POST requests
- client/server security boundaries

The important lesson is not memorizing `fetch()`. It is learning how to connect **React state + effects + asynchronous work + UI state** without creating stale or incorrect UI.

## Prerequisites

- Days 22–24
- `useEffect` and dependency arrays
- cleanup functions
- `AbortController`
- promises and `async/await`
- JavaScript arrays and objects
- controlled inputs

## Learning Outcomes

By the end of Day 25, you should be able to:

1. Explain what `fetch()` resolves and rejects for.
2. Validate HTTP status using `response.ok` / `response.status`.
3. Parse JSON safely.
4. Model request state explicitly.
5. Handle successful empty results separately from failures.
6. Cancel obsolete requests with `AbortController`.
7. Explain why cancellation alone is not a universal race-condition solution.
8. Prevent stale asynchronous work from overwriting current UI.
9. Implement retry without hiding the request lifecycle.
10. Build GET and POST requests.
11. Explain when work belongs in an effect versus an event handler.
12. Identify when manual fetching has become complex enough for a server-state solution.

# API Request Mental Model

A network request is asynchronous and can outlive the render that started it.

```text
React state/query
      ↓
start request
      ↓
loading
      ↓
┌───────────────┐
│ HTTP response │
└───────────────┘
      ↓
validate status
      ↓
parse body
      ↓
┌──────────┬──────────┐
│ success  │ failure  │
└──────────┴──────────┘
     ↓          ↓
 data/empty   error
```

A useful rule:

> **Every request should have a clearly defined owner, lifecycle, and terminal outcome.**

## Request State Machine

For a simple screen:

```text
idle → loading → success
             ↘ error → loading (retry)
```

Success can contain either data or an empty collection:

```text
success
 ├── data
 └── empty
```

Do not confuse:

- `loading` with `empty`
- `empty` with `error`
- `abort` with `error`

An intentionally aborted obsolete request normally should not display an error to the user.

# Topic by Topic

## 1. Basic `fetch`

```jsx
const response = await fetch(url);
const data = await response.json();
```

There are two important asynchronous steps:

1. receive the `Response`
2. consume and parse the response body

`response.json()` can itself reject if the body cannot be parsed as valid JSON.

## 2. `fetch` Does Not Reject for Normal HTTP Errors

This is one of the most important interview points.

```jsx
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

A `404` or `500` normally gives you a resolved `Response` object. `catch` is therefore not a substitute for HTTP status validation.

Think in layers:

```text
network/transport failure → fetch may reject
HTTP 404/500              → fetch normally resolves
invalid JSON               → response.json() may reject
application validation     → your code may reject/handle
```

## 3. Request State

A practical state model:

```jsx
const [data, setData] = useState([]);
const [status, setStatus] = useState("idle");
const [error, setError] = useState(null);
```

Prefer a single status over contradictory booleans such as:

```jsx
isLoading === true
isError === true
isSuccess === true
```

unless your state model explicitly allows those combinations.

For richer applications, distinguish request state from display state, for example `loading`, `refreshing`, or `retrying`.

## 4. Fetching Initial Data with `useEffect`

If the request is synchronization driven by component inputs:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    // request
  }

  load();

  return () => controller.abort();
}, []);
```

Do **not** make the effect callback itself `async`:

```jsx
// Avoid
useEffect(async () => {
  // ...
}, []);
```

An async function returns a Promise, while React expects an effect callback to return either nothing or a cleanup function.

## 5. Event-Driven Requests

Not every request belongs in an effect.

A request caused directly by a user action can belong in the event handler:

```jsx
async function handleDelete(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
}
```

Use an effect when the request synchronizes with reactive inputs such as a selected ID or search query. Use an event handler when the user action itself is the cause.

## 6. Loading, Success, Empty, Error

```jsx
if (status === "loading") return <p>Loading...</p>;

if (status === "error") {
  return <p role="alert">Unable to load data.</p>;
}

if (status === "success" && data.length === 0) {
  return <p>No results found.</p>;
}
```

An empty successful response is valid application state.

## 7. Cleanup with `AbortController`

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal });

  return () => controller.abort();
}, [url]);
```

When `url` changes, cleanup aborts the previous request when the platform/request implementation supports it.

This is especially valuable for search, route changes, and rapidly changing filters.

## 8. Abort Is Not the Same as Ignoring

Cancellation and stale-result protection are related but different concerns.

```text
AbortController
→ asks the underlying operation to stop

Request identity / ignore strategy
→ prevents old async work from winning the UI race
```

A robust architecture should make it impossible for obsolete work to commit current UI state, even if cancellation is too late or not supported by an underlying operation.

## 9. Race Conditions

Example:

```text
query = "react"
Request A starts

query = "react hooks"
Request B starts

B finishes first → show B
A finishes later → old result must NOT replace B
```

For search, the cleanup/abort boundary is helpful. For more complex async workflows, explicit request IDs or a dedicated data layer may provide a stronger ownership model.

## 10. `finally` and Overlapping Requests

Be careful with this pattern:

```jsx
finally {
  setStatus("success");
}
```

An older request could execute its `finally` after a newer request has started.

The principle is:

> **Only the current request should be allowed to finalize current request state.**

For a single effect instance, checking whether its controller was aborted can be enough to avoid stale cleanup updates. More complex flows should track request identity explicitly.

## 11. Retry

Retry is a user action, so it can naturally be triggered from an event handler.

One simple pattern is a retry token:

```jsx
const [retryToken, setRetryToken] = useState(0);

useEffect(() => {
  // request
}, [retryToken]);

<button
  type="button"
  onClick={() => setRetryToken((value) => value + 1)}
>
  Retry
</button>
```

For production systems, consider retry limits, exponential backoff, jitter, and whether the failure is retryable.

## 12. Query Parameters

```jsx
const params = new URLSearchParams({
  q: query,
  page: String(page),
});

const response = await fetch(`/api/search?${params}`);
```

`URLSearchParams` avoids common encoding mistakes.

## 13. GET Request

```jsx
const response = await fetch("/api/users");

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const users = await response.json();
```

## 14. POST Request

```jsx
const response = await fetch("/api/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title }),
});

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}
```

HTTP method, headers, body format, authentication, and response contract are API-specific. `fetch` itself does not validate your application schema.

## 15. Response Validation

A successful HTTP status does not guarantee the shape you expected.

For example, this can still be wrong:

```json
{"message":"unexpected payload"}
```

when your UI expects:

```json
[{"id":1,"name":"A"}]
```

In production, validate important response shapes with a schema/validation layer when the cost of malformed data is significant.

## 16. Authentication and Security

Never put private server secrets in client-side React source.

Important boundaries:

- frontend code is inspectable
- CORS is not authorization
- authentication identifies a caller
- authorization decides what that caller may do
- sensitive operations should be enforced by the server

## 17. Safe Error Messages

Avoid rendering raw internal error details directly to users:

```jsx
<p role="alert">Unable to load users. Please try again.</p>
```

Technical details can be logged through an appropriate development/observability mechanism.

## 18. Derived Filtering

Do not create an effect just to filter fetched data:

```jsx
const visibleUsers = users.filter((user) =>
  user.name.toLowerCase().includes(query.toLowerCase())
);
```

This is derived data and belongs in render unless the calculation itself is expensive enough to justify memoization.

## 19. Debouncing Search

If every keystroke triggers a request, you may want to debounce the query.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(query);
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
```

Then fetch from `debouncedQuery`.

Important distinction:

> Debouncing prevents a scheduled request from starting; it does not cancel a request that has already started.

## 20. Caching and Server State

Manual `fetch` is excellent for learning and simple flows. Production applications may need:

- caching
- deduplication
- invalidation
- background refetching
- pagination
- retries
- optimistic updates
- offline support

At that point, a dedicated server-state/data-fetching solution can reduce complexity.

# End-to-End Practical

## Project: User Directory

Build a User Directory that:

- fetches users on initial render
- displays loading state
- displays error state
- distinguishes empty success
- supports retry
- supports search
- cancels obsolete requests
- prevents stale results
- uses stable keys
- exposes accessible labels and error messaging

### Suggested architecture

```text
UserDirectory
├── SearchBox
├── StatusMessage
└── UserList
    └── UserCard
```

The component that owns the request lifecycle should own the data state. Presentational children should receive data and callback contracts rather than directly owning the request lifecycle.

### Acceptance Criteria

- [ ] HTTP failures are detected with `response.ok`.
- [ ] JSON parsing failures are handled.
- [ ] Loading, success, empty, and error are distinguishable.
- [ ] Retry works.
- [ ] Obsolete requests are aborted where possible.
- [ ] Old responses cannot overwrite current UI.
- [ ] Search filtering is derived rather than duplicated in state.
- [ ] Inputs have accessible labels.
- [ ] Error messages use an appropriate accessible mechanism.

# Reference Implementation

```jsx
import { useEffect, useMemo, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    async function loadUsers() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (!isCurrent) return;

        setUsers(result);
        setStatus("success");
      } catch (error) {
        if (error?.name === "AbortError" || !isCurrent) return;

        setError("Unable to load users. Please try again.");
        setStatus("error");
      }
    }

    loadUsers();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [retryToken]);

  const visibleUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return users;

    return users.filter((user) =>
      user.name.toLowerCase().includes(normalizedQuery)
    );
  }, [users, query]);

  if (status === "loading") {
    return <p role="status">Loading users...</p>;
  }

  if (status === "error") {
    return (
      <section>
        <p role="alert">{error}</p>
        <button
          type="button"
          onClick={() => setRetryToken((value) => value + 1)}
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <main>
      <h1>User Directory</h1>

      <label htmlFor="user-search">Search users</label>
      <input
        id="user-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {visibleUsers.length === 0 ? (
        <p>No users match your search.</p>
      ) : (
        <ul>
          {visibleUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

### Why this implementation is safe

- The effect owns the request and its cancellation controller.
- Cleanup marks the effect instance as no longer current.
- `AbortController` requests cancellation.
- `isCurrent` protects against stale async completion even if cancellation arrives too late.
- HTTP errors are explicitly converted into failures.
- Empty success is represented by an empty array rather than an error.
- Search filtering is derived from current `users` and `query`.
- Retry is an explicit user action.
- The input is properly labelled.

# Common Mistakes

## 1. Assuming `404` triggers `catch`

It normally does not. Check `response.ok`.

## 2. Fetching during render

Render must remain pure. Use an effect for synchronization or an event handler for direct user actions.

## 3. `useEffect(async () => {})`

The callback must return cleanup or nothing, not a Promise.

## 4. No cancellation for changing requests

Rapidly changing inputs can leave obsolete requests running.

## 5. Assuming cancellation alone solves every race

Cancellation is cooperative. Protect the state commit as well when correctness requires it.

## 6. Storing derived filtered data in state

Usually derive it from current data and query.

## 7. Treating empty results as an error

A successful empty list is valid state.

## 8. Loading state gets overwritten by an old request

Old asynchronous work must not finalize the current request state.

## 9. Exposing secrets in frontend code

Client-delivered code cannot keep a private API key secret.

## 10. Blindly retrying every error

Some errors are not retryable. Production retry policies need limits and backoff.

# Debugging Lab

## Bug 1 — Async effect callback

```jsx
useEffect(async () => {
  const response = await fetch(url);
}, [url]);
```

**Fix:** define an inner async function and invoke it from the effect.

## Bug 2 — HTTP error handling

```jsx
const response = await fetch(url);
const data = await response.json();
```

**Fix:** check `response.ok` before treating the response as successful.

## Bug 3 — Race condition

Add artificial delays to two search requests and reproduce out-of-order completion.

**Fix:** abort obsolete work and protect the state commit with request ownership/currentness.

## Bug 4 — False empty state

The UI says “No results” before the first request completes.

**Fix:** model `loading` separately from successful empty data.

## Bug 5 — Stale loading finalization

An old request's `finally` sets `status = "success"` after a new request has started.

**Fix:** only the current request can finalize current request state.

# Hands-on Exercises

## Level 1 — Basic Fetch

Fetch posts and display:

- loading
- success
- empty
- error

**Acceptance:**

- [ ] `response.ok` is checked.
- [ ] `response.json()` is awaited.
- [ ] Error state is user-friendly.

## Level 2 — Retry

Add a Retry button.

**Acceptance:**

- [ ] Retry starts a new request.
- [ ] Previous error is cleared.
- [ ] Loading is visible during retry.

## Level 3 — Search

Add a search query and request filtered results.

**Acceptance:**

- [ ] Query is encoded correctly.
- [ ] Old request is cancelled/ignored.
- [ ] Latest result wins.

## Level 4 — POST

Build a form that creates a todo.

**Acceptance:**

- [ ] Uses `POST`.
- [ ] Sends JSON with `Content-Type`.
- [ ] Checks HTTP status.
- [ ] Prevents duplicate submission while appropriate.

## Level 5 — Production Design

Design a reusable request abstraction.

Discuss:

- request identity
- cancellation
- retries
- caching
- invalidation
- pagination
- optimistic updates
- server-state libraries

# Assessment Quiz

1. What does `fetch` reject automatically?
2. Why must `response.ok` be checked?
3. Why should a request not run during render?
4. Why can't an effect callback itself be `async`?
5. What is the difference between empty success and error?
6. How does `AbortController` help?
7. Why can stale results occur?
8. Why is cancellation not the only race-protection technique?
9. When should a request be started from an event handler?
10. Why should filtered data usually be derived?
11. Why should secrets stay on the server?
12. What does `URLSearchParams` solve?
13. Why might a successful response still contain invalid application data?
14. When should you consider a server-state library?
15. Why can retry need exponential backoff?

### Answers

1. Primarily network/transport failures and certain abort failures; normal HTTP error statuses generally resolve.
2. Because `fetch` does not reject merely because the server returned 4xx/5xx.
3. Render must be pure and may run more than once or be discarded.
4. An async callback returns a Promise, while an effect callback must return cleanup or nothing.
5. Empty success is a valid successful response with no matching records; error means the request/application failed.
6. It provides a standard cancellation signal that can be passed to `fetch`.
7. Multiple requests can finish in a different order from the order in which they started.
8. Cancellation can be late or unavailable; state ownership/request identity can still prevent stale commits.
9. When the user action itself directly causes the request, such as submit, save, delete, or load-more.
10. It is derived from existing state and does not need another synchronization state variable.
11. Browser code can be inspected by users, so private secrets cannot be protected there.
12. Correct encoding and construction of URL query parameters.
13. HTTP success only tells you about the transport/status contract; the JSON shape may still violate the application contract.
14. When caching, deduplication, invalidation, retries, background refetching, pagination, or synchronization becomes complex.
15. Immediate repeated retries can overload a failing service and create a retry storm.

# Interview Questions and Answers

### Beginner

**What is `fetch`?**  
A browser API for making HTTP/network requests and receiving a `Response` asynchronously.

**Does `fetch` reject for 404?**  
Normally no. Inspect `response.ok` or `response.status`.

**How do you parse JSON?**  
`await response.json()`.

### Intermediate

**Why use `AbortController` with React effects?**  
To cancel obsolete asynchronous work when the effect is cleaned up, such as when a query changes or a component unmounts.

**How do you model loading/error/success?**  
Use an explicit request status and associated data/error state rather than contradictory booleans.

**Why is `useEffect(async () => {})` wrong?**  
Because the async callback returns a Promise instead of the cleanup function React expects.

**How do you prevent stale search results?**  
Abort obsolete requests where possible and ensure only the current request is allowed to commit state.

### Advanced

**Why is `response.ok` not enough for production validation?**  
It validates HTTP success semantics, not whether the response body matches the application's expected schema.

**How do you distinguish cancellation from an actual failure?**  
Check for an abort condition and avoid presenting intentional obsolete-request cancellation as a user-facing error.

**Why can a request's `finally` be dangerous?**  
An older request may finalize after a newer request starts and accidentally overwrite current loading/error state.

**When should API work live in an event handler rather than an effect?**  
When a discrete user event is the direct cause, such as submit, delete, or explicit retry.

**Why is a server-state library useful?**  
It can provide caching, deduplication, invalidation, retries, background refetching, and synchronization that would otherwise require substantial custom state machinery.

**What is the difference between debouncing and cancellation?**  
Debouncing delays work until input settles; cancellation attempts to stop work that has already started.

# Production Checklist

Before shipping a fetch-driven screen, ask:

- [ ] Is the request triggered from the correct boundary?
- [ ] Is `response.ok` checked?
- [ ] Is response parsing handled?
- [ ] Is response shape validated where appropriate?
- [ ] Are loading, success, empty, and error states distinct?
- [ ] Are obsolete requests cancelled when possible?
- [ ] Can stale async work overwrite current UI?
- [ ] Are retries bounded and appropriate?
- [ ] Are retryable vs non-retryable failures considered?
- [ ] Are secrets kept server-side?
- [ ] Is user-facing error text safe?
- [ ] Are accessibility states communicated?
- [ ] Is caching/server-state complexity growing beyond manual fetch?

# Verification Checklist

- [ ] Can explain the complete `fetch` lifecycle.
- [ ] Can explain network failure vs HTTP failure.
- [ ] Can use `response.ok` correctly.
- [ ] Can parse JSON and handle parsing failure.
- [ ] Can model request state.
- [ ] Can distinguish empty success from error.
- [ ] Can explain effect vs event-handler boundaries.
- [ ] Can use `AbortController`.
- [ ] Can explain stale-response races.
- [ ] Can protect state commits from obsolete async work.
- [ ] Can implement retry.
- [ ] Can build query parameters.
- [ ] Can implement GET and POST.
- [ ] Understand client/server security boundaries.
- [ ] Understand why derived filtering does not need an effect.
- [ ] Can explain when a server-state library becomes valuable.
- [ ] Can complete the User Directory project without copying the reference blindly.

# Day 25 Outcome

You can now build a robust React API screen rather than a simplistic `fetch()` demo.

You understand:

```text
React state
   ↓
request lifecycle
   ↓
HTTP validation
   ↓
JSON/application validation
   ↓
loading / success / empty / error
   ↓
cancellation + stale-response protection
   ↓
retry + production concerns
```

**Next:** Day 26 — API calls with Axios and query basics, building on the same request-state and error-handling principles rather than starting over.
