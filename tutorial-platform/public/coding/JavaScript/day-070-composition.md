# Day 070 — Composition (User, Address, Order, Payment, Notification)

Matches Tutorial Day 70 (Polymorphism). No limit on how many you build.

## Basic

1. Create a `class Address` with `street`, `city`, `postalCode`.
2. Create a `class User` that HAS an `Address` instance as a property (composition,
   not inheritance — `User` is not a "type of" `Address`).
3. Create a `class Payment` with `method` and `amount`.
4. Create a `class Order` that HAS an array of items AND a `Payment` instance.
5. Create a `class Notification` with a `message` and a `send()` method that just logs it.

## Concept

6. Build a complete flow: create a `User` (with an `Address`), create an `Order` for
   that user (with a `Payment`), then create a `Notification` confirming the order,
   using data pulled from the `Order`/`User` objects.
7. Add a method to `Order` that calculates its total from its items array.
8. Add a method to `User` that returns a formatted shipping label using its `Address`.
9. Explain, in a comment, why `Order` "has a" `Payment` (composition) rather than
   `Order` "is a" `Payment` (which would be inheritance, and wouldn't make sense here).
10. Refactor one of your earlier inheritance-based examples (from Day 68-69) into a
    composition-based one instead, if it makes more sense that way — decide and explain
    your reasoning.

## Interview-style questions

11. What's the difference between "is-a" (inheritance) and "has-a" (composition)
    relationships? Give one example of each from today's work.
12. Why might composition sometimes be preferred over inheritance for modeling
    real-world relationships?
13. Could `Order` have used inheritance from `Payment` instead of composition? Why
    would that not make logical sense?

## Notes

- The classic rule of thumb: use inheritance for "is-a" relationships (a `Dog` IS-A
  `Animal`), and composition for "has-a" relationships (an `Order` HAS-A `Payment`).
- Composition is generally considered more flexible in large systems — it avoids deep,
  rigid inheritance chains and lets you combine simpler pieces together freely.
