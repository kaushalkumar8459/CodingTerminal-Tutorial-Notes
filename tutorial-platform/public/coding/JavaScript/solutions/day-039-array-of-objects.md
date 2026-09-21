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
