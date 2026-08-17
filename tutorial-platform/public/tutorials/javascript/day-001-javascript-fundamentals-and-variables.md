---
title: JavaScript Fundamentals and Variables
slug: day-001-javascript-fundamentals-and-variables
dayLabel: Day 1
level: Beginner
estimatedMinutes: 30
order: 1
track: javascript
---

# Day 1 [Beginner]: JavaScript Fundamentals and Variables

## Goal

Understand JavaScript basics, how variables work, and how to write simple clean code.

## What is JavaScript?

JavaScript is a scripting language that runs in the browser and also on the server with Node.js. It helps us:

- make web pages interactive
- validate forms
- update page content
- work with APIs
- build frontend apps

## Topic by Topic

### Topic 1: Variables and Data Types

```js
let name = "Amit";
const age = 25;
var city = "Pune";
```

**Explanation:**
- `let` is block scoped
- `const` is also block scoped but not reassignable
- `var` is older and function scoped

### Topic 2: Primitive Data Types

```js
const a = "hello";
const b = 10;
const c = true;
const d = null;
const e = undefined;
const f = Symbol("id");
```

**Key Points:**
- string
- number
- boolean
- null
- undefined
- symbol
- bigint

### Topic 3: Type Conversion

```js
let x = "5";
let y = Number(x);
console.log(y + 2); // 7
```

### Topic 4: Interview Questions and Coding Practice

#### Q1. What is the difference between `var`, `let`, and `const`?
**Answer:**
- `var` is function-scoped and can be redeclared.
- `let` is block-scoped.
- `const` is block-scoped and cannot be reassigned.

#### Q2. Write a program to print the type of a variable.
```js
const value = 42;
console.log(typeof value); // number
```

#### Q3. Write code to swap two numbers without using a third variable.
```js
let a = 10;
let b = 20;

a = a + b;
b = a - b;
a = a - b;

console.log(a, b); // 20 10
```

#### Q4. What is `null` vs `undefined`?
**Answer:**
- `undefined` means a variable is declared but no value is assigned.
- `null` is assigned intentionally to mean empty.

## Practice Tasks

1. Create variables for name, age, and city.
2. Print them in one sentence using template literals.
3. Check types using `typeof`.
4. Write a small script to convert a string into a number.

## Mini Exercise

```js
const firstName = "Riya";
const lastName = "Sharma";
const age = 27;

console.log(`My name is ${firstName} ${lastName} and I am ${age} years old.`);
```

## Day 1 Outcome

You should now understand JavaScript basics, variable declarations, data types, and type conversion.
