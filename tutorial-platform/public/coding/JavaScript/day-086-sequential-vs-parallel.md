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

<!-- codingterminal-solution:start -->

# Day 086 — Solution: Sequential vs Parallel

```js
const task = (name, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(name), delay));

async function sequential() {
  console.time("sequential");
  const first = await task("first", 300);
  const second = await task("second", 200);
  console.timeEnd("sequential");
  return [first, second];
}

async function parallel() {
  console.time("parallel");
  const result = await Promise.all([task("first", 300), task("second", 200)]);
  console.timeEnd("parallel");
  return result;
}
```

The sequential version waits about 500 ms; the parallel version waits about 300 ms because independent timers overlap.

**4. Dependent operations**

```js
async function dependentFlow() {
  const user = await task("user", 100);
  return task(`orders for ${user}`, 100);
}
```

**5. Independent operations**

```js
async function independentFlow() {
  return Promise.all([
    task("users", 100),
    task("products", 150),
    task("orders", 80),
  ]);
}
```

**6–7.** Fetch the user first when orders require the user ID, then start independent products/orders together. For five independent tasks, put all five Promise calls inside one `Promise.all` and compare with five separate awaits.

## Interview-style questions

**8.** Starting one task with `await` before even creating the next task accidentally serializes independent work.

**9.** Operations must be sequential when the next operation needs the previous result or when ordering/side effects matter.

**10.** `Promise.all` starts every independent Promise before awaiting the combined result, overlapping their waiting time.

<!-- codingterminal-solution:end -->

