# Day 008 — JavaScript Interview Coding: Strings and Objects

This questions-only set is a curated practice collection inspired by JavaScript exercise sites and interview question collections. Write your own solution before looking for help.

## Strings

1. Reverse a string without using `reverse()`.
2. Reverse the order of words without reversing the letters in each word.
3. Reverse the letters in each word while preserving word order.
4. Check whether a string is a palindrome while ignoring case and punctuation.
5. Check whether two strings are anagrams without sorting either string.
6. Compress consecutive characters, such as `aaaabbc` into `a4b2c1`.
7. Capitalize the first letter of every word without using `map()`.
8. Find the longest word in a sentence.
9. Find the longest common prefix of an array of strings.
10. Check whether one string is a rotation of another.
11. Generate all unique permutations of a string that may contain duplicate characters.
12. Truncate a string to a requested length and append `...` when needed.
13. Validate whether a string contains only letters and numbers.
14. Count occurrences of a substring, including overlapping occurrences.
15. Count vowels, consonants, digits, spaces, and symbols in a string.
16. Find the first non-repeating character and its index.
17. Find the most frequently occurring character, breaking ties by first appearance.
18. Remove duplicate characters while preserving their first occurrence.
19. Mask every digit in a mobile number except the first and last two digits.
20. Convert `29/12/2022` into `2022-12-29` without using a date library.
21. Remove all whitespace from a string without using a regular expression.
22. Replace every occurrence of one character with another without using `replaceAll()`.
23. Find the longest substring containing exactly `k` unique characters.
24. Insert `-` between adjacent odd digits and `*` between adjacent even digits.
25. Group a list of words into anagram groups.

## Objects and Data Transformation

26. Convert an array of records into an object keyed by `name`.
27. Group records by age, category, or department.
28. Count how many times each `name` occurs in an array of objects.
29. Print the record whose `cID` is `51` from a nested response object.
30. Merge two objects without mutating either source object.
31. Deep-clone a nested object containing arrays and plain objects without JSON serialization.
32. Compare two nested objects for deep equality.
33. Sum matching keys across an array of objects.
34. Filter an object by a key or value condition without `Object.entries().filter()`.
35. Sort an array of objects by a numeric property without using `sort()`.
36. Sort an array of objects alphabetically by a string property without using `sort()`.
37. Convert dot notation such as `a.b.c` and `someValue` into a nested object.
38. Convert a nested object into dot-notation key-value pairs.
39. Remove a property from an object without mutating the original object.
40. Check whether an object owns a particular key, including keys whose value is `undefined`.
41. Implement a class with inheritance and demonstrate both parent and child methods.
42. Simulate private object state using a closure.
43. Create a student result object containing total, average, and grade for each student.
44. Transform an array of objects into a lookup object using a selected property.
45. Remove duplicate objects from an array using a selected property as identity.
46. Convert an object into a query-string-like representation without using `JSON.stringify()`.
47. Parse a query-string-like representation into an object.
48. Recursively count all keys in a nested object.
49. Recursively find the largest numeric value in a nested object or array.
50. Flatten a nested object into path-value pairs such as `user.address.city`.

## Practice Checklist

For every solution, include edge cases, complexity, mutation behavior, and at least two test inputs.

Sources used for topic inspiration: W3Resource JavaScript exercises, Sathish JavaScript programs, Toptal JavaScript interview questions, and the interview collections supplied in the study notes.

<!-- codingterminal-solution:start -->

# Solution — Day 121: Coding Problem Bank — Strings and Objects

## 1–10. String basics
Reverse strings with a loop when `reverse()` is prohibited. For palindrome and anagram problems, normalize input first and use two-pointer or frequency-count approaches.

Anagram example:
```js
function isAnagram(a, b) {
  const normalize = value => value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const x = normalize(a);
  const y = normalize(b);

  if (x.length !== y.length) return false;

  const count = new Map();
  for (const char of x) count.set(char, (count.get(char) ?? 0) + 1);

  for (const char of y) {
    const remaining = (count.get(char) ?? 0) - 1;
    if (remaining < 0) return false;
    count.set(char, remaining);
  }

  return true;
}
```

## 11–18. String frequency and transformation
Use recursion/backtracking for unique permutations. Use a frequency map for first non-repeating and most-frequent character problems.

## 19–25. Validation and substring problems
Use character iteration when regex is prohibited. For longest substring with constraints, use a sliding-window technique.

## 26–30. Object transformation
Grouping:
```js
function groupBy(records, key) {
  const result = {};

  for (const record of records) {
    const value = record[key];
    if (!result[value]) result[value] = [];
    result[value].push(record);
  }

  return result;
}
```

Lookup:
```js
function indexBy(records, key) {
  const result = {};

  for (const record of records) {
    result[record[key]] = record;
  }

  return result;
}
```

## 31–32. Deep clone and deep equality
For plain objects and arrays, recursively traverse values instead of relying on JSON serialization.

```js
function deepClone(value) {
  if (Array.isArray(value)) return value.map(deepClone);

  if (value && typeof value === "object") {
    const result = {};
    for (const key of Object.keys(value)) {
      result[key] = deepClone(value[key]);
    }
    return result;
  }

  return value;
}
```

Deep equality should compare types, arrays, object keys, and recursively compare corresponding values.

## 33–40. Object operations
Use loops and `Object.keys()`/property checks according to the restriction in each question. To check ownership independently of the property's value:
```js
Object.prototype.hasOwnProperty.call(obj, key);
```

## 41–45. OOP and object collections
Use a base class plus `extends` for inheritance. For private state without `#private` fields, close over state inside a factory function.

Remove duplicate objects by tracking the selected identity property in a `Set`.

## 46–47. Query-string-like conversion
Encode each key/value pair and join with `&`; parse by splitting on `&` and then on the first `=`.

## 48–50. Recursive nested objects
Recursively walk arrays and objects. Carry the current path while flattening:
```js
function flattenObject(value, prefix = "", result = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    for (const key of Object.keys(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      flattenObject(value[key], path, result);
    }
  } else {
    result[prefix] = value;
  }

  return result;
}
```

### Complexity reminder

For each solution, document whether the approach is O(n), O(n log n), or recursive in relation to the input size. Also state whether the original object/array is mutated.

<!-- codingterminal-solution:end -->

