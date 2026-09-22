# Day 007 — Conditional Practice

Matches Tutorial Day 7 (Operators Part 1). No limit on how many you solve.

## Basic

1. Check if a number is positive, negative, or zero.
2. Check if a number is even or odd.
3. Find the largest of 2 numbers using `if/else`.
4. Find the largest of 3 numbers using `if/else if/else`.
5. Check if a number is within the range 1–10.
6. Check if a character is a vowel using `if/else if`.
7. Check if a year is a leap year.
8. Check if a person is eligible to vote (age `>= 18`).
9. Check if a triangle is valid given 3 side lengths (sum of any two sides > third side).
10. Check if a number is a multiple of both 3 and 5.

## Concept

11. Build a grade calculator: 90+ → A, 75–89 → B, 60–74 → C, below 60 → F.
12. Build an age category checker: child (0–12), teen (13–19), adult (20–59), senior (60+).
13. Build a BMI category checker given height and weight (underweight/normal/overweight/obese).
14. Build a shipping cost calculator: free above a certain order total, flat fee otherwise.
15. Build a simple traffic light state description: red → stop, yellow → slow down, green → go.
16. Build a discount calculator: different discount tiers based on total purchase amount.
17. Check login validity: username must match AND password must match (nested or combined `if`).
18. Build a season identifier from a month number (1–12).
19. Build a simple weekday/weekend checker from a day number (1–7).
20. Build a temperature description: freezing, cold, warm, hot based on ranges.

## Interview-style questions

21. When would you choose nested `if` statements over combining conditions with `&&`?
22. What's the difference between `else if` and writing multiple separate `if` statements?
23. Why can order matter when writing multiple `else if` conditions that check ranges?

## Mini Project

24. Build a complete **Student Grade Calculator**: take marks for 5 subjects, calculate the
    total, average, and final grade (A/B/C/F), and print a clear summary. This should combine
    everything from today — conditions, comparisons, and basic arithmetic.

## Notes

- Test your grade/range checkers with boundary values specifically (e.g. exactly 60, exactly 90) — boundary bugs are one of the most common `if/else` mistakes.
- Keep conditions readable: prefer clear `else if` chains over deeply nested `if` blocks
  when checking a list of ranges.
