---
title: Execution Context
slug: day-078-execution-context
dayLabel: Day 78
level: Advanced
estimatedMinutes: 25
order: 78
track: javascript
---

# Day 78 [Advanced]: Execution Context

## Goal

Understand execution contexts — the environments JavaScript creates to run your code — and their two-phase process (creation and execution).

## Prerequisites

- Day 48–49 (scope, hoisting)

## Explanation

An **execution context** is the environment JavaScript sets up to run a piece of code — it contains information about variables, function declarations, and what `this` refers to in that context. There's always one **global execution context** (for top-level code), and a NEW **function execution context** is created every single time a function is called.

Each execution context goes through two phases: the **creation phase** (where JavaScript scans the code, hoists variable/function declarations, and sets up `this`) and the **execution phase** (where code actually runs line by line). This two-phase process is exactly WHY hoisting (Day 49) behaves the way it does — hoisting happens during the creation phase, before any code actually executes.

## Topic by Topic

### Topic 1: The global execution context

Theory:
When a JavaScript program starts, it creates one global execution context for all top-level code (code not inside any function).

Code Example:

```js
// This is all part of the GLOBAL execution context
const appName = "MyApp";

function greet() {
  console.log(`Welcome to ${appName}`);
}

greet();
```

**Explanation:** `appName` and `greet` are both set up as part of the single global execution context — they exist for the entire lifetime of the program (or until the page/process ends).

**Key Points:**

- There is exactly ONE global execution context per program.
- It holds all top-level variables and function declarations.
- It's created first, before any function is called.

### Topic 2: Function execution contexts

Theory:
Every time a function is CALLED (not just defined), a brand-new function execution context is created specifically for that call.

Code Example:

```js
function add(a, b) {
  const result = a + b; // "result" belongs to THIS specific execution context
  return result;
}

add(2, 3); // creates execution context #1 - then destroys it once add() returns
add(10, 20); // creates a completely separate execution context #2
```

**Explanation:** Each call to `add()` gets its OWN fresh execution context — the `result` variable from the first call has no relationship to the `result` variable from the second call; they're entirely separate.

**Key Points:**

- A new function execution context is created on EVERY function call, even for the same function.
- Once a function finishes running, its execution context is normally discarded (unless a closure keeps part of it alive, from Day 57).
- This is exactly why each call to `createCounter()` (Day 53/57) produced an independent counter.

### Topic 3: The creation phase

Theory:
Before any code in a context actually runs, JavaScript first scans through it, setting up: `this`, hoisted `var` variables (initialized to `undefined`), hoisted function declarations (fully available), and `let`/`const` (registered but left in the Temporal Dead Zone).

Code Example:

```js
function example() {
  console.log(hoistedVar); // undefined - set up during creation phase
  console.log(typeof hoistedFunc); // "function" - fully hoisted

  var hoistedVar = "value";
  function hoistedFunc() {}
}
```

**Explanation:** Before `example()`'s code actually starts executing line by line, JavaScript already set up `hoistedVar` (as `undefined`) and `hoistedFunc` (fully) — this is exactly the hoisting behavior from Day 49, now explained as part of the creation phase.

**Key Points:**

- The creation phase happens BEFORE any code in that context actually executes.
- This phase is precisely responsible for the hoisting behavior seen on Day 49.
- Understanding this two-phase model explains hoisting mechanically, rather than as an isolated rule to memorize.

### Topic 4: The execution phase

Theory:
After the creation phase finishes setting everything up, the execution phase runs the code line by line, assigning values to variables and executing statements in order.

Code Example:

```js
function calculateTotal(price, tax) {
  // Execution phase begins here, running top to bottom:
  const total = price + tax;
  return total;
}
```

**Explanation:** The execution phase is what you've been thinking of as "running the code" all along — it happens strictly AFTER the creation phase has already set up the context's variables and functions.

**Key Points:**

- The execution phase is the familiar "run code top to bottom" behavior.
- It always happens after the creation phase for that same context has completed.
- Together, creation + execution phases make up one complete execution context's lifecycle.

## Recap

- An execution context is the environment JavaScript sets up to run a block of code — one global context, plus one new context per function call.
- The creation phase hoists declarations and sets up `this`, BEFORE any code executes.
- The execution phase then runs the code line by line — this two-phase model is exactly why hoisting behaves the way it does.

## What's Next

Practice for today: `public/coding/JavaScript/day-078-callback-async.md`. Day 79 covers the call stack in depth.
