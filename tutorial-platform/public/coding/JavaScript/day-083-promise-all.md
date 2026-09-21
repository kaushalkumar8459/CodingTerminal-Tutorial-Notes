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
