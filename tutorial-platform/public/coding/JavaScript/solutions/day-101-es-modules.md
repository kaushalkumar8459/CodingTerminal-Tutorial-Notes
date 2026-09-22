# Day 101 — Solution: ES Modules

**math.js**

```js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;
```

**user.js**

```js
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  describe() {
    return `${this.name} <${this.email}>`;
  }
}
```

**product.js**

```js
export const TAX_RATE = 0.18;
export default class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
```

**utils.js and app.js**

```js
function round(value) {
  return Math.round(value * 100) / 100;
}
export const formatCurrency = (value) => `$${round(value).toFixed(2)}`;
export const capitalize = (text) => text[0].toUpperCase() + text.slice(1);
export const slugify = (text) =>
  text.toLowerCase().trim().split(/\s+/).join("-");

import { add as sum, multiply } from "./math.js";
import User from "./user.js";
import Product, { TAX_RATE } from "./product.js";
import { formatCurrency, slugify } from "./utils.js";
const user = new User("Asha", "asha@example.com");
const product = new Product("JavaScript Book", 100);
console.log(
  user.describe(),
  slugify(product.name),
  formatCurrency(sum(product.price, multiply(product.price, TAX_RATE))),
);
```

The helper `round` is not exported, so `app.js` cannot import it. Circular imports can expose partially initialized bindings and create hard-to-follow initialization problems.

## Interview-style questions

**9.** Named exports use matching braces and may be renamed with `as`; a default export is imported without braces under any local name.

**10.** Modules provide boundaries, reusable APIs, clearer ownership, and isolated private implementation details.

**11.** It remains private to that module and cannot be accessed by another module through normal imports.
