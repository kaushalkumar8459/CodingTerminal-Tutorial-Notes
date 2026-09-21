---
title: Built-in Object Methods
slug: day-043-built-in-object-methods
dayLabel: Day 43
level: Intermediate
estimatedMinutes: 25
order: 43
track: javascript
---

# Day 43 [Intermediate]: Built-in Object Methods

## Goal

Master `Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`, `Object.freeze()`, and `Object.seal()` — the standard toolkit for working with objects as data.

## Prerequisites

- Day 41–42 (objects fundamentals, advanced objects)
- Day 23 (`for...in`, for comparison)

## Explanation

These `Object.*` methods replace most manual `for...in` loops from Day 23 with cleaner, more capable tools. `Object.keys()`, `Object.values()`, and `Object.entries()` extract an object's data as real arrays — which means you immediately get access to `.map()`, `.filter()`, `.reduce()`, and every other array method on that data. `Object.assign()` copies/merges objects together. `Object.freeze()` and `Object.seal()` restrict how much an object can be changed after creation — useful for protecting important, unchanging data.

## Topic by Topic

### Topic 1: `Object.keys()`, `Object.values()`, `Object.entries()`

Theory:
These three extract an object's property names, values, or `[key, value]` pairs respectively, all as real arrays.

Code Example:

```js
const scores = { math: 90, science: 85, english: 78 };

console.log(Object.keys(scores)); // ["math", "science", "english"]
console.log(Object.values(scores)); // [90, 85, 78]
console.log(Object.entries(scores));
// [["math", 90], ["science", 85], ["english", 78]]
```

**Explanation:** Each method gives you a different "view" of the same object's data, always as an array — ready for `.map()`, `.filter()`, `.reduce()`, or `for...of`.

**Key Points:**

- `Object.keys()` = property names as an array.
- `Object.values()` = property values as an array.
- `Object.entries()` = `[key, value]` pairs as an array — great for combining with `.map()`/`.reduce()`.

### Topic 2: `Object.assign()` for copying and merging

Theory:
`Object.assign(target, ...sources)` copies properties from one or more source objects into a target object, returning the modified target.

Code Example:

```js
const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { fontSize: 18 };

const finalSettings = Object.assign({}, defaults, userPrefs);
console.log(finalSettings); // { theme: "light", fontSize: 18 }
```

**Explanation:** Starting with an empty object `{}` as the target avoids mutating `defaults`; later sources' properties override earlier ones for matching keys (`fontSize` ends up `18`, from `userPrefs`).

**Key Points:**

- `Object.assign({}, ...)` is a common pattern for merging without mutating the originals.
- Later arguments override earlier ones for matching property names.
- The spread operator (`{...defaults, ...userPrefs}`, Day 51) achieves the same result and is more common in modern code.

### Topic 3: `Object.freeze()` — preventing changes

Theory:
`Object.freeze()` prevents any changes to an object — no adding, updating, or deleting properties (silently fails in non-strict mode, throws in strict mode).

Code Example:

```js
const config = Object.freeze({ apiUrl: "https://api.example.com" });

config.apiUrl = "https://hacked.com"; // fails silently (or throws in strict mode)
console.log(config.apiUrl); // still "https://api.example.com"
```

**Explanation:** Once frozen, `config` can never be modified — attempts to change it are simply ignored (or throw an error in strict mode), protecting important constant data.

**Key Points:**

- `Object.freeze()` makes an object fully immutable — no property changes allowed.
- Useful for configuration objects or constants that must never be accidentally modified.
- Freezing is shallow — nested objects inside a frozen object are NOT automatically frozen too.

### Topic 4: `Object.seal()` — restricting structure but allowing updates

Theory:
`Object.seal()` prevents adding or removing properties, but still allows updating existing property values.

Code Example:

```js
const user = Object.seal({ name: "Tara", age: 25 });

user.age = 26; // allowed - updating an existing property
user.email = "t@x.com"; // ignored - adding a new property is blocked

console.log(user); // { name: "Tara", age: 26 } - no email added
```

**Explanation:** `Object.seal()` is less restrictive than `Object.freeze()` — it locks the object's _shape_ (no new/removed properties) while still allowing existing values to change.

**Key Points:**

- `Object.seal()` = structure locked, values still editable.
- `Object.freeze()` = structure locked AND values locked.
- Choose based on whether you need the values themselves to stay changeable.

## Recap

- `Object.keys/values/entries()` extract object data as real, method-rich arrays.
- `Object.assign()` copies/merges objects, commonly starting with an empty target to avoid mutation.
- `Object.freeze()` fully locks an object; `Object.seal()` locks structure but allows value updates.

## What's Next

Practice for today: `public/coding/JavaScript/day-043-spread-and-rest.md`. Day 44 covers destructuring in full depth.
