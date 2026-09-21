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
