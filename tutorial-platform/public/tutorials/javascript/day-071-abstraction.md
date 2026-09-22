---
title: Abstraction
slug: day-071-abstraction
dayLabel: Day 71
level: Intermediate
estimatedMinutes: 25
order: 71
track: javascript
---

# Day 71 [Intermediate]: Abstraction

## Goal

Understand abstraction — hiding complex implementation details behind a simple interface — as the final classic OOP principle, alongside encapsulation, inheritance, and polymorphism.

## Prerequisites

- Day 66–68 (classes, private fields, encapsulation)

## Explanation

**Abstraction** means exposing only what's necessary for something to be used, while hiding the complicated details of HOW it actually works internally. You've already been practicing abstraction throughout Module 5 — every time you called `.deposit(amount)` on a `BankAccount` without needing to know exactly how the balance is stored or validated internally, you were relying on abstraction.

The distinction from encapsulation (Day 68) is subtle: encapsulation is about _restricting access_ to internal data/methods; abstraction is about _designing a simple interface_ that hides complexity, regardless of whether that complexity is technically "private" or not. In practice, they work together — private fields/methods (encapsulation) are usually the TOOL used to achieve abstraction (a simple public interface).

## Topic by Topic

### Topic 1: Abstraction as "hiding complexity"

Theory:
A well-designed class lets callers use it without needing to understand its internal implementation at all — only its public interface matters to them.

Code Example:

```js
class EmailValidator {
  static isValid(email) {
    const hasAt = email.includes("@");
    const hasDot = email.includes(".");
    const noSpaces = !email.includes(" ");
    return hasAt && hasDot && noSpaces;
  }
}

console.log(EmailValidator.isValid("user@test.com")); // true
```

**Explanation:** A caller only needs to know `EmailValidator.isValid(email)` exists and returns a boolean — they don't need to know (or care) exactly HOW the validation logic works internally.

**Key Points:**

- A good abstraction hides "how" something works, exposing only "what" it does.
- Callers should be able to use a well-abstracted class/function without reading its internals.
- This makes the internal implementation free to change later, without breaking anything that uses it.

### Topic 2: Designing a reusable class around a simple interface

Theory:
When designing a class, start by asking "what's the simplest possible way someone should be able to use this?" — then build the (potentially complex) internals to support that simple interface.

Code Example:

```js
class ShoppingCart {
  #items = [];

  addItem(item) {
    /* complex validation internally */ this.#items.push(item);
  }
  removeItem(id) {
    /* complex search logic internally */
  }
  getTotal() {
    /* complex calculation with discounts/tax internally */ return 0;
  }
}

// A caller only ever needs to know these three methods exist:
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: "Pen", price: 20 });
console.log(cart.getTotal());
```

**Explanation:** No matter how complicated `getTotal()`'s internal calculation becomes (discounts, taxes, currency conversion), callers only ever interact with the same simple `getTotal()` call.

**Key Points:**

- Design the public interface first, based on how the class SHOULD be used.
- Internal complexity can grow over time without affecting how callers use the class.
- This "interface-first" thinking leads to more maintainable, abstraction-friendly designs.

### Topic 3: Abstraction vs encapsulation — the subtle difference

Theory:
Encapsulation restricts direct access to data (using `#field`); abstraction is the broader design goal of presenting a simple interface, which encapsulation typically helps achieve.

Code Example:

```js
class Timer {
  #startTime;

  start() {
    this.#startTime = Date.now(); // encapsulation: #startTime is private
  }

  getElapsedSeconds() {
    return (Date.now() - this.#startTime) / 1000; // abstraction: caller doesn't need to know about Date.now() math
  }
}
```

**Explanation:** `#startTime` being private is encapsulation; the fact that callers only ever need to call `.start()` and `.getElapsedSeconds()` (never touching timestamps directly) is abstraction — related, but conceptually distinct goals.

**Key Points:**

- Encapsulation = restricting access to internal data (a technical mechanism).
- Abstraction = designing a simple, usable interface (a design goal).
- In practice, private fields/methods are usually how you ACHIEVE good abstraction.

### Topic 4: Recognizing good abstraction in practice

Theory:
A good sign of solid abstraction: if you completely rewrote a class's internal implementation (using a totally different algorithm/data structure), code that USES the class wouldn't need to change at all.

Practical:
Review one of your earlier classes (BankAccount, ShoppingCart, etc.) and ask: could I change how it stores data internally without breaking any code that already uses it? If yes, you've built a solid abstraction.

**Key Points:**

- The true test of good abstraction is whether internal changes require no changes to the code using the class.
- This flexibility is extremely valuable in real, evolving codebases.
- Abstraction, alongside encapsulation, inheritance, and polymorphism, completes the four classic pillars of OOP.

## Recap

- Abstraction means exposing a simple interface while hiding complex implementation details.
- It's closely related to but distinct from encapsulation — encapsulation is the mechanism, abstraction is the design goal.
- Good abstraction means internal implementation can change freely without affecting code that uses the class.

## What's Next

Practice for today: `public/coding/JavaScript/day-071-static-methods.md`. Day 72 covers composition in more depth.
