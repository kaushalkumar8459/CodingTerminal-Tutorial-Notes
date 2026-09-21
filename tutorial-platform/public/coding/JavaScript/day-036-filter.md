# Day 036 — filter()

Matches Tutorial Day 36 (Array Iteration with forEach) — practice moves into `filter()`
here, ahead of Tutorial Day 38. No limit on how many you solve.

## Basic

1. Use `.filter()` to get only the even numbers from an array.
2. Use `.filter()` to get only the numbers greater than 50 from an array.
3. Use `.filter()` to get only the strings longer than 5 characters from an array.
4. Use `.filter()` to remove all falsy values from a mixed array.
5. Use `.filter()` to get only positive numbers from an array containing negatives.

## Concept

6. Given an array of user objects (`{name, age}`), use `.filter()` to get only adults (`age >= 18`).
7. Given an array of user objects, use `.filter()` to get only active users (`isActive: true`).
8. Given an array of product objects, use `.filter()` to get only expensive products (`price > 1000`).
9. Given an array of task objects, use `.filter()` to get only completed tasks (`done: true`).
10. Combine `.filter()` with `.map()`: first filter adults, then map to just their names.
11. Use `.filter()` with multiple combined conditions (e.g. `age >= 18 && isActive`).
12. Given an array of numbers, filter out any duplicates (keep only the first occurrence
    of each value).

## Interview-style questions

13. What's the key difference between `.map()` and `.filter()` in terms of what they return?
14. Does `.filter()` mutate the original array?
15. What does `.filter()` return if none of the items match the condition?

## Notes

- `.filter()`'s callback must return `true`/`false` (or a truthy/falsy value) — whatever
  is truthy gets kept, the rest gets excluded.
- `.filter()` can return an empty array — that's normal and expected when nothing matches,
  not an error.
