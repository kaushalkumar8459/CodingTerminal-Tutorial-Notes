---
title: Mini Project - Search and Filter App
slug: day-035-mini-project-search-and-filter-app
dayLabel: Day 35
level: Intermediate
estimatedMinutes: 90
order: 35
track: react
---
# Day 35 [Intermediate]: Mini Project — Search and Filter App

## Goal

Build a complete search/filter experience that combines the previous lessons:

- state ownership
- controlled inputs
- derived data
- custom hooks
- `useMemo`
- stable callbacks where justified
- empty states
- URL synchronization
- accessibility
- performance reasoning

The goal is to build a clean application first and optimize only where optimization is justified.

## Prerequisites

- Days 31–34
- `useMemo`
- `useCallback`
- custom hooks
- array filtering/sorting
- URL query parameters

## 1. Feature Requirements

The finished app should support:

1. Search by product name
2. Filter by category
3. Filter by minimum price
4. Sort by price or name
5. Clear all filters
6. Show result count
7. Show a useful no-match state
8. Keep stable list keys
9. Optionally synchronize filters to the URL
10. Keep derived results out of state

## 2. Data Model

```js
{
  id: 1,
  name: "ThinkPad",
  category: "laptop",
  price: 1200
}
```

The product collection is source data. Search, category, minimum price, and sorting choices are UI state. The visible list is derived.

## 3. State Design

```jsx
const [query, setQuery] = useState("");
const [category, setCategory] = useState("all");
const [minPrice, setMinPrice] = useState(0);
const [sort, setSort] = useState("name-asc");
```

Do not store:

```jsx
const [visibleProducts, setVisibleProducts] = useState([]); // unnecessary derived state
```

Instead calculate it from source data and filter state.

## 4. Reusable Search Hook

```jsx
function useSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const clear = () => setQuery("");

  return { query, setQuery, clear };
}
```

The hook owns search behavior, not product filtering policy.

## 5. Pure Filter Function

Keep complicated filtering logic testable outside the component:

```jsx
function filterProducts(products, { query, category, minPrice }) {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = product.price >= minPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });
}
```

Pure functions are easier to test and reason about.

## 6. Memoizing Derived Results

```jsx
const visibleProducts = useMemo(() => {
  const filtered = filterProducts(products, {
    query,
    category,
    minPrice,
  });

  return [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
}, [products, query, category, minPrice, sort]);
```

`useMemo` is appropriate here only if the calculation is meaningfully expensive or stable result identity is useful. For a tiny list, plain calculation may be simpler.

## 7. Avoid Mutating the Source Array

Never do:

```jsx
products.sort(compare);
```

Use:

```jsx
[...products].sort(compare);
```

Sorting in place can mutate props or source data and create difficult bugs.

## 8. Filter Panel

Keep controls separate from result rendering:

```jsx
function FilterPanel({ category, minPrice, sort, onCategoryChange, onMinPriceChange, onSortChange, onClear }) {
  return (
    <section aria-label="Product filters">
      <label htmlFor="category">Category</label>
      <select id="category" value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="all">All</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
      </select>

      <label htmlFor="min-price">Minimum price</label>
      <input
        id="min-price"
        type="number"
        min="0"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
      />

      <label htmlFor="sort">Sort</label>
      <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="name-asc">Name A–Z</option>
        <option value="price-asc">Price low–high</option>
        <option value="price-desc">Price high–low</option>
      </select>

      <button type="button" onClick={onClear}>Clear filters</button>
    </section>
  );
}
```

When using this component, make sure the `minPrice` input updates the callback rather than accidentally referring to parent state directly. A corrected production implementation is shown below.

## 9. Complete End-to-End Implementation

```jsx
import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "iPhone", category: "mobile", price: 800 },
  { id: 2, name: "Galaxy", category: "mobile", price: 700 },
  { id: 3, name: "ThinkPad", category: "laptop", price: 1200 },
  { id: 4, name: "MacBook", category: "laptop", price: 1800 },
];

function useSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const clear = () => setQuery("");
  return { query, setQuery, clear };
}

function applyFilters(items, filters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      filters.category === "all" || item.category === filters.category;
    const matchesPrice = item.price >= filters.minPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return a.name.localeCompare(b.name);
    }
  });
}

function FilterPanel({ filters, onChange, onClear }) {
  return (
    <section aria-label="Product filters">
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={filters.category}
        onChange={(e) => onChange("category", e.target.value)}
      >
        <option value="all">All</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
      </select>

      <label htmlFor="min-price">Minimum price</label>
      <input
        id="min-price"
        type="number"
        min="0"
        value={filters.minPrice}
        onChange={(e) => onChange("minPrice", Number(e.target.value) || 0)}
      />

      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        value={filters.sort}
        onChange={(e) => onChange("sort", e.target.value)}
      >
        <option value="name-asc">Name A–Z</option>
        <option value="price-asc">Price low–high</option>
        <option value="price-desc">Price high–low</option>
      </select>

      <button type="button" onClick={onClear}>Clear filters</button>
    </section>
  );
}

function App() {
  const { query, setQuery, clear } = useSearch();
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [sort, setSort] = useState("name-asc");

  const filters = { query, category, minPrice, sort };

  const visibleProducts = useMemo(
    () => applyFilters(products, filters),
    [query, category, minPrice, sort]
  );

  function updateFilter(name, value) {
    if (name === "category") setCategory(value);
    if (name === "minPrice") setMinPrice(value);
    if (name === "sort") setSort(value);
  }

  function clearFilters() {
    clear();
    setCategory("all");
    setMinPrice(0);
    setSort("name-asc");
  }

  return (
    <main>
      <h1>Product Explorer</h1>

      <label htmlFor="search">Search products</label>
      <input
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
      />

      <FilterPanel
        filters={{ category, minPrice, sort }}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <p aria-live="polite">
        {visibleProducts.length} result{visibleProducts.length === 1 ? "" : "s"}
      </p>

      {visibleProducts.length === 0 ? (
        <section aria-live="polite">
          <p>No products match your current filters.</p>
          <button type="button" onClick={clearFilters}>Reset filters</button>
        </section>
      ) : (
        <ul>
          {visibleProducts.map((product) => (
            <li key={product.id}>
              {product.name} — {product.category} — ${product.price}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
```

## 10. URL-Synchronized Filters

URL state is useful when filters should be shareable and browser navigation should preserve them.

```jsx
const params = new URLSearchParams(window.location.search);
const initialQuery = params.get("q") ?? "";
const initialCategory = params.get("category") ?? "all";
```

When updating the URL, use `history.replaceState` or a router's search-param API as appropriate. Avoid directly changing the URL on every keystroke unless the UX calls for it; debouncing URL updates can reduce history/UI churn.

A robust URL design might be:

```text
/products?q=laptop&category=laptop&sort=price-asc
```

## 11. Client-Side vs Server-Side Filtering

This project assumes the full dataset is already available.

For a large production catalog:

```text
Client-side
small/medium dataset
      ↓
filter in memory

Server-side
large dataset
      ↓
query parameters → API → pagination
```

Do not download 500,000 products merely to filter them in the browser.

## 12. Search UX

Consider:

- clear button
- keyboard access
- visible result count
- no-match recovery
- preserving filter choices
- debounce when filtering triggers API requests
- not debouncing simple local filtering unless there is a measured reason

## 13. Performance Strategy

Start with:

1. correct state model
2. pure filtering function
3. stable keys
4. simple rendering

Then measure.

Use `useMemo` if the derived calculation is actually expensive or its stable reference benefits a memoized child.

Do not claim `useMemo` is necessary just because the list has many items. Profile the real workload.

## 14. Common Mistakes

### Mistake 1: Storing visible products in state

Creates synchronization problems.

### Mistake 2: Mutating products with `sort`

Can mutate props/source data.

### Mistake 3: Using array index as key

Use stable product IDs.

### Mistake 4: No empty state

A blank screen is ambiguous.

### Mistake 5: Making the filter hook know about products

Keep generic search behavior separate from domain-specific filtering.

### Mistake 6: Memoizing everything

Optimization must have a reason.

### Mistake 7: Debouncing local filtering by default

Debounce is more valuable when an action is expensive or network-bound. Simple local filtering may be better synchronously.

## Testing Checklist

### Search

- exact match
- partial match
- different casing
- whitespace
- clear

### Category

- each category
- all categories
- search + category combination

### Price

- zero
- boundary price
- no matching price

### Sort

- name ascending
- price ascending
- price descending

### Empty state

- no products initially
- no results after filtering
- reset returns to results

### Accessibility

- every control has a label
- buttons are keyboard accessible
- result count uses an appropriate live region
- focus behavior remains understandable

## Hands-on Labs

### Lab 1
Add a brand filter.

### Lab 2
Add rating sorting.

### Lab 3
Add a URL-synchronized filter state.

### Lab 4
Generate 10,000 products and measure filtering before deciding whether `useMemo` helps.

### Lab 5
Convert the client-side implementation to server-side query parameters with pagination.

## Assessment

1. Why is the visible list derived data?
2. Why should sorting use a copied array?
3. What is the benefit of a pure `applyFilters` function?
4. When is `useMemo` justified here?
5. When should filtering move to the server?
6. Why are stable IDs important?
7. Why should a no-match state offer recovery?
8. What makes URL filters useful?

## Interview Questions

**Q: Would you store filtered products in state?**  
Usually no. They can be derived from products and filter state.

**Q: How would you scale this to millions of records?**  
Move filtering, sorting, and pagination to the server and send filter state as query parameters.

**Q: Why use a pure filter function?**  
It separates business logic from rendering and makes the behavior easy to test.

**Q: Why can `useMemo` be unnecessary for a search list?**  
If the dataset is small and calculation is cheap, memoization overhead and complexity may exceed the benefit.

**Q: Where would you add debounce?**  
Usually when search input drives network requests or another expensive operation. For cheap local filtering, immediate updates are often preferable.

**Q: How would you preserve filters when sharing a URL?**  
Serialize the relevant filter state into URL search parameters and initialize state from those parameters.

## Final Project Requirements

Build a **Course Finder** with:

- title search
- level filter
- duration range
- sorting
- clear/reset
- result count
- empty state
- stable keys
- reusable `useSearch`
- pure filter utility
- justified `useMemo`
- optional URL synchronization

### Stretch Goals

- debounced server search
- pagination
- loading/error states
- saved filters
- analytics for search usage

## Self Check

- [ ] I can separate source state from derived results.
- [ ] I can compose search and filters without duplicated state.
- [ ] I can write pure filtering/sorting logic.
- [ ] I know when client-side filtering stops scaling.
- [ ] I can justify or reject `useMemo` based on evidence.
- [ ] I can design an accessible no-results experience.

## Day 35 Outcome

You have completed a realistic search/filter feature using the reusable logic and performance concepts from Days 31–34. The next stage can move from local component patterns into **shared application state with Context API**.