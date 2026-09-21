# Day 038 — Advanced Array Methods (some, every, sort, reverse, flat, flatMap)

Matches Tutorial Day 38 (The filter Method). Challenge: 20 problems total — no limit on
extending further.

## Basic

1. Use `.some()` to check if any number in an array is negative.
2. Use `.every()` to check if all numbers in an array are positive.
3. Use `.sort()` to sort an array of numbers in ascending order (careful — think about
   why a plain `.sort()` might not work correctly on numbers by default).
4. Use `.sort()` to sort an array of numbers in descending order.
5. Use `.reverse()` to reverse the order of an array.

## Concept

6. Use `.sort()` to sort an array of strings alphabetically.
7. Use `.sort()` to sort an array of objects by a numeric property (e.g. sort products by price).
8. Use `.sort()` to sort an array of objects by a string property (e.g. sort users by name).
9. Use `.flat()` to flatten a nested array of arrays into a single-level array.
10. Use `.flat(2)` on a deeply nested array (2 levels) and observe the difference from `.flat()`.
11. Use `.flatMap()` to map and flatten in a single step (e.g. splitting sentences into
    words and flattening them all into one array).
12. Use `.some()` to check whether any product in an array is out of stock.
13. Use `.every()` to check whether all users in an array are verified.
14. Combine `.filter()` and `.sort()` together: filter products in stock, then sort by price.

## Challenge (20 total — keep going)

15. Sort an array of objects by TWO properties (e.g. department first, then name).
16. Implement a custom sort comparator that sorts strings by length instead of alphabetically.
17. Use `.flatMap()` to extract and flatten all "tags" from an array of blog post objects
    (each post has a `tags: []` array).
18. Check whether an array is already sorted, using `.every()` and comparing neighboring
    elements.
19. Sort an array of dates (as strings) chronologically.
20. Combine `.filter()`, `.sort()`, and `.map()` in one chain to build a "top 3 most
    expensive in-stock products" list.

## Interview-style questions

21. Why does `[10, 2, 33].sort()` NOT sort correctly by numeric value without a comparator?
22. What's the difference between `.some()` and `.every()`?
23. What does `.flatMap()` do that `.map()` alone cannot?

## Notes

- `.sort()` and `.reverse()` mutate the original array — unlike most methods this week,
  which return new arrays. Always double check this when chaining.
- `.sort()` needs a comparator function `(a, b) => a - b` for correct numeric sorting —
  without it, JavaScript sorts by converting values to strings, which gives wrong results
  for numbers.
