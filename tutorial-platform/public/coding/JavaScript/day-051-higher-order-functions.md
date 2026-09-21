# Day 051 — Higher-Order Functions (customMap, customFilter, customForEach, customReduce)

Matches Tutorial Day 51 (The Spread Operator). Important interview practice day — build
your own versions of the array methods you've been using. No limit on extending further.

## Build your own array methods

1. Implement `customForEach(array, callback)` that mimics `.forEach()` using a plain loop.
2. Implement `customMap(array, callback)` that mimics `.map()`, returning a new array.
3. Implement `customFilter(array, callback)` that mimics `.filter()`, returning a new array.
4. Implement `customReduce(array, callback, initialValue)` that mimics `.reduce()`.
5. Test each of your custom implementations against the REAL built-in method on the same
   input, and confirm they produce identical results.

## Concept

6. Implement `customFind(array, callback)` that mimics `.find()`.
7. Implement `customSome(array, callback)` that mimics `.some()`, stopping early once a match is found.
8. Implement `customEvery(array, callback)` that mimics `.every()`, stopping early once a
   failure is found.
9. Add support for the optional `(item, index, array)` callback signature in your
   `customMap`/`customFilter` (matching how the real methods work).
10. Implement `customReduce` WITHOUT an initial value parameter, using the first array
    element as the starting accumulator (matching real `.reduce()` behavior) — handle
    the empty-array edge case.

## Interview-style questions

11. Why is this exercise ("reimplement built-in array methods") such a common and
    valuable interview question?
12. What is a "higher-order function," in your own words, based on what you just built
    (hint: think about functions that accept OTHER functions as arguments)?
13. Which of your custom implementations was the trickiest to get exactly right, and why?

## Notes

- This is one of the most valuable exercises in the whole course for truly understanding
  how array methods work internally — take your time and test thoroughly against the
  real built-in versions.
- A "higher-order function" is simply a function that takes another function as an
  argument, or returns a function — `customMap`, `customFilter`, etc. are all higher-order
  functions, and so are the real `.map()`/`.filter()`/`.reduce()`.
