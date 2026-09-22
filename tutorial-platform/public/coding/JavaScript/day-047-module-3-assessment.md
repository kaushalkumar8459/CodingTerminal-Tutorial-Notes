# Day 047 — Module 3 Assessment (40 Problems)

Matches Tutorial Day 47 (Module 3 Assignment). Covers strings, arrays, objects, array
methods, destructuring, spread/rest, and data transformation. No limit on revisiting or
extending further.

## Strings (5)

1. Reverse a string without using `.reverse()` directly on an array conversion (try a
   manual loop version).
2. Check if a string is a palindrome, ignoring case and spaces.
3. Count vowels and consonants in a string separately.
4. Convert a sentence into "Title Case" (first letter of every word capitalized).
5. Find the first non-repeating character in a string.

## Arrays (10)

6. Find the second largest number in an array without sorting.
7. Remove duplicate values from an array.
8. Flatten a nested array (2+ levels deep).
9. Rotate an array to the left by `k` positions.
10. Find the intersection of two arrays (values present in both).
11. Find the difference between two arrays (values in the first but not the second).
12. Chunk an array into smaller arrays of a given size (e.g. size 3).
13. Find all pairs in an array that sum to a target value.
14. Sort an array of objects by two properties (primary + secondary sort key).
15. Merge two sorted arrays into one sorted array.

## Objects (10)

16. Merge two objects, with the second overriding the first on conflicting keys.
17. Deep clone an object using `structuredClone()`.
18. Count how many properties in an object have a numeric value.
19. Convert an object into an array of formatted `"key: value"` strings.
20. Given an array of objects, convert it into a single object keyed by `id`.
21. Given an object, invert its keys and values (values become keys, and vice versa).
22. Freeze an object and confirm attempted changes are blocked.
23. Given a nested object, safely access a deeply nested property using optional chaining.
24. Given two objects, write a function that checks if they have identical keys (not values).
25. Build a function that removes a specific property from an object without mutating
    the original (return a new object).

## Array Methods, Destructuring, Spread/Rest (10)

26. Use `.map()` + `.filter()` chained together to solve a two-step transformation problem.
27. Use `.reduce()` to build a grouped object from an array of objects.
28. Use `.some()`/`.every()` together to validate a form-like object with multiple fields.
29. Destructure a function's parameters directly, including a default value.
30. Destructure a nested array (an array containing another array) directly.
31. Use rest parameters to build a function accepting any number of arguments.
32. Use spread to combine 3+ arrays into one.
33. Use spread to shallow-copy an object, then explain (in a comment) why a nested
    property inside it would still be shared with the original.
34. Use `Object.entries()` combined with `.filter()` to keep only object properties
    with truthy values.
35. Use `.flatMap()` to solve a problem that needs both transforming and flattening.

## Data Transformation (5)

36. Given an array of orders (with nested items), calculate total revenue.
37. Group an array of employees by department and count each group's size.
38. Given a dataset of products, find the top 3 most expensive in-stock items.
39. Given a dataset of students, calculate each student's average and add a `passed`
    boolean field (average >= 40).
40. Build a full summary report (count, total, average, min, max) from any array of
    numeric records, as a single reusable function.

## Notes

- This is the biggest assessment so far — treat it as a genuine checkpoint. If certain
  sections feel much harder than others, that's useful signal for where to review before
  Module 4.
- No limit on revisiting: come back to any of these later (especially the Data
  Transformation section) once you've learned closures and `this` in Module 4 — you may
  find cleaner ways to solve them.
