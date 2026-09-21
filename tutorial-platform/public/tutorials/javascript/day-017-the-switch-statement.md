---
title: The switch Statement
slug: day-017-the-switch-statement
dayLabel: Day 17
level: Beginner
estimatedMinutes: 25
order: 17
track: javascript
---

# Day 17 [Beginner]: The `switch` Statement

## Goal

Learn `switch` as an alternative to long `else if` chains, and understand when it's the better choice.

## Prerequisites

- Day 16 (`if`/`else if` decision making)

## Explanation

`switch` compares one value against several possible `case`s, running the code for whichever `case` matches. It's often cleaner than a long `else if` chain when you're checking the _same_ variable against many exact, specific values (like a day number, a status string, or a menu choice).

Each `case` should normally end with `break`, which stops the switch from continuing to check further cases. Forgetting `break` causes **fall-through** — execution continues into the next case, which is sometimes intentional but usually a bug. `default` acts like a final `else` — it runs if no `case` matched.

## Topic by Topic

### Topic 1: Basic `switch` syntax

Theory:
`switch (value) { case x: ...; break; }` checks `value` against each `case` using strict equality (`===`).

Code Example:

```js
let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Unknown day");
}
```

**Explanation:** `day` is `3`, so it matches `case 3` and prints `"Wednesday"`; `break` then stops further checks.

**Key Points:**

- `switch` compares using strict equality (`===`), just like `case 3` only matches the number `3`, not `"3"`.
- Each case usually ends with `break`.
- `default` is optional but recommended, as a catch-all.

### Topic 2: Fall-through behavior

Theory:
Without `break`, execution "falls through" into the next case's code, running it too — regardless of whether that case's value matches.

Code Example:

```js
let day = 6;

switch (day) {
  case 6:
  case 7:
    console.log("Weekend!");
    break;
  default:
    console.log("Weekday");
}
```

**Explanation:** `case 6` has no `break`, so it intentionally "falls through" into `case 7`'s code — this is a common, deliberate pattern for grouping multiple values that should behave the same way.

**Key Points:**

- Missing `break` accidentally is a classic bug — always double check.
- Intentional fall-through (like grouping `case 6:` and `case 7:` together) is a valid, common pattern.
- `default` doesn't need to be last technically, but placing it last is the clearest convention.

### Topic 3: When to use `switch` vs `if/else if`

Theory:
`switch` shines when checking one variable against many specific, discrete values. `if/else if` is better for range checks (`>`, `<`) or combining multiple different variables.

Code Example:

```js
// Good fit for switch - one variable, many exact values
function getMonthName(monthNumber) {
  switch (monthNumber) {
    case 1:
      return "January";
    case 2:
      return "February";
    // ...
    default:
      return "Invalid month";
  }
}

// Better as if/else if - range check, not exact match
function getGrade(marks) {
  if (marks >= 90) return "A";
  else if (marks >= 75) return "B";
  else return "C";
}
```

**Explanation:** `getMonthName` checks exact values (1, 2, 3...), which fits `switch` well. `getGrade` checks ranges (`>= 90`, `>= 75`), which `switch` can't express directly — `if/else if` is the right tool there.

**Key Points:**

- `switch` = one variable, many exact matches.
- `if/else if` = ranges, multiple variables, or complex combined conditions.
- Choosing the right tool makes your code read more naturally.

### Topic 4: A practical `switch` example

Theory:
`switch` statements often appear in menu systems, state machines, and anywhere a single "mode" or "status" value drives different behavior.

Code Example:

```js
function handleStatus(status) {
  switch (status) {
    case "active":
      return "Account is active";
    case "banned":
      return "Account is banned";
    case "pending":
      return "Account is pending approval";
    default:
      return "Unknown status";
  }
}
```

**Explanation:** Returning directly from each `case` (instead of using `break`) is a common shortcut inside functions — since `return` exits the function immediately, no fall-through can happen.

**Key Points:**

- Inside a function, `return` inside each `case` naturally prevents fall-through (no `break` needed).
- Always include a `default` case for unexpected values.
- `switch` reads very cleanly for "status"/"mode"-driven logic.

## Recap

- `switch` compares one value against multiple exact `case`s using strict equality.
- Missing `break` causes fall-through — sometimes a bug, sometimes intentional.
- Use `switch` for exact-value matching; use `if/else if` for ranges and combined conditions.

## What's Next

Practice for today: `public/coding/JavaScript/day-017-while-and-do-while.md`. Day 18 covers the ternary operator and conditional logic patterns in more depth.
