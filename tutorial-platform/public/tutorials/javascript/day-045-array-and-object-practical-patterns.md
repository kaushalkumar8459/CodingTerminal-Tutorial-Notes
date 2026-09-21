---
title: Array and Object Practical Patterns
slug: day-045-array-and-object-practical-patterns
dayLabel: Day 45
level: Intermediate
estimatedMinutes: 30
order: 45
track: javascript
---

# Day 45 [Intermediate]: Array and Object Practical Patterns

## Goal

Apply everything from this module together — arrays of objects, nested data, and transforming/searching realistic, API-style data.

## Prerequisites

- Day 28–44 (all of Module 3 so far)

## Explanation

Real applications almost never deal with simple flat arrays of numbers — they deal with **arrays of objects**, often with **nested data** inside each object (like an order containing an array of items, or a user containing an address object). Today's focus is combining `.map()`, `.filter()`, `.reduce()`, destructuring, and object methods together to handle this kind of realistic data confidently.

## Topic by Topic

### Topic 1: Arrays of objects — the realistic default

Theory:
Most real data (users, products, orders) is represented as an array of objects, where each object has several related fields.

Code Example:

```js
const orders = [
  { id: 1, customer: "Riya", total: 1200, status: "delivered" },
  { id: 2, customer: "Aman", total: 800, status: "pending" },
  { id: 3, customer: "Riya", total: 500, status: "delivered" },
];

const delivered = orders.filter((order) => order.status === "delivered");
console.log(delivered.length); // 2
```

**Explanation:** This is the standard shape you'll work with constantly — an array where each item is a full object with several properties, filtered/transformed using the methods from this module.

**Key Points:**

- Arrays of objects are the default shape of most real-world data.
- `.filter()`, `.map()`, `.reduce()`, and `.find()` all combine naturally on this shape.
- Practicing with realistic field names (not just `a`, `b`, `c`) builds real intuition.

### Topic 2: Nested data — arrays inside objects

Theory:
An object can contain an array as one of its properties — like an order containing a list of items — requiring nested loops or chained array methods to process fully.

Code Example:

```js
const order = {
  id: 101,
  items: [
    { name: "Pen", price: 20, quantity: 3 },
    { name: "Notebook", price: 60, quantity: 2 },
  ],
};

const orderTotal = order.items.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);

console.log(orderTotal); // 180
```

**Explanation:** `order.items` is itself an array, so we call `.reduce()` directly on it to calculate the order's total — a very common nested-data pattern.

**Key Points:**

- Access a nested array via its property name, then use array methods directly on it.
- This exact "order with items" shape is extremely common in real e-commerce-style data.
- Combining nested access with `.reduce()`/`.map()` is a core real-world skill.

### Topic 3: Transforming API-style data

Theory:
Data from external sources often needs reshaping (renaming fields, computing new ones, filtering out irrelevant parts) before it's useful in your program.

Code Example:

```js
const rawUsers = [
  { user_id: 1, full_name: "Aisha Khan", is_active: 1 },
  { user_id: 2, full_name: "Tom Lee", is_active: 0 },
];

const cleanUsers = rawUsers
  .filter((u) => u.is_active === 1)
  .map((u) => ({ id: u.user_id, name: u.full_name }));

console.log(cleanUsers); // [{id:1, name:"Aisha Khan"}]
```

**Explanation:** `.filter()` first keeps only active users, then `.map()` reshapes each remaining record into a cleaner object — a two-step chain that's extremely common when consuming real APIs (a full topic starting Day 88).

**Key Points:**

- Real API data often uses different naming conventions (`snake_case`, numeric flags) than what you want to work with.
- `.filter().map()` chains are the standard way to both narrow down and reshape data.
- This exact pattern will directly apply once you start working with the Fetch API in Module 6.

### Topic 4: Searching and filtering realistic data together

Theory:
Real search/filter features usually combine multiple techniques — finding one specific record, or filtering down a list based on several combined criteria.

Code Example:

```js
const products = [
  { name: "Laptop", price: 55000, category: "Electronics" },
  { name: "Desk", price: 4500, category: "Furniture" },
  { name: "Mouse", price: 500, category: "Electronics" },
];

function searchProducts(products, { category, maxPrice }) {
  return products.filter((p) => p.category === category && p.price <= maxPrice);
}

console.log(
  searchProducts(products, { category: "Electronics", maxPrice: 1000 }),
);
// [{name:"Mouse", price:500, category:"Electronics"}]
```

**Explanation:** This function combines destructured parameters (Day 44) with `.filter()` and multiple combined conditions — a realistic, reusable search function.

**Key Points:**

- Real search/filter functions usually accept multiple optional criteria together.
- Destructuring function parameters keeps the function signature clean and self-documenting.
- This is a strong preview of how search/filter UI features are built in real applications (revisited again in Module 6/7 projects).

## Recap

- Arrays of objects, and objects containing nested arrays, are the realistic default shape of real-world data.
- Combining `.filter()`, `.map()`, and `.reduce()` handles transforming and reshaping this data cleanly.
- Realistic search/filter functions combine destructuring with multiple combined `.filter()` conditions.

## What's Next

Practice for today: `public/coding/JavaScript/day-045-data-transformation.md`. Day 46 is a dedicated data processing practice day with student/employee/product datasets.
