# Day 023 — for...in Practice

Matches Tutorial Day 23 (The `for...in` Loop). No limit on how many you solve.

## Basic

1. Print all property names of an object using `for...in`.
2. Print all property names AND values of an object using `for...in`.
3. Count how many properties an object has using `for...in`.
4. Search for a specific property name in an object using `for...in`, printing whether it exists.
5. Print only the properties whose value is a number, skipping the rest.

## Concept

6. Find the property with the highest numeric value in an object (e.g. highest test score
   among subjects).
7. Convert an object into an array of `[key, value]` pairs manually using `for...in`.
8. Build a new object that only contains the properties whose value is truthy.
9. Sum all numeric values in an object using `for...in`.
10. Given a nested object (an object containing another object), loop over the outer
    object and print each inner object's properties too.

## Interview-style questions

11. What does `for...in` actually give you on each iteration — the key, the value, or both?
12. Why is using `for...in` on an array generally discouraged?
13. How would you access a property's value inside a `for...in` loop, given only the key?

## Notes

- Always double check: are you looping over an **object** (use `for...in`) or an
  **array/string/collection** (use `for...of`)? Mixing these up is extremely common
  early on.
- These manual patterns (counting, searching, converting to pairs) will get much simpler
  once `Object.keys/values/entries()` are introduced on Day 43 — today builds the
  foundation for appreciating why those methods exist.
