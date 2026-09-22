---
title: Advanced Object Concepts - Property Descriptors, Getters and Setters
slug: day-062-advanced-object-concepts
dayLabel: Day 62
level: Intermediate
estimatedMinutes: 30
order: 62
track: javascript
---

# Day 62 [Intermediate]: Advanced Object Concepts — Property Descriptors, Getters and Setters

## Goal

Understand property descriptors (the hidden metadata behind every property), and formalize getters/setters, building on the Day 60 preview.

## Prerequisites

- Day 43 (`Object.freeze`/`seal`), Day 60 (getters/setters preview)

## Explanation

Every object property actually has more information attached to it than just its value — this hidden metadata is called a **property descriptor**, and includes flags like whether the property can be changed (`writable`), listed in loops (`enumerable`), or reconfigured (`configurable`). `Object.getOwnPropertyDescriptor()` lets you inspect this metadata directly, and `Object.defineProperty()` lets you set it explicitly — giving you far more precise control than a normal property assignment.

**Getters** (`get propertyName() {}`) and **setters** (`set propertyName(value) {}`) let a property LOOK like a plain value from the outside, while actually running custom logic (computing a value, or validating an incoming one) behind the scenes.

## Topic by Topic

### Topic 1: Property descriptors

Theory:
Every property has a descriptor with flags: `value`, `writable` (can it be reassigned?), `enumerable` (does it show up in loops/`Object.keys()`?), and `configurable` (can its descriptor itself be changed, or can it be deleted?).

Code Example:

```js
const car = { brand: "Kia" };
console.log(Object.getOwnPropertyDescriptor(car, "brand"));
// { value: "Kia", writable: true, enumerable: true, configurable: true }
```

**Explanation:** A normal property assignment like `car.brand = "Kia"` automatically gets all three flags set to `true` — fully changeable, visible, and reconfigurable by default.

**Key Points:**

- Every property secretly has `writable`, `enumerable`, and `configurable` flags, even when created normally.
- Normal assignments default all three flags to `true`.
- `Object.getOwnPropertyDescriptor(obj, key)` reveals this hidden metadata.

### Topic 2: `Object.defineProperty()` for precise control

Theory:
`Object.defineProperty(obj, key, descriptor)` lets you create or modify a property with EXACTLY the flags you specify, rather than the defaults.

Code Example:

```js
const config = {};
Object.defineProperty(config, "apiVersion", {
  value: "v2",
  writable: false, // cannot be reassigned
  enumerable: true, // shows up in Object.keys()/for...in
  configurable: false, // cannot be deleted or reconfigured
});

config.apiVersion = "v3"; // silently fails (or throws in strict mode)
console.log(config.apiVersion); // still "v2"
```

**Explanation:** Setting `writable: false` explicitly locks this SPECIFIC property against reassignment — more precise than `Object.freeze()`, which locks the ENTIRE object at once.

**Key Points:**

- `Object.defineProperty()` gives fine-grained, per-property control, unlike `Object.freeze()`'s all-or-nothing approach.
- `enumerable: false` is a common technique for "hidden" properties that still exist but don't show up in normal iteration.
- This level of control is used more by library/framework authors than in everyday application code, but understanding it clarifies how `freeze`/`seal` work underneath.

### Topic 3: Getters in depth

Theory:
A getter defines a property that LOOKS like a plain value when accessed, but is actually computed by a function each time it's read.

Code Example:

```js
const rectangle = {
  width: 10,
  height: 5,
  get area() {
    return this.width * this.height;
  },
};

console.log(rectangle.area); // 50 - accessed like a property, not called like a function
rectangle.width = 20;
console.log(rectangle.area); // 100 - recalculated automatically on each access
```

**Explanation:** `area` is accessed WITHOUT parentheses (`rectangle.area`, not `rectangle.area()`), yet it's actually running a function each time — recalculating based on the current `width`/`height`.

**Key Points:**

- Getters are accessed like plain properties, with no parentheses.
- They recompute their value fresh every time they're accessed — always in sync with the object's current state.
- Great for derived/computed values that shouldn't need manual updating.

### Topic 4: Setters in depth

Theory:
A setter defines a property that LOOKS like a plain assignment, but is actually running a function with the assigned value — commonly used for validation.

Code Example:

```js
const account = {
  _balance: 0, // convention: leading underscore signals "internal" (not truly private)
  get balance() {
    return this._balance;
  },
  set balance(value) {
    if (value < 0) {
      console.log("Balance cannot be negative - ignoring update.");
      return;
    }
    this._balance = value;
  },
};

account.balance = 500; // uses the setter
account.balance = -100; // rejected by the setter's validation
console.log(account.balance); // 500
```

**Explanation:** `account.balance = 500` looks like a plain assignment, but actually runs the setter function, which validates the value before deciding whether to actually update `_balance`.

**Key Points:**

- Setters are assigned like plain properties, with no function-call syntax.
- The leading-underscore convention (`_balance`) signals "treat this as internal," though it's not truly private (unlike `#balance` in classes, Day 66).
- Getters and setters are commonly paired together, as shown here.

## Recap

- Every property has a hidden descriptor (`writable`, `enumerable`, `configurable`); `Object.defineProperty()` sets these precisely.
- Getters compute a value fresh on each access, while looking like a plain property.
- Setters run validation/logic on assignment, while looking like a plain assignment.

## What's Next

Practice for today: `public/coding/JavaScript/day-062-functional-programming-practice.md`. Day 63 wraps up Module 4 with a full revision and interview lab.
