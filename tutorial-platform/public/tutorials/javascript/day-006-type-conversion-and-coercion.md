---
title: Type Conversion and Coercion
slug: day-006-type-conversion-and-coercion
dayLabel: Day 6
level: Beginner
estimatedMinutes: 30
order: 6
track: javascript
---

# Day 6 [Beginner]: Type Conversion and Coercion

## Goal

Understand the difference between converting types on purpose (explicit conversion) and JavaScript converting types automatically behind the scenes (implicit conversion / coercion) — plus truthy/falsy values.

## Prerequisites

- Day 1–5 (variables, data types, typeof)

## Explanation

**Explicit conversion** is when _you_ deliberately change a value's type using functions like `String()`, `Number()`, or `Boolean()`. **Implicit conversion** (also called **coercion**) is when _JavaScript itself_ automatically converts a type behind the scenes — often during operations like `+` or comparisons.

Coercion is one of the most common sources of confusing bugs for beginners, because it happens silently. Understanding it well means fewer surprises later.

JavaScript also treats every value as either **truthy** or **falsy** when used in a condition (like inside an `if`). There are only a handful of falsy values, and everything else is truthy.

## Topic by Topic

### Topic 1: Explicit conversion

Theory:
Explicit conversion means you intentionally convert a value's type using a built-in function.

Practical:
Use `String()`, `Number()`, and `Boolean()` whenever you need a guaranteed type — don't rely on JavaScript to guess correctly.

Code Example:

```js
let age = Number("25"); // "25" -> 25
let ageText = String(25); // 25 -> "25"
let isValid = Boolean("hi"); // "hi" -> true (non-empty strings are truthy)
```

**Explanation:** Each function converts its input into the target type explicitly, so there's no ambiguity about what type you end up with.

**Key Points:**

- `String(value)`, `Number(value)`, `Boolean(value)` are explicit — you're in control.
- Explicit conversion makes your intentions clear to anyone reading the code.
- Prefer explicit conversion whenever type matters for correctness (like math or storage).

### Topic 2: Implicit conversion (coercion)

Theory:
Coercion happens automatically when JavaScript needs values of matching types to perform an operation, like `+` or `==`.

Practical:
The `+` operator is especially tricky: if either side is a string, JavaScript converts the other side to a string too and joins them, instead of adding numbers.

Code Example:

```js
console.log("5" + 3); // "53" - number 3 becomes a string, then joined
console.log("5" - 3); // 2   - "-" only works with numbers, so "5" becomes 5
console.log("5" * "2"); // 10  - both sides coerced to numbers
```

**Explanation:** `+` behaves differently than `- * /` because `+` is also used for joining strings, so JavaScript prioritizes string conversion when a string is present. `- * /` have no string meaning, so JavaScript converts both sides to numbers instead.

**Key Points:**

- `+` with a string on either side triggers string concatenation, not addition.
- `- * /` always try to convert operands to numbers.
- When in doubt, convert types explicitly first, then do the operation.

### Topic 3: NaN and Infinity

Theory:
`NaN` ("Not a Number") is a special value returned when a numeric operation fails to produce a real number. `Infinity` represents a number too large to represent, often from dividing by zero.

Practical:
Always check for `NaN` after converting user input, since invalid input often silently becomes `NaN` instead of throwing an error.

Code Example:

```js
console.log(Number("abc")); // NaN
console.log(10 / 0); // Infinity
console.log(-10 / 0); // -Infinity
console.log(Number.isNaN(Number("abc"))); // true
```

**Explanation:** `NaN` doesn't throw an error — it silently appears, which is why explicitly checking for it with `Number.isNaN()` is important in real programs.

**Key Points:**

- `NaN` means "this was supposed to be a number, but isn't."
- `Number.isNaN(value)` is the reliable way to check for it (avoid the old global `isNaN()`, which coerces first).
- `Infinity`/`-Infinity` show up from division by zero or overflowing numeric limits.

### Topic 4: Truthy and falsy values

Theory:
Every JavaScript value is treated as either truthy or falsy when used somewhere a boolean is expected, like an `if` condition. There are only 6 falsy values — everything else is truthy.

Practical:
Memorize the falsy list: `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`. Everything else — including `"0"` (a string!) and empty arrays/objects — is truthy.

Code Example:

```js
if ("") {
  console.log("This will NOT run - empty string is falsy");
}

if ("0") {
  console.log("This WILL run - non-empty string is truthy, even '0'!");
}

if ([]) {
  console.log("This WILL run - empty arrays are truthy!");
}
```

**Explanation:** Beginners often assume `"0"` or `[]` are falsy because they "look empty," but only the 6 specific falsy values behave that way — everything else, including these, is truthy.

**Key Points:**

- Falsy values: `false, 0, "", null, undefined, NaN` — that's the complete list.
- Everything else, including `"0"`, `[]`, and `{}`, is truthy.
- Truthy/falsy checks show up constantly in `if` statements and default-value patterns.

## Recap

- Explicit conversion = you convert on purpose (`String()`, `Number()`, `Boolean()`).
- Implicit conversion (coercion) = JavaScript converts automatically, especially with `+`.
- `NaN` means a numeric operation failed; check it with `Number.isNaN()`.
- Only 6 falsy values exist — everything else is truthy.

## What's Next

Practice for today: `public/coding/JavaScript/day-006-logical-operators.md`. Day 7 starts operators in depth — arithmetic, assignment, and precedence.
