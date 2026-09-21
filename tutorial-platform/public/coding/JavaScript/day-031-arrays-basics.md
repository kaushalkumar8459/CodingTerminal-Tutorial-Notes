# Day 031 — Arrays Basics

Matches Tutorial Day 31 (Numbers and Math). No limit on how many you solve.

## Basic

1. Create an array of 5 numbers and print it.
2. Access the first and last elements of an array by index.
3. Update the value at a specific index in an array.
4. Find the sum of all numbers in an array.
5. Find the average of all numbers in an array.

## Concept

6. Find the maximum value in an array without using `Math.max`.
7. Find the minimum value in an array without using `Math.min`.
8. Reverse an array manually (without `.reverse()`), building a new array.
9. Copy an array into a new variable and confirm changing the copy doesn't affect the
   original (careful — try this with `const copy = original;` first and observe the
   surprising result, then fix it properly).
10. Create a nested array (an array of arrays) representing a small grid, and print a
    specific cell's value.
11. "Delete" an element from an array at a specific index by rebuilding a new array
    without it (don't use `.splice()` yet — that's tomorrow).
12. Find the length of an array and use it to access the last element generically
    (`arr[arr.length - 1]`).
13. Given an array of student names, print each with their position number (1st, 2nd, ...).
14. Count how many numbers in an array are greater than a given threshold.
15. Given a 2D array (grid), calculate the sum of all values in it using nested loops.

## Interview-style questions

16. Why does `const copy = original;` NOT create a real copy of an array?
17. What's the array equivalent of a string's immutability — are arrays mutable in JavaScript?
18. How would you access the last element of an array generically, without knowing its length in advance?

## Notes

- Arrays are mutable (unlike strings) — changing an element in place works directly,
  e.g. `arr[0] = 99;`. Keep this contrast with strings in mind.
- `arr.length - 1` for "last index" is a pattern you'll use constantly — get comfortable
  with it now.
