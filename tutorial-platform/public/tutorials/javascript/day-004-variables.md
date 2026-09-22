---
title: Variables - var, let and const
slug: day-004-variables
dayLabel: Day 4
level: Beginner
estimatedMinutes: 30
order: 4
track: javascript
---

# Day 4 [Beginner]: Variables — var, let and const

## Goal

Understand what variables are, the three ways to declare them (`var`, `let`, `const`), and when to use each one.

## Prerequisites

- Day 1–3 (basic JavaScript syntax and execution)

## Explanation

A variable is simply a labeled container that holds a value, so you can use that value again later without retyping it. JavaScript gives you three keywords to create variables: `var` (the old way), and `let`/`const` (the modern way, introduced in ES6/2015).

**Declaration** means creating the variable name. **Initialization** means giving it a starting value. **Reassignment** means changing the value later. **Redeclaration** means declaring the same variable name again in the same scope.

`var` allows redeclaration and has some confusing scoping behavior (covered in more depth on Day 48). `let` allows reassignment but not redeclaration in the same scope. `const` allows neither reassignment nor redeclaration — once set, it stays set. In modern JavaScript, the practical rule is: **use `const` by default, and only use `let` when you know the value must change.** Avoid `var` entirely in new code.

## Topic by Topic

### Topic 1: Declaring variables

Theory:
Declaring a variable means telling JavaScript "this name exists." You can declare with or without giving it a value right away.

Practical:
Always declare a variable before using it — using an undeclared variable causes errors in modern JavaScript.

Code Example:

```js
let city; // declared, no value yet (currently undefined)
city = "Mumbai"; // now initialized

const country = "India"; // declared and initialized together
```

**Explanation:** `let` can be declared first and given a value later. `const` must be given a value the moment it's declared, since it can never be reassigned.

**Key Points:**

- Declaration = creating the name. Initialization = giving it a first value.
- `let` can be declared without a value; `const` cannot.
- An uninitialized `let` variable holds `undefined` until assigned.

### Topic 2: Reassignment and redeclaration

Theory:
Reassignment changes a variable's value. Redeclaration creates the variable again with the same name in the same scope — which is not always allowed.

Practical:
Use `let` when a value will change over time (like a counter). Use `const` when it won't (like a name or a fixed setting).

Code Example:

```js
let score = 10;
score = 20; // reassignment - allowed with let

const maxScore = 100;
// maxScore = 200; // Error! const cannot be reassigned

let score = 30; // Error! cannot redeclare "score" with let in the same scope
```

**Explanation:** `let` allows changing the value but not re-declaring the same name again in the same scope. `const` allows neither.

**Key Points:**

- `let` → reassignment allowed, redeclaration not allowed (same scope).
- `const` → neither reassignment nor redeclaration allowed.
- Trying to reassign a `const` throws a `TypeError`.

### Topic 3: `var` and why it's avoided today

Theory:
`var` is the original way to declare variables. It allows both reassignment and redeclaration, and its scoping rules (function-scoped, not block-scoped) often cause confusing bugs.

Practical:
You'll see `var` in older code and tutorials, but for new code, prefer `let`/`const` — they behave more predictably.

Code Example:

```js
var name = "Ravi";
var name = "Priya"; // allowed - no error, even though this often hides bugs

if (true) {
  var leaked = "I'm visible outside this block!";
}
console.log(leaked); // works - var ignores block scope (surprising!)
```

**Explanation:** `var` "leaking" outside of `if`/`for` blocks is a classic source of bugs. `let`/`const` don't have this problem — they respect block boundaries.

**Key Points:**

- `var` can be redeclared silently — easy to introduce bugs without noticing.
- `var` ignores block scope (`{ }`), which `let`/`const` respect.
- Modern JavaScript style avoids `var` entirely.

### Topic 4: `var` vs `let` vs `const` — choosing the right one

Theory:
The modern rule of thumb: default to `const`. Switch to `let` only if you know the variable's value needs to change. Avoid `var` altogether.

Practical:
This one habit — "start with `const`, upgrade to `let` only when needed" — prevents a huge number of accidental-reassignment bugs.

Code Example:

```js
const taxRate = 0.18; // never changes -> const
let cartTotal = 0; // will change as items are added -> let
cartTotal = cartTotal + 500;
```

**Explanation:** `taxRate` is fixed for the whole program, so `const` protects it from accidental changes. `cartTotal` needs to change, so `let` is appropriate.

**Key Points:**

- Default to `const`; use `let` only when reassignment is genuinely needed.
- Avoid `var` in new code — it exists mainly for backward compatibility.
- Choosing the right keyword is a form of documentation — it tells readers whether a value is expected to change.

## Recap

- Variables store values so you can reuse them; `let`/`const` are the modern way to declare them.
- `let` = reassignable, not redeclarable. `const` = neither. `var` = both, but avoid it.
- Default to `const`; use `let` only when the value must change.

## What's Next

Practice for today: `public/coding/JavaScript/day-004-arithmetic-operators.md`. Day 5 covers JavaScript's data types in depth.
