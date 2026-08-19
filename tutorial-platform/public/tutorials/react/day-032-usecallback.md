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
- [useCallback Does Not Stop Parent Rendering](#usecallback-does-not-stop-parent-rendering)
- [React.memo + useCallback](#reactmemo--usecallback)
- [Dependencies and Closures](#dependencies-and-closures)
- [Functional State Updates](#functional-state-updates)
- [Referential Stability](#referential-stability)
- [useCallback vs useMemo vs React.memo](#usecallback-vs-usememo-vs-reactmemo)
- [Custom Hooks](#custom-hooks)
- [Effects and Stable Dependencies](#effects-and-stable-dependencies)
- [When Not to Use useCallback](#when-not-to-use-usecallback)
- [React Compiler](#react-compiler)
- [Complete Practical](#complete-practical)
- [Hands-on Labs](#hands-on-labs)
- [Debugging Lab](#debugging-lab)
- [Common Mistakes](#common-mistakes)
- [Assessment Quiz](#assessment-quiz)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Production Checklist](#production-checklist)
- [Final Project](#final-project)
- [Self Check](#self-check)
- [Day 32 Outcome](#day-32-outcome)

## Goal

Understand **function identity**, how callback references affect memoized children and effect dependencies, how `useCallback` interacts with `React.memo`, how stale closures happen, and when manual callback memoization is unnecessary.

> `useCallback` is a performance optimization for caching a function reference. It is not a correctness mechanism, and it does not make the function itself execute faster.

## Prerequisites

- Day 1–31 completed
- React render/re-render model
- props and state
- `useState`
- `useEffect`
- `useMemo`
- `React.memo`
- functional state updates
- JavaScript closures and reference equality

## Learning Outcomes

By the end of this lesson you can:

- explain function identity with `Object.is`
- explain exactly what `useCallback` returns
- identify when a new callback reference matters
- combine `useCallback` with `React.memo` correctly
- write dependency arrays that match the callback's reactive inputs
- diagnose stale closures
- reduce dependencies safely with functional state updates
- understand callback identity in custom hooks and effects
- recognize when memoization adds complexity without benefit
- measure a rendering problem before optimizing it
- explain how React Compiler changes the role of manual memoization

## Core Mental Model

```text
Component renders
      ↓
function expression runs
      ↓
new function reference is normally created
      ↓
Does the reference cross an optimization boundary?
      │
   ┌──┴───────────────┐
   │                  │
  No                 Yes
   │                  │
Normal function   Does identity matter?
                      │
                     Yes
                      ↓
               useCallback may help
```

The key question is not:

> "Can I use `useCallback` here?"

It is:

> "Does this function's identity affect a real rendering, effect, or API-contract problem?"

## 1. Function Identity

Functions are objects. A function created during render normally receives a new reference on every render.

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

Object.is(A, B) → false
```

The function may contain identical code, but its identity is different.

## 2. What `useCallback` Does

```jsx
const handleSave = useCallback(() => {
  save(id);
}, [id]);
```

React returns the same cached function reference on later renders while its dependencies remain equal.

Important details:

- React returns the function; it does not call it for you.
- Dependencies are compared using `Object.is`.
- Reactive values read by the callback should be represented in the dependency list.
- The hook is a performance optimization.
- React may discard cached values in specific situations, so do not use callback identity as durable application state.

## 3. useCallback Does Not Stop Parent Rendering

This is a common interview mistake.

```jsx
const handleSave = useCallback(() => save(id), [id]);
```

If `theme` changes, the component containing this callback still renders.

`useCallback` only helps React reuse the function reference. It does not prevent the component from rendering.

## 4. React.memo + useCallback

A memoized child can compare props and skip its own render when relevant props have not changed.

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
      <button onClick={() => setTheme((t) => t === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>
      <SaveButton onSave={handleSave} />
    </>
  );
}
```

When only `theme` changes, `handleSave` can keep the same reference, giving `SaveButton` an opportunity to skip its render.

### Important limitation

`useCallback` alone does not make a normal child stop rendering:

```jsx
const handleSave = useCallback(() => save(), []);
<NormalChild onSave={handleSave} />
```

If `NormalChild` renders whenever its parent renders, stable callback identity does not change that by itself.

Think:

```text
useCallback → stable function reference
React.memo  → possible render skip based on props
Both        → useful optimization boundary
```

## 5. Dependencies and Closures

A callback closes over the values from the render in which it was created.

This is incorrect if `userId` can change:

```jsx
const handleSave = useCallback(() => {
  save(userId);
}, []);
```

The callback can keep reading an old `userId`.

Correct:

```jsx
const handleSave = useCallback(() => {
  save(userId);
}, [userId]);
```

The dependency list should describe the reactive values the callback reads from its surrounding component scope.

### Dependency comparison

For objects and functions, identity matters:

```jsx
const options = { mode: "fast" };

const run = useCallback(() => {
  execute(options);
}, [options]);
```

`options` is a new object every render, so the callback may also be recreated every render.

Possible designs include moving stable constants outside the component, depending on primitive values, or redesigning the API.

Do not remove dependencies merely to make the callback stable.

## 6. Functional State Updates

Functional updates can safely remove a dependency when the callback only needs the previous state.

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

The second version does not read `items` from the closure. React supplies the latest state to the updater.

This is a **dependency reduction technique**, not a reason to blindly prefer empty arrays.

## 7. Referential Stability

Stable callback identity can matter when a function is:

- passed to a `React.memo` child
- used as a dependency of an effect or another hook
- returned by a custom hook as part of a stable API contract
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

If `refresh` changes only when `accountId` changes, the effect does not needlessly rerun because of a newly created function on every render.

However, always ask whether restructuring the effect or moving the function inside it would be simpler. Memoization is not automatically the best fix.

## 8. useCallback vs useMemo vs React.memo

```jsx
const total = useMemo(() => calculateTotal(items), [items]);

const save = useCallback(() => saveItems(items), [items]);

const Child = memo(function Child(props) {
  return <div />;
});
```

Mental model:

```text
useMemo
  → caches a calculated value

useCallback
  → caches a function reference

React.memo
  → can skip a component render when props are unchanged
```

A useful conceptual equivalence is:

```jsx
useCallback(fn, deps)
```

being similar in intent to:

```jsx
useMemo(() => fn, deps)
```

but `useCallback` is the clearer API for function references.

## 9. Custom Hooks

A custom hook may expose stable actions when identity is part of its useful contract.

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return { count, increment };
}
```

A custom hook does **not** need to memoize every returned function by default.

Ask whether consumers compare the function identity or use it as a dependency. If not, a normal function may be clearer.

## 10. Stable Callback Does Not Mean Stable Everything

This optimization can still fail:

```jsx
const handleSelect = useCallback(() => {}, []);

const config = { pageSize: 20 };

<Table
  onSelect={handleSelect}
  config={config}
/>
```

Even if `onSelect` is stable, `config` is a new object on every render.

A memoized child may still render because **one changing prop is enough to invalidate the shallow comparison**.

Better first consider a smaller prop contract:

```jsx
<Table pageSize={20} onSelect={handleSelect} />
```

## 11. Callback Functions Inside Lists

This is a subtle identity issue:

```jsx
items.map((item) => (
  <Row
    key={item.id}
    onSelect={() => handleSelect(item.id)}
  />
))
```

`handleSelect` can be stable while each inline arrow function is still a new function.

Do not automatically solve this by trying to call `useCallback` inside `.map()`—Hooks cannot be called conditionally or inside loops.

Instead consider:

- moving the handler into the row component
- passing `item.id` as a prop and letting the row handle the event
- redesigning the child API
- relying on React Compiler when available

## 12. When Not to Use useCallback

Prefer a normal function when:

- the child is not memoized
- callback identity has no observable effect
- there is no relevant effect/library dependency
- the component is inexpensive
- profiling shows no meaningful problem
- the memoized dependency list makes the code harder to reason about

Memoization has a maintenance cost. More hooks do not automatically mean better performance.

## 13. React Compiler

Modern React includes **React Compiler**, which can automatically optimize components, values, and function references at build time. The official React guidance says new code should generally rely on the compiler for memoization where it is enabled, while `useCallback` remains useful when developers need precise manual control. citeturn0search0turn0search2

This means a modern decision process is:

```text
Is there a performance problem?
        ↓
Profile / understand it
        ↓
Is React Compiler enabled and handling it?
        ├─ Yes → prefer simple code unless precise control is needed
        └─ No  → consider manual memoization
```

Do not teach learners that every modern React component should contain `useCallback`.

## 14. Complete Practical

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

When only `theme` changes, `addItem` keeps its reference. Because `ActionPanel` is memoized and its relevant prop is unchanged, it has an opportunity to skip rendering.

## 15. Callback API Design

Prefer explicit contracts:

```jsx
<DataTable
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  onRowSelect={handleRowSelect}
/>
```

rather than one ambiguous callback:

```jsx
<DataTable onChange={handleEverything} />
```

A stable reference can help performance, but **a clear component API is more important than memoization**.

## 16. Debugging Render Optimization

Use temporary markers:

```jsx
console.count("ActionPanel render");
```

Then change exactly one parent state variable at a time.

Use React DevTools Profiler to answer:

1. Did the child actually render?
2. Was the render expensive?
3. Which prop changed?
4. Did `useCallback` change the result?
5. Did another prop still invalidate memoization?

Do not use console counts as a substitute for profiling a real performance problem.

## Hands-on Labs

### Lab 1 — Reference Test

Compare a callback reference before and after an unrelated state update with and without `useCallback`.

### Lab 2 — Memoized Child

Wrap a child in `memo`. Toggle unrelated parent state and verify whether the child renders.

### Lab 3 — Stale Closure

Remove a required dependency, demonstrate the stale value, then fix the dependency list.

### Lab 4 — Functional Update

Refactor a callback that reads previous state so the dependency can safely be removed using a functional updater.

### Lab 5 — Broken Optimization

Create a memoized child with one stable callback and one newly created object prop. Identify why the child still renders.

### Lab 6 — List Callback Identity

Build a list where each row receives an inline callback. Move the interaction boundary into the row and compare the render behavior.

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

## Common Mistakes

### Mistake 1: `useCallback` everywhere

Ten memoized handlers do not automatically make an application fast.

### Mistake 2: Empty dependency array for convenience

`[]` is correct only when the callback does not need changing reactive values from the surrounding render.

### Mistake 3: Missing dependencies

Can create stale closures and incorrect behavior.

### Mistake 4: Assuming stable callback means stable child

Other props, state, or context can still cause the child to render.

### Mistake 5: Calling Hooks inside loops

Never call `useCallback` inside `.map()`, loops, conditions, or nested callbacks.

### Mistake 6: Mutating state

Wrong:

```jsx
items.push(item);
setItems(items);
```

Prefer immutable functional updates:

```jsx
setItems((current) => [...current, item]);
```

### Mistake 7: Using `useCallback` to fix correctness

If the application only works because a callback happens to retain identity, investigate the underlying state/effect design.

### Mistake 8: Assuming `useCallback` makes the function faster

It caches the function reference; it does not optimize the function's algorithm.

## Assessment Quiz

1. What does `useCallback` cache?
2. Does `useCallback` prevent the parent component from rendering?
3. Why is `React.memo` often relevant?
4. What is a stale closure?
5. How can functional state updates reduce dependencies?
6. How are dependencies compared?
7. Why can overusing `useCallback` hurt maintainability?
8. When should a custom hook return a memoized callback?
9. Why can a memoized child still render even when its callback prop is stable?
10. Why can't `useCallback` be called inside a loop?
11. How would you verify that memoization helped?
12. How does React Compiler affect the need for manual `useCallback`?

## Interview Questions and Answers

**Q: Why does a memoized child care about callback identity?**  
Because `memo` compares props, and a newly created function is a different reference even when its behavior is identical.

**Q: Is `useCallback` useful if the child is not memoized?**  
Usually it provides little render-skipping value for that child. There can be other reasons, such as a stable dependency for another hook or library contract, but those should be intentional.

**Q: What is the safest way to update state from a memoized callback?**  
Use a functional state update when the next value depends on previous state.

**Q: Can `useCallback` make a slow function fast?**  
No. It caches the function reference. Optimize the function's algorithm or computation separately.

**Q: How do `useMemo`, `useCallback`, and `React.memo` differ?**  
`useMemo` caches a calculated value, `useCallback` caches a function reference, and `React.memo` can skip a component render when its props are unchanged.

**Q: Why can `[options]` be ineffective when `options` is created during render?**  
Because the object gets a new reference on each render, so the dependency changes even if its fields contain the same values.

**Q: Can I use `useCallback` in `.map()`?**  
No. Hooks must be called at the top level of a component or custom Hook. Move the callback boundary into a child component or redesign the API.

**Q: Is `useCallback` required in React Compiler applications?**  
No. React Compiler can automatically memoize values and functions. Manual `useCallback` remains an option when precise control is needed. citeturn0search0turn0search2

## Production Checklist

Before adding `useCallback`, confirm:

- [ ] There is a real or strongly justified performance problem.
- [ ] Callback identity crosses a meaningful boundary.
- [ ] The receiving child is memoized, or another consumer actually relies on identity.
- [ ] Dependencies are complete.
- [ ] Dependencies are reasonably stable.
- [ ] A functional state update can simplify dependencies where appropriate.
- [ ] The callback remains pure until invoked.
- [ ] The optimization was measured or can be clearly justified.
- [ ] React Compiler behavior has been considered if the project uses it.
- [ ] The added complexity is worth the benefit.

## Final Project

Build a **Memoized Admin Dashboard** with:

- parent theme state
- memoized table
- 1,000+ rows
- stable row-level actions where justified
- at least one `React.memo` boundary
- one intentionally broken memoization case
- Profiler comparison before/after
- dependency/stale-closure demonstration
- written explanation of which memoization was justified
- optional React Compiler comparison if the project supports it

Document:

- the bottleneck
- the callback identity problem
- dependencies
- why `useCallback` was chosen
- measured result
- what happens when `useCallback` is removed
- whether the same optimization is handled automatically by React Compiler

## Self Check

- [ ] I understand function reference identity.
- [ ] I can explain exactly what `useCallback` caches.
- [ ] I understand why `React.memo` and `useCallback` often work together.
- [ ] I can write correct dependency arrays.
- [ ] I understand stale closures.
- [ ] I can use functional updates to reduce dependencies safely.
- [ ] I understand why a stable callback does not guarantee a stable child.
- [ ] I know Hooks cannot be called inside loops.
- [ ] I know when not to use `useCallback`.
- [ ] I can measure before claiming a performance improvement.
- [ ] I understand the role of React Compiler.

## Day 32 Outcome

You can now reason about callback identity, dependency correctness, stale closures, memoized child rendering, custom-hook APIs, and the limits of manual memoization.

Day 33 moves from individual performance optimizations to **reusable stateful logic with custom Hooks**.
