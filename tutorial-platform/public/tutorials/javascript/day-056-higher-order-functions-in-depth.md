---
title: Higher-Order Functions In Depth
slug: day-056-higher-order-functions-in-depth
dayLabel: Day 56
level: Intermediate
estimatedMinutes: 25
order: 56
track: javascript
---

# Day 56 [Intermediate]: Higher-Order Functions In Depth

## Goal

Formally understand higher-order functions — functions that accept other functions as arguments, or return functions — and see why they're such a powerful pattern.

## Prerequisites

- Day 51 (custom map/filter/reduce), Day 52/55 (callbacks)

## Explanation

A **higher-order function** is simply a function that does at least one of the following: (1) accepts another function as an argument, or (2) returns a function as its result. You've already been using and building higher-order functions constantly — `.map()`, `.filter()`, `.reduce()` all accept callback functions; `createCounter()` and other closures from Day 53 all _return_ functions.

Understanding this pattern explicitly helps you recognize it everywhere, and write your own reusable, flexible functions that adapt their behavior based on what function they're given.

## Topic by Topic

### Topic 1: Functions that accept other functions

Theory:
A function that takes another function as a parameter can delegate part of its behavior to whatever function is passed in — making it flexible and reusable.

Code Example:

```js
function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

repeat(3, (i) => console.log(`Iteration ${i}`));
```

**Explanation:** `repeat` doesn't know or care what `action` actually does — it just calls it the right number of times, letting the caller decide the actual behavior.

**Key Points:**

- Accepting a function as a parameter lets the caller customize behavior without changing the higher-order function itself.
- `.map()`, `.filter()`, `.reduce()`, `.forEach()` are all real-world examples of this pattern.
- This is the foundation of flexible, reusable utility functions.

### Topic 2: Functions that return functions

Theory:
A function can also return a new function — often one that's been customized based on the arguments it received, using closures.

Code Example:

```js
function multiplyBy(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Explanation:** `multiplyBy(2)` returns a new function that "remembers" `factor = 2` via closure — each call to `multiplyBy` produces its own independent, customized function.

**Key Points:**

- Functions returning functions rely on closures to "remember" the values used to customize them.
- This lets you create families of related, specialized functions from one general "factory."
- `createCounter()`, `once()`, and `memoize()` from earlier days are all real examples of this pattern.

### Topic 3: Combining both directions

Theory:
Some higher-order functions both accept a function AND return a function — a very powerful, flexible combination.

Code Example:

```js
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling function with arguments: ${args.join(", ")}`);
    const result = fn(...args);
    console.log(`Result: ${result}`);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);

loggedAdd(3, 4);
// Calling function with arguments: 3, 4
// Result: 7
```

**Explanation:** `withLogging` takes a function (`add`) and returns a NEW function that wraps it with extra logging behavior — the original `add` function is completely unchanged, but its behavior is enhanced when called through `loggedAdd`.

**Key Points:**

- This "wrapping" pattern (accept a function, return an enhanced version) is very common in real applications.
- The original function remains reusable and unmodified — only the new wrapped version has the extra behavior.
- This exact pattern is the foundation for many real-world tools (logging, timing, caching wrappers).

### Topic 4: Why higher-order functions matter

Theory:
Higher-order functions let you separate "what varies" (the specific behavior) from "what stays the same" (the surrounding logic, like looping or timing), leading to more reusable, composable code.

Practical:
Whenever you notice yourself writing very similar functions with just one small piece of logic different, consider whether a higher-order function (accepting that piece as a parameter) could combine them into one flexible function instead.

**Key Points:**

- Higher-order functions reduce duplication by extracting the "varying part" into a parameter.
- Array methods, closures-based factories, and function-wrapping utilities are all real applications of this idea.
- This pattern becomes even more valuable once you reach functional programming practice on Day 62.

## Recap

- A higher-order function accepts a function as an argument, returns a function, or both.
- Accepting functions enables flexible, customizable behavior (like array methods).
- Returning functions (using closures) enables specialized, "remembered" behavior (like factories and wrappers).

## What's Next

Practice for today: `public/coding/JavaScript/day-056-call-apply-bind.md`. Day 57 covers closures in full theoretical depth.
