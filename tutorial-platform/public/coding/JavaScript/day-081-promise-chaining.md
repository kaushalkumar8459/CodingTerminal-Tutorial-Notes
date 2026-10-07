# Day 081 — Promise Chaining

Matches Tutorial Day 81 (The Event Loop). No limit on how many you build.

## Basic

1. Chain two `.then()` calls on a single Promise, where the second `.then()` uses the
   value returned by the first.
2. Chain three `.then()` calls, each transforming the value further (e.g. add 1,
   double it, then convert to a string).
3. Return a NEW Promise from inside a `.then()` callback, and confirm the chain
   correctly waits for it before continuing to the next `.then()`.
4. Add a `.catch()` at the end of a chain and trigger an error partway through
   (e.g. a `reject()` in the middle) — confirm it correctly skips the remaining
   `.then()` calls and jumps to `.catch()`.
5. Add a `.finally()` at the end of a chain that always logs "Done", regardless of
   success or failure.

## Concept — rebuilding Day 79's callback hell chain

6. Rebuild your `login()` → `getUser()` → `getOrders()` → `getProducts()` chain from
   Day 78/79 using Promise-based versions (from Day 80) and `.then()` chaining instead
   of nested callbacks.
7. Compare the READABILITY of this Promise-chain version against the original nested
   callback version from Day 79 — write down at least 2 specific improvements you notice.
8. Add proper `.catch()` error handling to the ENTIRE chain (one `.catch()` at the end,
   instead of checking for errors at every single step).
9. Build a chain where one step depends on TWO earlier pieces of data (e.g. combining
   the user AND their orders before proceeding) — you can pass data forward through
   the chain by returning objects from `.then()`.

## Interview-style questions

10. Why must you `return` a Promise from inside a `.then()` callback for the chain to
    correctly "wait" for it?
11. What happens to the remaining `.then()` calls in a chain once one step throws an
    error or calls `reject()`?
12. Why is having ONE `.catch()` at the end of a chain usually better than checking for
    errors after every single step?

## Notes

- Promise chaining directly solves the "callback hell" problem from Day 79 — this is
  the exact comparison worth focusing on today.
- Forgetting to `return` a value/Promise from inside a `.then()` is one of the most
  common Promise-related bugs — always double check your `return` statements.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

