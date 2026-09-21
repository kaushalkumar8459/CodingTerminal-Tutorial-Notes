# Day 109 — Professional JavaScript Challenge: Personal Utility Library

Matches Tutorial Day 109 (Professional JavaScript Patterns). Build a reusable utility
library combining everything from this course. No limit on how many utilities you add.

## Build your utility library (one file, or organized into modules per Day 101)

1. `debounce(fn, delay)` — from Day 106/107.
2. `throttle(fn, interval)` — from Day 107.
3. `memoize(fn)` — from Day 54.
4. `deepClone(obj)` — from Day 61.
5. `deepEqual(objA, objB)` — a renamed/refined version of your Day 61 `isEqual()`.
6. `groupBy(array, keyFn)` — groups an array of objects by a computed key (reuse the
   Day 45-46 `.reduce()`-based grouping pattern).
7. `chunk(array, size)` — splits an array into smaller arrays of a given size (from
   Day 47's assessment).
8. `flatten(array, depth)` — a manual version of `.flat()`, built with recursion or
   `.reduce()`.
9. `once(fn)` — from Day 53/54.
10. `pipe(...fns)` — from Day 62, combining functions left to right.

## Concept — polish and documentation

11. Add a one-line comment above EACH function explaining what it does and its
    parameters (professional documentation habit).
12. Add basic input validation/defensive checks to at least 3 of these functions
    (e.g. `chunk()` should handle a `size` of 0 or negative gracefully).
13. Write at least 2 test cases (just calling the function and checking the output
    with `console.log`/`console.assert`) for EACH utility, confirming correct behavior.
14. Organize this into proper ES Modules (Day 101) if you haven't already — one file
    per logical group, with a clear `index.js` or `app.js` importing and demonstrating
    all of them together.

## Interview-style questions

15. Why is it valuable to build and maintain a personal utility library like this
    across projects, rather than rewriting these functions from scratch each time?
16. Which of these utilities do you think you'll use MOST often in future projects,
    and why?

## Notes

- This is a genuinely useful, portfolio-worthy artifact — many professional developers
  maintain a personal (or team) utility library exactly like this throughout their career.
- Take real care with documentation and testing today — this is explicitly a
  "professional polish" exercise, not just a coding speed-run.
