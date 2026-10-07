# Day 022 — for...of Practice

Matches Tutorial Day 22 (The `for...of` Loop). No limit on how many you solve.

## Basic

1. Loop over an array of numbers with `for...of` and print each one.
2. Loop over a string with `for...of` and print each character.
3. Count the number of vowels in a string using `for...of`.
4. Sum all numbers in an array using `for...of`.
5. Find the maximum value in an array using `for...of` (without `Math.max`).

## Concept

6. Find the minimum value in an array using `for...of`.
7. Count how many times a specific character appears in a string using `for...of`.
8. Detect duplicate values in an array using `for...of` plus a helper array/Set of seen values.
9. Loop over a `Set` of unique numbers and print each one.
10. Loop over a small `Map` of key-value pairs using `for...of` (hint: `map.entries()`
    or destructuring each `[key, value]` pair).
11. Build a character-frequency counter for a string using `for...of` (print each letter
    with its count).
12. Reverse a string manually using `for...of` (building a new string by prepending each character).

## Interview-style questions

13. What is the main difference between `for...of` and a classic `for (let i = 0; ...)` loop?
14. What kinds of values does `for...of` work on (which data structures are "iterable")?
15. When would you still need a regular `for` loop instead of `for...of`?

## Notes

- `for...of` is usually the cleanest choice once you already have a collection to loop
  over directly — reach for it by default unless you specifically need the index.
- Try rewriting a couple of your Day 16 loop-basics answers using `for...of` where it
  fits naturally, to compare the two styles directly.

<!-- codingterminal-solution:start -->

# Day 022 — Solution: for...of Practice

## Basic

**1. Loop over an array**

```js
const numbers = [10, 20, 30];
for (const number of numbers) console.log(number);
```

**2. Loop over a string**

```js
for (const character of "JavaScript") console.log(character);
```

**3. Count vowels**

```js
function countVowels(text) {
  let count = 0;
  for (const character of text.toLowerCase()) {
    if ("aeiou".includes(character)) count++;
  }
  return count;
}
console.log(countVowels("Education")); // 5
```

**4. Sum an array**

```js
let sum = 0;
for (const number of [4, 7, 9]) sum += number;
console.log(sum); // 20
```

**5. Find the maximum without `Math.max`**

```js
function maximum(numbers) {
  let result = numbers[0];
  for (const number of numbers) if (number > result) result = number;
  return result;
}
console.log(maximum([4, 9, 2])); // 9
```

## Concept

**6. Find the minimum**

```js
function minimum(numbers) {
  let result = numbers[0];
  for (const number of numbers) if (number < result) result = number;
  return result;
}
console.log(minimum([4, -2, 9])); // -2
```

**7. Count a character**

```js
function countCharacter(text, target) {
  let count = 0;
  for (const character of text) if (character === target) count++;
  return count;
}
console.log(countCharacter("banana", "a")); // 3
```

**8. Detect duplicates**

```js
function duplicates(values) {
  const seen = new Set();
  const repeated = new Set();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}
console.log(duplicates([1, 2, 2, 3, 1])); // [2, 1]
```

**9. Loop over a `Set`**

```js
for (const number of new Set([2, 4, 2, 6])) console.log(number);
```

**10. Loop over a `Map`**

```js
const scores = new Map([
  ["Ana", 90],
  ["Ben", 84],
]);
for (const [name, score] of scores) console.log(name, score);
```

**11. Character frequency**

```js
function frequency(text) {
  const counts = {};
  for (const character of text)
    counts[character] = (counts[character] || 0) + 1;
  return counts;
}
console.log(frequency("hello")); // { h: 1, e: 1, l: 2, o: 1 }
```

**12. Reverse manually**

```js
function reverse(text) {
  let result = "";
  for (const character of text) result = character + result;
  return result;
}
console.log(reverse("code")); // edoc
```

## Interview-style questions

**13. Difference from a classic `for` loop:** `for...of` gives values directly; a classic loop gives an index and lets you control the index.

**14. Iterables:** arrays, strings, Sets, Maps, typed arrays, and other objects implementing `Symbol.iterator`.

**15. When to use a regular `for`:** when you need the index, want to skip by a custom step, iterate backward, or stop at a calculated boundary.

<!-- codingterminal-solution:end -->

