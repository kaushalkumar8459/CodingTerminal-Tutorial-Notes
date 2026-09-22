# Day 034 — forEach()

Matches Tutorial Day 34 (Array Modification In Depth) — practice moves into `forEach()`
here, ahead of Tutorial Day 36. No limit on how many you solve.

## Basic

1. Use `.forEach()` to print every item in an array of numbers.
2. Use `.forEach()` to print every item in an array of strings, in uppercase.
3. Use `.forEach()` to calculate the sum of all numbers in an array (accumulate in an
   outside variable).
4. Use `.forEach()` with the index parameter to print `"Item 1: ..."`, `"Item 2: ..."`, etc.
5. Use `.forEach()` to count how many items in an array meet a condition (e.g. numbers over 50).

## Concept

6. Given an array of user objects, use `.forEach()` to print each user's name.
7. Given an array of user objects, use `.forEach()` to modify each object (e.g. add an
   `isActive: true` property to every user).
8. Given an array of product objects, use `.forEach()` to calculate a grand total price.
9. Use `.forEach()` to build an HTML string (e.g. `<li>item</li>` per array item) —
   just build the string, no need for a real page.
10. Use `.forEach()` to count how many values in an array are strings vs numbers (mixed array).

## Interview-style questions

11. Does `.forEach()` return a new array? What does it actually return?
12. Can you `break` out of a `.forEach()` loop early? What would you use instead if you needed that?
13. What's the difference between using a regular `for` loop and `.forEach()` for the
    same task — when might you still prefer the regular `for` loop?

## Notes

- `.forEach()` doesn't return anything useful (`undefined`) — use it only when you want
  to run some action per item, not when you need to build a new array (that's `map()`,
  covered on Day 37).
- You cannot `break`/`continue` inside `.forEach()` — if you need early exit, a regular
  loop or `.some()`/`.every()` (Day 40) is the right tool instead.
