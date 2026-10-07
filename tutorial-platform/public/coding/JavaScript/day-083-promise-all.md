# Day 083 — Promise.all (loadUsers, loadProducts, loadOrders)

Matches Tutorial Day 83 (Promises). No limit on how many you build.

## Basic

1. Build `loadUsers()`, `loadProducts()`, `loadOrders()` as Promise-returning functions
   (each using `setTimeout` internally, with different simulated delays).
2. Call all three individually with `.then()` and observe they each resolve at their
   own pace.
3. Use `Promise.all([loadUsers(), loadProducts(), loadOrders()])` to wait for ALL
   THREE to finish before proceeding.
4. Log the combined result of `Promise.all()` — confirm it's an array containing each
   individual result, in the SAME order you passed the Promises in (not the order they
   actually finished).
5. Measure roughly how long `Promise.all()` takes compared to calling the three
   functions one after another with separate `.then()` chains (should be close to the
   SLOWEST individual delay, not the sum of all three).

## Concept

6. Make ONE of the three functions (e.g. `loadOrders()`) reject sometimes — confirm
   that `Promise.all()` immediately rejects as a whole the moment ANY one of them fails,
   even if the others would have succeeded.
7. Add a `.catch()` after your `Promise.all()` call and confirm it correctly catches
   the failure from problem #6.
8. Build a `loadDashboardData()` function that uses `Promise.all()` internally to load
   users, products, and orders together, returning one combined object.

## Interview-style questions

9. What does `Promise.all()` return if you pass it an array of Promises?
10. What happens to `Promise.all()` as a whole if even ONE of the input Promises rejects?
11. Why is `Promise.all()` generally FASTER overall than awaiting each Promise one at a
    time in sequence, when the operations don't depend on each other?

## Notes

- `Promise.all()` is the standard tool for running several INDEPENDENT async
  operations in parallel and waiting for all of them together — exactly the "problem 4"
  solution previewed on Day 82.
- Today's "fail-fast" behavior (rejecting the whole thing on ANY single failure) is
  worth remembering — Day 84/85 will cover `Promise.allSettled()`, which behaves
  differently.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

