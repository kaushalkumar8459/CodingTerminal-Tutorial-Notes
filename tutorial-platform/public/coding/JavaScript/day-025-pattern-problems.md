# Day 025 — Pattern Problems

Matches Tutorial Day 25 (Number Problem Solving Practice). No limit on how many you solve.

## Patterns to build

1. Solid right-angled triangle (stars, increasing rows).
2. Inverted right-angled triangle (stars, decreasing rows).
3. Pyramid (centered stars, increasing per row).
4. Inverted pyramid.
5. Diamond (pyramid + inverted pyramid combined).
6. Floyd's Triangle (sequential numbers, increasing count per row).
7. Hollow square (border only).
8. Hollow triangle (border only, triangular shape).
9. Number pyramid where each row repeats the row number (e.g. row 3 → `3 3 3`).
10. A pattern that counts up then back down per row (e.g. `1 2 3 2 1`).
11. A checkerboard pattern of alternating `*`/space based on row+column parity.
12. Your own original pattern — design one and implement it (no limit on how many you invent).

## Interview-style questions

13. What's the general two-step process for solving any new pattern problem
    (rows first, then per-row logic)?
14. How would you adapt a solid pyramid pattern into a hollow one — what single condition
    needs to change?
15. Why is it useful to build each row as a string before printing it, rather than
    printing individual characters directly?

## Notes

- If a pattern doesn't come out right on the first try, first print just the row and
  column _numbers_ (no pattern characters) to confirm your loop bounds are correct.
- Try recreating at least 3 of these from memory a day or two later — that's a much
  stronger test of understanding than solving them once and moving on.
