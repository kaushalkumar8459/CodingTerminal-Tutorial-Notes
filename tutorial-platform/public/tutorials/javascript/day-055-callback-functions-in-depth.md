---
title: Callback Functions In Depth
slug: day-055-callback-functions-in-depth
dayLabel: Day 55
level: Intermediate
estimatedMinutes: 25
order: 55
track: javascript
---

# Day 55 [Intermediate]: Callback Functions In Depth

## Goal

Deepen your understanding of callback functions — what they are, why they matter, and how synchronous callbacks differ from the asynchronous ones you'll meet in Module 6.

## Prerequisites

- Day 52 (callback practice), Day 34/36 (forEach callbacks)

## Explanation

You've already used callbacks constantly — every `.map()`, `.filter()`, `.forEach()` call takes one. Today formalizes the concept: a **callback function** is any function passed as an argument to another function, intended to be called (invoked) at some point by that other function — either immediately (synchronously) or later (asynchronously).

**Synchronous callbacks** (like the ones in array methods) run immediately, as part of the same step-by-step execution — the calling function pauses, runs the callback, and continues. **Asynchronous callbacks** (a preview of Module 6) run later, after some operation completes (like a timer or a network request) — the calling function does NOT wait for them before continuing.

## Topic by Topic

### Topic 1: What makes something a callback?

Theory:
Any function passed by reference into another function, to be called back later, is a callback — regardless of _when_ it actually gets called.

Code Example:

```js
function greetUser(name, formatter) {
  console.log(formatter(name));
}

function politeFormat(name) {
  return `Good day, ${name}.`;
}

greetUser("Wren", politeFormat); // "politeFormat" is the callback here
```

**Explanation:** `politeFormat` is passed by reference (no parentheses) into `greetUser`, which calls it internally — this is the essential shape of every callback pattern.

**Key Points:**

- A callback is passed by reference — never call it (`fn()`) when passing it as an argument, only reference it by name (`fn`).
- The function receiving the callback decides exactly when and how to call it.
- This pattern is the foundation for both array methods and asynchronous programming.

### Topic 2: Passing arguments to callbacks

Theory:
The function that RECEIVES the callback typically decides what arguments to pass to it when calling it — the caller doesn't control this directly.

Code Example:

```js
function processNumbers(numbers, callback) {
  numbers.forEach((number, index) => {
    callback(number, index); // processNumbers decides what to pass in
  });
}

processNumbers([10, 20, 30], (num, i) => {
  console.log(`Index ${i}: ${num}`);
});
```

**Explanation:** `processNumbers` (not the caller of `processNumbers`) decides that its callback will receive `(number, index)` — this is exactly how `.forEach()`'s own callback signature works internally.

**Key Points:**

- The receiving function's design determines what arguments a callback gets.
- This is why understanding a method's documented callback signature (like `.forEach((item, index, array) => {})`) matters.
- You've been using this pattern the whole time with array methods, often without thinking of it as "callbacks" explicitly.

### Topic 3: Synchronous vs asynchronous callbacks (preview)

Theory:
A synchronous callback runs immediately, blocking further code until it's done. An asynchronous callback runs later, after some operation finishes — code after it keeps running in the meantime.

Code Example:

```js
// Synchronous - runs immediately, in order
console.log("Before");
[1, 2, 3].forEach((n) => console.log(n));
console.log("After");
// Before, 1, 2, 3, After (always this exact order)

// Asynchronous - runs LATER (full explanation in Module 6)
console.log("Before timer");
setTimeout(() => console.log("Inside timer"), 1000);
console.log("After timer");
// Before timer, After timer, (1 second later) Inside timer
```

**Explanation:** The synchronous `.forEach()` callback finishes completely before `"After"` prints. The asynchronous `setTimeout()` callback is scheduled to run later, so `"After timer"` prints BEFORE the timer's callback, even though it appears after in the code.

**Key Points:**

- Synchronous callbacks run immediately, in the exact order written.
- Asynchronous callbacks run later — the surrounding code continues without waiting.
- Module 6 covers this distinction fully — today is just enough of a preview to recognize the difference.

### Topic 4: Why callbacks matter as a foundational concept

Theory:
Callbacks are the mechanism behind array methods, event handlers (Day 13), timers, and — eventually — promises and async/await (Module 6). Understanding them deeply now makes every one of those topics easier later.

Practical:
Whenever you see a function accepting another function as a parameter, pause and identify: is this callback synchronous or asynchronous? What arguments will it receive, and who decides that?

**Key Points:**

- Callbacks appear throughout nearly every part of JavaScript you've learned so far and will learn going forward.
- Being able to confidently trace "who calls this, when, and with what arguments" is a core JavaScript reading skill.
- This concept directly sets up Promises and async/await starting Day 83.

## Recap

- A callback is any function passed by reference to be called later by the receiving function.
- The receiving function decides what arguments the callback gets, and when it's called.
- Synchronous callbacks run immediately in order; asynchronous callbacks run later — a preview of Module 6.

## What's Next

Practice for today: `public/coding/JavaScript/day-055-this-keyword.md` — predict-the-output questions for `this`. Day 56 covers higher-order functions in depth.
