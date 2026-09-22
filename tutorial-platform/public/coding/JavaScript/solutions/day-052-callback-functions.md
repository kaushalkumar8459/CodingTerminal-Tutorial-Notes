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
