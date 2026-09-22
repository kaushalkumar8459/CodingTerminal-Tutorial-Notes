---
title: Primitive vs Reference Types
slug: day-050-primitive-vs-reference-types
dayLabel: Day 50
level: Intermediate
estimatedMinutes: 30
order: 50
track: javascript
---

# Day 50 [Intermediate]: Primitive vs Reference Types

## Goal

Deeply understand the difference between how primitive values and reference values (objects/arrays) are copied and compared — a common source of bugs if misunderstood.

## Prerequisites

- Day 5 (data types), Day 33/41 (arrays, objects)
- Day 44 (shallow vs deep copy, viewed from a different angle)

## Explanation

**Primitive values** (String, Number, Boolean, Undefined, Null, BigInt, Symbol) are copied **by value** — when you assign one variable to another, you get a completely independent copy. **Reference values** (objects, arrays, functions) are copied **by reference** — when you assign one variable to another, both variables point to the _same_ underlying object in memory; changing one affects the other.

This distinction explains many "why did my other variable change too?!" bugs, and is essential background for understanding closures (Day 57) and comparing objects correctly.

## Topic by Topic

### Topic 1: Primitives are copied by value

Theory:
Assigning a primitive value to a new variable creates a fully independent copy — changing one never affects the other.

Code Example:

```js
let a = 10;
let b = a; // b gets a COPY of a's value

b = 20;

console.log(a); // 10 - unaffected
console.log(b); // 20
```

**Explanation:** `b = a` copies the value `10` into `b` — from that point on, `a` and `b` are completely separate, unrelated values.

**Key Points:**

- Assigning a primitive always creates an independent copy.
- Changing one variable can never affect another primitive variable.
- This applies to all primitives: strings, numbers, booleans, etc.

### Topic 2: Objects/arrays are copied by reference

Theory:
Assigning an object or array to a new variable does NOT create a new object — both variables point to the exact same object in memory.

Code Example:

```js
let obj1 = { value: 10 };
let obj2 = obj1; // obj2 points to the SAME object as obj1

obj2.value = 20;

console.log(obj1.value); // 20 - CHANGED! Both point to the same object
console.log(obj2.value); // 20
```

**Explanation:** `obj2 = obj1` doesn't copy the object's contents — it copies the _reference_ (memory address) to the same object, so changes through either variable are visible through both.

**Key Points:**

- Assigning an object/array copies the _reference_, not the actual data.
- Changing the object through one variable is visible through every variable pointing to it.
- This is exactly why Day 44's spread/`structuredClone()` techniques exist — to create genuinely independent copies when needed.

### Topic 3: Comparing objects with `===`

Theory:
`===` compares objects by reference (memory identity), not by their contents — two separately created objects with identical properties are still considered "not equal."

Code Example:

```js
const p1 = { name: "Alex" };
const p2 = { name: "Alex" };
const p3 = p1;

console.log(p1 === p2); // false - different objects, even with same content
console.log(p1 === p3); // true - SAME object (same reference)
```

**Explanation:** `p1` and `p2` are two separate objects that happen to look identical; `p1 === p2` checks "are these literally the same object in memory," which they aren't. `p3` is a direct reference to `p1`, so that comparison is `true`.

**Key Points:**

- `===` on objects checks reference identity, not content equality.
- Two objects with identical properties are still `!==` unless they're literally the same reference.
- To compare object _contents_, you need a custom comparison function (built on Day 61) or a library — not `===`.

### Topic 4: Passing values to functions

Theory:
The same value-vs-reference rules apply when passing arguments into functions — primitives are passed as independent copies; objects/arrays are passed as shared references.

Code Example:

```js
function tryToChangeNumber(num) {
  num = 100; // only changes the LOCAL copy
}

function tryToChangeObject(obj) {
  obj.value = 100; // changes the SHARED object
}

let myNumber = 5;
let myObject = { value: 5 };

tryToChangeNumber(myNumber);
tryToChangeObject(myObject);

console.log(myNumber); // 5 - unaffected
console.log(myObject.value); // 100 - changed!
```

**Explanation:** `myNumber` is passed as a copy, so reassigning `num` inside the function has no effect outside it. `myObject` is passed by reference, so modifying its property inside the function is visible outside too.

**Key Points:**

- Primitives passed to functions are always independent copies — safe from modification.
- Objects/arrays passed to functions share the same underlying data — modifying properties affects the caller's original.
- Reassigning the parameter itself (`obj = {...}`) inside a function does NOT affect the caller's variable — only modifying properties _of_ the shared object does.

## Recap

- Primitives copy by value — fully independent; objects/arrays copy by reference — shared underlying data.
- `===` compares objects by reference identity, not by content.
- Passing objects/arrays to functions shares the same data; passing primitives creates safe, independent copies.

## What's Next

Practice for today: `public/coding/JavaScript/day-050-reference-vs-value.md`. Day 51 covers the spread operator in full depth.
