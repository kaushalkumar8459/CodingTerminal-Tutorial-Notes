# Day 003 — Strings & Pattern Problems

1. Reverse words in a sentence.
2. Reverse each word while preserving word order.
3. Check palindrome ignoring spaces and punctuation.
4. Check anagrams without sorting.
5. Find the longest common prefix.
6. Find the longest common suffix.
7. Find the first non-repeating character.
8. Find the first repeating character.
9. Find the most frequent character with first-occurrence tie breaking.
10. Remove duplicate characters while preserving order.
11. Compress consecutive characters.
12. Expand a compressed string such as a3b2.
13. Count overlapping substring occurrences.
14. Find every occurrence of a pattern.
15. Implement substring search without includes.
16. Check whether one string is a rotation of another.
17. Find the longest palindromic substring.
18. Find the longest substring without repeating characters.
19. Find the longest substring with at most K distinct characters.
20. Find the longest substring with exactly K distinct characters.
21. Check whether two strings are one edit apart.
22. Find minimum deletions to make a string a palindrome.
23. Group words into anagrams.
24. Sort characters by frequency.
25. Convert Roman numerals to integers.
26. Convert integers to Roman numerals.
27. Validate balanced brackets.
28. Decode nested repetition such as 3[a2[c]].
29. Compare version strings.
30. Convert a sentence to title case.
31. Implement run-length encoding.
32. Implement a Caesar cipher.
33. Check a frequency-based substitution relationship.
34. Find the smallest window containing all characters of a pattern.
35. Find all starting indices of pattern anagrams.
36. Check whether a string can be segmented into dictionary words.
37. Generate all unique permutations.
38. Generate all combinations of length K.
39. Generate all subsequences.
40. Find minimum deletions needed to make two strings equal.
41. Find longest common subsequence length.
42. Find edit distance.
43. Find longest palindromic subsequence.
44. Count palindromic substrings.
45. Validate a simplified email-like string without regex.
46. Parse a CSV line while respecting quoted commas.
47. Normalize whitespace without regex.
48. Mask sensitive characters while preserving a suffix.
49. Build a URL slug generator.
50. Build text statistics for words, lines, characters, and frequencies.

<!-- codingterminal-solution:start -->

# Day 003 — Strings & Patterns — Detailed Solution

## What to Build

Palindrome and character frequency.

## Core Implementation / Algorithm

```js
function isPalindrome(s) { const t = s.toLowerCase(); return t === [...t].reverse().join(""); }
```

## Complexity

State the time and space complexity of the chosen implementation. For UI tasks, also discuss render cost, network cost, and memory growth.

## Edge Cases

- Empty or missing input
- Duplicate data
- Rapid repeated interaction
- Slow/failing async work
- Cleanup/lifecycle
- Keyboard and accessibility behavior
- Large datasets

## Interview Explanation

1. Clarify requirements and constraints.
2. Identify source vs derived state.
3. Implement the simplest correct path.
4. Explain complexity and trade-offs.
5. Test boundary and failure cases.
6. Explain how the design changes at production scale.

## Extension

Add one requirement without rewriting the entire feature. Explain what changed and why.

> This is original interview practice material. Company names elsewhere in the curriculum should not be interpreted as claims that this exact exercise was asked by that company.

<!-- codingterminal-solution:end -->

