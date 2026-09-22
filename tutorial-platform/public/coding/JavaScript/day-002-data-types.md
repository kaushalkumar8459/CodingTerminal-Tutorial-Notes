# Day 002 — Data Types

Matches Tutorial Day 2 (Environment Setup and First Program) — while the tutorial
covers setup, this practice day jumps a little ahead into recognizing JavaScript's
data types, since you need `typeof` and friends constantly from here on. No limit on
how many of these you solve.

## Basic

1. Store a string, a number, and a boolean in three variables and print each one.
2. Use `typeof` on a string value and print the result.
3. Use `typeof` on a number value and print the result.
4. Use `typeof` on a boolean value and print the result.
5. Use `typeof` on a variable that holds `undefined` and print the result.
6. Use `typeof` on `null` and print the result — note anything surprising.
7. Create a `BigInt` value (e.g. `123n`) and print its `typeof`.
8. Create a `Symbol` value and print its `typeof`.
9. Print the data type of an array using `typeof` — is the result what you expected?
10. Print the data type of an object literal using `typeof`.

## Concept

11. Write a function `identifyType(value)` that returns the type of whatever is passed in.
12. Check whether a given value is a number using `typeof`.
13. Check whether a given value is a string using `typeof`.
14. Convert a number to a string and confirm the new type with `typeof`.
15. Convert a string to a number and confirm the new type with `typeof`.
16. Write a check that returns `true` only if a variable is exactly `undefined`.
17. Write a check that returns `true` only if a variable is exactly `null`.
18. Detect whether a value is `NaN` using `Number.isNaN()` (not `typeof`).
19. Explain (in a code comment) why `typeof null === "object"` — then move on, it's a known quirk.
20. List all primitive types in a comment at the top of your file, from memory.

## Interview-style questions

21. What are the primitive data types in JavaScript? Name all of them.
22. What is the difference between `undefined` and `null`?
23. Why does `typeof NaN` return `"number"` even though NaN means "Not a Number"?

## Challenge

24. Build a `getDataType(value)` function that correctly labels every primitive type
    (string, number, boolean, undefined, null, bigint, symbol) plus `"array"` and
    `"object"` for non-primitives — `typeof` alone won't be enough for this one.

## Notes

- Keep a running "cheat sheet" comment block of `typeof` results for tricky cases
  (`null`, arrays, functions) — you'll want to reference it again later.
- Don't worry about _converting_ types yet (that's Day 3) — today is just about
  correctly identifying what type something already is.
