---
title: The Call Stack
slug: day-079-the-call-stack
dayLabel: Day 79
level: Advanced
estimatedMinutes: 25
order: 79
track: javascript
---

# Day 79 [Advanced]: The Call Stack

## Goal

Understand the call stack — the mechanism JavaScript uses to track function calls — and how it relates to execution contexts from Day 78.

## Prerequisites

- Day 78 (execution context)

## Explanation

The **call stack** is how JavaScript keeps track of "where it currently is" as functions call other functions. Every time a function is called, its execution context is **pushed** onto the top of the call stack. When that function finishes (returns), its context is **popped** off the stack, and execution resumes wherever it left off in the function below it. This "stack" behavior — last in, first out — is why deeply nested function calls unwind in a predictable order.

If functions keep calling other functions without ever finishing (like uncontrolled recursion), the call stack keeps growing until it runs out of space — causing a **stack overflow** error.

## Topic by Topic

### Topic 1: How the call stack works

Theory:
Each function call pushes a new context onto the stack; each function return pops its context off, resuming the caller right where it left off.

Code Example:

```js
function third() {
  console.log("Inside third");
}
function second() {
  third();
  console.log("Back in second");
}
function first() {
  second();
  console.log("Back in first");
}

first();
// Call stack grows: first -> second -> third
// Then unwinds: third finishes -> second finishes -> first finishes
```

**Explanation:** `first()` calls `second()`, which calls `third()` — the stack grows with each call; as each function finishes, it's popped off, and execution resumes in the function that called it.

**Key Points:**

- The call stack tracks the current chain of "who called whom."
- Functions are pushed on call, popped on return — last in, first out (LIFO).
- This is exactly why "Back in second" prints AFTER "Inside third" — execution resumes in `second` only once `third` finishes.

### Topic 2: Reading a call stack (as seen in DevTools errors)

Theory:
When an error occurs, the "stack trace" shown in error messages/DevTools reflects exactly the call stack at that moment — the chain of function calls that led to the error.

Code Example:

```js
function processOrder() {
  validateOrder();
}
function validateOrder() {
  throw new Error("Invalid order!");
}

processOrder();
// Error stack trace shows: validateOrder -> processOrder -> (global)
// reading the chain of calls that led to the error, most recent call first
```

**Explanation:** The stack trace lists the call chain from where the error actually happened, back through everything that led to it — extremely useful for tracing exactly how your program reached a bug.

**Key Points:**

- Stack traces in error messages directly reflect the call stack at the moment of the error.
- Reading a stack trace top-to-bottom shows you the most recent call first, tracing backward to how it was reached.
- This is one of the most practically useful debugging tools you'll use constantly in real development.

### Topic 3: Stack overflow

Theory:
If a function keeps calling itself (or other functions) without ever returning, the call stack keeps growing until it exceeds its size limit, causing a "stack overflow" error.

Code Example:

```js
function infiniteRecursion() {
  return infiniteRecursion(); // never actually returns/stops - stack keeps growing
}

// infiniteRecursion(); // "RangeError: Maximum call stack size exceeded"
```

**Explanation:** Each call to `infiniteRecursion()` pushes ANOTHER context onto the stack before the previous one ever finishes — eventually, there's no more room, and JavaScript throws a stack overflow error.

**Key Points:**

- Uncontrolled recursion (no base case, or a base case that's never actually reached) causes stack overflow.
- The call stack has a finite size — it cannot grow indefinitely.
- Always ensure recursive functions have a clear, reachable base case that stops the recursion.

### Topic 4: The call stack and asynchronous code

Theory:
Asynchronous callbacks (from `setTimeout`, promises, etc.) are NOT placed on the call stack immediately — they wait separately until the call stack is completely empty, which is exactly what the event loop (Day 81) manages.

Practical:
This is the crucial link to understanding asynchronous JavaScript fully: the call stack only handles SYNCHRONOUS execution directly — asynchronous callbacks wait their turn elsewhere, and only join the call stack once it's clear.

**Key Points:**

- The call stack only directly executes synchronous code.
- Asynchronous callbacks wait in separate queues (covered on Day 80-81) until the call stack is empty.
- Understanding the call stack is essential preparation for fully understanding the event loop tomorrow-after-next.

## Recap

- The call stack tracks function calls using a last-in-first-out (LIFO) structure — pushed on call, popped on return.
- Stack traces in errors directly reflect the call stack at the moment of the error.
- Uncontrolled recursion causes stack overflow; asynchronous callbacks wait separately until the call stack is empty.

## What's Next

Practice for today: `public/coding/JavaScript/day-079-callback-hell.md`. Day 80 covers the JavaScript runtime — engine, Web APIs, and callback queue.
