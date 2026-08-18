---
title: useEffect Basics
slug: day-022-useeffect-basics
dayLabel: Day 22
level: Beginner to Intermediate
estimatedMinutes: 120
order: 22
track: react
---
# Day 22 [Beginner → Intermediate]: `useEffect` Basics

## Goal

Understand **when an effect is appropriate, when it runs, what it synchronizes, and why effects are not a general-purpose place for derived state or event logic**.

This lesson introduces the mental model needed for the next days: dependency arrays, cleanup, and API calls.

## Prerequisites

- Days 1–21
- Components, props, state, events
- Rendering and derived data
- Basic JavaScript functions and promises

## The Core Mental Model

A React component has two broad kinds of work:

1. **Calculate the UI from props/state.** This belongs in render and should be pure.
2. **Synchronize React with something outside React.** This is where an effect can be appropriate.

Examples of external systems:

- browser document title
- timers
- DOM APIs
- event listeners
- subscriptions
- network connections
- browser storage

A useful question is:

> "What external system am I synchronizing with?"

If there is no external system, first ask whether you can solve the problem during render or in an event handler instead.

## What Is an Effect?

```jsx
import { useEffect } from "react";

useEffect(() => {
  document.title = "Dashboard";
});
```

The callback runs after React commits the render. React then runs cleanup, when present, before a later eligible effect run and when the component is removed.

Do not think of `useEffect` as simply "componentDidMount for function components." The dependency model is about **synchronization with reactive values**, not lifecycle-name translation.

## Effect Lifecycle

Conceptually:

```text
Render
  ↓
React commits DOM changes
  ↓
Effect setup runs
  ↓
External system is synchronized
  ↓
Props/state change and another render commits
  ↓
Previous cleanup runs
  ↓
New effect setup runs
```

The exact browser scheduling details can differ between effect types and rendering conditions, so avoid promising that every effect is synchronously after paint. For normal `useEffect`, think "after commit, generally after the browser has had an opportunity to paint."

## Topic 1 — A Simple External Synchronization

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}
```

`title` is reactive input. When it changes, React synchronizes the browser's document title again.

## Topic 2 — Empty Dependency Array

```jsx
useEffect(() => {
  console.log("Initial effect");
}, []);
```

An empty dependency array means the effect does not re-run because of later changes to reactive values used by the component. In production, development Strict Mode can intentionally perform an extra setup/cleanup cycle to expose unsafe side effects. Therefore, do not teach `[]` as an absolute guarantee that setup executes exactly once in every environment.

Use it only when the synchronization really has no reactive dependencies.

## Topic 3 — No Dependency Array

```jsx
useEffect(() => {
  console.log("Runs after every committed render");
});
```

This is valid, but it is often too broad. If the effect updates state, it can create a render/effect loop.

## Topic 4 — Dependency-Based Synchronization

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

The effect synchronizes whenever `count` changes relative to the previous committed render.

Do not manually "guess" dependencies simply to make an effect run less often. The dependency list should represent the reactive values used by the effect, with deliberate restructuring when you need to remove a dependency.

## Topic 5 — Effects vs Event Handlers

A user action should normally stay in the event handler:

```jsx
function handleBuy() {
  sendPurchase();
}
```

Do not convert it into:

```jsx
useEffect(() => {
  if (shouldBuy) sendPurchase();
}, [shouldBuy]);
```

unless synchronization with an external system genuinely requires that design. Event handlers represent **events**; effects represent **synchronization after rendering**.

## Topic 6 — Effects vs Derived State

Avoid:

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Prefer:

```jsx
const fullName = `${firstName} ${lastName}`;
```

The second version has no unnecessary render cycle and no synchronization problem because `fullName` is derived from current inputs.

## Topic 7 — Multiple Effects

Separate unrelated synchronization concerns:

```jsx
useEffect(() => {
  document.title = title;
}, [title]);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

This makes dependencies and cleanup easier to reason about.

## Topic 8 — State Updates Inside Effects

State updates are allowed, but they deserve scrutiny:

```jsx
useEffect(() => {
  setReady(true);
}, []);
```

Ask whether `ready` is actually derived or whether the effect is synchronizing with something external. If the state only exists to mirror another state value, the effect is probably unnecessary.

## Topic 9 — Strict Mode

During development, React Strict Mode may run an extra setup → cleanup → setup cycle for effects. This helps expose code that is not correctly reversible.

Good effect code should tolerate this:

```text
setup
cleanup
setup
```

without creating duplicate listeners, timers, subscriptions, or requests that cannot be reconciled.

## Topic 10 — Browser Storage Example

```jsx
useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

This is a reasonable effect because `localStorage` is outside React.

However, reading initial state from storage is often better done with a lazy state initializer than with an effect that first renders an incorrect value and then fixes it.

## Topic 11 — A Focused Effect Example

```jsx
import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  );
}
```

### What happens?

1. Initial render calculates the button.
2. React commits the UI.
3. Effect synchronizes `document.title`.
4. Clicking updates state.
5. React renders and commits again.
6. The effect runs because `count` changed.

## End-to-End Practical — Theme Synchronization

Build a theme toggle that:

- stores the selected theme in React state
- updates a DOM attribute
- persists the selection in `localStorage`
- separates DOM synchronization from storage synchronization

```jsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;
}, [theme]);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

This is intentionally two effects because there are two external systems.

## Common Mistakes

### 1. Using an effect for derived values

Calculate derived values during render.

### 2. Calling an API directly in render

Render must stay pure; network synchronization belongs in an event or effect depending on the interaction.

### 3. Using `[]` blindly

An empty dependency array is not a magic "run once" switch that makes stale values safe.

### 4. Ignoring Strict Mode

If development produces duplicate setup behavior, investigate whether cleanup is correct instead of simply disabling Strict Mode.

### 5. One giant effect

Split independent synchronization processes so each effect has a clear purpose.

### 6. State-update loops

An effect that updates a dependency it watches can repeatedly render. Understand the state transition before adding the update.

## Debugging Lab

For each example, decide whether an effect is needed:

```jsx
const fullName = `${firstName} ${lastName}`;
```

```jsx
useEffect(() => {
  document.title = title;
}, [title]);
```

```jsx
useEffect(() => {
  setFiltered(items.filter(matches));
}, [items, matches]);
```

```jsx
function handleSubmit() {
  saveForm();
}
```

Expected reasoning: derived values and event actions usually do not need effects; external synchronization does.

## Exercises

### Level 1
- Sync document title with a counter.
- Persist a theme preference.

### Level 2
- Synchronize a `<div>` attribute with state.
- Split one large effect into independent effects.

### Level 3
- Build a chat-room connection abstraction and explain what setup and cleanup should do.
- Explain why Strict Mode exposes missing cleanup.
- Refactor a component that uses effects for derived state.

## Assessment

1. What problem does `useEffect` solve?
2. What does "external system" mean?
3. Why should render remain pure?
4. When is an event handler preferable to an effect?
5. When is derived data preferable to state + effect?
6. What does `[count]` communicate?
7. Why can an empty dependency array still require careful reasoning?
8. Why can Strict Mode expose bugs in effects?
9. Why split unrelated effects?
10. What makes an effect setup/cleanup pair safe?

## Interview Questions

**Is `useEffect` a lifecycle hook?**  
It can express lifecycle-like behavior, but the better mental model is synchronization with external systems based on reactive dependencies.

**When should you avoid `useEffect`?**  
Avoid it for pure calculations, derived state, and direct event responses that can be handled during render or in an event handler.

**What does an empty dependency array mean?**  
The effect does not re-run because of later reactive changes. Development Strict Mode may still perform an additional setup/cleanup cycle.

**Why can effects loop?**  
An effect can update state, causing a render, causing the effect to run again, especially when the updated state is itself a dependency.

**Why should effects be focused?**  
Each effect then represents a clear synchronization process with a clear dependency and cleanup story.

## Final Checklist

- [ ] Can explain side effects
- [ ] Can identify an external system
- [ ] Can distinguish render/event/effect work
- [ ] Can use dependencies intentionally
- [ ] Understand cleanup conceptually
- [ ] Understand Strict Mode behavior
- [ ] Avoid derived-state effects
- [ ] Can split unrelated effects

## Day 22 Outcome

You now understand the **purpose and mental model of `useEffect`**, not just its syntax. Day 23 will focus on dependency arrays and stale closures in greater depth.