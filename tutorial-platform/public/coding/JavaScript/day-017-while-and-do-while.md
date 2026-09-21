# Day 017 — while & do...while

Matches Tutorial Day 17 (The `switch` Statement) — practice covers `while`/`do...while`
here, ahead of Tutorial Day 20. No limit on how many you solve.

## Basic

1. Print numbers 1 to 10 using a `while` loop.
2. Print a countdown from 10 to 1 using a `while` loop.
3. Use a `do...while` loop to print a value at least once, even if the condition starts false.
4. Sum numbers from 1 to 50 using a `while` loop.
5. Count how many digits a number has using a `while` loop.

## Concept

6. Reverse a number using a `while` loop (e.g. 123 → 321).
7. Simulate a "password retry" system: keep asking (looping) until a hardcoded correct
   value is "entered" (simulate input with a fixed array of attempts), max 3 tries.
8. Simulate a simple "number guessing" loop: loop through a list of guesses and stop as
   soon as the correct number is found.
9. Use a `do...while` loop to guarantee a menu prints at least once before checking an exit condition.
10. Write a `while` loop that keeps doubling a number until it exceeds 1000, printing each step.

## Interview-style questions

11. What is the key difference between `while` and `do...while`?
12. Why must a `while` loop's condition eventually become false, and what happens if it doesn't?
13. Give a real example where `do...while` is genuinely more appropriate than `while`.

## Notes

- Always trace through your `while` loop's condition on paper (or in comments) before
  running it — infinite loops are the most common bug here.
- `do...while` is used far less often than `while`/`for`, but it's the right tool
  whenever you need the loop body to run at least once no matter what.
