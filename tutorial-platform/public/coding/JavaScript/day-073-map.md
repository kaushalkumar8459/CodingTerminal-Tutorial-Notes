# Day 073 — Map (frequencyCounter, cache, userLookup, productLookup)

Matches Tutorial Day 73 (OOP Project). No limit on how many you build.

## Basic

1. Create a `Map` and add a few key-value pairs using `.set()`.
2. Retrieve a value from a `Map` using `.get()`.
3. Check if a key exists in a `Map` using `.has()`.
4. Remove a key from a `Map` using `.delete()`.
5. Loop over a `Map` using `for...of` and print each `[key, value]` pair.

## Concept

6. Build a `frequencyCounter(array)` function using a `Map` instead of a plain object —
   compare this to your Day 39/45 object-based frequency counters.
7. Build a `userLookup` `Map` keyed by user ID, allowing instant lookup of full user
   objects by ID.
8. Build a `productLookup` `Map` keyed by product SKU/ID for instant product lookups.
9. Compare using a `Map` vs a plain object for these lookups — what are the practical
   differences (e.g. key types, iteration order, built-in `.size`)?
10. Convert a `Map` into an array of `[key, value]` pairs using `[...map]` or
    `Array.from(map)`.

## Challenge — cache

11. Build a simple `cache` using a `Map`: a function `getOrCompute(key, computeFn)`
    that returns the cached value if `key` already exists in the `Map`, otherwise
    computes it with `computeFn`, stores it, and returns it.
12. Test your cache with a deliberately slow `computeFn` and confirm the SECOND call
    with the same key is instant (similar to Day 54's `memoize()`, but using a `Map`
    explicitly instead of a plain object).

## Interview-style questions

13. What are the practical differences between a `Map` and a plain object for storing
    key-value data?
14. Why can a `Map`'s keys be ANY type (including objects), while a plain object's keys
    are always converted to strings?
15. When would you choose a `Map` over a plain object for a lookup table?

## Notes

- `Map` preserves insertion order reliably and allows non-string keys — both genuine
  advantages over plain objects in certain situations.
- The cache/`memoize()` pattern reappears constantly in real applications — get
  comfortable building it with both objects (Day 54) and `Map` (today).
