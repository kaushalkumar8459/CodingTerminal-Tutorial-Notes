---
title: Data Processing Practice
slug: day-046-data-processing-practice
dayLabel: Day 46
level: Intermediate
estimatedMinutes: 30
order: 46
track: javascript
---

# Day 46 [Intermediate]: Data Processing Practice

## Goal

Practice full end-to-end data processing — grouping, sorting, filtering, and calculating — using realistic student, employee, and product datasets, ahead of tomorrow's Module 3 project.

## Prerequisites

- Day 28–45 (all of Module 3 so far)

## Explanation

Today doesn't introduce new syntax — it's a dedicated, focused practice day for combining everything from this module into realistic, multi-step data processing tasks. The goal is to build confidence handling a dataset from start to finish: understanding its shape, deciding which methods apply, and chaining them together to answer a specific question.

## Topic by Topic

### Topic 1: Working with student data

Theory:
Student datasets usually combine identifying info (name, id) with nested performance data (marks per subject) — requiring both object and array skills together.

Code Example:

```js
const students = [
  { name: "Anaya", marks: { math: 88, science: 92 } },
  { name: "Vikram", marks: { math: 65, science: 70 } },
];

const withAverage = students.map((s) => {
  const values = Object.values(s.marks);
  const average = values.reduce((sum, m) => sum + m, 0) / values.length;
  return { ...s, average };
});

console.log(withAverage);
```

**Explanation:** `Object.values(s.marks)` extracts the numeric marks as an array so `.reduce()` can average them; spreading `...s` into the returned object keeps all original fields while adding the new `average`.

**Key Points:**

- Combining `Object.values()` with `.reduce()` is a common pattern for aggregating nested numeric data.
- Spreading `{...original, newField}` is the standard way to add a computed field without losing existing ones.
- This same pattern applies to employee salaries, product ratings, or any similar nested numeric data.

### Topic 2: Working with employee data

Theory:
Employee datasets commonly need grouping (by department) and ranking (top earners) — both `.reduce()`-driven and `.sort()`-driven tasks.

Code Example:

```js
const employees = [
  { name: "Neha", department: "HR", salary: 40000 },
  { name: "Farhan", department: "Engineering", salary: 65000 },
  { name: "Priya", department: "HR", salary: 42000 },
];

const byDepartment = employees.reduce((groups, emp) => {
  (groups[emp.department] ||= []).push(emp);
  return groups;
}, {});

console.log(byDepartment);
```

**Explanation:** `(groups[emp.department] ||= [])` creates an empty array for a new department the first time it's seen, then pushes the employee into it — a compact grouping pattern built on `.reduce()`.

**Key Points:**

- `||=` ("logical OR assignment") is a shorthand for "set this to a default only if it's currently falsy."
- Grouping by a category is one of the most common real-world `.reduce()` uses.
- Once grouped, you can further process each group (e.g. calculate average salary per department).

### Topic 3: Working with product data

Theory:
Product datasets typically need filtering (by category/price), sorting (by price/rating), and calculations (discounts, totals) combined together.

Code Example:

```js
const products = [
  { name: "Phone", price: 20000, rating: 4.5, category: "Electronics" },
  { name: "Chair", price: 3000, rating: 4.0, category: "Furniture" },
];

const discounted = products
  .filter((p) => p.category === "Electronics")
  .map((p) => ({ ...p, discountedPrice: p.price * 0.9 }));

console.log(discounted);
```

**Explanation:** `.filter()` narrows to the relevant category, then `.map()` adds a computed `discountedPrice` field — a very typical two-step e-commerce data processing chain.

**Key Points:**

- Filtering before mapping avoids doing extra work on records you'll discard anyway.
- Adding computed fields (like `discountedPrice`) via spread keeps the original data intact alongside the new value.
- This exact chain generalizes to almost any "filter down, then compute something extra" task.

### Topic 4: Combining calculations across a full dataset

Theory:
Real reporting tasks often need several combined numbers from one dataset — count, total, average, min/max — ideally computed efficiently.

Code Example:

```js
function summarize(products) {
  const prices = products.map((p) => p.price);
  return {
    count: products.length,
    total: prices.reduce((sum, p) => sum + p, 0),
    average: prices.reduce((sum, p) => sum + p, 0) / products.length,
    mostExpensive: Math.max(...prices),
  };
}

console.log(summarize(products));
```

**Explanation:** Each summary value uses whichever method fits it best — `.length` for count, `.reduce()` for totals/averages, `Math.max(...)` with spread for the maximum — combined into one clear summary object.

**Key Points:**

- Real "dashboard"-style summaries combine several different calculations on the same dataset.
- Choosing the simplest, clearest method for each individual calculation is better than forcing everything into one giant `.reduce()`.
- This pattern is a direct preview of dashboard/reporting features you'll build in later projects.

## Recap

- Student, employee, and product datasets each combine object + array skills in slightly different realistic ways.
- Grouping with `.reduce()` and the `||=` pattern is a standard, compact technique.
- Combining `.filter()`, `.map()`, and `.reduce()` — each used for what it does best — handles most real data processing tasks cleanly.

## What's Next

Practice for today: `public/coding/JavaScript/day-046-real-world-data-challenge.md` — the E-Commerce Product Processor project. Day 47 wraps up Module 3 with the Employee/Product Management System assignment.
