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
