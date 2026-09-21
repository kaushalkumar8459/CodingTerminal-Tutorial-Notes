---
title: The for...in Loop
slug: day-023-the-for-in-loop
dayLabel: Day 23
level: Beginner
estimatedMinutes: 20
order: 23
track: javascript
---

# Day 23 [Beginner]: The `for...in` Loop

## Goal

Learn `for...in`, used specifically for looping over an object's property names, and understand exactly how it differs from `for...of`.

## Prerequisites

- Day 22 (`for...of`)
- Basic familiarity with object literals (`{ key: value }`)

## Explanation

`for...in` loops over the **keys (property names)** of an object — not the values directly. It's the standard way to walk through "what properties does this object have?" before we cover dedicated object methods (`Object.keys()`, etc.) on Day 43.

This is the single most important distinction to remember: **`for...of` is for iterating values in arrays/strings/collections; `for...in` is for iterating keys of objects.** Using the wrong one for the wrong data structure is a very common beginner mix-up.

## Topic by Topic

### Topic 1: Basic `for...in` usage

Theory:
`for (const key in object) { ... }` gives you each property name of the object, one at a time.

Code Example:

```js
const user = { name: "Riya", age: 26, city: "Pune" };

for (const key in user) {
  console.log(key, "->", user[key]);
}
// name -> Riya
// age -> 26
// city -> Pune
```

**Explanation:** `key` holds each property _name_ (a string) in turn; `user[key]` is how you access the actual _value_ for that property.

**Key Points:**

- `for...in` gives you keys (property names), not values directly.
- Use `object[key]` inside the loop to access the corresponding value.
- Property order for plain objects is generally insertion order for string keys (a detail, not usually something to rely on heavily).

### Topic 2: Counting and searching object properties

Theory:
Since `for...in` visits every key, it's a simple way to count properties or search for a specific one before we learn `Object.keys()`.

Code Example:

```js
const product = { name: "Laptop", price: 55000, inStock: true };

let propertyCount = 0;
for (const key in product) {
  propertyCount++;
}
console.log(propertyCount); // 3
```

**Explanation:** Each loop iteration represents exactly one property, so counting iterations gives you the total property count.

**Key Points:**

- `for...in` naturally visits each property exactly once.
- Useful for counting, searching, or transforming object data before dedicated `Object` methods are introduced.
- We'll replace many of these patterns with `Object.keys/values/entries()` starting Day 43 — those are usually cleaner once you know them.

### Topic 3: `for...in` vs `for...of`

Theory:
`for...in` is for objects (keys); `for...of` is for iterables like arrays/strings (values). Using `for...in` on an array technically works but is discouraged.

Code Example:

```js
const numbers = [10, 20, 30];

for (const index in numbers) {
  console.log(index, typeof index); // "0" "string", "1" "string", "2" "string"
}

for (const value of numbers) {
  console.log(value); // 10, 20, 30
}
```

**Explanation:** `for...in` on an array gives you _string_ indexes (`"0"`, `"1"`, `"2"`), which is confusing and easy to misuse — `for...of` is the correct, intended tool for arrays.

**Key Points:**

- Avoid `for...in` on arrays — it gives string indexes, not values, and can behave unexpectedly with added array properties.
- Use `for...in` for objects, `for...of` for arrays/strings/other iterables.
- If you remember only one rule from today: **objects → `for...in`, arrays/iterables → `for...of`.**

### Topic 4: A practical example — converting an object to an array

Theory:
Before `Object.entries()` (Day 43), `for...in` is one way to manually build an array from an object's key-value pairs.

Code Example:

```js
const scores = { math: 90, science: 85, english: 78 };
const entries = [];

for (const subject in scores) {
  entries.push([subject, scores[subject]]);
}

console.log(entries);
// [["math", 90], ["science", 85], ["english", 78]]
```

**Explanation:** Each loop iteration adds one `[key, value]` pair into the `entries` array — a manual preview of what `Object.entries()` will do for you automatically later.

**Key Points:**

- `for...in` can manually build arrays of key-value pairs from an object.
- This exact task becomes much simpler once we learn `Object.entries()`.
- Understanding the manual version first makes the built-in shortcut easier to appreciate later.

## Recap

- `for...in` loops over an object's keys (property names); use `object[key]` to get values.
- Avoid `for...in` on arrays — use `for...of` instead.
- Remember the rule: objects → `for...in`, arrays/iterables → `for...of`.

## What's Next

Practice for today: `public/coding/JavaScript/day-023-for-in-practice.md`. Day 24 revisits nested loops and patterns with more challenging problems.
