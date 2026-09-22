---
title: Objects Fundamentals
slug: day-041-objects-fundamentals
dayLabel: Day 41
level: Beginner
estimatedMinutes: 25
order: 41
track: javascript
---

# Day 41 [Beginner]: Objects Fundamentals

## Goal

Understand how to create objects, access and modify their properties, and add methods (functions) to them.

## Prerequisites

- Day 5 (data types, brief object intro)
- Module 1–2 (functions, conditions)

## Explanation

An object groups related data together as **key-value pairs**, wrapped in curly braces `{ }`. Each key is a property name (usually a string), and each value can be anything — a number, string, array, another object, or even a function. When a property's value is a function, it's called a **method** — a behavior that belongs to that specific object.

You can access, update, and delete properties using either **dot notation** (`obj.property`) or **bracket notation** (`obj["property"]`) — bracket notation is required when the property name is stored in a variable or contains special characters.

## Topic by Topic

### Topic 1: Creating objects and accessing properties

Theory:
Objects are created with `{ key: value, ... }`. Properties are read using dot or bracket notation.

Code Example:

```js
const car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2023,
};

console.log(car.brand); // "Toyota" - dot notation
console.log(car["model"]); // "Corolla" - bracket notation
```

**Explanation:** Both notations read the same value — dot notation is more common when the property name is already known and valid as a plain identifier.

**Key Points:**

- Dot notation: `obj.property` — simple, most common.
- Bracket notation: `obj["property"]` — required for dynamic or unusual property names.
- Reading a non-existent property returns `undefined`, not an error.

### Topic 2: Updating and adding properties

Theory:
Assigning to a property that already exists updates it; assigning to a new property name adds it to the object.

Code Example:

```js
const car = { brand: "Toyota", year: 2023 };

car.year = 2024; // update existing property
car.color = "Blue"; // add a new property

console.log(car); // { brand: "Toyota", year: 2024, color: "Blue" }
```

**Explanation:** JavaScript doesn't require you to "declare" object properties in advance — assigning to any key either updates it (if it exists) or creates it (if it doesn't).

**Key Points:**

- Objects are mutable — properties can be freely added, updated, or removed after creation.
- No special syntax is needed to add a brand-new property — just assign to it.
- This flexibility is powerful, but also means typos in property names create new (unintended) properties silently.

### Topic 3: Deleting properties

Theory:
The `delete` keyword removes a property from an object entirely.

Code Example:

```js
const user = { name: "Priya", tempFlag: true };
delete user.tempFlag;

console.log(user); // { name: "Priya" } - tempFlag is completely gone
```

**Explanation:** After `delete`, `tempFlag` no longer exists on `user` at all — it's different from setting it to `undefined`, which would still leave the key present.

**Key Points:**

- `delete obj.property` removes the property entirely from the object.
- This differs from `obj.property = undefined`, which keeps the key but empties its value.
- `delete` is used far less often than adding/updating, but useful for cleanup tasks.

### Topic 4: Methods — functions inside objects

Theory:
When an object's property holds a function, calling it (`obj.methodName()`) is called invoking a **method** — the function "belongs" to that object.

Code Example:

```js
const person = {
  name: "Arjun",
  greet: function () {
    console.log("Hi, I'm " + this.name);
  },
};

person.greet(); // Hi, I'm Arjun
```

**Explanation:** Inside `greet`, `this` refers to the object the method was called on (`person`) — allowing the method to access the object's own data. We'll explore `this` in much more depth on Day 58.

**Key Points:**

- A method is simply a function stored as an object property.
- `this` inside a regular function method refers to the object it was called on.
- Methods let objects bundle both data and related behavior together.

## Recap

- Objects group key-value pairs; access/update with dot or bracket notation.
- `delete` removes a property entirely; assigning to a new key adds one.
- Methods are functions stored as object properties, using `this` to access the object's own data.

## What's Next

Practice for today: `public/coding/JavaScript/day-041-object-methods.md`. Day 42 covers more advanced object patterns — nested objects, computed properties, and shorthand syntax.
