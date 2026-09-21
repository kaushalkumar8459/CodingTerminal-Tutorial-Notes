# Day 074 — WeakMap / WeakSet

Matches Tutorial Day 74 (Advanced Collections - Set). No limit on how many you explore.

## Basic

1. Create a `WeakMap` and set an object as a key with some associated metadata value.
2. Try using a STRING as a `WeakMap` key and observe what happens (compare to using an
   object as a key).
3. Create a `WeakSet` and add a couple of objects to it.
4. Use `.has()` on a `WeakSet` to check if a specific object is present.
5. Try to loop over a `WeakMap`/`WeakSet` with `for...of` and observe what happens
   (compare to a regular `Map`/`Set`).

## Concept

6. Use a `WeakMap` to attach "private metadata" to a set of DOM-like objects (simulate
   with plain objects) without modifying the objects themselves directly.
7. Use a `WeakSet` to track which objects in your program have already been
   "processed," without preventing them from being garbage collected once no longer
   needed elsewhere.
8. Explain, in a comment, why `WeakMap`/`WeakSet` keys/values must be objects, never
   primitives (like strings or numbers).
9. Compare a regular `Map` used for the same "track processed objects" purpose — what
   would be the practical downside of using a regular `Map` instead of a `WeakSet` here?

## Interview-style questions

10. What is the key difference between `Map`/`Set` and `WeakMap`/`WeakSet`?
11. Why can't you iterate over a `WeakMap` or `WeakSet` the way you can with a regular
    `Map`/`Set`?
12. What does "garbage collection" mean, and why does it matter for understanding why
    `WeakMap`/`WeakSet` exist at all (a light preview of Day 106's Memory Management)?

## Notes

- `WeakMap`/`WeakSet` are genuinely niche compared to `Map`/`Set` — most everyday code
  uses regular `Map`/`Set`. Today is about AWARENESS of when they exist and why, not
  heavy day-to-day usage.
- The core reason they exist: they don't prevent their object keys/values from being
  cleaned up (garbage collected) when nothing else references them — useful for
  metadata that should "disappear" alongside the object it's attached to.
