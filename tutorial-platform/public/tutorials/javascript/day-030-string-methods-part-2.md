---
title: String Methods Part 2
slug: day-030-string-methods-part-2
dayLabel: Day 30
level: Beginner
estimatedMinutes: 25
order: 30
track: javascript
---

# Day 30 [Beginner]: String Methods Part 2

## Goal

Learn slicing/extraction and transformation methods: `slice`, `substring`, `replace`, `replaceAll`, `split`, `concat`, `repeat`.

## Prerequisites

- Day 28–29 (string fundamentals, case/checking methods)

## Explanation

Where Day 29's methods mostly _checked_ or _converted_ text, today's methods let you _extract pieces_ of a string and _build new strings_ out of transformations. `.slice()`/`.substring()` extract portions; `.replace()`/`.replaceAll()` swap out text; `.split()` breaks a string into an array; `.concat()` and `.repeat()` build new strings by combining or repeating existing text.

## Topic by Topic

### Topic 1: Extracting with `slice()` and `substring()`

Theory:
Both extract a portion of a string given start/end positions, but handle negative and out-of-order arguments differently.

Code Example:

```js
const text = "JavaScript";
console.log(text.slice(0, 4)); // "Java"
console.log(text.slice(-6)); // "Script"
console.log(text.substring(0, 4)); // "Java"
console.log(text.substring(4, 0)); // "Java" - substring swaps reversed args!
```

**Explanation:** `.slice()` supports negative indexes (counting from the end); `.substring()` doesn't, and it also automatically swaps arguments if the start is greater than the end.

**Key Points:**

- `.slice(start, end)` supports negative indexes; `.substring()` does not.
- `.substring()` silently swaps arguments if `start > end` — can hide bugs.
- Prefer `.slice()` in most cases for its more predictable, flexible behavior.

### Topic 2: `replace()` and `replaceAll()`

Theory:
`.replace()` swaps the first match of a substring (or pattern); `.replaceAll()` swaps every match.

Code Example:

```js
const sentence = "cat and cat and cat";
console.log(sentence.replace("cat", "dog")); // "dog and cat and cat"
console.log(sentence.replaceAll("cat", "dog")); // "dog and dog and dog"
```

**Explanation:** `.replace()` stops after the first match; `.replaceAll()` (added in ES2021) continues through the entire string.

**Key Points:**

- `.replace()` = first match only. `.replaceAll()` = every match.
- Both return a brand-new string; the original is untouched.
- `.replace()`/`.replaceAll()` can also accept regular expressions (covered fully on Day 103).

### Topic 3: `split()` and `concat()`

Theory:
`.split(separator)` breaks a string into an array of pieces. `.concat()` joins strings together, similar to `+`.

Code Example:

```js
const csv = "apple,banana,cherry";
const items = csv.split(","); // ["apple", "banana", "cherry"]

const greeting = "Hello".concat(", ", "World", "!");
console.log(greeting); // "Hello, World!"
```

**Explanation:** `.split(",")` turns comma-separated text into a usable array; `.concat()` joins multiple string pieces into one, functionally similar to using `+`.

**Key Points:**

- `.split(separator)` returns an array — very useful for parsing structured text (like CSV).
- `.concat()` works like `+`, though `+`/template literals are more commonly used in practice.
- `.split("")` (empty string separator) splits into individual characters.

### Topic 4: `repeat()`

Theory:
`.repeat(count)` returns a new string with the original repeated `count` times.

Code Example:

```js
console.log("ab".repeat(3)); // "ababab"
console.log("-".repeat(20)); // a 20-character separator line
```

**Explanation:** `.repeat()` is a quick way to build separator lines, simple patterns, or padding without writing a loop yourself.

**Key Points:**

- `.repeat(count)` must receive a non-negative integer, or it throws an error.
- Handy for building visual separators or simple repeated patterns.
- Combines well with template literals for quick formatted output.

## Recap

- `.slice()` is generally more flexible than `.substring()` due to negative-index support.
- `.replace()` changes the first match; `.replaceAll()` changes every match.
- `.split()` turns a string into an array; `.concat()`/`.repeat()` build new strings.

## What's Next

Practice for today: `public/coding/JavaScript/day-030-string-interview-problems.md`. Day 31 moves into numbers and the `Math` object.
