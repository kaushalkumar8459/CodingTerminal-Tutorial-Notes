---
title: useCallback
slug: day-032-usecallback
dayLabel: Day 32
level: Intermediate
estimatedMinutes: 150
order: 32
track: react
---
# Day 32 [Intermediate]: `useCallback`

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Function Identity](#function-identity)
- [What useCallback Does](#what-usecallback-does)
- [React.memo + useCallback](#reactmemo--usecallback)
- [Dependencies and Closures](#dependencies-and-closures)
- [Functional State Updates](#functional-state-updates)
- [Referential Stability](#referential-stability)
- [useCallback vs useMemo vs React.memo](#usecallback-vs-usememo-vs-reactmemo)
- [Custom Hooks](#custom-hooks)
- [Stable Callback Does Not Mean Stable Everything](#stable-callback-does-not-mean-stable-everything)
- [Callback Functions Inside Lists](#callback-functions-inside-lists)
- [When Not to Use useCallback](#when-not-to-use-usecallback)
- [React Compiler](#react-compiler)
- [Complete Practical](#complete-practical)
- [Callback API Design](#callback-api-design)
- [Debugging Render Optimization](#debugging-render-optimization)
- [Hands-on Labs](#hands-on-labs)
- [Debugging Lab](#debugging-lab)
- [Common Mistakes](#common-mistakes)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Production Checklist](#production-checklist)
- [Final Project](#final-project)
- [Self Check](#self-check)
- [Day 32 Outcome](#day-32-outcome)

## Goal

Understand **function identity**, when callback references cause child renders, how `useCallback` works with `React.memo`, why stale closures happen, and why blindly wrapping every handler is usually unnecessary.

> `useCallback` is a performance optimization for caching a function reference. It is not a correctness mechanism and does not make the function itself faster.

## Prerequisites

- Day 31: `useMemo`
- props and state
- parent/child rendering
- `React.memo`
- `useEffect`
- functional state updates
- JavaScript closures and reference equality

## Learning Outcomes

By the end of this lesson you can:

- explain function identity and `Object.is`
- explain exactly what `useCallback` caches
- use `useCallback` with `React.memo` intentionally
- write complete dependency arrays
- diagnose stale closures
- reduce dependencies safely with functional state updates
- reason about stable callbacks in effects and custom hooks
- recognize when another prop still breaks memoization
- avoid calling Hooks inside loops or conditions
- measure before claiming a performance improvement
- explain how React Compiler changes manual memoization decisions

## Core Mental Model

```text
Component renders
      ↓
function expression normally creates a new reference
      ↓
Does function identity matter?
      │
   ┌──┴─────────────┐
   │                │
  No               Yes
   │                │
normal function   useCallback may help
                    │
             usually with a consumer
             such as React.memo
```

The key question is not "Can I use `useCallback`?" but:

> Does this function's identity affect a real rendering, effect, or API-contract problem?

## 1. Function Identity

Functions are objects. Creating a function during render normally creates a new reference.

```jsx
function Parent() {
  const handleSave = () => console.log("save");
  return <Child onSave={handleSave} />;
}
```

Conceptually:

```text
previous render: handleSave → Function A
next render:     handleSave → Function B
A !== B
```

The function may contain identical code, but its identity is different. Identity matters when another system compares the reference.

## 2. What `useCallback` Does

```jsx
const handleSave = useCallback(() => {
  save(id);
}, [id]);
```

It returns a cached function reference that React can reuse while dependencies remain equal.

It does **not**:

- execute the function automatically
- make the function's algorithm faster
- prevent the parent from rendering
- automatically memoize the child
- guarantee permanent identity

Dependencies are compared using `Object.is`. React may discard cached values in specific situations, so callback identity must not be treated as durable application state.

## 3. The Important Combination: `React.memo` + `useCallback`

```jsx
import { memo, useCallback, useState } from "react";

const SaveButton = memo(function SaveButton({ onSave }) {
  console.log("SaveButton render");
  return <button onClick={onSave}>Save</button>;
});

function Parent() {
  const [theme, setTheme] = useState("light");

  const handleSave = useCallback(() => {
    console.log("saved");
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}
      >
        Theme: {theme}
      </button>
      <SaveButton onSave={handleSave} />
    </>
  );
}
```

Changing only `theme` does not change `handleSave`'s reference, so the memoized child has an opportunity to skip its render.

### Important limitation

This does not automatically solve a rendering problem:

```jsx
const onSave = useCallback(() => save(), []);
<NormalChild onSave={onSave} />
```

If `NormalChild` is not memoized, it can still render when its parent renders.

Think:

```text
useCallback → stable function reference
React.memo  → opportunity to skip child render
Both        → useful optimization boundary
```

## 4. Dependencies and Closures

A callback closes over values from the render in which it was created.

Wrong when `userId` can change:

```jsx
const handleSave = useCallback(() => save(userId), []);
```

It can capture an old `userId`.

Correct:

```jsx
const handleSave = useCallback(() => save(userId), [userId]);
```

The dependency list should include reactive values read by the callback.

### Object and function dependencies

```jsx
const options = { mode: "fast" };

const run = useCallback(() => {
  execute(options);
}, [options]);
```

`options` is recreated on every render, so the callback can also be recreated every render.

Prefer stable primitives, moving constants outside the component, or redesigning the API where appropriate. Do not remove dependencies merely to force stability.

## 5. Functional State Updates

Instead of:

```jsx
const addItem = useCallback((item) => {
  setItems([...items, item]);
}, [items]);
```

use:

```jsx
const addItem = useCallback((item) => {
  setItems((current) => [...current, item]);
}, []);
```

The callback no longer reads `items` from its closure, so the dependency can safely be removed.

This is a **dependency reduction technique**, not a reason to use empty arrays everywhere.

## 6. Referential Stability

Stable callback identity can matter when a function is:

- passed to a `React.memo` child
- used as a dependency of an effect or another Hook
- returned by a custom Hook as part of a stable API contract
- consumed by an external library that relies on reference identity

Example:

```jsx
const refresh = useCallback(() => {
  loadData(accountId);
}, [accountId]);

useEffect(() => {
  refresh();
}, [refresh]);
```

If `refresh` changes only when `accountId` changes, the effect does not rerun merely because the component rendered.

However, sometimes the simpler solution is to move the function inside the effect rather than memoize it. Optimize the design, not just the reference.

## 7. `useCallback` vs `useMemo` vs `React.memo`

```text
useMemo
  → caches a calculated value

useCallback
  → caches a function reference

React.memo
  → can skip a component render when props are unchanged
```

Conceptually:

```jsx
useCallback(fn, deps)
```

is similar in intent to:

```jsx
useMemo(() => fn, deps)
```

`useCallback` is the readable API specifically for function references.

## 8. Custom Hooks

A custom Hook can expose stable actions when identity is part of its API contract.

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return { count, increment };
}
```

Do not memoize every returned function automatically. Stable identity should have a consumer-side reason.

## 9. Stable Callback Does Not Mean Stable Everything

```jsx
const handleSelect = useCallback(() => {}, []);
const config = { pageSize: 20 };

<Table onSelect={handleSelect} config={config} />
```

Even with a stable callback, `config` is a new object each render. A memoized child can still render because another prop changed.

Prefer the smallest useful prop contract where possible:

```jsx
<Table pageSize={20} onSelect={handleSelect} />
```

## 10. Callback Functions Inside Lists

This creates a new function for every item on every render:

```jsx
items.map((item) => (
  <Row
    key={item.id}
    onSelect={() => handleSelect(item.id)}
  />
))
```

Do **not** call `useCallback` inside `.map()`. Hooks must be called at the top level of a component or custom Hook.

Consider instead:

- moving the event boundary into `Row`
- passing `item.id` and letting `Row` create its own handler
- redesigning the child API
- relying on React Compiler where appropriate

## 11. When Not to Use It

Prefer a normal function when:

- the child is not memoized
- callback identity has no observable effect
- there is no relevant effect/library dependency
- the component is inexpensive
- profiling shows no meaningful problem
- dependency complexity makes the code harder to understand

Premature memoization can increase cognitive overhead without meaningful benefit.

## 12. React Compiler

Modern React includes **React Compiler**, a build-time optimization tool that can automatically memoize components, values, and functions. When React Compiler is enabled, prefer simple code and let the compiler handle routine memoization where appropriate. Manual `useCallback` remains useful when you need explicit control or when a library/API contract requires a stable function reference.

Official reference: [React Compiler](https://react.dev/learn/react-compiler/introduction)

Decision model:

```text
Performance problem?
      ↓
Profile / understand it
      ↓
React Compiler enabled?
   ┌──┴───────┐
  Yes        No
   │           │
Prefer      Consider
simple      manual
code        memoization
   │           │
   └─────┬─────┘
         ↓
Verify the result
```

Do not teach learners that every React handler needs `useCallback`.

## 13. Complete Practical

```jsx
import { memo, useCallback, useState } from "react";

const ActionPanel = memo(function ActionPanel({ onAdd }) {
  console.log("ActionPanel rendered");

  return (
    <button type="button" onClick={() => onAdd("React")}>
      Add React
    </button>
  );
});

function App() {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");

  const addItem = useCallback((value) => {
    setItems((current) => [...current, value]);
  }, []);

  return (
    <main className={theme}>
      <button
        type="button"
        onClick={() =>
          setTheme((current) => current === "light" ? "dark" : "light")
        }
      >
        Theme: {theme}
      </button>

      <p>Items: {items.length}</p>
      <ActionPanel onAdd={addItem} />
    </main>
  );
}
```

Changing `theme` does not change `addItem`'s reference, so the memoized child has an opportunity to skip its render.

## 14. Callback API Design

Prefer explicit contracts:

```jsx
<DataTable
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  onRowSelect={handleRowSelect}
/>
```

rather than one generic callback with an ambiguous payload.

A stable reference is useful, but a clear API is more important than memoization.

## 15. Debugging Render Optimization

Use temporary markers:

```jsx
console.count("ActionPanel render");
```

Then change one parent state variable at a time.

Use React DevTools Profiler to identify:

- whether the child actually rendered
- whether the render was expensive
- which prop changed
- whether `useCallback` changed the result
- whether another prop still invalidated memoization

Console counts are useful for learning, but profiling should support real performance claims.

## Hands-on Labs

### Lab 1 — Reference Test

Compare a callback reference before and after an unrelated state update with and without `useCallback`.

### Lab 2 — Memoized Child

Wrap the child with `memo`, toggle unrelated parent state, and verify the render behavior.

### Lab 3 — Stale Closure

Remove a dependency, demonstrate the stale value, then restore the dependency.

### Lab 4 — Functional Update

Refactor a callback so a functional state update safely removes an unnecessary dependency.

### Lab 5 — Broken Optimization

Give a memoized child one stable callback and one newly created object prop. Identify why the child still renders.

### Lab 6 — List Callback Identity

Build a list with inline row callbacks. Move the interaction boundary into the row and compare the render behavior.

## Debugging Lab

### Bug A — Missing dependency

```jsx
const save = useCallback(() => {
  submit(userId);
}, []);
```

**Task:** Explain why changing `userId` can leave the callback with an old value.

### Bug B — False optimization

```jsx
const onSave = useCallback(() => save(), []);
<NormalChild onSave={onSave} />
```

**Task:** Explain why this does not automatically prevent `NormalChild` from rendering.

### Bug C — New prop breaks memoization

```jsx
const onSave = useCallback(() => save(), []);
const options = { mode: "fast" };

<MemoChild onSave={onSave} options={options} />
```

**Task:** Identify the changing reference and propose a simpler prop contract.

### Bug D — Hook inside loop

```jsx
items.map((item) => {
  const callback = useCallback(() => select(item.id), [item.id]);
  return <Row key={item.id} onSelect={callback} />;
});
```

**Task:** Explain why this violates the Rules of Hooks and redesign the component boundary.

## Common Mistakes

### Mistake 1: `useCallback` everywhere

Memoizing many handlers does not automatically make an application fast.

### Mistake 2: Empty dependency array for convenience

`[]` is correct only when the callback does not need changing reactive values from the surrounding render.

### Mistake 3: Missing dependencies

Can produce stale closures and incorrect behavior.

### Mistake 4: Assuming stable callback means stable child

Other props, state, or context can still cause a render.

### Mistake 5: Mutating state

Wrong:

```jsx
items.push(item);
setItems(items);
```

Prefer:

```jsx
setItems((current) => [...current, item]);
```

### Mistake 6: Using `useCallback` to fix correctness

If the application only works because a callback retains identity, investigate the underlying state/effect design.

### Mistake 7: Assuming `useCallback` makes a function faster

It caches the reference; it does not optimize the algorithm.

## Assessment

1. What does `useCallback` memoize?
2. Does it stop parent renders?
3. Why is `React.memo` often relevant?
4. What is a stale closure?
5. How can functional updates reduce dependencies?
6. How are dependencies compared?
7. Why can overusing `useCallback` hurt maintainability?
8. When should a custom Hook return memoized callbacks?
9. Why can a memoized child still render when its callback is stable?
10. Why can't `useCallback` be called inside a loop?
11. How would you verify the optimization?
12. How does React Compiler affect manual `useCallback` usage?

## Interview Questions

**Q: Why does a memoized child care about callback identity?**  
Because `React.memo` compares props and a newly created function is a different reference.

**Q: Is `useCallback` useful if the child is not memoized?**  
Usually it provides little render-skipping value for that child. Other intentional consumers may still care about identity.

**Q: What is the safest way to update state from a memoized callback?**  
Use a functional state update when the next value depends on previous state.

**Q: Can `useCallback` make a slow function fast?**  
No. It memoizes the function reference; optimize the function itself separately.

**Q: How do `useMemo`, `useCallback`, and `React.memo` differ?**  
`useMemo` caches a calculated value, `useCallback` caches a function reference, and `React.memo` can skip a component render when props are considered unchanged.

**Q: Why might `[options]` fail to provide stability?**  
If `options` is recreated during render, its reference changes every render.

**Q: Can I use `useCallback` inside `.map()`?**  
No. Hooks must be called at the top level of a component or custom Hook.

**Q: Is `useCallback` required when React Compiler is enabled?**  
No. The compiler can automatically memoize functions. Manual `useCallback` remains available when precise control is needed.

## Production Checklist

Before adding `useCallback`:

- [ ] There is a real or strongly justified performance problem.
- [ ] Callback identity crosses a meaningful boundary.
- [ ] The receiving child is memoized, or another consumer intentionally relies on identity.
- [ ] Dependencies are complete.
- [ ] Dependencies are reasonably stable.
- [ ] A functional updater can simplify dependencies where appropriate.
- [ ] The callback does not perform side effects during render.
- [ ] The optimization is measured or clearly justified.
- [ ] React Compiler behavior has been considered when applicable.
- [ ] The complexity is worth the benefit.

## Final Project

Build a **Memoized Admin Dashboard** with:

- parent theme state
- memoized table
- 1,000+ rows
- stable callbacks where justified
- at least one `React.memo` boundary
- one intentionally broken memoization case
- Profiler comparison before/after
- stale-closure demonstration
- written explanation of which memoization was justified
- optional React Compiler comparison

Document:

- the bottleneck
- the callback identity problem
- dependencies
- why `useCallback` was chosen
- measured result
- what happens when it is removed
- whether React Compiler handles the same optimization

## Self Check

- [ ] I understand function reference identity.
- [ ] I can explain exactly what `useCallback` caches.
- [ ] I understand why `React.memo` and `useCallback` often work together.
- [ ] I can write correct dependency arrays.
- [ ] I understand stale closures.
- [ ] I can use functional updates to reduce dependencies safely.
- [ ] I know a stable callback does not guarantee a stable child.
- [ ] I know Hooks cannot be called inside loops.
- [ ] I know when not to use `useCallback`.
- [ ] I can measure before claiming a performance improvement.
- [ ] I understand the role of React Compiler.

## Day 32 Outcome

You can now reason about callback identity, dependency correctness, stale closures, memoized child rendering, custom Hook APIs, and the limits of manual memoization.

Day 33 builds on this by moving from individual performance optimizations to **reusable stateful logic with custom Hooks**.
