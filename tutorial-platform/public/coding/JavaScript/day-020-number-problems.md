# Day 020 — Number Problems

Matches Tutorial Day 20 (while & do...while). No limit on how many you solve.

## Basic

1. Reverse the digits of a number (e.g. 456 → 654).
2. Check if a number is a palindrome (e.g. 121 reads the same backwards).
3. Check if a number is prime.
4. Calculate the factorial of a number.
5. Print the first 10 Fibonacci numbers.

## Concept

6. Check if a number is an Armstrong number (e.g. 153 = 1³ + 5³ + 3³).
7. Check if a number is a perfect number (sum of its divisors, excluding itself, equals the number — e.g. 6 = 1+2+3).
8. Check if a number is a "strong number" (sum of the factorials of its digits equals the number itself, e.g. 145 = 1! + 4! + 5!).
9. Find all prime numbers between 1 and 100.
10. Find the sum of the first N Fibonacci numbers.
11. Check if a number is a palindrome without converting it to a string (pure math approach).
12. Write a function that returns whether a number is both prime AND a palindrome.

## Interview-style questions

13. What makes a number prime, precisely? What's the smallest optimization you can make
    when checking (hint: you don't need to check divisors past the square root)?
14. What's the difference between checking a palindrome using string reversal vs pure
    number/math operations?
15. Why is calculating factorial with a loop usually safer than recursion for large numbers
    (think about how deep the recursive calls would go)?

## Notes

- Test each of these with at least one classic tricky case: `0`, `1`, a negative number,
  and a large number — number problems often break on edge cases like these.
- If a problem feels hard, first write out the steps in plain English comments before
  writing any code — it usually reveals the loop structure needed.
