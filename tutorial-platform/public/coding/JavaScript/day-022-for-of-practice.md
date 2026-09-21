# Day 022 — for...of Practice

Matches Tutorial Day 22 (The `for...of` Loop). No limit on how many you solve.

## Basic

1. Loop over an array of numbers with `for...of` and print each one.
2. Loop over a string with `for...of` and print each character.
3. Count the number of vowels in a string using `for...of`.
4. Sum all numbers in an array using `for...of`.
5. Find the maximum value in an array using `for...of` (without `Math.max`).

## Concept

6. Find the minimum value in an array using `for...of`.
7. Count how many times a specific character appears in a string using `for...of`.
8. Detect duplicate values in an array using `for...of` plus a helper array/Set of seen values.
9. Loop over a `Set` of unique numbers and print each one.
10. Loop over a small `Map` of key-value pairs using `for...of` (hint: `map.entries()`
    or destructuring each `[key, value]` pair).
11. Build a character-frequency counter for a string using `for...of` (print each letter
    with its count).
12. Reverse a string manually using `for...of` (building a new string by prepending each character).

## Interview-style questions

13. What is the main difference between `for...of` and a classic `for (let i = 0; ...)` loop?
14. What kinds of values does `for...of` work on (which data structures are "iterable")?
15. When would you still need a regular `for` loop instead of `for...of`?

## Notes

- `for...of` is usually the cleanest choice once you already have a collection to loop
  over directly — reach for it by default unless you specifically need the index.
- Try rewriting a couple of your Day 16 loop-basics answers using `for...of` where it
  fits naturally, to compare the two styles directly.
