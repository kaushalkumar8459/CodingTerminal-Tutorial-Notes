---
title: Module 3 Assignment - Employee and Product Management System
slug: day-047-module-3-assignment
dayLabel: Day 47
level: Intermediate
estimatedMinutes: 40
order: 47
track: javascript
---

# Day 47 [Intermediate]: Module 3 Assignment — Employee/Product Management System

## Goal

Bring together everything from Module 3 — strings, numbers, arrays, objects, all array methods, destructuring, spread/rest, and data transformation — into one combined project.

## Prerequisites

- Day 28–46 (all of Module 3)

## Explanation

Module 3 was the largest module so far, covering strings, numbers/Math, arrays (search, modification, iteration methods), objects (fundamentals, advanced patterns, built-in methods), destructuring, spread/rest, and realistic data processing. Today's project — an **Employee/Product Management System** — is deliberately broad, touching nearly every skill from this module, similar in spirit to Day 15's and Day 27's capstone projects but at a noticeably more advanced level.

## Topic by Topic

### Topic 1: Project scope

Theory:
Build a system that manages a list of employees (or products — pick one, or do both if you want extra practice) supporting full CRUD-style operations (Create, Read, Update, Delete) plus search, filter, sort, and reporting.

Code Example:

```js
let employees = [
  { id: 1, name: "Wei Chen", department: "Engineering", salary: 62000 },
  { id: 2, name: "Sara Ali", department: "Marketing", salary: 48000 },
];

function addEmployee(newEmployee) {
  employees = [...employees, newEmployee];
}
```

**Explanation:** Using spread to add a new employee (rather than `.push()`) keeps the pattern consistent with non-mutating data updates, which is a common style in modern JavaScript and frameworks.

**Key Points:**

- Decide upfront: employees, products, or both — scope it clearly before starting.
- Favor non-mutating updates (spread-based) for practice, even though `.push()` would also work.
- Build incrementally: data structure first, then one feature at a time.

### Topic 2: Core CRUD operations

Theory:
Create, Read, Update, Delete are the four basic data operations nearly every real system needs.

Code Example:

```js
function updateEmployee(id, updates) {
  employees = employees.map((emp) =>
    emp.id === id ? { ...emp, ...updates } : emp,
  );
}

function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
}
```

**Explanation:** `updateEmployee` uses `.map()` combined with spread to update only the matching record; `deleteEmployee` uses `.filter()` to exclude the matching record — both non-mutating, returning a brand-new array each time.

**Key Points:**

- `.map()` + spread is a clean pattern for "update one item, leave the rest unchanged."
- `.filter()` is the standard pattern for "remove one item by rebuilding the array without it."
- This non-mutating CRUD style is exactly how state updates work in modern frameworks like React.

### Topic 3: Search, filter, sort, and reporting

Theory:
Beyond CRUD, a management system needs to answer questions about the data — searching by name, filtering by department/category, sorting by salary/price, and generating summary reports.

Code Example:

```js
function generateDepartmentReport(employees) {
  return employees.reduce((report, emp) => {
    if (!report[emp.department]) {
      report[emp.department] = { count: 0, totalSalary: 0 };
    }
    report[emp.department].count++;
    report[emp.department].totalSalary += emp.salary;
    return report;
  }, {});
}
```

**Explanation:** This combines grouping and aggregation in one `.reduce()` pass, building a report object keyed by department — directly reusing the grouping pattern from Day 46.

**Key Points:**

- Reuse patterns from Day 45-46 (grouping, aggregation) directly in this project.
- Keep reporting functions separate from CRUD functions — each should do one clear job.
- Test reporting functions with a variety of data (empty arrays, single department, many departments).

### Topic 4: Revision — is Module 3 solid?

Theory:
Before moving to Module 4 (scope, closures, prototypes), confirm the core skills from this module feel comfortable.

Practical:
Self-check questions:

1. Can you confidently choose between `.map()`, `.filter()`, and `.reduce()` for a new problem?
2. Do you understand why `.sort()`/`.reverse()`/`.splice()` mutate, while `.map()`/`.filter()`/`.slice()` don't?
3. Can you destructure a nested object directly, with a default value, without looking it up?
4. Do you understand the difference between a shallow copy and a deep copy, and when each matters?

**Key Points:**

- If any of the self-check questions feel shaky, revisit that specific day before moving on.
- Module 3 is foundational for nearly everything that follows — it's worth the extra revision time here.
- Module 4 builds directly on today's function and data skills, applying them to scope, closures, and `this`.

## Recap

- The Employee/Product Management System combines CRUD operations, search/filter/sort, and reporting.
- Non-mutating updates (map+spread for update, filter for delete) mirror real-world modern JavaScript style.
- Confirm comfort with array method selection, mutation awareness, and destructuring before moving to Module 4.

## What's Next

Practice for today: `public/coding/JavaScript/day-047-module-3-assessment.md` — 40 coding problems covering all of Module 3. Day 48 begins Module 4 with scope in depth.
