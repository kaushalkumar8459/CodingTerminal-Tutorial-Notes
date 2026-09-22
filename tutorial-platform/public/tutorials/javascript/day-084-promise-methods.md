---
title: Promise Methods
slug: day-084-promise-methods
dayLabel: Day 84
level: Advanced
estimatedMinutes: 25
order: 84
track: javascript
---

# Day 84 [Advanced]: Promise Methods

## Goal

Master `.then()`, `.catch()`, and `.finally()` in complete depth, and solidify Promise chaining patterns.

## Prerequisites

- Day 81 (chaining practice), Day 83 (Promises formally)

## Explanation

Today consolidates the three core Promise instance methods: `.then()` (handle success, and optionally failure too), `.catch()` (handle failure specifically), and `.finally()` (run cleanup code regardless of outcome). Each of these methods itself RETURNS A NEW PROMISE, which is exactly what makes chaining possible — every `.then()`/`.catch()`/`.finally()` in a chain is really just building a sequence of connected Promises.

## Topic by Topic

### Topic 1: `.then()` in full depth

Theory:
`.then(onFulfilled, onRejected)` can take up to two functions — the first handles success, the second (optional) handles failure — and always returns a brand-new Promise.

Code Example:

```js
Promise.resolve(5).then(
  (value) => console.log("Success:", value),
  (error) => console.log("Failure:", error), // rarely used this way in practice
);
```

**Explanation:** While `.then()` technically accepts a failure handler as its second argument, using `.catch()` separately (as you've been doing) is the more common, readable convention in real code.

**Key Points:**

- `.then()` always returns a new Promise, enabling chaining.
- `.then(success, failure)` is valid, but `.catch()` for failures is the more idiomatic style.
- Whatever a `.then()` callback returns becomes the resolved value of the NEXT Promise in the chain.

### Topic 2: `.catch()` in full depth

Theory:
`.catch(onRejected)` is shorthand for `.then(undefined, onRejected)` — it specifically handles rejection, from any point earlier in the chain.

Code Example:

```js
Promise.reject(new Error("Oops"))
  .then((value) => console.log("Never runs")) // skipped because the Promise rejected
  .catch((error) => console.log("Caught:", error.message));
```

**Explanation:** Since the original Promise rejected, the `.then()` success handler is skipped entirely, and execution jumps straight to `.catch()`.

**Key Points:**

- `.catch()` only runs when something rejected earlier in the chain.
- It catches rejections from the ORIGINAL Promise or any `.then()` step before it.
- `.catch()` itself returns a new (fulfilled, unless it throws again) Promise, so chaining can continue afterward if needed.

### Topic 3: `.finally()` in full depth

Theory:
`.finally(callback)` runs regardless of whether the Promise chain succeeded or failed — useful for cleanup that must always happen.

Code Example:

```js
function fetchData(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => (shouldFail ? reject(new Error("Failed")) : resolve("Data")),
      500,
    );
  });
}

fetchData(false)
  .then((data) => console.log("Got:", data))
  .catch((error) => console.log("Error:", error.message))
  .finally(() => console.log("Cleanup: hiding loading spinner"));
```

**Explanation:** Whether `fetchData` resolves OR rejects, `.finally()`'s callback always runs — perfect for things like hiding a loading indicator, which should happen no matter the outcome.

**Key Points:**

- `.finally()` runs regardless of success or failure — no argument is passed to its callback.
- Ideal for cleanup work: hiding spinners, closing connections, logging completion.
- `.finally()` doesn't change the resolved/rejected value passed further down the chain.

### Topic 4: Chaining all three together

Theory:
`.then()`, `.catch()`, and `.finally()` are commonly combined in one chain to fully handle a real asynchronous operation's success, failure, and cleanup.

Code Example:

```js
function loadUserProfile(userId) {
  return fetchData(userId < 0) // simulate failure for negative IDs
    .then((data) => `Profile: ${data}`)
    .catch((error) => `Error loading profile: ${error.message}`)
    .finally(() => console.log("Profile load attempt finished"));
}

loadUserProfile(1).then((result) => console.log(result));
loadUserProfile(-1).then((result) => console.log(result));
```

**Explanation:** Note that `.catch()` here RECOVERS from the error by returning a fallback string — this means the Promise returned by `loadUserProfile` always resolves successfully, one way or another, which is why the final `.then()` in each call works consistently.

**Key Points:**

- Combining `.then()`, `.catch()`, and `.finally()` covers success, failure, and cleanup in one readable chain.
- A `.catch()` that returns a normal value (rather than re-throwing) effectively "recovers" the chain back to a fulfilled state.
- This pattern is the standard, complete way to handle a real Promise-based operation end-to-end.

## Recap

- `.then()`, `.catch()`, and `.finally()` each return a new Promise, enabling chaining.
- `.catch()` handles rejection from anywhere earlier in the chain; `.finally()` always runs, for cleanup.
- Combining all three provides complete success/failure/cleanup handling for a real async operation.

## What's Next

Practice for today: `public/coding/JavaScript/day-084-promise-combinators.md`. Day 85 covers `Promise.all/allSettled/race/any` in full depth.
