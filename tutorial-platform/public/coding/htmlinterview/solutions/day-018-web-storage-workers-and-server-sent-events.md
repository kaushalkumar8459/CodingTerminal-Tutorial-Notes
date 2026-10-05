# Day 018 — Solution: Storage, Workers, and Server-Sent Events

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