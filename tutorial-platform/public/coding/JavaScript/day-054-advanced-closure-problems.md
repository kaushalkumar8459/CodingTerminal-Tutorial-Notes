# Day 054 — Advanced Closure Problems (once, memoize, createCounter, createLogger, createIdGenerator)

Matches Tutorial Day 54 (Optional Chaining and Nullish Coalescing In Depth). No limit on
how many you build.

## Build these

1. `once(fn)` — returns a function that only calls `fn` the first time it's invoked
   (revisit/refine your Day 53 version if you built one).
2. `memoize(fn)` — returns a function that caches results by argument, so calling it
   again with the SAME argument returns the cached result instantly instead of
   recalculating.
3. `createCounter(start = 0)` — returns an object with `increment()`, `decrement()`, and
   `getValue()` methods, all sharing one private count via closure.
4. `createLogger(prefix)` — returns a function that logs messages, automatically
   prefixing every message with the given `prefix` (e.g. `"[APP] Something happened"`).
5. `createIdGenerator(startingId = 1)` — returns a function that produces a new unique
   ID each time it's called, incrementing internally via closure.

## Concept

6. Test `memoize()` on a deliberately slow function (e.g. one with an artificial
   loop-based delay) and confirm the SECOND call with the same argument is noticeably
   faster.
7. Extend `createCounter()` with a `reset()` method that sets the count back to the
   original starting value.
8. Extend `createLogger(prefix)` so it also tracks how many messages have been logged
   so far, exposed via a `getLogCount()` method.
9. Use `createIdGenerator()` to generate IDs for a small array of objects you build,
   confirming each one is unique.
10. Combine two closures together: a logger created via `createLogger()` used inside a
    counter created via `createCounter()`, logging every increment/decrement.

## Interview-style questions

11. Why is `memoize()` considered a classic, valuable use of closures?
12. What would happen if `createCounter()`'s internal count variable was accidentally
    declared OUTSIDE the function instead of inside it (shared globally)? Why would that
    be a bug?
13. How does closures-based "private" state (like in `createBankAccount` from Day 53)
    compare to the private fields (`#field`) you'll see in classes starting Day 66?

## Notes

- `memoize()` is one of the most commonly asked closure-based interview questions —
  make sure you can build it confidently from memory.
- These patterns (counters, loggers, ID generators, memoization) are genuinely used in
  real production code, not just as learning exercises.
