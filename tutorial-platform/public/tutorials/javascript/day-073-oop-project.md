---
title: OOP Project - Bank Account and Shopping Cart System
slug: day-073-oop-project
dayLabel: Day 73
level: Intermediate
estimatedMinutes: 40
order: 73
track: javascript
---

# Day 73 [Intermediate]: OOP Project — Bank Account / Shopping Cart System

## Goal

Bring together everything from Module 5 so far — classes, encapsulation, inheritance, polymorphism, and composition — into one complete OOP project.

## Prerequisites

- Day 64–72 (all of Module 5 so far)

## Explanation

Today's project is a combined **Bank Account and Shopping Cart System** that deliberately touches every OOP principle covered this module: classes with private fields (encapsulation), inheritance for different account/payment types, polymorphism for shared method calls across different types, and composition for building the shopping cart out of smaller pieces (items, payment, notifications).

## Topic by Topic

### Topic 1: The account hierarchy (inheritance + polymorphism)

Theory:
Model different account types as subclasses of a shared base, each with their own specific behavior for a shared method.

Code Example:

```js
class Account {
  #balance;
  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }
  get balance() {
    return this.#balance;
  }
  deposit(amount) {
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount > this.#balance) {
      console.log("Insufficient funds");
      return;
    }
    this.#balance -= amount;
  }
  calculateInterest() {
    return 0;
  } // meant to be overridden
}

class SavingsAccount extends Account {
  calculateInterest() {
    return this.balance * 0.04;
  }
}

class CurrentAccount extends Account {
  calculateInterest() {
    return 0;
  } // current accounts typically don't earn interest
}
```

**Explanation:** `SavingsAccount` and `CurrentAccount` both override `calculateInterest()` — polymorphism means code elsewhere can call `.calculateInterest()` on any `Account` subclass without checking which specific type it is.

**Key Points:**

- The base `Account` class encapsulates `#balance`, with controlled access via `deposit`/`withdraw`/getter.
- Subclasses override `calculateInterest()` for their own specific behavior — classic polymorphism.
- This structure directly reuses everything from Days 66-70.

### Topic 2: The shopping cart (composition)

Theory:
Build the shopping cart by composing smaller, focused pieces — items, a linked `Account` for payment, and a notification mechanism.

Code Example:

```js
class CartItem {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  getSubtotal() {
    return this.price * this.quantity;
  }
}

class ShoppingCart {
  #items = [];
  constructor(account) {
    this.account = account; // composition - cart HAS-A account for payment
  }
  addItem(item) {
    this.#items.push(item);
  }
  getTotal() {
    return this.#items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }
  checkout() {
    const total = this.getTotal();
    this.account.withdraw(total);
    console.log(
      `Checked out for ${total}. Remaining balance: ${this.account.balance}`,
    );
  }
}
```

**Explanation:** `ShoppingCart` composes `CartItem` instances and an `Account` instance together — it doesn't inherit from either, it simply USES them to accomplish checkout, exactly the composition pattern from Day 70-72.

**Key Points:**

- `ShoppingCart` HAS items and HAS an account — both composition relationships.
- `checkout()` combines cart logic with account logic via composition, not inheritance.
- Each piece (`CartItem`, `Account`, `ShoppingCart`) has one focused responsibility.

### Topic 3: Bringing it together — a full flow

Theory:
Combine the account hierarchy and shopping cart composition into one realistic end-to-end flow.

Code Example:

```js
const savings = new SavingsAccount("Tara", 5000);
const cart = new ShoppingCart(savings);

cart.addItem(new CartItem("Book", 300, 2));
cart.addItem(new CartItem("Pen", 20, 5));

console.log(cart.getTotal()); // 700
cart.checkout(); // withdraws 700 from savings, prints remaining balance
console.log(savings.calculateInterest()); // interest based on remaining balance
```

**Explanation:** This flow uses encapsulation (private balance, controlled via methods), inheritance/polymorphism (`SavingsAccount`'s specific interest calculation), and composition (cart containing items and an account) — all four OOP principles from Module 5, working together.

**Key Points:**

- Real systems combine multiple OOP principles together, not just one at a time.
- Building this kind of combined project is the best way to solidify understanding beyond isolated examples.
- Take time to trace through exactly which principle each piece of this code demonstrates.

### Topic 4: Extending the project further

Theory:
Once the core system works, extend it with additional realistic features to deepen your practice.

Practical:
Consider adding: a `CreditAccount` subclass with an overdraft limit, a `removeItem()` method on the cart, a discount system applied during checkout, or a simple purchase history tracked per account.

**Key Points:**

- Extending a working project is often more valuable practice than starting a new one from scratch.
- Each extension is an opportunity to apply a specific OOP principle deliberately.
- This project connects directly to the Day 75 Shopping Cart project and Day 76 Library Management System assessment.

## Recap

- The combined Bank Account/Shopping Cart project uses encapsulation, inheritance, polymorphism, and composition together.
- Account subclasses override `calculateInterest()` polymorphically; the cart composes items and an account.
- Building combined, realistic projects solidifies OOP principles far better than isolated examples alone.

## What's Next

Practice for today: `public/coding/JavaScript/day-073-map.md`. Day 74 covers advanced collections — `Set` in more depth.
