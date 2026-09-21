---
title: call, apply and bind
slug: day-059-call-apply-and-bind
dayLabel: Day 59
level: Intermediate
estimatedMinutes: 30
order: 59
track: javascript
---

# Day 59 [Intermediate]: `call()`, `apply()`, and `bind()`

## Goal

Fully understand `call()`, `apply()`, and `bind()` — the three tools for explicitly controlling what `this` refers to inside a function.

## Prerequisites

- Day 56 (preview practice), Day 58 (`this` keyword in depth)

## Explanation

Day 58 showed that `this` depends on how a function is called — but sometimes you need to **explicitly control** what `this` should be, regardless of the normal calling rules. `call()`, `apply()`, and `bind()` are three methods available on every function that let you do exactly that.

`call(thisArg, arg1, arg2, ...)` immediately invokes the function with a specific `this` and individual arguments. `apply(thisArg, [args])` does the same, but takes arguments as an array. `bind(thisArg)` does NOT invoke the function immediately — instead, it returns a brand-new function permanently locked to that `this` value, ready to be called whenever you want.

## Topic by Topic

### Topic 1: `call()` — invoke with a specific `this`

Theory:
`function.call(thisArg, arg1, arg2, ...)` calls the function immediately, with `this` set to `thisArg` and any following arguments passed individually.

Code Example:

```js
function introduce(city) {
  console.log(`I'm ${this.name}, from ${city}`);
}

const person = { name: "Leo" };
introduce.call(person, "Paris"); // "I'm Leo, from Paris"
```

**Explanation:** `introduce` isn't a method of `person` at all — `.call(person, "Paris")` explicitly tells JavaScript "run this function with `this` set to `person`, and pass `Paris` as the first regular argument."

**Key Points:**

- `.call()` invokes immediately, with `this` and arguments passed individually.
- Useful for "borrowing" a function/method to run with a different object as context.
- The function doesn't need to be attached to the object at all beforehand.

### Topic 2: `apply()` — same idea, arguments as an array

Theory:
`apply()` behaves identically to `call()`, except regular arguments are passed as a single array instead of individually.

Code Example:

```js
function introduce(city, country) {
  console.log(`I'm ${this.name}, from ${city}, ${country}`);
}

const person = { name: "Mina" };
introduce.apply(person, ["Tokyo", "Japan"]); // "I'm Mina, from Tokyo, Japan"
```

**Explanation:** The array `["Tokyo", "Japan"]` is unpacked into the function's `city, country` parameters — functionally identical to `.call(person, "Tokyo", "Japan")`.

**Key Points:**

- `.apply()` = same as `.call()`, but arguments come as one array.
- Useful when you already have your arguments collected in an array (e.g. from another function).
- Since spread (`...array`), the practical need for `.apply()` specifically has decreased, but it's still important to recognize.

### Topic 3: `bind()` — create a permanently-bound function

Theory:
`bind(thisArg)` does NOT call the function — it returns a brand-new function with `this` permanently locked to `thisArg`, ready to be called later, as many times as needed.

Code Example:

```js
const car = {
  brand: "Tesla",
  describe() {
    console.log(`This is a ${this.brand}`);
  },
};

const boundDescribe = car.describe.bind(car);

setTimeout(boundDescribe, 100); // still correctly logs "This is a Tesla"
```

**Explanation:** Without `.bind(car)`, passing `car.describe` directly to `setTimeout` would lose its connection to `car` (exactly the Day 58 problem) — `.bind(car)` fixes this permanently, producing a new function that always has the correct `this`, no matter how it's later called.

**Key Points:**

- `.bind()` returns a new function — it does not call anything immediately.
- This is the standard fix for passing object methods as callbacks (event listeners, timers, etc.).
- The returned bound function's `this` can never be changed again, even by later `.call()`/`.apply()`.

### Topic 4: Partial application with `bind()`

Theory:
`bind()` can also pre-fill some of a function's arguments in advance, creating a more specific version of a general function — called partial application.

Code Example:

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // pre-fill "a" as 2; "this" isn't used here, so null is fine

console.log(double(5)); // 10 - only needed to provide "b"
console.log(double(10)); // 20
```

**Explanation:** `multiply.bind(null, 2)` creates a new function where the first argument is always `2`, and only the second argument (`b`) needs to be provided when actually calling it.

**Key Points:**

- `bind()` can pre-fill arguments in addition to (or instead of) setting `this`.
- When `this` doesn't matter (like a plain math function), passing `null` as the first argument is common.
- This partial-application technique produces specialized functions from general ones, similar in spirit to `multiplyBy()` from Day 56.

## Recap

- `.call(thisArg, ...args)` and `.apply(thisArg, [args])` invoke immediately with a specific `this`.
- `.bind(thisArg)` returns a new, permanently-bound function — the standard fix for passing methods as callbacks.
- `.bind()` can also pre-fill arguments, creating specialized versions of general functions.

## What's Next

Practice for today: `public/coding/JavaScript/day-059-prototype-inheritance.md`. Day 60 introduces prototypes in full theoretical depth.
