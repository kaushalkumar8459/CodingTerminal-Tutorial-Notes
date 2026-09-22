# Day 044 — Shallow vs Deep Copy

Matches Tutorial Day 44 (Destructuring In Depth). No limit on how many you solve.

## Basic

1. Copy a primitive value (a number) into a new variable, change the copy, and confirm
   the original is unaffected.
2. Copy an array using spread (`[...arr]`), change an element in the copy, and confirm
   the original array is unaffected.
3. Copy an object using spread (`{...obj}`), change a top-level property in the copy,
   and confirm the original is unaffected.
4. Copy an object using `Object.assign({}, obj)` and compare the result to spread —
   are they equivalent here?
5. Assign an array to a new variable WITHOUT spread (`const copy = original`), modify
   the "copy", and observe that the original changed too — explain why in a comment.

## Concept — where shallow copies fail

6. Create an object with a NESTED object inside it. Shallow-copy the outer object with
   spread, then change a property on the NESTED object through the copy — confirm the
   original's nested object was affected too (this is the shallow-copy trap).
7. Create an array of objects. Shallow-copy the array with spread, then modify one of
   the objects inside — confirm the original array's objects were affected too.
8. Use `structuredClone()` to deep-copy the same nested object from problem #6, and
   confirm changing the nested property in the copy does NOT affect the original this time.
9. Write your own simple `deepCopy(obj)` function using `JSON.parse(JSON.stringify(obj))`,
   and test it against a nested object.
10. Identify a case where `JSON.parse(JSON.stringify(obj))` would fail to deep-copy
    correctly (hint: think about functions, `undefined`, or special values like `Date`
    inside the object).

## Challenge

11. Create a clear, documented set of examples (with comments) demonstrating exactly
    when `Object.assign`/spread succeed at copying, and exactly when they fail
    (specifically due to nested objects/arrays) — this becomes a personal reference
    you can look back on.

## Interview-style questions

12. What is the core difference between a shallow copy and a deep copy?
13. Why does `{...obj}` only protect you from mutations at the TOP level of an object?
14. What are the tradeoffs of using `structuredClone()` vs `JSON.parse(JSON.stringify())`
    for deep copying?

## Notes

- This is one of the most important practical JavaScript topics — bugs from accidental
  shared references (thinking you copied something, but you didn't, deeply) are extremely
  common in real applications.
- `structuredClone()` is the modern, built-in way to deep-copy most values reliably —
  prefer it over the `JSON.parse(JSON.stringify())` trick when available.
