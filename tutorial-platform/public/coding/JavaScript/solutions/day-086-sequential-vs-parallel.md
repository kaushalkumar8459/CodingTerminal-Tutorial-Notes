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
