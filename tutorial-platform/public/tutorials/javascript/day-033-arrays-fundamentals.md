---
title: Arrays Fundamentals
slug: day-033-arrays-fundamentals
dayLabel: Day 33
level: Beginner
estimatedMinutes: 25
order: 33
track: javascript
---

# Day 33 [Beginner]: Arrays Fundamentals

## Goal

Understand what arrays are, how indexing works, how to update values, and how nested arrays represent grid-like or grouped data.

## Prerequisites

- Module 1–2 (variables, loops)

## Explanation

An array is an ordered list of values, stored under one variable. Each value has a position, called an **index**, starting at `0` for the first item — the same indexing concept as strings. Arrays can hold any type of value, including numbers, strings, objects, or even other arrays.

Unlike strings, arrays are **mutable** — you can change an element in place directly using its index (`arr[0] = "new value"`), without creating a whole new array. `array.length` tells you how many items the array holds — and importantly, it always reflects the current length, updating automatically as items are added or removed.

**Nested arrays** (arrays inside arrays) are useful for representing grid-like data (like a tic-tac-toe board) or grouped lists (like a list of student groups, where each group is itself a list of names).

## Topic by Topic

### Topic 1: Creating and indexing arrays

Theory:
Arrays are created with square brackets `[ ]`, with items separated by commas. Access any item using its index in brackets.

Code Example:

```js
const colors = ["red", "green", "blue"];
console.log(colors[0]); // "red"
console.log(colors[2]); // "blue"
console.log(colors[5]); // undefined - no item at that index
```

**Explanation:** Indexing starts at 0, so `colors[0]` is the first item; accessing an index beyond the array's length safely returns `undefined` instead of throwing an error.

**Key Points:**

- Array indexing starts at `0`, same as strings.
- Accessing an out-of-range index returns `undefined`, not an error.
- Arrays can mix types: `[1, "two", true]` is perfectly valid, though usually you'll keep arrays consistent in type.

### Topic 2: Updating values and array length

Theory:
Since arrays are mutable, you can directly change an element's value using its index. `.length` always reflects the current number of items.

Code Example:

```js
const scores = [70, 85, 90];
scores[1] = 95; // update the second item
console.log(scores); // [70, 95, 90]
console.log(scores.length); // 3
```

**Explanation:** `scores[1] = 95` directly overwrites the existing value at index 1 — no new array is created; the original array itself changes.

**Key Points:**

- Direct index assignment (`arr[i] = value`) mutates the array in place.
- `.length` always matches the current number of elements, even after changes.
- This mutability is the key contrast with strings, which never change in place.

### Topic 3: Nested arrays

Theory:
An array can hold other arrays as its items — useful for representing grids, groups, or any "list of lists" structure.

Code Example:

```js
const grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(grid[1][2]); // 6 - second row, third column
```

**Explanation:** `grid[1]` gets the second inner array (`[4, 5, 6]`), and adding `[2]` gets the third item of _that_ array (`6`) — two levels of indexing for a 2D structure.

**Key Points:**

- Nested arrays represent 2D (or deeper) structures like grids and grouped data.
- Access nested items by chaining index brackets: `array[row][col]`.
- Looping through nested arrays typically needs nested loops (from Day 19).

### Topic 4: Array length in practice

Theory:
`.length` is dynamic — it's not a fixed property you set manually, it always reflects the array's current contents.

Code Example:

```js
const list = [10, 20, 30];
console.log(list.length); // 3

list[3] = 40; // adding a new item at the next available index
console.log(list.length); // 4 - automatically updated
```

**Explanation:** Simply assigning a value at the next available index automatically grows the array, and `.length` updates to match — arrays resize themselves as needed.

**Key Points:**

- `.length` is always accurate and updates automatically.
- Assigning beyond the current length grows the array (leaving any skipped indexes as `undefined`, called "holes" — best avoided).
- Tomorrow's methods (`push`, `pop`, etc.) are the standard, cleaner way to grow/shrink arrays instead of manual index assignment.

## Recap

- Arrays are ordered, zero-indexed lists that can hold any type of value.
- Unlike strings, arrays are mutable — you can update elements directly by index.
- Nested arrays represent grid/grouped data, accessed via chained indexing (`arr[row][col]`).

## What's Next

Practice for today: `public/coding/JavaScript/day-033-array-search.md`. Day 34 covers array modification methods (`push`, `pop`, `shift`, `unshift`, `splice`) in depth.
