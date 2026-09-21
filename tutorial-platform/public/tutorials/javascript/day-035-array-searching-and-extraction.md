---
title: Array Searching and Extraction
slug: day-035-array-searching-and-extraction
dayLabel: Day 35
level: Beginner
estimatedMinutes: 25
order: 35
track: javascript
---

# Day 35 [Beginner]: Array Searching and Extraction

## Goal

Master the array methods used for searching (`includes`, `indexOf`, `lastIndexOf`, `find`, `findIndex`) and extraction (`slice`, `concat`) without mutating the original array.

## Prerequisites

- Day 33–34 (arrays fundamentals, modification methods)

## Explanation

Where Day 34's methods (`push`, `pop`, `splice`, etc.) all **mutate** the array, today's searching and extraction methods are **non-mutating** — they read information or return a new array, leaving the original completely untouched. This distinction matters a lot in real applications, where accidentally mutating data can cause hard-to-track bugs.

`.slice()` extracts a portion of an array into a new array (just like it does for strings). `.concat()` joins arrays into a new one. `.includes()`, `.indexOf()`, `.lastIndexOf()`, `.find()`, and `.findIndex()` all search — the choice between them depends on whether you're searching simple values or objects, and whether you want the value, its position, or just a yes/no.

## Topic by Topic

### Topic 1: `.slice()` for arrays

Theory:
`.slice(start, end)` returns a new array containing a portion of the original, without changing the original at all.

Code Example:

```js
const numbers = [10, 20, 30, 40, 50];
const middle = numbers.slice(1, 4);
console.log(middle); // [20, 30, 40]
console.log(numbers); // [10, 20, 30, 40, 50] - unchanged!
```

**Explanation:** `.slice(1, 4)` extracts indexes 1 up to (but not including) 4 into a brand-new array — `numbers` itself is never modified.

**Key Points:**

- `.slice()` never mutates — it always returns a new array.
- Negative indexes work here too (e.g. `slice(-2)` gets the last 2 items).
- `.slice()` with no arguments (`arr.slice()`) is a common quick way to copy an entire array.

### Topic 2: `.concat()` for combining arrays

Theory:
`.concat()` joins two or more arrays (or values) into a brand-new array, without changing any of the originals.

Code Example:

```js
const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];

const combined = fruits.concat(veggies);
console.log(combined); // ["apple", "banana", "carrot", "potato"]
console.log(fruits); // ["apple", "banana"] - unchanged
```

**Explanation:** `.concat()` builds a new array containing all items from both arrays — neither original array is touched.

**Key Points:**

- `.concat()` is non-mutating — always returns a new array.
- The spread operator (`[...fruits, ...veggies]`, covered Day 51) achieves the same result and is more common in modern code.
- Both approaches leave the originals untouched.

### Topic 3: Search methods for simple values

Theory:
`.includes()`, `.indexOf()`, and `.lastIndexOf()` are best for searching arrays of simple values (numbers, strings) — not objects.

Code Example:

```js
const numbers = [5, 10, 15, 10, 20];

console.log(numbers.includes(15)); // true
console.log(numbers.indexOf(10)); // 1 (first occurrence)
console.log(numbers.lastIndexOf(10)); // 3 (last occurrence)
console.log(numbers.indexOf(99)); // -1 (not found)
```

**Explanation:** `.indexOf()` finds the first matching position; `.lastIndexOf()` finds the last; `.includes()` just answers a yes/no question — pick based on what information you actually need.

**Key Points:**

- These three are ideal for arrays of primitive values.
- `.indexOf()`/`.lastIndexOf()` return `-1` when nothing matches.
- For arrays of objects, use `.find()`/`.findIndex()` instead (Day 33).

### Topic 4: Combining search and extraction

Theory:
Real problems often combine these methods — like finding a position, then slicing around it.

Code Example:

```js
const scores = [55, 62, 78, 91, 45];

const passingIndex = scores.findIndex((score) => score >= 60);
const passingScores = scores.slice(passingIndex);

console.log(passingIndex); // 1
console.log(passingScores); // [62, 78, 91, 45]
```

**Explanation:** `.findIndex()` locates where passing scores begin, and `.slice()` then extracts everything from that point onward — a practical combination of searching and extraction.

**Key Points:**

- Search methods (finding a position) and extraction methods (`slice`) combine naturally.
- None of today's methods mutate their source array — always safe to use without worrying about side effects.
- This non-mutating style becomes even more important once we cover `map`/`filter`/`reduce` starting tomorrow.

## Recap

- `.slice()`/`.concat()` extract/combine arrays without mutating the originals.
- `.includes()`/`.indexOf()`/`.lastIndexOf()` search simple value arrays; `.find()`/`.findIndex()` search objects.
- Search and extraction methods combine naturally to solve more complex problems.

## What's Next

Practice for today: `public/coding/JavaScript/day-035-map.md`. Day 36 covers array iteration with `forEach()` in depth.
