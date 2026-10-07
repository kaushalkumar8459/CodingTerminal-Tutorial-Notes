# Day 084 — Promise Combinators (all, allSettled, race, any)

Matches Tutorial Day 84 (Promise Methods) — practice previews all four combinators here,
ahead of Tutorial Day 85's full explanation. No limit on how many you build.

## Basic

1. Use `Promise.all()` on 3 Promises that all succeed — confirm you get an array of
   all 3 results.
2. Use `Promise.all()` where ONE Promise rejects — confirm the whole thing rejects
   immediately.
3. Use `Promise.allSettled()` on the SAME 3 Promises from #2 (one rejecting) — observe
   that it does NOT reject, and instead gives you a result for EVERY Promise, each
   marked `"fulfilled"` or `"rejected"`.
4. Use `Promise.race()` on 3 Promises with different delays — confirm you get only
   the result of whichever one finishes FIRST (success or failure).
5. Use `Promise.any()` on 3 Promises where some fail and at least one succeeds —
   confirm you get the first SUCCESSFUL result, ignoring failures (unless ALL fail).

## Concept

6. Build a function that fetches data from 3 different "sources" using `Promise.any()`,
   returning whichever one responds successfully first (useful for redundant/backup
   data sources).
7. Build a function using `Promise.race()` combined with a timeout Promise (one that
   rejects after N seconds) to implement a simple "fetch with timeout" pattern.
8. Use `Promise.allSettled()` to process a batch of operations where you want to know
   about EVERY success and failure, not just stop at the first error.
9. Compare all four combinators side by side using the SAME 3 Promises (one always
   failing) — write down, for each combinator, whether it resolves or rejects, and
   with what value.

## Interview-style questions

10. What's the key behavioral difference between `Promise.all()` and
    `Promise.allSettled()` when one input Promise rejects?
11. When would `Promise.race()` be useful in a real application (think about timeouts)?
12. What's the difference between `Promise.race()` and `Promise.any()`?

## Notes

- `Promise.all()`: fails fast on any rejection. `Promise.allSettled()`: always waits for
  everything, never rejects itself. `Promise.race()`: first to settle (success OR
  failure) wins. `Promise.any()`: first to SUCCEED wins (ignores failures unless all fail).
- The "fetch with timeout" pattern (#7) is a genuinely useful real-world technique worth
  remembering.

<!-- codingterminal-solution:start -->

# Day 084 — Solution: Promise Combinators

```js
const wait = (value, delay, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (fail ? reject(new Error(`${value} failed`)) : resolve(value)),
      delay,
    ),
  );
const first = wait("first", 50);
const second = wait("second", 100);
const failed = wait("failed", 20, true);

Promise.all([first, second]).then(console.log);
Promise.all([first, failed]).catch(console.error);
Promise.allSettled([first, failed]).then(console.log);
Promise.race([wait("slow", 100), wait("fast", 10)]).then(console.log);
Promise.any([failed, wait("success", 30)]).then(console.log);
```

**6. First successful source**

```js
function fastestSource(sources) {
  return Promise.any(sources.map((source) => source()));
}
```

**7. Fetch with timeout**

```js
function timeoutAfter(milliseconds) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timed out")), milliseconds),
  );
}
function fetchWithTimeout(request, milliseconds) {
  return Promise.race([request(), timeoutAfter(milliseconds)]);
}
```

**8–9.** `allSettled()` is useful for a batch report because every result contains `status` and either `value` or `reason`. With the same inputs, `all` fails on one rejection, `allSettled` fulfills with statuses, `race` uses the first settlement, and `any` uses the first fulfillment.

## Interview-style questions

**10.** `all` fails fast; `allSettled` waits for every input and never rejects because of an input rejection.

**11.** `race` is useful for timeouts, choosing the first response, or cancelling a slow fallback path.

**12.** `race` chooses the first settled result, success or failure. `any` ignores failures and chooses the first success, rejecting only if all fail.

<!-- codingterminal-solution:end -->

