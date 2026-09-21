---
title: The filter Method
slug: day-038-the-filter-method
dayLabel: Day 38
level: Beginner
estimatedMinutes: 25
order: 38
track: javascript
---

# Day 38 [Beginner]: The `filter()` Method

## Goal

Master `.filter()` — the standard tool for selecting a subset of array items that match a condition.

## Prerequisites

- Day 36 (intro to filter), Day 37 (map)

## Explanation

`.filter()` builds a **new array** containing only the items for which the callback function returns a truthy value. Unlike `.map()` (same length as the original, values transformed), `.filter()`'s result can be **shorter** than the original — sometimes even empty — because it selectively keeps only matching items.

`.filter()` and `.map()` are frequently chained together: filter down to the items you care about, then transform them into the shape you need.

## Topic by Topic

### Topic 1: Basic filtering

Theory:
`.filter(callback)` keeps only the items where `callback` returns a truthy value, discarding the rest.

Code Example:

```js
const numbers = [3, 8, 15, 22, 4, 30];
const evens = numbers.filter((n) => n % 2 === 0);

console.log(evens); // [8, 22, 4, 30]
console.log(numbers); // [3, 8, 15, 22, 4, 30] - unchanged
```

**Explanation:** The callback checks each number for evenness; only the ones returning `true` make it into the new `evens` array.

**Key Points:**

- `.filter()` never mutates the original array.
- The result length depends entirely on how many items match — it can be shorter, or even empty.
- The callback must return something truthy/falsy — that's what decides inclusion.

### Topic 2: Filtering with multiple conditions

Theory:
Combine multiple checks inside the filter callback using `&&`/`||`, just like any other condition.

Code Example:

```js
const products = [
  { name: "Laptop", price: 55000, inStock: true },
  { name: "Mouse", price: 500, inStock: false },
  { name: "Keyboard", price: 1500, inStock: true },
];

const available = products.filter((p) => p.inStock && p.price < 2000);
console.log(available); // [{name:"Keyboard", price:1500, inStock:true}]
```

**Explanation:** Only products that are both in stock AND under a price threshold pass the combined condition — `.filter()` naturally supports any boolean logic inside its callback.

**Key Points:**

- Combine conditions with `&&`/`||` directly inside the filter callback.
- This works identically for arrays of objects as it does for simple values.
- Complex filtering logic can be extracted into a named function for readability if it grows large.

### Topic 3: Filtering objects and real-world data

Theory:
`.filter()` is the standard tool for building "search"/"filter" features in real applications — like showing only active users, or products within a price range.

Code Example:

```js
const users = [
  { name: "Meena", isActive: true },
  { name: "Kabir", isActive: false },
  { name: "Riya", isActive: true },
];

const activeUsers = users.filter((user) => user.isActive);
console.log(activeUsers.length); // 2
```

**Explanation:** This exact pattern — filter by a boolean flag — is extremely common in real UI features like showing "only active" or "only completed" items.

**Key Points:**

- Filtering by a boolean property is one of the most common real-world `.filter()` uses.
- `.filter().length` is a quick way to count matches without needing the full list.
- This pattern generalizes directly to search/filter UI features later.

### Topic 4: Chaining `.filter()` with `.map()`

Theory:
Filtering down to relevant items, then transforming them, is an extremely common combination.

Code Example:

```js
const employees = [
  { name: "Aarav", salary: 45000, department: "Engineering" },
  { name: "Diya", salary: 60000, department: "Sales" },
  { name: "Kavya", salary: 52000, department: "Engineering" },
];

const engineeringNames = employees
  .filter((emp) => emp.department === "Engineering")
  .map((emp) => emp.name);

console.log(engineeringNames); // ["Aarav", "Kavya"]
```

**Explanation:** `.filter()` first narrows down to only Engineering employees; `.map()` then extracts just their names — chaining these two methods reads almost like a sentence describing what you want.

**Key Points:**

- Chaining `.filter().map()` (in that order) is a very common, readable pattern.
- Each method in the chain returns a new array, which the next method operates on.
- This chaining style becomes even more powerful once combined with `.reduce()` (Day 39).

## Recap

- `.filter()` returns a new array containing only items where the callback is truthy.
- Combine multiple conditions with `&&`/`||` inside the callback.
- Chaining `.filter().map()` is a common, readable way to narrow down and then transform data.

## What's Next

Practice for today: `public/coding/JavaScript/day-038-advanced-array-methods.md`. Day 39 covers `.reduce()` in depth.
