# Day 087 — Event Loop Challenges (30 Predict-the-Output Questions)

Matches Tutorial Day 87 (Async/Await Advanced). Predict each output BEFORE running it.
No limit on writing more of your own afterward.

Mix of `console.log`, `setTimeout`, `Promise.then`, `queueMicrotask`, and `async/await`.

1. `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");`
2. `console.log("A"); Promise.resolve().then(() => console.log("B")); console.log("C");`
3. Combine #1 and #2 in one snippet — predict the FULL order of A/B/C/D.
4. `setTimeout(() => console.log("timeout"), 0); Promise.resolve().then(() => console.log("promise"));`
5. Two `setTimeout(fn, 0)` calls in a row, each logging a different number — what order
   do they log in?
6. Two `Promise.resolve().then(fn)` calls in a row — what order do they log in?
7. `queueMicrotask(() => console.log("micro"));` combined with a `console.log` before
   and after it.
8. An `async function` with a `console.log` BEFORE its first `await`, and a
   `console.log` AFTER it — combined with a `console.log` right after CALLING the
   function (not inside it).
9. Nest a `setTimeout` INSIDE a `.then()` callback — where does its callback fall in
   the overall order?
10. Nest a `.then()` INSIDE a `setTimeout` callback — where does IT fall?
11. Three chained `.then()` calls, each just logging a number — confirm they run in order.
12. An `async function` that `await`s a `setTimeout`-based Promise, combined with
    other synchronous and `Promise.then()` code around the call.
13. A `for` loop that calls `setTimeout(() => console.log(i), 0)` using `var i` —
    predict what all the callbacks log (classic closures + async gotcha, revisit Day 63 Q11).
14. The same loop, but using `let i` instead of `var i` — predict the difference.
15. `Promise.resolve(1).then((v) => v + 1).then((v) => console.log(v));`
16. A `.then()` callback that `return`s ANOTHER Promise (not just a plain value) —
    confirm the NEXT `.then()` waits for it correctly.
17. `try/catch` around an `await` of a rejected Promise, combined with a
    `console.log` before and after the `try/catch` block.
18. Two `async` functions called back to back (not awaited relative to each other) —
    predict how their internal logs interleave.
19. `Promise.all()` combined with `setTimeout`-based Promises of DIFFERENT delays —
    predict when the combined `.then()` fires relative to individual `console.log`s
    inside each Promise.
20. A synchronous `throw` INSIDE an `async function` (not from an `await`) — confirm
    it's still catchable with `.catch()` on the function's returned Promise.
    21-30. Write 10 of your OWN predict-the-output snippets, mixing at least 3 of
    (`setTimeout`, `Promise.then`, `queueMicrotask`, `async/await`, nested functions) in
    each one — then verify your own predictions.

## Notes

- These are classic, frequently-asked interview questions — treat this as serious
  practice, not just a quick read-through.
- The one rule that resolves almost ALL of these: synchronous code runs first, then ALL
  microtasks (Promises) are fully drained, THEN the next macrotask (setTimeout) runs —
  repeat.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

