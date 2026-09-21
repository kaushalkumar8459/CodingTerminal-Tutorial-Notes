# Day 043 — Spread & Rest

Matches Tutorial Day 43 (Built-in Object Methods) — practice previews spread/rest here,
ahead of Tutorial Day 51's full deep dive. No limit on how many you solve.

## Basic

1. Merge two arrays into one using the spread operator (`[...arr1, ...arr2]`).
2. Merge two objects into one using the spread operator (`{...obj1, ...obj2}`).
3. Copy an array using spread (`[...original]`) and confirm changing the copy doesn't
   affect the original.
4. Copy an object using spread (`{...original}`) and confirm the same for objects.
5. Write a function using rest parameters (`...args`) that accepts any number of numbers
   and returns their sum.

## Concept

6. Merge two objects where the second one should override matching properties from the first.
7. Remove duplicates from an array by combining spread with a `Set`
   (`[...new Set(array)]`).
8. Add a new property to a copy of an object without mutating the original, using spread.
9. Write a function `multiply(...numbers)` using rest parameters that multiplies any
   number of arguments together.
10. Combine spread and destructuring: extract the first item of an array and collect the
    rest into a new array (`const [first, ...rest] = arr`).
11. Write a function that takes a fixed first parameter and then any number of
    additional parameters using rest (e.g. `function logAll(prefix, ...items) {}`).

## Interview-style questions

12. What's the difference between the spread operator and the rest parameter — they use
    the same `...` syntax, so what determines which one is happening?
13. Why is `[...array]` generally considered safer than `array` alone when you want to
    avoid mutating the original?
14. How would you merge two objects with spread if you specifically wanted the FIRST
    object's values to win on conflicts (hint: think about argument order)?

## Notes

- Spread (`...`) is used when "expanding" an existing array/object into individual
  elements/properties. Rest (`...`) is used when "collecting" multiple individual
  values into one array. Same symbol, opposite direction — context tells them apart.
- These shallow copies (spread) only copy one level deep — nested objects/arrays inside
  are still shared by reference. We'll cover this fully on Day 44 (shallow vs deep copy).
