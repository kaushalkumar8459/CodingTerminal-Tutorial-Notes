# Day 083 — Solution: Promise.all

```js
const delayed = (value, delay, shouldFail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () =>
        shouldFail ? reject(new Error(`${value} failed`)) : resolve(value),
      delay,
    ),
  );
const loadUsers = () => delayed(["Asha", "Ben"], 100);
const loadProducts = () => delayed(["Book", "Pen"], 200);
const loadOrders = () => delayed([1, 2], 150);

loadUsers().then(console.log);
loadProducts().then(console.log);
loadOrders().then(console.log);
Promise.all([loadUsers(), loadProducts(), loadOrders()])
  .then(console.log)
  .catch(console.error);
```

`Promise.all()` preserves input order even if the individual operations finish in a different order, and takes about as long as the slowest operation when they start together.

**6–8. Failure and dashboard**

```js
function loadDashboardData() {
  return Promise.all([loadUsers(), loadProducts(), loadOrders()]).then(
    ([users, products, orders]) => ({ users, products, orders }),
  );
}
loadDashboardData().then(console.log).catch(console.error);
Promise.all([loadUsers(), delayed("orders", 50, true), loadProducts()]).catch(
  (error) => console.log("failed fast", error.message),
);
```

## Interview-style questions

**9.** It returns one Promise that fulfills with an array of results in input order.

**10.** It rejects as soon as any input Promise rejects.

**11.** Independent operations overlap their waiting time, so total time is close to the longest operation rather than the sum.
