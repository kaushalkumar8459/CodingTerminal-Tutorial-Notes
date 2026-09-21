---
title: The for Loop In Depth
slug: day-019-the-for-loop-in-depth
dayLabel: Day 19
level: Beginner
estimatedMinutes: 25
order: 19
track: javascript
---

# Day 19 [Beginner]: The `for` Loop In Depth

## Goal

Fully understand the three parts of a `for` loop, and how to nest loops inside each other for grid-like problems.

## Prerequisites

- Day 16–18 (conditions, ternary)

## Explanation

A `for` loop repeats a block of code a specific number of times, controlled by three parts written in its parentheses: **initialization** (set up a starting counter), **condition** (checked before every repeat — loop continues while it's true), and **increment/decrement** (how the counter changes after each repeat).

**Nested loops** — a loop inside another loop — let you handle grid-like or repeated-row problems, like printing patterns or working through a 2D structure. The outer loop typically controls "rows," and the inner loop controls what happens within each row.

## Topic by Topic

### Topic 1: The three parts of a `for` loop

Theory:
`for (initialization; condition; increment) { ... }` runs the initialization once, then repeats: check condition → run body → run increment → check condition again, until the condition becomes false.

Code Example:

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Prints: 1 2 3 4 5
```

**Explanation:** `let i = 1` runs once at the start. Before each repeat, `i <= 5` is checked. After each repeat, `i++` runs. The loop stops the moment `i <= 5` becomes false (when `i` is `6`).

**Key Points:**

- Initialization runs exactly once, at the very start.
- The condition is checked before every single iteration, including the first.
- The increment step runs after each iteration's body finishes.

### Topic 2: Loop direction and step size

Theory:
You control how the counter changes — counting up, counting down, or skipping by more than 1 each time.

Code Example:

```js
for (let i = 10; i >= 1; i--) {
  console.log(i); // counts down: 10, 9, 8 ... 1
}

for (let i = 0; i <= 20; i += 5) {
  console.log(i); // 0, 5, 10, 15, 20
}
```

**Explanation:** Changing the increment expression (`i--` vs `i += 5`) fully controls the loop's direction and step size — there's nothing special beyond adjusting these three parts.

**Key Points:**

- `i--` counts down; `i++` counts up; `i += n` skips by `n` each time.
- Make sure your condition still matches your direction (e.g. `i >= 1` when counting down, not `i <= 1`).
- Getting the direction/condition mismatched is a common cause of infinite loops.

### Topic 3: Nested loops

Theory:
A nested loop is a `for` loop placed inside another `for` loop's body — the inner loop completes fully for every single iteration of the outer loop.

Code Example:

```js
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(`Row ${row}, Col ${col}`);
  }
}
// Row 1 Col 1, Row 1 Col 2, Row 1 Col 3, Row 2 Col 1, ...
```

**Explanation:** For every single value of `row` (1, 2, 3), the _entire_ inner loop runs from `col = 1` to `col = 3` — this is why nested loops are perfect for grid/table-like problems.

**Key Points:**

- The inner loop fully completes for each single step of the outer loop.
- Nested loops are the standard tool for patterns, grids, and multiplication tables.
- Watch performance with deeply nested loops on large ranges — the work multiplies quickly.

### Topic 4: A practical nested-loop example — printing a pattern

Theory:
Star/number patterns are a classic way to practice nested loops, since the outer loop controls rows and the inner loop controls what's printed in each row.

Code Example:

```js
for (let row = 1; row <= 4; row++) {
  let line = "";
  for (let col = 1; col <= row; col++) {
    line += "*";
  }
  console.log(line);
}
// *
// **
// ***
// ****
```

**Explanation:** The inner loop runs `row` times for each row — since `row` increases each time, each printed line gets one star longer than the last.

**Key Points:**

- Building a string inside the inner loop, then printing it once per outer iteration, is a very common pattern-printing technique.
- The inner loop's condition often depends on the outer loop's current value (like `col <= row` here).
- This pattern generalizes to number patterns, pyramids, and more — practiced in depth in the coding track.

## Recap

- A `for` loop has three parts: initialization, condition, increment/decrement.
- Adjusting the increment/condition controls direction and step size.
- Nested loops run the inner loop fully for every outer iteration — ideal for grids and patterns.

## What's Next

Practice for today: `public/coding/JavaScript/day-019-nested-loops.md`. Day 20 covers `while` and `do...while` loops in depth.
