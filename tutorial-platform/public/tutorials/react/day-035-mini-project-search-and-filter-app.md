---
title: Mini Project - Search and Filter App
slug: day-035-mini-project-search-and-filter-app
dayLabel: Day 35
level: Intermediate
estimatedMinutes: 180
order: 35
track: react
---
# Day 35 [Intermediate]: Mini Project — Search & Filter App

## Goal

Build a production-minded search and filter feature that combines the previous lessons:

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

The central rule is:

> **Keep source state minimal, derive the visible result, make transformations pure, and optimize only when the evidence justifies it.**

## Prerequisites

- Days 1–34
- `useState`
- controlled components
- `useMemo`
- `useCallback`
- custom Hooks
- `React.memo`
- array `filter`, `sort`, `map`
- JavaScript immutability
- URL search parameters

## Learning Outcomes

By the end of this project you can:

- separate source state from derived data
- design a clean state ownership model
- build reusable search behavior
- write deterministic filtering and sorting functions
- avoid mutating source arrays
- implement accessible filter controls
- distinguish loading, empty, and no-match states
- synchronize shareable filters with the URL
- choose client-side vs server-side filtering
- decide whether `useMemo`/`useCallback` are justified
- test filter combinations and boundary conditions
- reason about scalability and server-backed search

## Feature Requirements

The finished application should support:

1. Search by product name
2. Filter by category
3. Filter by minimum price
4. Sort by name and price
5. Clear all filters
6. Display result count
7. Display a useful no-match state
8. Use stable list keys
9. Keep visible results out of state
10. Keep transformation logic deterministic
11. Support keyboard interaction
12. Provide accessible labels
13. Optionally synchronize filters with the URL
14. Handle invalid filter values safely
15. Provide a testable separation between UI and filtering logic

## Architecture and Data Flow

```text
                         Product source
                              │
                              ▼
                  ┌──────────────────────┐
                  │ Filter source state  │
                  │ query                │
                  │ category             │
                  │ minPrice             │
                  │ sort                 │
                  └──────────┬───────────┘
                             │
                             ▼
                    Pure transformation
                             │
                   ┌─────────┴─────────┐
                   │                   │
                Filter               Sort
                   │                   │
                   └─────────┬─────────┘
                             ▼
                       visibleResults
                             │
                             ▼
                            UI
```

Do **not** create a second state variable for `visibleResults`.

The result can be derived from the source products and filter state.

## Data Model

```js
const products = [
  {
    id: 1,
    name: "ThinkPad",
    category: "laptop",
    price: 1200,
  },
];
```

Source data should have a stable unique identifier.

Use that identifier for the React `key`:

```jsx
{products.map((product) => (
  <ProductRow key={product.id} product={product} />
))}
```

Avoid array indexes as keys when list order or membership can change.

## State Design

The minimum source state is:

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

That duplicates derived information and creates synchronization problems.

### Source vs derived state

| State | Type | Why |
|---|---|---|
| `query` | source | user input |
| `category` | source | user choice |
| `minPrice` | source | user choice |
| `sort` | source | user choice |
| `visibleProducts` | derived | calculated from the above |
| `resultCount` | derived | `visibleProducts.length` |
| `hasActiveFilters` | derived | calculated from filter state |

## State Ownership

Keep state at the lowest common ancestor that needs to coordinate it.

A good structure is:

```text
App
├── SearchBox
├── FilterPanel
└── ProductResults
```

`App` owns the filter state because both the controls and results depend on it.

Children communicate through explicit props:

```jsx
<SearchBox value={query} onChange={setQuery} />
```

Avoid children reaching directly into unrelated state.

## Reusable Search Hook

A generic search Hook can own search-input behavior without owning product-specific filtering policy:

```jsx
function useSearch(initialValue = "") {
  const [query, setQuery] = useState(initialValue);

  const clear = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    clear,
  };
}
```

Do not create a custom Hook merely to wrap one trivial `useState` unless the abstraction provides a meaningful API or reuse benefit.

## Pure Filtering and Sorting

Keep domain logic outside the component whenever practical.

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

A pure transformation:

- does not mutate input
- does not read hidden component state
- does not perform I/O
- gives predictable output for the same input
- is easy to unit test

## Avoid Mutation

Never do this:

```js
products.sort(compareProducts);
```

`sort()` mutates the array.

Use:

```js
const sorted = [...products].sort(compareProducts);
```

This is especially important when the source collection comes from props, state, or a shared cache.

## Memoizing Derived Results

The straightforward version is often enough:

```jsx
const visibleProducts = applyFilters(products, {
  query,
  category,
  minPrice,
  sort,
});
```

If the calculation is expensive or stable result identity benefits a real downstream consumer:

```jsx
const visibleProducts = useMemo(
  () => applyFilters(products, { query, category, minPrice, sort }),
  [products, query, category, minPrice, sort]
);
```

Do not teach the rule as:

> Every `filter()` needs `useMemo`.

Instead:

> Measure realistic workloads and use memoization when repeated work or reference stability creates a meaningful benefit.

## Filter Panel

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
        onChange={(event) => {
          const value = Number(event.target.value);
          onChange("minPrice", Number.isFinite(value) ? Math.max(0, value) : 0);
        }}
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

The panel emits changes. It does not calculate the result list.

## Search Box

```jsx
function SearchBox({ value, onChange }) {
  return (
    <div>
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by product name"
        autoComplete="off"
      />
    </div>
  );
}
```

The label should remain available even when a placeholder is present.

## Complete End-to-End Implementation

```jsx
import { useCallback, useMemo, useState } from "react";

const PRODUCTS = [
  { id: 1, name: "iPhone", category: "mobile", price: 800 },
  { id: 2, name: "Galaxy", category: "mobile", price: 700 },
  { id: 3, name: "ThinkPad", category: "laptop", price: 1200 },
  { id: 4, name: "MacBook", category: "laptop", price: 1800 },
];

function useSearch(initialValue = "") {
  const [query, setQuery] = useState(initialValue);

  const clear = useCallback(() => {
    setQuery("");
  }, []);

  return { query, setQuery, clear };
}

function applyFilters(products, filters) {
  const normalizedQuery = filters.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      filters.category === "all" || product.category === filters.category;
    const matchesPrice = product.price >= filters.minPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
}

function SearchBox({ value, onChange }) {
  return (
    <div>
      <label htmlFor="search">Search products</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name"
        autoComplete="off"
      />
    </div>
  );
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
        onChange={(event) => {
          const value = Number(event.target.value);
          onChange("minPrice", Number.isFinite(value) ? Math.max(0, value) : 0);
        }}
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

function ProductResults({ products, onClear }) {
  if (products.length === 0) {
    return (
      <section aria-labelledby="empty-heading">
        <h2 id="empty-heading">No products found</h2>
        <p>Try changing your search or filters.</p>
        <button type="button" onClick={onClear}>
          Reset filters
        </button>
      </section>
    );
  }

  return (
    <ul aria-label="Product results">
      {products.map((product) => (
        <li key={product.id}>
          <strong>{product.name}</strong> — {product.category} — ${product.price}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const { query, setQuery, clear: clearQuery } = useSearch();
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [sort, setSort] = useState("name-asc");

  const filters = { query, category, minPrice, sort };

  const visibleProducts = useMemo(
    () => applyFilters(PRODUCTS, filters),
    [query, category, minPrice, sort]
  );

  const updateFilter = useCallback((name, value) => {
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "minPrice":
        setMinPrice(value);
        break;
      case "sort":
        setSort(value);
        break;
      default:
        break;
    }
  }, []);

  const clearFilters = useCallback(() => {
    clearQuery();
    setCategory("all");
    setMinPrice(0);
    setSort("name-asc");
  }, [clearQuery]);

  return (
    <main>
      <h1>Product Explorer</h1>

      <SearchBox value={query} onChange={setQuery} />

      <FilterPanel
        filters={{ category, minPrice, sort }}
        onChange={updateFilter}
        onClear={clearFilters}
      />

      <p role="status" aria-live="polite">
        {visibleProducts.length} result{visibleProducts.length === 1 ? "" : "s"}
      </p>

      <ProductResults products={visibleProducts} onClear={clearFilters} />
    </main>
  );
}
```

### Important optimization note

The `filters` object in the example is created on every render, but it is only used as an argument to the memoized calculation. It is intentionally **not** included as a dependency. The actual primitive values that determine the result are dependencies.

For a large application, a more explicit selector-style design can make this relationship clearer:

```jsx
const visibleProducts = useMemo(
  () => applyFilters(PRODUCTS, { query, category, minPrice, sort }),
  [query, category, minPrice, sort]
);
```

## Empty, Loading, and Error States

For a local static dataset there is no loading state. When the data becomes asynchronous, distinguish the states:

```text
idle
  ↓
loading
  ├── success + results
  ├── success + empty dataset
  └── error
```

There is another important state:

```text
success + data exists + current filters match nothing
```

That is a **no-match state**, not an API error.

A useful no-match state should offer recovery:

- clear filters
- show active filter summary
- preserve the user's search when appropriate
- explain why no results are visible

## URL-Synchronized Filters

URL state is useful when filters should be:

- shareable
- bookmarkable
- preserved through navigation
- restored after refresh

Example:

```text
/products?q=laptop&category=laptop&minPrice=1000&sort=price-asc
```

With a router, prefer its search-parameter APIs. For a browser-only exercise:

```js
const params = new URLSearchParams(window.location.search);

const query = params.get("q") ?? "";
const category = params.get("category") ?? "all";
const minPrice = Number(params.get("minPrice") ?? 0);
const sort = params.get("sort") ?? "name-asc";
```

Never trust arbitrary URL values. Validate against allowed values.

```js
const allowedCategories = new Set(["all", "mobile", "laptop"]);
const safeCategory = allowedCategories.has(category) ? category : "all";
```

### Browser history decision

Updating the URL on every search keystroke can create noisy history entries. Consider `replaceState` or router replacement for transient changes. For deliberate filter changes, normal navigation may be appropriate.

Choose behavior intentionally based on the desired Back/Forward experience.

## Search UX and Accessibility

A production-quality search feature should consider:

- visible labels
- keyboard access
- logical tab order
- semantic form controls
- clear/reset action
- result count
- useful no-match recovery
- visible focus state
- adequate contrast
- appropriate live-region announcements

Do not use a clickable `<div>` where a `<button>` is appropriate.

For frequently changing local results, avoid excessively noisy screen-reader announcements. For network-backed search, announce meaningful state changes such as result completion or errors.

## Debounce vs Immediate Filtering

For cheap local filtering:

```text
keystroke → state update → filter → render
```

This is normally fine.

For expensive or network-backed search:

```text
keystrokes → debounce → request
```

Debouncing reduces how often work starts while the user is typing.

Do not add debounce merely because a search box exists.

## Client-Side vs Server-Side Filtering

### Client-side filtering

Good when:

- the dataset is reasonably small
- data is already loaded
- filtering is inexpensive
- instant response is valuable

```text
load all data → filter in browser
```

### Server-side filtering

Better when:

- the dataset is large
- pagination is required
- search needs server indexes
- permissions affect the result set
- data changes frequently

```text
filter state → API request → server query → paginated response
```

Do not fetch every record merely to make a server-sized dataset behave like a local array.

## Server-Side Extension

A production API might receive:

```text
GET /products?q=laptop&category=laptop&minPrice=1000&sort=price-asc&page=1&pageSize=20
```

The UI should then model:

- loading
- refreshing
- success
- empty
- error
- stale request protection
- pagination

For server-backed search, the filtering function remains useful as a conceptual model, but the server becomes the source of truth for the result set.

## Performance Strategy

Do not optimize before identifying the bottleneck.

### First pass

Implement the simplest correct version.

### Second pass

Profile:

- filter calculation time
- result rendering time
- number of rendered rows
- input responsiveness
- unnecessary child renders

### Third pass

Apply the smallest justified optimization:

- `useMemo` for expensive derived calculations
- `useCallback` when callback identity matters
- `React.memo` when a child render boundary is meaningful
- virtualization for very large lists
- debouncing for expensive/network search
- server-side filtering for large datasets

### Example decision

```text
1,000 simple products + cheap filtering
        ↓
Probably no special optimization

100,000 products + expensive transformation
        ↓
Profile → consider memoization/virtualization/server filtering
```

## Referential Stability

A memoized result can also provide a stable array reference to a memoized child:

```jsx
const visibleProducts = useMemo(
  () => applyFilters(products, filters),
  [products, filters.query, filters.category, filters.minPrice, filters.sort]
);

return <MemoizedProductList products={visibleProducts} />;
```

This is useful only when the child actually benefits from stable identity.

Do not wrap every value in `useMemo` simply because it is an array.

## Common Mistakes

1. Storing `visibleProducts` in state.
2. Mutating the source array with `sort()`.
3. Using array indexes as keys for dynamic lists.
4. Putting all filtering logic inside one giant component.
5. Creating a custom Hook for every two lines of code.
6. Adding `useMemo` automatically.
7. Adding `useCallback` to every event handler.
8. Omitting dependencies from memoized calculations.
9. Treating no-match as an API error.
10. Trusting arbitrary URL parameters.
11. Creating browser history entries for every keystroke without considering UX.
12. Debouncing cheap local work unnecessarily.
13. Fetching an entire large dataset to filter it locally.
14. Announcing every tiny change excessively to assistive technology.
15. Claiming performance improvements without measurement.

## Testing Strategy

Keep the pure filtering function easy to test independently.

### Unit tests

Test:

- empty query
- case-insensitive search
- category filtering
- minimum price
- combined filters
- name sorting
- ascending price sorting
- descending price sorting
- no-match result
- duplicate names
- zero price
- negative input normalization
- invalid filter values

Example:

```js
expect(
  applyFilters(products, {
    query: "lap",
    category: "all",
    minPrice: 0,
    sort: "name-asc",
  })
).toHaveLength(1);
```

### Component tests

Verify:

- typing updates the controlled input
- selecting a category updates results
- changing minimum price updates results
- sorting changes display order
- clear filters restores defaults
- no-match state appears correctly
- result count is accurate
- controls have accessible labels

### URL tests

Verify:

- valid URL values initialize the UI
- invalid values fall back to safe defaults
- filter changes update the URL as intended
- Back/Forward behavior matches the chosen UX

## Hands-on Labs

### Lab 1 — Basic implementation

Build the application with no memoization first.

Acceptance:

- search works
- category works
- minimum price works
- sorting works
- clear works

### Lab 2 — Extract pure logic

Move filtering and sorting into `applyFilters()` and write unit tests.

### Lab 3 — Custom Hook

Extract generic search state into `useSearch()`.

Explain why the Hook is reusable and where its responsibility ends.

### Lab 4 — Memoization experiment

Create a large dataset. Measure filtering before and after `useMemo`.

Document the result instead of assuming the optimization helped.

### Lab 5 — Memoized child

Wrap the results list in `React.memo`. Test whether stable result identity changes render behavior.

### Lab 6 — URL state

Serialize filters to URL search parameters and restore them after refresh.

### Lab 7 — Accessibility audit

Navigate the complete application with only the keyboard and inspect labels/focus/live-region behavior.

### Lab 8 — Server-side redesign

Replace local filtering with a simulated API and introduce loading, error, cancellation, and pagination states.

## Debugging Lab

### Bug 1 — Stale visible results

```jsx
const [visibleProducts, setVisibleProducts] = useState([]);
```

**Problem:** derived state can become stale.

**Fix:** derive the list from source data and filters.

### Bug 2 — Source array mutation

```js
products.sort(compareProducts);
```

**Problem:** the source array is modified.

**Fix:**

```js
[...products].sort(compareProducts);
```

### Bug 3 — Incorrect memo dependencies

```jsx
const results = useMemo(
  () => applyFilters(products, { query, category, minPrice, sort }),
  [products]
);
```

**Problem:** filter state changes do not invalidate the calculation.

**Fix:** include every reactive input used by the calculation.

### Bug 4 — Unstable object dependency

```jsx
const filters = { query, category, minPrice, sort };
const results = useMemo(() => applyFilters(products, filters), [products, filters]);
```

**Problem:** `filters` is a new object every render.

**Fix:** depend on the primitive inputs or create the object inside the memo callback.

### Bug 5 — Invalid URL category

```text
/products?category=secret-admin-mode
```

**Problem:** arbitrary URL values are treated as trusted application state.

**Fix:** validate against allowed values and fall back safely.

### Bug 6 — Wrong key

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

**Problem:** changing order can associate component state with the wrong item.

**Fix:** use a stable item identifier.

### Bug 7 — Search request race

When extending this project to an API, an older request can finish after a newer request.

**Fix:** use request cancellation or a request identity strategy so stale responses cannot overwrite current results.

## Assessment

1. Why should visible results usually not be stored in state?
2. What makes `applyFilters()` a pure function?
3. Why is `sort()` dangerous on the source array?
4. When is `useMemo` justified?
5. Why can a memoized result help a memoized child?
6. Why should URL parameters be validated?
7. What is the difference between empty data and no matching data?
8. When should search be debounced?
9. When should filtering move to the server?
10. Why are stable keys important?
11. What is the lowest common ancestor rule for state ownership?
12. How would you test combined filters?
13. What should happen if an older API response arrives after a newer response?
14. Why might `useCallback` be unnecessary in this project?
15. How would you prove a performance optimization helped?

### Answers

1. It is derived from source data and filters; duplicating it creates synchronization risk.
2. It does not mutate input, read hidden state, or perform side effects, and gives deterministic output for its inputs.
3. `sort()` mutates the array in place.
4. When repeated calculation is meaningfully expensive or stable identity has a demonstrated downstream benefit.
5. The child can receive the same array reference when dependencies are unchanged and therefore have an opportunity to skip work.
6. URLs are external input and may contain arbitrary or invalid values.
7. Empty data means there is no source data; no-match means source data exists but current filters exclude every item.
8. Usually when input drives expensive or network-backed work; cheap local filtering can normally remain immediate.
9. When datasets are large, paginated, frequently changing, permission-sensitive, or expensive to search locally.
10. Stable keys let React preserve the correct identity when list membership/order changes.
11. Put coordinated state in the lowest component that needs to share it among descendants.
12. Test each filter individually and representative combinations, including boundary values and no-match cases.
13. The stale response must not overwrite the current result; use cancellation or request identity.
14. If callback identity has no meaningful consumer, memoizing it adds complexity without a useful benefit.
15. Profile realistic workloads before and after and compare user-relevant performance, not just code appearance.

## Interview Questions

### Beginner

**What is derived state?**

Data calculated from existing source state/props rather than independently owned state.

**Why should filter results usually be derived?**

Because they are a deterministic result of source products and filter values.

**What is a controlled input?**

An input whose current value is controlled by React state through its `value`/`checked` prop and change handler.

### Intermediate

**Why should filtering logic be extracted into a pure function?**

It makes the domain behavior independently testable, reusable, and easier to reason about.

**When would you use `useMemo`?**

When profiling or strong workload evidence shows repeated calculation cost, or when stable identity has a real downstream purpose.

**Why can `useCallback` appear in a search/filter application?**

It can provide stable callback identity at a memoized child boundary or in an API where callback identity matters, but it is not required for every handler.

**How would you synchronize filters with the URL?**

Serialize validated filter values into search parameters and restore them on initialization/navigation while intentionally choosing push vs replace history behavior.

### Advanced

**How would you scale this feature to one million products?**

Do not simply load everything into the browser. Use server-side filtering/search, pagination or cursor pagination, indexed queries, caching, and possibly virtualization for large rendered result sets.

**How would you prevent an older search request from overwriting a newer result?**

Cancel obsolete requests with `AbortController` and/or associate responses with a request ID and ignore stale responses.

**Why can `useMemo` be slower?**

Memoization has dependency comparison and cache-management overhead. For cheap work, the optimization may cost more than recalculating.

**How would you debug a child that still renders after `useCallback`?**

Use the React DevTools Profiler, inspect changed props/references, and check context, local state, and other parent/child boundaries.

**What is the difference between client-side and server-side filtering?**

Client-side filtering operates on data already loaded into the browser. Server-side filtering sends criteria to the backend and returns a matching subset, which scales better for large datasets.

## Final Project Requirements

Build a polished product explorer with:

- search
- category filter
- minimum price
- sort
- clear/reset
- result count
- empty/no-match state
- stable keys
- pure transformation utilities
- reusable search Hook
- optional URL synchronization
- accessible controls
- tests
- documented performance decision

### Advanced extension

Add:

- maximum price
- multiple categories
- pagination
- URL synchronization
- simulated API latency
- loading/error states
- request cancellation
- debounce
- `React.memo` result rows
- performance profiling report

## Production Acceptance Checklist

### Correctness

- [ ] Search is case-insensitive.
- [ ] Empty search returns all valid products.
- [ ] Category filtering works.
- [ ] Minimum price boundary is correct.
- [ ] Sorting is deterministic.
- [ ] Clear restores all defaults.
- [ ] No-match state is distinct from an API error.
- [ ] Invalid URL parameters are handled safely.

### React architecture

- [ ] Derived results are not duplicated in state.
- [ ] State lives at the correct ownership boundary.
- [ ] Filtering is pure and testable.
- [ ] Inputs are controlled.
- [ ] Stable keys are used.
- [ ] Hooks follow the Rules of Hooks.

### Performance

- [ ] No automatic `useMemo`/`useCallback` everywhere.
- [ ] Expensive work has been measured.
- [ ] Memoization decisions have a documented reason.
- [ ] Large lists have an appropriate rendering strategy.
- [ ] Server-side filtering is considered for large datasets.

### Accessibility

- [ ] Inputs have labels.
- [ ] Controls are keyboard accessible.
- [ ] Focus is visible.
- [ ] Buttons use semantic `<button>` elements.
- [ ] Result status is communicated appropriately.
- [ ] Empty state has an actionable recovery path.

### Testing

- [ ] Pure filtering logic has unit tests.
- [ ] Combined filter scenarios are tested.
- [ ] Boundary values are tested.
- [ ] Clear/reset behavior is tested.
- [ ] URL validation/synchronization is tested when implemented.
- [ ] Accessibility behavior is reviewed.

## Self Check

- [ ] I can distinguish source state from derived data.
- [ ] I can explain why `visibleProducts` usually should not be state.
- [ ] I can write a pure filtering function.
- [ ] I know why `sort()` can cause mutation bugs.
- [ ] I can justify or reject `useMemo`.
- [ ] I can justify or reject `useCallback`.
- [ ] I understand stable keys.
- [ ] I can design an accessible filter UI.
- [ ] I can validate URL state.
- [ ] I know when filtering belongs on the server.
- [ ] I can test combined filters and boundary cases.
- [ ] I can explain how to protect against stale API responses.

## Day 35 Outcome

You have completed a realistic search/filter feature using the reusable logic and performance concepts from Days 31–34.

You can now reason about:

- state ownership
- derived data
- custom Hooks
- memoization
- callback identity
- accessibility
- URL state
- testing
- scalability

**Next:** Day 36 — Context API and avoiding unnecessary prop drilling.
