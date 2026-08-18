---
title: Mini Project - Product Listing UI
slug: day-007-mini-project-product-listing-ui
dayLabel: Day 7
level: Intermediate
estimatedMinutes: 90
order: 7
track: react
---
# Day 7: Mini Project — Product Listing UI

## Goal
Build a complete data-driven product listing by combining components, props, arrays, `.map()`, stable keys, conditional rendering, callbacks, and basic component architecture.

## Prerequisites
- Days 4–6 completed
- JSX, components, props, arrays, `.map()`
- Basic event handling

## Project Requirements
Build a page with:
- Product data
- Reusable `ProductCard`
- Product list/grid
- Stock status
- Rating
- Category
- Add-to-cart callback
- Empty-list state
- Stable keys

## 1. Plan the Component Tree

```text
App
├── ProductPage
│   ├── PageHeader
│   └── ProductList
│       └── ProductCard × N
└── CartSummary
```

The goal is not to maximize component count. Each component should have a useful responsibility.

## 2. Product Data

```jsx
const products = [
  {
    id: 1,
    name: "Mechanical Keyboard",
    price: 4500,
    category: "Accessories",
    rating: 4.6,
    stock: 12,
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 3500,
    category: "Audio",
    rating: 4.4,
    stock: 0,
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 1800,
    category: "Accessories",
    rating: 4.2,
    stock: 8,
  },
];
```

Keep IDs stable. The ID is data identity; it should not be generated during rendering.

## 3. ProductCard

```jsx
function ProductCard({ product, onAddToCart }) {
  const { name, price, category, rating, stock } = product;

  return (
    <article className="product-card">
      <p>{category}</p>
      <h2>{name}</h2>
      <p>Rating: {rating}/5</p>
      <strong>₹{price}</strong>
      <p>{stock > 0 ? `${stock} available` : "Out of stock"}</p>
      <button
        disabled={stock === 0}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}
```

The card receives data and a callback. It does not own the product collection.

## 4. Rendering the Collection

```jsx
function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}
```

### Why `key={product.id}`?
Keys provide stable identity among siblings. They are for React's reconciliation and are not automatically available as `props.key` inside `ProductCard`.

## 5. Parent-Owned Cart Interaction

```jsx
function ProductPage() {
  function handleAddToCart(product) {
    console.log("Add:", product.id);
  }

  return (
    <ProductList
      products={products}
      onAddToCart={handleAddToCart}
    />
  );
}
```

The child reports the action; the owner decides what happens next. Day 8 will introduce state so the cart can actually change.

## 6. Complete App

```jsx
import { products } from "./data/products";
import ProductList from "./components/ProductList";

export default function App() {
  function handleAddToCart(product) {
    console.log(`Added ${product.name}`);
  }

  return (
    <main>
      <h1>Product Listing</h1>
      <ProductList
        products={products}
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}
```

## 7. Conditional UI
Stock is a good example:

```jsx
{stock > 0 ? "In Stock" : "Out of Stock"}
```

Disable actions that cannot be completed:

```jsx
<button disabled={stock === 0}>Add to Cart</button>
```

Do not merely hide unavailable information when the user needs to understand why an action cannot be performed.

## 8. Formatting and Derived UI
Keep display formatting separate from raw data where practical:

```jsx
const formattedPrice = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
}).format(price);
```

Avoid storing values such as `isOutOfStock` when they can be derived from `stock`.

## 9. Architecture
Recommended small-project structure:

```text
src/
├── components/
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── data/
│   └── products.js
└── App.jsx
```

This is a learning architecture, not a rule that every React application must follow.

## End-to-End Practical
1. Create the data array.
2. Extract `ProductCard`.
3. Extract `ProductList`.
4. Pass the collection through props.
5. Map with stable IDs.
6. Add stock condition.
7. Add callback prop.
8. Add empty-state rendering.
9. Add basic responsive styling.
10. Test at least five products and an empty array.

## Hands-on Challenges
### Challenge 1
Add `brand` and `discountPercent`.

### Challenge 2
Show the original price with a calculated discounted price.

### Challenge 3
Add a `category` label.

### Challenge 4
Make an out-of-stock product non-clickable.

### Challenge 5
Replace the static array with data returned by a local function that simulates an API. Keep `ProductCard` unchanged.

### Challenge 6
Create a `CartSummary` that receives the selected product IDs through props. Do not introduce state until Day 8.

## Common Mistakes
- Using array index as key when product identity can change.
- Generating random keys during render.
- Passing the entire application state into every card.
- Fetching data inside every `ProductCard`.
- Storing derived `isOutOfStock` state unnecessarily.
- Calling `onAddToCart(product)` during render instead of passing a callback.
- Forgetting an empty-state UI.

## Assessment Quiz
1. Why use `.map()`?
2. Why should product IDs be stable?
3. What is the role of `ProductCard`?
4. Why pass `onAddToCart` down?
5. Why shouldn't every card fetch products?
6. What happens when the products array is empty?
7. Why can derived values be calculated during render?
8. Why is the key not available as a normal prop?

## Interview Questions
**Q: Why use a stable key?** A: It gives sibling elements stable identity across renders so React can correctly reconcile changes.

**Q: Why not use random keys?** A: They change identity on every render and can cause unnecessary remounting.

**Q: Why keep ProductCard presentation-focused?** A: It makes the card reusable and independent of the collection's data source.

**Q: How would you integrate an API later?** A: Replace the data source while preserving the `ProductList`/`ProductCard` contract where possible.

**Q: Should `ProductCard` own cart state?** A: Usually no when the cart is shared application data. The appropriate owner should manage it and pass actions/data down.

## Acceptance Criteria
- [ ] 5+ products render from an array.
- [ ] ProductCard is reusable.
- [ ] ProductList owns collection rendering.
- [ ] Stable `id` keys are used.
- [ ] Props include an object and callback.
- [ ] Stock changes button availability.
- [ ] Empty state is implemented.
- [ ] No unnecessary derived state exists.
- [ ] No manual DOM manipulation is used.

## Self Check
Explain, without notes:
- component boundaries
- object props
- callback props
- `.map()` rendering
- stable keys
- conditional rendering
- why data ownership matters

## Day 7 Outcome
You have built a realistic data-driven UI and are ready to add changing application state in Day 8.