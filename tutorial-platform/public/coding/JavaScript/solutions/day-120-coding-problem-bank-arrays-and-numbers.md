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
