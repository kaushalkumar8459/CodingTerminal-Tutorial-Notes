# Day 081 — Solution: Promise Chaining

```js
Promise.resolve(2)
  .then((value) => value + 1)
  .then((value) => value * 2)
  .then((value) => String(value))
  .then(console.log); // "6"

Promise.resolve("start")
  .then(
    (value) =>
      new Promise((resolve) => setTimeout(() => resolve(`${value}-done`), 50)),
  )
  .then(console.log);

Promise.resolve()
  .then(() => Promise.reject(new Error("middle failure")))
  .then(() => console.log("skipped"))
  .catch(console.error)
  .finally(() => console.log("Done"));
```

**6–9. Rebuild the data chain**

```js
login("asha", "secret")
  .then((account) => getUser(account.username))
  .then((user) => getOrders(user.id).then((orders) => ({ user, orders })))
  .then(({ user, orders }) =>
    getProducts().then((products) => ({ user, orders, products })),
  )
  .then(console.log)
  .catch(console.error);
```

The Promise version has less indentation, one shared error path, and a clearer sequence of named stages than nested callbacks.

## Interview-style questions

**10.** Returning the Promise makes the outer chain adopt its state and wait for its result. Without `return`, the next step runs immediately with `undefined`.

**11.** Remaining success handlers are skipped until a rejection handler is found.

**12.** One final catch centralizes shared failure handling and avoids repeating the same check at every level.
