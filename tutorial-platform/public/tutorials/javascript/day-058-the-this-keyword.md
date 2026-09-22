---
title: The this Keyword
slug: day-058-the-this-keyword
dayLabel: Day 58
level: Intermediate
estimatedMinutes: 30
order: 58
track: javascript
---

# Day 58 [Intermediate]: The `this` Keyword

## Goal

Fully resolve the `this` confusion from Day 12/55 — understand exactly how `this` is determined in every common calling context.

## Prerequisites

- Day 12 (arrow function `this` preview), Day 55 (predict-the-output practice)

## Explanation

`this` refers to "the object the current code is executing in the context of" — but WHICH object that is depends entirely on **how a function was called**, not where it was defined (for regular functions). This is the single most important idea to internalize: the exact same function can have a completely different `this` depending on how you call it.

Arrow functions are the one major exception: they don't get their own `this` at all — they use `this` from their surrounding lexical scope (from Day 12), which is why they can behave very differently from regular functions as object methods.

## Topic by Topic

### Topic 1: `this` in the global context

Theory:
At the top level of a script (outside any function/object), `this` refers to the global object in non-strict mode (or `undefined` in modules/strict mode).

Code Example:

```js
console.log(this); // in a browser script: the global "window" object (non-strict, non-module)
```

**Explanation:** This case is rarely relevant in real applications (most code today runs in modules or strict mode), but it's worth knowing as the baseline.

**Key Points:**

- Global `this` behavior varies by environment (browser script, Node, module, strict mode).
- This case matters far less in practice than the other three contexts below.
- Modern code (modules, classes) typically avoids relying on global `this` entirely.

### Topic 2: `this` inside an object method

Theory:
When a regular function is called AS A METHOD (`object.method()`), `this` refers to the object before the dot — the object that "owns" the call.

Code Example:

```js
const car = {
  brand: "Honda",
  describe() {
    console.log(`This is a ${this.brand}`);
  },
};

car.describe(); // "This is a Honda" - this = car
```

**Explanation:** Because `describe` was called as `car.describe()`, `this` inside it refers to `car` — the object directly before the dot at the call site.

**Key Points:**

- `this` in a method call = the object before the dot, at the moment of calling.
- This is determined by HOW the function is called, not where it's defined.
- This is exactly why extracting a method into a standalone variable (Day 55, example #3) breaks `this`.

### Topic 3: `this` when a method is extracted or passed as a callback

Theory:
If a method is called WITHOUT an object before the dot (extracted into a variable, or passed as a bare callback), `this` loses its connection to the original object.

Code Example:

```js
const car = {
  brand: "Honda",
  describe() {
    console.log(this.brand);
  },
};

const extractedDescribe = car.describe;
extractedDescribe(); // undefined (or error in strict mode) - "this" lost its connection to "car"
```

**Explanation:** `extractedDescribe()` is called with no object before the dot at all — `this` no longer refers to `car`, exactly matching what you saw in Day 55's predict-the-output exercises.

**Key Points:**

- `this` depends entirely on the call syntax, not on where the function was originally defined or attached.
- This is a classic bug source when passing methods as callbacks (e.g. to event listeners or `setTimeout`).
- `.bind(object)` (Day 56/59) is the standard fix — permanently locking `this` to a specific object.

### Topic 4: `this` inside arrow functions

Theory:
Arrow functions never get their own `this` — they always use `this` from their surrounding lexical scope, fixed at the moment they're defined.

Code Example:

```js
const car = {
  brand: "Honda",
  describeArrow: () => {
    console.log(this.brand); // "this" here is NOT "car" - it's inherited from OUTSIDE the object
  },
  describeRegular() {
    const inner = () => {
      console.log(this.brand); // "this" here IS "car" - inherited from describeRegular's "this"
    };
    inner();
  },
};

car.describeArrow(); // undefined - arrow method doesn't get car's "this"
car.describeRegular(); // "Honda" - arrow function inside a regular method DOES inherit correctly
```

**Explanation:** `describeArrow` is an arrow function defined directly as an object property — its surrounding scope is the outer (global/module) scope, not `car`, so `this.brand` fails. `inner` inside `describeRegular` is also an arrow function, but its surrounding scope IS `describeRegular`'s `this` (which correctly refers to `car`), so it works.

**Key Points:**

- Arrow functions as direct object methods usually do NOT get the behavior you want — avoid this pattern.
- Arrow functions NESTED INSIDE a regular method are extremely useful — they correctly inherit `this` from the enclosing regular function.
- This exact "arrow function nested in a regular method" pattern is why `setInterval`/`setTimeout` callbacks inside methods (Day 12's timer example) work correctly with arrow functions.

## Recap

- `this` in a method call refers to the object before the dot, at the moment of the call — not where the function was defined.
- Extracting a method or passing it as a bare callback loses its connection to the original object.
- Arrow functions never get their own `this` — they inherit it from their surrounding lexical scope, which is why they work well nested inside regular methods, but not as direct object methods.

## What's Next

Practice for today: `public/coding/JavaScript/day-058-prototype.md`. Day 59 covers `call()`, `apply()`, and `bind()` in full depth — the tools for controlling `this` explicitly.
