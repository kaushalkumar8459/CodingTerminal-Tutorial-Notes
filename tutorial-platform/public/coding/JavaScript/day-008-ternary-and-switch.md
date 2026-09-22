# Day 008 — Ternary & Switch

Matches Tutorial Day 8 (Operators Part 2). No limit on how many you solve.

## Basic

1. Use a ternary operator to check if a number is even or odd.
2. Use a ternary operator to print "Adult" or "Minor" based on age.
3. Use a ternary operator to return the larger of two numbers.
4. Rewrite one of Day 7's `if/else` answers using a ternary instead.
5. Use `switch` to print the name of a day given a day number (1–7).
6. Use `switch` to print the name of a month given a month number (1–12).
7. Use `switch` with a `default` case for invalid input.
8. Use `switch` to check login status: `"active"`, `"banned"`, `"pending"`.
9. Use a ternary to print "Pass" or "Fail" based on a marks value.
10. Use `switch` to describe a traffic light color: red/yellow/green.

## Concept

11. Build a nested ternary (use sparingly!) to categorize a number as negative/zero/positive.
12. Use `switch` with multiple `case` labels falling through to the same result (e.g. weekend days).
13. Build a simple calculator using `switch` for the operator (`+ - * /`).
14. Compare the same logic written with `if/else if` vs `switch` — which reads better here, and why?
15. Use a ternary inside a template literal to build a dynamic message string.
16. Build a `switch` statement that maps a user role string to a permission level.
17. Use ternary + logical operators together (e.g. `isMember && hasCoupon ? ... : ...`).
18. Build a `switch` that returns a season name from a month number.
19. Explain (in a comment) why forgetting `break` in a `switch` case causes fall-through bugs.
20. Rebuild the Day 7 "traffic light" answer using `switch` instead of `if/else`.

## Interview-style questions

21. When would you prefer `switch` over a long `if/else if` chain?
22. What happens if you forget `break` inside a `switch` case?
23. Can a ternary operator fully replace `if/else`? When does it start to hurt readability?

## Challenge

24. Build a **menu-driven calculator**: given an operator symbol (`+ - * /`) and two numbers,
    use `switch` to perform the correct calculation and handle an unknown operator with `default`.

## Notes

- Ternaries are great for simple "pick one of two values" situations — avoid nesting them
  more than once, it gets hard to read fast.
- Always include a `default` case in `switch` statements so unexpected input doesn't
  silently do nothing.
