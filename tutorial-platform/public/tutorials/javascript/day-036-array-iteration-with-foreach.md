---
title: Array Iteration with forEach
slug: day-036-array-iteration-with-foreach
dayLabel: Day 36
level: Beginner
estimatedMinutes: 25
order: 36
track: javascript
---

# Day 36 [Beginner]: Array Iteration with `forEach()`

## Goal

Deeply understand `.forEach()` — how it works, what a callback function is, and when it's the right tool compared to a regular loop.

## Prerequisites

- Day 33–35 (arrays, search/extraction)
- Day 10–12 (functions, arrow functions)

## Explanation

`.forEach()` runs a given function once for every item in an array — it's a cleaner, more declarative alternative to a manual `for` loop when you just want to "do something" with each item. The function you pass into `.forEach()` (or `.map()`, `.filter()`, etc.) is called a **callback function** — a function passed as an argument, to be called later by the method itself.

`.forEach()`'s callback automatically receives up to three arguments: the current **item**, its **index**, and the **entire array** — though most of the time you'll only need the first one or two.

## Topic by Topic

### Topic 1: Basic `.forEach()` usage

Theory:
`.forEach(callback)` calls `callback` once per array item, automatically passing that item in.

Code Example:

```js
const fruits = ["apple", "banana", "cherry"];

fruits.forEach(function (fruit) {
  console.log(fruit);
});
// apple, banana, cherry
```

**Explanation:** `.forEach()` handles the looping internally — you only need to describe what should happen for each single item.

**Key Points:**

- `.forEach()` runs its callback once per array element.
- You never write the loop counter or condition yourself — `.forEach()` manages that.
- `.forEach()` always returns `undefined` — it's meant for actions, not building new data.

### Topic 2: Understanding callback functions

Theory:
A callback function is simply a function you hand to another function or method, to be called later — `.forEach()` is one of the most common places you'll see this pattern.

Code Example:

```js
function printItem(item) {
  console.log("Item:", item);
}

const numbers = [1, 2, 3];
numbers.forEach(printItem); // pass the function itself, don't call it here
```

**Explanation:** `printItem` is passed by name (no parentheses) — `.forEach()` itself calls `printItem(item)` internally for each array element.

**Key Points:**

- A callback is a function passed as an argument to be called later by something else.
- Pass the function itself (`printItem`), not the result of calling it (`printItem()`).
- Arrow functions are commonly used inline for short callbacks: `arr.forEach((item) => console.log(item))`.

### Topic 3: Using index and the full array in the callback

Theory:
`.forEach()`'s callback can optionally accept a second parameter (the index) and a third (the full array being iterated).

Code Example:

```js
const scores = [70, 85, 90];

scores.forEach(function (score, index, array) {
  console.log(`Score ${index + 1} of ${array.length}: ${score}`);
});
// Score 1 of 3: 70
// Score 2 of 3: 85
// Score 3 of 3: 90
```

**Explanation:** The second parameter (`index`) gives the position within the array; the third (`array`) is the entire array itself — both are optional but sometimes useful.

**Key Points:**

- Callback signature: `(item, index, array) => { ... }`.
- Most of the time you'll only need `item`, occasionally `index`, and rarely the full `array`.
- This same three-parameter pattern also appears in `map`, `filter`, and other array methods.

### Topic 4: `.forEach()` vs a regular `for` loop

Theory:
`.forEach()` is more declarative (describes _what_ to do) versus a `for` loop being more manual (describes _how_ to loop). But `.forEach()` has limitations: you can't `break`/`continue`, and it always returns `undefined`.

Code Example:

```js
// forEach - clean, but can't break early
[1, 2, 3, 4, 5].forEach((n) => {
  if (n === 3) return; // this only skips THIS iteration, doesn't break the loop!
  console.log(n);
});

// regular for - CAN break early
for (let n of [1, 2, 3, 4, 5]) {
  if (n === 3) break; // this actually stops the whole loop
  console.log(n);
}
```

**Explanation:** `return` inside a `.forEach()` callback only exits that one callback call (similar to `continue`) — it can never stop the whole `.forEach()` the way `break` stops a regular loop.

**Key Points:**

- `.forEach()` cannot be stopped early with `break` — a `return` inside only skips the current item.
- Use a regular loop (or `.some()`/`.every()`, Day 40) if you need early exit.
- `.forEach()` is best for simple "do this for every item" tasks with no early exit needed.

## Recap

- `.forEach()` runs a callback function once per array item, handling the looping for you.
- A callback is a function passed to be called later — the core idea behind most array methods.
- `.forEach()` can't `break` early and always returns `undefined` — know its limits.

## What's Next

Practice for today: `public/coding/JavaScript/day-036-filter.md`. Day 37 covers `.map()` in depth — transforming arrays into new arrays.
