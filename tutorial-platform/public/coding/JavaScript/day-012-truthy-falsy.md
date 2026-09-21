# Day 012 — Truthy/Falsy

Matches Tutorial Day 12 (Arrow Functions) — practice covers truthy/falsy in depth here,
reinforcing Day 6's intro. No limit on how many you solve.

## Basic

1. List all 6 falsy values from memory, then verify each with `if (!value)`.
2. Check whether `0` is truthy or falsy by testing it in an `if`.
3. Check whether `"0"` (a string) is truthy or falsy by testing it in an `if`.
4. Check whether `[]` (empty array) is truthy or falsy.
5. Check whether `{}` (empty object) is truthy or falsy.
6. Write a condition that only runs code when a variable is NOT `undefined`.
7. Write a condition that only runs code when a string is non-empty.
8. Use `!!value` to convert any value into an explicit `true`/`false`.
9. Test `!!0`, `!!"hello"`, `!!null`, `!!NaN` and print each result.
10. Write a condition that treats both `null` and `undefined` as "missing" using `==`.

## Concept

11. Write a `validateUsername(username)` function: must be truthy and at least 3 characters.
12. Write a `validateEmail(email)` function: must be truthy and contain `"@"`.
13. Write a function that provides a default value using `||` when a parameter is falsy.
14. Show a case where using `||` for a default is WRONG (hint: think about a value of `0`),
    then fix it using `??` instead.
15. Write a form validator that checks 3 fields are all truthy before allowing submission.
16. Build a function `hasValue(x)` that returns `true` only for values that are NOT falsy.
17. Write a function that treats an empty array as "no items" using truthy/falsy logic.
18. Write a function that safely provides a fallback display name when a user's name field is empty or missing.
19. Build a simple "required field" checker for a signup form (name, email, password all required).
20. Explain, using an example, why checking `if (array.length)` is a common truthy-based pattern for "array is not empty."

## Interview-style questions

21. What are the exact 6 falsy values in JavaScript? Is there any value people commonly
    assume is falsy but actually isn't (e.g. `"0"`, `[]`)?
22. What does `!!value` actually do, step by step?
23. Why is `??` sometimes a better choice than `||` when providing default values?

## Notes

- Truthy/falsy checks appear constantly in real form validation — today's practice is
  directly useful for later projects like the Expense Tracker (Day 15) and beyond.
- Keep testing "trick" values (`"0"`, `[]`, `{}`) until the truthy/falsy list feels fully
  natural — this is one of the most commonly misunderstood areas for beginners.
