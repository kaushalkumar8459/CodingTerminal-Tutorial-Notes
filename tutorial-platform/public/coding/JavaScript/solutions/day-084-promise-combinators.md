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
