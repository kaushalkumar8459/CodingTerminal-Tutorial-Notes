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

<!-- codingterminal-solution:start -->

# Day 054 — Solution: Advanced Closure Problems

```js
function once(fn) {
  let called = false, result;
  return (...args) => { if (!called) { called = true; result = fn(...args); } return result; };
}

function memoize(fn) {
  const cache = new Map();
  return (argument) => {
    if (!cache.has(argument)) cache.set(argument, fn(argument));
    return cache.get(argument);
  };
}

function createCounter(start = 0) {
  let count = start;
  return { increment: () => ++count, decrement: () => --count, getValue: () => count, reset: () => { count = start; } };
}

function createLogger(prefix) {
  let logCount = 0;
  const logger = (message) => { logCount++; console.log(`[${prefix}] ${message}`); };
  logger.getLogCount = () => logCount;
  return logger;
}

function createIdGenerator(startingId = 1) {
  let nextId = startingId;
  return () => nextId++;
}
```

**6. Memoization test**

```js
const slowSquare = memoize((number) => { for (let i = 0; i < 1e6; i++); return number * number; });
console.time("first"); slowSquare(10); console.timeEnd("first");
console.time("second"); slowSquare(10); console.timeEnd("second");
```

**9–10. Use the closures**

```js
const nextId = createIdGenerator();
const records = ["A", "B", "C"].map((name) => ({ id: nextId(), name }));
const logger = createLogger("COUNTER");
const counter = createCounter();
logger(`value: ${counter.increment()}`);
logger(`value: ${counter.decrement()}`);
```

## Interview-style questions

**11.** Memoization uses a closure to retain a private cache between calls while hiding that cache from outside code.

**12.** All counters would share one global variable, so changing one counter would change the others and make independent state impossible.

**13.** Closure privacy is convention-based through inaccessible local variables and methods. `#field` is language-enforced private class state with class-specific syntax and rules.

<!-- codingterminal-solution:end -->

