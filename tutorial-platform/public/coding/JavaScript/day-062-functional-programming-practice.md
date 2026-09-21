# Day 062 — Functional Programming Practice

Matches Tutorial Day 62 (Advanced Object Concepts). Combines map/filter/reduce, closures,
higher-order functions, and pure functions together. No limit on how many you solve.

## Basic — pure functions

1. Write a "pure" function `add(a, b)` that always returns the same output for the same
   input and has no side effects (no logging, no modifying outside variables).
2. Write an "impure" version of the same function that modifies an outside variable, and
   explain in a comment why it's impure.
3. Rewrite an impure function from an earlier day's practice (any day) to be pure instead.

## Concept — combining functional techniques

4. Use `.map()` combined with a helper pure function (not an inline arrow) to transform
   an array of prices with tax applied.
5. Use `.filter()` combined with a closure-based function (e.g. a function returned from
   `isAbovePrice(threshold)`) to filter products dynamically by different thresholds.
6. Use `.reduce()` to implement a `pipe(...)`-like function that runs a value through
   multiple transformation functions in sequence (e.g. `pipe(double, addOne)(5)`).
7. Write a `compose(...)` function similar to `pipe` but applying functions right-to-left
   instead of left-to-right.
8. Combine a higher-order function with a closure: write `createValidator(rule)` that
   returns a validation function customized by `rule`.

## Interview-style questions

9. What makes a function "pure," and why are pure functions considered easier to test
   and reason about?
10. How does `pipe()`/`compose()` relate to the higher-order function concepts from
    Day 56?
11. Why might functional programming techniques (pure functions, avoiding mutation)
    reduce bugs in larger applications?

## Notes

- "Functional programming" isn't a completely separate topic from what you've already
  learned — it's really just a disciplined STYLE of using functions, closures, and
  higher-order functions, all of which you've already practiced extensively.
- `pipe`/`compose` patterns show up frequently in real-world utility libraries and some
  frameworks — worth having genuine hands-on practice with both directions.
