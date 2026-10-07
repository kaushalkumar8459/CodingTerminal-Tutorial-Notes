# Day 018 — Storage, Workers, and Server-Sent Events

Matches Tutorial Day 18 (Web Storage Workers and Server-Sent Events). These are JavaScript browser APIs, not HTML tags.

## Practice

1. Store a non-sensitive preference in `localStorage` and restore it safely.
2. Explain why stored JSON must be parsed and validated.
3. Create a module worker that receives a numeric array and returns its sum.
4. Create an `EventSource` and append incoming text with `textContent`, not `innerHTML`.
5. Close an event stream when the live-updates view is left.

## Concept Questions

6. How do `localStorage` and `sessionStorage` differ?
7. Why should secrets not be stored in web storage?
8. Which browser objects can a worker not access?
9. What HTTP content type does an SSE server return?
10. When is SSE more suitable than WebSockets?

## Challenge

Design a live reading-list page that saves non-sensitive preferences, computes a score in a worker, and optionally receives one-way updates from an SSE endpoint. Include fallback/error states and cleanup.

## Notes

- Workers and SSE need separate JavaScript/server files; the HTML preview is not a server.
- Never insert untrusted storage or event data with `innerHTML`.

<!-- codingterminal-solution:start -->

# Day 018 — Solution: Storage, Workers, and Server-Sent Events

## Practice Answers

**1. Save and restore a preference safely**

```js
function savePreference(value) {
  try { localStorage.setItem("reading-list-preference-v1", JSON.stringify(value)); }
  catch { /* Storage may be blocked or full. */ }
}
```

**2. Parse and validate stored JSON**

```js
function readPreference() {
  try {
    const value = localStorage.getItem("reading-list-preference-v1");
    const parsed = value ? JSON.parse(value) : null;
    return typeof parsed === "string" ? parsed : "default";
  } catch {
    return "default";
  }
}
```

**3. Send data to a module worker and return a sum**

```js
const worker = new Worker("/scripts/sum-worker.js", { type: "module" });
worker.postMessage({ numbers: [2, 4, 6] });
```

```js
self.addEventListener("message", (event) => {
  const numbers = event.data?.numbers;
  if (!Array.isArray(numbers) || !numbers.every(Number.isFinite)) return;
  self.postMessage({ total: numbers.reduce((sum, value) => sum + value, 0) });
});
```

**4. Append event text safely**

```js
const source = new EventSource("/events");
source.addEventListener("message", (event) => {
  const item = document.createElement("li");
  item.textContent = event.data;
  document.querySelector("#updates").append(item);
});
```

**5. Close the stream when leaving the view**

```js
source.close();
```

## Storage Example

```js
const key = "reading-list-preference-v1";
function savePreference(value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* Storage may be blocked or full. */ }
}
function readPreference() {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : null;
    return typeof parsed === "string" ? parsed : "default";
  } catch {
    return "default";
  }
}
```

Do not store credentials or session secrets. Values can be read by same-origin scripts and are not trusted input.

## Worker Main-Thread Example

```js
const worker = new Worker("/scripts/sum-worker.js", { type: "module" });
worker.addEventListener("message", (event) => {
  document.querySelector("#result").textContent = String(event.data.total);
});
worker.addEventListener("error", () => {
  document.querySelector("#result").textContent = "Calculation failed.";
});
worker.postMessage({ numbers: [2, 4, 6] });
```

`/scripts/sum-worker.js`:

```js
self.addEventListener("message", (event) => {
  const numbers = event.data?.numbers;
  if (!Array.isArray(numbers) || !numbers.every(Number.isFinite)) return;
  self.postMessage({ total: numbers.reduce((sum, value) => sum + value, 0) });
});
```

## SSE Example

```js
const source = new EventSource("/events");
source.addEventListener("message", (event) => {
  const item = document.createElement("li");
  item.textContent = event.data;
  document.querySelector("#updates").append(item);
});
source.addEventListener("error", () => {
  document.querySelector("#status").textContent = "Reconnecting...";
});
// On leaving the live view: source.close();
```

The server must return `Content-Type: text/event-stream` and send correctly formatted events. A static HTML preview cannot provide this endpoint.

## Answers

**6. Storage lifetimes:** `localStorage` persists for the origin; `sessionStorage` is scoped to the current tab's page session.

**7. Secrets:** Any script executing on the origin can read web storage, including a script introduced by an XSS flaw.

**8. Worker access:** A worker does not have the page's `window` or DOM; communicate by messages.

**9. SSE response:** `text/event-stream`.

**10. SSE vs WebSockets:** SSE is a good fit for one-way server-to-client updates; WebSockets support bidirectional communication.

<!-- codingterminal-solution:end -->

