---
title: Advanced Objects
slug: day-042-advanced-objects
dayLabel: Day 42
level: Intermediate
estimatedMinutes: 25
order: 42
track: javascript
---

# Day 42 [Intermediate]: Advanced Objects

## Goal

Learn nested objects, dynamic/computed property names, and modern shorthand syntax for cleaner object creation.

## Prerequisites

- Day 41 (objects fundamentals)

## Explanation

Objects can contain other objects as property values — this is how you represent more realistic, structured data, like a user with a nested `address` object. **Dynamic (computed) properties** let you use a variable's value as a property _name_, rather than typing it literally — useful when the property name isn't known until the code runs. **Property shorthand** and **method shorthand** are small but very common syntax improvements that reduce repetition when creating objects.

## Topic by Topic

### Topic 1: Nested objects

Theory:
A property's value can itself be an object, letting you group related data hierarchically.

Code Example:

```js
const user = {
  name: "Meera",
  address: {
    city: "Bengaluru",
    pincode: "560001",
  },
};

console.log(user.address.city); // "Bengaluru"
```

**Explanation:** `user.address` is itself an object, so accessing `.city` requires chaining a second dot — this mirrors the nested array indexing pattern from Day 33.

**Key Points:**

- Nested objects model real-world hierarchical data naturally.
- Access nested properties by chaining dots (or brackets): `user.address.city`.
- Optional chaining (`user.address?.city`, from Day 9) helps safely access nested data that might be missing.

### Topic 2: Computed (dynamic) property names

Theory:
Wrapping an expression in `[ ]` when defining an object lets you use a variable's value as the property name, computed at creation time.

Code Example:

```js
const key = "score";
const value = 95;

const result = {
  [key]: value, // computed property name - becomes "score: 95"
};

console.log(result); // { score: 95 }
```

**Explanation:** Without the brackets, `key: value` would create a literal property named `"key"` — the brackets tell JavaScript "use the _value_ of this variable as the property name instead."

**Key Points:**

- `[expression]: value` computes the property name from an expression at object-creation time.
- Extremely useful when building objects dynamically, like grouping data by a variable category.
- Without brackets, JavaScript treats the identifier as a literal property name, not a variable reference.

### Topic 3: Property shorthand

Theory:
When a variable's name matches the property name you want, you can skip repeating it.

Code Example:

```js
const name = "Kabir";
const age = 28;

// Old way
const person1 = { name: name, age: age };

// Shorthand
const person2 = { name, age };

console.log(person2); // { name: "Kabir", age: 28 } - same result
```

**Explanation:** `{ name, age }` is shorthand for `{ name: name, age: age }` — JavaScript infers the property name from the variable name automatically.

**Key Points:**

- Property shorthand only works when the variable name and desired property name match exactly.
- It's purely a convenience — the resulting object is identical either way.
- Extremely common in modern JavaScript, especially when building objects from function parameters.

### Topic 4: Method shorthand

Theory:
Object methods can be written without the `function` keyword, using a shorter syntax.

Code Example:

```js
const calculator = {
  // Old way
  add: function (a, b) {
    return a + b;
  },
  // Shorthand
  subtract(a, b) {
    return a - b;
  },
};

console.log(calculator.add(5, 3)); // 8
console.log(calculator.subtract(5, 3)); // 2
```

**Explanation:** `subtract(a, b) { ... }` is shorthand for `subtract: function(a, b) { ... }` — both create identical methods, just with less typing.

**Key Points:**

- Method shorthand drops both the `:` and the `function` keyword.
- Purely stylistic — behaves the same as the full `function` syntax for regular methods.
- You'll see this shorthand used constantly in real-world JavaScript code.

## Recap

- Nested objects model hierarchical data; access with chained dots or optional chaining.
- Computed properties (`[expression]: value`) let a variable determine the property name.
- Property and method shorthand reduce repetition when creating objects.

## What's Next

Practice for today: `public/coding/JavaScript/day-042-destructuring.md`. Day 43 covers built-in object methods — `Object.keys/values/entries/assign/freeze/seal`.
