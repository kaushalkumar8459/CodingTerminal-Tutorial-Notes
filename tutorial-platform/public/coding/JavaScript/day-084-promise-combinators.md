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
