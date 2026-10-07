# Day 078 — Callback Async (login, getUser, getOrders, getProducts)

Matches Tutorial Day 78 (Execution Context). No limit on how many you build.

## Basic

1. Write a `login(username, password, callback)` function that simulates an async
   login using `setTimeout()`, calling `callback(null, {username})` on "success" after
   a short delay.
2. Write a `getUser(userId, callback)` function that simulates fetching a user with
   `setTimeout()`, calling `callback(null, {id: userId, name: "..."})`.
3. Write a `getOrders(userId, callback)` function that simulates fetching a user's
   orders with `setTimeout()`.
4. Write a `getProducts(callback)` function that simulates fetching a product list
   with `setTimeout()`.
5. Call each of these functions and log their results using the callback, confirming
   the surrounding code doesn't wait/block for them.

## Concept

6. Chain `login()` → `getUser()`: only call `getUser()` once `login()`'s callback
   confirms success.
7. Chain `login()` → `getUser()` → `getOrders()`: call each subsequent function only
   after the previous one's callback fires (this is the beginning of "callback hell" —
   don't worry about fixing it yet, that's tomorrow).
8. Add error simulation: have `login()` sometimes call
   `callback(new Error("Invalid credentials"))` instead of succeeding, and handle that
   case in the calling code.
9. Use the standard Node-style callback pattern `callback(error, result)` consistently
   across all four functions (error first, result second).

## Interview-style questions

10. Why use `setTimeout()` to SIMULATE an async operation, when the real operation
    (like a network request) isn't actually a timer?
11. What does the `callback(error, result)` pattern (error-first callbacks) let calling
    code do that a callback with only `callback(result)` couldn't handle as clearly?

## Notes

- These simulated functions are standing in for real asynchronous operations (like
  Fetch API calls, covered starting Day 88) — the CALLBACK PATTERN is what matters today,
  not the specific `setTimeout()` simulation technique.
- Chaining multiple callback-based async functions together (problem #7) will start to
  feel awkward — that awkwardness is intentional, setting up tomorrow's "callback hell" topic.

<!-- codingterminal-solution:start -->

# Day 078 — Solution: Callback Async

```js
function login(username, password, callback) {
  setTimeout(
    () =>
      password === "secret"
        ? callback(null, { username })
        : callback(new Error("Invalid credentials")),
    100,
  );
}
function getUser(userId, callback) {
  setTimeout(() => callback(null, { id: userId, name: "Asha" }), 100);
}
function getOrders(userId, callback) {
  setTimeout(() => callback(null, [{ id: 1, userId }]), 100);
}
function getProducts(callback) {
  setTimeout(() => callback(null, [{ id: 1, name: "Book" }]), 100);
}

login("asha", "secret", (error, result) => {
  if (error) return console.error(error);
  console.log(result);
});
getUser(1, (error, result) => {
  if (!error) console.log(result);
});
getOrders(1, (error, result) => {
  if (!error) console.log(result);
});
getProducts((error, result) => {
  if (!error) console.log(result);
});
```

**6–9. Chained error-first callbacks**

```js
login("asha", "secret", (error, account) => {
  if (error) return console.error(error);
  getUser(account.username, (error, user) => {
    if (error) return console.error(error);
    getOrders(user.id, (error, orders) => {
      if (error) return console.error(error);
      getProducts((error, products) => {
        if (error) return console.error(error);
        console.log({ user, orders, products });
      });
    });
  });
});
```

## Interview-style questions

**10.** `setTimeout` stands in for the delay of a network, file, or database operation and lets us practice the callback timing without a real service.

**11.** Error-first callbacks give every operation a consistent success and failure channel, so callers can handle both explicitly.

<!-- codingterminal-solution:end -->

