# Day 052 — Callback Functions (processUser, processOrder, calculate, validate)

Matches Tutorial Day 52 (The Rest Operator). No limit on how many you solve.

## Basic

1. Write a function `processUser(user, callback)` that calls `callback(user)` after
   doing some basic work (e.g. logging that processing started).
2. Write a function `calculate(a, b, operation)` where `operation` is a callback
   function that performs the actual math (`+`, `-`, `*`, `/`).
3. Write a function `validate(value, validatorCallback)` that returns whatever the
   validator callback returns.
4. Pass an arrow function directly as a callback argument (inline, without naming it first).
5. Pass a named function as a callback argument (defined separately, then referenced by name).

## Concept

6. Write `processOrder(order, onSuccess, onFailure)` that calls `onSuccess(order)` if
   the order is valid (e.g. has items), or `onFailure(reason)` if not.
7. Write a `validate(value, ...validators)` that runs a value through multiple validator
   callbacks (using rest parameters from today's tutorial) and returns `true` only if
   ALL of them pass.
8. Write a `calculate(numbers, callback)` function where `callback` is applied to each
   number using `.map()` internally, then the results are summed.
9. Build a small "event"-style system: a function `onEvent(eventName, callback)` that
   just stores the callback in an object keyed by event name (don't worry about
   triggering it yet — that's more advanced).
10. Write a function that accepts a callback and calls it twice with different arguments,
    demonstrating that the same callback can be reused for different inputs.

## Interview-style questions

11. What is a callback function, in your own words?
12. Why are callbacks useful for functions like `processOrder` that need to handle both
    success and failure cases?
13. What's the difference between passing a function by reference (`callback`) vs
    calling it immediately (`callback()`) when passing it as an argument?

## Notes

- Callbacks are the foundation for understanding asynchronous JavaScript (Module 6) —
  today's practice with synchronous callbacks builds the exact mental model you'll need
  there.
- Watch out for the classic mistake: passing `callback()` (calling it immediately) when
  you meant to pass `callback` (the function itself, to be called later).
