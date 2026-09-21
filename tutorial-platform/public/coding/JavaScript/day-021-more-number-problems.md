# Day 021 — More Number Problems

Matches Tutorial Day 21 (break & continue In Depth). No limit on how many you solve.

## Basic

1. Find the GCD (greatest common divisor) of two numbers.
2. Find the LCM (least common multiple) of two numbers.
3. Count the number of digits in a number.
4. Find the sum of the digits of a number.
5. Find the product of the digits of a number.

## Concept

6. Convert a decimal number to binary (without using `.toString(2)` — do it manually with math).
7. Convert a binary string to a decimal number (manually, without `parseInt(x, 2)`).
8. Find the GCD of two numbers using the Euclidean algorithm (repeated modulo) instead of
   a brute-force loop.
9. Given a list of numbers, find the GCD of all of them together.
10. Given two numbers, find both the GCD and LCM, and verify that `GCD * LCM === num1 * num2`.

## Interview-style questions

11. What is the relationship between GCD and LCM of two numbers?
12. Why is the Euclidean algorithm generally faster than checking every number up to the
    smaller of the two values?
13. What's the simplest way to check whether a manual binary conversion is correct (hint:
    compare against a built-in method just for verification, not for your main solution)?

## Notes

- Try solving the GCD problem two different ways (brute-force loop, then Euclidean
  algorithm) and compare — this is a great way to see why algorithm choice matters.
- Manual base conversion (decimal ↔ binary) is a great `while`/`continue` exercise —
  it directly reuses today's tutorial concepts.
