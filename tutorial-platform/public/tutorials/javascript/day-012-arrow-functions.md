---
title: Arrow Functions
slug: day-012-arrow-functions
dayLabel: Day 12
level: Beginner
estimatedMinutes: 30
order: 12
track: javascript
---

# Day 12 [Beginner]: Arrow Functions

## Goal

Learn arrow function syntax in depth, compare it with regular functions, and get a first, simple look at how arrow functions treat `this` differently.

## Prerequisites

- Day 10–11 (functions, parameters, return values)

## Explanation

Arrow functions (`=>`) are a shorter way to write functions, introduced in ES6. They're especially popular for short, simple functions — like the ones you pass into array methods (`map`, `filter`, etc., covered starting Module 3).

Arrow functions support **implicit return**: if the function body is a single expression, you can skip both the curly braces `{ }` and the `return` keyword — the expression's value is automatically returned.

The most important technical difference between arrow functions and regular functions is how they handle `this` (a keyword covered fully on Day 58). For now, just know: **arrow functions don't create their own `this`** — they use whatever `this` was already in their surrounding scope. This matters more once you start writing object methods and event handlers.

## Topic by Topic

### Topic 1: Arrow function syntax

Theory:
Arrow function syntax replaces the `function` keyword with `=>` placed after the parameter list.

Practical:
Use parentheses around parameters when there's more than one (or zero); a single parameter can optionally skip the parentheses.

Code Example:

```js
// Regular function
function add(a, b) {
  return a + b;
}

// Arrow function - equivalent
const addArrow = (a, b) => {
  return a + b;
};
```

**Explanation:** Both do exactly the same thing, but the arrow version is more compact. The `{ return ... }` block body works just like a regular function's body.

**Key Points:**

- Arrow syntax: `(params) => { ...body... }`.
- Multiple parameters need parentheses: `(a, b) => ...`.
- A single parameter can drop the parentheses: `a => ...`.

### Topic 2: Implicit return

Theory:
When an arrow function's entire body is one expression, you can drop the `{ }` and `return` — the expression's result becomes the return value automatically.

Practical:
Implicit return keeps very short functions extremely concise, which is especially handy when passing quick functions into `map`/`filter`/`reduce` later.

Code Example:

```js
const square = (n) => n * n; // implicit return
const greet = (name) => "Hi " + name; // implicit return

console.log(square(5)); // 25
console.log(greet("Ana")); // Hi Ana
```

**Explanation:** There's no `{ }` or `return` keyword here — because the body is a single expression, JavaScript automatically returns its value.

**Key Points:**

- Implicit return only works for a single-expression body.
- The moment your function needs more than one statement, you must use `{ }` with an explicit `return`.
- To implicitly return an object literal, wrap it in parentheses: `() => ({ id: 1 })`.

### Topic 3: Arrow functions vs regular functions

Theory:
Beyond syntax, arrow functions differ from regular functions in a few technical ways — most notably, they don't get their own `this`, and they can't be used as constructors (with `new`).

Practical:
For simple, standalone calculations, either style works fine. For object methods (where `this` needs to refer to the object itself), regular functions are usually the safer, more predictable choice for now.

Code Example:

```js
const counter = {
  count: 0,
  incrementRegular: function () {
    this.count++; // "this" refers to counter - works as expected
  },
  incrementArrow: () => {
    this.count++; // "this" does NOT refer to counter here - unexpected!
  },
};

counter.incrementRegular();
console.log(counter.count); // 1
```

**Explanation:** `incrementRegular` correctly updates `counter.count` because a regular function's `this` is determined by how it's called (as `counter.incrementRegular()`). `incrementArrow`'s `this` comes from its surrounding scope instead — not from `counter` — so it doesn't behave as expected here.

**Key Points:**

- Regular functions get their own `this`, based on how they're called.
- Arrow functions inherit `this` from their surrounding (lexical) scope — they don't get their own.
- Avoid arrow functions for object methods until you're comfortable with how `this` works (Day 58).

### Topic 4: Introduction to lexical `this`

Theory:
"Lexical `this`" means an arrow function simply looks outward to whatever scope it was written inside, and uses that scope's `this` — it never creates a new one of its own.

Practical:
This actually makes arrow functions very useful **inside** other functions/methods, where you want `this` to stay the same as the outer context (a pattern you'll use a lot from Module 4 onward).

Code Example:

```js
const timer = {
  seconds: 0,
  start: function () {
    setInterval(() => {
      this.seconds++; // arrow function inherits "this" from start()
      console.log(this.seconds);
    }, 1000);
  },
};
```

**Explanation:** Here, the arrow function inside `setInterval` correctly uses `this` from `start()` (referring to `timer`), instead of creating its own confusing `this`. This is one of the most common and useful real-world patterns for arrow functions.

**Key Points:**

- "Lexical `this`" = arrow functions borrow `this` from where they're written, not from how they're called.
- This makes arrow functions great for callbacks nested inside methods.
- We'll revisit this in much more depth once `this` itself is covered fully on Day 58.

## Recap

- Arrow functions (`=>`) are a shorter syntax, with optional implicit return for single expressions.
- Regular functions get their own `this` based on how they're called; arrow functions inherit `this` from their surrounding scope.
- For now: prefer regular functions for object methods, arrow functions for short standalone logic and callbacks.

## What's Next

Practice for today: `public/coding/JavaScript/day-012-truthy-falsy.md`. Day 13 moves into browser JavaScript — events and event handlers.
