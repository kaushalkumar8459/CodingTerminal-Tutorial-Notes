---
title: String Methods Part 1
slug: day-029-string-methods-part-1
dayLabel: Day 29
level: Beginner
estimatedMinutes: 25
order: 29
track: javascript
---

# Day 29 [Beginner]: String Methods Part 1

## Goal

Learn the most commonly used string-inspection and case-conversion methods: `toUpperCase`, `toLowerCase`, `trim`, `charAt`, `includes`, `startsWith`, `endsWith`.

## Prerequisites

- Day 28 (strings fundamentals, indexing)

## Explanation

JavaScript strings come with many built-in methods for reading and transforming text without writing manual loops. Today's methods fall into two groups: **case conversion** (`toUpperCase`, `toLowerCase`) and **checking/reading characters** (`charAt`, `includes`, `startsWith`, `endsWith`, `trim`). All of these return new values — none of them modify the original string, since strings are immutable (from Day 28).

## Topic by Topic

### Topic 1: Case conversion

Theory:
`.toUpperCase()` and `.toLowerCase()` return a new string with all letters converted to the given case.

Code Example:

```js
const city = "New York";
console.log(city.toUpperCase()); // "NEW YORK"
console.log(city.toLowerCase()); // "new york"
```

**Explanation:** Both return a brand-new string — `city` itself is never changed.

**Key Points:**

- Great for case-insensitive comparisons (e.g. converting both sides to lowercase before comparing).
- Non-letter characters (numbers, symbols) are unaffected.
- Always assign the result somewhere if you need to keep it.

### Topic 2: `charAt()` vs bracket indexing

Theory:
`.charAt(index)` returns the character at a given position — similar to `string[index]`, but safer for out-of-range indexes.

Code Example:

```js
const word = "hello";
console.log(word.charAt(1)); // "e"
console.log(word[1]); // "e" - same result

console.log(word.charAt(10)); // "" - empty string, no error
console.log(word[10]); // undefined
```

**Explanation:** Both approaches work for valid indexes, but `.charAt()` returns an empty string for an out-of-range index instead of `undefined` — a subtle but sometimes useful difference.

**Key Points:**

- `.charAt(index)` and `string[index]` behave the same for valid indexes.
- Out-of-range: `.charAt()` returns `""`; bracket indexing returns `undefined`.
- Either is fine in practice — `[]` is more common in modern code.

### Topic 3: `includes()`, `startsWith()`, `endsWith()`

Theory:
These three methods check for the presence of a substring, in three different specific ways: anywhere, at the start, or at the end.

Code Example:

```js
const email = "user@example.com";

console.log(email.includes("@")); // true - appears anywhere
console.log(email.startsWith("user")); // true - appears at the start
console.log(email.endsWith(".com")); // true - appears at the end
```

**Explanation:** Each method answers a slightly different question — choose based on exactly what you need to check.

**Key Points:**

- `.includes(substring)` = anywhere in the string.
- `.startsWith(substring)` = must be at the very beginning.
- `.endsWith(substring)` = must be at the very end.
- All three are case-sensitive by default.

### Topic 4: `trim()` for cleaning user input

Theory:
`.trim()` removes whitespace from both ends of a string — extremely common when validating form input, which often has accidental leading/trailing spaces.

Code Example:

```js
const userInput = "   hello world   ";
console.log(userInput.trim()); // "hello world"
console.log(userInput.trim().length); // 11 (vs 17 for the untrimmed version)
```

**Explanation:** Trimming before validating length or comparing values avoids bugs where a value looks "empty" or "different" only because of accidental surrounding spaces.

**Key Points:**

- Always `.trim()` user-provided text before validating it (e.g. checking for empty input).
- `.trimStart()`/`.trimEnd()` trim only one side, if needed.
- This is one of the most practically useful string methods for real forms.

## Recap

- `toUpperCase()`/`toLowerCase()` convert case; `charAt()` reads a character safely.
- `includes()`/`startsWith()`/`endsWith()` check for a substring in different positions.
- `trim()` removes surrounding whitespace — essential for cleaning real user input.

## What's Next

Practice for today: `public/coding/JavaScript/day-029-string-transformation.md`. Day 30 covers the second set of string methods — slicing, replacing, and splitting.
