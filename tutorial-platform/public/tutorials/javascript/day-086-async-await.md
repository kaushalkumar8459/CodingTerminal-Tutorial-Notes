---
title: Async/Await
slug: day-086-async-await
dayLabel: Day 86
level: Advanced
estimatedMinutes: 30
order: 86
track: javascript
---

# Day 86 [Advanced]: Async/Await

## Goal

Fully learn `async`/`await` syntax — how it simplifies working with Promises, and proper error handling with `try/catch`.

## Prerequisites

- Day 83–85 (Promises, methods, combinators)
- Day 85 practice (async/await preview and conversions)

## Explanation

`async`/`await` is syntax built directly on top of Promises, letting asynchronous code LOOK almost exactly like synchronous code — no `.then()` chains needed. Adding `async` before a function makes it ALWAYS return a Promise automatically (even if you `return` a plain value inside it). Inside an `async` function, `await` pauses execution at that specific line until the awaited Promise settles, then either gives you the resolved value directly, or throws the rejection as a catchable error.

Error handling with `async`/`await` uses familiar `try/catch` blocks, instead of `.catch()` — this is one of its biggest readability advantages over raw Promise chains.

## Topic by Topic

### Topic 1: `async` functions always return a Promise

Theory:
Adding `async` before a function declaration makes it automatically wrap its return value in a Promise — even a plain, non-Promise value.

Code Example:

```js
async function getGreeting() {
  return "Hello!"; // looks like a plain return, but is automatically wrapped
}

getGreeting().then((value) => console.log(value)); // "Hello!"
console.log(getGreeting()); // Promise {<fulfilled>: "Hello!"}
```

**Explanation:** Even though `getGreeting` just uses a plain `return`, calling it gives you back a Promise — this automatic wrapping is a defining feature of `async` functions.

**Key Points:**

- `async function` ALWAYS returns a Promise, regardless of what you `return` inside it.
- Returning a plain value automatically becomes a resolved Promise with that value.
- This makes `async` functions fully compatible with `.then()`/`.catch()` if needed, even though you'll usually use `await` instead.

### Topic 2: `await` — pausing for a Promise's result

Theory:
`await promiseExpression` pauses the `async` function's execution at that line until the Promise settles, then gives back the resolved value directly (or throws if rejected).

Code Example:

```js
function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function example() {
  console.log("Before await");
  const result = await delay(1000, "Data loaded");
  console.log("After await:", result);
}

example();
```

**Explanation:** `"After await"` doesn't print until 1 second has passed — `await` pauses JUST this function's execution at that line, without blocking anything else in the program (matching the event loop behavior from Day 81).

**Key Points:**

- `await` can only be used inside an `async` function.
- It pauses that SPECIFIC function's execution, without blocking the rest of the program.
- After `await`, you get the Promise's resolved value directly — no `.then()` needed.

### Topic 3: Error handling with `try/catch`

Theory:
Since `await` throws a catchable error when its Promise rejects, you can use familiar `try/catch` blocks instead of `.catch()`.

Code Example:

```js
async function fetchUserSafely(userId) {
  try {
    const user = await getUser(userId); // getUser() from Day 78/80, Promise-based
    console.log("User loaded:", user);
    return user;
  } catch (error) {
    console.log("Failed to load user:", error.message);
    return null;
  }
}
```

**Explanation:** If `getUser(userId)`'s Promise rejects, `await` re-throws that rejection as a regular JavaScript error, which `catch` picks up — exactly like handling a synchronous error.

**Key Points:**

- `try/catch` around `await` handles Promise rejections, just like synchronous errors.
- This is often considered more readable than chaining `.catch()`, especially with multiple sequential `await` calls.
- Always wrap `await` calls in `try/catch` when failure is a realistic possibility.

### Topic 4: Multiple sequential `await` calls

Theory:
Multiple `await` statements in a row read almost exactly like synchronous code, even though each one is asynchronous underneath.

Code Example:

```js
async function loadDashboard(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    const products = await getProducts();
    return { user, orders, products };
  } catch (error) {
    console.log("Dashboard load failed:", error.message);
    throw error; // re-throw so the caller can also handle it if needed
  }
}
```

**Explanation:** This reads almost exactly like plain synchronous code — no nested callbacks, no `.then()` chains — yet each `await` line is genuinely asynchronous, pausing only this function while other code continues running elsewhere.

**Key Points:**

- Sequential `await` calls read naturally, top to bottom, just like synchronous code.
- One `try/catch` can wrap multiple `await` calls, consolidating error handling cleanly.
- This is directly comparable to (and usually preferred over) the Day 81 Promise-chain version of the same logic.

## Recap

- `async` functions always return a Promise; `await` pauses execution for a Promise's result within that function.
- `try/catch` replaces `.catch()` for handling rejected Promises, using familiar synchronous-style error handling.
- Multiple sequential `await` statements read like synchronous code while remaining genuinely asynchronous.

## What's Next

Practice for today: `public/coding/JavaScript/day-086-sequential-vs-parallel.md`. Day 87 covers advanced async/await patterns — sequential vs parallel execution and common mistakes.
