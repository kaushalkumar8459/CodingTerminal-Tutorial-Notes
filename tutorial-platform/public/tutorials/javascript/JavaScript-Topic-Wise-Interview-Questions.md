---
title: JavaScript Topic Wise Interview Questions
author: CodingTerminal
description: Topic-wise JavaScript question bank from basic to advanced level for startup to MNC interviews
slug: javascript-topic-wise-interview-questions
level: Beginner to Advanced
estimatedMinutes: 60
order: 1
track: javascript
---

# JavaScript Topic Wise Interview Questions and Answers

This is the first version of our JavaScript question bank. We keep all questions grouped by topic in a single document, so learners can study one concept at a time and then move into deeper basic-to-advanced practice.

This material is designed for:

- Beginners preparing for JavaScript basics
- Frontend developers preparing for interviews
- Startup-level coding rounds
- Mid-level and MNC technical rounds
- Real-world JavaScript problem solving

---

## 1. JavaScript Fundamentals

### Q1. What is JavaScript and where is it used?
**Answer:** JavaScript is a lightweight, high-level programming language mainly used for web development. It is used to make webpages interactive, handle user events, update DOM, fetch APIs, and build modern frontend applications. It is also used in Node.js for backend development, CLI tools, and automation.

### Q2. What is the difference between `var`, `let`, and `const`?
**Answer:**
- `var` is function-scoped and can be re-declared.
- `let` is block-scoped and cannot be re-declared in the same scope.
- `const` is block-scoped and cannot be reassigned, though objects and arrays can still be mutated.

Example:
```js
var a = 10;
let b = 20;
const c = 30;
```

### Q3. What is hoisting in JavaScript?
**Answer:** Hoisting means variable and function declarations are moved to the top of their scope during execution. However, only declarations are hoisted, not the initial values. This is why `var` can be used before declaration in some cases, while `let` and `const` behave differently.

### Q4. What is the difference between `==` and `===`?
**Answer:**
- `==` compares values after type coercion.
- `===` compares both value and type without coercion.

Example:
```js
console.log(5 == '5');   // true
console.log(5 === '5');  // false
```

### Q5. What are truthy and falsy values?
**Answer:** In JavaScript, values that evaluate to `false` in a boolean context are called falsy values. Examples include `0`, `''`, `null`, `undefined`, `false`, and `NaN`. Everything else is truthy.

---

## 2. Data Types and Type Conversion

### Q6. What are the primitive data types in JavaScript?
**Answer:** JavaScript has 7 primitive data types:
- string
- number
- boolean
- bigint
- symbol
- undefined
- null

### Q7. What is the difference between `null` and `undefined`?
**Answer:**
- `undefined` means a variable is declared but has no value assigned.
- `null` is a deliberate empty value assigned by the programmer.

### Q8. What is type coercion?
**Answer:** Type coercion is JavaScript automatically converting one data type into another when needed. Example:
```js
console.log('5' + 2); // '52'
console.log('5' - 2); // 3
```

### Q9. How do you convert a string to a number?
**Answer:** Use `Number()`, `parseInt()`, `parseFloat()`, or the unary `+` operator.

Example:
```js
let value = '123';
console.log(Number(value)); // 123
console.log(+value); // 123
```

### Q10. What is NaN and how do you check for it?
**Answer:** `NaN` means “Not a Number.” It appears when a numeric operation fails. To check, use `Number.isNaN(value)`.

Example:
```js
console.log(Number.isNaN('abc' * 2)); // true
```

---

## 3. Operators and Control Flow

### Q11. What is the difference between `++i` and `i++`?
**Answer:**
- `++i` increments first and then returns the updated value.
- `i++` returns the old value and then increments.

Example:
```js
let i = 1;
console.log(++i); // 2
console.log(i++); // 2 then i becomes 3
```

### Q12. What is the ternary operator?
**Answer:** The ternary operator is a short form of an `if-else` statement.

Example:
```js
const age = 21;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status); // Adult
```

### Q13. What is the difference between `if` and `switch`?
**Answer:** `if` is suitable for conditions, ranges, and expressions. `switch` is better when checking a single value against multiple fixed options.

### Q14. What is short-circuit evaluation?
**Answer:** JavaScript uses short-circuiting with `&&` and `||` to stop evaluation early.

Example:
```js
const result = true && 'Hello';
console.log(result); // Hello
```

---

## 4. Functions and Scope

### Q15. What is a function declaration and function expression?
**Answer:**
- Function declaration is hoisted and can be used before it is defined.
- Function expression is created as a value and is not hoisted in the same way.

Example:
```js
function greet() {
  return 'Hi';
}

const sayHi = function () {
  return 'Hello';
};
```

### Q16. What is closure in JavaScript?
**Answer:** A closure is a function that remembers variables from its outer scope even after that outer function has finished executing.

Example:
```js
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

### Q17. What is lexical scope?
**Answer:** Lexical scope means a function can access variables from its parent scope, even if the function is defined in a nested location. This concept is key to closures and scope resolution.

### Q18. What is the difference between callback and higher-order function?
**Answer:** A callback is a function passed as an argument to another function. A higher-order function is a function that takes a function as an argument or returns a function.

### Q19. What is the difference between normal function and arrow function?
**Answer:**
- Arrow functions do not have their own `this` value.
- They are shorter and commonly used in callbacks.
- They are not ideal for methods that need their own `this` context.

---

## 5. Arrays and Objects

### Q20. How do you create an array and access elements?
**Answer:**
```js
const arr = [10, 20, 30];
console.log(arr[0]); // 10
```

### Q21. What are the common array methods in JavaScript?
**Answer:** `map`, `filter`, `reduce`, `forEach`, `find`, `includes`, `slice`, `splice`, and `sort` are common array methods used in real-world projects.

### Q22. What is the difference between `map` and `forEach`?
**Answer:**
- `map` returns a new array.
- `forEach` does not return a new array; it only iterates.

### Q23. What is object destructuring?
**Answer:** Object destructuring makes it easier to extract values from an object.

Example:
```js
const user = { name: 'Amit', age: 25 };
const { name, age } = user;
console.log(name); // Amit
```

### Q24. What is the difference between shallow copy and deep copy?
**Answer:**
- A shallow copy copies the top-level properties only.
- A deep copy creates nested copies as well.

Example:
```js
const obj = { a: { b: 1 } };
const shallow = { ...obj };
```

### Q25. How do you remove duplicates from an array?
**Answer:**
```js
const arr = [1, 2, 2, 3, 4, 4];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
```

---

## 6. ES6+ Features

### Q26. What is ES6 and why is it important?
**Answer:** ES6, also known as ECMAScript 2015, introduced major features like `let`, `const`, arrow functions, template literals, destructuring, default parameters, classes, and modules. These features made JavaScript more readable and modern.

### Q27. What are template literals?
**Answer:** Template literals let you write strings with embedded expressions using backticks.

Example:
```js
const name = 'Ankit';
console.log(`Hello ${name}`);
```

### Q28. What is destructuring?
**Answer:** Destructuring allows extracting values from arrays or objects into variables with a cleaner syntax.

### Q29. What is default parameter in a function?
**Answer:** Default parameters provide a fallback value if no argument is passed.

Example:
```js
function greet(name = 'Guest') {
  return `Hello ${name}`;
}
```

### Q30. What is the spread operator and rest parameter?
**Answer:**
- Spread operator expands arrays/objects.
- Rest parameter collects many arguments into a single array.

Example:
```js
const nums = [1, 2, 3];
console.log(...nums);

function sum(...values) {
  return values.reduce((a, b) => a + b, 0);
}
```

---

## 7. DOM and Browser Concepts

### Q31. What is the DOM?
**Answer:** DOM stands for Document Object Model. It is a browser representation of the HTML document that JavaScript can manipulate.

### Q32. How do you select an HTML element using JavaScript?
**Answer:** Use methods like `document.getElementById()`, `document.querySelector()`, and `document.querySelectorAll()`.

Example:
```js
document.querySelector('#btn').addEventListener('click', () => {
  console.log('Clicked');
});
```

### Q33. What is event bubbling and event capturing?
**Answer:**
- Event bubbling means the event travels from the target to the parent.
- Event capturing means the event travels from parent to child.

### Q34. What is the difference between `innerHTML`, `textContent`, and `innerText`?
**Answer:**
- `innerHTML` inserts HTML markup.
- `textContent` inserts plain text.
- `innerText` also works with rendered text and may be slower.

### Q35. What is an event delegation pattern?
**Answer:** Event delegation means attaching a single event listener to a parent element and handling events from child elements through event propagation. It is useful for lists and dynamic content.

---

## 8. Async JavaScript and Promises

### Q36. What is asynchronous JavaScript?
**Answer:** Asynchronous JavaScript allows code to continue execution without waiting for long operations like network requests or file I/O. It is important for responsive user interfaces and backend performance.

### Q37. What is a Promise?
**Answer:** A Promise represents a value that may be available now, later, or never. It can be in one of three states: pending, fulfilled, or rejected.

Example:
```js
const p = new Promise((resolve, reject) => {
  resolve('Success');
});
```

### Q38. What is the difference between `async/await` and `.then()`?
**Answer:** Both are used to handle Promises. `async/await` makes code easier to read and write, while `.then()` is more callback-style.

### Q39. What is callback hell?
**Answer:** Callback hell occurs when many nested callbacks make code hard to read and maintain. `Promise` and `async/await` help avoid this.

### Q40. What is the event loop in JavaScript?
**Answer:** The event loop handles asynchronous tasks by continuously checking the call stack and the task queue. It allows JavaScript to process non-blocking operations in a single-threaded environment.

---

## 9. Object-Oriented JavaScript

### Q41. What is `this` in JavaScript?
**Answer:** `this` depends on how a function is called. In a regular function, it may refer to the global object or undefined in strict mode. In an object method, it refers to the object. In arrow functions, it captures the surrounding lexical `this`.

### Q42. What is prototype in JavaScript?
**Answer:** Every object in JavaScript has a prototype, which is used for inheritance. Objects can inherit properties and methods from their prototype chain.

### Q43. What is the difference between class and function constructor?
**Answer:** Classes provide a cleaner and more readable syntax for constructor functions and inheritance. Function constructors are older syntax, but still supported.

### Q44. What is inheritance in JavaScript?
**Answer:** Inheritance allows one object or class to access properties and methods from another object or class through the prototype chain.

---

## 10. Error Handling and Debugging

### Q45. How do you handle errors in JavaScript?
**Answer:** Use `try`, `catch`, and `finally` blocks.

Example:
```js
try {
  const value = JSON.parse('{ invalid json }');
} catch (error) {
  console.log('Parsing failed:', error.message);
}
```

### Q46. What is the purpose of `finally`?
**Answer:** The `finally` block executes regardless of whether the code succeeds or fails. It is useful for cleanup operations.

### Q47. What are common debugging techniques in JavaScript?
**Answer:** Use `console.log`, `console.table`, DevTools, breakpoints, `debugger`, and step-through execution to inspect values and logic flow.

---

## 11. JavaScript Interview Questions for Startup to MNC Level

### Q48. What is the difference between `null` and `undefined` in real-world code?
**Answer:** In real projects, `undefined` frequently means missing initialization or missing property, while `null` is often used deliberately to represent an empty value or no object reference. This distinction improves code clarity and logic handling.

### Q49. How do you optimize a slow JavaScript app?
**Answer:**
- Minimize DOM manipulation
- Avoid memory leaks
- Debounce expensive events
- Use efficient algorithms
- Lazy load assets
- Use browser profiling tools
- Avoid deep nested loops when not needed

### Q50. How would you explain JavaScript execution flow to a beginner?
**Answer:** JavaScript executes code using a call stack. When it encounters asynchronous work, it delegates it to browser or Node APIs and then processes the result in the task queue using the event loop. This is why JavaScript can be non-blocking even though it is single-threaded.

### Q51. What makes JavaScript suitable for modern web apps?
**Answer:** JavaScript is flexible, fast, easy to integrate, and works both in browsers and on the server with Node.js. It supports modern UI frameworks, API calls, state management, and real-time features.

### Q52. What are common issues in large JavaScript applications?
**Answer:**
- Unclear state management
- Callback complexity
- Memory leaks
- Poor error handling
- Performance bottlenecks
- Inconsistent coding patterns

### Q53. How do you handle large application state?
**Answer:** Use predictable state patterns, a state management library, modular architecture, and clear separation of concerns. For example, Redux, Zustand, Context API, or a custom store pattern depending on project size.

---

## 12. Coding Problems (Basic to Advanced)

### Q54. Write a function to reverse a string.
**Answer:**
```js
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString('javascript')); // tpircsavaj
```

### Q55. Write a function to check whether a number is prime.
**Answer:**
```js
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
```

### Q56. Write a function to find the maximum number in an array.
**Answer:**
```js
const arr = [3, 9, 12, 5];
console.log(Math.max(...arr)); // 12
```

### Q57. Write a function to find duplicates in an array.
**Answer:**
```js
const arr = [1, 2, 2, 3, 4, 4];
const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
console.log([...new Set(duplicates)]); // [2, 4]
```

### Q58. Write a function to implement debounce.
**Answer:**
```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Q59. Write a function to implement throttle.
**Answer:**
```js
function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
```

---

## 13. Best Practice Questions

### Q60. Why should you avoid using `var` in modern JavaScript?
**Answer:** Because `var` is function-scoped, can be redeclared, and behaves unexpectedly in loops and blocks. `let` and `const` provide clearer and safer scoping.

### Q61. Why is immutability important in JavaScript applications?
**Answer:** Immutability reduces bugs, makes state updates easier to track, and helps tools like React detect changes more reliably.

### Q62. Why use `const` for arrays and objects?
**Answer:** It protects the variable reference from reassignment, while the object or array contents can still be modified if needed. This makes intent clear.

### Q63. What is the difference between deep equality and shallow equality?
**Answer:** Shallow equality compares only top-level references, while deep equality compares nested values recursively. This matters when checking objects and arrays in complex data structures.

---

## 14. Practical Interview Tips

- Focus on core concepts before advanced syntax.
- Explain your reasoning during interviews, not just the answer.
- Practice JavaScript code in the browser console or Node.js.
- Learn how to write clean, readable code.
- Understand arrays, objects, closures, async flow, and event handling deeply.
- Be ready to explain why your approach is correct and efficient.

---

## 15. Suggested Progression Plan

### Phase 1: Basics
- Variables and data types
- Operators and conditions
- Functions and scope
- Arrays and objects

### Phase 2: Intermediate
- DOM manipulation
- Events and event delegation
- ES6+ features
- Promises and async/await

### Phase 3: Advanced
- Closures and prototypes
- Memory and performance
- Debounce/throttle patterns
- Real-world app architecture
- Startup and MNC level discussion questions

---

## Final Note

This is the first topic-wise JavaScript question document. Once a topic is completed, we will move into a second stage with more intensive basic-to-advanced coding rounds and interview-style questions from startup to MNC level.

This document should be used as a foundation for the next collection of focused JavaScript practice sheets and mock interview questions.
