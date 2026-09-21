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
