# Day 071 — Static Methods (User.validate/create, Product.search/sort)

Matches Tutorial Day 71 (Abstraction). No limit on how many you build.

## Basic

1. Add a `static validate(email)` method to `class User` that checks basic email
   validity (contains `@` and a `.`).
2. Add a `static createGuest()` factory method to `class User` that returns a new
   `User` instance with default guest values.
3. Add a `static search(products, term)` method to `class Product` that filters an
   array of `Product` instances by name.
4. Add a `static sortByPrice(products, direction = "asc")` method to `class Product`.
5. Call all of these static methods directly on the class (not on an instance), and
   confirm calling them on an instance throws an error.

## Concept

6. Add a `static fromJSON(jsonString)` method to `class User` that parses a JSON string
   and returns a new `User` instance built from it.
7. Add a `static count` property to `class Product` that tracks how many products have
   been created (increment it in the constructor).
8. Build a small "factory" pattern: a `static create(type, ...args)` method on a base
   class that returns different subclass instances depending on `type` (a light preview
   connecting back to polymorphism).
9. Compare a static `User.validate(email)` method to an INSTANCE method
   `user.isValidEmail()` — which makes more sense for checking a string BEFORE you've
   even created a `User` instance yet, and why?

## Interview-style questions

10. Why can't static methods access instance properties (like `this.name` set in the
    constructor) directly?
11. When would you choose a static method over an instance method for a given piece
    of class-related logic?
12. What's a "factory method," and why might `static create(...)` be useful compared
    to always using `new` directly?

## Notes

- Static methods are a great fit for validation, parsing, and "create an instance for
  me" factory-style logic — anything that's conceptually related to the class but
  doesn't need a specific existing instance to operate on.
- If you ever find yourself creating an instance JUST to call one method that doesn't
  use any instance data, that's usually a sign the method should be static instead.

<!-- codingterminal-solution:start -->

# Day 071 — Solution: Static Methods

```js
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  static validate(email) {
    return (
      typeof email === "string" && email.includes("@") && email.includes(".")
    );
  }
  static createGuest() {
    return new User("Guest", "guest@example.com");
  }
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.email);
  }
  isValidEmail() {
    return User.validate(this.email);
  }
}

class Product {
  static count = 0;
  constructor(name, price) {
    this.name = name;
    this.price = price;
    Product.count++;
  }
  static search(products, term) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase()),
    );
  }
  static sortByPrice(products, direction = "asc") {
    const sign = direction === "desc" ? -1 : 1;
    return [...products].sort((a, b) => (a.price - b.price) * sign);
  }
}

console.log(User.validate("a@example.com"));
const guest = User.createGuest();
const products = [new Product("Book", 20), new Product("Laptop", 1000)];
console.log(Product.search(products, "book"));
console.log(Product.sortByPrice(products, "desc"));
console.log(User.fromJSON('{"name":"Asha","email":"asha@example.com"}'));
// guest.validate is undefined because static methods belong to User, not instances.
```

**8. Factory pattern**

```js
class Notification {
  static create(type, message) {
    return type === "email"
      ? new EmailNotification(message)
      : new SmsNotification(message);
  }
}
class EmailNotification extends Notification {
  send() {
    return `Email: ${this.message}`;
  }
  constructor(message) {
    super();
    this.message = message;
  }
}
class SmsNotification extends Notification {
  send() {
    return `SMS: ${this.message}`;
  }
  constructor(message) {
    super();
    this.message = message;
  }
}
```

## Interview-style questions

**9.** `User.validate(email)` makes sense before a User exists because it needs only the string, not instance state.

**10.** A static method's `this` is the class, not a particular instance, so it cannot directly read instance properties.

**11.** Choose static methods for class-level utilities, validation, parsing, and factories; choose instance methods when behavior uses one object's state.

**12.** A factory method centralizes the decision about which concrete object to create and can hide construction details.

<!-- codingterminal-solution:end -->

