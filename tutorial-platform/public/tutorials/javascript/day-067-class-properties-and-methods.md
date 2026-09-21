---
title: Class Properties and Methods
slug: day-067-class-properties-and-methods
dayLabel: Day 67
level: Intermediate
estimatedMinutes: 30
order: 67
track: javascript
---

# Day 67 [Intermediate]: Class Properties and Methods

## Goal

Learn instance vs static properties/methods, and private fields (`#field`) formally, building on yesterday's brief introduction.

## Prerequisites

- Day 66 (classes, private fields preview)

## Explanation

**Instance properties/methods** belong to individual objects created from a class — each instance can have its own values, and calls to instance methods operate on "this specific instance." **Static properties/methods** belong to the CLASS itself, not to any individual instance — useful for utility functions related to the class concept, but that don't need a specific instance to operate on (like `User.validateEmail(email)`).

**Private fields** (`#fieldName`) are only accessible from within the class's own methods — genuinely enforced by JavaScript, not just a naming convention. This is the direct modern replacement for the closure-based privacy pattern from Day 53/57.

## Topic by Topic

### Topic 1: Instance properties and methods (recap)

Theory:
Properties set in the constructor via `this.x = ...` and methods defined in the class body both operate on a SPECIFIC instance.

Code Example:

```js
class Product {
  constructor(name, price) {
    this.name = name; // instance property
    this.price = price;
  }

  describe() {
    // instance method
    return `${this.name}: $${this.price}`;
  }
}
```

**Explanation:** Every `Product` instance has its own `name`/`price`, and `describe()` always refers to whichever specific instance called it — this is the standard, most common part of a class.

**Key Points:**

- Instance properties/methods are the default, most commonly used class members.
- They always operate in the context of "this particular instance."
- This is exactly what you've already been building since Day 64.

### Topic 2: Static properties and methods

Theory:
`static` properties/methods belong to the class itself, not to any instance — called as `ClassName.method()`, never `instance.method()`.

Code Example:

```js
class MathHelper {
  static PI_APPROX = 3.14159;

  static square(n) {
    return n * n;
  }
}

console.log(MathHelper.PI_APPROX); // 3.14159
console.log(MathHelper.square(5)); // 25

const helper = new MathHelper();
// helper.square(5); // Error! static methods aren't available on instances
```

**Explanation:** `square` is called directly on the class (`MathHelper.square(5)`), never on an instance — static members exist "on the class," not on objects created from it.

**Key Points:**

- Static members are accessed via the class name, never via an instance.
- Great for utility functions/constants conceptually related to the class, but not tied to any specific instance's data.
- Common real-world static methods: validation helpers, factory methods (`User.createGuest()`), constants.

### Topic 3: Private fields (`#field`) in depth

Theory:
Fields prefixed with `#` are only accessible from within the class's own methods — attempting access from outside throws an error, not just returning `undefined`.

Code Example:

```js
class BankAccount {
  #balance; // private field declaration

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  getBalance() {
    return this.#balance; // accessible here - inside the class
  }
}

const account = new BankAccount(1000);
console.log(account.getBalance()); // 1000
// console.log(account.#balance); // SyntaxError! Cannot access outside the class
```

**Explanation:** `#balance` can only ever be read/written from inside `BankAccount`'s own methods — there's no way around this restriction from outside code, unlike the `_balance` convention from Day 62.

**Key Points:**

- `#field` must be declared (even without a value) somewhere in the class body, or set in the constructor.
- Access from outside the class is a hard SyntaxError, not just `undefined`.
- This is the modern, standard way to achieve real encapsulation in JavaScript classes.

### Topic 4: Private methods

Theory:
Methods can also be made private with `#`, restricting them to internal use within the class — useful for breaking up complex logic without exposing implementation details.

Code Example:

```js
class Order {
  #items = [];

  addItem(item) {
    this.#validateItem(item); // calling a private method internally
    this.#items.push(item);
  }

  #validateItem(item) {
    // private method - not callable from outside
    if (!item.name || item.price <= 0) {
      throw new Error("Invalid item");
    }
  }
}
```

**Explanation:** `#validateItem` is an internal implementation detail — callers of `Order` only need to know about `addItem()`; they never need to (or can) call `#validateItem` directly themselves.

**Key Points:**

- Private methods work exactly like private fields — accessible only from within the class.
- Useful for breaking complex public methods into smaller, internal helper steps.
- This keeps a class's public "interface" (what callers actually use) clean and minimal.

## Recap

- Instance members belong to individual objects; static members belong to the class itself, accessed via the class name.
- Private fields (`#field`) and private methods (`#method`) are only accessible from within the class's own code.
- This combination (instance/static/private) gives you fine control over what a class exposes vs keeps internal.

## What's Next

Practice for today: `public/coding/JavaScript/day-067-getters-and-setters-employee-system.md`. Day 68 covers encapsulation as a full OOP principle.
