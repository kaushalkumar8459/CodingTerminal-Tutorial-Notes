---
title: useMemo
slug: day-031-usememo
dayLabel: Day 31
level: Intermediate
estimatedMinutes: 150
order: 31
track: react
---
# Day 31 [Intermediate]: `useMemo`

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [What useMemo Does](#what-usememo-does)
- [Render vs DOM Work](#render-vs-dom-work)
- [Basic Syntax](#basic-syntax)
- [Dependency Arrays](#dependency-arrays)
- [Purity and Side Effects](#purity-and-side-effects)
- [useMemo vs useCallback vs React.memo](#usememo-vs-usecallback-vs-reactmemo)
- [Referential Equality](#referential-equality)
- [Stable Object and Array References](#stable-object-and-array-references)
- [Expensive Calculations](#expensive-calculations)
- [When Not to Use useMemo](#when-not-to-use-usememo)
- [Common Dependency Pitfalls](#common-dependency-pitfalls)
- [Mutation Pitfalls](#mutation-pitfalls)
- [Strict Mode and Development Behavior](#strict-mode-and-development-behavior)
- [Performance Measurement](#performance-measurement)
- [Complete Practical](#complete-practical)
- [Hands-on Labs](#hands-on-labs)
- [Debugging Lab](#debugging-lab)
- [Common Mistakes](#common-mistakes)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Production Decision Framework](#production-decision-framework)
- [Testing Checklist](#testing-checklist)
- [Final Acceptance Criteria](#final-acceptance-criteria)
- [Day 31 Outcome](#day-31-outcome)

## Goal

Understand **what `useMemo` actually does, what it does not do, and when memoization is worth its complexity**.

> `useMemo` caches the result of a calculation between renders when its dependencies are unchanged. It is a performance optimization, not a correctness mechanism and not application state.

## Prerequisites

- Days 1–30
- React render/re-render model
- props and state
- arrays and objects
- `useRef` basics
- `React.memo` concept
- basic browser performance measurement

## Learning Outcomes

By the end of this day, you can:

- explain the purpose and limitations of `useMemo`
- distinguish calculation memoization from render memoization
- write correct dependency arrays
- reason about `Object.is`/reference equality
- use memoization for expensive derived values
- use stable derived references with memoized children when justified
- identify unstable dependencies that defeat memoization
- avoid mutation bugs
- keep calculations pure
- measure before and after performance
- explain why `useMemo` should not be added mechanically

## Core Mental Model

A normal calculation runs whenever the component renders:

```text
Component renders
      ↓
calculate()
      ↓
value
```

With `useMemo`:

```text
Component renders
      ↓
Did dependencies change?
   ┌──┴──┐
  NO    YES
   ↓      ↓
reuse   calculate
previous   ↓
result   cache result
```

The component **still renders**. Only the memoized calculation can be skipped.

## What useMemo Does

```jsx
const total = useMemo(
  () => calculateTotal(items),
  [items]
);
```

React can reuse the previous result when `items` is considered unchanged according to dependency comparison.

Important limitations:

- `useMemo` is an optimization, not a semantic guarantee of permanent caching.
- React may discard memoized values when appropriate.
- Do not use it to make side effects happen.
- Do not use it as persistent storage.
- Do not use it as a replacement for state.

If the application is only correct because a memoized value remains cached, the design is wrong.

## Render vs DOM Work

A component function can run again even if the final DOM changes very little.

```jsx
function ProductList({ products, query }) {
  const visible = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return visible.map((product) => (
    <p key={product.id}>{product.name}</p>
  ));
}
```

This is valid React. The fact that filtering happens during render does **not** automatically mean `useMemo` is required.

First determine whether the calculation is expensive enough to matter.

## Basic Syntax

```jsx
const value = useMemo(
  () => calculateValue(a, b),
  [a, b]
);
```

The calculation should be deterministic for the given dependencies:

```jsx
const sortedProducts = useMemo(() => {
  return [...products].sort(compareProducts);
}, [products]);
```

Do not mutate the source array inside the memoized calculation.

## Dependency Arrays

Every reactive value used by the calculation should be represented in the dependency list.

```jsx
const filtered = useMemo(() => {
  return products.filter(
    (product) =>
      product.category === category &&
      product.name.toLowerCase().includes(query.toLowerCase())
  );
}, [products, category, query]);
```

### Missing dependency

```jsx
// Wrong: query is used but omitted.
const filtered = useMemo(
  () => products.filter((p) => p.name.includes(query)),
  [products]
);
```

This can return stale results.

Use the React Hooks lint rules to help identify dependency mistakes instead of manually guessing which dependencies are safe to omit.

### Unstable dependency

```jsx
const options = { min: 10, max: 100 };

const result = useMemo(() => calculate(data, options), [data, options]);
```

If `options` is recreated on every render, the memo can be invalidated on every render.

Prefer primitives where practical:

```jsx
const result = useMemo(
  () => calculate(data, 10, 100),
  [data]
);
```

Or memoize the object only when there is a clear reason:

```jsx
const options = useMemo(() => ({ min, max }), [min, max]);
```

Avoid creating memo chains without evidence that they help.

## Purity and Side Effects

A `useMemo` calculation should be pure.

### Wrong

```jsx
const value = useMemo(() => {
  localStorage.setItem("last-value", "10");
  sendAnalyticsEvent();
  return calculate();
}, []);
```

Side effects belong in an event handler or an appropriate effect.

### Correct

```jsx
const value = useMemo(() => calculate(records), [records]);
```

The memoized calculation should not mutate external state or perform I/O.

## useMemo vs useCallback vs React.memo

These solve related but different problems:

| Tool | What is memoized? | Primary purpose |
|---|---|---|
| `useMemo` | calculation result/value | avoid recalculating a value |
| `useCallback` | function reference | preserve function identity |
| `React.memo` | component rendering based on props | allow a component to skip renders when props are equal |

Example:

```jsx
const rows = useMemo(() => buildRows(data), [data]);

const onSelect = useCallback((id) => select(id), [select]);

return <Table rows={rows} onSelect={onSelect} />;
```

The child may then be wrapped with `React.memo` if profiling shows that skipping renders is useful.

`useMemo` by itself does **not** prevent the parent or child from rendering.

## Referential Equality

Objects, arrays, and functions are compared by identity/reference, not deep content equality.

```jsx
const a = { enabled: true };
const b = { enabled: true };

console.log(a === b); // false
```

This matters when a memoized child receives a derived array:

```jsx
const rows = useMemo(() => buildRows(data), [data]);

return <MemoizedTable rows={rows} />;
```

When the dependencies remain unchanged, `rows` can keep the same reference, allowing a memoized child to compare the prop successfully.

But stable identity is only useful if something consumes that identity meaningfully. Do not memoize every array just because it is an array.

## Stable Object and Array References

### Unnecessary

```jsx
const labels = useMemo(() => ["Open", "Closed"], []);
```

If the array is tiny and there is no rendering problem, this can be less readable than a module constant:

```jsx
const LABELS = ["Open", "Closed"];
```

### Useful case

```jsx
const visibleRows = useMemo(
  () => expensiveTransform(records, filters),
  [records, filters]
);

return <MemoizedGrid rows={visibleRows} />;
```

Here, the value is both derived and potentially expensive, and stable identity may matter to the memoized grid.

## Expensive Calculations

A reasonable candidate is a calculation whose cost becomes noticeable with realistic data:

```jsx
function Analytics({ records, startDate, endDate }) {
  const summary = useMemo(() => {
    return records
      .filter(
        (record) =>
          record.date >= startDate && record.date <= endDate
      )
      .reduce((total, record) => total + record.amount, 0);
  }, [records, startDate, endDate]);

  return <strong>{summary}</strong>;
}
```

The important part is not that `filter` and `reduce` exist. The important part is that the workload is sufficiently expensive and/or frequent to justify memoization.

## When Not to Use useMemo

Do not add it automatically to:

- string concatenation
- simple arithmetic
- tiny object transformations
- trivial boolean expressions
- every `map` or `filter`
- every component prop

For example:

```jsx
const fullName = `${firstName} ${lastName}`;
```

is clearer than:

```jsx
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName]
);
```

Memoization has its own bookkeeping and cognitive cost.

## Common Dependency Pitfalls

### Pitfall 1 — Omitting dependencies

Creates stale values.

### Pitfall 2 — Depending on freshly created objects

Can invalidate the memo every render.

### Pitfall 3 — Depending on a function recreated every render

The memo may rerun because the function identity changes.

If the function is only an implementation detail of the calculation, define it inside the memo callback:

```jsx
const result = useMemo(() => {
  const normalize = (value) => value.trim().toLowerCase();
  return items.filter((item) => normalize(item.name) === query);
}, [items, query]);
```

### Pitfall 4 — Using `useMemo` to hide an architectural problem

If a component renders too much because state is owned too high in the tree, memoizing individual calculations may only mask the underlying issue.

## Mutation Pitfalls

Never mutate a dependency in place and expect React dependency comparison to detect the change.

```jsx
products.sort(compareProducts); // mutates products
```

Prefer:

```jsx
const sorted = useMemo(
  () => [...products].sort(compareProducts),
  [products]
);
```

Likewise, if an array is mutated in place elsewhere, its reference can remain unchanged and memoized calculations may incorrectly reuse a result.

Immutable state updates make dependency reasoning much safer.

## Strict Mode and Development Behavior

Development Strict Mode can cause calculations and component logic to be invoked more than once while React helps expose unsafe patterns.

Therefore:

- calculations must be pure
- do not use `useMemo` to trigger side effects
- do not infer production performance solely from a development console log
- measure with appropriate production-like builds and representative workloads

## Performance Measurement

Do not claim that `useMemo` improved performance because the code looks optimized.

Useful tools include:

- React DevTools Profiler
- browser Performance panel
- `console.time` / `console.timeEnd` for focused calculations
- realistic datasets
- production builds

Example:

```jsx
console.time("visible-products");
const result = expensiveFilter(products, query);
console.timeEnd("visible-products");
```

Measure enough iterations to avoid making decisions from a single noisy measurement.

### Before/after experiment

1. Establish a realistic workload.
2. Profile without `useMemo`.
3. Add the smallest justified memoization.
4. Profile again.
5. Check whether user-visible rendering actually improved.
6. Remove the memo if the result is insignificant or makes the code harder to understand.

## Complete Practical

Build a searchable, sortable product explorer.

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
      const matchesQuery = product.name
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : b.price - a.price
    );
  }, [products, query, category, sort]);

  return (
    <section>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="all">All</option>
        <option value="mobile">Mobile</option>
        <option value="laptop">Laptop</option>
      </select>

      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>

      <button
        type="button"
        onClick={() =>
          setTheme((current) =>
            current === "light" ? "dark" : "light"
          )
        }
      >
        Theme: {theme}
      </button>

      <p>{visibleProducts.length} result(s)</p>

      {visibleProducts.map((product) => (
        <p key={product.id}>
          {product.name} — ₹{product.price}
        </p>
      ))}
    </section>
  );
}
```

Notice that changing `theme` causes the component to render, but it does not change the dependencies of `visibleProducts`, so the previous memoized result can be reused.

### Important observation

This example demonstrates the mechanism. It does **not** prove that memoization is necessary. For a small product list, the non-memoized version may be faster or equally fast. The learner must measure before making a production decision.

## Hands-on Labs

### Lab 1 — Measure a real calculation

Create a large dataset and compare a calculation with and without `useMemo`.

### Lab 2 — Dependency bug

Remove one dependency, demonstrate stale output, restore it, and explain the dependency relationship.

### Lab 3 — Referential stability

Create a `React.memo` child that receives a derived array. Compare child renders with and without `useMemo`.

### Lab 4 — Unstable dependency

Create an object dependency inside the component and observe why the memo recalculates. Refactor using primitives.

### Lab 5 — Remove memoization

Start with several `useMemo` calls. Measure the application and remove memoization that provides no meaningful benefit.

## Debugging Lab

### Bug 1 — stale result

```jsx
const result = useMemo(() => filter(items, query), [items]);
```

**Problem:** `query` is missing.

**Fix:**

```jsx
const result = useMemo(() => filter(items, query), [items, query]);
```

### Bug 2 — memo runs every render

```jsx
const options = { activeOnly };
const result = useMemo(() => calculate(items, options), [items, options]);
```

**Problem:** `options` is a new object on every render.

**Fix:** prefer primitive dependencies when possible.

### Bug 3 — mutation

```jsx
const sorted = useMemo(() => items.sort(compare), [items]);
```

**Problem:** the source array is mutated.

**Fix:** copy before sorting.

### Bug 4 — side effect in memo

```jsx
useMemo(() => localStorage.setItem("x", "1"), []);
```

**Problem:** `useMemo` is being used as an effect.

**Fix:** use an appropriate effect/event handler.

### Bug 5 — memoizing trivial work

A simple string or arithmetic calculation has been wrapped in `useMemo`.

**Fix:** remove it unless measurement provides a concrete reason to keep it.

## Common Mistakes

1. Calling `useMemo` a general-purpose performance hook.
2. Assuming it prevents component renders.
3. Treating it as persistent state.
4. Using it for side effects.
5. Omitting dependencies.
6. Passing unstable object dependencies.
7. Mutating arrays or objects in place.
8. Memoizing every `map`/`filter`.
9. Assuming a stable value is useful without a consumer of that identity.
10. Using it to hide excessive parent renders or poor state ownership.
11. Measuring only development console output.
12. Assuming every optimization is beneficial.

## Assessment

1. What exactly does `useMemo` memoize?
2. Does `useMemo` stop the component from rendering?
3. What happens when a dependency changes?
4. Why can a missing dependency create stale data?
5. Why can an object dependency defeat memoization?
6. Why should the calculation be pure?
7. Why should source arrays not be mutated inside `useMemo`?
8. How is `useMemo` different from `useCallback`?
9. How is `useMemo` different from `React.memo`?
10. When can referential stability be useful?
11. Why might `useMemo` make code worse?
12. How would you prove that memoization helped?

### Answers

1. The result of a calculation between renders when dependencies remain unchanged.
2. No. The component can still render; the calculation may be reused.
3. React recalculates the memoized value.
4. The memo can continue returning a result based on old input.
5. A newly created object has a new reference even when its contents are equal.
6. React may evaluate component logic more than once in development and memoization should never be relied on for effects.
7. Mutation can preserve the reference and break dependency-based reasoning.
8. `useMemo` memoizes a value; `useCallback` memoizes a function reference.
9. `React.memo` can skip a component render based on props; `useMemo` memoizes a calculation result.
10. When a memoized child or another identity-sensitive consumer can benefit from the stable reference.
11. It adds dependency bookkeeping, memory/management overhead, and cognitive complexity without guaranteed benefit.
12. Profile realistic workloads before and after the change and compare user-relevant render/calculation costs.

## Interview Questions

### Beginner

**What is `useMemo`?**

A React hook for memoizing the result of a calculation between renders when dependencies are unchanged.

**Does it prevent re-rendering?**

No. It only concerns the calculation result.

### Intermediate

**Why does dependency correctness matter?**

Dependencies describe the inputs that determine the calculated value. Omitting one can produce stale results.

**Why can `[options]` be a problem when `options` is created inside the component?**

A new object gets a new reference on each render, so the memo can be invalidated each time.

**When does stable identity matter?**

When an identity-sensitive consumer such as a memoized child can use the stable reference to avoid unnecessary work.

### Advanced

**Can you guarantee that `useMemo` will always return the same cached object?**

No. It is an optimization and should not be treated as permanent storage or correctness state.

**Why is memoizing a calculation sometimes slower?**

Memoization has its own bookkeeping and dependency comparison cost. If the original calculation is cheap, the optimization may cost more than it saves.

**Should every expensive calculation use `useMemo`?**

Not automatically. The workload, render frequency, dependency stability, and measured benefit should justify it.

**How can `useMemo` work with `React.memo`?**

A memoized calculation can preserve an array/object reference passed to a memoized child, allowing prop identity checks to succeed when the inputs have not changed.

## Production Decision Framework

Before committing `useMemo`, answer:

| Question | Decision |
|---|---|
| Is the calculation expensive? | If no, usually skip it |
| Does the component render often? | If no, benefit may be small |
| Are dependencies stable? | If no, fix the design first |
| Is stable identity useful downstream? | If no, benefit may be small |
| Is there measured or strongly justified benefit? | If no, prefer clarity |
| Is the calculation pure? | Must be yes |

A good optimization has an explanation such as:

> “This calculation processes 10,000 records on frequent renders. Profiling showed it was a meaningful contributor to render time, and memoization reduced repeated calculation work.”

A weak explanation is:

> “I used `useMemo` because performance is important.”

## Testing Checklist

- [ ] Correct value is returned for initial inputs.
- [ ] Changing each dependency recalculates the value.
- [ ] Unrelated state changes do not change the memo dependencies.
- [ ] Missing-dependency bugs are prevented by linting/review.
- [ ] Arrays/objects are not mutated in place.
- [ ] Side effects are absent from the calculation.
- [ ] Referential stability is tested only where it matters.
- [ ] Performance claims are based on representative measurements.

## Final Acceptance Criteria

- [ ] Complete index and learning outcomes.
- [ ] Clear definition of `useMemo`.
- [ ] Render vs calculation distinction.
- [ ] Correct dependency-array guidance.
- [ ] Reference-equality explanation.
- [ ] `useMemo` vs `useCallback` vs `React.memo`.
- [ ] Pure calculation requirement.
- [ ] Mutation warning.
- [ ] Unstable dependency examples.
- [ ] Expensive-calculation practical.
- [ ] Explicit guidance on when not to memoize.
- [ ] Performance measurement workflow.
- [ ] Debugging exercises.
- [ ] Progressive hands-on labs.
- [ ] Assessment with answers.
- [ ] Beginner/intermediate/advanced interview questions.
- [ ] Production decision framework.
- [ ] Testing checklist.
- [ ] Final self-verification.

## Self Check

- [ ] I can explain `useMemo` without calling it a magic performance switch.
- [ ] I know it memoizes a value/calculation result.
- [ ] I understand dependency and reference equality.
- [ ] I know why calculations must be pure.
- [ ] I can identify unstable dependencies.
- [ ] I know when not to use it.
- [ ] I can distinguish it from `useCallback` and `React.memo`.
- [ ] I can measure before claiming an optimization.

## Day 31 Outcome

You can now make an evidence-based decision about memoization instead of mechanically adding `useMemo`.

**Next:** Day 32 — `useCallback`, function identity, memoized children, stale closures, and callback dependency design.