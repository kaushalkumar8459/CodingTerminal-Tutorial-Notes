# Day 010 — Function Parameters

Matches Tutorial Day 10 (Functions Introduction). No limit on how many you solve.

## Basic

1. Write a `greeting(name)` function that prints a personalized greeting.
2. Write a function with two parameters that returns their sum.
3. Write a function with three parameters that returns their average.
4. Write a function `greeting(name = "Guest")` using a default parameter — call it with and without an argument.
5. Write a function that returns a value vs one that only `console.log()`s it — show the difference by trying to reuse each result.
6. Write a function `calculateTax(amount, rate = 0.18)` using a default rate.
7. Write a function `fullName(first, last)` that returns the combined name.
8. Write a function that takes 4 parameters and returns them combined into one sentence.
9. Write a function with a default parameter that depends on another parameter's typical value (e.g. `discount(price, percent = 10)`).
10. Call the same function multiple times with different arguments and print each result.

## Concept

11. Write a function `calculateDiscount(price, percent)` that returns the discounted price.
12. Write a function `calculateSalary(basic, hra, deductions)` that returns net salary.
13. Write a function `calculateEMI(principal, rate, months)` using a simplified EMI formula.
14. Write a function `generateUsername(firstName, lastName)` that returns a lowercase combined username.
15. Write a function that demonstrates function scope: declare a variable inside a function and show it's not accessible outside.
16. Write a function with 5 parameters, 2 of which have defaults — call it in a few different ways.
17. Write a function `formatPrice(amount, currency = "INR")` returning a formatted string.
18. Build a small set of 3 reusable functions that call each other (e.g. `calculateTotal()` uses `calculateTax()`).
19. Show what happens when you call a function with fewer arguments than parameters (log the "missing" parameter).
20. Show what happens when you call a function with more arguments than parameters (the extras are simply ignored, unless you use `arguments` or rest params).

## Interview-style questions

21. What happens to a parameter that doesn't receive an argument when the function is called?
22. Why are default parameters useful, and how do they interact with `undefined` arguments specifically?
23. What is function scope, and why can't code outside a function see variables declared inside it?

## Notes

- Default parameters only kick in when an argument is `undefined` — passing `null` or `0`
  explicitly will NOT trigger the default. Test this yourself to see it firsthand.
- Keep functions focused on one clear task each — if a function is trying to do 3 different
  things, it's usually a sign to split it into smaller functions.
