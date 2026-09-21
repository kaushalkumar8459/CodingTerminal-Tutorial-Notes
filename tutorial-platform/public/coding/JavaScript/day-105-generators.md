# Day 105 — Generators (idGenerator, numberGenerator, passwordGenerator)

Matches Tutorial Day 105 (Generators). No limit on how many you build.

## Basic

1. Write a generator `function* countUp(max)` that yields 1, 2, 3, ... up to `max`.
2. Use `for...of` to consume your `countUp()` generator directly.
3. Convert a generator's output into a real array using `[...generatorCall()]`.
4. Rewrite your Day 104 `range(start, end)` iterator as a generator instead, and
   compare the code length/complexity.
5. Write a generator that yields the characters of a string, one at a time.

## Build these

6. `function* idGenerator()` — an INFINITE generator that yields a new unique ID
   (e.g. `1, 2, 3, ...`) every time `.next()` is called.
7. `function* numberGenerator(start, step)` — an infinite generator yielding numbers
   starting at `start`, incrementing by `step` each time.
8. `function* passwordGenerator(length)` — yields ONE random password of the given
   length each time `.next()` is called (reuse `Math.random()`-based logic from
   earlier days).
9. Use your `idGenerator()` to assign unique IDs to a list of objects you create
   (e.g. todo items), confirming each gets a genuinely unique, sequential ID.

## Concept

10. Combine `countUp()` with `.take(n)`-style logic: write a helper function
    `take(generator, n)` that pulls only the FIRST `n` values out of any (possibly
    infinite) generator, into a real array.
11. Rebuild your Day 104 `paginationIterator` as a generator instead.
12. Write a generator that yields Fibonacci numbers indefinitely, then use your
    `take()` helper from #10 to get just the first 10.

## Interview-style questions

13. What's the main advantage of writing `idGenerator()` as a generator, compared to
    a regular function using a closure-based counter (from Day 53)?
14. Why is it safe to define an INFINITE generator (like `numberGenerator`), when it
    would be dangerous to try to build an infinite ARRAY directly?
15. What does `yield` actually do to a generator function's execution, step by step?

## Notes

- Generators are a genuinely elegant solution for infinite or lazy sequences —
  `idGenerator()` and `numberGenerator()` are exactly the kind of real-world utility
  generators are best suited for.
- Compare your generator-based solutions directly against your Day 104 manual iterator
  versions — the difference in code simplicity should be very noticeable.
