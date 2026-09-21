---
title: Operators Part 2 - Comparison and Logical Operators
slug: day-008-operators-part-2
dayLabel: Day 8
level: Beginner
estimatedMinutes: 25
order: 8
track: javascript
---

# Day 8 [Beginner]: Operators Part 2 — Comparison and Logical Operators

## Goal

Master comparison operators (especially the difference between `==` and `===`) and logical operators, including short-circuit evaluation.

## Prerequisites

- Day 1–7 (data types, coercion, arithmetic operators)

## Explanation

**Comparison operators** (`> < >= <= == === != !==`) compare two values and produce a boolean result (`true`/`false`). The most important distinction: `==`/`!=` compare values **after** converting types if needed (loose comparison), while `===`/`!==` compare both **value and type** with no conversion (strict comparison).

**Logical operators** (`&& || !`) combine or invert boolean results. `&&` means "and" (both sides must be true), `||` means "or" (at least one side must be true), and `!` flips a value from true to false or vice versa.

**Short-circuit evaluation** means JavaScript stops evaluating as soon as the final result is already known — this is a subtle but powerful behavior used constantly in real code.

## Topic by Topic

### Topic 1: Comparison operators — `> < >= <=`

Theory:
These compare numeric or string order — is one value bigger, smaller, or equal to another.

Practical:
These work as expected for numbers, and also compare strings alphabetically (based on character codes).

Code Example:

```js
console.log(10 > 5); // true
console.log(10 <= 10); // true
console.log("apple" < "banana"); // true (alphabetical comparison)
```

**Explanation:** Numbers compare by value; strings compare character by character based on their character codes, which usually lines up with alphabetical order for simple cases.

**Key Points:**

- `> < >= <=` work on numbers and strings.
- String comparison is based on character codes (mostly matches alphabetical order for same-case letters).
- Comparing values of very different types can give confusing results — convert explicitly first if unsure.

### Topic 2: `==` vs `===` (the most important distinction)

Theory:
`==` (loose equality) converts types before comparing. `===` (strict equality) compares both value and type, with zero conversion.

Practical:
Always prefer `===` (and `!==`) in real code — it avoids the silent, sometimes surprising conversions that `==` performs.

Code Example:

```js
console.log(5 == "5"); // true  - "5" is converted to 5 first
console.log(5 === "5"); // false - different types, no conversion, so not equal
console.log(0 == false); // true  - false converts to 0
console.log(0 === false); // false - different types
```

**Explanation:** `==` tries to make both sides the same type before comparing, which can produce results beginners don't expect. `===` never does this — what you see is exactly what gets compared.

**Key Points:**

- `==` compares after converting types (loose).
- `===` compares value AND type, no conversion (strict).
- Default to `===`/`!==` everywhere unless you have a specific, well-understood reason to use `==`.

### Topic 3: Logical operators — `&& || !`

Theory:
`&&` (AND) is true only if both sides are true. `||` (OR) is true if at least one side is true. `!` (NOT) flips a boolean.

Practical:
These combine multiple conditions into one, which is essential for real-world validation logic (like login forms).

Code Example:

```js
let age = 20;
let hasId = true;

console.log(age >= 18 && hasId); // true - both conditions true
console.log(age >= 18 || hasId); // true - at least one true
console.log(!hasId); // false - flips true to false
```

**Explanation:** `&&` requires everything to check out; `||` only needs one thing to check out; `!` simply reverses a boolean value.

**Key Points:**

- `&&` = both must be true.
- `||` = at least one must be true.
- `!` = flips true/false.

### Topic 4: Short-circuit evaluation

Theory:
JavaScript evaluates logical expressions left to right and stops as soon as the result is already certain — this is called short-circuiting.

Practical:
`someValue || "default"` is a common shortcut for "use `someValue` if it's truthy, otherwise fall back to `default`."

Code Example:

```js
function greet(name) {
  console.log("Hello, " + (name || "Guest"));
}

greet("Anita"); // Hello, Anita
greet(); // Hello, Guest (name is undefined -> falsy -> fallback used)
```

**Explanation:** Since `name` is falsy (`undefined`) in the second call, `||` short-circuits to the fallback value `"Guest"` without needing any `if` statement.

**Key Points:**

- `a || b` returns `a` if `a` is truthy, otherwise returns `b`.
- `a && b` returns `b` if `a` is truthy, otherwise returns `a` (without ever evaluating `b`).
- Short-circuiting is why `someCondition && doSomething()` safely skips calling `doSomething()` when `someCondition` is falsy.

## Recap

- `== / !=` convert types before comparing; `=== / !==` compare value and type exactly — prefer the strict versions.
- `&&` needs both sides true, `||` needs at least one, `!` flips a boolean.
- Short-circuit evaluation lets `||` provide fallback values and `&&` conditionally run code.

## What's Next

Practice for today: `public/coding/JavaScript/day-008-ternary-and-switch.md`. Day 9 covers modern operators — ternary, nullish coalescing, and optional chaining.
