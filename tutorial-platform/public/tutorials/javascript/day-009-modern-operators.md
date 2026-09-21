---
title: Modern Operators - Ternary, Nullish Coalescing and Optional Chaining
slug: day-009-modern-operators
dayLabel: Day 9
level: Beginner
estimatedMinutes: 25
order: 9
track: javascript
---

# Day 9 [Beginner]: Modern Operators — Ternary, Nullish Coalescing, Optional Chaining

## Goal

Learn the ternary operator as a shorthand for simple `if/else`, and two newer, very useful operators: nullish coalescing (`??`) and optional chaining (`?.`).

## Prerequisites

- Day 1–8 (comparisons, logical operators, truthy/falsy)

## Explanation

The **ternary operator** (`condition ? valueIfTrue : valueIfFalse`) is a compact way to write a simple `if/else` that produces a value. It's great for short decisions, but can get hard to read if nested too much.

**Nullish coalescing (`??`)** is similar to `||`, but smarter for default values: it only falls back when the left side is `null` or `undefined` — not for other falsy values like `0` or `""`. This fixes a common bug where `||` accidentally replaces valid values like `0`.

**Optional chaining (`?.`)** safely accesses a property that might not exist, without crashing your program. Instead of throwing an error, it simply returns `undefined` if something along the chain is missing.

## Topic by Topic

### Topic 1: The ternary operator

Theory:
`condition ? valueIfTrue : valueIfFalse` evaluates the condition and returns one of the two values — it's an expression, so it can be used directly wherever a value is expected.

Practical:
Use ternaries for short, simple either/or decisions — especially when assigning a value based on a condition.

Code Example:

```js
let age = 20;
let category = age >= 18 ? "Adult" : "Minor";
console.log(category); // Adult
```

**Explanation:** This one line replaces a 4-line `if/else` block, because the ternary directly produces the value to store.

**Key Points:**

- Ternary = compact `if/else` that returns a value.
- Best for simple, single decisions — avoid nesting more than one level.
- Since it's an expression, you can use it inside `console.log()`, template literals, etc.

### Topic 2: Nullish coalescing `??`

Theory:
`a ?? b` returns `a` if `a` is not `null`/`undefined`, otherwise returns `b`. Unlike `||`, it does NOT treat `0`, `""`, or `false` as "missing."

Practical:
Use `??` specifically for default values where `0` or `""` are valid, real values that shouldn't be replaced.

Code Example:

```js
let discount = 0;
console.log(discount || 10); // 10 - WRONG! 0 is a valid discount but || replaces it
console.log(discount ?? 10); // 0  - CORRECT! only replaces null/undefined
```

**Explanation:** `||` treats `0` as "missing" because `0` is falsy — but a discount of `0` is a perfectly valid, real value. `??` correctly leaves it alone, only stepping in for actual `null`/`undefined`.

**Key Points:**

- `??` only falls back for `null` or `undefined`, nothing else.
- Use `??` instead of `||` whenever `0`, `""`, or `false` could be legitimate values.
- This is one of the most common "gotcha" fixes in real-world JavaScript code.

### Topic 3: Optional chaining `?.`

Theory:
`?.` checks if the thing before it exists before trying to access a property or call a method on it. If it doesn't exist, the whole expression short-circuits to `undefined` instead of throwing an error.

Practical:
Use `?.` when accessing nested data that might not always be present, like `user.address.city` where `address` might not exist for every user.

Code Example:

```js
const user = { name: "Ravi" }; // no "address" property

console.log(user.address.city); // Error! Cannot read property 'city' of undefined
console.log(user.address?.city); // undefined - no crash
console.log(user.contact?.getPhone?.()); // undefined - safely skips missing method too
```

**Explanation:** Without `?.`, trying to access `.city` on a missing `address` crashes the program. With `?.`, JavaScript safely stops and returns `undefined` instead.

**Key Points:**

- `?.` prevents crashes when accessing possibly-missing nested properties.
- It works on property access, array access, and even function calls (`obj.method?.()`).
- Combine `?.` with `??` for a safe access + default value pattern: `user.address?.city ?? "Unknown"`.

### Topic 4: `typeof` and `instanceof` in practice

Theory:
`typeof` checks primitive types; `instanceof` checks whether an object was created from a particular class/constructor (like arrays or custom objects).

Practical:
Use `typeof` for primitives, and `instanceof` (or `Array.isArray()`) when you need to check object "shape" more specifically.

Code Example:

```js
console.log(typeof "hello"); // "string"
console.log([] instanceof Array); // true
console.log({} instanceof Array); // false
console.log(Array.isArray([])); // true - the preferred way to check for arrays
```

**Explanation:** `typeof [] ` would just say `"object"`, which isn't specific enough — `instanceof Array` or `Array.isArray()` tells you definitively if something is actually an array.

**Key Points:**

- `typeof` works well for primitives, but arrays/objects both return `"object"`.
- `instanceof` and `Array.isArray()` give more specific answers for arrays.
- We'll use these checks more as we get into arrays and objects (Module 3).

## Recap

- Ternary = compact `if/else` that returns a value; avoid nesting too deeply.
- `??` provides defaults only for `null`/`undefined` — safer than `||` for values like `0`.
- `?.` safely accesses possibly-missing nested properties without crashing.
- `Array.isArray()` is the reliable way to check for arrays specifically.

## What's Next

Practice for today: `public/coding/JavaScript/day-009-functions.md`. Day 10 begins functions — one of the most important topics in this whole course.
