# Day 029 — String Transformation (replace, replaceAll, split, join, concat)

Matches Tutorial Day 29 (String Methods Part 1). No limit on how many you solve.

## Basic

1. Use `.replace()` to replace the first occurrence of a word in a string.
2. Use `.replaceAll()` to replace every occurrence of a word in a string.
3. Use `.split(" ")` to break a sentence into an array of words.
4. Use `.join("-")` to combine an array of words back into a single string.
5. Use `.concat()` to combine two strings together.

## Concept

6. Build a **slug generator**: convert `"Hello World Example"` into `"hello-world-example"`
   (lowercase, spaces replaced with dashes).
7. Build a **name formatter**: convert `"john   DOE"` into `"John Doe"` (trim extra
   spaces, fix casing).
8. Build a **sentence formatter**: ensure a sentence starts with a capital letter and
   ends with a period, fixing it if not.
9. Remove duplicate/extra spaces from a sentence (e.g. `"hello    world"` → `"hello world"`).
10. Split a comma-separated string of values into an array, trimming each value.
11. Replace all vowels in a string with `*`.
12. Given a full name string, split it into first and last name variables.
13. Reverse the order of words in a sentence using `.split()`, `.reverse()`, and `.join()`.
14. Build a function that converts `"snake_case_text"` into `"Title Case Text"`.
15. Replace every space in a string with an underscore, without using `.replaceAll(" ", "_")`
    directly (try `.split(" ").join("_")` instead, to compare approaches).

## Interview-style questions

16. What's the difference between `.replace()` and `.replaceAll()`?
17. How would you replace all occurrences of a substring in an environment that only had
    `.replace()` available (pre-`replaceAll`)? (Hint: think about `.split().join()`.)
18. Why does `.split()` followed by `.join()` work well together for many string
    transformation tasks?

## Notes

- The `.split(...).join(...)` combo is extremely versatile — many "find and transform"
  string problems can be solved by splitting into pieces, transforming each piece, and
  rejoining.
- Keep testing edge cases: empty strings, strings with only spaces, and strings with no
  matches for `.replace()`/`.replaceAll()`.
