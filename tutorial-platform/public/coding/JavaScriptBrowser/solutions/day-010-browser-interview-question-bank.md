# Day 010 Solutions — Browser Interview Question Bank

## 1. API works in Postman but not browser

Check:

1. Browser console for CORS errors.
2. Request Origin.
3. OPTIONS preflight.
4. Access-Control-Allow-Origin.
5. Allowed methods and headers.
6. Credentials configuration.
7. Mixed-content restrictions.
8. Network response status.

## 2. Search results arrive out of order

Use cancellation:

```js
let controller;

async function search(query) {
  controller?.abort();
  controller = new AbortController();

  const response = await fetch(
    `/api/search?q=${encodeURIComponent(query)}`,
    { signal: controller.signal }
  );

  return response.json();
}
```

Also guard against stale responses when cancellation is not supported by the underlying operation.

## 3. Page memory grows after navigation

Investigate:

- Event listeners
- Timers
- Observers
- WebSockets
- Workers
- Detached DOM nodes
- Unbounded caches
- Retained closures

Use heap snapshots and allocation timelines to identify retained objects.

## 4. Page shifts while images load

Reserve image space with intrinsic dimensions or CSS `aspect-ratio`.

## 5. Page freezes on 100,000 records

Profile first. Consider:

- chunking work
- virtualization
- avoiding unnecessary DOM nodes
- Web Worker for CPU-heavy processing
- memoization where appropriate

## Interview Method

For browser questions, answer in this order:

**symptom → evidence → likely cause → fix → verification**.
