---
title: The Fetch API
slug: day-088-the-fetch-api
dayLabel: Day 88
level: Advanced
estimatedMinutes: 30
order: 88
track: javascript
---

# Day 88 [Advanced]: The Fetch API

## Goal

Learn the Fetch API — making real GET/POST requests, working with headers, and handling responses — the first genuinely "real-world" async operation in this course.

## Prerequisites

- Day 83–86 (Promises, async/await)

## Explanation

Everything in Module 6 so far has SIMULATED async operations with `setTimeout()`. The **Fetch API** is the real, built-in browser (and Node.js) tool for making actual network requests — to APIs, servers, or any URL. `fetch(url)` returns a Promise that resolves with a `Response` object once the server responds — but importantly, that Promise resolving does NOT mean the request succeeded; it just means a response was received (even an error response like a 404).

`fetch()` supports different HTTP methods (GET by default, or POST/PUT/DELETE via an options object), custom headers (like specifying JSON content), and a request/response body for sending/receiving data.

## Topic by Topic

### Topic 1: Basic GET requests

Theory:
`fetch(url)` sends a GET request by default, returning a Promise that resolves with a `Response` object once a reply is received.

Code Example:

```js
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json()) // parse the response body as JSON
  .then((user) => console.log(user))
  .catch((error) => console.log("Request failed:", error));
```

**Explanation:** `fetch()` resolves with the `Response` object itself, NOT the actual data — you need a second step, `.json()` (which ALSO returns a Promise), to parse the response body into usable JavaScript data.

**Key Points:**

- `fetch(url)` sends a GET request by default.
- The resolved `Response` object is not the data itself — call `.json()` (or `.text()`) to get the actual body content.
- `.json()`/`.text()` also return Promises, requiring another `.then()` or `await`.

### Topic 2: POST requests with a body

Theory:
To send data (like creating a new record), pass an options object as the second argument, specifying `method: "POST"`, `headers`, and a `body` (usually JSON-stringified).

Code Example:

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "My Post", body: "Post content", userId: 1 }),
})
  .then((response) => response.json())
  .then((created) => console.log("Created:", created));
```

**Explanation:** `headers` tells the server what kind of data is being sent (JSON in this case); `body` must be a string, so `JSON.stringify()` converts your JavaScript object into the correct format before sending.

**Key Points:**

- POST/PUT/DELETE requests need an options object specifying `method`.
- `Content-Type: application/json` header is standard when sending JSON data.
- `body` must always be a string (or similar) — use `JSON.stringify()` for JavaScript objects.

### Topic 3: Using `fetch()` with `async`/`await`

Theory:
`fetch()` combines naturally with `async`/`await`, making network requests read like straightforward sequential code.

Code Example:

```js
async function getUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  const user = await response.json();
  return user;
}

async function showUser() {
  const user = await getUser(1);
  console.log(user.name);
}

showUser();
```

**Explanation:** Both the `fetch()` call AND the `.json()` parsing are `await`ed separately, since each is its own asynchronous step — this reads clearly, top to bottom, exactly like the async/await patterns from Days 86-87.

**Key Points:**

- `await fetch(url)` gives you the `Response` object; you still need a SEPARATE `await response.json()` to get the actual data.
- This two-step `await` pattern (fetch, then parse) is extremely common and worth memorizing.
- Combine with `try/catch` for proper error handling (covered fully on Day 89).

### Topic 4: Fetch headers and request configuration

Theory:
Beyond `method` and `body`, the options object can include custom headers (like authentication tokens) and other request configuration.

Code Example:

```js
async function getProtectedData(token) {
  const response = await fetch("https://api.example.com/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}
```

**Explanation:** The `Authorization` header is a common way to send an authentication token with a request, letting the server know who's making the request and whether they have permission.

**Key Points:**

- Headers configure how the request is made and what the server should expect/return.
- `Authorization` headers are standard for authenticated requests (a preview of real-world API work).
- Fetch options are flexible — method, headers, body, and more can all be configured together.

## Recap

- `fetch(url)` sends a GET request by default, resolving with a `Response` object (not the data itself).
- POST/PUT/DELETE requests use an options object with `method`, `headers`, and a stringified `body`.
- `fetch()` combines naturally with `async`/`await`, requiring a separate `await` for both the fetch and the `.json()` parsing steps.

## What's Next

Practice for today: `public/coding/JavaScript/day-088-fetch-api.md`. Day 89 covers proper API error handling — status codes, network errors, and loading states.
