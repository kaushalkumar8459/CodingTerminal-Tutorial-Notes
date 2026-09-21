---
title: Map and Weak Collections
slug: day-075-map-and-weak-collections
dayLabel: Day 75
level: Intermediate
estimatedMinutes: 25
order: 75
track: javascript
---

# Day 75 [Intermediate]: `Map` and Weak Collections

## Goal

Fully understand `Map`, and know when/why `WeakMap`/`WeakSet` exist, building on the Day 73-74 practice.

## Prerequisites

- Day 73 (Map practice preview), Day 74 (WeakMap/WeakSet practice preview)

## Explanation

A `Map` is a built-in key-value collection, similar to a plain object, but with a few genuine advantages: **any type can be a key** (not just strings/symbols, as with objects), it **preserves insertion order** reliably, and it has a built-in `.size` property (no need for `Object.keys(obj).length`).

`WeakMap` and `WeakSet` are specialized versions where keys (WeakMap) or values (WeakSet) MUST be objects, and — crucially — those objects can still be garbage-collected (cleaned up from memory) if nothing else in the program references them, even while they're "in" the WeakMap/WeakSet. This makes them suited for attaching metadata to objects without accidentally keeping those objects alive forever.

## Topic by Topic

### Topic 1: `Map` vs plain objects

Theory:
`Map` and plain objects both store key-value pairs, but `Map` allows non-string keys and has more reliable iteration/size behavior.

Code Example:

```js
const objKey = { id: 1 };
const userRoles = new Map();
userRoles.set(objKey, "admin"); // the KEY is an actual object, not a string!
userRoles.set("guest-token-123", "guest");

console.log(userRoles.get(objKey)); // "admin"
console.log(userRoles.size); // 2
```

**Explanation:** A plain object would have converted `objKey` to the string `"[object Object]"` as a key — `Map` preserves it as the actual object reference, allowing genuinely distinct object keys.

**Key Points:**

- `Map` keys can be objects, functions, or any value — not just strings/symbols like plain objects.
- `.size` is always accurate and built-in, unlike `Object.keys(obj).length`.
- `Map` reliably preserves insertion order when iterated.

### Topic 2: When to choose `Map` over a plain object

Theory:
Choose `Map` when keys aren't naturally strings, when you need guaranteed insertion order, or when frequent additions/removals make `.size` convenient.

Code Example:

```js
// Good fit for Map: keys are IDs that could be numbers, and order matters
const cache = new Map();
cache.set(101, { name: "Product A" });
cache.set(102, { name: "Product B" });

// Good fit for plain object: simple, known, string-based config
const config = { theme: "dark", language: "en" };
```

**Explanation:** The cache benefits from `Map`'s consistent behavior with numeric-style keys and frequent updates; the config is simple and string-keyed, where a plain object is perfectly natural.

**Key Points:**

- `Map` isn't universally "better" — plain objects remain perfectly fine for simple, known-shape data.
- Choose based on key types needed and how dynamically the collection grows/shrinks.
- Both are valid, common tools — the choice depends on the specific situation.

### Topic 3: `WeakMap` for private, non-leaking metadata

Theory:
`WeakMap` associates metadata with an object WITHOUT preventing that object from being garbage-collected once nothing else references it.

Code Example:

```js
const privateData = new WeakMap();

class User {
  constructor(name) {
    privateData.set(this, { loginAttempts: 0 }); // metadata tied to this specific instance
    this.name = name;
  }
  recordFailedLogin() {
    const data = privateData.get(this);
    data.loginAttempts++;
  }
}
```

**Explanation:** `privateData` stores extra information tied to each `User` instance, without adding a visible property to the instance itself — and if a `User` instance is later discarded entirely, its entry in `privateData` can be cleaned up automatically too.

**Key Points:**

- `WeakMap` is genuinely used for advanced "hidden metadata" patterns like this.
- Since the introduction of `#privateField` (Day 66-67), this specific pattern is less commonly needed for basic privacy — but `WeakMap` remains useful for metadata not stored directly on the object.
- This is a more advanced, less frequently needed tool than `Map`/`Set` — good to recognize, not necessarily to use daily.

### Topic 4: `WeakSet` for tracking without leaking

Theory:
`WeakSet` tracks a collection of objects (e.g. "already processed") without preventing them from being garbage-collected.

Code Example:

```js
const processedItems = new WeakSet();

function processItem(item) {
  if (processedItems.has(item)) {
    console.log("Already processed, skipping");
    return;
  }
  processedItems.add(item);
  console.log("Processing:", item);
}
```

**Explanation:** `processedItems` tracks which specific object references have already gone through `processItem` — without keeping those objects alive in memory forever if they're otherwise no longer needed elsewhere in the program.

**Key Points:**

- `WeakSet` is useful for "have I seen this object before?" tracking, without memory leaks.
- Like `WeakMap`, it cannot be iterated and has no `.size` — a deliberate tradeoff for its memory behavior.
- This is a niche but genuinely useful tool for certain memory-conscious patterns (a preview of Day 106).

## Recap

- `Map` offers any-type keys, reliable order, and built-in `.size` — choose it over plain objects when those matter.
- `WeakMap`/`WeakSet` require object keys/values and allow garbage collection, useful for non-leaking metadata/tracking.
- Neither weak collection can be iterated or has a `.size` — a deliberate tradeoff for their memory behavior.

## What's Next

Practice for today: `public/coding/JavaScript/day-075-oop-project-shopping-cart.md` — the Shopping Cart System project. Day 76 wraps up Module 5 with a full revision.
