---
title: Constructor Functions Revisited
slug: day-065-constructor-functions-revisited
dayLabel: Day 65
level: Intermediate
estimatedMinutes: 25
order: 65
track: javascript
---

# Day 65 [Intermediate]: Constructor Functions Revisited

## Goal

Consolidate exactly how `new` and constructor functions work, as the direct bridge into `class` syntax tomorrow.

## Prerequisites

- Day 57 (constructor practice), Day 60-61 (prototypes)

## Explanation

Before `class` syntax existed, **constructor functions** (combined with the prototype system) were the standard way to create many similar objects. Understanding precisely what `new SomeFunction()` does is essential, because `class` (starting Day 66) is mostly a cleaner syntax for the exact same underlying mechanism.

When you call a function with `new`, four things happen automatically: (1) a brand-new empty object is created, (2) that object's prototype is linked to `Constructor.prototype`, (3) the constructor function runs with `this` set to that new object, and (4) the new object is returned automatically (unless the constructor explicitly returns a different object).

## Topic by Topic

### Topic 1: What `new` actually does, step by step

Theory:
`new Constructor(args)` performs four specific steps automatically, without you writing any of them explicitly.

Code Example:

```js
function User(name) {
  // Behind the scenes, before this line runs:
  // 1. A new empty object is created
  // 2. Its prototype is linked to User.prototype
  // 3. "this" is set to that new object
  this.name = name;
  // 4. The new object is returned automatically at the end
}

const u = new User("Ishaan");
console.log(u.name); // "Ishaan"
```

**Explanation:** None of the four steps are written explicitly in the function body — `new` handles them all automatically, which is why forgetting `new` breaks everything (there's no new object, no prototype link, and `this` falls back to whatever the normal calling rules from Day 58 dictate).

**Key Points:**

- `new` automatically creates the object, links its prototype, sets `this`, and returns it.
- Forgetting `new` when calling a constructor function skips all four steps — a classic, hard-to-spot bug.
- This automatic behavior is exactly what `class` syntax will handle even more safely (throwing an error if you forget `new`).

### Topic 2: Instance properties vs prototype methods

Theory:
Properties set with `this.property = value` inside the constructor become unique to each instance. Methods placed on `Constructor.prototype` are shared across all instances.

Code Example:

```js
function Product(name, price) {
  this.name = name; // instance property - unique per object
  this.price = price; // instance property - unique per object
}

Product.prototype.describe = function () {
  // shared across ALL instances
  return `${this.name}: $${this.price}`;
};
```

**Explanation:** Every `Product` instance gets its own `name`/`price`, but they all share the exact same `describe` function via the prototype — this is the memory-efficient pattern from Day 60-61.

**Key Points:**

- Instance properties (set via `this.x = ...`) are unique per object.
- Prototype methods are shared by all instances of that constructor.
- This division (unique data, shared behavior) is exactly what `class` syntax will express more clearly.

### Topic 3: Why this matters for `class` syntax tomorrow

Theory:
`class` syntax is largely "syntactic sugar" — a nicer way to write exactly this constructor-function-plus-prototype pattern, without changing the underlying mechanism.

Code Example:

```js
// This constructor-function pattern...
function Product(name, price) {
  this.name = name;
  this.price = price;
}
Product.prototype.describe = function () {
  return `${this.name}: $${this.price}`;
};

// ...is what "class Product { constructor(){} describe(){} }" does automatically tomorrow
```

**Explanation:** Recognizing this equivalence means `class` syntax won't feel like an entirely new concept tomorrow — it's the same mental model, with cleaner syntax and a few added safety features (like requiring `new`).

**Key Points:**

- `class` doesn't introduce a new mechanism — it's a cleaner syntax over constructor functions + prototypes.
- Understanding today's mechanics deeply makes `class` syntax feel familiar rather than "magic."
- This is also why debugging class-related issues sometimes benefits from thinking back to this underlying model.

### Topic 4: A complete constructor function example — Bank Account

Theory:
Bringing everything together: instance properties for account-specific data, prototype methods for shared behavior, matching the Day 53/57 bank account examples but now fully understood.

Code Example:

```js
function BankAccount(owner, balance) {
  this.owner = owner;
  this.balance = balance;
}

BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function (amount) {
  if (amount > this.balance) {
    console.log("Insufficient funds");
    return;
  }
  this.balance -= amount;
};

const account = new BankAccount("Nadia", 1000);
account.deposit(500);
console.log(account.balance); // 1500
```

**Explanation:** `owner`/`balance` are unique per account instance; `deposit`/`withdraw` are shared methods living once on the prototype — exactly the pattern `class BankAccount { }` will express tomorrow, just with different syntax.

**Key Points:**

- This complete example combines everything: `new`, instance properties, and prototype methods.
- Compare this directly against tomorrow's `class`-based version to see the syntax difference clearly.
- Getting this pattern solid now makes tomorrow's lesson mostly about learning new syntax for familiar ideas.

## Recap

- `new` automatically creates an object, links its prototype, sets `this`, and returns the object.
- Instance properties (`this.x = ...`) are unique per object; prototype methods are shared.
- `class` syntax (starting tomorrow) is a cleaner way to express this exact same pattern.

## What's Next

Practice for today: `public/coding/JavaScript/day-065-constructors-and-methods.md` — build a complete Bank Account System. Day 66 introduces `class` syntax formally.
