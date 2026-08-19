---
title: Arrays, Objects and Strings
slug: day-004-arrays-objects-and-strings
dayLabel: Day 4
level: Beginner
estimatedMinutes: 40
order: 4
track: javascript
---

# Day 4 [Beginner]: Arrays, Objects and Strings

## Goal

Work with common JavaScript data structures: arrays, objects, and strings.

## Topic by Topic

### Topic 1: Arrays

```js
const numbers = [10, 20, 30, 40];
console.log(numbers[0]);
console.log(numbers.length);
```

### Topic 2: Array Methods

```js
const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
console.log(doubled);
```

### Topic 3: Objects

```js
const user = {
  name: "Neha",
  age: 26,
  city: "Bengaluru",
};

console.log(user.name);
```

### Topic 4: String Methods

```js
const text = "JavaScript is great";
console.log(text.toUpperCase());
console.log(text.includes("Script"));
```

## Coding Questions

#### Q1. Remove duplicate values from an array.
```js
const arr = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(arr)];
console.log(unique);
```

#### Q2. Find the sum of all numbers in an array.
```js
const arr = [5, 10, 15, 20];
const sum = arr.reduce((total, item) => total + item, 0);
console.log(sum); // 50
```

#### Q3. Sort an array in ascending order.
```js
const arr = [9, 4, 7, 2];
console.log(arr.sort((a, b) => a - b));
```

#### Q4. Create an object and destructure it.
```js
const student = { name: "Asha", marks: 88 };
const { name, marks } = student;
console.log(name, marks);
```

## Interview Questions

### Q1. What is the difference between `map` and `forEach`?
**Answer:**
- `map` returns a new array.
- `forEach` only loops and does not return a new array.

### Q2. What is object destructuring?
**Answer:** It allows extracting values from an object into variables in a simple way.

### Q3. How do you reverse a string?
```js
const str = "hello";
console.log(str.split("").reverse().join(""));
```

## Practice Task

- Write a function to find the largest number in an array.
- Write a function to count vowels in a string.
- Write an object with employee details and print them.

## Day 4 Outcome

You should be able to store data in arrays and objects, manipulate strings, and solve common basic interview questions related to them.
