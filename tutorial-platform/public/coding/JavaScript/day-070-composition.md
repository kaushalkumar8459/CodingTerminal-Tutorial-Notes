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

<!-- codingterminal-solution:start -->

# Day 070 — Solution: Composition

```js
class Address {
  constructor(street, city, postalCode) {
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
  }
}

class User {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
  shippingLabel() {
    return `${this.name}\n${this.address.street}\n${this.address.city}, ${this.address.postalCode}`;
  }
}

class Payment {
  constructor(method, amount) {
    this.method = method;
    this.amount = amount;
  }
}
class Order {
  constructor(user, items, payment) {
    this.user = user;
    this.items = items;
    this.payment = payment;
  }
  total() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }
}
class Notification {
  constructor(message) {
    this.message = message;
  }
  send() {
    console.log(this.message);
  }
}

const address = new Address("10 Main Street", "Pune", "411001");
const user = new User("Asha", address);
const items = [
  { name: "Book", price: 20, quantity: 2 },
  { name: "Pen", price: 5, quantity: 1 },
];
const payment = new Payment("card", 45);
const order = new Order(user, items, payment);
const notification = new Notification(
  `Order confirmed for ${order.user.name}: $${order.total()}`,
);
notification.send();
console.log(user.shippingLabel());

// Order has a Payment; it is not a type of Payment, so composition is the logical model.
```

**10.** A payment strategy could also be composed into an order instead of inherited. This is more flexible because an order can receive different payment objects without changing its class hierarchy.

## Interview-style questions

**11.** “Is-a” means inheritance, such as `Dog` is an `Animal`. “Has-a” means composition, such as `Order` has a `Payment`.

**12.** Composition combines independent pieces without creating deep, rigid parent-child chains, so behavior is easier to replace and reuse.

**13.** An Order is not a kind of Payment. It uses a Payment to complete its workflow, so inheritance would describe the relationship incorrectly.

<!-- codingterminal-solution:end -->

