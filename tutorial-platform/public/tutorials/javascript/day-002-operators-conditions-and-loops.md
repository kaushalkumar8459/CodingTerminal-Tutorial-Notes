---
title: Operators, Conditions and Loops
slug: day-002-operators-conditions-and-loops
dayLabel: Day 2
level: Beginner
estimatedMinutes: 35
order: 2
track: javascript
---

# Day 2 [Beginner]: Operators, Conditions and Loops

## Goal

Learn how JavaScript makes decisions and repeats work using operators, conditions, and loops.

## Topic by Topic

### Topic 1: Arithmetic and Comparison Operators

```js
const a = 10;
const b = 5;

console.log(a + b);
console.log(a > b);
console.log(a === b);
```

### Topic 2: Logical Operators

```js
const isAdult = true;
const hasID = true;

console.log(isAdult && hasID);
console.log(isAdult || hasID);
```

### Topic 3: Conditional Statements

```js
const score = 85;

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 75) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}
```

### Topic 4: Switch Statement

```js
const day = 2;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Other day");
}
```

### Topic 5: Loops

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let j = 1;
while (j <= 3) {
  console.log(j);
  j++;
}
```

## Coding Questions

#### Q1. Write a program to check whether a number is even or odd.
```js
const num = 7;
console.log(num % 2 === 0 ? "Even" : "Odd");
```

#### Q2. Write a program to print the largest of 3 numbers.
```js
const a = 12;
const b = 8;
const c = 20;

const max = a > b ? (a > c ? a : c) : (b > c ? b : c);
console.log(max);
```

#### Q3. Print numbers from 1 to 10 using a for loop.
```js
for (let i = 1; i <= 10; i++) {
  console.log(i);
}
```

#### Q4. Find the sum of numbers from 1 to 100.
```js
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum += i;
}
console.log(sum);
```

## Interview Questions

### Q1. What is the difference between `==` and `===`?
**Answer:**
- `==` compares values with type coercion.
- `===` compares both value and type.

### Q2. What is short-circuit evaluation?
**Answer:** JS stops evaluating when the result is already known:
```js
console.log(false && "hello");
console.log(true || "hello");
```

## Practice Task

Write a small program that checks:
- if age >= 18 => adult
- else minor
- and prints a message using `if/else`.

## Day 2 Outcome

You should now be able to use operators, write conditional logic, and use loops to repeat logic in JavaScript.
