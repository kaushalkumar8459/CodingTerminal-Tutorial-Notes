# Day 087 — Solution: Event Loop Challenges

1. `A C B` because synchronous code runs before the timer.
2. `A C B` because the Promise callback is a microtask.
3. Synchronous logs first, then Promise microtasks, then timer callbacks.
4. `promise` logs before `timeout` because microtasks run before the next timer task.
5. The two zero-delay timers log in registration order.
6. The two Promise handlers log in registration order.
7. The log before `queueMicrotask` runs, then the log after it, then `micro`.
8. The async function logs before its first await, the caller's next synchronous log runs, then the post-await log.
9. A timer created inside a microtask waits for the current microtask queue and runs as a later macrotask.
10. A Promise created inside a timer runs as a microtask immediately after that timer callback completes.
11. Chained `.then()` callbacks log in their chain order.
12. Synchronous code runs first, Promise handlers run as microtasks, and the timer-based Promise resumes the async function later.
13. A `var` loop's callbacks all log the final index, usually `3` for a three-item loop.
14. A `let` loop creates a binding per iteration, so callbacks log `0`, `1`, and `2`.
15. `Promise.resolve(1).then(v => v + 1).then(console.log)` logs `2`.
16. If a `.then()` returns another Promise, the next handler waits for it.
17. `try/catch` logs the synchronous message before the await, catches the rejection, then continues after the catch.
18. Two async functions run synchronously until their first await; their continuations interleave according to Promise settlement order.
19. Individual timer logs occur as each finishes, but `Promise.all` logs only after the slowest input fulfills.
20. A synchronous throw inside an async function becomes a rejected returned Promise and is handled by `.catch()`.

**Rule for 21–30:** write and predict ten original snippets. The reliable order is synchronous code, then all microtasks (`then`, `queueMicrotask`, resumed `await`), then the next macrotask such as `setTimeout`.
