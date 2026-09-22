# Day 011 — Arrow Functions

Matches Tutorial Day 11 (Function Parameters In Depth) — practice moves into arrow
function syntax here, ahead of Tutorial Day 12. No limit on how many you solve.

## Basic

1. Convert `function add(a, b) { return a + b; }` into an arrow function.
2. Write an arrow function `square = (n) => n * n` using implicit return.
3. Write an arrow function with a single parameter, omitting the parentheses (e.g. `n => n * 2`).
4. Write an arrow function with no parameters (e.g. `() => "Hello"`).
5. Write an arrow function `isEven = (n) => n % 2 === 0`.
6. Write an arrow function version of `greet(name)` from Day 9.
7. Write an arrow function that takes 3 parameters and returns their sum.
8. Write an arrow function with a default parameter.
9. Store an arrow function in a `const` and call it multiple times.
10. Write an arrow function with an explicit `{ return ... }` block body (not implicit return).

## Concept

11. Convert 10 of your Day 9/Day 10 regular functions into arrow functions.
12. Show an example where implicit return works cleanly for a one-line function, but you'd
    need a block body (`{ }` with `return`) for a multi-step function.
13. Write an arrow function that returns an object literal directly — note the parentheses
    needed around `{ }` to avoid it being read as a function body.
14. Rewrite a `filter`-style manual loop as a short arrow function you could reuse as a
    condition-checker (don't worry about actually using `.filter()` yet — just the arrow syntax).
15. Compare calling a regular function vs an arrow function stored in a variable — are they
    called the same way?

## Interview-style questions

16. What is the main syntax difference between a regular function and an arrow function?
17. What does "implicit return" mean, and when can you use it?
18. Why do you need parentheses around an object literal when using implicit return, like `() => ({ name: "Sam" })`?

## Challenge

19. Build an **arrow-function utility library**: rewrite at least 10 of your existing
    Day 9/10 utility functions purely as arrow functions in one file (e.g. `utilsArrow.js`).

## Notes

- Arrow functions don't have their own `this` (they use the surrounding scope's `this`) —
  you don't need to fully understand this yet, just note it; we'll dig into it on Day 12
  and again on Day 58.
- Implicit return only works for single-expression bodies — the moment you need more than
  one statement, switch to a `{ }` block body with an explicit `return`.
