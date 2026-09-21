---
title: The map Method
slug: day-037-the-map-method
dayLabel: Day 37
level: Beginner
estimatedMinutes: 25
order: 37
track: javascript
---

# Day 37 [Beginner]: The `map()` Method

## Goal

Master `.map()` — the standard tool for transforming every item in an array into something new, without touching the original array.

## Prerequisites

- Day 34–36 (array modification, forEach, callbacks)

## Explanation

`.map()` creates a **brand-new array** by running a callback function on every item of the original array and collecting each result. Unlike `.forEach()` (which just runs code per item and returns `undefined`), `.map()`'s entire purpose is to **produce a new, transformed array** — one output value for every input value, always the same length as the original.

`.map()` is one of the most-used methods in real JavaScript applications, especially for reshaping data — like converting raw API data into exactly the shape your program needs.

## Topic by Topic

### Topic 1: Basic transformation with `.map()`

Theory:
`.map(callback)` runs `callback` on every item and collects the returned values into a new array.

Code Example:

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((n) => n * 2);

console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] - unchanged
```

**Explanation:** For each number, the callback returns double its value; `.map()` collects all those results into `doubled`, leaving `numbers` completely untouched.

**Key Points:**

- `.map()` always returns a new array of the same length as the original.
- The original array is never mutated.
- Whatever your callback `return`s becomes that position's value in the new array.

### Topic 2: Mapping objects to extract or reshape data

Theory:
`.map()` is especially powerful with arrays of objects — extracting one field, or reshaping each object into a new structure.

Code Example:

```js
const users = [
  { name: "Asha", age: 25 },
  { name: "Ravi", age: 30 },
];

const names = users.map((user) => user.name);
console.log(names); // ["Asha", "Ravi"]

const summaries = users.map((user) => `${user.name} (${user.age})`);
console.log(summaries); // ["Asha (25)", "Ravi (30)"]
```

**Explanation:** The first `.map()` extracts just names; the second builds a new formatted string per user — both are common real-world uses of `.map()`.

**Key Points:**

- `.map()` is the standard way to extract a single field from an array of objects.
- Combine `.map()` with template literals to build formatted display strings.
- This pattern is used constantly when preparing data to display in a UI.

### Topic 3: Reshaping API-style data

Theory:
Real APIs often return data in a shape that doesn't exactly match what your program needs — `.map()` lets you transform it into your preferred shape.

Code Example:

```js
const apiProducts = [
  { id: 1, product_name: "Laptop", cost_usd: 999 },
  { id: 2, product_name: "Mouse", cost_usd: 25 },
];

const cleanProducts = apiProducts.map((item) => ({
  id: item.id,
  name: item.product_name,
  price: item.cost_usd,
}));

console.log(cleanProducts);
// [{id:1, name:"Laptop", price:999}, {id:2, name:"Mouse", price:25}]
```

**Explanation:** The callback returns a brand-new object with cleaner property names — note the parentheses around `({...})`, needed for implicit-return arrow functions producing object literals (from Day 12).

**Key Points:**

- `.map()` is the standard tool for adapting external/API data into your app's preferred shape.
- Remember: `() => ({ })` (with parentheses) when implicitly returning an object literal.
- This reshaping pattern will reappear constantly once we reach Fetch API and real data in Module 6.

### Topic 4: `.map()` vs `.forEach()` — choosing correctly

Theory:
Use `.map()` when you need a new array of transformed values. Use `.forEach()` when you just need to perform an action per item, without needing the results collected.

Code Example:

```js
// Correct: map when building a new array
const prices = [100, 200, 300];
const withTax = prices.map((p) => p * 1.18);

// Correct: forEach when just performing an action
prices.forEach((p) => console.log(`Price: ${p}`));

// Incorrect: using forEach's return value (always undefined!)
// const wrong = prices.forEach((p) => p * 1.18); // wrong is undefined
```

**Explanation:** The commented-out line shows a common beginner mistake — expecting `.forEach()` to produce a usable array like `.map()` does, when it actually always returns `undefined`.

**Key Points:**

- Need a new array back? Use `.map()`.
- Just need to run an action per item, no array needed back? Use `.forEach()`.
- Using `.forEach()`'s return value directly is a common and confusing bug — watch for it.

## Recap

- `.map()` transforms every item into something new, returning a brand-new array of the same length.
- `.map()` is ideal for extracting fields, formatting data, and reshaping API-style objects.
- Choose `.map()` when you need a new array back; choose `.forEach()` for simple per-item actions.

## What's Next

Practice for today: `public/coding/JavaScript/day-037-reduce.md`. Day 38 covers `.filter()` in depth.
