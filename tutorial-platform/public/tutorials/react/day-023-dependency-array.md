---
title: Dependency Array
slug: day-023-dependency-array
dayLabel: Day 23
level: Intermediate
estimatedMinutes: 120
order: 23
track: react
---
# Day 23 [Intermediate]: Dependency Arrays, Closures & Effect Correctness

## Goal

Understand exactly how `useEffect` dependencies control synchronization, why stale closures happen, why object/function dependencies matter, and how to fix dependency problems without hiding them.

## Prerequisites

- Day 22 `useEffect` basics
- JavaScript closures
- State and props

## Core Rule

A dependency array is **not a performance hint that you can freely edit**. It describes the reactive values used by the effect so React knows when synchronization must be repeated.

Conceptually:

```text
Render N
  ↓
Capture effect callback + reactive values
  ↓
Compare dependencies with previous committed render
  ↓
If dependencies changed → cleanup old effect → run new setup
```

React compares dependency values using `Object.is` semantics. Objects, arrays, and functions are compared by reference identity rather than deep contents.

## Pattern 1 — No Array

```jsx
useEffect(() => {
  console.log("After every committed render");
});
```

Valid, but broad. It should be intentional.

## Pattern 2 — Empty Array

```jsx
useEffect(() => {
  connectToAnalytics();
}, []);
```

This effect does not re-run because of later reactive changes. However, values captured by the callback are still captured from the render that created it. Do not use `[]` to silence dependency concerns.

Development Strict Mode can perform an extra setup/cleanup cycle, so setup must be reversible.

## Pattern 3 — Specific Dependencies

```jsx
useEffect(() => {
  document.title = `Search: ${query}`;
}, [query]);
```

When `query` changes according to dependency comparison, the effect synchronizes again.

## Object.is and Reference Identity

These are not equivalent from React's dependency perspective:

```jsx
const options = { roomId };
```

Every render creates a new object reference.

```jsx
const options = useMemo(() => ({ roomId }), [roomId]);
```

This can stabilize identity, but `useMemo` should not be added merely to make a badly designed effect quiet. Often the better solution is to construct the object inside the effect:

```jsx
useEffect(() => {
  const options = { roomId };
  connect(options);
  return () => disconnect(options);
}, [roomId]);
```

## Functions as Dependencies

Functions defined during render receive a new identity on each render:

```jsx
const createOptions = () => ({ roomId });
```

If an effect depends on it, the effect may re-run more often than expected.

Before adding `useCallback`, ask whether the function can simply move inside the effect or whether the effect itself can be removed.

## Stale Closures

Consider:

```jsx
useEffect(() => {
  console.log(query);
}, []);
```

The callback captures the value from the render that created it. If `query` changes later, this effect does not re-synchronize because `query` is absent from dependencies.

Prefer:

```jsx
useEffect(() => {
  console.log(query);
}, [query]);
```

A stale closure is not a React mystery; it is a JavaScript closure combined with a synchronization boundary that did not re-run.

## Functional Updates Can Remove a Dependency

Sometimes an effect only needs to update state based on its previous value:

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount((current) => current + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

The updater function receives the latest state, so the interval does not need to close over `count` merely to increment it.

This is a legitimate way to remove a state dependency because the state value is no longer read by the effect callback.

## Infinite Loop Analysis

Bad:

```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Sequence:

```text
count changes
→ effect runs
→ setCount changes count
→ render
→ dependency changed
→ effect runs again
→ ...
```

The fix is not automatically "remove count from the dependency array." First determine why the effect needs to update state and whether the effect is appropriate at all.

## Effect Dependencies and Props

```jsx
function User({ userId }) {
  useEffect(() => {
    loadUser(userId);
  }, [userId]);
}
```

If the synchronization depends on a prop, that prop is part of the effect's reactive input.

## Multiple Dependencies

```jsx
useEffect(() => {
  loadProducts({ category, sort });
}, [category, sort]);
```

The effect runs when either dependency changes.

## Dependency Array Is Not "Run When This Happens"

Avoid thinking:

> `[query]` means run when query changes.

More precisely:

> The effect synchronizes after renders where the dependency value differs from the previous committed dependency value.

That distinction becomes important with initial setup, cleanup, Strict Mode, and concurrent rendering behavior.

## The Exhaustive-Deps Linter

The hooks lint rule is valuable because it identifies values read by an effect that are not represented in its dependencies.

Do not treat lint warnings as noise. Usually:

1. read the warning
2. understand the value being captured
3. restructure the effect if necessary
4. include the dependency when it is genuinely reactive

Disabling the rule should be an intentional, documented exception rather than the default fix.

## Dependency Problems: A Decision Framework

When an effect has too many dependencies, ask:

1. Is the effect doing more than one job?
2. Can some logic move into an event handler?
3. Is some value merely derived data?
4. Can an object/function be created inside the effect?
5. Would a functional state update avoid reading state?
6. Is an external system actually being synchronized?
7. Do I truly need this effect?

This is better than trying to manipulate the dependency array until the behavior looks correct.

## End-to-End Practical — Search Synchronization

```jsx
function Search({ query, category }) {
  useEffect(() => {
    const params = new URLSearchParams({ query, category });
    document.title = `Search: ${query || "All"}`;

    return () => {
      // Cleanup would cancel or invalidate a request if one existed.
      console.log("cleanup", params.toString());
    };
  }, [query, category]);

  return <p>Searching...</p>;
}
```

The effect has two reactive inputs and therefore re-synchronizes when either changes.

## Hands-on Lab — Stale Search Logger

Start with:

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log(query);
  }, 500);

  return () => clearTimeout(id);
}, []);
```

Ask:

- What value does the timeout capture?
- Why does typing not create a new timer?
- What dependency is missing?

Correct version:

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log(query);
  }, 500);

  return () => clearTimeout(id);
}, [query]);
```

This creates a new timer for the current query and cleans up the previous timer when query changes.

## Common Mistakes

### 1. Empty array everywhere

This often creates stale closures.

### 2. Removing dependencies to stop a loop

That can hide the bug rather than fix it.

### 3. Deep-comparing everything manually

Usually rethink the effect and its inputs before introducing deep comparison.

### 4. Memoizing everything

`useMemo`/`useCallback` have costs and should solve a real identity/performance problem.

### 5. Treating dependency arrays as event filters

They describe synchronization dependencies, not arbitrary business-event triggers.

## Debugging Exercises

### Exercise A

```jsx
useEffect(() => {
  console.log(user.name);
}, []);
```

What happens if `user` changes?

### Exercise B

```jsx
const options = { roomId };
useEffect(() => {
  connect(options);
}, [options]);
```

Why can this reconnect on every render?

### Exercise C

```jsx
useEffect(() => {
  setTotal(items.length);
}, [items]);
```

Is `total` truly external synchronization, or should it be derived?

## Assessment

1. What comparison does React use for dependency values?
2. Why do object dependencies behave differently from primitive dependencies?
3. What is a stale closure?
4. Why can a function dependency cause repeated effects?
5. How can a functional state update remove a dependency?
6. Why is removing a dependency not a universal loop fix?
7. What does Strict Mode reveal about effect setup/cleanup?
8. When should you move logic into the effect itself?
9. When should you remove an effect entirely?
10. What role does exhaustive-deps linting play?

## Interview Questions

**Why does `[{}]` behave differently from `[someStableObject]`?**  
The object literal creates a new reference on every render, while a stable object reference may remain equal by `Object.is`.

**How do stale closures happen?**  
An effect callback captures values from a particular render and does not re-run when those values change because its dependencies are incomplete.

**Should you use `useCallback` to fix every function dependency?**  
No. First consider moving the function inside the effect or redesigning/removing the effect.

**Why can an effect with `[count]` and `setCount` loop?**  
The effect changes a value that causes the effect to run again.

**What is the correct way to fix missing dependencies?**  
Understand why the value is read, then restructure or include the dependency. Do not simply suppress the rule.

## Final Checklist

- [ ] Understand no-array behavior
- [ ] Understand empty-array behavior
- [ ] Understand dependency comparison
- [ ] Understand stale closures
- [ ] Understand object/function identity
- [ ] Can diagnose effect loops
- [ ] Can use functional updates appropriately
- [ ] Can reason about lint warnings
- [ ] Can distinguish synchronization from derived state

## Day 23 Outcome

You can now reason about dependency arrays instead of memorizing patterns. Day 24 will apply that reasoning to cleanup and cancellation.