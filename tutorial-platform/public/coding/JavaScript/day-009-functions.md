# Day 009 — Functions

Matches Tutorial Day 9 (Modern Operators) — practice moves into functions here, ahead of
Tutorial Day 10, since you'll want the hands-on repetition. No limit on how many you solve.

## Basic

1. Write a function `add(a, b)` that returns the sum.
2. Write a function `subtract(a, b)` that returns the difference.
3. Write a function `multiply(a, b)` that returns the product.
4. Write a function `divide(a, b)` that returns the quotient (handle division by zero).
5. Write a function `isEven(n)` that returns `true`/`false`.
6. Write a function `isOdd(n)` that returns `true`/`false` (can reuse `isEven`).
7. Write a function `square(n)` that returns `n * n`.
8. Write a function `cube(n)` that returns `n ** 3`.
9. Write a function `greet(name)` that returns `"Hello, " + name`.
10. Write a function `isPositive(n)` that returns `true`/`false`.

## Concept

11. Write a function `isPrime(n)` that checks if a number is prime.
12. Write a function `findMax(a, b, c)` that returns the largest of three numbers.
13. Write a function `findMin(a, b, c)` that returns the smallest of three numbers.
14. Write a function `calculatePercentage(score, total)` that returns a percentage.
15. Write a function `factorial(n)` using a loop.
16. Write a function `sumRange(start, end)` that adds all numbers between two values.
17. Write a function `reverseNumber(n)` that reverses the digits of a number.
18. Write a function `countDigits(n)` that returns how many digits a number has.
19. Write a function that takes no parameters and just returns a fixed greeting message.
20. Write a function that calls another one of your functions internally (e.g. `describeNumber(n)` uses `isEven(n)` and `isPositive(n)`).

## Interview-style questions

21. What is the difference between a function's parameters and its arguments?
22. What is the difference between a function that `return`s a value and one that just
    `console.log()`s a value? Why does the difference matter?
23. Can a function call itself? What would you need to be careful about if it did?

## Challenge

24. Build a **reusable utility file** containing all 15+ functions above in one place
    (e.g. `utils.js`), each with a short comment describing what it does. This becomes
    your first personal JavaScript utility library — you'll keep extending it later.

## Notes

- Get comfortable with `return` vs `console.log()` today — a function that only logs
  can't have its result reused elsewhere; a function that returns can.
- Test each function with at least one "normal" case and one "edge" case (like `0`,
  negative numbers, or an empty value).
