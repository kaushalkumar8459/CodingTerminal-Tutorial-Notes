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
