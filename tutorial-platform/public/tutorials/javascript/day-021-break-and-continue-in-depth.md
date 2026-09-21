---
title: break and continue In Depth
slug: day-021-break-and-continue-in-depth
dayLabel: Day 21
level: Beginner
estimatedMinutes: 20
order: 21
track: javascript
---

# Day 21 [Beginner]: `break` and `continue` In Depth

## Goal

Master exactly how `break` and `continue` behave, including inside nested loops.

## Prerequisites

- Day 16–20 (loops, conditions)

## Explanation

`break` immediately exits the loop it's inside — no further iterations run at all. `continue` skips only the _current_ iteration and jumps straight to the next one — the loop keeps going otherwise. Mixing these two up is one of the most common beginner mistakes when writing loops.

Inside **nested loops**, `break` and `continue` only affect the loop they're directly written inside (usually the innermost one) — unless you use a **labeled loop**, which lets you target an outer loop specifically.

## Topic by Topic

### Topic 1: `break` — stopping a loop entirely

Theory:
`break` immediately ends the loop, skipping any remaining iterations completely.

Code Example:

```js
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// Prints: 1 2 3 4  (stops completely once i === 5)
```

**Explanation:** Once `i` reaches `5`, `break` exits the loop right away — `5` through `10` are never even checked.

**Key Points:**

- `break` exits the loop entirely — no more iterations happen at all.
- Commonly used to stop searching once a match is found.
- Code after the loop continues running normally.

### Topic 2: `continue` — skipping just one iteration

Theory:
`continue` skips the rest of the current iteration's body and jumps straight to the next iteration — the loop itself keeps running.

Code Example:

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip even numbers
  }
  console.log(i);
}
// Prints: 1 3 5 7 9
```

**Explanation:** Whenever `i` is even, `continue` skips the `console.log(i)` line for that iteration only — the loop still continues counting up to 10.

**Key Points:**

- `continue` only skips the current iteration, not the whole loop.
- Great for filtering out values you don't want to process, without stopping the loop.
- The loop's increment (`i++`) still happens even when `continue` is used.

### Topic 3: `break`/`continue` inside nested loops

Theory:
By default, `break`/`continue` only affect the loop they're directly written inside — usually the innermost one.

Code Example:

```js
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    if (col === 2) {
      break; // only breaks the INNER loop
    }
    console.log(`row ${row}, col ${col}`);
  }
}
```

**Explanation:** `break` here only stops the inner `col` loop for that particular row — the outer `row` loop continues normally to its next iteration.

**Key Points:**

- `break`/`continue` target the nearest enclosing loop by default.
- Breaking an inner loop does NOT stop the outer loop.
- This is a common source of confusion — always be clear about which loop you intend to affect.

### Topic 4: Labeled loops (breaking an outer loop from inside)

Theory:
A label (`outer: for (...) {...}`) lets `break`/`continue` target a specific outer loop directly, instead of only the innermost one.

Code Example:

```js
outer: for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    if (row === 2 && col === 2) {
      break outer; // stops BOTH loops immediately
    }
    console.log(`row ${row}, col ${col}`);
  }
}
```

**Explanation:** `break outer` exits the labeled outer loop directly, stopping both loops at once — something a plain `break` couldn't do here.

**Key Points:**

- Labels are written as `labelName:` directly before the loop.
- `break labelName` / `continue labelName` targets that specific labeled loop.
- Labeled loops are rare in everyday code, but useful for the specific "exit everything" case.

## Recap

- `break` exits a loop entirely; `continue` skips only the current iteration.
- Both target only the nearest enclosing loop by default.
- Labeled loops let you `break`/`continue` a specific outer loop directly when truly needed.

## What's Next

Practice for today: `public/coding/JavaScript/day-021-more-number-problems.md`. Day 22 introduces `for...of` for iterating arrays, strings, and other collections.
