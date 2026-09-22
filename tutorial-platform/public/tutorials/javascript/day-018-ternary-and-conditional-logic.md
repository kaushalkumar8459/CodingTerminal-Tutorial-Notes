---
title: Ternary and Conditional Logic
slug: day-018-ternary-and-conditional-logic
dayLabel: Day 18
level: Beginner
estimatedMinutes: 25
order: 18
track: javascript
---

# Day 18 [Beginner]: Ternary and Conditional Logic

## Goal

Go deeper into the ternary operator, understand nested ternaries (and their risks), and compare ternary vs `if`/`else` for real decisions.

## Prerequisites

- Day 9 (intro to ternary), Day 16–17 (`if`/`switch`)

## Explanation

The ternary operator (`condition ? valueIfTrue : valueIfFalse`) was introduced briefly on Day 9. Today we go further: using it for conditional assignment, understanding nested ternaries, and knowing exactly when it helps readability versus when it hurts it.

**Conditional assignment** means using a ternary directly when declaring or updating a variable, instead of writing a separate `if/else` block just to set one value. **Nested ternaries** (a ternary inside another ternary) can express multiple outcomes in one line, but they get hard to read fast — use them sparingly.

## Topic by Topic

### Topic 1: Ternary for conditional assignment

Theory:
A ternary is an expression, so it can be used directly wherever a value is expected — including variable assignment.

Code Example:

```js
let age = 16;
let ticketPrice = age < 18 ? 50 : 100;
console.log(ticketPrice); // 50
```

**Explanation:** Instead of a 5-line `if/else` block just to set `ticketPrice`, one line handles it directly.

**Key Points:**

- Ternaries are ideal when the only goal is to pick one of two values.
- They keep simple assignment logic compact and readable.
- If the branches involve more than a single value/expression each, prefer `if/else`.

### Topic 2: Nested ternaries

Theory:
You can chain ternaries to check more than one condition, but each added layer makes the line harder to read.

Code Example:

```js
let marks = 82;

let grade = marks >= 90 ? "A" : marks >= 75 ? "B" : marks >= 60 ? "C" : "F";
console.log(grade); // B
```

**Explanation:** This nested ternary checks conditions in sequence, just like an `else if` chain, but crammed into one line — functionally correct, but noticeably harder to scan than the `if/else if` version from Day 16.

**Key Points:**

- Nested ternaries work but reduce readability quickly past 2 conditions.
- Prefer `if/else if` or `switch` once logic has more than 2–3 branches.
- If you do use a nested ternary, consider adding line breaks for clarity.

### Topic 3: Ternary vs `if`/`else`

Theory:
Both can express the same either/or logic — the right choice depends on what you're doing with the result.

Code Example:

```js
// Good use of ternary - producing a value
const status = isOnline ? "Online" : "Offline";

// Better as if/else - running multiple different actions, not just producing a value
if (isOnline) {
  connectToServer();
  showGreenDot();
} else {
  showOfflineMessage();
}
```

**Explanation:** The first case only needs to _pick a value_ — perfect for ternary. The second case needs to _run multiple different actions_ per branch — a ternary can't clearly express that, so `if/else` is the right tool.

**Key Points:**

- Ternary: good when you need to produce/assign a single value.
- `if/else`: good when each branch needs to run different actions/statements.
- Don't force a ternary just to save lines if it hurts clarity.

### Topic 4: Practical conditional patterns

Theory:
Combining ternaries with template literals and function calls is a common, clean pattern in real UI code.

Code Example:

```js
function describeStock(quantity) {
  return `Status: ${quantity > 0 ? "In Stock" : "Out of Stock"}`;
}

console.log(describeStock(5)); // Status: In Stock
console.log(describeStock(0)); // Status: Out of Stock
```

**Explanation:** The ternary is embedded directly inside a template literal, producing a dynamic message in a single, readable line.

**Key Points:**

- Ternaries combine naturally with template literals for dynamic text.
- This pattern shows up constantly in real applications (labels, badges, status text).
- Readability is still the deciding factor — if it's hard to read at a glance, simplify it.

## Recap

- Ternaries are great for conditional assignment — picking one of two values.
- Nested ternaries work but should be used sparingly; prefer `if/else if` beyond 2 branches.
- Choose ternary for producing values, `if/else` for running different actions per branch.

## What's Next

Practice for today: `public/coding/JavaScript/day-018-break-and-continue.md`. Day 19 covers the `for` loop in depth.
