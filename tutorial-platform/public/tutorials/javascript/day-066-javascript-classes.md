---
title: JavaScript Classes
slug: day-066-javascript-classes
dayLabel: Day 66
level: Intermediate
estimatedMinutes: 30
order: 66
track: javascript
---

# Day 66 [Intermediate]: JavaScript Classes

## Goal

Learn `class` syntax formally — `class`, `constructor`, methods, and creating instances — as the modern, standard way to write what Day 65's constructor functions did manually.

## Prerequisites

- Day 64–65 (OOP intro, constructor functions revisited)

## Explanation

A `class` is JavaScript's modern syntax for defining a blueprint that creates objects with shared structure and behavior. Every class has a `constructor` method, which runs automatically when you create a new instance with `new` — this is where you typically set up instance properties. Any other methods you define directly in the class body automatically become shared methods on the class's prototype, exactly like Day 65's `Constructor.prototype.method = function(){}` pattern, just without needing to write `.prototype` explicitly.

## Topic by Topic

### Topic 1: Basic class syntax

Theory:
`class Name { constructor(params) { ... } method() { ... } }` defines a blueprint with a constructor and any number of methods.

Code Example:

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} <${this.email}>`;
  }
}

const user = new User("Meera", "meera@example.com");
console.log(user.getInfo()); // "Meera <meera@example.com>"
```

**Explanation:** `constructor` runs automatically when `new User(...)` is called, setting up `name`/`email` on the new instance; `getInfo` is defined directly in the class body, becoming a shared method just like a prototype method.

**Key Points:**

- `constructor` is a special method that runs automatically on `new ClassName(...)`.
- Other methods defined in the class body are automatically shared across all instances (they live on the prototype internally).
- `class` requires `new` to create instances — calling a class without `new` throws an error, unlike old-style constructor functions.

### Topic 2: Creating and using instances

Theory:
`new ClassName(args)` creates a new instance, running the constructor with those arguments — exactly like Day 65's constructor functions, just with cleaner syntax.

Code Example:

```js
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  applyDiscount(percent) {
    this.price = this.price - this.price * (percent / 100);
  }
}

const pen = new Product("Pen", 100);
pen.applyDiscount(10);
console.log(pen.price); // 90
```

**Explanation:** Each `new Product(...)` call creates a fully independent instance with its own `name`/`price`, while `applyDiscount` (a shared method) operates on whichever instance calls it, via `this`.

**Key Points:**

- Each instance has its own copy of properties set in the constructor.
- Methods are shared, but always operate on the specific instance calling them (`this`).
- This mirrors exactly what you built manually with constructor functions on Day 65.

### Topic 3: Classes verify their underlying prototype connection

Theory:
Under the hood, a class's methods really do live on `ClassName.prototype` — you can confirm this directly, proving the connection to everything learned in Module 4.

Code Example:

```js
class Animal {
  speak() {
    console.log("Some sound");
  }
}

const dog = new Animal();
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
console.log(typeof Animal.prototype.speak); // "function"
```

**Explanation:** Even though you never wrote `.prototype` anywhere in the class body, `speak` genuinely lives on `Animal.prototype` — confirming that `class` truly is built on the same prototype mechanism you already understand.

**Key Points:**

- Class methods really do live on the class's `.prototype`, even though the syntax hides this detail.
- This confirms `class` is "syntactic sugar" over the exact mechanism from Module 4, not a brand-new system.
- Understanding this connection makes debugging and understanding advanced class behavior much easier.

### Topic 4: Rebuilding the Bank Account with `class`

Theory:
Directly comparing yesterday's constructor-function Bank Account with today's `class` version highlights exactly what syntax improved.

Code Example:

```js
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds");
      return;
    }
    this.balance -= amount;
  }
}

const account = new BankAccount("Farid", 1000);
account.deposit(500);
console.log(account.balance); // 1500
```

**Explanation:** This is functionally identical to Day 65's version — same behavior, same underlying mechanism — but noticeably cleaner to read and write, with no explicit `.prototype` references needed.

**Key Points:**

- `class` syntax removes the need to write `Constructor.prototype.method = function(){}` repeatedly.
- The behavior and underlying mechanism are identical to constructor functions — only the syntax changed.
- From here forward, `class` is the standard, preferred way to write this pattern in modern JavaScript.

## Recap

- `class` defines a blueprint with a `constructor` and shared methods, requiring `new` to create instances.
- Class methods genuinely live on the class's prototype — confirmed by `Object.getPrototypeOf()`.
- `class` is cleaner syntax over the exact same constructor-function-plus-prototype mechanism from Module 4.

## What's Next

Practice for today: `public/coding/JavaScript/day-066-encapsulation.md` — private fields with `#`. Day 67 covers class properties and methods in more depth, including static members.
