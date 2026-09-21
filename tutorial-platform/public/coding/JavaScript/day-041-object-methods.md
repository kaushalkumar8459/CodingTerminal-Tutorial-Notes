# Day 041 — Object Methods (keys, values, entries)

Matches Tutorial Day 41 (Objects Fundamentals). No limit on how many you solve.

## Basic

1. Use `Object.keys()` to get all property names of an object as an array.
2. Use `Object.values()` to get all property values of an object as an array.
3. Use `Object.entries()` to get an array of `[key, value]` pairs from an object.
4. Use `Object.keys(obj).length` to count how many properties an object has.
5. Loop over `Object.entries()` using `for...of` to print each key and value.

## Concept

6. Given an object of product prices (`{apple: 50, banana: 30}`), use `Object.values()`
   to calculate the total.
7. Given an object of exam scores, use `Object.entries()` to find the subject with the
   highest score.
8. Convert an object into an array of formatted strings (e.g. `"name: value"`) using
   `Object.entries()` and `.map()`.
9. Given an array of `[key, value]` pairs, use `Object.fromEntries()` to convert it back
   into an object.

## Challenge

10. Convert an object into an array of `[key, value]` pairs, then back into a `Map`
    using `new Map(Object.entries(obj))`.
11. Convert a `Map` back into a plain object using `Object.fromEntries(map)`.
12. Given two objects representing settings, merge them so the second object's values
    override the first's for matching keys (a manual preview of `Object.assign`/spread,
    covered fully on Day 43).

## Interview-style questions

13. What's the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?
14. Why might `Object.entries()` combined with `.map()`/`.filter()`/`.reduce()` be more
    convenient than manually looping with `for...in`?
15. What does `Object.fromEntries()` do, and when would you need it?

## Notes

- `Object.keys/values/entries()` all return real arrays, meaning you get full access to
  `.map()`, `.filter()`, `.reduce()`, etc. — this is usually more convenient than
  `for...in` from Day 23.
- These three methods will become your default toolkit for object iteration going forward.
