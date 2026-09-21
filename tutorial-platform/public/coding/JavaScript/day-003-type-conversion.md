# Day 003 — Type Conversion

Matches Tutorial Day 3 (Syntax basics) — practice here jumps ahead slightly to type
conversion, since it naturally follows Day 2's data types. No limit on how many you solve.

## Basic

1. Convert the string `"25"` to a number using `Number()`.
2. Convert the number `25` to a string using `String()`.
3. Convert the string `"0"` to a boolean using `Boolean()` — check the result.
4. Convert the string `""` (empty) to a boolean using `Boolean()` — check the result.
5. Use `parseInt("42px")` and print the result.
6. Use `parseFloat("3.14 is pi")` and print the result.
7. Convert `true` and `false` to strings using `String()`.
8. Convert the string `"3.99"` to a number and then round it.
9. Try `Number("hello")` and print the result — what do you get?
10. Try `Number("   42   ")` (with spaces) and print the result.

## Concept

11. Write a function that takes a string number and returns it doubled (convert first).
12. Add two values that arrive as strings (e.g. `"10"` and `"20"`) and return the correct numeric sum.
13. Convert a decimal string like `"99.99"` into a whole number using `parseInt()`.
14. Write a function `toBoolean(value)` that shows how `Boolean()` treats different inputs.
15. Given a list of string prices (e.g. `["10", "20", "30"]`), calculate their total as numbers.
16. Handle an invalid number string (e.g. `"abc"`) gracefully — check with `Number.isNaN()`.
17. Detect and print `true`/`false` for whether a value is `NaN`.
18. Convert user input (always a string in real forms) into a number safely before doing math on it.
19. Show the difference between `parseInt("10.99")` and `Number("10.99")`.
20. Convert a number with commas as a string, e.g. `"1,000"`, and try to convert it — what goes wrong, and how would you fix it?

## Interview-style questions

21. What is the difference between implicit and explicit type conversion? Give one example of each.
22. Why does `Number("")` return `0` but `Number(" ")` (a space) also return `0`?
23. What's the difference between `parseInt()` and `Number()` when converting `"42abc"`?

## Challenge

24. Build a small **calculator that accepts string input** for both numbers (e.g. `"10"` and
    `"5"`), converts them safely, performs `+ - * /`, and handles invalid input without crashing.

## Notes

- Always convert to the right type _before_ doing math — mixing strings and numbers with `+`
  is one of the most common beginner bugs (`"10" + 5` gives `"105"`, not `15`).
- Keep testing with weird/edge-case inputs (empty strings, spaces, letters mixed with numbers)
  — that's where conversion bugs usually hide.
