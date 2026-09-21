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
