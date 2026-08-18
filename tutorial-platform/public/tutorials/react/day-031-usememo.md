---
title: useMemo
slug: day-031-usememo
dayLabel: Day 31
level: Intermediate
estimatedMinutes: 60
order: 31
track: react
---
# Day 31 [Intermediate]: `useMemo`

## Goal

Understand **what `useMemo` actually guarantees, when it is useful, when it is unnecessary, and how to verify that memoization improves a real performance problem**.

> `useMemo` memoizes a calculation result between renders. It is a performance optimization, not a correctness mechanism.

## Prerequisites

- Days 1–30 completed
- React render/re-render model
- props and state
- arrays/objects
- `React.memo`
- basic browser performance measurement

## 1. The Problem: Render Does Not Mean DOM Change

A component function can run again even when the DOM ultimately changes very little. Any calculation performed during render also runs again unless you deliberately reuse its result.

```jsx
function ProductList({ products, query }) {
  const visible = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return visible.map((product) => <p key={product.id}>{product.name}</p>);
}
```

This is perfectly valid. **Do not add `useMemo` just because filtering happens during render.** First ask whether the calculation is actually expensive.

## 2. What `useMemo` Does

```jsx
const value = useMemo(() => calculateValue(a, b), [a, b]);
```

Conceptually:

```text
Render
  ↓
Were dependencies changed?
  ├─ No → reuse previous memoized result
  └─ Yes → run calculation → store result
```

React may discard memoized values when appropriate. Therefore never rely on `useMemo` for application correctness, persistence, or side effects.

## 3. `useMemo` Is for Values, Not Functions

```jsx
const total = useMemo(() => calculateTotal(items), [items]);
```

For a function reference:

```jsx
const handleSave = useCallback(() => save(id), [id]);
```

A useful mental model:

```text
useMemo     → memoized result/value
useCallback → memoized function reference
React.memo  → memoized component rendering based on props
```

## 4. Dependencies Must Match the Calculation

```jsx
const filtered = useMemo(
  () => products.filter((p) => p.category === category && p.name.includes(query)),
  [products, category, query]
);
```

Every reactive value used by the calculation should be represented in the dependency list.

A missing dependency can produce stale data. An unstable dependency can make the memo ineffective.

## 5. Referential Equality: The Important Advanced Use Case

Memoization can matter even when a calculation is not extremely expensive if its result is passed to a memoized child and the child relies on reference equality.

```jsx
const rows = useMemo(() => buildRows(data, filters), [data, filters]);

return <DataTable rows={rows} />;
```

If `DataTable` is wrapped in `React.memo`, keeping the same `rows` reference when inputs have not changed can help it skip a render.

But this is only useful when the child is actually memoized and the prop identity affects its rendering.

## 6. `useMemo` Does Not Stop the Parent From Rendering

This is a common interview trap.

```jsx
const result = useMemo(() => expensiveCalculation(data), [data]);
```

The parent component still renders. `useMemo` only avoids rerunning that calculation when dependencies remain equal.

## 7. Do Not Use `useMemo` for Trivial Work

Avoid this:

```jsx
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
```

Normal calculation is clearer:

```jsx
const fullName = `${firstName} ${lastName}`;
```

Memoization has bookkeeping and dependency-management costs. Optimization should have a reason.

## 8. Never Put Side Effects Inside `useMemo`

Wrong:

```jsx
const value = useMemo(() => {
  localStorage.setItem("x", "1");
  return calculate();
}, []);
```

Side effects belong in an appropriate effect or event handler. `useMemo` should describe a pure calculation.

## 9. Expensive Computation Example

```jsx
function Analytics({ records, range }) {
  const summary = useMemo(() => {
    return records
      .filter((record) => record.date >= range.start && record.date <= range.end)
      .reduce((total, record) => total + record.amount, 0);
  }, [records, range]);

  return <strong>{summary}</strong>;
}
```

Be careful with object dependencies. If `range` is recreated every render, the calculation can still rerun every render.

A better API may receive primitive values:

```jsx
function Analytics({ records, startDate, endDate }) {
  const summary = useMemo(
    () => calculateSummary(records, startDate, endDate),
    [records, startDate, endDate]
  );
}
```

## 10. Measuring Before Optimizing

Do not claim performance improvement because the code "looks optimized".

Useful approaches:

- React DevTools Profiler
- browser Performance panel
- controlled test data
- `console.time` / `console.timeEnd` for focused calculations

```jsx
console.time("filter");
const result = expensiveFilter(products, query);
console.timeEnd("filter");
```

Measure representative workloads. A 1 ms calculation does not need a complex optimization strategy.

## 11. Common Mistakes

### Mistake 1: Assuming `useMemo` always improves performance

False. It can add overhead and complexity.

### Mistake 2: Missing dependencies

Can create stale results.

### Mistake 3: Mutating the dependency

```jsx
products.sort(compare);
```

This mutates the input. Prefer:

```jsx
const sorted = useMemo(() => [...products].sort(compare), [products]);
```

### Mistake 4: Memoizing everything

Memoization should solve a measured or well-understood rendering problem.

### Mistake 5: Confusing value and function memoization

Use `useMemo` for a value and `useCallback` for a function reference.

## 12. Complete Practical: Search + Sort + Expensive Calculation

```jsx
import { useMemo, useState } from "react";

function ProductExplorer({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("price-asc");
  const [theme, setTheme] = useState("light");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === "all" || product.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, query, category, sort]);

  return (
    <section>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
      <button type="button" onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>

      {visibleProducts.map((product) => (
        <p key={product.id}>{product.name} — {product.price}</p>
      ))}
    </section>
  );
}
```

Notice that `theme` is unrelated to the calculation. Toggling it causes the component to render, but `visibleProducts` can reuse its previous result.

## 13. Decision Framework

Before using `useMemo`, ask:

1. Is the calculation expensive enough to matter?
2. Does the component render often enough for the calculation to matter?
3. Are the dependencies stable enough for memoization to provide reuse?
4. Does the memoized value need stable identity for a memoized child?
5. Have I measured or can I clearly explain the expected benefit?

If the answer is no, prefer the simpler calculation.

## Hands-on Labs

### Lab 1 — Measure
Create a deliberately expensive calculation and compare render behavior with and without `useMemo`.

### Lab 2 — Dependency Bug
Remove one dependency and demonstrate the stale result. Restore it and explain why the bug disappears.

### Lab 3 — Referential Stability
Create a `React.memo` child receiving a derived array. Compare child renders with and without `useMemo`.

### Lab 4 — Remove Unnecessary Memoization
Start with a component containing five `useMemo` calls. Measure it and remove the memoization that has no measurable value.

## Assessment

1. What does `useMemo` cache?
2. Does `useMemo` prevent a component from rendering?
3. Why must dependencies match values used by the calculation?
4. When can referential stability be useful?
5. Why should the calculation be pure?
6. Why can `useMemo` hurt performance?
7. What is the difference between `useMemo` and `useCallback`?
8. How would you prove that memoization helped?

## Interview Questions

**Q: Is `useMemo` a guarantee that React will never recompute the value?**  
No. It is a performance optimization and React may discard the cached value.

**Q: Does `useMemo` prevent re-renders?**  
No. It memoizes a calculation result. `React.memo` is about skipping component renders based on props.

**Q: Why might `[items]` fail to detect an in-place mutation?**  
Because the array reference may remain the same even though its contents changed. React dependency comparison uses reference equality for objects/arrays.

**Q: When would you choose `useMemo` over simply calculating a value?**  
When profiling or strong workload analysis shows the calculation is expensive enough to justify memoization, or when stable derived identity is important to a memoized child.

**Q: Can `useMemo` replace state?**  
No. Derived values should usually be calculated from source state; `useMemo` does not make a value independently mutable state.

## Final Project

Build an **Analytics Dashboard** with:

- 5,000+ records
- search
- category/date filters
- sorting
- derived totals
- a memoized result list
- one `React.memo` child
- a profiler comparison before/after optimization

Document:

- the bottleneck
- dependencies
- why `useMemo` was chosen
- measured result
- what happens if `useMemo` is removed

## Self Check

- [ ] I can explain `useMemo` without calling it a general "performance hook".
- [ ] I know it memoizes a value/calculation result.
- [ ] I understand dependency/reference equality.
- [ ] I know when not to use it.
- [ ] I can distinguish it from `useCallback` and `React.memo`.
- [ ] I can measure before claiming an optimization.

## Day 31 Outcome

You can now reason about memoization instead of mechanically adding it. Day 32 builds on this by stabilizing **function references** with `useCallback`.