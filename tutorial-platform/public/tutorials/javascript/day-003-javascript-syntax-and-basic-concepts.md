---
title: JavaScript Syntax and Basic Concepts
slug: day-003-javascript-syntax-and-basic-concepts
dayLabel: Day 3
level: Beginner
estimatedMinutes: 25
order: 3
track: javascript
---

# Day 3 [Beginner]: JavaScript Syntax and Basic Concepts

## Goal

Learn the small "grammar rules" of JavaScript — statements, expressions, comments, semicolons, and naming — so the code you write later doesn't accidentally break these basic rules.

## Prerequisites

- Day 1–2 (what JavaScript is, how to run it, first program)

## Explanation

Every language has grammar rules, and JavaScript is no different. A **statement** is one complete instruction (like "store this value" or "print this"). An **expression** is anything that produces a value (like `2 + 3`, which produces `5`). Most statements are built out of one or more expressions.

JavaScript also lets you leave notes for yourself using **comments** — text the computer ignores completely, meant only for humans reading the code.

Statements are usually separated by semicolons (`;`). JavaScript has a feature called **Automatic Semicolon Insertion (ASI)** that adds missing semicolons for you in most cases — but relying on it too much can cause confusing bugs, so it's best to add semicolons yourself.

Finally, JavaScript is **case-sensitive**: `myAge` and `myage` are two completely different variables. Following consistent **naming conventions** (like `camelCase`) keeps your code readable and avoids silly mistakes.

## Topic by Topic

### Topic 1: Statements vs Expressions

Theory:
An expression produces a value. A statement is a complete instruction, which may contain one or more expressions.

Practical:
When you're not sure if something is an expression, ask: "does this produce a value I could store or print?" If yes, it's an expression.

Code Example:

```js
// "5 + 3" is an expression - it produces the value 8
let total = 5 + 3; // this whole line is a statement
```

**Explanation:** `5 + 3` is the expression; `let total = 5 + 3;` is the full statement that stores that expression's result.

**Key Points:**

- Expression = produces a value (`5 + 3`, `"hi" + name`).
- Statement = a full instruction, often built from expressions.
- Most JavaScript programs are just a list of statements, run in order.

### Topic 2: Comments

Theory:
Comments are ignored by JavaScript entirely. They exist purely to explain your code to yourself or other developers later.

Practical:
Use `//` for a quick one-line note, and `/* ... */` for longer, multi-line explanations.

Code Example:

```js
// This is a single-line comment
let price = 100; // explains what this line does

/*
  This is a multi-line comment.
  Useful for longer explanations.
*/
```

**Explanation:** Comments don't affect how the program runs — they're purely for readability.

**Key Points:**

- `//` comments out the rest of the current line.
- `/* */` can span multiple lines.
- Good comments explain _why_, not just _what_ (the code already shows "what").

### Topic 3: Semicolons and Automatic Semicolon Insertion

Theory:
Semicolons mark the end of a statement. JavaScript can often figure out where a statement ends even without one (this is ASI), but it doesn't always guess correctly.

Practical:
Always add semicolons yourself at the end of statements — it removes any ambiguity and prevents rare but confusing bugs.

Code Example:

```js
let a = 5;
let b = 10;
console.log(a + b); // JavaScript works here due to ASI, but don't rely on it

let c = 5;
let d = 10;
console.log(c + d); // clearer and safer
```

**Explanation:** Both examples work, but the second is predictable and avoids the rare cases where ASI guesses wrong (e.g. with `return` statements split across lines).

**Key Points:**

- ASI exists as a safety net, not a style choice.
- Always type semicolons yourself — consistency avoids subtle bugs.
- This becomes especially important once you write `return` statements.

### Topic 4: Case Sensitivity and Naming Conventions

Theory:
JavaScript treats uppercase and lowercase letters as completely different characters in names. On top of that, the community follows shared naming conventions to keep code consistent.

Practical:
Use `camelCase` for variables and functions (`userName`, `calculateTotal`), and be descriptive rather than short and cryptic (`total` is better than `t`).

Code Example:

```js
let userName = "Asha";
let username = "different variable!"; // NOT the same as userName

console.log(userName); // Asha
console.log(username); // different variable!
```

**Explanation:** `userName` and `username` are two entirely separate variables because JavaScript is case-sensitive. Mixing this up is a very common beginner bug.

**Key Points:**

- JavaScript is case-sensitive: `Total` and `total` are different.
- Use `camelCase` for variables/functions (community standard).
- Use clear, descriptive names — future you will thank present you.

## Recap

- A statement is a complete instruction; an expression produces a value.
- Comments (`//`, `/* */`) are ignored by JavaScript, meant for humans.
- Always add your own semicolons instead of relying on ASI.
- JavaScript is case-sensitive — stick to consistent `camelCase` naming.

## What's Next

Practice for today: `public/coding/JavaScript/day-003-type-conversion.md`. Day 4 covers variables in depth — `var`, `let`, and `const`.
