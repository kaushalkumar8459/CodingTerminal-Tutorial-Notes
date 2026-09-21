---
title: Functions Introduction
slug: day-010-functions-introduction
dayLabel: Day 10
level: Beginner
estimatedMinutes: 30
order: 10
track: javascript
---

# Day 10 [Beginner]: Functions Introduction

## Goal

Understand what a function is, the two main ways to create one, how to call it, and the difference between parameters/arguments and return values.

## Prerequisites

- Day 1–9 (variables, operators, conditionals)

## Explanation

A **function** is a reusable block of code that performs a specific task. Instead of writing the same steps over and over, you write them once inside a function, then **call** (run) that function whenever you need those steps again.

There are two common ways to create a function: a **function declaration** (`function name() { }`) and a **function expression** (storing a function inside a variable: `const name = function() { }`). Both work similarly, with a few technical differences you'll learn more about later (hoisting, covered on Day 49).

Functions can accept **parameters** — placeholders for values you'll provide when calling the function. The actual values you pass in when calling are called **arguments**. A function can also **return** a value back to whoever called it, using the `return` keyword — this is very different from just printing with `console.log()`.

## Topic by Topic

### Topic 1: What is a function, and why use one?

Theory:
A function packages a set of instructions under a name, so you can run that exact set of steps again anytime, just by calling the name.

Practical:
Anytime you find yourself copy-pasting the same few lines of code with small changes, that's usually a sign you should turn it into a function.

Code Example:

```js
function sayHello() {
  console.log("Hello there!");
}

sayHello(); // calling the function
sayHello(); // can call it again anytime
```

**Explanation:** `sayHello` is defined once, but can be called (run) as many times as needed — that's the core benefit of functions: reusability.

**Key Points:**

- Functions bundle instructions under a reusable name.
- You "call" a function by writing its name followed by `()`.
- A function's code doesn't run until it's actually called.

### Topic 2: Function declaration vs function expression

Theory:
A function declaration uses the `function` keyword directly with a name. A function expression stores an (often anonymous) function inside a variable.

Practical:
Both work the same way when calling them — the main practical difference for now is style; you'll see both forms often in real code.

Code Example:

```js
// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const subtract = function (a, b) {
  return a - b;
};

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

**Explanation:** `add` is a named declaration; `subtract` is an expression stored in a `const` variable. Both are called the exact same way: `name(arguments)`.

**Key Points:**

- Declaration: `function name() { }`.
- Expression: `const name = function() { }`.
- Function declarations can be called before they appear in the file (due to hoisting); function expressions cannot.

### Topic 3: Parameters and arguments

Theory:
Parameters are the named placeholders listed when you define a function. Arguments are the actual values you provide when calling it.

Practical:
Think of parameters as blank fields on a form, and arguments as what you actually write in those fields each time you fill it out.

Code Example:

```js
function greet(name, age) {
  // "name" and "age" are parameters
  console.log("Hi " + name + ", you are " + age + " years old.");
}

greet("Sara", 22); // "Sara" and 22 are arguments
greet("Tom", 30); // same function, different arguments
```

**Explanation:** The function itself doesn't change — only the arguments passed in change what it does with them each time.

**Key Points:**

- Parameters live in the function definition; arguments are supplied at call time.
- A function can be called multiple times with different arguments.
- If you don't pass an argument for a parameter, that parameter becomes `undefined` (unless a default is set — covered Day 11).

### Topic 4: Return values

Theory:
`return` sends a value back out of the function to wherever it was called from. Without `return`, a function implicitly returns `undefined`.

Practical:
Use `return` when you need to use the function's result elsewhere (store it, pass it to another function, etc.) — use `console.log()` only when you just want to display something.

Code Example:

```js
function add(a, b) {
  return a + b; // sends the result back out
}

let result = add(4, 6); // result now holds 10
console.log(result * 2); // 20 - we can keep using the returned value
```

**Explanation:** Because `add` uses `return`, its result (`10`) can be stored in `result` and reused in further calculations. If `add` had only used `console.log()` instead, `result` would be `undefined`, and `result * 2` wouldn't work as expected.

**Key Points:**

- `return` sends a usable value back out of the function.
- A function without `return` gives back `undefined` by default.
- `console.log()` displays a value; `return` makes it reusable elsewhere in your code.

## Recap

- A function is a named, reusable block of instructions you call by name.
- Declarations (`function name() {}`) and expressions (`const name = function() {}`) both create functions.
- Parameters are placeholders in the definition; arguments are the real values passed in.
- `return` sends a usable value back; without it, a function returns `undefined`.

## What's Next

Practice for today: `public/coding/JavaScript/day-010-function-parameters.md`. Day 11 goes deeper into function parameters — defaults, multiple parameters, and function scope.
