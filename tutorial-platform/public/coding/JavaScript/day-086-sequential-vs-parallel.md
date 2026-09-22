# Day 086 — Sequential vs Parallel

Matches Tutorial Day 86 (Async/Await). No limit on how many you build/measure.

## Basic

1. Write an `async` function that `await`s two DIFFERENT delayed operations
   SEQUENTIALLY (one after the other), and measure roughly how long the whole thing
   takes (should be close to the SUM of both delays).
2. Rewrite the same function to run both operations in PARALLEL using `Promise.all()`
   with `await`, and measure the time again (should be close to the LONGER of the two
   delays, not the sum).
3. Explain, in a comment, exactly WHY the parallel version is faster overall for two
   INDEPENDENT operations.

## Concept

4. Identify a scenario where operations MUST run sequentially (each depends on the
   previous one's result) — write an async function demonstrating this correctly.
5. Identify a scenario where operations are fully INDEPENDENT and could safely run in
   parallel — rewrite it using `Promise.all()` with `await` for a speed improvement.
6. Take your Day 86-style `loadDashboard(userId)` function and determine: which steps
   inside it are genuinely sequential (must wait for a previous result), and which
   could actually run in parallel? Refactor it accordingly.
7. Build a function that loads 5 independent pieces of data using
   `await Promise.all([...])`, and measure the total time versus doing all 5
   sequentially with separate `await` statements.

## Interview-style questions

8. What's the most common MISTAKE beginners make with `await`, that accidentally
   turns independent operations into unnecessarily sequential ones?
9. When are you FORCED to run operations sequentially with `await`, rather than in
   parallel?
10. Why does wrapping multiple `await` calls in `Promise.all()` improve performance
    for independent operations specifically?

## Notes

- A very common mistake: writing `const a = await taskA(); const b = await taskB();`
  when `taskA` and `taskB` don't actually depend on each other — this needlessly makes
  them sequential, wasting time. Use `Promise.all()` instead whenever operations are
  genuinely independent.
- Always ask: "does this next step actually NEED the result of the previous one?"
  before deciding whether something should be sequential or parallel.
