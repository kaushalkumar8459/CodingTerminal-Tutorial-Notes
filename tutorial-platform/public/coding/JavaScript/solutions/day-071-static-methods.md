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
