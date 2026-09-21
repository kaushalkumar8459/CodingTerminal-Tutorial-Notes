---
title: The JavaScript Runtime
slug: day-080-the-javascript-runtime
dayLabel: Day 80
level: Advanced
estimatedMinutes: 25
order: 80
track: javascript
---

# Day 80 [Advanced]: The JavaScript Runtime

## Goal

Understand the full JavaScript runtime environment — the engine, Web APIs, and callback queue — as the missing pieces needed to fully explain the event loop tomorrow.

## Prerequisites

- Day 78 (execution context), Day 79 (call stack)

## Explanation

The **JavaScript engine** (like V8 in Chrome/Node.js) is the part that actually reads and executes your JavaScript code, managing the call stack and execution contexts. But the engine alone can't do things like wait for timers or make network requests — those capabilities come from **Web APIs** (in browsers) or similar APIs (in Node.js), provided by the surrounding environment, NOT by JavaScript itself.

When an asynchronous operation (like a `setTimeout` timer) finishes, its callback doesn't go straight to the call stack — it's placed in a **callback queue** (also called a task queue), waiting for its turn. This is the last missing piece before the event loop (Day 81) can be fully explained: it's the mechanism that moves callbacks from the queue onto the call stack, but only when the stack is empty.

## Topic by Topic

### Topic 1: The JavaScript engine

Theory:
The engine (V8, SpiderMonkey, etc. — first introduced on Day 1) is responsible for parsing and executing your JavaScript code, managing the call stack and execution contexts directly.

Code Example:

```js
// The ENGINE directly executes this synchronous code, managing the call stack:
function add(a, b) {
  return a + b;
}
console.log(add(2, 3));
```

**Explanation:** Everything synchronous you've learned so far — variables, functions, the call stack — is managed entirely by the engine itself, with no help needed from the surrounding environment.

**Key Points:**

- The engine executes JavaScript code directly, managing execution contexts and the call stack.
- The engine alone has no concept of timers, network requests, or DOM events — those require help from outside.
- V8 (Chrome, Node.js), SpiderMonkey (Firefox), and JavaScriptCore (Safari) are the major engines.

### Topic 2: Web APIs — capabilities beyond the engine

Theory:
Browsers (and Node.js, with its own equivalent APIs) provide additional capabilities that JavaScript alone doesn't have — like `setTimeout`, `fetch`, and DOM event listeners — collectively called Web APIs.

Code Example:

```js
setTimeout(() => {
  console.log("This callback is scheduled by a Web API, not the engine itself");
}, 1000);
```

**Explanation:** `setTimeout` isn't actually part of the JavaScript language itself — it's a Web API provided by the browser (or a similar API in Node.js), which handles the actual timing/waiting OUTSIDE of the engine's single-threaded execution.

**Key Points:**

- `setTimeout`, `fetch`, DOM event listeners, and similar features are Web APIs, not core JavaScript language features.
- Web APIs run their waiting/background work OUTSIDE the engine's single thread, without blocking it.
- This is exactly why asynchronous operations don't freeze the rest of your program.

### Topic 3: The callback queue

Theory:
Once a Web API operation completes (a timer finishes, data arrives), its associated callback function is placed into the **callback queue**, waiting for its turn to actually run.

Code Example:

```js
console.log("1");
setTimeout(() => console.log("2 - queued, runs later"), 0);
console.log("3");

// Output order: 1, 3, 2 - even with a 0ms delay!
```

**Explanation:** Even with a `0` millisecond delay, the `setTimeout` callback doesn't run immediately — it's placed in the callback queue, and only runs after ALL currently running synchronous code (`console.log("3")`) has finished.

**Key Points:**

- Completed async operations place their callbacks in the callback queue, not directly on the call stack.
- Queued callbacks wait their turn — they never interrupt currently-running synchronous code.
- This explains the surprising `setTimeout(fn, 0)` behavior — "0ms" doesn't mean "immediately," it means "as soon as possible after current code finishes."

### Topic 4: Putting the pieces together

Theory:
The full picture: the engine runs your synchronous code on the call stack; Web APIs handle background async operations; completed callbacks wait in the callback queue — and something needs to connect the queue back to the (now-empty) call stack. That "something" is the event loop, covered fully tomorrow.

Practical:
Try predicting the exact output order of a small program mixing `console.log()`, `setTimeout()`, and a slow synchronous loop — then verify your prediction. This kind of exercise is exactly what Day 81's event loop challenges will focus on.

**Key Points:**

- Engine (executes code) + Web APIs (handle background operations) + callback queue (holds completed callbacks) are the three pieces covered so far.
- The event loop (Day 81) is the missing piece that connects the callback queue back to the call stack.
- Understanding all three pieces together is essential before the event loop will make full sense.

## Recap

- The JavaScript engine executes code and manages the call stack; Web APIs provide background capabilities like timers and network requests.
- Completed async operations place their callbacks in the callback queue, waiting for their turn.
- The event loop (tomorrow) is the mechanism that moves queued callbacks onto the call stack once it's empty.

## What's Next

Practice for today: `public/coding/JavaScript/day-080-promise-basics.md`. Day 81 covers the event loop — the final piece connecting everything together.
