# Day 045 — Data Transformation

Matches Tutorial Day 45 (Array and Object Practical Patterns). Use realistic datasets
(users, products, orders, employees) — no limit on how many you solve.

## Basic

1. Group an array of orders by their `status` field into an object of arrays.
2. Filter an array of products to only those within a price range (min and max).
3. Sort an array of employees by `department`, then by `name` within each department.
4. Map an array of orders to just their `id` and computed `total` (from nested items).
5. Aggregate: calculate the total revenue across all orders in an array.

## Concept

6. Group employees by department AND calculate the average salary per department.
7. Given orders with nested `items`, flatten all items across all orders into one single
   array (regardless of which order they came from).
8. Given a list of products, build a summary object showing count and average price per category.
9. Given a list of users with `signupDate` (as strings), sort them from newest to oldest.
10. Build a function `topN(array, key, n)` that returns the top N items sorted by a
    given numeric property (e.g. top 3 highest-paid employees).
11. Given nested order data, find the customer who has spent the most in total across
    all their orders.
12. Build a report object combining multiple aggregations at once (total revenue, order
    count, average order value) from one array of orders.

## Interview-style questions

13. What's a clean way to structure a "group by" operation using `.reduce()`?
14. Why is calculating multiple related aggregations (count, sum, average) often more
    efficient in ONE pass through the data using `.reduce()`, rather than three
    separate `.filter()`/`.map()` passes?
15. When dealing with nested data (orders containing items), what's the general
    two-step approach for problems that need to look "inside" every record?

## Notes

- These problems are intentionally similar to real analytics/reporting features —
  "group by," "top N," and "aggregate multiple metrics at once" are patterns you'll
  reuse constantly in real projects.
- Try solving a couple of these two different ways (chained `.filter().map()` vs a
  single `.reduce()`) and compare readability and performance mentally.

<!-- codingterminal-solution:start -->

# Day 045 — Solution: Data Transformation

```js
const orders = [
  {
    id: 1,
    customer: "Asha",
    status: "completed",
    items: [{ price: 20, quantity: 2 }],
  },
  {
    id: 2,
    customer: "Ben",
    status: "pending",
    items: [{ price: 50, quantity: 1 }],
  },
];
const employees = [
  { name: "Maya", department: "IT", salary: 70000 },
  { name: "Leo", department: "HR", salary: 60000 },
];
const products = [
  { name: "Book", category: "study", price: 20 },
  { name: "Pen", category: "study", price: 10 },
];

const orderTotal = (order) =>
  order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const byStatus = orders.reduce((groups, order) => {
  (groups[order.status] ||= []).push(order);
  return groups;
}, {});
const priceRange = products.filter(
  (product) => product.price >= 10 && product.price <= 100,
);
const sortedEmployees = [...employees].sort(
  (a, b) =>
    a.department.localeCompare(b.department) || a.name.localeCompare(b.name),
);
const orderSummaries = orders.map((order) => ({
  id: order.id,
  total: orderTotal(order),
}));
const revenue = orders.reduce((sum, order) => sum + orderTotal(order), 0);
```

**6. Group employees and average salary**

```js
const departmentReport = employees.reduce((groups, employee) => {
  const group = (groups[employee.department] ||= {
    employees: [],
    totalSalary: 0,
  });
  group.employees.push(employee);
  group.totalSalary += employee.salary;
  group.averageSalary = group.totalSalary / group.employees.length;
  return groups;
}, {});
```

**7. Flatten all order items**

```js
const allItems = orders.flatMap((order) => order.items);
```

**8. Category summary**

```js
const categorySummary = products.reduce((result, product) => {
  const category = (result[product.category] ||= { count: 0, total: 0 });
  category.count++;
  category.total += product.price;
  category.averagePrice = category.total / category.count;
  return result;
}, {});
```

**9. Newest users first**

```js
const newestFirst = [
  { signupDate: "2026-01-01" },
  { signupDate: "2026-04-01" },
].sort((a, b) => new Date(b.signupDate) - new Date(a.signupDate));
```

**10. Top N**

```js
function topN(array, key, n) {
  return [...array].sort((a, b) => b[key] - a[key]).slice(0, n);
}
```

**11. Highest-spending customer**

```js
const spending = orders.reduce((result, order) => {
  result[order.customer] = (result[order.customer] || 0) + orderTotal(order);
  return result;
}, {});
const topCustomer = Object.entries(spending).reduce((best, entry) =>
  entry[1] > best[1] ? entry : best,
);
```

**12. One-pass report**

```js
const report = orders.reduce(
  (result, order) => {
    result.count++;
    result.total += orderTotal(order);
    return result;
  },
  { count: 0, total: 0 },
);
report.average = report.count ? report.total / report.count : 0;
```

## Interview-style questions

**13.** Use `reduce()` with an accumulator object; create a bucket for the key, then push the record into it.

**14.** One pass can update count, sum, minimum, and maximum together, avoiding repeated traversal and keeping related logic together.

**15.** First iterate the outer records, then use a nested `map`, `filter`, `reduce`, or loop over each record's inner collection.

<!-- codingterminal-solution:end -->

