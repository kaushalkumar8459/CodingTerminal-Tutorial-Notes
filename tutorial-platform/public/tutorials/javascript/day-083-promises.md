---
title: Promises
slug: day-083-promises
dayLabel: Day 83
level: Advanced
estimatedMinutes: 30
order: 83
track: javascript
---

# Day 83 [Advanced]: Promises

## Goal

Learn Promises formally, from the ground up — states, creation, and the resolve/reject mechanism — consolidating the Day 80 preview.

## Prerequisites

- Day 80–82 (Promise practice preview, event loop, callback hell solutions)

## Explanation

A **Promise** represents a value that isn't available yet, but will be at some point — either successfully (**fulfilled**) or unsuccessfully (**rejected**). Every Promise starts in the **pending** state, and can transition to EITHER `fulfilled` or `rejected` — but never both, and never back to `pending` once settled.

You create a Promise with `new Promise((resolve, reject) => { ... })` — inside that function, you perform your async work, then call `resolve(value)` on success or `reject(error)` on failure. Once created, other code can react to the eventual result using `.then()` (success) and `.catch()` (failure), as previewed on Day 80.

## Topic by Topic

### Topic 1: The three Promise states

Theory:
Every Promise is in exactly one of three states: `pending` (still waiting), `fulfilled` (succeeded, has a value), or `rejected` (failed, has a reason/error).

Code Example:

```js
const pendingPromise = new Promise(() => {}); // never resolves - stays pending forever
console.log(pendingPromise); // Promise {<pending>}

const fulfilledPromise = Promise.resolve("Done!");
console.log(fulfilledPromise); // Promise {<fulfilled>: "Done!"}

const rejectedPromise = Promise.reject(new Error("Failed"));
console.log(rejectedPromise); // Promise {<rejected>: Error: Failed}
```

**Explanation:** `Promise.resolve()`/`Promise.reject()` are shortcuts for creating already-settled Promises directly — useful for testing, or for functions that sometimes need to return a Promise even when the result is already known.

**Key Points:**

- Every Promise starts `pending`, and transitions to `fulfilled` or `rejected` exactly once.
- Once `fulfilled` or `rejected` (collectively called "settled"), a Promise's state and value never change again.
- `Promise.resolve(value)`/`Promise.reject(reason)` create already-settled Promises directly.

### Topic 2: Creating a Promise

Theory:
`new Promise((resolve, reject) => { ... })` takes an "executor" function, which receives two functions (`resolve`, `reject`) to call once your async work finishes.

Code Example:

```js
function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

delay(1000, "Hello after 1 second").then((result) => console.log(result));
```

**Explanation:** The executor function runs IMMEDIATELY (synchronously) when the Promise is created, but the actual `resolve()` call happens later, inside the `setTimeout` callback, once the delay has passed.

**Key Points:**

- The executor function (`(resolve, reject) => {...}`) runs immediately, synchronously, when the Promise is created.
- `resolve(value)` and `reject(reason)` are called whenever your actual async work completes.
- Wrapping existing callback-based or timer-based operations in `new Promise()` is exactly how you "promisify" them.

### Topic 3: `.then()` and `.catch()` in depth

Theory:
`.then(onFulfilled, onRejected)` reacts to a Promise's eventual success or failure; `.catch(onRejected)` is shorthand for `.then(undefined, onRejected)`.

Code Example:

```js
delay(500, "Success!")
  .then((result) => {
    console.log("Got:", result);
    return result.toUpperCase();
  })
  .then((upperResult) => console.log("Upper:", upperResult))
  .catch((error) => console.log("Error:", error.message));
```

**Explanation:** Each `.then()` receives the value returned by the PREVIOUS `.then()` (or the original Promise), forming a chain — `.catch()` at the end catches any failure from anywhere earlier in the chain.

**Key Points:**

- `.then()` can take a success handler and/or a failure handler; `.catch()` is a cleaner shorthand for failure handling.
- Returning a value from `.then()` passes it to the NEXT `.then()` in the chain.
- This is exactly the chaining mechanism you practiced building on Day 81.

### Topic 4: Promises vs callbacks — a direct comparison

Theory:
A Promise-returning function looks different from a callback-based one, but solves the exact same underlying problem (handling eventual async results) more cleanly.

Code Example:

```js
// Callback-based (Day 78 style)
function getUserCallback(id, callback) {
  setTimeout(() => callback(null, { id, name: "User " + id }), 500);
}

// Promise-based (today's style)
function getUserPromise(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "User " + id }), 500);
  });
}
```

**Explanation:** Both eventually produce the same result, but `getUserPromise` can be chained, combined with `Promise.all()` (Day 85), and used with `async/await` (Day 86) — capabilities the callback version doesn't have natively.

**Key Points:**

- Promise-based functions RETURN a Promise, rather than accepting a callback parameter.
- This single change unlocks chaining, combinators, and async/await syntax.
- Converting existing callback-based code to Promise-based code is called "promisifying."

## Recap

- A Promise represents an eventual value, starting `pending` and settling to `fulfilled` or `rejected` exactly once.
- `new Promise((resolve, reject) => {...})` creates one; `.then()`/`.catch()` react to the eventual result.
- Promise-based functions unlock chaining, combinators, and async/await — advantages callback-based functions don't have.

## What's Next

Practice for today: `public/coding/JavaScript/day-083-promise-all.md`. Day 84 covers Promise methods (`.then/.catch/.finally`) and chaining in more depth.
