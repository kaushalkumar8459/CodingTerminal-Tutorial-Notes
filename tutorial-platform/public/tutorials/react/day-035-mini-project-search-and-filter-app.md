---
title: Mini Project - Search and Filter App
slug: day-035-mini-project-search-and-filter-app
dayLabel: Day 35
level: Intermediate
estimatedMinutes: 150
order: 35
track: react
---
# Day 35 [Intermediate]: Mini Project — Search & Filter App

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Feature Requirements](#feature-requirements)
- [Architecture and Data Flow](#architecture-and-data-flow)
- [Data Model](#data-model)
- [State Design](#state-design)
- [Reusable Search Hook](#reusable-search-hook)
- [Pure Filtering and Sorting](#pure-filtering-and-sorting)
- [Memoizing Derived Results](#memoizing-derived-results)
- [Filter Panel](#filter-panel)
- [Complete End-to-End Implementation](#complete-end-to-end-implementation)
- [Empty and Loading States](#empty-and-loading-states)
- [URL-Synchronized Filters](#url-synchronized-filters)
- [Search UX and Accessibility](#search-ux-and-accessibility)
- [Client-Side vs Server-Side Filtering](#client-side-vs-server-side-filtering)
- [Performance Strategy](#performance-strategy)
- [Common Mistakes](#common-mistakes)
- [Testing Checklist](#testing-checklist)
- [Hands-on Labs](#hands-on-labs)
- [Debugging Lab](#debugging-lab)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Final Project Requirements](#final-project-requirements)
- [Production Acceptance Checklist](#production-acceptance-checklist)
- [Self Check](#self-check)
- [Day 35 Outcome](#day-35-outcome)

## Goal

Build a production-minded search and filter experience that combines the previous lessons:

- state ownership
- controlled inputs
- derived data
- pure functions
- custom Hooks
- `useMemo`
- `useCallback` where justified
- empty states
- URL synchronization
- accessibility
- testing
- performance reasoning

The goal is **correct architecture first, optimization second**.

## Prerequisites

- Days 31–34
- `useMemo`
- `useCallback`
- custom Hooks
- controlled components
- array filtering and sorting
- URL query parameters

## Learning Outcomes

By the end of this project you can:

- separate source state from derived results
- build reusable search behavior
- write pure filtering/sorting utilities
- avoid mutating source arrays
- design accessible filter controls
- implement reliable empty states
- synchronize shareable filters with a URL
- choose client-side vs server-side filtering
- justify or reject `useMemo` using measurement
- test filter combinations and boundaries
- reason about performance and scalability

## Feature Requirements

The finished app should support:

1. Search by product name
2. Filter by category
3. Filter by minimum price
4. Sort by price or name
5. Clear all filters
6. Show result count
7. Show a useful no-match state
8. Use stable list keys
9. Optionally synchronize filters to the URL
10. Keep derived results out of state
11. Keep filter logic deterministic and testable
12. Remain keyboard accessible

## Architecture and Data Flow

Use this mental model:

```text
                  Source products
                        │
                        ▼
              ┌───────────────────┐
              │ Filter UI state   │
              │ query/category/   │
              │ price/sort        │
              └─────────┬─────────┘
                        │
                        ▼
                Pure transformation
                        │
                        ▼
              Filter → Sort → Results
                        │
                        ▼
                       UI
```

Do not create a second state variable for the visible list.

## Data Model

```js
{
  id: 1,
  name: "ThinkPad",
  category: "laptop",
  price: 1200
}
```

The product collection is source data. Search, category, minimum price, and sorting choices are UI state. The visible list is derived data.

## State Design

```jsx
const [query, setQuery] = useState("");
const [category, setCategory] = useState("all");
const [minPrice, setMinPrice] = useState(0);
const [sort, setSort] = useState("name-asc");
```

Do not store:

```jsx
const [visibleProducts, setVisibleProducts] = useState([]);
```

That creates synchronization problems because `visibleProducts` can become stale when source data or filters change.

### State ownership rule

Keep state at the lowest common ancestor that needs to coordinate it. A filter panel should not secretly own filtering results, and the results list should not duplicate filter state.

## Reusable Search Hook

```jsx
function useSearch(initial = "") {
  const [query, setQuery] = useState(initial);

  const clear = useCallback(() => {
    setQuery("");
  }, []);

  return { query, setQuery, clear };
}
```

The Hook owns generic search-input behavior, not product-specific filtering policy.

Do not create a custom Hook merely to wrap one trivial `useState` unless the abstraction has a meaningful reuse or API benefit.

## Pure Filtering and Sorting

Keep domain-specific transformation logic outside the component:

```js
export function applyFilters(products, filters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(normalizedQuery);

    const matchesCategory =
      filters.category === "all" ||
      product.category === filters.category;

    const matchesPrice = product.price >= filters.minPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
      default:
        return a.name.localeCompare(b.name);
    }
  });
}
```

A pure function:

- does not mutate input
- does not depend on hidden component state
- returns the same logical result for the same inputs
- is easy to unit test

## Memoizing Derived Results

```jsx
const visibleProducts = useMemo(
  () => applyFilters(products, { query, category, minPrice, sort }),
  [products, query, category, minPrice, sort]
);
```

`useMemo` is **not automatically required**. For a small list, this may be simpler:

```jsx
const visibleProducts = applyFilters(products, {
  query,
  category,
  minPrice,
  sort,
});
```

Use `useMemo` when the calculation is meaningfully expensive or stable result identity provides a real downstream benefit. Measure realistic workloads before claiming an optimization.

## Avoid Mutating the Source Array

Never do:

```js
products.sort(compare);
```

because `sort()` mutates the array.

Prefer:

```js
[...products].sort(compare);
```

or another non-mutating approach.

## Filter Panel

Keep controls separate from result rendering.

```jsx
function FilterPanel({ filters, onChange, onClear }) {
  return (
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading">Filters</h2>

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={filters.category}
        onChange={(event) => onChange("category", event.target.value)}
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
        inputMode="numeric"
        value={filters.minPrice}
        onChange={(event) =>
          onChange("minPrice", Math.max(0, Number(event.target.value) || 0))
        }
      />

      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        value={filters.sort}
        onChange={(event) => onChange("sort", event.target.value)}
      >
        <option value="name-asc">Name A–Z</option>
        <option value="price-asc">Price low–high</option>
        <option value="price-desc">Price high–low</option>
      </select>

      <button type="button" onClick={onClear}>
        Clear filters
      </button>
    </section>
  );
}
```

Notice that the child does **not** reach into parent state. It emits changes through its callback contract.

## Complete End-to-End Implementation

```jsx
import { useCallback, useMemo, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "iPhone", category: "mobile", price: 800 },
  { id: 2, name: "Galaxy", category: "mobile", price: 700 },
  { id: 3, name: "ThinkPad", category: "laptop", price: 1200 },
  { id: 4, name: "MacBook", category: "laptop", price: 1800 },
];

function useSearch(initial = "") {
  const [query, setQuery] = useState(initial);
  const clear = useCallback(() => setQuery(""), []);
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
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
}

function FilterPanel({ filters, onChange, onClear }) {
  return (
    <section aria-labelledby="filter-heading">
      <h2 id="filter-heading">Filters</h2>

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={filters.category}
        onChange={(event) => onChange("category", event.target.value)}
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
        inputMode="numeric"
        value={filters.minPrice}
        onChange={(event) =>
          onChange("minPrice", Math.max(0, Number(event.target.value) || 0))
        }
      />

      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        value={filters.sort}
        onChange={(event) => onChange("sort", event.target.value)}
      >
        <option value="name-asc">Name A–Z</option>
        <option value="price-asc">Price low–high</option>
        <option value="price-desc">Price high–low</option>
      </select>

      <button type="button" onClick={onClear}>
        Clear filters
      </button>
    </section>
  );
}

export default function App() {
  const { query, setQuery, clear } = useSearch();
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [sort, setSort] = useState("name-asc");

  const visibleProducts = useMemo(
    () => applyFilters(PRODUCTS, { query, category, minPrice, sort }),
    [query, category, minPrice, sort]
  );

  const updateFilter = useCallback((name, value) => {
    if (name === "category") setCategory(value);
    if (name === "minPrice") setMinPrice(value);
    if (name === "sort") setSort(value);
  }, []);

  const clearFilters = useCallback(() => {
    clear();
    setCategory("all");
    setMinPrice(0);
    setSort("name-asc");
  }, [clear]);

  return (
    <main>
      <h1>Product Explorer</h1>

      <label htmlFor="search">Search products</label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name"
      />

      <FilterPanel
        filters={{ category, minPrice, sort }}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <p role="status" aria-live="polite">
        {visibleProducts.length} result{visibleProducts.length === 1 ? "" : "s"}
      </p>

      {visibleProducts.length === 0 ? (
        <section aria-labelledby="empty-heading">
          <h2 id="empty-heading">No products found</h2>
          <p>Try changing your search or filters.</p>
          <button type="button" onClick={clearFilters}>
            Reset filters
          </button>
        </section>
      ) : (
        <ul aria-label="Product results">
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
```

### Why `useCallback` appears here

`updateFilter` and `clearFilters` are memoized because they are passed to a child component and provide a stable callback contract. In a small app without a memoized child, ordinary functions may be simpler. The lesson should not imply that every event handler needs `useCallback`.

## Empty and Loading States

A local in-memory project may not need a loading state. If the data becomes asynchronous, explicitly model:

```text
idle → loading → success
              ↘ error
```

For an empty successful response, distinguish:

- **no data exists**
- **data exists but current filters match nothing**

A no-match state should provide recovery, such as clearing filters.

## URL-Synchronized Filters

URL synchronization is useful when filters should be shareable, bookmarkable, or preserved through navigation.

Example:

```text
/products?q=laptop&category=laptop&minPrice=1000&sort=price-asc
```

Read URL state through the router's search-param API when using a router. In a simple browser-only exercise, `URLSearchParams` can be used.

```js
const params = new URLSearchParams(window.location.search);
const initialQuery = params.get("q") ?? "";
const initialCategory = params.get("category") ?? "all";
```

When synchronizing changes, update the URL intentionally. Prefer `replaceState` for transient filter changes when creating browser history entries for every keystroke would be undesirable.

### URL rules

- validate values read from the URL
- provide defaults for missing values
- do not trust arbitrary category/sort values
- keep the URL representation stable
- consider debouncing URL writes for high-frequency search input
- preserve browser Back/Forward semantics intentionally

## Search UX and Accessibility

A production-quality search experience should consider:

- visible labels
- keyboard access
- logical tab order
- clear/reset control
- result count
- useful no-match recovery
- focus behavior after major state changes
- appropriate live-region announcements
- sufficient contrast and visible focus styles
- not relying on placeholder text as the only label

Use semantic controls instead of clickable `<div>` elements.

For a live result count, avoid excessively noisy announcements for every keystroke if the application becomes expensive or network-backed. Choose an appropriate announcement strategy.

## Client-Side vs Server-Side Filtering

This project assumes the full dataset is already available.

```text
Small/medium dataset
       ↓
Client-side filtering

Large dataset
       ↓
Query parameters → API → server filtering/sorting/pagination
```

Do not download hundreds of thousands of records just to filter them in the browser.

For server-side search, also consider:

- request cancellation
- stale-response protection
- loading/error/empty states
- pagination or infinite scrolling
- URL state
- retry behavior
- API validation

## Performance Strategy

Use this workflow:

1. Build the simplest correct version.
2. Measure realistic workloads.
3. Identify the actual bottleneck.
4. Apply the smallest useful optimization.
5. Measure again.
6. Keep the optimization only if it provides meaningful value.

Potential optimizations include:

- `useMemo` for expensive derived calculations
- `useCallback` when callback identity has a meaningful consumer
- `React.memo` at justified component boundaries
- virtualization for very large rendered lists
- server-side filtering for large datasets
- debouncing expensive/network search

Do not assume that 10,000 records automatically require memoization or virtualization. Test the real workload.

## Common Mistakes

### Mistake 1: Storing visible products in state

Creates duplicated derived state and synchronization bugs.

### Mistake 2: Mutating with `sort`

Mutates source data and can create hard-to-debug behavior.

### Mistake 3: Using array index as key

Use stable domain IDs.

### Mistake 4: No empty state

A blank result area is ambiguous.

### Mistake 5: Filter Hook knows the product domain

Keep generic search behavior separate from product-specific filtering.

### Mistake 6: Memoizing everything

Memoization has a cost. It needs a reason.

### Mistake 7: Debouncing cheap local filtering by default

Debounce is more useful for network calls or expensive work. Simple local filtering can normally update immediately.

### Mistake 8: Trusting URL parameters

URL values are external input. Validate them before using them as application state.

### Mistake 9: Creating history entries for every keystroke

Use deliberate URL update semantics.

### Mistake 10: Passing unstable objects to memoized children

A newly created object prop can invalidate memoization even when callbacks are stable.

## Testing Checklist

### Search

- [ ] exact match
- [ ] partial match
- [ ] different casing
- [ ] leading/trailing whitespace
- [ ] clear
- [ ] empty query

### Category

- [ ] each category
- [ ] all categories
- [ ] search + category combination

### Price

- [ ] zero
- [ ] exact boundary
- [ ] below boundary
- [ ] no matching price
- [ ] invalid/negative input is handled

### Sort

- [ ] name ascending
- [ ] price ascending
- [ ] price descending
- [ ] sorting does not mutate source data

### Empty state

- [ ] no products
- [ ] no results after filtering
- [ ] reset returns to results

### URL

- [ ] missing parameters use defaults
- [ ] invalid values are rejected/defaulted
- [ ] refresh preserves valid filters
- [ ] Back/Forward behavior is intentional

### Accessibility

- [ ] every control has an accessible label
- [ ] keyboard interaction works
- [ ] buttons use semantic `<button>` elements
- [ ] result count is announced appropriately
- [ ] focus remains understandable after reset

### Performance

- [ ] baseline measured
- [ ] realistic dataset tested
- [ ] optimization justified by evidence
- [ ] no unnecessary memoization

## Hands-on Labs

### Lab 1 — Brand Filter

Add a brand filter without duplicating visible-list state.

### Lab 2 — Rating Sort

Add rating sorting while keeping the transformation pure.

### Lab 3 — URL State

Synchronize all filters with URL search parameters and validate URL input.

### Lab 4 — Performance Experiment

Generate 10,000+ products. Measure filtering with and without `useMemo`. Explain the result rather than assuming the optimized version wins.

### Lab 5 — Server-Side Conversion

Move filtering, sorting, and pagination to API query parameters. Add loading, error, cancellation, and stale-response handling.

### Lab 6 — Accessible UX

Add a keyboard-accessible clear button and appropriate result announcements. Verify with keyboard-only navigation.

## Debugging Lab

### Bug A — Derived state drift

```jsx
const [visibleProducts, setVisibleProducts] = useState(products);
```

**Task:** Explain why this can become stale when filters change. Refactor it into derived data.

### Bug B — Mutating source data

```jsx
products.sort((a, b) => a.price - b.price);
```

**Task:** Explain the mutation and fix it without changing the source array.

### Bug C — Broken child contract

```jsx
function FilterPanel({ filters }) {
  return <input onChange={(e) => setMinPrice(e.target.value)} />;
}
```

**Task:** Explain why the child is reaching into parent-owned state and redesign the callback contract.

### Bug D — Invalid URL state

```jsx
const sort = new URLSearchParams(location.search).get("sort");
setSort(sort);
```

**Task:** Explain why external URL values must be validated before entering application state.

### Bug E — Unnecessary debounce

**Task:** Compare immediate local filtering with debounced filtering and justify the better UX for a small in-memory dataset.

### Bug F — Memoization illusion

```jsx
const onClear = useCallback(() => clearFilters(), []);
<MemoChild onClear={onClear} options={{ dense: true }} />
```

**Task:** Identify the unstable object prop and explain why stable callback identity alone is insufficient.

## Assessment

1. Why is the visible list derived data?
2. Why should sorting use a copied array?
3. What is the benefit of a pure `applyFilters` function?
4. When is `useMemo` justified here?
5. When should filtering move to the server?
6. Why are stable IDs important?
7. Why should a no-match state offer recovery?
8. What makes URL filters useful?
9. Why should URL values be validated?
10. When is debounce useful and when can it hurt UX?
11. Why does `useCallback` not automatically make a child faster?
12. How would you test filter combinations?

## Interview Questions

**Q: Would you store filtered products in state?**  
Usually no. They can be derived from source data and filter state.

**Q: How would you scale this to millions of records?**  
Move filtering, sorting, and pagination to the server and send filter state as query parameters.

**Q: Why use a pure filter function?**  
It separates transformation logic from rendering and makes the behavior easy to test.

**Q: Why can `useMemo` be unnecessary for a search list?**  
If the dataset is small and calculation is cheap, memoization overhead and complexity may exceed the benefit.

**Q: Where would you add debounce?**  
Usually when search input drives network requests or expensive work. Cheap local filtering can usually remain immediate.

**Q: How would you preserve filters when sharing a URL?**  
Serialize relevant filter state into validated URL search parameters and initialize/synchronize state from them.

**Q: What is the difference between source state and derived state?**  
Source state is the minimum information needed to represent the UI. Derived state can be calculated from that source and should not normally be duplicated in state.

**Q: What would you do for 100,000 rendered results?**  
First reduce the dataset server-side where appropriate; if many results genuinely need rendering, consider list virtualization and measure the rendering bottleneck.

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
- pure filtering utility
- justified `useMemo`
- URL synchronization
- accessible controls
- automated tests

### Stretch Goals

- debounced server search
- pagination
- loading/error states
- saved filters
- analytics for search usage
- virtualization for large result sets

## Production Acceptance Checklist

- [ ] No duplicated derived result state
- [ ] Source collections are never mutated by sorting/filtering
- [ ] Stable domain keys are used
- [ ] Filter controls are fully controlled and labeled
- [ ] Empty/no-match state provides recovery
- [ ] URL values are validated
- [ ] Browser navigation semantics are intentional
- [ ] Client/server filtering boundary is justified
- [ ] Loading/error/cancellation are handled for async data
- [ ] Stale server responses cannot overwrite newer results
- [ ] `useMemo` is justified by cost or identity requirements
- [ ] `useCallback` is justified by a meaningful consumer
- [ ] Large lists have a measured rendering strategy
- [ ] Core filtering logic has unit tests
- [ ] User flows have integration/component tests
- [ ] Keyboard accessibility has been verified
- [ ] Performance claims are backed by measurements
- [ ] No console errors or React warnings

## Self Check

- [ ] I can separate source state from derived results.
- [ ] I can compose search and filters without duplicated state.
- [ ] I can write pure filtering/sorting logic.
- [ ] I know why array mutation is dangerous here.
- [ ] I know when client-side filtering stops scaling.
- [ ] I can justify or reject `useMemo` based on evidence.
- [ ] I understand when `useCallback` is useful.
- [ ] I can design an accessible no-results experience.
- [ ] I can validate URL filter state.
- [ ] I can test filter combinations and edge cases.

## Day 35 Outcome

You have completed a realistic search/filter feature using the reusable logic and performance concepts from Days 31–34. You can now reason about state ownership, derived data, reusable Hooks, memoization, accessibility, URL state, testing, and scalability.

Day 36 transitions into **Context API**, where the focus moves from local feature state and reusable logic to shared application-level state and dependency distribution.
