# Day 008 — Workers & Service Workers

## Web Worker

1. Explain main-thread vs Worker execution.
2. Create a Worker.
3. Communicate with postMessage.
4. Handle errors.
5. Terminate a Worker.
6. Use transferable objects for suitable data.

## Service Worker

7. Explain the purpose of a Service Worker.
8. Understand registration and lifecycle at a high level.
9. Explain install, activate, and fetch events.
10. Understand caching for offline experiences.
11. Explain why Service Workers require a secure context in normal deployment.
12. Understand update and cache-versioning concerns.

## Worker vs Service Worker

13. Compare Web Worker and Service Worker.
14. Explain why a Service Worker can intercept network requests for its scope.
15. Identify tasks that belong in each model.

## Interview Questions

16. Web Worker vs Service Worker?
17. Can a Service Worker directly manipulate the DOM?
18. What is the Service Worker cache used for?
19. What happens when a Service Worker updates?
20. Why is cache versioning important?

## Practice

Design an offline-first documentation page with a Service Worker cache and a versioned cache name.

<!-- codingterminal-solution:start -->

# Day 008 Solutions — Workers & Service Workers

## Web Worker

```js
const worker = new Worker("./worker.js");

worker.postMessage({ value: 100000 });

worker.onmessage = ({ data }) => {
  console.log(data);
};
```

Workers do not directly manipulate the page DOM.

## Service Worker Registration

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

## Cache Versioning

```js
const CACHE_NAME = "docs-v2";
```

A new cache name can allow an updated Service Worker to populate a new cache and remove obsolete caches during activation.

## Interview Takeaway

Web Workers are primarily for background computation. Service Workers act as programmable network/proxy-like workers for their controlled scope and enable capabilities such as offline caching.

<!-- codingterminal-solution:end -->

