---
title: The Event Loop
slug: day-081-the-event-loop
dayLabel: Day 81
level: Advanced
estimatedMinutes: 30
order: 81
track: javascript
---

# Day 81 [Advanced]: The Event Loop

## Goal

Fully understand the event loop — the mechanism that ties together the call stack, callback queue, and microtask queue — completing the picture from Days 78-80.

## Prerequisites

- Day 78–80 (execution context, call stack, JavaScript runtime)

## Explanation

The **event loop** continuously checks one simple thing: **is the call stack empty?** If it is, the event loop takes the next waiting callback and pushes it onto the call stack to run. This is the exact mechanism that connects the callback queue (Day 80) back to the call stack (Day 79).

There are actually TWO queues involved: the **macrotask queue** (for things like `setTimeout` callbacks and DOM events) and the **microtask queue** (for Promise callbacks — `.then()`, `.catch()`, `.finally()`, and `async/await` continuations). Critically, the event loop always fully empties the **microtask queue** before processing even ONE more macrotask — this priority ordering explains a lot of "surprising" output ordering with Promises vs `setTimeout`.

## Topic by Topic

### Topic 1: The event loop's core job

Theory:
The event loop repeatedly checks: "Is the call stack empty? If so, take the next task from a queue and run it."

Code Example:

```js
console.log("1 - synchronous");

setTimeout(() => console.log("3 - from macrotask queue"), 0);

console.log("2 - synchronous");

// Output: 1, 2, 3 - the setTimeout callback waits until the stack is empty
```

**Explanation:** Even with a `0ms` delay, `"3"` only prints AFTER both synchronous lines finish — the event loop only moves the callback to the stack once the stack is completely empty.

**Key Points:**

- The event loop's job: check if the call stack is empty, then pull the next task from a queue if so.
- Synchronous code ALWAYS runs to completion before any queued callback gets a turn.
- This single rule explains a huge amount of asynchronous JavaScript's behavior.

### Topic 2: Macrotasks vs microtasks

Theory:
`setTimeout`/`setInterval` callbacks and DOM events go into the macrotask queue. Promise callbacks (`.then/.catch/.finally`) and `queueMicrotask()` go into the microtask queue — a separate, higher-priority queue.

Code Example:

```js
console.log("1");

setTimeout(() => console.log("2 - macrotask"), 0);

Promise.resolve().then(() => console.log("3 - microtask"));

console.log("4");

// Output: 1, 4, 3, 2
// Synchronous code first, then ALL microtasks, then the next macrotask
```

**Explanation:** Even though the `setTimeout` was written FIRST, the Promise's `.then()` (a microtask) runs BEFORE it — the event loop always drains the entire microtask queue before touching the next macrotask.

**Key Points:**

- Microtasks (Promise callbacks) have priority over macrotasks (`setTimeout` callbacks).
- The event loop empties the ENTIRE microtask queue before running even one more macrotask.
- This is one of the most commonly tested "predict the output" JavaScript interview topics.

### Topic 3: `async`/`await` and the event loop

Theory:
`async`/`await` (covered fully starting Day 86) is built on Promises — code after an `await` is scheduled as a microtask, following the exact same priority rules just covered.

Code Example:

```js
async function example() {
  console.log("A - inside async function, before await");
  await null; // pauses here, resumes as a microtask
  console.log("C - after await, runs as a microtask");
}

console.log("Start");
example();
console.log("B - synchronous code after calling example()");

// Output: Start, A, B, C
```

**Explanation:** The code before `await` runs synchronously and immediately; the code AFTER `await` is scheduled as a microtask, so it waits until the current synchronous code (`"B"`) finishes first.

**Key Points:**

- Code before the first `await` in an async function runs synchronously, immediately.
- Code after `await` resumes as a microtask, following the same priority as `.then()` callbacks.
- This connects directly to the async/await syntax you'll practice starting Day 86.

### Topic 4: Practicing predict-the-output

Theory:
The best way to solidify the event loop is deliberately predicting mixed synchronous/microtask/macrotask output BEFORE running it.

Practical:
Take any small program mixing `console.log()`, `setTimeout()`, and `Promise.resolve().then()`, and trace through: (1) what runs synchronously first, (2) what gets queued as a microtask, (3) what gets queued as a macrotask, (4) the final order (all sync, then all microtasks, then macrotasks in order).

**Key Points:**

- Predicting output BEFORE running code is the single best way to internalize the event loop.
- The core rule to remember: all synchronous code first, then ALL microtasks (fully drained), then the next macrotask.
- Day 87's Event Loop Challenges give you 30 more of these exact predict-the-output problems.

## Recap

- The event loop moves queued callbacks onto the call stack, but only once the stack is completely empty.
- Microtasks (Promises) are fully drained before the next macrotask (`setTimeout`) runs — a key priority rule.
- `async`/`await` is built on this same microtask mechanism — code after `await` resumes as a microtask.

## What's Next

Practice for today: `public/coding/JavaScript/day-081-promise-chaining.md`. Day 82 covers callback-based async patterns and callback hell solutions in more depth.
