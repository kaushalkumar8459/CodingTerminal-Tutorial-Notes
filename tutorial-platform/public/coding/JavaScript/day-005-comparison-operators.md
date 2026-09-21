# Day 005 — Comparison Operators

Matches Tutorial Day 5 (Data Types). No limit on how many you solve.

## Basic

1. Compare two numbers with `>` and print which is greater.
2. Compare two numbers with `<` and print which is smaller.
3. Check if two numbers are equal using `===`.
4. Check if `5 == "5"` — print the result and note that it's `true`.
5. Check if `5 === "5"` — print the result and note that it's `false`.
6. Check if two strings are equal using `===`.
7. Use `>=` to check if a number meets a minimum passing score.
8. Use `<=` to check if a number is within a maximum limit.
9. Check `null == undefined` — print and note the (surprising) result.
10. Check `null === undefined` — print and note the result.

## Concept

11. Write an age eligibility check: return `true` if age is `>= 18`.
12. Compare two passwords (as strings) using `===` and print whether they match.
13. Validate that a number falls within a given range (e.g. between 1 and 100) using `>=` and `<=` together.
14. Write 5 of your own `==` vs `===` examples and predict the output before running them.
15. Compare two arrays with `===` (e.g. `[1,2] === [1,2]`) — print and explain why the result might surprise you (hint: objects/arrays compare by reference).
16. Check whether a user's entered PIN (string) matches a stored PIN (number) using both `==` and `===` — compare the two results.
17. Build a simple range validator: `isInRange(value, min, max)`.
18. Compare today's date year against a birth year to check adulthood (basic subtraction + comparison).
19. Chain multiple comparisons using `&&` (e.g. check a number is both `> 0` and `< 100`).
20. Write a function `isEqualStrict(a, b)` that always uses `===` internally, and test it against tricky pairs like `(0, false)`, `("", false)`, `(null, undefined)`.

## Interview-style questions

21. Explain the difference between `==` and `===` with at least 3 examples where they give different results.
22. Why does `null == undefined` return `true`, but `null === undefined` returns `false`?
23. Give an example of a value pair where `==` returns `true` but would surprise a beginner (e.g. `"0" == false`).

## Challenge (Interview Challenge)

24. Write out and explain 10 different `==` vs `===` examples, predicting each result before
    testing it, then confirm in code with `console.log()`. Include at least 3 "surprising" cases.

## Notes

- Prefer `===` and `!==` in real code — they avoid the confusing implicit type conversion
  that `==`/`!=` perform behind the scenes.
- If you ever _do_ need `==`, make sure you understand exactly why (e.g. checking for both
  `null` and `undefined` in one go).
