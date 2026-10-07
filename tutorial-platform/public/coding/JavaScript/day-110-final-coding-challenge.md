# Day 110 — Final Coding Challenge: E-Commerce Management Application

Matches Tutorial Day 110 (Final JavaScript Project and Assessment). This is the capstone
project for the entire 110-day roadmap. No limit on how far you extend it beyond the
required features — this is a genuine portfolio piece.

## Required flow

```
Product List
    -> Search
    -> Filter
    -> Sort
    -> Product Details
    -> Add to Cart
    -> Update Quantity
    -> Remove Product
    -> Calculate Total
    -> Apply Coupon
    -> Checkout
    -> Order History
```

## Technical requirements checklist

Build this using PURE JavaScript (no framework), and make sure your final project
genuinely uses:

- [ ] Variables, functions, conditions, loops (Modules 1-2)
- [ ] Arrays, objects, destructuring, spread/rest, array methods (Module 3)
- [ ] Higher-order functions, closures, `this` handled correctly (Module 4)
- [ ] Classes, inheritance, encapsulation — at least a `Product` and `Cart` class (Module 5)
- [ ] Map and/or Set used somewhere meaningfully (e.g. cart keyed by product ID)
- [ ] Promises, async/await, fetch (or a simulated async data load) (Module 6)
- [ ] JSON (for Local Storage persistence)
- [ ] DOM manipulation and events, including event delegation (Module 7)
- [ ] Forms with validation (checkout form)
- [ ] Local Storage (order history persistence)
- [ ] ES Modules (organize your code across multiple files)
- [ ] Regex (at least one validation, e.g. email or coupon code format)
- [ ] Debounce (on the search input)
- [ ] Error handling throughout (try/catch, sensible fallbacks)

## Suggested milestones (check off as you complete each)

1. [ ] Product data + rendered product list
2. [ ] Search (debounced) + filter + sort working together
3. [ ] Product details view
4. [ ] `Cart` class with add/remove/update-quantity/get-total
5. [ ] Cart UI wired up with event delegation
6. [ ] Coupon code system
7. [ ] Checkout form with validation
8. [ ] Order saved to Local Storage on successful checkout
9. [ ] Order History view
10. [ ] Final polish: loading states, error handling, modular file organization

## Stretch goals (optional, no limit)

- Add product images and a simple image gallery per product.
- Add a wishlist feature (separate from the cart), persisted to Local Storage.
- Add pagination to the product list for larger catalogs.
- Add a simple admin view to add/edit/remove products (in-memory or Local Storage-backed).
- Add basic accessibility improvements (keyboard navigation, ARIA labels).

## Final reflection

- Review the full `javascript-roadmap.md` module map and rate your confidence (1-5)
  in each of the 7 modules honestly.
- Identify your weakest 2-3 areas and write down a plan for revisiting them.
- Congratulations on completing the full 110-day JavaScript roadmap — both tracks,
  tutorial and coding, are now complete end to end.

<!-- codingterminal-solution:start -->

# Day 110 — Solution: E-Commerce Management Application

The capstone is organized as a pure JavaScript module design: product data, cart state, API loading, UI rendering, and checkout are separate responsibilities.

**Product and Cart modules**

```js
export class Product {
  constructor(data) {
    Object.assign(this, data);
  }
}
export class Cart {
  #items = new Map();
  add(product, quantity = 1) {
    this.#items.set(product.id, {
      product,
      quantity: (this.#items.get(product.id)?.quantity || 0) + quantity,
    });
  }
  update(id, quantity) {
    if (quantity <= 0) this.#items.delete(id);
    else this.#items.get(id).quantity = quantity;
  }
  remove(id) {
    this.#items.delete(id);
  }
  get items() {
    return [...this.#items.values()];
  }
  getTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }
}
```

**Async loading and search**

```js
export async function loadProducts(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Product load failed: ${response.status}`);
  return (await response.json()).map((item) => new Product(item));
}
export function debounce(fn, delay) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
const search = debounce(
  (term) =>
    render(
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase()),
      ),
    ),
  300,
);
```

**DOM delegation, coupon, and checkout**

```js
const cart = new Cart();
const coupons = new Map([["SAVE10", 10]]);
function applyCoupon(code, total) {
  return total * (1 - (coupons.get(code) || 0) / 100);
}
document.querySelector("#cart").addEventListener("click", (event) => {
  const item = event.target.closest("[data-product-id]");
  if (!item) return;
  if (event.target.matches(".remove"))
    cart.remove(Number(item.dataset.productId));
  renderCart();
});
function checkout(form) {
  const data = Object.fromEntries(new FormData(form));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    throw new Error("Valid email required");
  const order = {
    id: crypto.randomUUID(),
    items: cart.items,
    total: applyCoupon(data.coupon, cart.getTotal()),
    customer: data,
    createdAt: new Date().toISOString(),
  };
  const history = JSON.parse(localStorage.getItem("orders") || "[]");
  localStorage.setItem("orders", JSON.stringify([order, ...history]));
  cart.items.forEach((item) => cart.remove(item.product.id));
  return order;
}
```

The complete flow is product loading, debounced search, category/price filtering, sorting, details, Map-backed cart updates, coupon calculation, validated checkout, and JSON-persisted order history. Error handling belongs around initial loading and checkout so the UI can show a fallback instead of crashing.

<!-- codingterminal-solution:end -->

