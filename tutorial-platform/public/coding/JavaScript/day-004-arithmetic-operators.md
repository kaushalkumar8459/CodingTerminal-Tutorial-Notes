# Day 004 — Arithmetic Operators

Matches Tutorial Day 4 (Variables). No limit on how many you solve.

## Basic

1. Check whether a number is even or odd using `%`.
2. Find the last digit of a number using `%`.
3. Find the sum of digits of a number (e.g. 123 → 6).
4. Calculate the square of a number using `**` (or `*`).
5. Calculate the cube of a number using `**`.
6. Divide two numbers and print both the quotient and the remainder.
7. Calculate the area of a rectangle given length and width.
8. Calculate the area of a triangle given base and height.
9. Calculate the average of 3 numbers.
10. Calculate the average of an array of numbers using a loop or `reduce()` (whichever you know so far — a simple loop is fine).

## Concept

11. Build a "remainder calculator" that takes two numbers and prints the remainder.
12. Calculate the perimeter of a rectangle given length and width.
13. Calculate the area of a circle given the radius (`Math.PI`).
14. Given hours worked and hourly rate, calculate total pay.
15. Given a number, print whether it's positive, negative, or zero using arithmetic + comparison.
16. Convert minutes into hours and remaining minutes (e.g. 130 minutes → 2 hours 10 minutes).
17. Given a distance and time, calculate speed (`distance / time`).
18. Given three test scores, calculate the average and round it to 2 decimal places.
19. Calculate compound values step by step: start with a number, add 10, multiply by 2, subtract 5 — print result after each step.
20. Write a function `average(...numbers)` that averages any amount of numbers passed to it (rest parameters are fine to try, even before we cover them formally).

## Interview-style questions

21. What is the difference between `%` (modulo) and `/` (division) in JavaScript?
22. Why does `0.1 + 0.2` not exactly equal `0.3` in JavaScript? (You don't need to fully explain floating-point internals — just notice the behavior.)
23. What does the exponentiation operator `**` do, and how is it different from `Math.pow()`?

## Challenge

24. Build a **marks percentage calculator**: given marks scored and total marks, calculate
    and print the percentage, rounded to 2 decimal places.

## Notes

- Keep an eye on operator precedence — `2 + 3 * 4` is `14`, not `20`, because `*` runs
  before `+`. Use parentheses `()` whenever you're not 100% sure of the order.
- Precision issues with decimals (like `0.1 + 0.2`) are normal in JavaScript (and most
  languages) — don't worry about "fixing" it today, just be aware it exists.
