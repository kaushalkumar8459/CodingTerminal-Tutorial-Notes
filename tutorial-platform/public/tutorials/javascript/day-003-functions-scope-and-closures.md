---
title: Functions, Scope and Closures
slug: day-003-functions-scope-and-closures
dayLabel: Day 3
level: Beginner
estimatedMinutes: 40
order: 3
track: javascript
---

# Day 3 [Beginner]: Functions, Scope and Closures

## Goal

Understand how functions are created, how scope works, and why closures are important.

## Topic by Topic

### Topic 1: Function Basics

```js
function greet(name) {
  return `Hello ${name}!`;
}

console.log(greet("Ravi"));
```

### Topic 2: Function Expressions and Arrow Functions

```js
const add = (a, b) => a + b;
console.log(add(2, 3));
```

### Topic 3: Scope

```js
let globalValue = "global";

function test() {
  let localValue = "local";
  console.log(globalValue);
  console.log(localValue);
}
```

### Topic 4: Closures

```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter());
console.log(counter());
```

## Coding Questions

#### Q1. Write a function to check if a number is prime.
```js
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log(isPrime(11)); // true
```

#### Q2. Write a function to return factorial of a number.
```js
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

#### Q3. Write a function that returns a counter.
```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
```

### Interview Questions

#### Q1. What is a closure?
**Answer:** A closure is a function that remembers variables from its parent scope even after that function finishes executing.

#### Q2. What is the difference between a normal function and an arrow function?
**Answer:** Arrow functions do not have their own `this`, and they are shorter in syntax. Normal functions have their own `this` binding.

## Practice Task

Create a function `multiplyByTwo` and return a function that multiplies a number by 2.

## Day 3 Outcome

You should understand function declarations, parameters, returns, scope rules, and the concept of closures.
