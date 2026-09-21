# Day 050 — Reference vs Value

Matches Tutorial Day 50 (Primitive vs Reference Types). No limit on how many you solve.

## Basic

1. Copy a primitive number into a new variable, change the copy, confirm the original is unaffected.
2. Copy an array into a new variable WITHOUT spread, change an element in the "copy",
   and confirm the original changed too.
3. Copy an object into a new variable WITHOUT spread, change a property, confirm the
   original changed too.
4. Compare two identical-looking objects with `===` and confirm the result is `false`.
5. Compare an object to itself (assigned to a second variable) with `===` and confirm
   the result is `true`.

## Concept

6. Write a function that takes a number parameter and tries to change it inside the
   function — confirm the caller's original variable is unaffected.
7. Write a function that takes an object parameter and changes one of its properties —
   confirm the caller's original object IS affected.
8. Write a function that takes an object parameter and reassigns the entire parameter
   to a brand-new object — confirm the caller's original object is NOT affected this time
   (contrast with problem 7).
9. Given an array of objects, copy the array with spread (shallow copy) — confirm the
   array itself is independent, but the objects inside are still shared.
10. Write a simple `isEqualByValue(objA, objB)` function that compares two SIMPLE flat
    objects (no nesting) property by property, instead of using `===`.

## Interview-style questions

11. Why does `===` return `false` for two different objects with identical properties?
12. What's the practical difference between "passing by value" and "passing by
    reference" when calling a function?
13. If you reassign a parameter INSIDE a function (`param = newValue`), does that ever
    affect the caller's original variable, for either primitives or objects? Explain why or why not.

## Notes

- This topic connects directly back to Day 44 (shallow vs deep copy) — today focuses on
  the underlying "why," while Day 44 focused on the practical copying techniques.
- A huge number of real-world bugs come from assuming an object was copied when it
  actually wasn't — build strong intuition here before moving forward.
