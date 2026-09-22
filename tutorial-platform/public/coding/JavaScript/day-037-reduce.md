# Day 037 — reduce()

Matches Tutorial Day 37 (The map Method) — practice moves into `reduce()` here, ahead of
Tutorial Day 39. No limit on how many you solve.

## Basic

1. Use `.reduce()` to calculate the sum of all numbers in an array.
2. Use `.reduce()` to calculate the product of all numbers in an array.
3. Use `.reduce()` to find the maximum value in an array.
4. Use `.reduce()` to find the minimum value in an array.
5. Use `.reduce()` to calculate the average of an array of numbers.

## Concept

6. Given an array of cart items (`{name, price, quantity}`), use `.reduce()` to calculate
   the total cart price.
7. Use `.reduce()` to count how many times each value appears in an array (build a
   frequency object).
8. Use `.reduce()` to group an array of numbers into `"even"` and `"odd"` buckets in one object.
9. Use `.reduce()` to flatten a simple array of arrays into a single array (without using `.flat()`).
10. Use `.reduce()` to build a single string out of an array of words (similar to `.join()`,
    but done manually).
11. Use `.reduce()` combined with an initial value object to count how many users are
    `"active"` vs `"inactive"` from an array of user objects.
12. Use `.reduce()` to find the longest string in an array of strings.

## Interview-style questions

13. What are the two main things you pass to `.reduce()`, and what does the "initial value"
    actually control?
14. Why is `.reduce()` sometimes described as "the most powerful" array method (hint:
    think about whether you could implement `map`/`filter` using only `reduce`)?
15. What happens if you call `.reduce()` on an empty array without providing an initial value?

## Notes

- `.reduce()`'s callback takes `(accumulator, currentItem)` — the accumulator carries
  forward whatever you're building up (a sum, an object, a new array, anything).
- Always provide an initial value for `.reduce()` unless you're certain the array will
  never be empty — it avoids a confusing runtime error.
