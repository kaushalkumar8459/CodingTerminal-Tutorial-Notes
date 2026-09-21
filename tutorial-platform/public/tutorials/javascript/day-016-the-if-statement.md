---
title: The if Statement
slug: day-016-the-if-statement
dayLabel: Day 16
level: Beginner
estimatedMinutes: 25
order: 16
track: javascript
---

# Day 16 [Beginner]: The `if` Statement

## Goal

Learn how to make decisions in code using `if`, `else`, and `else if`, including nested conditions.

## Prerequisites

- Module 1 (variables, data types, comparison/logical operators)

## Explanation

Most real programs need to make decisions: "if this is true, do this; otherwise, do that." The `if` statement is JavaScript's basic decision-making tool. `if` runs a block of code only when its condition is truthy. `else` runs a fallback block when the condition is falsy. `else if` lets you check additional conditions in sequence, one after another, until one matches (or none do, in which case `else` runs, if present).

You can also **nest** conditions — put an `if` inside another `if` — when a decision depends on more than one layered check. Nesting is powerful but can get hard to read quickly, so it's best used only when truly needed.

## Topic by Topic

### Topic 1: Basic `if` and `else`

Theory:
`if (condition) { ... }` runs its block only when `condition` is truthy. Adding `else { ... }` gives a fallback for when it's falsy.

Code Example:

```js
let age = 20;

if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You cannot vote yet.");
}
```

**Explanation:** Since `age >= 18` is `true`, the first block runs and the `else` block is skipped entirely.

**Key Points:**

- `if` alone is valid — `else` is optional.
- Only one branch ever runs: either the `if` block or the `else` block, never both.
- The condition is evaluated for truthiness, same rules as Day 6/12.

### Topic 2: `else if` chains

Theory:
`else if` lets you check several conditions in order. JavaScript checks each one top to bottom and runs the first block whose condition is true, then stops.

Code Example:

```js
let marks = 72;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 60) {
  console.log("Grade C");
} else {
  console.log("Grade F");
}
```

**Explanation:** `marks` is 72, which fails the first two checks but passes `marks >= 60`, so `"Grade C"` prints — the remaining conditions are never even checked.

**Key Points:**

- Order matters: place more specific/higher conditions first when ranges overlap.
- Only the first matching block runs; the rest are skipped.
- A final `else` is a good safety net for anything that didn't match.

### Topic 3: Nested conditions

Theory:
A nested condition is an `if` statement placed inside another `if` (or `else`) block — used when a decision genuinely depends on more than one layered check.

Code Example:

```js
let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Welcome, Admin!");
  } else {
    console.log("Welcome, User!");
  }
} else {
  console.log("Please log in.");
}
```

**Explanation:** The inner `if/else` only runs at all if `isLoggedIn` is `true` — nesting expresses "this check only matters within that other check."

**Key Points:**

- Nesting is useful, but avoid going more than 2–3 levels deep — combine conditions with `&&` instead when possible.
- `if (isLoggedIn && isAdmin)` is often clearer than deep nesting for simple cases.
- Readability matters more than showing off — simplest working structure wins.

### Topic 4: Decision-making patterns

Theory:
Good decision-making code reads almost like plain English, and handles unexpected/edge cases explicitly rather than assuming the "happy path" always happens.

Code Example:

```js
function categorize(age) {
  if (age < 0) {
    return "Invalid age";
  } else if (age < 13) {
    return "Child";
  } else if (age < 20) {
    return "Teen";
  } else {
    return "Adult";
  }
}
```

**Explanation:** Handling the invalid case (`age < 0`) explicitly, first, prevents bad data from silently falling into the wrong category.

**Key Points:**

- Always consider "what if the input is invalid or unexpected?" as part of your conditions.
- Keep condition chains ordered logically (usually smallest/most specific range first).
- A function that returns based on conditions is often cleaner than one that only logs.

## Recap

- `if`/`else` picks one of two paths; `else if` chains check several conditions in order.
- Nested `if` statements express layered decisions, but keep nesting shallow for readability.
- Always consider invalid/edge-case input as part of your conditions.

## What's Next

Practice for today: `public/coding/JavaScript/day-016-loop-basics.md`. Day 17 covers the `switch` statement as an alternative to long `else if` chains.
