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
Build a complete data-driven product listing by combining components, props, arrays, `.map()`, stable keys, conditional rendering, callbacks, derived values, and basic component architecture.

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
export const products = [
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
        type="button"
        disabled={stock === 0}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default ProductCard;
```

The card receives data and a callback. It does not own the product collection.

## 4. Rendering the Collection

```jsx
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <section aria-label="Products">
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

export default ProductList;
```

### Why `key={product.id}`?
Keys provide stable identity among siblings. They help React reconcile list changes and are not automatically available as `props.key` inside `ProductCard`. If the product is reordered, inserted, or removed, a stable identity helps React associate the correct item with the correct component instance.

## 5. Parent-Owned Cart Interaction

```jsx
import { products } from "./data/products";
import ProductList from "./components/ProductList";

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

export default ProductPage;
```

The child reports the action; the owner decides what happens next. Day 8 will introduce state so the cart can actually change.

## 6. Complete App

```jsx
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <main>
      <h1>Product Listing</h1>
      <ProductPage />
    </main>
  );
}
```

Keep the data and product-listing responsibility below `App` so the root component remains small.

## 7. Conditional UI

Stock is a good example:

```jsx
{stock > 0 ? "In Stock" : "Out of Stock"}
```

Disable actions that cannot be completed:

```jsx
<button type="button" disabled={stock === 0}>
  Add to Cart
</button>
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

Also avoid putting expensive or unrelated side effects into render. Derived display values should remain pure calculations.

## 9. Architecture

Recommended small-project structure:

```text
src/
├── components/
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── data/
│   └── products.js
├── pages/
│   └── ProductPage.jsx
└── App.jsx
```

This is a learning architecture, not a rule that every React application must follow.

## End-to-End Practical

1. Create the data array and export it from `data/products.js`.
2. Extract `ProductCard`.
3. Extract `ProductList`.
4. Extract `ProductPage`.
5. Pass the collection through props.
6. Map with stable IDs.
7. Add stock condition.
8. Add callback prop.
9. Add empty-state rendering.
10. Add basic responsive styling.
11. Test at least five products and an empty array.
12. Run a production build before considering the project complete.

## Hands-on Challenges

### Challenge 1
Add `brand` and `discountPercent`.

### Challenge 2
Show the original price with a calculated discounted price. Do not store the calculated price as duplicate source data.

### Challenge 3
Add a `category` label.

### Challenge 4
Make an out-of-stock product non-clickable and clearly communicate its unavailable state.

### Challenge 5
Replace the static array with data returned by a local function that simulates an API. Keep `ProductCard` unchanged.

### Challenge 6
Create a `CartSummary` that receives selected product IDs through props. Do not introduce state until Day 8.

### Challenge 7
Create an empty-state test by passing `[]` to `ProductList` and verify that no `ProductCard` is rendered.

## Common Mistakes

- Using array index as key when product identity can change.
- Generating random keys during render.
- Passing the entire application state into every card.
- Fetching data inside every `ProductCard`.
- Storing derived `isOutOfStock` state unnecessarily.
- Calling `onAddToCart(product)` during render instead of passing a callback.
- Forgetting an empty-state UI.
- Using unstable or duplicated product IDs.
- Treating `key` as if it were a normal component prop.

## Assessment Quiz

### 1. Why use `.map()`?

To transform each item in the collection into a React element while preserving the collection-driven rendering model.

### 2. Why should product IDs be stable?

They provide stable identity for list items and help React reconcile changes correctly.

### 3. What is the role of `ProductCard`?

To present one product and report user actions through its callback props without owning the whole product collection.

### 4. Why pass `onAddToCart` down?

It keeps the action's ownership in the parent while allowing the child to report the user's interaction.

### 5. Why shouldn't every card fetch products?

The card represents one product. Fetching the collection in every card duplicates data-access responsibility and can create unnecessary requests and coupling.

### 6. What happens when the products array is empty?

`ProductList` renders an explicit empty state instead of trying to map over a collection with no items.

### 7. Why can derived values be calculated during render?

Pure values such as `isOutOfStock` can be derived from current props without creating a second source of truth.

### 8. Why is the key not available as a normal prop?

`key` is a special React hint used for reconciliation rather than application data passed to the component.

### 9. Why should random keys be avoided?

A new random key changes the item's identity between renders and can cause unnecessary unmounting and remounting.

## Interview Questions

**Q: Why use a stable key?** A: It gives sibling elements stable identity across renders so React can correctly reconcile changes.

**Q: Why not use random keys?** A: They change identity on every render and can cause unnecessary remounting.

**Q: Why keep ProductCard presentation-focused?** A: It makes the card reusable and independent of the collection's data source.

**Q: How would you integrate an API later?** A: Replace the data source while preserving the `ProductList`/`ProductCard` contract where possible. Data fetching can be introduced at an appropriate owner rather than inside every card.

**Q: Should ProductCard own cart state?** A: Usually no when the cart is shared application data. The appropriate owner should manage it and pass actions/data down.

**Q: Can I use the array index as a key?** A: It can be acceptable for a truly static list that never changes order, is never filtered, and has no item-local state, but a stable data ID is preferable when item identity exists.

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
- [ ] Production build succeeds.

## Self Check

Explain, without notes:

- component boundaries
- object props
- callback props
- `.map()` rendering
- stable keys
- conditional rendering
- derived values
- why data ownership matters
- why `key` is special

## Day 7 Outcome

You have built a realistic data-driven UI and are ready to add changing application state in Day 8.