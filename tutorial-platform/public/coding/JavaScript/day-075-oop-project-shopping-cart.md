# Day 075 — OOP Project: Shopping Cart System

Matches Tutorial Day 75 (Map and Weak Collections). No limit on how far you extend this
project.

## Project: Shopping Cart System

Build a complete, standalone Shopping Cart System using classes:

1. `class Product` — `name`, `price`, `stock`; method `isAvailable()`.
2. `class CartItem` — wraps a `Product` with a `quantity`; method `getSubtotal()`.
3. `class Customer` — `name`, `email`; a `cart` property (a `ShoppingCart` instance).
4. `class ShoppingCart` — private `#items` (array of `CartItem`); methods `addItem()`,
   `removeItem()`, `getTotal()`, `applyDiscount(percent)`.
5. `class Order` — created from a `ShoppingCart` at checkout time; stores a snapshot of
   items, total, and a timestamp.

## Suggested build order

1. Build `Product` and `CartItem` first, test subtotal calculations.
2. Build `ShoppingCart` with add/remove/getTotal, using a `Map` keyed by product name
   or ID internally for `#items` (reusing today's `Map` tutorial).
3. Add discount logic to `getTotal()`.
4. Build `Customer` that owns a `ShoppingCart`.
5. Build `Order`, generated from a `Customer`'s cart at checkout, then clear the cart.

## Stretch goals (optional, no limit)

- Track stock levels on `Product`, reducing them when an order is placed, and
  preventing checkout if stock is insufficient.
- Add an order history array to `Customer`, storing every past `Order`.
- Add a `Set` to track unique product categories across the whole catalog.
- Add a coupon system (a `Map` of coupon codes to discount percentages).

## Interview-style questions

- Why might `ShoppingCart` use a `Map` (keyed by product ID) instead of a plain array
  for its internal items, especially for quickly updating quantities?
- What OOP principle does keeping `#items` private inside `ShoppingCart` demonstrate?

## Notes

- This project directly extends Day 73's OOP project — reuse and build on that code
  rather than starting completely from scratch if it makes sense.
- Focus on getting the core flow (add items → view total → checkout → order created)
  fully working before adding any stretch goals.

<!-- codingterminal-solution:start -->

# Day 075 — Solution: Shopping Cart System

```js
class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  isAvailable() {
    return this.stock > 0;
  }
}
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
  getSubtotal() {
    return this.product.price * this.quantity;
  }
}
class ShoppingCart {
  #items = new Map();
  #discount = 0;
  addItem(product, quantity = 1) {
    if (!product.isAvailable() || quantity <= 0 || quantity > product.stock)
      return false;
    const existing = this.#items.get(product.id);
    this.#items.set(
      product.id,
      existing
        ? new CartItem(product, existing.quantity + quantity)
        : new CartItem(product, quantity),
    );
    return true;
  }
  removeItem(productId) {
    return this.#items.delete(productId);
  }
  applyDiscount(percent) {
    this.#discount = Math.max(0, Math.min(100, percent));
  }
  getTotal() {
    const subtotal = [...this.#items.values()].reduce(
      (sum, item) => sum + item.getSubtotal(),
      0,
    );
    return subtotal * (1 - this.#discount / 100);
  }
  getItems() {
    return [...this.#items.values()];
  }
  clear() {
    this.#items.clear();
  }
}
class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.cart = new ShoppingCart();
    this.orderHistory = [];
  }
}
class Order {
  constructor(cart) {
    this.items = cart
      .getItems()
      .map((item) => new CartItem(item.product, item.quantity));
    this.total = cart.getTotal();
    this.timestamp = new Date();
  }
}

const book = new Product(1, "Book", 20, 10);
const customer = new Customer("Asha", "asha@example.com");
customer.cart.addItem(book, 2);
customer.cart.applyDiscount(10);
const order = new Order(customer.cart);
customer.orderHistory.push(order);
customer.cart.clear();
console.log(order.total);
```

## Interview-style questions

A Map makes updating a product quantity by ID direct instead of scanning an array. Private `#items` demonstrates encapsulation: callers use cart methods rather than changing internal state directly.

<!-- codingterminal-solution:end -->

