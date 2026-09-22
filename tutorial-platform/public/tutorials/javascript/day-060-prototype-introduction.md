---
title: Prototype Introduction
slug: day-060-prototype-introduction
dayLabel: Day 60
level: Intermediate
estimatedMinutes: 30
order: 60
track: javascript
---

# Day 60 [Intermediate]: Prototype Introduction

## Goal

Understand exactly what a prototype is, how the prototype chain works, and how `Object.create()` and `Object.getPrototypeOf()` interact with it.

## Prerequisites

- Day 58 (`this`), Day 41 (objects), Day 58-59 (prototype practice preview)

## Explanation

Every object in JavaScript has an internal, hidden link to another object, called its **prototype**. When you try to access a property or method on an object, JavaScript first checks the object itself — if it's not found there, it looks at the object's prototype, then that prototype's prototype, and so on, until it either finds the property or reaches the end of the chain (`null`). This lookup path is called the **prototype chain**.

This is exactly why array methods like `.map()`/`.filter()` work on every array — they're defined once on `Array.prototype`, and every array you create automatically has access to them through the prototype chain, without needing its own private copy.

## Topic by Topic

### Topic 1: What is a prototype?

Theory:
A prototype is simply another object that a given object is linked to — used as a fallback source for properties/methods not found directly on the object itself.

Code Example:

```js
const array = [1, 2, 3];

console.log(array.map); // a function - but where does it actually live?
console.log(Object.getPrototypeOf(array) === Array.prototype); // true
```

**Explanation:** `array` doesn't have its own personal `.map` method — `.map` lives on `Array.prototype`, and `array`'s prototype link is exactly what gives it access.

**Key Points:**

- A prototype is a fallback object consulted when a property isn't found directly.
- Every array shares the SAME `Array.prototype` — not separate copies of each method.
- This is a huge memory-efficiency benefit — methods are defined once, shared by all instances.

### Topic 2: The prototype chain

Theory:
When looking up a property, JavaScript checks the object, then its prototype, then that prototype's prototype, continuing until it finds a match or reaches the end (`null`).

Code Example:

```js
const base = {
  greet() {
    return "Hello from base";
  },
};
const middle = Object.create(base);
const child = Object.create(middle);

console.log(child.greet()); // "Hello from base" - found via the chain: child -> middle -> base
```

**Explanation:** `child` doesn't have `greet` directly, and neither does `middle` — but `base` does, so JavaScript keeps walking up the chain until it finds it there.

**Key Points:**

- The prototype chain can have multiple levels, not just one.
- The lookup stops at the FIRST match found, walking from the object itself outward.
- If nothing in the entire chain has the property, the result is `undefined` (not an error).

### Topic 3: `Object.create()` — building a prototype link directly

Theory:
`Object.create(proto)` creates a brand-new, empty object whose prototype is set directly to `proto` — a clean, explicit way to set up inheritance without using a constructor function at all.

Code Example:

```js
const vehiclePrototype = {
  describe() {
    return `A vehicle with ${this.wheels} wheels`;
  },
};

const car = Object.create(vehiclePrototype);
car.wheels = 4;

console.log(car.describe()); // "A vehicle with 4 wheels"
```

**Explanation:** `car` is a fresh object whose prototype is explicitly `vehiclePrototype` — `car.describe()` works via the prototype chain, even though `describe` was never defined directly on `car`.

**Key Points:**

- `Object.create(proto)` is the most direct, explicit way to establish a prototype relationship.
- No constructor function or `new` is needed for this approach.
- This is exactly the mechanism used "under the hood" by constructor functions and classes.

### Topic 4: `Object.getPrototypeOf()` — inspecting the chain

Theory:
`Object.getPrototypeOf(obj)` lets you directly inspect what an object's prototype actually is — useful for understanding or debugging the prototype chain.

Code Example:

```js
const car = Object.create({ wheels: 4 });
console.log(Object.getPrototypeOf(car)); // { wheels: 4 }
console.log(Object.getPrototypeOf({}) === Object.prototype); // true - plain objects link to Object.prototype
console.log(Object.getPrototypeOf(Object.prototype)); // null - the very end of the chain
```

**Explanation:** Even a plain `{}` object literal has a prototype — `Object.prototype` — which is why every object automatically has access to methods like `.toString()`; the chain finally ends at `null`.

**Key Points:**

- `Object.getPrototypeOf(obj)` is the modern, correct way to inspect an object's prototype (prefer it over `__proto__`).
- Every plain object ultimately links to `Object.prototype`, unless deliberately created without one.
- The prototype chain always terminates at `null`.

## Recap

- A prototype is a fallback object consulted when a property isn't found directly on an object.
- The prototype chain can have multiple levels, searched in order until a match is found or `null` is reached.
- `Object.create()` explicitly builds a prototype relationship; `Object.getPrototypeOf()` inspects it.

## What's Next

Practice for today: `public/coding/JavaScript/day-060-getters-and-setters.md`. Day 61 covers prototype inheritance with constructor functions in full depth.
