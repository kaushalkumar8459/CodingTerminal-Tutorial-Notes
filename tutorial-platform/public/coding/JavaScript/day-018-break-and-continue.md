# Day 018 — break & continue

Matches Tutorial Day 18 (Ternary & Conditional Logic) — practice covers `break`/`continue`
here, ahead of Tutorial Day 21. No limit on how many you solve.

## Basic

1. Loop from 1 to 20, but stop completely (`break`) once you reach 10.
2. Loop from 1 to 20, but skip (`continue`) all multiples of 3.
3. Loop through a fixed array and stop as soon as you find a specific value.
4. Loop from 1 to 100 and stop as soon as you find the first number divisible by 7 and 3.
5. Print numbers 1 to 20, skipping even numbers using `continue`.

## Concept

6. Search a fixed array for the first negative number, stopping as soon as it's found.
7. Loop through numbers 2 to 50 and find (and stop at) the first prime number.
8. Use nested loops with `break` to stop only the inner loop early (note it doesn't stop the outer one).
9. Use a labeled loop (`outer: for (...) { ... break outer; }`) to break out of both an
   outer and inner loop at once.
10. Loop through a list of tasks and skip any marked `"done": true`, only logging pending ones.

## Interview-style questions

11. What is the difference between `break` and `continue`?
12. Does `break` inside a nested (inner) loop stop the outer loop too? Why or why not?
13. What is a labeled loop, and when might you actually need one?

## Notes

- `break` exits the loop entirely; `continue` skips just the current iteration and moves
  to the next one — mixing these up is a very common beginner bug.
- Labeled loops are rare in everyday code, but worth knowing about the one time you
  genuinely need to break out of multiple nested loops at once.
