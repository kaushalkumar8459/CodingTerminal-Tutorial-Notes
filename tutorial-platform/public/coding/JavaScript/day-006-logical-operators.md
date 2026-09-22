# Day 006 — Logical Operators

Matches Tutorial Day 6 (Type Conversion & Coercion). No limit on how many you solve.

## Basic

1. Use `&&` to check that a number is both greater than 0 and less than 100.
2. Use `||` to check if a value is either `"admin"` or `"owner"`.
3. Use `!` to flip a boolean value and print the result.
4. Combine `&&` and `||` in a single condition and predict the output before running it.
5. Check if a username is non-empty AND has at least 3 characters.
6. Check if a user is logged in OR is a guest with limited access.
7. Use short-circuit evaluation: `someValue || "default"` to provide a fallback value.
8. Use short-circuit evaluation: `someValue && doSomething()` to run code only if `someValue` is truthy.
9. Write a condition that is `true` only when exactly one of two booleans is `true` (not both).
10. Print the result of `true && false`, `true || false`, and `!true` on separate lines.

## Concept

11. Build a login validator: `true` only if both username and password are provided (non-empty).
12. Validate age (`>= 18`) AND country (`=== "India"`) together for eligibility.
13. Combine 3+ conditions (age, country, and verified status) into one eligibility check.
14. Build an admin permission checker using `&&`: admin AND active account.
15. Check product availability: in stock (`quantity > 0`) AND not discontinued.
16. Use `||` to assign a default cart total when the actual total is `undefined` or `0`.
17. Build a function `canVote(age, isCitizen)` using `&&`.
18. Build a function `hasDiscount(isMember, cartTotal)` — true if member OR cart total is over a threshold.
19. Explain with an example why `a && b` returns `b` (not just `true`/`false`) when `a` is truthy.
20. Explain with an example why `a || b` returns `a` when `a` is truthy, and `b` otherwise.

## Interview-style questions

21. What is short-circuit evaluation, and why is it useful?
22. What does `&&` return when the first operand is falsy? What does it return when it's truthy?
23. What does `||` return when the first operand is truthy? What about when it's falsy?

## Challenge

24. Build a **permission checker** that returns access level based on role:
    - `"admin"` → full access
    - `"manager"` → limited access
    - `"user"` → read only
    - anything else (e.g. `"guest"`) → no access
      Use logical operators combined with conditionals to build this.

## Notes

- `&&` and `||` don't just return `true`/`false` — they return one of the actual operand
  values. Understanding this unlocks a lot of clean, short JavaScript patterns later
  (like default values).
- Keep your conditions readable — if a condition needs more than 3 combined checks,
  consider breaking it into a named variable first (e.g. `const isEligible = ...`).
