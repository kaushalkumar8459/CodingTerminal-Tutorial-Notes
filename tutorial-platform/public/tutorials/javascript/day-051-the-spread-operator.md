---
title: The Spread Operator
slug: day-051-the-spread-operator
dayLabel: Day 51
level: Intermediate
estimatedMinutes: 25
order: 51
track: javascript
---

# Day 51 [Intermediate]: The Spread Operator

## Goal

Master the spread operator (`...`) for copying and merging arrays and objects — building on the preview from Day 43.

## Prerequisites

- Day 43 (spread/rest preview), Day 50 (reference vs value)

## Explanation

The spread operator (`...`) "expands" an array or object's contents into individual elements/properties. It's the modern, standard way to copy arrays/objects, merge multiple arrays/objects together, and pass array elements as individual function arguments. Since spread creates a new top-level array/object, it avoids the reference-sharing pitfalls from Day 50 — but only for the **top level**; nested objects/arrays inside are still shared (the shallow-copy limitation from Day 44).

## Topic by Topic

### Topic 1: Spreading arrays

Theory:
`[...array]` expands an array's elements into a new array literal — useful for copying and merging.

Code Example:

```js
const original = [1, 2, 3];
const copy = [...original]; // independent copy
const extended = [...original, 4, 5]; // copy + extra elements

console.log(copy); // [1, 2, 3]
console.log(extended); // [1, 2, 3, 4, 5]
```

**Explanation:** `[...original]` creates a brand-new array containing the same elements — unlike `const copy = original`, this one is genuinely independent at the top level.

**Key Points:**

- `[...array]` is the standard way to shallow-copy an array.
- You can mix spread with additional new elements in the same array literal.
- This avoids the Day 50 reference-sharing problem, at least for the top-level array structure.

### Topic 2: Merging arrays with spread

Theory:
Multiple arrays can be combined into one new array by spreading each of them into a single array literal.

Code Example:

```js
const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];

const groceries = [...fruits, ...veggies];
console.log(groceries); // ["apple", "banana", "carrot", "potato"]
```

**Explanation:** Both arrays are expanded into the new array literal in order — a cleaner, more modern alternative to `.concat()` from Day 35.

**Key Points:**

- Spread is now the more common way to merge arrays, compared to `.concat()`.
- Order in the array literal controls the order of the merged result.
- Combine spread with individual extra values freely: `[...a, "extra", ...b]`.

### Topic 3: Spreading objects

Theory:
`{...object}` expands an object's properties into a new object literal — the object equivalent of array spread.

Code Example:

```js
const baseSettings = { theme: "dark", fontSize: 14 };
const userOverrides = { fontSize: 18 };

const finalSettings = { ...baseSettings, ...userOverrides };
console.log(finalSettings); // { theme: "dark", fontSize: 18 }
```

**Explanation:** Properties from later spreads override matching properties from earlier ones — `fontSize` ends up `18` because `userOverrides` was spread last.

**Key Points:**

- `{...object}` is the standard, modern way to shallow-copy or merge objects.
- Later spreads override earlier ones for matching keys — order matters.
- This replaces most everyday uses of `Object.assign()` from Day 43.

### Topic 4: Spread for function arguments

Theory:
Spread can also "unpack" an array into individual arguments when calling a function — useful for functions like `Math.max()` that don't accept arrays directly.

Code Example:

```js
const numbers = [4, 9, 2, 7];

console.log(Math.max(...numbers)); // 9 - array unpacked into individual arguments

function introduce(name, age, city) {
  console.log(`${name}, ${age}, from ${city}`);
}
const details = ["Nina", 27, "Goa"];
introduce(...details);
```

**Explanation:** `Math.max(...numbers)` is equivalent to writing `Math.max(4, 9, 2, 7)` directly — spread performs that unpacking automatically from the array.

**Key Points:**

- Spread in a function call unpacks an array into separate positional arguments.
- Solves the exact problem from Day 31 where `Math.max()` couldn't accept an array directly.
- This is functionally the "opposite direction" of rest parameters (Day 52), which collect arguments INTO an array.

## Recap

- `[...array]`/`{...object}` create shallow copies and merges — the modern standard over `.concat()`/`Object.assign()`.
- Later spreads override earlier ones for matching object keys.
- Spread also unpacks an array into individual function arguments when calling a function.

## What's Next

Practice for today: `public/coding/JavaScript/day-051-higher-order-functions.md`. Day 52 covers the rest operator — the counterpart to spread.
