# Day 129 — Web Workers & Background Processing

## Web Workers

1. Explain why a Web Worker does not run on the main UI thread.
2. Create a Worker and communicate with `postMessage()`.
3. Handle Worker messages and errors.
4. Terminate a Worker when work is complete.
5. Move CPU-heavy calculations away from the main thread.

## Data Transfer

6. Compare structured cloning with transferable objects.
7. Transfer an `ArrayBuffer` to a Worker.
8. Explain why the original buffer can become detached after transfer.
9. Identify data that cannot be transferred directly.

## SharedWorker

10. Explain the purpose of SharedWorker.
11. Connect multiple browsing contexts to shared background logic.
12. Identify situations where SharedWorker is unnecessary.

## Worker Design

13. Keep Worker messages serializable and explicit.
14. Design request/response messages with IDs.
15. Handle cancellation and stale responses.
16. Avoid creating too many Workers.

## Interview Questions

17. What problem does a Web Worker solve?
18. Can a Worker directly manipulate the DOM?
19. What is the difference between cloning and transferring data?
20. When should you avoid a Worker?
21. Worker vs Promise: what problem does each solve?
22. What is SharedWorker?

## Practice Checklist

Build a Worker that calculates a CPU-heavy result and keeps the main thread responsive while the calculation runs.

<!-- codingterminal-solution:start -->

# Day 129 Solutions — Web Workers & Background Processing

## 1. Worker communication

```js
// main.js
const worker = new Worker("./worker.js", { type: "module" });

worker.addEventListener("message", ({ data }) => {
  console.log("result:", data);
});

worker.postMessage({ value: 40 });

worker.addEventListener("error", console.error);
```

```js
// worker.js
self.addEventListener("message", ({ data }) => {
  self.postMessage(data.value * 2);
});
```

## 2. Terminate the Worker

```js
worker.terminate();
```

## 3. Transfer an ArrayBuffer

```js
const buffer = new ArrayBuffer(1024);

worker.postMessage(buffer, [buffer]);
```

The buffer is transferred rather than cloned; ownership moves to the Worker.

## Interview Takeaway

A Promise changes how asynchronous work is coordinated. A Worker changes **where CPU work executes**. They solve different problems.

<!-- codingterminal-solution:end -->

