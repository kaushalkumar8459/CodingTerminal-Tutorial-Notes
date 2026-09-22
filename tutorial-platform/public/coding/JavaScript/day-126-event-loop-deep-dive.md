# Day 126 — Event Loop Deep Dive

## Event Loop Fundamentals

1. Explain the call stack, task queue, microtask queue, and event loop.
2. Predict execution order for synchronous code, Promise callbacks, timers, and `queueMicrotask()`.
3. Explain why JavaScript can remain single-threaded while coordinating asynchronous work.
4. Compare browser event-loop behavior with the JavaScript runtime model.

## Microtasks

5. Use `queueMicrotask()` to schedule work.
6. Compare `queueMicrotask()`, `Promise.then()`, and `setTimeout(..., 0)`.
7. Explain how a large microtask chain can delay rendering and timers.
8. Build a safe batching pattern that avoids an unbounded microtask loop.

## Rendering and Browser Scheduling

9. Explain when rendering can happen relative to tasks and microtasks.
10. Compare `requestAnimationFrame()` with `setTimeout()` for visual updates.
11. Build a frame-friendly list update.
12. Explain how long-running JavaScript blocks input and painting.

## MutationObserver

13. Observe DOM changes with `MutationObserver`.
14. Explain when MutationObserver callbacks run.
15. Disconnect an observer when it is no longer needed.
16. Avoid observer-related memory leaks.

## Interview Questions

17. What is the difference between a task and a microtask?
18. Why does a resolved Promise usually run before a zero-delay timer?
19. Why can microtasks starve timers or rendering?
20. What is the difference between `requestAnimationFrame` and `setTimeout`?
21. When would you use MutationObserver?
22. Predict the output of nested Promise, timer, and synchronous code.

## Practice Checklist

Write at least 10 output-order questions and explain every step instead of memorizing the answer.
