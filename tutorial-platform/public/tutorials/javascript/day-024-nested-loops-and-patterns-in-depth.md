---
title: Nested Loops and Patterns In Depth
slug: day-024-nested-loops-and-patterns-in-depth
dayLabel: Day 24
level: Beginner
estimatedMinutes: 25
order: 24
track: javascript
---

# Day 24 [Beginner]: Nested Loops and Patterns In Depth

## Goal

Strengthen nested-loop thinking with more advanced number and star patterns, and connect this skill to common interview-style problems.

## Prerequisites

- Day 19 (`for` loop and basic nesting), Day 21 (`break`/`continue`)

## Explanation

By now you've written basic nested loops for grids and simple patterns. Today's focus is building the _thinking process_ for solving new, unfamiliar pattern problems — which is exactly what technical interviews often test, since patterns force you to reason precisely about rows, columns, and conditions together.

The trick to solving almost any pattern problem is the same: figure out **how many rows** there are, then for each row, figure out **what changes** (number of stars, numbers, or spaces) based on the row number.

## Topic by Topic

### Topic 1: A repeatable approach to pattern problems

Theory:
Rather than memorizing patterns, learn a repeatable process: (1) find the number of rows, (2) for a given row, find how many items to print, (3) figure out if there's a relationship to the row number itself.

Code Example:

```js
// Right triangle: row N has N stars
for (let row = 1; row <= 5; row++) {
  let line = "";
  for (let col = 1; col <= row; col++) {
    line += "*";
  }
  console.log(line);
}
```

**Explanation:** Recognizing "row N needs N stars" is the key insight — once you see that relationship, the inner loop's bound (`col <= row`) follows naturally.

**Key Points:**

- Always ask: "how many items does row N need?" before writing the loop.
- Build the row as a string first, then print it once per row.
- This same process scales to number patterns, hollow shapes, and more complex variations.

### Topic 2: Patterns that decrease per row

Theory:
Some patterns need fewer items as the row number increases — the same process still applies, just with the relationship reversed.

Code Example:

```js
// Inverted right triangle: row 1 has 5 stars, row 5 has 1 star
const totalRows = 5;
for (let row = 1; row <= totalRows; row++) {
  let line = "";
  for (let col = 1; col <= totalRows - row + 1; col++) {
    line += "*";
  }
  console.log(line);
}
```

**Explanation:** `totalRows - row + 1` decreases as `row` increases, giving the reversed effect — the same underlying process, just a different formula for "how many items."

**Key Points:**

- Decreasing patterns use a formula based on `totalRows - row` (or similar).
- Testing your formula for `row = 1` and `row = totalRows` by hand catches most mistakes quickly.
- The core technique (build a string, use the row number in a formula) doesn't change.

### Topic 3: Patterns with spaces (hollow shapes)

Theory:
Hollow shapes need two decisions per row: when to print a visible character, and when to print a blank space instead — usually based on whether you're on the border or not.

Code Example:

```js
// Hollow square (5x5): border characters only
const size = 5;
for (let row = 1; row <= size; row++) {
  let line = "";
  for (let col = 1; col <= size; col++) {
    if (row === 1 || row === size || col === 1 || col === size) {
      line += "*";
    } else {
      line += " ";
    }
  }
  console.log(line);
}
```

**Explanation:** The condition checks if we're on the first/last row OR first/last column (the "border") — if so, print `*`; otherwise print a space, leaving the middle hollow.

**Key Points:**

- Hollow shapes need a condition inside the inner loop, not just a fixed count.
- "Border" usually means: first row, last row, first column, or last column.
- Building up complexity step by step (solid shape first, then add the hollow condition) is easier than trying to solve it all at once.

### Topic 4: Why patterns matter for interviews

Theory:
Pattern problems are popular in interviews because they quickly reveal whether someone can reason about loop bounds and conditions correctly under time pressure — not because "printing stars" is a real-world skill by itself.

Practical:
Practice explaining your pattern-solving _process_ out loud (or in comments) as you solve — this verbal reasoning skill directly transfers to explaining any algorithm in an interview.

**Key Points:**

- The value isn't the specific pattern — it's the systematic reasoning process behind it.
- Being able to clearly explain "row N needs X items because..." is what interviewers are actually listening for.
- This same row/column reasoning reappears later in 2D array and matrix problems.

## Recap

- Solve pattern problems by first identifying the relationship between the row number and how many items that row needs.
- Decreasing patterns just reverse the formula; hollow patterns add a border condition.
- The real skill being practiced is systematic reasoning, which matters far beyond just patterns.

## What's Next

Practice for today: `public/coding/JavaScript/day-024-string-problems.md`. Day 25 focuses on number problem solving as a dedicated practice day.
