# Day 035 — map()

Matches Tutorial Day 35 (Array Searching and Extraction) — practice moves into `map()`
here, ahead of Tutorial Day 37. No limit on how many you solve.

## Basic

1. Use `.map()` to double every number in an array.
2. Use `.map()` to square every number in an array.
3. Use `.map()` to convert an array of strings to all uppercase.
4. Use `.map()` to extract just the `name` property from an array of user objects.
5. Use `.map()` to add `10%` tax to an array of prices, returning the new prices.

## Concept

6. Use `.map()` to format an array of numbers as currency strings (e.g. `499` → `"$499.00"`).
7. Use `.map()` to convert an array of product objects into an array of formatted display
   strings (e.g. `"Laptop - $55000"`).
8. Given an array of raw API-style objects, use `.map()` to reshape each one into a
   simpler object with only the fields you need.
9. Use `.map()` combined with a ternary to label numbers as `"even"`/`"odd"`.
10. Use `.map()` to convert an array of Celsius temperatures into Fahrenheit.
11. Use `.map()` to add an `index`-based ID to each item in an array of objects (e.g. `id: index + 1`).
12. Chain `.map()` with `.join()` to convert a transformed array back into a single string.

## Interview-style questions

13. What's the key difference between `.map()` and `.forEach()`?
14. Does `.map()` mutate the original array? What does it return?
15. Why is `.map()` a good fit for "reshaping API data" tasks specifically?

## Notes

- `.map()` ALWAYS returns a new array of the same length as the original — one output
  value per input value. If you find yourself skipping items, you actually want
  `.filter()` (tomorrow) instead.
- Try rewriting a few of your Day 34 `.forEach()` answers using `.map()` where it fits,
  to feel the difference between "do something per item" and "transform into something new."
