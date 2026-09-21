---
title: JavaScript Data Types
slug: day-005-javascript-data-types
dayLabel: Day 5
level: Beginner
estimatedMinutes: 30
order: 5
track: javascript
---

# Day 5 [Beginner]: JavaScript Data Types

## Goal

Learn every core JavaScript data type, the difference between primitive and non-primitive types, and how to check a value's type using `typeof`.

## Prerequisites

- Day 1–4 (execution basics, syntax, variables)

## Explanation

Every value in JavaScript has a **type**. Types are split into two groups:

- **Primitive types** — simple, single values that can't be broken down further: `String`, `Number`, `Boolean`, `Undefined`, `Null`, `BigInt`, `Symbol`.
- **Non-primitive (reference) types** — more complex structures that group multiple values together: `Object` (which includes arrays and functions).

The key practical difference (covered in depth on Day 50) is that primitives are copied by value, while objects are copied by reference. For now, focus on recognizing each type.

`typeof` is the tool you use to check a value's type at any time. It's extremely useful while learning and while debugging real code.

## Topic by Topic

### Topic 1: Primitive vs non-primitive types

Theory:
Primitives hold a single simple value. Non-primitives (objects) hold collections of values and/or behavior (methods).

Practical:
If a value can be written directly like `"hello"`, `42`, or `true`, it's primitive. If it needs `{ }` or `[ ]` to hold multiple things, it's an object.

Code Example:

```js
let age = 25; // primitive - Number
let name = "Meera"; // primitive - String
let user = { age, name }; // non-primitive - Object (groups values together)
```

**Explanation:** `age` and `name` are simple single values. `user` is an object that groups several values under one variable.

**Key Points:**

- Primitives: String, Number, Boolean, Undefined, Null, BigInt, Symbol.
- Non-primitives: Object (and arrays/functions, which are technically objects too).
- Objects can hold multiple primitives (and other objects) inside them.

### Topic 2: The primitive types in detail

Theory:
Each primitive type represents a different kind of simple data: text (`String`), numbers (`Number`), true/false (`Boolean`), "no value assigned yet" (`Undefined`), "intentionally empty" (`Null`), very large integers (`BigInt`), and unique identifiers (`Symbol`).

Practical:
`undefined` usually means "JavaScript hasn't been given a value yet." `null` usually means "a developer deliberately set this to empty." They look similar but mean different things.

Code Example:

```js
let city; // undefined - not yet assigned
let middleName = null; // null - intentionally set to "nothing"
let price = 499.99; // Number
let isActive = true; // Boolean
let bigNumber = 123456789123456789n; // BigInt (note the "n")
```

**Explanation:** `city` was never given a value, so JavaScript automatically gives it `undefined`. `middleName` was deliberately set to `null` by the developer to represent "no value on purpose."

**Key Points:**

- `undefined` = JavaScript's default "nothing here yet."
- `null` = a value a developer chose, meaning "empty on purpose."
- `BigInt` (numbers with `n` at the end) is for integers too large for the regular `Number` type.

### Topic 3: Object — the non-primitive type

Theory:
Objects group related values (and even functions) together under one variable, using `{ key: value }` pairs. Arrays are a special kind of object for ordered lists.

Practical:
Use an object whenever a single value isn't enough to represent something — like a "user" who has a name, age, and email all together.

Code Example:

```js
const user = {
  name: "Kabir",
  age: 28,
  isMember: true,
};

const colors = ["red", "green", "blue"]; // an array - also an object type
```

**Explanation:** `user` groups three related pieces of data. `colors` is an ordered list — arrays are objects specialized for storing sequences of items.

**Key Points:**

- Objects use `{ key: value }` pairs to group related data.
- Arrays (`[ ]`) are a special type of object, used for ordered lists.
- We'll cover objects and arrays in much more depth starting Module 3.

### Topic 4: Checking types with `typeof`

Theory:
`typeof` returns a string describing what kind of value you're looking at. It's the standard way to check a value's type at runtime.

Practical:
`typeof` is extremely handy while debugging — if something isn't behaving as expected, checking its type is often the first step.

Code Example:

```js
console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (a well-known historical quirk!)
console.log(typeof 10n); // "bigint"
console.log(typeof Symbol()); // "symbol"
console.log(typeof {}); // "object"
```

**Explanation:** Every type has a matching `typeof` result — except `null`, which famously (and confusingly) returns `"object"` due to a decades-old bug in JavaScript's original design that was never fixed, to avoid breaking old code.

**Key Points:**

- `typeof` is your go-to tool for checking a value's type.
- Memorize the one big exception: `typeof null === "object"`.
- Arrays also return `"object"` from `typeof` — use `Array.isArray()` if you specifically need to check for arrays (covered later).

## Recap

- Primitive types: String, Number, Boolean, Undefined, Null, BigInt, Symbol.
- Non-primitive type: Object (includes arrays and functions).
- `typeof` checks a value's type — remember the `null` quirk.

## What's Next

Practice for today: `public/coding/JavaScript/day-005-comparison-operators.md`. Day 6 covers type conversion and coercion in depth.
