---
title: Promise Combinators In Depth
slug: day-085-promise-combinators-in-depth
dayLabel: Day 85
level: Advanced
estimatedMinutes: 25
order: 85
track: javascript
---

# Day 85 [Advanced]: Promise Combinators In Depth

## Goal

Fully understand all four Promise combinators — `Promise.all()`, `Promise.allSettled()`, `Promise.race()`, and `Promise.any()` — and know exactly when to reach for each.

## Prerequisites

- Day 83 (Promise.all preview), Day 84 (combinators preview)

## Explanation

When you have MULTIPLE Promises to coordinate, JavaScript provides four different combinator methods, each with different behavior for how they combine results and handle failures. Choosing the right one depends entirely on your specific requirement: do you need ALL of them to succeed? Do you want to know about every outcome, even failures? Do you just want whichever finishes first? Do you want the first SUCCESS specifically?

## Topic by Topic

### Topic 1: `Promise.all()` — all or nothing

Theory:
`Promise.all(promises)` resolves with an array of all results, ONLY if every single Promise succeeds — if even one rejects, the entire thing rejects immediately with that error.

Code Example:

```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(new Error("Failed!")),
])
  .then((results) => console.log("All succeeded:", results))
  .catch((error) => console.log("At least one failed:", error.message));
// "At least one failed: Failed!"
```

**Explanation:** Even though two of the three Promises succeeded, `Promise.all()` rejects the ENTIRE operation because at least one failed — use this when you genuinely need every single result to proceed.

**Key Points:**

- Use `Promise.all()` when ALL results are required — any single failure invalidates the whole operation.
- Fails fast: rejects as soon as the FIRST failure occurs, without waiting for the rest.
- Best for loading multiple pieces of data that are all essential (e.g. Day 83's dashboard example).

### Topic 2: `Promise.allSettled()` — always waits, never rejects itself

Theory:
`Promise.allSettled(promises)` waits for EVERY Promise to settle (either way), and always resolves with an array describing each outcome — it never itself rejects.

Code Example:

```js
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject(new Error("Failed!")),
]).then((results) => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: 1 },
  //   { status: "rejected", reason: Error: Failed! }
  // ]
});
```

**Explanation:** Instead of stopping at the first failure, `allSettled` reports the outcome of EVERY Promise — useful when partial success is acceptable and you want full visibility into what worked and what didn't.

**Key Points:**

- `Promise.allSettled()` never rejects itself — it always resolves with detailed per-Promise results.
- Each result object has a `status` (`"fulfilled"` or `"rejected"`) plus either `value` or `reason`.
- Best for batch operations where partial failures are acceptable and you need to know about all of them.

### Topic 3: `Promise.race()` — first to finish wins

Theory:
`Promise.race(promises)` settles as soon as the FIRST Promise settles — whether that first one succeeds or fails.

Code Example:

```js
const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 2000));
const fast = new Promise((resolve) => setTimeout(() => resolve("fast"), 500));

Promise.race([slow, fast]).then((result) => console.log(result)); // "fast"
```

**Explanation:** `fast` settles first (at 500ms vs 2000ms), so `Promise.race()` resolves with `"fast"` immediately — it doesn't wait for `slow` to finish at all.

**Key Points:**

- `Promise.race()` settles based on whichever Promise finishes FIRST — success or failure.
- Common use case: implementing a timeout (race your real operation against a Promise that rejects after N seconds).
- If the FIRST to settle happens to be a rejection, `Promise.race()` itself rejects too.

### Topic 4: `Promise.any()` — first success wins

Theory:
`Promise.any(promises)` resolves with the first SUCCESSFUL result, ignoring failures along the way — it only rejects if EVERY single Promise fails.

Code Example:

```js
Promise.any([
  Promise.reject(new Error("Source A failed")),
  Promise.resolve("Source B succeeded"),
  Promise.reject(new Error("Source C failed")),
]).then((result) => console.log(result)); // "Source B succeeded"
```

**Explanation:** Even though the first Promise rejected, `Promise.any()` ignores that failure and waits for/returns the first genuine SUCCESS — here, `"Source B succeeded"`.

**Key Points:**

- `Promise.any()` resolves with the first SUCCESS, ignoring earlier failures.
- It only rejects if ALL Promises fail (with a special `AggregateError` containing all the individual errors).
- Useful for redundant data sources, where you just need ONE of several possible sources to succeed.

## Recap

- `Promise.all()`: all must succeed, fails fast on any rejection.
- `Promise.allSettled()`: waits for everything, reports every outcome, never rejects itself.
- `Promise.race()`: first to settle wins (success or failure); `Promise.any()`: first SUCCESS wins, ignoring failures.

## What's Next

Practice for today: `public/coding/JavaScript/day-085-async-await.md`. Day 86 introduces `async`/`await` — a cleaner syntax built on top of Promises.
