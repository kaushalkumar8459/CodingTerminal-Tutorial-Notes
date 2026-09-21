---
title: Array Modification In Depth
slug: day-034-array-modification-in-depth
dayLabel: Day 34
level: Beginner
estimatedMinutes: 25
order: 34
track: javascript
---

# Day 34 [Beginner]: Array Modification In Depth

## Goal

Master `push`, `pop`, `shift`, `unshift`, and `splice` — the core methods for adding and removing array items.

## Prerequisites

- Day 33 (arrays fundamentals)

## Explanation

Yesterday you manually updated array items by index. Today's methods are the standard, built-in tools for **adding and removing** items, which is far more common than direct index assignment in real code. `push`/`pop` work at the **end** of the array; `unshift`/`shift` work at the **beginning**; `splice` is the most flexible — it can remove, insert, or do both, at any position.

All five of these methods **mutate** the original array directly (unlike string methods, which never mutate). This is an important habit to build: know which methods change your data in place, and which return a new copy.

## Topic by Topic

### Topic 1: `push()` and `pop()` — working at the end

Theory:
`.push(value)` adds an item to the end of the array and returns the new length. `.pop()` removes the last item and returns the removed value.

Code Example:

```js
const cart = ["apple", "banana"];
cart.push("cherry");
console.log(cart); // ["apple", "banana", "cherry"]

const removed = cart.pop();
console.log(removed); // "cherry"
console.log(cart); // ["apple", "banana"]
```

**Explanation:** `.push()` grows the array by one at the end; `.pop()` shrinks it by one from the end, handing back whatever was removed.

**Key Points:**

- `.push()` returns the new array length, not the array itself.
- `.pop()` returns the removed item, and mutates the original array.
- Working at the end of an array is generally the most efficient position for these operations.

### Topic 2: `unshift()` and `shift()` — working at the beginning

Theory:
`.unshift(value)` adds an item to the beginning of the array. `.shift()` removes the first item.

Code Example:

```js
const queue = ["Ravi", "Meena"];
queue.unshift("Aarav"); // add to the front
console.log(queue); // ["Aarav", "Ravi", "Meena"]

const next = queue.shift(); // remove from the front
console.log(next); // "Aarav"
console.log(queue); // ["Ravi", "Meena"]
```

**Explanation:** This behaves like a real-world queue: `.unshift()` adds someone to the front of the line, and `.shift()` serves (removes) whoever is at the very front.

**Key Points:**

- `.unshift()` adds to the start; `.shift()` removes from the start.
- Every remaining item's index shifts by one — slightly more work internally than `push`/`pop`.
- Great for queue-like ("first in, first out") behavior.

### Topic 3: `splice()` — remove, insert, or both

Theory:
`.splice(start, deleteCount, ...itemsToInsert)` is the most flexible array method — it can remove items, insert items, or both, starting at any index.

Code Example:

```js
const items = ["a", "b", "c", "d", "e"];

// Remove 2 items starting at index 1
const removed = items.splice(1, 2);
console.log(removed); // ["b", "c"]
console.log(items); // ["a", "d", "e"]

// Insert without removing (deleteCount = 0)
items.splice(1, 0, "x", "y");
console.log(items); // ["a", "x", "y", "d", "e"]
```

**Explanation:** The first `splice` call removes 2 items starting at index 1; the second call removes 0 items but inserts `"x"` and `"y"` at index 1 — showing how flexible the same method is.

**Key Points:**

- `.splice(start, deleteCount)` removes items; `.splice(start, 0, ...items)` inserts without removing.
- `.splice()` returns an array of the removed items (empty array if nothing was removed).
- `.splice()` mutates the original array directly — a very powerful but easy-to-misuse method.

### Topic 4: Choosing the right method for the job

Theory:
Each method fits a specific situation — picking the right one keeps your code clear and intention-revealing.

Code Example:

```js
const tasks = ["Buy milk", "Clean house", "Write report"];

tasks.push("Call mom"); // add new task at the end
tasks.splice(1, 1); // remove "Clean house" specifically
tasks.unshift("Urgent: reply email"); // add urgent task to the front
```

**Explanation:** Each line uses the method whose name and behavior most closely matches the actual intent — "add at the end," "remove a specific one," "add urgently to the front."

**Key Points:**

- `push`/`pop` = end of array. `unshift`/`shift` = beginning of array. `splice` = anywhere, with full control.
- Choosing the clearest method for your specific need makes code easier to read and maintain.
- All five mutate the original array — always be intentional about when mutation is acceptable.

## Recap

- `push`/`pop` work at the end; `unshift`/`shift` work at the beginning.
- `splice(start, deleteCount, ...items)` is the most flexible — remove, insert, or both.
- All five methods mutate the original array directly.

## What's Next

Practice for today: `public/coding/JavaScript/day-034-foreach.md`. Day 35 covers array searching and extraction methods in depth.
