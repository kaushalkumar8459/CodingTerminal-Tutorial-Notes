# Day 031 — Arrays Basics

Matches Tutorial Day 31 (Numbers and Math). No limit on how many you solve.

## Basic

1. Create an array of 5 numbers and print it.
2. Access the first and last elements of an array by index.
3. Update the value at a specific index in an array.
4. Find the sum of all numbers in an array.
5. Find the average of all numbers in an array.

## Concept

6. Find the maximum value in an array without using `Math.max`.
7. Find the minimum value in an array without using `Math.min`.
8. Reverse an array manually (without `.reverse()`), building a new array.
9. Copy an array into a new variable and confirm changing the copy doesn't affect the
   original (careful — try this with `const copy = original;` first and observe the
   surprising result, then fix it properly).
10. Create a nested array (an array of arrays) representing a small grid, and print a
    specific cell's value.
11. "Delete" an element from an array at a specific index by rebuilding a new array
    without it (don't use `.splice()` yet — that's tomorrow).
12. Find the length of an array and use it to access the last element generically
    (`arr[arr.length - 1]`).
13. Given an array of student names, print each with their position number (1st, 2nd, ...).
14. Count how many numbers in an array are greater than a given threshold.
15. Given a 2D array (grid), calculate the sum of all values in it using nested loops.

## Interview-style questions

16. Why does `const copy = original;` NOT create a real copy of an array?
17. What's the array equivalent of a string's immutability — are arrays mutable in JavaScript?
18. How would you access the last element of an array generically, without knowing its length in advance?

## Notes

- Arrays are mutable (unlike strings) — changing an element in place works directly,
  e.g. `arr[0] = 99;`. Keep this contrast with strings in mind.
- `arr.length - 1` for "last index" is a pattern you'll use constantly — get comfortable
  with it now.

<!-- codingterminal-solution:start -->

# Day 031 — Solution: Arrays Basics

## Basic

**1. Create and print an array**

```js
const numbers = [10, 20, 30, 40, 50];
console.log(numbers);
```

**2. Access first and last elements**

```js
console.log(numbers[0]);
console.log(numbers[numbers.length - 1]);
```

**3. Update an index**

```js
numbers[2] = 99;
console.log(numbers); // [10, 20, 99, 40, 50]
```

**4. Sum all numbers**

Built-in approach:

```js
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum);
```

Manual approach:

```js
let manualSum = 0;
for (const number of numbers) manualSum += number;
console.log(manualSum);
```

**5. Average**

```js
const average =
  numbers.reduce((total, number) => total + number, 0) / numbers.length;
console.log(average);
```

Manual approach:

```js
function averageManual(values) {
  let total = 0;
  for (const value of values) total += value;
  return values.length === 0 ? 0 : total / values.length;
}
```

## Concept

**6. Maximum without `Math.max`**

```js
function maximum(values) {
  let result = values[0];
  for (const value of values) if (value > result) result = value;
  return result;
}
console.log(maximum([4, 12, 7])); // 12
```

**7. Minimum without `Math.min`**

```js
function minimum(values) {
  let result = values[0];
  for (const value of values) if (value < result) result = value;
  return result;
}
console.log(minimum([4, -2, 7])); // -2
```

**8. Reverse manually without `.reverse()`**

```js
function reverseArray(values) {
  const result = [];
  for (let index = values.length - 1; index >= 0; index--) {
    result.push(values[index]);
  }
  return result;
}

console.log(reverseArray([1, 2, 3])); // [3, 2, 1]
```

**9. Copy an array correctly**

This creates a shared reference, so changing `wrongCopy` also changes `original`:

```js
const original = [1, 2, 3];
const wrongCopy = original;
wrongCopy[0] = 99;
console.log(original); // [99, 2, 3]
```

Use a shallow copy for a flat array:

```js
const fixedCopy = [...original];
fixedCopy[0] = 100;
console.log(original); // [99, 2, 3]
console.log(fixedCopy); // [100, 2, 3]
```

Equivalent built-in approach:

```js
const anotherCopy = original.slice();
```

**10. Nested array grid**

```js
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(grid[1][2]); // 6
```

**11. Remove an index by rebuilding the array**

```js
function withoutIndex(values, indexToRemove) {
  const result = [];
  for (let index = 0; index < values.length; index++) {
    if (index !== indexToRemove) result.push(values[index]);
  }
  return result;
}

console.log(withoutIndex([10, 20, 30, 40], 2)); // [10, 20, 40]
```

Built-in alternative for comparison:

```js
const values = [10, 20, 30, 40];
const removed = values.toSpliced(2, 1);
console.log(removed); // [10, 20, 40]
```

**12. Length and last element**

```js
const colors = ["red", "green", "blue"];
console.log(colors.length); // 3
console.log(colors[colors.length - 1]); // blue
```

**13. Names with position numbers**

```js
const students = ["Asha", "Ben", "Carlos"];
for (let index = 0; index < students.length; index++) {
  console.log(`${index + 1}. ${students[index]}`);
}
```

**14. Count values above a threshold**

```js
function countAbove(values, threshold) {
  let count = 0;
  for (const value of values) if (value > threshold) count++;
  return count;
}

console.log(countAbove([4, 12, 8, 20], 10)); // 2
```

Built-in approach:

```js
const count = [4, 12, 8, 20].filter((value) => value > 10).length;
```

**15. Sum a 2D array**

```js
function gridSum(grid) {
  let total = 0;
  for (const row of grid) {
    for (const value of row) total += value;
  }
  return total;
}

console.log(
  gridSum([
    [1, 2],
    [3, 4],
    [5, 6],
  ]),
); // 21
```

## Interview-style questions

**16. Why does `const copy = original` not copy an array?**

Arrays are objects. The variable stores a reference to the array, so both variables point
to the same object. `const` prevents reassigning the variable; it does not make the array
immutable.

**17. Are arrays mutable?**

Yes. You can update, add, or remove elements in the same array. Strings are immutable,
so a string operation returns a new string instead of changing the original string.

**18. How do you access the last element generically?**

Use `array[array.length - 1]`. It works regardless of the current array length. In modern
JavaScript, `array.at(-1)` is another built-in option.

<!-- codingterminal-solution:end -->

