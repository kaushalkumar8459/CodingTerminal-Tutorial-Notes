# Day 079 — Callback Hell

Matches Tutorial Day 79 (The Call Stack). No limit on how many variations you try.

## The problem

1. Reuse your `login`, `getUser`, `getOrders`, `getProducts` functions from Day 78, and
   chain ALL FOUR together, nesting each call inside the previous one's callback. Notice
   how deeply indented ("nested") this becomes — this is "callback hell."
2. Add basic error handling (checking for an error in each callback) to the nested
   chain, and notice how much MORE nested and repetitive it becomes.

## Refactoring attempts

3. Refactor the nested chain by extracting each step into its own NAMED function
   (instead of anonymous inline callbacks), reducing the visual nesting while keeping
   the same callback-based flow.
4. Try flattening the structure slightly by having each step call the next as a
   separate statement, rather than nesting callbacks directly inside each other's
   function bodies.
5. Write a short comment explaining exactly WHY this nested pattern becomes hard to
   read and maintain as more steps are added.

## Concept

6. Count how many levels of nesting your ORIGINAL (non-refactored) 4-step chain has.
7. Identify at least 3 specific problems with deeply nested callbacks (readability,
   error handling repetition, difficulty reordering steps, etc.) and write them down.
8. Predict: how might a `Promise`-based version of this exact same chain look
   different or cleaner? (You'll build the actual Promise version starting tomorrow.)

## Interview-style questions

9. What is "callback hell," and why does it tend to happen naturally when chaining
   multiple async operations?
10. Why is repeated error-checking in every single callback level a maintenance
    problem?

## Notes

- Don't try to "solve" callback hell today — the goal is to genuinely EXPERIENCE the
  problem firsthand, so that Promises (starting Day 80/83) feel like a clear, motivated
  improvement rather than an arbitrary new syntax to memorize.
- Keep today's messy, deeply-nested code around — you'll rewrite this exact same
  4-step chain using Promises and then async/await later in this module, for a direct
  side-by-side comparison.
