# Day 063 — Module 4 Interview Challenge (25 Advanced Questions)

Matches Tutorial Day 63 (Module 4 Revision and Interview Lab). Covers scope, hoisting,
closures, this, call/apply/bind, prototype, and higher-order functions. No limit on
revisiting or extending further.

## Scope & Hoisting (6)

1. Explain the difference between global, function, and block scope with one example each.
2. What is the Temporal Dead Zone, and which declarations does it apply to?
3. Why does `var` "leak" out of `if`/`for` blocks, but `let`/`const` do not?
4. Predict the output: a `var` declared and used before its line, inside a function.
5. Predict the output: a function DECLARATION called before its definition in the file.
6. Predict the output: a function EXPRESSION (arrow or regular) called before its
   definition in the file.

## Closures (5)

7. Define a closure in your own words.
8. Build `createCounter()` from memory and explain why multiple calls to it produce
   independent counters.
9. Why are closures useful for creating "private" variables?
10. What's a real-world use case for `memoize()`, and how does it rely on closures?
11. Predict the output of a classic "closures in a loop with `var`" gotcha example
    (write one yourself using `var i` inside a loop with a `setTimeout`, and predict
    what all the callbacks will log).

## this, call/apply/bind (7)

12. What determines `this` inside a regular function?
13. What determines `this` inside an arrow function?
14. Why does extracting an object's method into a standalone variable break its `this`?
15. What's the difference between `.call()` and `.apply()`?
16. What does `.bind()` return, and how is that different from `.call()`/`.apply()`?
17. Why would you use `.bind()` when passing an object's method as an event listener
    or `setTimeout` callback?
18. Predict the output of an arrow function used as a DIRECT object method vs an arrow
    function nested INSIDE a regular object method.

## Prototypes (4)

19. What is a prototype, and what is the prototype chain?
20. Why do all arrays share the same `.map()`/`.filter()` methods instead of each having
    their own copy?
21. What does `Object.create(proto)` do?
22. How does `instanceof` relate to the prototype chain?

## Higher-Order Functions (3)

23. What makes a function a "higher-order function"?
24. Give one example of a function that ACCEPTS another function, and one that RETURNS
    another function.
25. Implement a simple `once(fn)` function from memory, and explain how closures make
    it possible.

## Notes

- Treat this as a genuine interview simulation — try answering out loud or in writing
  before checking back against the tutorial days, just like a real interview would feel.
- If more than a handful of these feel shaky, that's valuable signal — Module 5 (OOP)
  builds directly on `this` and prototypes, so it's worth the extra revision time now.
