---
title: OOP Introduction
slug: day-064-oop-introduction
dayLabel: Day 64
level: Intermediate
estimatedMinutes: 25
order: 64
track: javascript
---

# Day 64 [Intermediate]: OOP Introduction

## Goal

Understand what Object-Oriented Programming (OOP) actually is, how it differs from the procedural style used so far, and how to model real-world things as objects and classes.

## Prerequisites

- Module 4 (`this`, prototypes, closures)

## Explanation

**Object-Oriented Programming (OOP)** is a way of organizing code around **objects** — self-contained bundles of data (properties) and behavior (methods) that model real-world (or conceptual) "things," like a `User`, `Product`, or `BankAccount`. This contrasts with **procedural programming** (the style you've mostly used so far), where you write a sequence of functions that operate on separate data, without necessarily bundling the data and behavior together.

A **class** is a blueprint for creating objects that share the same structure and behavior — you've already seen a preview of this with constructor functions (Day 57/65) and prototypes (Day 58-61); Module 5 formalizes these ideas using JavaScript's `class` syntax and OOP principles (encapsulation, inheritance, polymorphism, abstraction).

## Topic by Topic

### Topic 1: What is OOP?

Theory:
OOP organizes a program around objects that combine related data and behavior, rather than treating data and functions as entirely separate concerns.

Code Example:

```js
// Procedural style - data and functions are separate
const user = { name: "Zara", age: 28 };
function describeUser(user) {
  return `${user.name} is ${user.age} years old`;
}

// OOP style - data and behavior bundled together
const userOOP = {
  name: "Zara",
  age: 28,
  describe() {
    return `${this.name} is ${this.age} years old`;
  },
};
```

**Explanation:** Both approaches produce the same result, but the OOP version bundles the `describe` behavior directly with the data it operates on — this becomes especially valuable once you have many related objects (many users) that all need the same behavior.

**Key Points:**

- OOP bundles related data and behavior into objects.
- Procedural code separates data and the functions that act on it.
- Neither style is "always better" — OOP shines especially when you have many similar, related objects.

### Topic 2: Procedural vs OOP — a direct comparison

Theory:
The same problem can be solved either way — comparing them directly clarifies when OOP's structure actually pays off.

Code Example:

```js
// Procedural: separate function for each "type" of calculation
function calculateRectangleArea(length, width) {
  return length * width;
}
function calculateCircleArea(radius) {
  return Math.PI * radius * radius;
}

// OOP: each shape "knows" how to calculate its own area
const rectangle = {
  length: 5,
  width: 4,
  area() {
    return this.length * this.width;
  },
};
const circle = {
  radius: 3,
  area() {
    return Math.PI * this.radius ** 2;
  },
};
```

**Explanation:** In the OOP version, calling `.area()` works the same way regardless of which specific shape you're dealing with — each object handles its own calculation internally, which becomes powerful once combined with inheritance and polymorphism (Days 69-70).

**Key Points:**

- OOP lets different objects respond to the same method call (`.area()`) in their own specific way.
- This consistency becomes especially valuable in larger programs with many related object types.
- Procedural code can become harder to manage as the number of "types" of data grows.

### Topic 3: Real-world modeling with objects

Theory:
OOP works well when your program's data naturally maps to "things" with both properties and behavior — like users, products, orders, or accounts.

Code Example:

```js
const product = {
  name: "Headphones",
  price: 2500,
  stock: 15,
  isAvailable() {
    return this.stock > 0;
  },
  sell(quantity) {
    if (quantity > this.stock) {
      console.log("Not enough stock");
      return;
    }
    this.stock -= quantity;
  },
};
```

**Explanation:** `product` models a real-world concept directly — its data (`price`, `stock`) and its behavior (`isAvailable`, `sell`) live together, making the object self-contained and easy to reason about.

**Key Points:**

- Good OOP design starts with identifying the real "things" your program deals with.
- Each object should own both its relevant data and the behavior that acts on that data.
- This modeling approach becomes the foundation for the `class` syntax starting Day 66.

### Topic 4: Classes as blueprints (preview)

Theory:
A class defines a reusable blueprint for creating many similar objects — instead of writing out `product1`, `product2`, `product3` manually, a class lets you generate as many as needed consistently.

Code Example:

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const p1 = new Product("Pen", 20);
const p2 = new Product("Notebook", 60);
```

**Explanation:** This looks similar to the constructor functions from Day 57, because `class` is largely a cleaner syntax built on the same prototype mechanism you already learned in Module 4 — full details start tomorrow.

**Key Points:**

- Classes are blueprints — they define structure/behavior once, used to create many consistent instances.
- `class` syntax builds directly on prototypes, which you already understand from Module 4.
- Module 5 will show you the modern, preferred way to write what constructor functions did manually.

## Recap

- OOP bundles related data and behavior into objects; procedural code keeps them separate.
- OOP is especially useful when your program has many similar "things" (users, products, etc.).
- Classes are blueprints for creating many consistent objects — building on the prototype foundation from Module 4.

## What's Next

Practice for today: `public/coding/JavaScript/day-064-classes.md`. Day 65 revisits constructor functions in more depth, as a bridge into `class` syntax.
