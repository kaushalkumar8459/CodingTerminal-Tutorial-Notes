---
title: Destructuring In Depth
slug: day-044-destructuring-in-depth
dayLabel: Day 44
level: Intermediate
estimatedMinutes: 30
order: 44
track: javascript
---

# Day 44 [Intermediate]: Destructuring In Depth

## Goal

Master array and object destructuring fully — including nested destructuring, default values, and destructuring directly in function parameters.

## Prerequisites

- Day 42 (intro to destructuring in advanced objects)
- Day 33, 41 (arrays, objects)

## Explanation

**Destructuring** is a shorthand for pulling values out of arrays or objects into separate variables, without writing repetitive `array[0]` or `object.property` access. **Array destructuring** matches by position; **object destructuring** matches by property name — this distinction is the key to understanding how each works.

Destructuring also supports **default values** (for when a value might be missing) and can reach into **nested** structures directly. It's especially powerful when used directly in **function parameters**, letting a function "unpack" an object argument immediately.

## Topic by Topic

### Topic 1: Array destructuring

Theory:
Array destructuring pulls values out **by position** — the order of variables on the left matches the order of values in the array.

Code Example:

```js
const colors = ["red", "green", "blue"];
const [first, second, third] = colors;

console.log(first); // "red"
console.log(second); // "green"
```

**Explanation:** `first`, `second`, and `third` are assigned based on their _position_, matching index 0, 1, 2 of the array — not by any name matching.

**Key Points:**

- Array destructuring is positional — variable names don't need to match anything in the array.
- Skip elements using empty commas: `const [first, , third] = colors`.
- Combine with rest (`const [first, ...rest] = colors`) to capture remaining elements.

### Topic 2: Object destructuring

Theory:
Object destructuring pulls values out **by property name** — the variable names must match the object's actual property names (unless renamed).

Code Example:

```js
const user = { name: "Isha", age: 29, city: "Chennai" };
const { name, age } = user;

console.log(name); // "Isha"
console.log(age); // 29
```

**Explanation:** `name` and `age` are matched by their property name, not their order in the object — this is the key contrast with array destructuring.

**Key Points:**

- Object destructuring matches by property name, not position.
- Rename while destructuring: `const { name: userName } = user`.
- You can destructure only the properties you actually need — the rest of the object is simply ignored.

### Topic 3: Default values and nested destructuring

Theory:
A default value kicks in only if the property is `undefined`. Nested destructuring reaches directly into an inner object or array.

Code Example:

```js
const settings = { theme: "dark" };
const { theme, fontSize = 14 } = settings; // fontSize defaults since it's missing

console.log(fontSize); // 14

const user = { name: "Dev", address: { city: "Delhi" } };
const {
  address: { city },
} = user; // reach directly into the nested object

console.log(city); // "Delhi"
```

**Explanation:** `fontSize` isn't present in `settings`, so the default `14` is used instead; the nested destructuring pulls `city` directly out of `address` in one step, without a separate `user.address` line first.

**Key Points:**

- Default values only apply when the property is `undefined` — same rule as default function parameters.
- Nested destructuring mirrors the object's actual shape: `{ outer: { inner } }`.
- Combine defaults and nesting together when needed: `{ address: { city = "Unknown" } = {} }`.

### Topic 4: Destructuring in function parameters

Theory:
Destructuring directly in a function's parameter list is extremely common — it lets the function "unpack" an object argument immediately, without a separate line inside the body.

Code Example:

```js
function printUser({ name, age = 18 }) {
  console.log(`${name} is ${age} years old.`);
}

printUser({ name: "Zara" }); // Zara is 18 years old. (default used)
printUser({ name: "Om", age: 30 }); // Om is 30 years old.
```

**Explanation:** Instead of writing `function printUser(user) { const { name, age } = user; ... }`, destructuring the parameter directly saves a line and clearly documents exactly which properties the function expects.

**Key Points:**

- Destructuring function parameters clearly documents what shape of object a function expects.
- Combine with default values for optional properties, just like regular default parameters.
- This pattern is extremely common in real-world JavaScript and frameworks like React.

## Recap

- Array destructuring matches by position; object destructuring matches by property name.
- Default values apply when a property/element is `undefined`; nested destructuring reaches directly into inner structures.
- Destructuring function parameters is a common, clean way to "unpack" object arguments immediately.

## What's Next

Practice for today: `public/coding/JavaScript/day-044-shallow-vs-deep-copy.md`. Day 45 covers practical array/object patterns for real-world data.
