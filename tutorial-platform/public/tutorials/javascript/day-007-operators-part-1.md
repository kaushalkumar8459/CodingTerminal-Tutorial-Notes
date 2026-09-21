---
title: Operators Part 1 - Arithmetic, Assignment and Unary
slug: day-007-operators-part-1
dayLabel: Day 7
level: Beginner
estimatedMinutes: 25
order: 7
track: javascript
---

# Day 7 [Beginner]: Operators Part 1 — Arithmetic, Assignment and Unary

## Goal

Get comfortable with arithmetic operators, assignment operators, increment/decrement, unary operators, and how operator precedence decides the order calculations happen in.

## Prerequisites

- Day 1–6 (variables, data types, conversion, truthy/falsy)

## Explanation

**Arithmetic operators** (`+ - * / % **`) perform math. **Assignment operators** (`= += -= *= /=`) store or update a variable's value — often combining an operation with assignment in one step. **Increment/decrement** (`++`/`--`) add or subtract 1 from a variable — a very common pattern in loops. **Unary operators** act on a single value (like `-x` to make a number negative, or `+x` to convert a value to a number).

When an expression has multiple operators, JavaScript follows **operator precedence** rules to decide what runs first — very similar to the "PEMDAS/BODMAS" math rules you learned in school (multiplication/division before addition/subtraction).

## Topic by Topic

### Topic 1: Arithmetic operators

Theory:
`+ - * / % **` perform addition, subtraction, multiplication, division, remainder (modulo), and exponentiation.

Practical:
`%` (modulo) is especially useful for checking even/odd numbers, and for "wrapping around" values (like clock hours).

Code Example:

```js
console.log(10 + 3); // 13
console.log(10 % 3); // 1  - remainder of 10 / 3
console.log(2 ** 4); // 16 - 2 to the power of 4
```

**Explanation:** `%` returns what's "left over" after division — useful for even/odd checks (`n % 2 === 0`) and cyclical patterns.

**Key Points:**

- `%` gives the remainder, not the quotient.
- `**` is the modern way to write exponentiation (instead of `Math.pow()`).
- Division `/` always returns a decimal if the numbers don't divide evenly.

### Topic 2: Assignment operators

Theory:
`=` assigns a value. Compound assignment operators (`+= -= *= /=`) combine an operation with assignment in a single step.

Practical:
`total += 10` is shorthand for `total = total + 10` — very common when updating a running value, like a cart total or a counter.

Code Example:

```js
let total = 100;
total += 50; // same as: total = total + 50
console.log(total); // 150

total -= 20; // total = total - 20
console.log(total); // 130
```

**Explanation:** Compound assignment operators shorten a very common pattern: "take the current value, change it, and store it back."

**Key Points:**

- `+= -= *= /=` all update-and-reassign in one step.
- These are just shorthand — `total += 50` and `total = total + 50` do exactly the same thing.
- You'll use these constantly, especially inside loops.

### Topic 3: Increment and decrement

Theory:
`++` increases a variable by 1; `--` decreases it by 1. Both can be written before (`++x`) or after (`x++`) the variable, with a subtle difference in what value is returned.

Practical:
`x++` ("post-increment") returns the value _before_ incrementing; `++x` ("pre-increment") returns the value _after_. When used on its own line, both behave the same in practice.

Code Example:

```js
let count = 5;
count++;
console.log(count); // 6

let a = 5;
console.log(a++); // 5 (prints old value, THEN increments)
console.log(a); // 6

let b = 5;
console.log(++b); // 6 (increments FIRST, then prints)
```

**Explanation:** When you only care about the end result (like in a loop), the pre/post distinction rarely matters. It matters only when you use the increment _inside_ another expression on the same line.

**Key Points:**

- `x++`/`x--` = post (returns old value, then updates).
- `++x`/`--x` = pre (updates first, then returns new value).
- On its own line, both have the same final effect on the variable.

### Topic 4: Unary operators and operator precedence

Theory:
Unary operators act on one value: `-x` negates a number, `+x` converts a value to a number. Operator precedence decides which operator runs first when several appear in one expression.

Practical:
When you're unsure of the order operations run in, use parentheses `()` — they always run first and make your intention explicit to any reader.

Code Example:

```js
console.log(+"42"); // 42 (unary + converts string to number)
console.log(-"42"); // -42

console.log(2 + 3 * 4); // 14 - multiplication runs before addition
console.log((2 + 3) * 4); // 20 - parentheses run first
```

**Explanation:** `*` has higher precedence than `+`, so it runs first unless parentheses say otherwise. This mirrors the math order-of-operations rules you already know.

**Key Points:**

- Unary `+` is a quick way to convert a string to a number.
- `* / %` run before `+ -` unless parentheses change the order.
- When in doubt, add parentheses — it costs nothing and removes all ambiguity.

## Recap

- Arithmetic operators do math; `%` gives the remainder, `**` does exponentiation.
- Compound assignment (`+= -= *= /=`) updates and reassigns in one step.
- `++`/`--` increment/decrement by 1; pre vs post matters only inline.
- Operator precedence follows familiar math rules — use `()` when unsure.

## What's Next

Practice for today: `public/coding/JavaScript/day-007-conditional-practice.md`. Day 8 covers comparison and logical operators in depth.
