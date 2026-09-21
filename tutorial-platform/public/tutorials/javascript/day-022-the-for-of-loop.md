---
title: The for...of Loop
slug: day-022-the-for-of-loop
dayLabel: Day 22
level: Beginner
estimatedMinutes: 20
order: 22
track: javascript
---

# Day 22 [Beginner]: The `for...of` Loop

## Goal

Learn `for...of` as a clean, simple way to loop over arrays, strings, and other collections directly by value.

## Prerequisites

- Day 16–21 (loops, conditions)
- Basic awareness of arrays (used more heavily starting Module 3)

## Explanation

`for...of` loops directly over the **values** in a collection — an array, a string (character by character), a `Set`, or a `Map` — without needing to manually manage an index counter like a regular `for` loop does. It's the cleanest option whenever you just need "each item, one at a time" and don't care about the index itself.

Compared to a regular `for` loop, `for...of` removes the boilerplate of `let i = 0; i < arr.length; i++` — you just get each value directly.

## Topic by Topic

### Topic 1: `for...of` with arrays

Theory:
`for (const item of array) { ... }` gives you each array element directly, one at a time, in order.

Code Example:

```js
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}
// apple, banana, cherry
```

**Explanation:** No index variable is needed at all — `fruit` directly holds each value as the loop progresses.

**Key Points:**

- `for...of` gives values directly, not indexes.
- Cleaner than a regular `for` loop when you don't need the index.
- Works on arrays out of the box.

### Topic 2: `for...of` with strings

Theory:
Strings are iterable too — `for...of` walks through a string one character at a time.

Code Example:

```js
const word = "hello";
let vowelCount = 0;

for (const char of word) {
  if ("aeiou".includes(char)) {
    vowelCount++;
  }
}

console.log(vowelCount); // 2
```

**Explanation:** Each `char` is one letter of `"hello"` in turn — combined with `.includes()`, this is a simple, clean way to count vowels.

**Key Points:**

- Strings can be looped character-by-character with `for...of`.
- Combining `for...of` with string/array methods (like `.includes()`) is a very common pattern.
- No manual index math (`word[i]`) is needed, though it still works if preferred.

### Topic 3: `for...of` with `Set` and `Map`

Theory:
`for...of` also works on `Set` (unique value collections) and `Map` (key-value collections) — both covered in depth in Module 5, but worth a first look now.

Code Example:

```js
const uniqueNumbers = new Set([1, 2, 2, 3]);

for (const num of uniqueNumbers) {
  console.log(num); // 1, 2, 3 (duplicates automatically removed)
}
```

**Explanation:** `Set` automatically removes duplicate values, and `for...of` iterates over what remains — this is a small preview of what we'll explore much more on Day 74.

**Key Points:**

- `for...of` works on any "iterable" — arrays, strings, Sets, Maps, and more.
- `Set` automatically keeps only unique values.
- You'll use this pattern again heavily once we reach collections in Module 5.

### Topic 4: `for...of` vs regular `for`

Theory:
`for...of` is simpler when you only need each value. A regular `for` loop is still necessary when you need the index, need to skip around non-sequentially, or need to modify the array while looping.

Code Example:

```js
const scores = [70, 85, 90];

// for...of - clean, but no index available directly
for (const score of scores) {
  console.log(score);
}

// regular for - gives you the index too
for (let i = 0; i < scores.length; i++) {
  console.log(`Index ${i}: ${scores[i]}`);
}
```

**Explanation:** If you need to know _which position_ a value is at, a regular `for` loop (or `array.entries()`, covered later) is more appropriate than plain `for...of`.

**Key Points:**

- Use `for...of` when you just need each value.
- Use a regular `for` loop (or `.entries()`) when the index matters too.
- Neither is "better" universally — pick based on what the problem actually needs.

## Recap

- `for...of` loops directly over values in arrays, strings, Sets, and Maps.
- It removes the need for manual index tracking when you don't need the index.
- Use a regular `for` loop instead when the index itself matters.

## What's Next

Practice for today: `public/coding/JavaScript/day-022-for-of-practice.md`. Day 23 covers `for...in`, used specifically for looping over object properties.
