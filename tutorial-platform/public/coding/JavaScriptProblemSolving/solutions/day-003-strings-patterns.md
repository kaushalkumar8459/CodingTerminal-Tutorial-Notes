# Solutions — Day 003: Strings & Pattern Problems

1. Split words, traverse from the end, and join.
2. Split words, reverse each word with a loop, and join.
3. Normalize the string, then compare characters from both ends.
4. Count characters in the first string and decrement counts using the second.
5. Start with the first string and shorten the prefix until all strings share it.
6. Compare suffixes from the end using the same prefix technique.
7. Count characters, then scan again for the first count of one.
8. Keep a Set; the first already-seen character is the answer.
9. Count characters and retain earliest indexes for ties.
10. Use a Set and append unseen characters.
11. Scan runs and output character plus run length.
12. Parse each character followed by its numeric count and repeat it.
13. Compare a substring at every starting index and advance by one so overlaps count.
14. Scan every valid starting index and compare characters.
15. Compare candidate substrings character-by-character.
16. Equal-length strings: search the second string inside the first string concatenated with itself.
17. Expand around every character and every gap, retaining the longest range.
18. Sliding window plus a Map of last-seen positions.
19. Sliding window with a frequency Map; shrink while distinct count exceeds K.
20. Use the same window technique and shrink until the window has exactly K distinct values.
21. Use two pointers and allow at most one insertion, deletion, or replacement.
22. Minimum deletions = length minus longest palindromic subsequence length.
23. Create a frequency signature for each word and group by signature.
24. Count frequencies, order entries by count, then emit characters.
25. Scan left-to-right; subtract a symbol when it is smaller than the next symbol.
26. Repeatedly append the largest Roman symbol that fits the remaining number.
27. Push opening brackets onto a stack and match closing brackets with the top.
28. Use stacks for repeat counts and partial strings; expand when closing brackets are reached.
29. Split by dots and compare numeric components left-to-right.
30. Tokenize words and capitalize according to the chosen title-case rules.
31. Scan consecutive runs and emit each character with its count.
32. Shift alphabetic code points modulo 26 while preserving case.
33. Compare normalized character frequency maps.
34. Sliding window: expand until requirements are satisfied, then shrink while valid.
35. Maintain a fixed-size frequency window and compare it with the pattern frequency.
36. Dynamic programming: dp[i] records whether the prefix ending at i can be segmented.
37. Backtracking with a used set and duplicate skipping.
38. Backtracking that selects characters until K are chosen.
39. Backtracking with choose/skip decisions for each character.
40. Minimum deletions can be derived from LCS: lengthA + lengthB - 2 * LCS.
41. Classic LCS dynamic programming.
42. Classic edit-distance dynamic programming with insertion, deletion, and replacement.
43. Interval dynamic programming or LCS with the reversed string.
44. Expand around every possible center and count valid palindromes.
45. Scan for one separator, valid sections, and required non-empty portions; this is intentionally not full RFC email validation.
46. Scan character-by-character, splitting commas only when outside quotes.
47. Scan characters and emit one space when a whitespace run is encountered.
48. Replace all but the requested suffix with a mask.
49. Normalize case, collapse separators, remove unsupported characters, and join with dashes.
50. Scan once to count lines and characters and maintain word/character frequency maps.

Sliding-window solutions are usually O(n); classic string DP problems are commonly O(n²) time and space.
