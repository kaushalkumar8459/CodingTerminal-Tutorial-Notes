---
title: Numbers and Math
slug: day-031-numbers-and-math
dayLabel: Day 31
level: Beginner
estimatedMinutes: 25
order: 31
track: javascript
---

# Day 31 [Beginner]: Numbers and Math

## Goal

Learn JavaScript's built-in `Math` object methods for rounding, finding extremes, and generating random numbers.

## Prerequisites

- Module 1 (numbers, arithmetic operators)

## Explanation

JavaScript's global `Math` object provides ready-made tools for common numeric operations, so you don't have to write your own rounding or comparison logic from scratch. `Math.round()`, `Math.floor()`, `Math.ceil()`, and `Math.trunc()` all handle decimals slightly differently — knowing the difference matters for getting correct results. `Math.random()` generates a random decimal, `Math.max()`/`Math.min()` find extremes among values, and `Math.abs()` removes a negative sign.

## Topic by Topic

### Topic 1: Rounding methods — `round`, `floor`, `ceil`, `trunc`

Theory:
These four methods all convert a decimal to a whole number, but with different rules for handling the fractional part.

Code Example:

```js
console.log(Math.round(4.5)); // 5  - rounds to nearest (ties round up)
console.log(Math.floor(4.9)); // 4  - always rounds DOWN
console.log(Math.ceil(4.1)); // 5  - always rounds UP
console.log(Math.trunc(4.9)); // 4  - simply removes the decimal part
console.log(Math.trunc(-4.9)); // -4 - trunc doesn't "round," it just cuts
```

**Explanation:** `round` picks the nearest whole number; `floor` always goes down; `ceil` always goes up; `trunc` just chops off the decimal, which matters especially for negative numbers.

**Key Points:**

- `Math.round()` = nearest whole number (rounds `.5` up).
- `Math.floor()` = always down; `Math.ceil()` = always up.
- `Math.trunc()` = removes the decimal without rounding logic — different from `floor` for negative numbers.

### Topic 2: `Math.random()`

Theory:
`Math.random()` returns a random decimal between `0` (inclusive) and `1` (exclusive). To get a random integer in a specific range, you combine it with multiplication and `Math.floor()`.

Code Example:

```js
console.log(Math.random()); // e.g. 0.734829...

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 6)); // random number between 1 and 6 (like a dice roll)
```

**Explanation:** `Math.random() * (max - min + 1)` scales the random decimal into the right range size, `Math.floor()` drops the decimal, and `+ min` shifts it to start at the correct minimum value.

**Key Points:**

- `Math.random()` alone only gives a decimal between 0 and 1 (never exactly 1).
- The `randomInt(min, max)` formula is a standard, reusable pattern — memorize its shape.
- Useful for dice rolls, random selection, shuffling, and more.

### Topic 3: `Math.max()` and `Math.min()`

Theory:
`Math.max()`/`Math.min()` return the largest/smallest of the numbers passed in directly as arguments.

Code Example:

```js
console.log(Math.max(3, 7, 2, 9)); // 9
console.log(Math.min(3, 7, 2, 9)); // 2

const scores = [70, 85, 60];
console.log(Math.max(...scores)); // 85 - spread turns array into arguments
```

**Explanation:** `Math.max`/`Math.min` don't accept an array directly — the spread operator (`...`, covered fully Day 51) "unpacks" the array into individual arguments first.

**Key Points:**

- `Math.max()`/`Math.min()` take individual number arguments, not an array.
- Use spread (`...array`) to pass array contents as individual arguments.
- Handy for quickly comparing a small, known set of numbers.

### Topic 4: `Math.abs()` and combining Math methods

Theory:
`Math.abs()` returns the absolute value of a number (always non-negative). Math methods are often combined together to solve real problems.

Code Example:

```js
console.log(Math.abs(-15)); // 15
console.log(Math.abs(15)); // 15

function priceDifference(price1, price2) {
  return Math.abs(price1 - price2);
}

console.log(priceDifference(100, 150)); // 50
console.log(priceDifference(150, 100)); // 50 - same result either order
```

**Explanation:** `Math.abs()` makes `priceDifference` work correctly regardless of which price is passed first, since the sign of the subtraction no longer matters.

**Key Points:**

- `Math.abs()` strips the negative sign, if any.
- Combining Math methods (like `abs` + subtraction) solves many everyday numeric problems.
- These small utilities become building blocks for larger calculations later.

## Recap

- `round`/`floor`/`ceil`/`trunc` all handle decimals differently — know which one fits your need.
- `Math.random()` combined with `floor` and scaling gives random integers in a range.
- `Math.max()`/`Math.min()`/`Math.abs()` handle comparisons and absolute values directly.

## What's Next

Practice for today: `public/coding/JavaScript/day-031-arrays-basics.md`. Day 32 covers advanced number concepts — NaN, Infinity, and BigInt.
