---
title: useCallback
slug: day-032-usecallback
dayLabel: Day 32
level: Intermediate
estimatedMinutes: 60
order: 32
track: react
---
# Day 32 [Intermediate]: `useCallback`

## Goal

Understand **function identity**, when callback references cause child renders, how `useCallback` works with `React.memo`, and why blindly wrapping every handler is usually unnecessary.

## Prerequisites

- Day 31: `useMemo`
- props and state
- parent/child rendering
- `React.memo`
- functional state updates

## 1. Function Identity

Functions are objects. Creating a function during render normally creates a new reference.

```jsx
function Parent() {
  const handleSave = () => console.log("save");
  return <Child onSave={handleSave} />;
}
```

On another render, `handleSave` normally has a different reference.

```text
previous render: handleSave → function A
next render:     handleSave → function B
A !== B
```

That matters when a child compares props by reference.

## 2. What `useCallback` Does

```jsx
const handleSave = useCallback(() => {
  save(id);
}, [id]);
```

It returns a memoized function reference that React can reuse while dependencies remain equal.

It does **not**:

- make the function execute automatically
- make the function itself faster
- prevent the parent from rendering
- make every child memoized

## 3. The Important Combination: `React.memo` + `useCallback`

```jsx
const SaveButton = React.memo(function SaveButton({ onSave }) {
  console.log("SaveButton render");
  return <button onClick={onSave}>Save</button>;
});
```

Without a stable callback, a parent render can give `SaveButton` a new function prop and defeat shallow prop comparison.

```jsx
const onSave = useCallback(() => save(), []);
<SaveButton onSave={onSave} />
```

Now an unrelated parent state update can potentially let the memoized child skip rendering.

## 4. `useCallback` Does Not Work Alone

This does not automatically solve a rendering problem:

```jsx
const onSave = useCallback(() => save(), []);
<NormalChild onSave={onSave} />
```

If `NormalChild` is not memoized and its parent renders, it can still render.

Think:

```text
useCallback → stable function reference
React.memo  → opportunity to skip child render
Both        → useful optimization boundary
```

## 5. Dependencies and Closures

This is wrong when `userId` can change:

```jsx
const handleSave = useCallback(() => save(userId), []);
```

It can capture an old `userId`.

Correct:

```jsx
const handleSave = useCallback(() => save(userId), [userId]);
```

Or, if the callback only updates state from previous state, a functional update can remove a dependency:

```jsx
const addItem = useCallback((item) => {
  setItems((current) => [...current, item]);
}, []);
```

## 6. Dependency Safety Beats Empty Arrays

Do not use `[]` simply to force stability. The dependency list describes what the callback reads from its render scope.

Missing dependencies can create stale closures.

## 7. `useCallback` and Custom Hooks

A custom hook can expose stable actions when that is part of its API contract.

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return { count, increment };
}
```

Do this only when stable identity is useful to consumers. A custom hook does not need to memoize every returned function by default.

## 8. `useCallback` vs `useMemo`

```jsx
const total = useMemo(() => calculateTotal(items), [items]);

const save = useCallback(() => saveItems(items), [items]);
```

Equivalent mental model:

```jsx
const save = useMemo(() => () => saveItems(items), [items]);
```

`useCallback` is the readable API specifically for memoizing function references.

## 9. When Not to Use It

Prefer a normal function when:

- the child is not memoized
- the callback is not passed to a memoized child
- there is no measured performance issue
- the dependency complexity makes the code harder to understand

Premature memoization can increase cognitive overhead without meaningful benefit.

## 10. Complete Example

```jsx
import { memo, useCallback, useState } from "react";

const ActionPanel = memo(function ActionPanel({ onAdd }) {
  console.log("ActionPanel rendered");
  return (
    <button type="button" onClick={() => onAdd("React")}>Add</button>
  );
});

function App() {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");

  const addItem = useCallback((value) => {
    setItems((current) => [...current, value]);
  }, []);

  return (
    <main>
      <button type="button" onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>
      <p>Items: {items.length}</p>
      <ActionPanel onAdd={addItem} />
    </main>
  );
}
```

Changing `theme` does not change `addItem`'s reference, so the memoized child has an opportunity to skip its render.

## 11. Callback API Design

Prefer explicit contracts:

```jsx
<DataTable
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  onRowSelect={handleRowSelect}
/>
```

rather than one generic callback with an ambiguous payload.

A stable reference is useful, but a **clear API is more important than memoization**.

## 12. Common Mistakes

### Mistake 1: `useCallback` everywhere

Memoizing ten handlers does not automatically make an application fast.

### Mistake 2: Missing dependencies

Can produce stale closures.

### Mistake 3: Assuming stable callback means stable child

Other props can still change.

### Mistake 4: Mutating state inside callback

```jsx
items.push(item);
setItems(items);
```

Use a functional immutable update instead.

### Mistake 5: Using callback for side effects during render

A callback is an event/imperative action. It is not a replacement for `useEffect`.

## 13. Debugging Render Optimization

Add temporary render markers:

```jsx
console.count("ActionPanel render");
```

Then change one parent state variable at a time.

Use React DevTools Profiler to identify whether the child render is actually expensive and whether memoization changes the result.

## Hands-on Labs

### Lab 1 — Reference Test
Log a callback before and after an unrelated parent state update. Compare behavior with and without `useCallback`.

### Lab 2 — Memoized Child
Wrap the child with `memo`, then verify whether theme changes still render it.

### Lab 3 — Stale Closure
Intentionally remove a dependency and demonstrate the incorrect value. Restore the dependency or redesign with a functional update.

### Lab 4 — Remove Optimization
Take a working `useCallback` example and remove it. Decide whether the resulting difference is important enough to justify the complexity.

## Assessment

1. What does `useCallback` memoize?
2. Does it stop parent renders?
3. Why is `React.memo` often relevant?
4. What is a stale closure?
5. How can functional updates reduce dependencies?
6. Why can overusing `useCallback` be harmful?
7. When should a custom hook return memoized callbacks?
8. How would you verify the optimization?

## Interview Questions

**Q: Why does a memoized child care about callback identity?**  
Because `React.memo` compares props and a newly created function is a different reference.

**Q: Is `useCallback` useful if the child is not memoized?**  
Usually it provides little render-skipping value for that child. There may be other API-specific reasons, but do not assume it is needed.

**Q: What is the safest way to update state from a memoized callback?**  
Use a functional state update when the next value depends on previous state.

**Q: Can `useCallback` make a slow function fast?**  
No. It memoizes the function reference; it does not optimize the function's algorithm.

**Q: How do `useMemo`, `useCallback`, and `React.memo` differ?**  
`useMemo` caches a calculated value, `useCallback` caches a function reference, and `React.memo` can skip a component render when its props are considered unchanged.

## Final Project

Build a **Memoized Admin Dashboard**:

- parent theme state
- memoized table
- memoized row actions
- stable callbacks
- 1,000+ rows
- Profiler comparison
- a written explanation of which memoization was justified

## Self Check

- [ ] I understand function reference identity.
- [ ] I can explain why `React.memo` and `useCallback` often work together.
- [ ] I can write correct dependency arrays.
- [ ] I understand stale closures.
- [ ] I know when not to use `useCallback`.
- [ ] I can measure before claiming a performance improvement.

## Day 32 Outcome

You can now reason about callback identity and memoized child rendering. Day 33 moves from individual optimizations to **reusable stateful logic with custom hooks**.