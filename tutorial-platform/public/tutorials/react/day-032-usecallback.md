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

## Goal

Understand function identity, stale closures, dependency design, and when `useCallback` is actually useful. `useCallback` caches a function reference; it does not make the function algorithm faster and does not itself prevent renders.

## Prerequisites

- Day 31: `useMemo`
- props, state, rendering and closures
- `React.memo`
- `useEffect`
- functional state updates
- JavaScript reference equality

## Learning Outcomes

By the end of this lesson you can:

- explain function identity and `Object.is`
- explain exactly what `useCallback` caches
- use it with `React.memo` intentionally
- write complete dependency arrays
- diagnose stale closures
- reduce dependencies safely with functional state updates
- reason about callback identity in effects and custom Hooks
- identify other props that can still invalidate memoization
- avoid Hooks inside loops and conditions
- measure before claiming a performance improvement
- understand how React Compiler affects manual memoization decisions

## Core Mental Model

A function created during render normally gets a new reference:

```text
render 1 → function A
render 2 → function B
A !== B
```

`useCallback` can preserve the reference while its dependencies are unchanged:

```jsx
const onSave = useCallback(() => save(userId), [userId]);
```

The important question is not "Can I memoize this?" but:

> Does this function's identity affect a real consumer such as a memoized child, an effect dependency, or an API contract?

## `useCallback` vs `useMemo` vs `React.memo`

| Tool | Memoizes | Main purpose |
|---|---|---|
| `useCallback` | function reference | preserve callback identity |
| `useMemo` | calculated value | avoid repeated calculation |
| `React.memo` | component rendering opportunity | skip a child render when props are equal |

`useCallback` does **not** stop the parent from rendering, and it does not automatically memoize the child.

## Function Identity

```jsx
function Parent() {
  const handleSave = () => console.log("save");
  return <Child onSave={handleSave} />;
}
```

Even though the function's source is unchanged, each render normally creates a different function object. This matters only when something observes that identity.

## `React.memo` + `useCallback`

```jsx
import { memo, useCallback, useState } from "react";

const SaveButton = memo(function SaveButton({ onSave }) {
  return <button onClick={onSave}>Save</button>;
});

function Parent() {
  const [theme, setTheme] = useState("light");

  const handleSave = useCallback(() => {
    console.log("saved");
  }, []);

  return (
    <>
      <button type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>
      <SaveButton onSave={handleSave} />
    </>
  );
}
```

When only `theme` changes, `handleSave` keeps its reference, giving the memoized child an opportunity to skip its render.

## Dependencies and Closures

Callbacks capture values from their render.

Wrong:

```jsx
const handleSave = useCallback(() => save(userId), []);
```

If `userId` changes, the callback can retain the old value.

Correct:

```jsx
const handleSave = useCallback(() => save(userId), [userId]);
```

Do not remove dependencies simply to make a callback stable. A stable but stale callback is an incorrect optimization.

## Functional State Updates

This callback depends on `items`:

```jsx
const addItem = useCallback((item) => {
  setItems([...items, item]);
}, [items]);
```

A functional updater removes the need to read `items` from the closure:

```jsx
const addItem = useCallback((item) => {
  setItems((current) => [...current, item]);
}, []);
```

This is a legitimate dependency-reduction technique. It is **not** a rule that every callback should use `[]`.

## Referential Stability

Stable callback identity can matter when a callback is:

- passed to a `React.memo` child
- used as a dependency of another Hook
- returned by a custom Hook as part of an intentional API contract
- consumed by a library that compares references

Example:

```jsx
const refresh = useCallback(() => loadData(accountId), [accountId]);

useEffect(() => {
  refresh();
}, [refresh]);
```

Sometimes the simpler design is to define the function inside the effect instead of memoizing it. Prefer the simplest correct dependency graph.

## Stable Callback Does Not Mean Stable Everything

```jsx
const onSelect = useCallback(() => select(id), [id]);
const options = { pageSize: 20 };

<MemoizedTable onSelect={onSelect} options={options} />
```

`options` is recreated on every render. A memoized child may still render even though `onSelect` is stable.

Prefer a smaller primitive prop contract when possible:

```jsx
<MemoizedTable onSelect={onSelect} pageSize={20} />
```

## Callbacks in Lists

Do not call Hooks inside `.map()`:

```jsx
// Invalid
items.map((item) => {
  const callback = useCallback(() => select(item.id), [item.id]);
  return <Row key={item.id} onSelect={callback} />;
});
```

Instead move the interaction boundary into the row:

```jsx
const Row = memo(function Row({ id, onSelect }) {
  return (
    <button type="button" onClick={() => onSelect(id)}>
      Select
    </button>
  );
});
```

## Custom Hooks

A custom Hook can expose stable actions when callers benefit from identity stability:

```jsx
function useCounter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((current) => current + 1);
  }, []);

  return { count, increment };
}
```

Do not memoize every returned function automatically. There should be a consumer-side reason.

## When Not to Use `useCallback`

Prefer a normal function when:

- the child is not memoized
- callback identity has no observable effect
- there is no effect/library dependency that cares about identity
- the component is inexpensive
- profiling shows no meaningful problem
- dependency complexity makes the code harder to understand

Memoization has bookkeeping and cognitive costs.

## React Compiler

React Compiler can automatically optimize some components, values, and functions when configured for the project. This can reduce the amount of manual memoization required, but it does not remove the need to understand dependency correctness.

Use this decision model:

```text
Performance problem?
        ↓
Measure / profile
        ↓
Compiler enabled?
   ┌────┴─────┐
  Yes        No
   ↓          ↓
Prefer     Consider
simple     manual
code       memoization
        ↓
Verify the result
```

Do not teach or enforce `useCallback` on every handler. Follow the project's configured React tooling and verify performance.

## Complete Practical

```jsx
import { memo, useCallback, useState } from "react";

const ActionPanel = memo(function ActionPanel({ onAdd }) {
  return (
    <button type="button" onClick={() => onAdd("React")}>
      Add React
    </button>
  );
});

export default function App() {
  const [items, setItems] = useState([]);
  const [theme, setTheme] = useState("light");

  const addItem = useCallback((value) => {
    setItems((current) => [...current, value]);
  }, []);

  return (
    <main className={theme}>
      <button type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}>
        Theme: {theme}
      </button>
      <p>Items: {items.length}</p>
      <ActionPanel onAdd={addItem} />
    </main>
  );
}
```

## Callback API Design

Prefer explicit contracts:

```jsx
<DataTable
  onPageChange={handlePageChange}
  onSortChange={handleSortChange}
  onRowSelect={handleRowSelect}
/>
```

A clear API is more important than memoization. Stable identity should support a real contract or performance boundary.

## Debugging Render Optimization

Use React DevTools Profiler to determine whether the child rendered, which prop changed, whether the render was expensive, and whether `useCallback` changed the result. Temporary `console.count` markers are useful for learning but are not sufficient evidence for production performance claims.

## Hands-on Labs

1. Compare callback identity across unrelated state updates.
2. Pair `useCallback` with `React.memo` and inspect child renders.
3. Reproduce and fix a stale closure.
4. Refactor a callback with a functional updater.
5. Find an unstable object prop that defeats memoization.
6. Move a list interaction boundary into the row component.

## Debugging Lab

### Bug A — Missing dependency

```jsx
const save = useCallback(() => submit(userId), []);
```

Explain why changing `userId` can leave the callback with an old value.

### Bug B — False optimization

```jsx
const onSave = useCallback(() => save(), []);
<NormalChild onSave={onSave} />
```

Explain why this does not automatically prevent `NormalChild` from rendering.

### Bug C — New prop breaks memoization

```jsx
const onSave = useCallback(() => save(), []);
const options = { mode: "fast" };
<MemoChild onSave={onSave} options={options} />
```

Identify the changing reference and propose a simpler contract.

### Bug D — Hook inside loop

Explain why calling `useCallback` inside `.map()` violates the Rules of Hooks and redesign the component boundary.

## Common Mistakes

1. Adding `useCallback` everywhere.
2. Using `[]` to hide dependency problems.
3. Omitting dependencies and creating stale closures.
4. Assuming stable callback identity makes every child prop stable.
5. Calling Hooks inside loops or conditions.
6. Using `useCallback` to fix a correctness bug.
7. Assuming `useCallback` makes a function algorithm faster.
8. Mutating state instead of using immutable updates.
9. Claiming performance improvements without profiling.
10. Ignoring project-level React Compiler configuration.

## Assessment

1. What does `useCallback` memoize?
2. Does it prevent the parent from rendering?
3. Why is `React.memo` often relevant?
4. What is a stale closure?
5. How can functional updates reduce dependencies?
6. How are dependencies compared?
7. Why can overusing `useCallback` hurt maintainability?
8. When should a custom Hook return a stable callback?
9. Why can a stable callback still fail to prevent a child render?
10. Why are Hooks inside `.map()` invalid?
11. What should you measure before adding memoization?
12. How can React Compiler change manual memoization decisions?

### Answers

1. A function reference.
2. No. The parent can still render normally.
3. `React.memo` provides the child render-skipping boundary; a stable callback prevents that particular function prop from changing unnecessarily.
4. A callback uses values captured from an earlier render because its dependencies do not describe the values it reads.
5. A functional updater reads the latest state inside React's state transition, so the callback need not capture that state value.
6. Dependency values are compared using `Object.is` semantics.
7. It adds dependency bookkeeping and cognitive overhead without guaranteed benefit.
8. When consumers rely on stable identity, such as memoized children, effects, or an intentional Hook API contract.
9. Another prop, context, state, or parent/child design can still cause the render.
10. Hooks must be called in a consistent top-level order, not conditionally or per list item.
11. Actual render/calculation cost and user-visible performance using representative workloads.
12. In supported configured projects, the compiler can automate some memoization, reducing routine manual `useCallback` usage; correctness and profiling still matter.

## Interview Questions

### Beginner

**What is `useCallback`?** A Hook that can cache a function reference between renders while dependencies remain equal.

**Does `useCallback` make a function faster?** No. It primarily affects function identity.

### Intermediate

**Why pair `useCallback` with `React.memo`?** A memoized child compares props; a stable callback prevents that function prop from changing merely because the parent rendered.

**Why is an empty dependency array dangerous?** If the callback reads changing reactive values, it can retain stale values.

**How can functional state updates help?** They let the callback calculate next state from the latest previous state without capturing that state value.

### Advanced

**When is `useCallback` unnecessary?** When callback identity has no meaningful consumer or performance impact and the extra dependency bookkeeping is not justified.

**Can `useCallback` guarantee permanent function identity?** No. It is an optimization, not durable application state.

**How would you diagnose a memoized child that still renders?** Profile it, inspect which props changed, and check object/function references, context, local state, and component boundaries.

**Does React Compiler make `useCallback` obsolete?** Not universally. It can reduce manual memoization in configured projects, while explicit stable callbacks can remain useful for specific contracts and non-compiled code.

## Production Checklist

- [ ] Each `useCallback` has a concrete identity or performance reason.
- [ ] Dependencies are complete.
- [ ] Functional updates are used where they safely reduce dependencies.
- [ ] No Hook is called inside a loop or condition.
- [ ] Memoized children have meaningful render boundaries.
- [ ] Other unstable props have been considered.
- [ ] Callback APIs are semantic and explicit.
- [ ] Performance claims are backed by profiling.
- [ ] React Compiler configuration has been considered.
- [ ] Correctness does not depend on cached identity.

## Final Project

Build a searchable user table with memoized row components, stable row callbacks where profiling justifies them, search/filter state, edit/delete actions, functional state updates, an intentionally introduced stale-closure bug, and Profiler measurements before and after optimization.

Acceptance criteria:

- no Hooks inside loops
- complete dependencies
- stable keys
- immutable updates
- accessible controls
- measurable optimization reasoning
- no unnecessary `useCallback` calls

## Self Check

- [ ] I can explain function identity.
- [ ] I know what `useCallback` actually caches.
- [ ] I understand why `React.memo` is often part of the optimization boundary.
- [ ] I can identify stale closures.
- [ ] I can use functional updates to reduce dependencies safely.
- [ ] I know why Hooks cannot be called inside `.map()`.
- [ ] I can identify another unstable prop that defeats memoization.
- [ ] I can measure before claiming a performance improvement.
- [ ] I understand the role of React Compiler.

## Day 32 Outcome

You can now reason about callback identity and use `useCallback` deliberately rather than mechanically.

**Next:** Day 33 — React Context and avoiding unnecessary prop drilling.
