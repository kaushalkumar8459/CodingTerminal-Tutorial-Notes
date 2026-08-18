---
title: API Calls with Fetch
slug: day-025-api-calls-with-fetch
dayLabel: Day 25
level: Intermediate
estimatedMinutes: 150
order: 25
track: react
---
# Day 25 [Intermediate]: API Calls with `fetch`

## Goal

Build robust API-driven React UI using `fetch`, `useEffect`, loading/error/success states, HTTP validation, cancellation, retries, empty states, and race-condition protection.

This lesson connects Days 22–24 into a complete asynchronous data flow.

## Prerequisites

- `useEffect`
- dependency arrays
- cleanup
- `AbortController`
- JavaScript promises and `async/await`

## API Request Mental Model

A network request is not just "get data." A useful UI models a state machine:

```text
idle
 ↓
loading
 ↓
 ┌───────────────┐
 ↓               ↓
success         error
 ↓               ↓
empty/data      retry
```

The UI should communicate the current request state explicitly.

## Topic 1 — Basic Fetch

```jsx
const response = await fetch(url);
const data = await response.json();
```

Two asynchronous operations are involved:

1. receiving the HTTP response
2. reading/parsing its body

`response.json()` can fail if the body is not valid JSON.

## Topic 2 — HTTP Errors

A critical `fetch` rule:

> `fetch` rejects for network-level failures, but HTTP 404/500 responses normally still resolve to a `Response`.

Therefore:

```jsx
if (!response.ok) {
  throw new Error(`Request failed: ${response.status}`);
}
```

Do not assume `catch` automatically handles HTTP errors.

## Topic 3 — Request State

A practical initial model:

```jsx
const [data, setData] = useState([]);
const [status, setStatus] = useState("idle");
const [error, setError] = useState("");
```

A single status can make impossible combinations less likely than several unrelated booleans:

```text
idle | loading | success | error
```

For more complex screens, you can model richer state such as `refreshing`, `empty`, or `retrying` separately from the main request status.

## Topic 4 — Fetch in an Effect

For initial data synchronization:

```jsx
useEffect(() => {
  loadUsers();
}, []);
```

The function itself should be asynchronous; do not make the effect callback directly async:

Avoid:

```jsx
useEffect(async () => {
  // ...
}, []);
```

because an effect callback must return either nothing or a cleanup function, not a Promise.

## Topic 5 — Loading, Success, Empty, Error

```jsx
if (status === "loading") return <p>Loading...</p>;
if (status === "error") return <p role="alert">{error}</p>;
if (status === "success" && data.length === 0) {
  return <p>No results found.</p>;
}
```

A successful empty response is **not necessarily an error**.

## Topic 6 — Complete Fetch Pattern

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      setStatus("loading");
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const users = await response.json();
      setData(users);
      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") return;

      setError(error.message || "Unable to load data");
      setStatus("error");
    }
  }

  loadUsers();

  return () => controller.abort();
}, []);
```

## Topic 7 — Retry

A retry action should be an explicit event:

```jsx
const [retryToken, setRetryToken] = useState(0);

useEffect(() => {
  // fetch...
}, [retryToken]);

<button type="button" onClick={() => setRetryToken((n) => n + 1)}>
  Retry
</button>
```

Another common architecture is to extract the request into a function and call it from both the effect and an event handler. Choose the approach that keeps request ownership clear.

## Topic 8 — Search and Changing Dependencies

```jsx
useEffect(() => {
  const controller = new AbortController();

  loadResults(query, controller.signal);

  return () => controller.abort();
}, [query]);
```

Every query represents a new synchronization. Cleanup cancels the previous request when possible.

## Topic 9 — Race Conditions

Without cancellation:

```text
request A: query = react
request B: query = react hooks

B finishes first → display B
A finishes later → accidentally display A
```

The latest request should own the current UI. Cleanup + cancellation helps enforce that boundary.

## Topic 10 — Abort and Loading State

Be careful with `finally` in overlapping requests. An aborted old request should not turn off loading for a newer request.

One approach is to check the signal:

```jsx
finally {
  if (!controller.signal.aborted) {
    setStatus("success");
  }
}
```

A request abstraction can also track request identity explicitly. The important principle is that **old asynchronous work must not overwrite current state**.

## Topic 11 — Query Parameters

```jsx
const params = new URLSearchParams({
  q: query,
  page: String(page),
});

const response = await fetch(`/api/search?${params}`);
```

Using `URLSearchParams` avoids hand-building encoded query strings incorrectly.

## Topic 12 — Headers and POST

```jsx
const response = await fetch("/api/todos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title }),
});
```

Always validate the response status. `fetch` does not treat HTTP error statuses as rejected promises by default.

## Topic 13 — Authentication and Security Boundaries

Never put secrets such as private API keys in browser-side React code. Anything shipped to the browser can be inspected by the user.

For authenticated applications, the frontend should use the application's intended authentication mechanism and backend authorization. CORS is a browser security policy, not a replacement for server-side authorization.

## Topic 14 — Error Messages

Do not expose raw internal server details to users:

```jsx
<p role="alert">Unable to load users. Please try again.</p>
```

Log technical details appropriately for development/observability, while showing a safe user-facing message.

## End-to-End Project — User Directory

Requirements:

- fetch users on initial render
- show loading UI
- show error UI
- show empty UI
- render users with stable keys
- provide Retry
- cancel obsolete request
- search users by query
- avoid stale results

### Suggested architecture

```text
UserDirectory
├── SearchBox
├── StatusMessage
└── UserList
    └── UserCard
```

Keep API/request logic at a level that owns the data lifecycle; keep presentational children focused on display and callback contracts.

## Reference Implementation

```jsx
import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UserDirectory() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setStatus("loading");
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") return;

        setError("Unable to load users.");
        setStatus("error");
      }
    }

    loadUsers();

    return () => controller.abort();
  }, [retry]);

  const visibleUsers = users.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  if (status === "loading") {
    return <p>Loading users...</p>;
  }

  if (status === "error") {
    return (
      <section>
        <p role="alert">{error}</p>
        <button type="button" onClick={() => setRetry((n) => n + 1)}>
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

Notice that filtering is derived during render; it does **not** require another effect.

## Common Mistakes

### 1. Assuming 404 triggers catch

It does not. Check `response.ok`.

### 2. Fetching during render

Render should remain pure. Use an effect for initial external synchronization or an event handler for user-triggered requests.

### 3. `useEffect(async () => {})`

Use an inner async function instead.

### 4. Ignoring cancellation

Changing queries can leave obsolete requests active and create stale results.

### 5. Using effects for filtering

Filter current data during render.

### 6. Loading state stuck forever

Use a request lifecycle that guarantees a terminal status for non-aborted requests.

### 7. Exposing secrets

Browser code cannot protect a private API key.

### 8. Treating all errors as the same

Distinguish user-visible errors, empty results, aborted requests, and unexpected failures.

## Debugging Lab

### Bug 1

```jsx
useEffect(async () => {
  const response = await fetch(url);
}, [url]);
```

Explain why the effect callback should not return the Promise.

### Bug 2

```jsx
const response = await fetch(url);
const data = await response.json();
```

Explain what happens for HTTP 500 and why `response.ok` matters.

### Bug 3

Search requests can complete out of order. Reproduce the race with artificial delays and fix it with `AbortController`.

### Bug 4

The UI displays "No results" before the first request finishes. Add an explicit request status.

## Exercises

### Level 1
- Fetch posts.
- Add loading and error states.
- Add Retry.

### Level 2
- Add search.
- Add query parameters.
- Add request cancellation.

### Level 3
- Add pagination.
- Add create/update/delete requests.
- Handle optimistic updates and rollback.
- Design a reusable `useFetch`-style abstraction and discuss its limitations.
- Compare manual fetch state with a dedicated server-state library.

## Assessment

1. What does `fetch` reject automatically?
2. Why check `response.ok`?
3. Why should initial API calls usually be outside render?
4. Why can't the effect callback itself be `async`?
5. What are idle/loading/success/error states?
6. What is an empty-success response?
7. How does `AbortController` help?
8. What is a stale-response race?
9. Why should filtering fetched data usually be derived during render?
10. Why must secrets stay off the client?

## Interview Questions

**Does `fetch` throw for HTTP 404?**  
Normally no. The promise resolves with a `Response`; check `response.ok` or `status`.

**How do you cancel an API request when a component changes?**  
Create an `AbortController`, pass its signal to `fetch`, and abort it in effect cleanup.

**Why is `useEffect(async () => {})` discouraged?**  
The effect callback is expected to return cleanup or nothing, while an async function returns a Promise.

**How do you prevent stale search results?**  
Cancel obsolete requests when possible and/or ignore results that no longer correspond to the latest request.

**Should you store filtered API results in state?**  
Usually no. If filtering is a pure calculation from current data and query, derive it during render.

**When would you choose a server-state library?**  
When caching, deduplication, retries, invalidation, pagination, background refetching, and request lifecycle complexity exceed what is reasonable to maintain manually.

## Production Considerations

For production applications also consider:

- authentication
- authorization
- CORS configuration
- request timeouts
- retries/backoff
- caching
- pagination
- schema validation
- observability
- request deduplication
- optimistic updates
- offline behavior
- server-state management

## Final Checklist

- [ ] Fetch JSON
- [ ] Check `response.ok`
- [ ] Model request states
- [ ] Handle empty success
- [ ] Handle errors
- [ ] Retry failed requests
- [ ] Cancel obsolete requests
- [ ] Prevent stale responses
- [ ] Keep derived filtering out of effects
- [ ] Understand client/server security boundaries

## Day 25 Outcome

You can now build a robust API-driven React screen rather than a simplistic `fetch` demo. You understand request lifecycle, HTTP errors, cancellation, race conditions, retries, derived UI, and the boundary between client and server responsibilities.

The next lessons can build on this foundation with more advanced data fetching, caching, and server-state patterns.