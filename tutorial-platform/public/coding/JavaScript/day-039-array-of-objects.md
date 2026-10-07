# Day 039 — Array of Objects

Matches Tutorial Day 39 (The reduce Method). Practice with realistic datasets (users,
products, employees, students, orders) — no limit on how many you solve.

Suggested starter datasets (define these yourself at the top of your file):

- `users`: `{id, name, age, isActive}`
- `products`: `{id, name, price, category, inStock}`
- `employees`: `{id, name, department, salary}`
- `students`: `{id, name, marks: {math, science, english}}`
- `orders`: `{id, userId, items: [{name, price, quantity}], status}`

## Basic

1. Find a specific user by `id` using `.find()`.
2. Filter products to only those in a specific category.
3. Sort employees by salary, ascending.
4. Map students to just their names.
5. Reduce orders to calculate the total revenue across all orders.

## Concept

6. Group employees by department (an object where each key is a department, value is an
   array of employees).
7. Find the average marks per subject across all students.
8. Filter orders to only `"completed"` status, then calculate their combined total.
9. Sort products by price, then by name for products with the same price (two-level sort).
10. Find the top 3 highest-paid employees.
11. Count how many users are active vs inactive.
12. For each student, calculate their average mark across all subjects, and add a `grade`
    field based on that average.
13. Find all products that are both `inStock` AND under a given price.
14. Build a lookup object mapping `userId` to that user's full order history.
15. Calculate the total quantity of items sold across all orders (looping into each
    order's `items` array).

## Interview-style questions

16. When working with a realistic dataset like this, how do you decide whether to use
    `.map()`, `.filter()`, or `.reduce()` for a given task?
17. What's the benefit of chaining `.filter().map()` vs writing one big `.reduce()` that
    does everything at once?
18. Why might grouping data (like employees by department) be more naturally expressed
    with `.reduce()` than `.map()` or `.filter()` alone?

## Notes

- This day is intentionally open-ended — treat these datasets like a personal sandbox
  and invent additional questions about them beyond the ones listed.
- Real interview and job tasks look almost exactly like this — practicing with realistic,
  multi-field objects (not just plain number arrays) is valuable.

<!-- codingterminal-solution:start -->

# Day 039 — Solution: Array of Objects

```js
const users = [
  { id: 1, name: "Asha", age: 22, isActive: true },
  { id: 2, name: "Ben", age: 17, isActive: false },
];
const products = [
  { id: 1, name: "Book", price: 20, category: "study", inStock: true },
  { id: 2, name: "Laptop", price: 900, category: "tech", inStock: true },
];
const employees = [
  { id: 1, name: "Maya", department: "IT", salary: 70000 },
  { id: 2, name: "Leo", department: "HR", salary: 60000 },
];
const students = [
  { id: 1, name: "Asha", marks: { math: 90, science: 80, english: 85 } },
  { id: 2, name: "Ben", marks: { math: 70, science: 75, english: 80 } },
];
const orders = [
  {
    id: 1,
    userId: 1,
    items: [{ name: "Book", price: 20, quantity: 2 }],
    status: "completed",
  },
];

// 1-5
const user = users.find((item) => item.id === 1);
const studyProducts = products.filter(
  (product) => product.category === "study",
);
const salaryAscending = [...employees].sort((a, b) => a.salary - b.salary);
const studentNames = students.map((student) => student.name);
const revenue = orders.reduce(
  (total, order) =>
    total +
    order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  0,
);
```

**6. Group employees by department**

```js
const byDepartment = employees.reduce((groups, employee) => {
  (groups[employee.department] ||= []).push(employee);
  return groups;
}, {});
```

**7. Average mark per subject**

```js
const subjects = ["math", "science", "english"];
const averages = Object.fromEntries(
  subjects.map((subject) => [
    subject,
    students.reduce((sum, student) => sum + student.marks[subject], 0) /
      students.length,
  ]),
);
```

**8. Completed order total**

```js
const completedRevenue = orders
  .filter((order) => order.status === "completed")
  .reduce(
    (total, order) =>
      total +
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    0,
  );
```

**9. Sort by price, then name**

```js
const sortedProducts = [...products].sort(
  (a, b) => a.price - b.price || a.name.localeCompare(b.name),
);
```

**10. Top three employees**

```js
const topEmployees = [...employees]
  .sort((a, b) => b.salary - a.salary)
  .slice(0, 3);
```

**11. Active and inactive counts**

```js
const userStatus = users.reduce(
  (result, userItem) => {
    result[userItem.isActive ? "active" : "inactive"]++;
    return result;
  },
  { active: 0, inactive: 0 },
);
```

**12. Student averages and grades**

```js
const gradedStudents = students.map((student) => {
  const average =
    Object.values(student.marks).reduce((sum, mark) => sum + mark, 0) /
    Object.keys(student.marks).length;
  const grade =
    average >= 90 ? "A" : average >= 80 ? "B" : average >= 70 ? "C" : "D";
  return { ...student, average, grade };
});
```

**13. In-stock under a price**

```js
const affordable = products.filter(
  (product) => product.inStock && product.price < 500,
);
```

**14. Orders by user ID**

```js
const ordersByUser = orders.reduce((lookup, order) => {
  (lookup[order.userId] ||= []).push(order);
  return lookup;
}, {});
```

**15. Total item quantity**

```js
const quantitySold = orders.reduce(
  (total, order) =>
    total + order.items.reduce((sum, item) => sum + item.quantity, 0),
  0,
);
```

## Interview-style questions

**16.** Use `map()` for one output per item, `filter()` to keep a subset, and `reduce()` to calculate or build one accumulated result.

**17.** `filter().map()` states the two operations clearly and is easier to read. One large `reduce()` can be more compact but may hide the intent.

**18.** Grouping creates one accumulator object with many buckets, which is exactly the state `reduce()` is designed to build.

<!-- codingterminal-solution:end -->

