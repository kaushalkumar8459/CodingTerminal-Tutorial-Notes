---
title: Closures In Depth
slug: day-057-closures-in-depth
dayLabel: Day 57
level: Intermediate
estimatedMinutes: 30
order: 57
track: javascript
---

# Day 57 [Intermediate]: Closures In Depth

## Goal

Fully understand what a closure is, why it works (based on lexical scope from Day 48), and how it enables data privacy — connecting the dots from your Day 53/54 practice.

## Prerequisites

- Day 48 (scope, lexical scope), Day 53–54 (closure practice)

## Explanation

A **closure** is created every single time a function is defined — it's simply the function "bundled together" with references to the variables from its surrounding (lexical) scope, at the moment it was created. Because of lexical scope (Day 48), an inner function can always access variables from its outer function — and crucially, it keeps that access **even after the outer function has finished running**. This is exactly why your Day 53 `createCounter()` and `createBankAccount()` examples worked — the returned inner function "remembers" its outer variables permanently.

Closures enable **data privacy**: variables inside the outer function are never directly accessible from outside — only through whatever functions the closure exposes (like `.deposit()`/`.getBalance()`).

## Topic by Topic

### Topic 1: What a closure actually is

Theory:
A closure is the combination of a function and the lexical environment (surrounding variables) it was created within — this pairing persists for as long as the function itself exists.

Code Example:

```js
function outer() {
  let count = 0; // this variable is part of the closure

  function inner() {
    count++;
    return count;
  }

  return inner;
}

const counter = outer(); // outer() has already finished running!
console.log(counter()); // 1
console.log(counter()); // 2 - "count" is still remembered!
```

**Explanation:** Even though `outer()` finished executing, `inner` (now stored in `counter`) still has access to `count` — this persistence is exactly what makes it a closure.

**Key Points:**

- A closure "remembers" the variables from where it was defined, not where it's called.
- The outer function doesn't need to still be running — the closure keeps the reference alive.
- This is possible because of lexical scope (Day 48) combined with functions being values that can be returned and stored.

### Topic 2: Each closure gets its own independent scope

Theory:
Every time the outer function runs, it creates a brand-new, separate scope — so multiple closures created from the same outer function never share their variables.

Code Example:

```js
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

console.log(counterA()); // 1
console.log(counterA()); // 2
console.log(counterB()); // 1 - completely independent from counterA!
```

**Explanation:** `counterA` and `counterB` are two separate calls to `createCounter()`, each creating its own independent `count` variable — this is exactly why your Day 53 counters didn't interfere with each other.

**Key Points:**

- Every call to the outer function creates a fresh, independent closure scope.
- Multiple closures from the same "factory" function never share state unless you deliberately design them to.
- This is the mechanism behind creating multiple independent instances (counters, trackers, etc.).

### Topic 3: Closures for data privacy

Theory:
Since a closure's outer variables are never directly accessible from outside, only through whatever functions are exposed, closures naturally enable "private" data.

Code Example:

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance; // truly private - no direct outside access

  return {
    deposit(amount) {
      balance += amount;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.balance); // undefined - no direct access at all
```

**Explanation:** There's no way to access `balance` directly from outside `createBankAccount` — the only way to interact with it is through the `deposit`/`getBalance` methods the closure deliberately exposes.

**Key Points:**

- Closures provide true data privacy — no direct external access to the enclosed variables at all.
- This predates and is conceptually similar to private class fields (`#field`), covered starting Day 66.
- Exposing only specific methods (not the raw variable) is a deliberate design choice, giving you full control over how the data can be changed.

### Topic 4: Real-world use cases for closures

Theory:
Beyond counters and bank accounts, closures underpin memoization (Day 54), event handler setup, module patterns, and much of how JavaScript frameworks manage internal state.

Practical:
Whenever you see a function that returns another function (or object of functions), and that returned function still uses variables from the outer scope, you're looking at a closure in action — recognizing this pattern helps you read a huge amount of real-world JavaScript.

**Key Points:**

- Closures are everywhere in real JavaScript code, not just in interview questions.
- Recognizing the "function returning function(s) that reference outer variables" shape is the key skill.
- Understanding closures deeply makes async code, React hooks, and many library patterns much easier to understand later.

## Recap

- A closure is a function bundled with the variables from its surrounding lexical scope, persisting even after the outer function finishes.
- Each call to an outer "factory" function creates an independent closure scope.
- Closures enable true data privacy by only exposing specific functions, never the raw enclosed variables.

## What's Next

Practice for today: `public/coding/JavaScript/day-057-constructor-functions.md`. Day 58 covers the `this` keyword in full depth.
