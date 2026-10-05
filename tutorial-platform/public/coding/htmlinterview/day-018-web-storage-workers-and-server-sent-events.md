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