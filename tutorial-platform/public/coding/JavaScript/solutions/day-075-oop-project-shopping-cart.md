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
