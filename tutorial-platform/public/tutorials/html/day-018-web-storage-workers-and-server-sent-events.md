---
title: Web Storage Workers and Server-Sent Events
slug: day-018-web-storage-workers-and-server-sent-events
dayLabel: Day 18
level: Advanced
estimatedMinutes: 60
order: 18
track: html
---

# Day 18 [Advanced]: Web Storage Workers and Server-Sent Events

## Goal

Understand three browser APIs often taught alongside HTML: per-origin storage, background computation, and server-pushed event streams.

## Prerequisites

- Basic JavaScript, JSON, and HTTP knowledge
- Day 17 completed

## Explanation

These APIs do not add HTML tags. They are browser capabilities used from JavaScript and need to be selected according to the data, lifecycle, and network behavior of an application. Their security and failure modes matter more than memorizing method names.

## Topic by Topic

### Topic 1: Local and session storage

`localStorage` persists string key/value data for an origin; `sessionStorage` is scoped to a tab's page session. Data is not automatically sent with HTTP requests, but any script running on the origin can read it. Never store passwords, session secrets, or highly sensitive data there. Storage can be unavailable, cleared, or quota-limited, so treat it as an optional cache rather than the source of truth.

```js
const key = "reading-list-v1";

function saveReadingList(items) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Continue without persistence when storage is unavailable.
  }
}

function loadReadingList() {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}
```

Stored values are strings; parse and validate them before use. `JSON.parse` can fail, and old data can have a different shape after an application update. Version keys or validate a schema before trusting stored content. Use `textContent`, not `innerHTML`, when displaying user-controlled values.

### Topic 2: Web Workers

A Web Worker runs JavaScript away from the main UI thread, which can keep an interface responsive during CPU-intensive work. Workers cannot access the page's `window` or DOM. Communicate with messages, handle worker errors, and terminate the worker when its work is complete. A worker is unnecessary overhead for trivial tasks.

```js
const worker = new Worker("/scripts/worker.js", { type: "module" });
worker.addEventListener("message", (event) => {
  if (event.data?.type === "sum-result") {
    document.querySelector("#result").textContent = String(event.data.value);
  }
});
worker.addEventListener("error", () => {
  document.querySelector("#result").textContent = "Background task failed.";
});
worker.postMessage({ type: "calculate", input: [2, 4, 6] });
```

The worker file at `/scripts/worker.js` handles that request:

```js
self.addEventListener("message", (event) => {
  const message = event.data;
  if (message?.type !== "calculate" || !Array.isArray(message.input)) return;
  if (!message.input.every((value) => Number.isFinite(value))) return;

  const total = message.input.reduce((sum, value) => sum + value, 0);
  self.postMessage({ type: "sum-result", value: total });
});
```

Data is copied or transferred through structured messaging; the worker does not manipulate the DOM. Validate message shapes on both sides and use `worker.terminate()` or a message-based shutdown when appropriate.

### Topic 3: Server-Sent Events

Server-Sent Events (SSE) provide a one-way stream from a server to a browser through `EventSource`. The server must respond with the `text/event-stream` content type and correctly formatted events. SSE is useful for updates where the browser mainly receives data; it is not a replacement for bidirectional communication such as WebSockets.

```js
const source = new EventSource("/events");
source.addEventListener("message", (event) => {
  const item = document.createElement("li");
  item.textContent = event.data;
  document.querySelector("#updates").append(item);
});
source.addEventListener("error", () => {
  document.querySelector("#connection-status").textContent = "Reconnecting to updates...";
});

// Call when the user leaves the live-updates view.
// source.close();
```

Use safe DOM insertion for event data. Plan reconnect behavior, duplicate or replayed messages, authorization, and connection cleanup. SSE requires a real server endpoint; a static HTML file cannot provide an event stream by itself.

## Recap

- Browser storage is per-origin, string-based, fallible, and accessible to same-origin scripts.
- Workers move suitable computation off the UI thread but cannot access the DOM.
- SSE streams server updates to a browser and requires server support.
- These are JavaScript and web-platform topics included in broad HTML tutorials, not HTML elements.

## Practice

Persist a non-sensitive preference with storage and handle blocked storage. Move a deliberately CPU-heavy transformation into a worker and add an error state. Sketch the event format and cleanup plan for a live feed before implementing an SSE server endpoint.

## Further Reading

- [W3Schools Web Storage API](https://www.w3schools.com/html/html5_webstorage.asp)
- [W3Schools Web Workers API](https://www.w3schools.com/html/html5_webworkers.asp)
- [W3Schools Server-Sent Events API](https://www.w3schools.com/html/html5_serversentevents.asp)

## Final Review

After Day 18, the course spans the main W3Schools HTML tutorial areas: document structure, text, links and images, core tables and lists, semantic markup, forms, metadata, responsive content, encoding and XHTML, embedded media, SVG and Canvas, and the browser APIs grouped under its HTML course. Day 19 adds the detailed table topics from the older notes: spanning cells, grouped columns, styling, and complex header associations. Consult the HTML element and attribute references for exhaustive element-by-element lookup; a tutorial should teach concepts and decisions rather than reproduce every reference entry.

## Practice

Choose one real page and complete a final audit: validate markup, inspect the DOM, test links and form submission, navigate by keyboard, review image alternatives and media captions, test narrow layouts, verify embedded content permissions, and confirm all JavaScript APIs have a fallback and a clear cleanup path.

## What's Next

Continue with dedicated CSS and JavaScript courses. HTML provides the document structure; CSS owns presentation, and JavaScript implements behavior and browser API integrations.