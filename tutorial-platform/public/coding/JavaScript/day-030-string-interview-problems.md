# Day 030 — String Interview Problems

Matches Tutorial Day 30 (String Methods Part 2). No limit on how many you solve.

1. Find the first non-repeating character in a string (e.g. `"swiss"` → `"w"`).
2. Build a character-frequency counter for any string, returning an object of counts.
3. Check if two strings are anagrams of each other (ignoring case and spaces).
4. Check if a string is a palindrome (ignoring case, spaces, and punctuation).
5. Find the longest word in a sentence.
6. Find the most frequently occurring character in a string.
7. Find the most frequently occurring word in a sentence.
8. Check if one string is a rotation of another (e.g. `"waterbottle"` contains a rotation of `"erbottlewat"`).
9. Remove all duplicate characters from a string, keeping only the first occurrence of each.
10. Count how many distinct words appear in a sentence (case-insensitive).
11. Given a string, group and count how many uppercase vs lowercase letters it has.
12. Check whether a string contains only unique characters (no repeats at all).
13. Given a sentence, replace every word longer than 5 letters with `"[long]"`.
14. Build a basic "word wrap": given a long string and a max line length, split it into
    lines without breaking words in half (using `.split(" ")` and rebuilding lines).
15. Given a string of parentheses only (e.g. `"(()())"`), check whether they're balanced.

## Interview-style questions

16. What data structure is typically best for counting character/word frequency, and why?
17. What's an efficient way to check for an anagram without sorting both strings (think
    about frequency counting instead)?
18. Why is checking string rotation often done by concatenating a string with itself
    (e.g. `str + str`) and checking `.includes()`?

## Notes

- Frequency-counting patterns (character frequency, most frequent word) will come back
  constantly once you learn `reduce()` in Module 3 — today's manual-loop versions build
  the intuition first.
- These are classic interview questions — try solving each without looking anything up
  first, then compare your approach against alternative solutions afterward.
