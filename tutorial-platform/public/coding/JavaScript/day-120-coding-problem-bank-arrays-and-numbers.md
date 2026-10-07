# Day 007 — JavaScript Interview Coding: Arrays and Numbers

This practice bank is based on the problem-solving questions collected in the study notes. Write your own solution for each question. Do not use built-in shortcuts unless the question specifically asks you to compare approaches.

## Arrays and Numbers

1. Reverse an array without using `reverse()` and without mutating the original array.
2. Find the largest and smallest number in an array using a loop.
3. Calculate the sum and average of all numbers in an array.
4. Remove duplicate values while preserving their first occurrence.
5. Implement numeric ascending and descending sorting without using `sort()`.
6. Find the union and intersection of two arrays without using `Set`.
7. Rotate an array to the right by `k` positions.
8. Find the largest contiguous subarray sum.
9. Check whether an array is a palindrome.
10. Shuffle an array fairly using the Fisher-Yates algorithm.
11. Convert an array of records into an object keyed by `name`.
12. Find duplicate values and calculate their counts.
13. Remove empty strings from an array without using `filter()`.
14. Find whether two values in an array add up to a target.
15. Rotate an array from the position specified by its first value and return the result as a string.
16. Merge two already sorted arrays without sorting the combined array.
17. Find the missing number from a sequence containing values from `0..n`.
18. Find all missing values from a sorted positive-number array.
19. Find the first duplicate value in an array.
20. Move all zeroes to the end while preserving the order of non-zero values.
21. Find the second-largest distinct number without sorting.
22. Find the kth smallest and kth largest values without sorting.
23. Split an array into chunks of a requested size.
24. Flatten an array of any nesting depth without using `flat()`.
25. Sum all values in a jagged nested array.
26. Print a matrix in spiral order.
27. Find the largest value in every row of a matrix.
28. Find all triplets whose sum equals a target.
29. Find the value closest to a target in an array.
30. Generate every subset of an array.
31. Find the maximum sum of three consecutive values using a sliding window.
32. Find the minimum sum of three consecutive values using a sliding window.
33. Convert a three-dimensional array into a two-dimensional array while preserving order.
34. Find the first pair whose sum is zero.
35. Find the largest possible sum of two values in an unsorted array.
36. Find the maximum count of consecutive `1` values in a binary array.
37. Find the factorial of a number using iteration and recursion.
38. Generate the Fibonacci sequence for a requested number of terms.
39. Check whether a number is prime.
40. Print all prime numbers in an interval.
41. Find the Armstrong numbers in an interval.
42. Find the sum of natural numbers using iteration and recursion.
43. Check whether three numbers have the same last digit.
44. Find the factors of a number.
45. Find the HCF/GCD and LCM of two numbers.
46. Reverse a number without converting it to a string.
47. Check whether a number is an Armstrong number.
48. Check whether a number is a perfect number.
49. Find all pairs whose sum equals a target value.
50. Add the cube of every value in an array and return the total.

## Practice Checklist

For every solution, test empty input, one value, duplicate values, negative values, and large input where applicable. Also write down time complexity, space complexity, mutation behavior, and why your approach is suitable.

<!-- codingterminal-solution:start -->

# Solution — Day 120: Coding Problem Bank — Arrays and Numbers

## 1–6. Core array operations
Use loops, copies, and lookup structures where appropriate. For example:
```js
function reverseArray(arr) {
  const result = [];
  for (let i = arr.length - 1; i >= 0; i--) result.push(arr[i]);
  return result;
}

function minMax(arr) {
  let min = Infinity;
  let max = -Infinity;
  for (const value of arr) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  return { min, max };
}
```

For duplicate removal while preserving order:
```js
function unique(arr) {
  const seen = new Set();
  const result = [];
  for (const value of arr) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }
  return result;
}
```

## 7. Rotate array
Use modulo to normalize `k`, then combine the final `k` elements with the remaining prefix.

## 8. Maximum contiguous sum
Use Kadane's algorithm:
```js
function maxSubarraySum(arr) {
  let best = arr[0];
  let current = arr[0];

  for (let i = 1; i < arr.length; i++) {
    current = Math.max(arr[i], current + arr[i]);
    best = Math.max(best, current);
  }
  return best;
}
```

## 9–14. Searching and frequency
Use loops or a frequency `Map`. Two-sum can be solved in O(n):
```js
function twoSum(arr, target) {
  const seen = new Set();

  for (const value of arr) {
    if (seen.has(target - value)) return [target - value, value];
    seen.add(value);
  }
  return null;
}
```

## 15–23. Array transformation
Use slicing, two-pointer techniques, frequency maps, and manual insertion/merge logic where built-in shortcuts are prohibited.

For merging sorted arrays:
```js
function mergeSorted(a, b) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) result.push(a[i++]);
    else result.push(b[j++]);
  }

  while (i < a.length) result.push(a[i++]);
  while (j < b.length) result.push(b[j++]);

  return result;
}
```

## 24–36. Nested arrays and matrix problems
Use recursion for arbitrary-depth flattening:
```js
function flatten(arr) {
  const result = [];

  for (const value of arr) {
    if (Array.isArray(value)) result.push(...flatten(value));
    else result.push(value);
  }

  return result;
}
```

Spiral matrix traversal uses four boundaries: top, bottom, left, and right.

Sliding-window problems maintain the current window sum rather than recalculating every group.

## 37–48. Number problems
Use loops for factorial/Fibonacci, modulo arithmetic for digit extraction, and the standard Euclidean algorithm for GCD:
```js
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
```

For reversing a number without converting to a string:
```js
function reverseNumber(n) {
  const sign = Math.sign(n);
  n = Math.abs(n);

  let result = 0;
  while (n > 0) {
    result = result * 10 + (n % 10);
    n = Math.floor(n / 10);
  }

  return sign * result;
}
```

## 49–50. Final problems
Use a frequency map for target pairs and a simple loop for the cube sum.

### Complexity reminder

Prefer O(n) or O(n log n) approaches where practical. Always document mutation behavior and edge cases.

<!-- codingterminal-solution:end -->

