---
title: while and do-while Loops In Depth
slug: day-020-while-and-do-while-loops-in-depth
dayLabel: Day 20
level: Beginner
estimatedMinutes: 25
order: 20
track: javascript
---

# Day 20 [Beginner]: `while` and `do...while` Loops In Depth

## Goal

Understand when to use `while` and `do...while` instead of `for`, and how to avoid accidental infinite loops.

## Prerequisites

- Day 16–19 (conditions, `for` loops)

## Explanation

`for` loops are great when you know how many times you need to repeat something in advance. `while` loops are better when you don't know the exact number of repeats ahead of time — you just want to "keep going while a condition holds," like waiting for valid user input or processing until some external state changes.

`do...while` is a variation that always runs its body **at least once**, checking the condition only _after_ the first run. This matters when the action itself needs to happen before you can even evaluate whether to repeat (like showing a menu before checking if the user wants to exit).

**Infinite loops** happen when a loop's stopping condition never becomes false — usually because the counter/state that the condition depends on is never updated inside the loop body.

## Topic by Topic

### Topic 1: The `while` loop

Theory:
`while (condition) { ... }` checks the condition first; if truthy, it runs the body, then checks again — repeating until the condition becomes falsy.

Code Example:

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
// Prints: 1 2 3 4 5
```

**Explanation:** The condition `count <= 5` is checked before every run of the body; `count++` inside the body is what eventually makes the condition false, ending the loop.

**Key Points:**

- The condition is checked _before_ each run — if it's false immediately, the body never runs at all.
- Something inside the loop body must eventually make the condition false.
- Use `while` when the number of repeats isn't known ahead of time.

### Topic 2: The `do...while` loop

Theory:
`do { ... } while (condition);` runs the body first, and only checks the condition _after_ — guaranteeing at least one execution.

Code Example:

```js
let attempts = 0;

do {
  console.log("Attempt #" + (attempts + 1));
  attempts++;
} while (attempts < 3);
```

**Explanation:** Even if `attempts < 3` were somehow false from the very start, this loop still runs its body once before ever checking — that's the defining difference from a regular `while` loop.

**Key Points:**

- `do...while` always runs its body at least once, no matter what.
- The condition is checked _after_ the body, not before.
- Use it when "do this action, then decide whether to repeat" better matches your logic.

### Topic 3: Avoiding infinite loops

Theory:
An infinite loop happens when the loop's condition never becomes false — usually because you forgot to update the value the condition depends on.

Code Example:

```js
// BUGGY - infinite loop! "count" never changes
let count = 1;
// while (count <= 5) {
//   console.log(count);
// }

// FIXED
let count2 = 1;
while (count2 <= 5) {
  console.log(count2);
  count2++; // this line was missing above
}
```

**Explanation:** Without `count++`, `count <= 5` stays `true` forever, freezing your program. Always double-check that something inside the loop actually moves the condition toward becoming false.

**Key Points:**

- Always verify what makes your loop's condition eventually false.
- If a browser tab or Node process freezes while testing, an infinite loop is the most likely cause.
- When in doubt, add a temporary safety counter/log while debugging a tricky loop.

### Topic 4: Choosing between `for`, `while`, and `do...while`

Theory:
All three loops can solve the same problems, but each communicates intent slightly differently to anyone reading your code.

Code Example:

```js
// Known number of repeats -> for
for (let i = 0; i < 5; i++) {
  /* ... */
}

// Unknown number of repeats, condition-driven -> while
let value = 100;
while (value > 1) {
  value = value / 2;
}

// Must run at least once -> do...while
do {
  console.log("Menu shown at least once");
} while (false);
```

**Explanation:** Each loop type is a better "fit" for a different situation — picking the right one makes your intention clearer to future readers (including future you).

**Key Points:**

- Known repeat count → `for`.
- Unknown repeat count, condition-driven → `while`.
- Must execute at least once before checking → `do...while`.
- All three are functionally similar; choosing well is about clarity, not capability.

## Recap

- `while` checks its condition before running; `do...while` checks after, guaranteeing at least one run.
- Infinite loops happen when nothing inside the loop makes the condition eventually false.
- Choose loop type based on whether the repeat count is known and whether at least one run is required.

## What's Next

Practice for today: `public/coding/JavaScript/day-020-number-problems.md`. Day 21 covers `break` and `continue` in more depth.
