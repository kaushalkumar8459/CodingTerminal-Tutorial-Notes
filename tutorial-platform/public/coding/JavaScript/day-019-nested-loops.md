# Day 019 — Nested Loops

Matches Tutorial Day 19 (The `for` Loop In Depth). No limit on how many you solve.

## Basic

1. Print a square of stars (5x5) using nested loops.
2. Print the multiplication tables for 1 through 10 using a nested loop.
3. Print a right-angled triangle of stars (rows 1 to 5, increasing).
4. Print an inverted right-angled triangle of stars (rows 5 down to 1).
5. Print a number triangle where each row repeats its row number (e.g. row 3 → `3 3 3`).

## Concept / Patterns

6. Print a pyramid pattern (centered stars, increasing per row).
7. Print an inverted pyramid pattern.
8. Print Floyd's Triangle (1 / 2 3 / 4 5 6 / ...).
9. Print a diamond pattern (pyramid + inverted pyramid combined).
10. Print a hollow square pattern (stars only on the border, spaces inside).
11. Print a number pattern where each row counts up then back down (e.g. `1 2 3 2 1`).
12. Print a checkerboard pattern of `*` and spaces using row/column index checks.

## Interview-style questions

13. Why does a nested loop's total number of iterations multiply (outer count × inner count)?
14. How would you print a pattern where the number of stars decreases each row instead of increasing?
15. What's a simple way to build a pattern row as a string before printing it, instead of
    printing each character separately?

## Challenge

16. Create at least **10 different patterns** on your own (mix of stars, numbers, and
    hollow shapes) beyond the ones listed above — this is the best way to get fully
    comfortable with nested loops.

## Notes

- Build each row as a single string inside the inner loop, then `console.log()` it once
  per row — this is cleaner than logging character-by-character.
- If a pattern isn't coming out right, print the row and column numbers first (without
  the pattern characters) to understand the loop bounds before adding pattern logic.
