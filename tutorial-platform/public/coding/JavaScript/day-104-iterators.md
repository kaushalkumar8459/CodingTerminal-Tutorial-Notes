# Day 104 — Iterators (range, customIterator, paginationIterator)

Matches Tutorial Day 104 (Iterators). No limit on how many you build.

## Basic

1. Build a `range(start, end)` function returning an iterable object usable with
   `for...of`, producing numbers from `start` to `end`.
2. Build a `range(start, end, step)` version supporting a custom step size (e.g. every
   2nd number).
3. Manually consume your `range()` iterator using a `while` loop and `.next()`,
   without using `for...of`.
4. Build a custom iterable `Countdown` class that counts DOWN from a given starting
   number to 0.
5. Confirm your `Countdown` instances work correctly with `for...of`, `[...spread]`,
   and destructuring (e.g. `const [first, second] = new Countdown(5)`).

## Concept — customIterator

6. Build a `customIterator(array)` function that returns a plain iterator (with just
   `.next()`, not necessarily a full iterable) over an array's values.
7. Build an iterable `WordIterator` class that iterates over the WORDS of a sentence
   (splitting on spaces internally), usable with `for...of`.
8. Build an iterable that iterates over an object's `[key, value]` pairs (similar to
   what `Object.entries()` already gives you, but built manually with
   `[Symbol.iterator]`).

## Challenge — paginationIterator

9. Build a `paginationIterator(items, pageSize)` that returns an iterable where each
   `.next()` call gives you the NEXT PAGE (an array of up to `pageSize` items), until
   all items have been paginated through.
10. Test your `paginationIterator` with a list of 25 items and a page size of 10 —
    confirm it produces exactly 3 pages (10, 10, 5).

## Interview-style questions

11. What two things does an object need to be considered "iterable" in JavaScript?
12. Why does `for...of` work on arrays/strings/Sets/Maps but NOT on plain objects
    by default?
13. What's the practical difference between an "iterator" and something that's
    "iterable"?

## Notes

- Building your own iterables is genuinely advanced, valuable JavaScript knowledge —
  don't worry if it takes some time to feel natural.
- The `paginationIterator` challenge is a great preview of a genuinely useful,
  real-world pattern (loading data page by page).
