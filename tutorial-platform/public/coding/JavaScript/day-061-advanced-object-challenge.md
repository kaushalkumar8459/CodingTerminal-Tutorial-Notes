# Day 061 — Advanced Object Challenge (deepClone, deepFreeze, isEqual, flattenObject)

Matches Tutorial Day 61 (Prototype Inheritance In Depth). No limit on how many you build.

## Build these

1. `deepClone(obj)` — recursively copies an object (and any nested objects/arrays)
   so that changing the copy NEVER affects the original, at any depth. (You may use
   `structuredClone()` to verify your manual version is correct, but build the manual
   recursive version yourself first.)
2. `deepFreeze(obj)` — recursively freezes an object AND all nested objects/arrays
   inside it, so nothing anywhere in the structure can be modified.
3. `isEqual(objA, objB)` — recursively compares two objects (including nested
   objects/arrays) and returns `true` only if they have identical structure and values
   throughout.
4. `flattenObject(obj)` — converts a deeply nested object into a single flat object
   with dot-notation keys (e.g. `{a: {b: {c: 1}}}` → `{"a.b.c": 1}`).

## Concept

5. Test `deepClone()` on an object containing arrays, nested objects, and a mix of
   primitive values — confirm changing any nested value in the clone never affects
   the original.
6. Test `deepFreeze()` by attempting to change a deeply nested property after freezing
   — confirm it's actually blocked (not just the top level).
7. Test `isEqual()` with two objects that look identical but were built completely
   separately (different object references) — confirm it correctly returns `true`
   based on content, unlike `===`.
8. Test `isEqual()` with two objects that differ only in a deeply nested value —
   confirm it correctly returns `false`.
9. Test `flattenObject()` on an object containing an array as one of its nested values
   — decide and document how your function should handle arrays (flatten them too, or
   treat them as a single value?).

## Interview-style questions

10. Why is a RECURSIVE approach necessary for `deepClone`/`deepFreeze`/`isEqual`,
    instead of just looping through top-level keys once?
11. What's the relationship between `deepClone()` and `structuredClone()` — when would
    you still want your own manual version instead of the built-in one?
12. Why doesn't `Object.freeze()` alone protect nested objects, and how does
    `deepFreeze()` fix that?

## Notes

- These four functions are genuinely useful utilities you'll likely reuse in real
  projects, not just interview practice — consider keeping them in a personal utility
  file going forward.
- Recursion (a function calling itself on nested data) is the natural fit for all four
  of these — if recursion feels unfamiliar, start with the simplest possible nested case
  (one level deep) before testing deeper nesting.
