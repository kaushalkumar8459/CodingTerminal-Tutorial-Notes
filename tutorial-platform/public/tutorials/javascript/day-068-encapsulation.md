---
title: Encapsulation
slug: day-068-encapsulation
dayLabel: Day 68
level: Intermediate
estimatedMinutes: 25
order: 68
track: javascript
---

# Day 68 [Intermediate]: Encapsulation

## Goal

Understand encapsulation as a full OOP principle — combining public properties, private fields, and getters/setters to protect an object's internal data.

## Prerequisites

- Day 66–67 (classes, private fields, getters/setters)

## Explanation

**Encapsulation** means bundling data together with the methods that operate on it, while restricting direct outside access to that data's internal details. The goal is to prevent external code from putting an object into an invalid state, and to hide implementation details that callers don't need to know about.

In practice, encapsulation in JavaScript classes usually means: keep sensitive/internal data **private** (`#field`), expose only the specific **public** properties/methods that outside code genuinely needs, and use **getters/setters** to control exactly how that data can be read or changed (including validation).

## Topic by Topic

### Topic 1: Public vs private properties

Theory:
Public properties are freely accessible from outside the class; private properties (`#field`) are restricted to the class's own internal code.

Code Example:

```js
class User {
  username; // public - accessible directly from outside
  #passwordHash; // private - only accessible inside the class

  constructor(username, passwordHash) {
    this.username = username;
    this.#passwordHash = passwordHash;
  }
}
```

**Explanation:** `username` is meant to be freely read (a public detail about the user), while `#passwordHash` is sensitive and should never be directly exposed — encapsulation is the deliberate choice of which is which.

**Key Points:**

- Deciding what's public vs private is a design decision, not just a technical one.
- Public: things outside code genuinely needs to read/use directly.
- Private: sensitive data, or internal implementation details that shouldn't be relied upon externally.

### Topic 2: Getters/setters for controlled access

Theory:
When outside code needs to READ or UPDATE private data, getters/setters provide a controlled, validated gateway — rather than making the data public directly.

Code Example:

```js
class Account {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  get balance() {
    return this.#balance;
  }

  set balance(newValue) {
    if (newValue < 0) {
      throw new Error("Balance cannot be negative");
    }
    this.#balance = newValue;
  }
}

const acc = new Account(500);
acc.balance = 700; // goes through the setter's validation
console.log(acc.balance); // 700 - goes through the getter
```

**Explanation:** From the outside, `acc.balance` looks like a plain property — but every read/write actually passes through validated getter/setter logic, protecting `#balance` from ever becoming invalid.

**Key Points:**

- Getters/setters let you expose a "safe" interface to otherwise-private data.
- Validation logic lives in ONE place (the setter), rather than being duplicated everywhere the data is updated.
- This combination is the standard, idiomatic way to encapsulate data in modern JavaScript classes.

### Topic 3: Data protection through method design

Theory:
Encapsulation also means designing methods so that an object's internal state can never become invalid, no matter how those methods are called.

Code Example:

```js
class ShoppingCart {
  #items = [];

  addItem(item) {
    if (!item.name || item.price < 0) {
      throw new Error("Invalid item");
    }
    this.#items.push(item);
  }

  getTotal() {
    return this.#items.reduce((sum, item) => sum + item.price, 0);
  }

  getItemCount() {
    return this.#items.length;
  }
}
```

**Explanation:** There's no way to add an invalid item to `#items` at all — every path to modifying the cart goes through `addItem()`'s validation, and `#items` itself can never be directly manipulated from outside.

**Key Points:**

- Good encapsulation means EVERY way of modifying an object's state goes through validated methods.
- Direct access to internal arrays/objects (even if technically public) undermines encapsulation — prefer exposing controlled methods instead.
- This design mindset prevents entire categories of bugs where an object ends up in an "impossible" invalid state.

### Topic 4: Why encapsulation matters in larger programs

Theory:
As programs grow, encapsulation limits how much of the codebase can affect a given piece of data — making bugs easier to trace and code easier to change safely.

Practical:
When debugging an object with an unexpected value, well-encapsulated code narrows your search to just that class's own methods — poorly encapsulated code (with directly mutable public data) could have been changed from literally anywhere in the program.

**Key Points:**

- Encapsulation reduces the "surface area" where bugs affecting an object's data could originate.
- It also makes future changes safer — you can change a private implementation detail without breaking code elsewhere that only depends on the public interface.
- This is one of the most practically valuable OOP principles for real, growing codebases.

## Recap

- Encapsulation bundles data with the methods that manage it, restricting direct outside access to internal details.
- Getters/setters provide controlled, validated access to otherwise-private data.
- Well-encapsulated methods ensure an object's internal state can never become invalid, regardless of how they're called.

## What's Next

Practice for today: `public/coding/JavaScript/day-068-inheritance.md`. Day 69 covers inheritance with `extends` and `super` in full depth.
