# Day 024 — String Problems

Matches Tutorial Day 24 (Nested Loops and Patterns In Depth). No limit on how many you solve.

## Basic

1. Reverse a string.
2. Check if a string is a palindrome.
3. Count the number of vowels in a string.
4. Count the number of consonants in a string.
5. Count the number of words in a sentence.

## Concept

6. Remove all spaces from a string.
7. Find duplicate characters in a string (characters that appear more than once).
8. Count how many times each character appears in a string.
9. Check if two strings are anagrams of each other (same letters, different order).
10. Capitalize the first letter of every word in a sentence.
11. Find the longest word in a sentence.
12. Reverse the order of words in a sentence (not the letters — the word order).

## Interview-style questions

13. What's an efficient way to check if a string is a palindrome without creating a
    fully reversed copy first (hint: compare from both ends toward the middle)?
14. How would you count character frequency efficiently (what data structure fits best)?
15. What edge cases should you consider for palindrome checks (spaces, punctuation, case)?

## Notes

- Try solving the palindrome check two ways: one using `.split("").reverse().join("")`,
  and one using a manual loop comparing characters from both ends — compare readability
  and performance mentally.
- Character-frequency counting here is great preparation for `map()`/`reduce()` versions
  of the same problem, which you'll revisit starting Module 3.
