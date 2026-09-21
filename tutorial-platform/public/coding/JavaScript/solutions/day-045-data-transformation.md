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
