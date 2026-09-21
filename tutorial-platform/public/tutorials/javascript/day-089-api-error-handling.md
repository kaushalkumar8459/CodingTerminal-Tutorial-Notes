---
title: API Error Handling
slug: day-089-api-error-handling
dayLabel: Day 89
level: Advanced
estimatedMinutes: 30
order: 89
track: javascript
---

# Day 89 [Advanced]: API Error Handling

## Goal

Learn to properly detect and handle API errors — HTTP status codes, network failures, and loading states — filling the critical gap from Day 88.

## Prerequisites

- Day 88 (Fetch API), Day 86 (try/catch with async/await)

## Explanation

As noted on Day 88, `fetch()`'s Promise only REJECTS for genuine network failures (no connection, DNS errors, etc.) — it does NOT reject for HTTP error responses like 404 (Not Found) or 500 (Server Error). This means you must manually check `response.ok` (or `response.status`) to detect these errors yourself; otherwise, your code might treat a failed request as if it succeeded.

Proper API error handling also means managing **loading states** — tracking whether a request is currently in progress, so your program (or UI) can respond appropriately (like showing a spinner) while waiting.

## Topic by Topic

### Topic 1: HTTP status codes

Theory:
Every HTTP response includes a status code indicating the outcome: `2xx` = success, `3xx` = redirection, `4xx` = client error (like a bad request or missing resource), `5xx` = server error.

Code Example:

```js
async function getUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  console.log(response.status); // e.g. 200, 404, 500
  console.log(response.ok); // true only for 200-299 status codes
}
```

**Explanation:** `response.ok` is a convenient boolean shortcut — `true` only for successful (`2xx`) status codes, `false` for everything else (including 404s and 500s), even though `fetch()`'s own Promise still resolved successfully.

**Key Points:**

- Common codes to recognize: `200` (OK), `201` (Created), `400` (Bad Request), `401` (Unauthorized), `404` (Not Found), `500` (Server Error).
- `response.ok` is `true` only for `2xx` status codes.
- Always check `response.ok` (or `response.status`) explicitly — `fetch()` won't do this for you.

### Topic 2: Manually throwing errors for bad responses

Theory:
Since `fetch()` won't reject on its own for HTTP errors, you need to manually `throw` an error when `response.ok` is `false`, so your `try/catch`/`.catch()` can handle it.

Code Example:

```js
async function getUserSafely(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

try {
  const user = await getUserSafely(999); // assume this ID doesn't exist
} catch (error) {
  console.log("Error:", error.message); // "Request failed with status 404"
}
```

**Explanation:** Manually checking `response.ok` and throwing an error when it's `false` is what makes this failure actually catchable by `try/catch` — without this check, a 404 response would be silently treated as "success."

**Key Points:**

- Always manually check `response.ok` and `throw` an error if it's `false`.
- This is the standard, essential pattern for correct Fetch API error handling.
- Skipping this check is one of the most common real-world API bugs.

### Topic 3: Handling genuine network errors

Theory:
Actual network failures (no internet connection, DNS failure, CORS issues) DO cause `fetch()`'s Promise to reject — these are caught by a normal `try/catch`/`.catch()`, without needing the manual `response.ok` check.

Code Example:

```js
async function getUserWithFullErrorHandling(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    // Catches BOTH genuine network failures AND our manually thrown HTTP errors
    console.log("Failed to load user:", error.message);
    return null;
  }
}
```

**Explanation:** This single `try/catch` handles both categories of failure — real network problems (which reject `fetch()`'s Promise directly) and HTTP error responses (which we manually convert into a thrown error) — giving complete error coverage.

**Key Points:**

- Genuine network failures reject `fetch()`'s Promise directly, caught normally by `try/catch`.
- HTTP error responses need the manual `response.ok` check + `throw`, from Topic 2.
- Combining both gives complete, correct error handling for real API calls.

### Topic 4: Loading states

Theory:
Since network requests take time, tracking a "loading" state lets your program (or a real UI) respond appropriately while waiting — a common pattern beyond just error handling.

Code Example:

```js
async function loadUserWithState(id) {
  let isLoading = true;
  let error = null;
  let user = null;

  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    user = await response.json();
  } catch (err) {
    error = err.message;
  } finally {
    isLoading = false;
  }

  return { user, error, isLoading };
}
```

**Explanation:** `isLoading` starts `true` and is set to `false` in a `finally` block — guaranteeing it's updated regardless of success or failure, which is exactly the kind of cleanup `.finally()`/`finally` is designed for (from Day 82/84).

**Key Points:**

- Tracking `isLoading`, `error`, and the actual `data` together is the standard shape for representing an async operation's state.
- Using `finally` guarantees loading state is properly reset, regardless of outcome.
- This exact pattern (loading/error/data) is used constantly in real applications and frameworks.

## Recap

- `response.ok`/`response.status` must be checked manually — `fetch()` doesn't reject for HTTP error responses on its own.
- Genuine network failures DO reject `fetch()`'s Promise, caught normally by `try/catch`.
- Tracking loading/error/data state together is the standard pattern for representing an async operation's full status.

## What's Next

Practice for today: `public/coding/JavaScript/day-089-api-data-processing.md`. Day 90 covers processing and displaying real API data — combined with search, filter, sort, and pagination.
