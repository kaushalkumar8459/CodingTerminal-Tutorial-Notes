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

<!-- codingterminal-solution:start -->

# Day 052 — Solution: Callback Functions

**1–5. Basic callbacks**

```js
function processUser(user, callback) { console.log("Processing started"); return callback(user); }
function calculate(a, b, operation) { return operation(a, b); }
function validate(value, validatorCallback) { return validatorCallback(value); }
console.log(processUser({ name: "Asha" }, (user) => user.name));
console.log(calculate(6, 2, (a, b) => a + b));
function isPositive(value) { return value > 0; }
console.log(validate(4, isPositive));
```

**6. Success and failure**

```js
function processOrder(order, onSuccess, onFailure) {
  if (order.items && order.items.length > 0) return onSuccess(order);
  return onFailure("Order has no items");
}
```

**7. Multiple validators**

```js
function validateAll(value, ...validators) { return validators.every((validator) => validator(value)); }
console.log(validateAll("hello@example.com", (v) => v.length > 3, (v) => v.includes("@")));
```

**8. Transform then sum**

```js
function calculateNumbers(numbers, callback) { return numbers.map(callback).reduce((sum, value) => sum + value, 0); }
console.log(calculateNumbers([1, 2, 3], (number) => number * 2)); // 12
```

**9. Event-style storage**

```js
const events = {};
function onEvent(eventName, callback) { (events[eventName] ||= []).push(callback); }
onEvent("saved", () => console.log("saved"));
```

**10. Reuse one callback**

```js
function callTwice(callback) { callback("first"); callback("second"); }
callTwice((value) => console.log(value));
```

## Interview-style questions

**11.** A callback is a function passed to another function so that the receiving function can call it at the appropriate time.

**12.** Separate callbacks let the caller choose different behavior for success and failure without changing the order-processing logic.

**13.** `callback` passes the function itself. `callback()` runs it immediately and passes its return value instead.

<!-- codingterminal-solution:end -->

