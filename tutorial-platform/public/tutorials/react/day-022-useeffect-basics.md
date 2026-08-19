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

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Core Mental Model](#core-mental-model)
- [What Is an Effect](#what-is-an-effect)
- [Effect Lifecycle](#effect-lifecycle)
- [Topic by Topic](#topic-by-topic)
- [End-to-End Practical](#end-to-end-practical)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Verification Checklist](#verification-checklist)
- [Day 22 Outcome](#day-22-outcome)

## Goal

Understand **when an effect is appropriate, when it runs, what it synchronizes, how cleanup works, and why effects are not a general-purpose place for derived state or event logic**.

By the end of this lesson you should be able to answer a more useful question than “How do I use `useEffect`?”:

> **What external system am I synchronizing with, and what reactive values determine that synchronization?**

## Prerequisites

- Days 1–21
- Components, props, and state
- Events and forms
- Rendering and derived data
- Basic JavaScript functions and promises

## Core Mental Model

A React component has two broad kinds of work:

1. **Calculate UI from props/state.** This belongs in render and should be pure.
2. **Synchronize React with something outside React.** This is where an effect can be appropriate.

Examples of external systems:

- browser document title
- timers
- DOM APIs
- event listeners
- subscriptions
- network connections
- browser storage

If there is no external system, first ask whether the problem belongs in render or an event handler instead.

```text
                 React render
                     │
              calculate UI only
                     │
                   commit
                     │
                     ▼
              useEffect setup
                     │
          synchronize external system
                     │
             later dependency change
                     │
                     ▼
             previous cleanup
                     │
                     ▼
               new setup
```

## What Is an Effect?

```jsx
import { useEffect } from "react";

useEffect(() => {
  document.title = "Dashboard";
});
```

The setup function runs after React commits the render. If the effect returns a cleanup function, React uses that cleanup to undo the previous synchronization before a later eligible setup and when the component is removed.

Do not teach `useEffect` as simply “`componentDidMount` for function components.” Its more useful model is **synchronization with external systems based on reactive values**.

## Effect Lifecycle

Conceptually:

```text
Render
  ↓
React commits DOM changes
  ↓
Effect setup
  ↓
External system synchronized
  ↓
Relevant reactive value changes
  ↓
Render + commit
  ↓
Previous cleanup
  ↓
New effect setup
```

For normal `useEffect`, think “after commit, generally after the browser has had an opportunity to paint.” Do not rely on an oversimplified promise that every effect is synchronously after paint in every rendering situation.

## Topic by Topic

### 1. Synchronizing the Document Title

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}
```

`title` is reactive input. When it changes, React synchronizes the browser's document title again.

### 2. Dependency Array: No Array

```jsx
useEffect(() => {
  console.log("Runs after every committed render");
});
```

This is valid but often broader than necessary. If it updates state that causes another render, it can create a loop.

### 3. Dependency Array: Empty Array

```jsx
useEffect(() => {
  console.log("No later reactive dependencies");
}, []);
```

An empty dependency array means the effect does not re-run because of later reactive changes. It does **not** mean “this code is universally guaranteed to execute exactly once.” Development Strict Mode may intentionally perform an extra setup → cleanup → setup cycle to expose unsafe side effects.

Use `[]` only when the synchronization genuinely has no reactive dependencies.

### 4. Dependency-Based Synchronization

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

The effect re-synchronizes when `count` changes relative to the previous committed render.

Do not remove dependencies merely to reduce executions. Instead, restructure the code when a dependency is unnecessary or the effect itself is unnecessary.

### 5. Effects vs Event Handlers

A direct user action normally belongs in its event handler:

```jsx
function handleBuy() {
  sendPurchase();
}
```

Avoid turning it into state + effect solely to react to the click:

```jsx
useEffect(() => {
  if (shouldBuy) sendPurchase();
}, [shouldBuy]);
```

Event handlers represent **events**. Effects represent **post-render synchronization**.

### 6. Effects vs Derived State

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

The second version is synchronous, simpler, and avoids an unnecessary state transition.

### 7. Multiple Independent Effects

```jsx
useEffect(() => {
  document.title = title;
}, [title]);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

There are two external systems, so separate effects make each synchronization and dependency list easier to reason about.

### 8. State Updates Inside Effects

State updates are allowed, but they deserve scrutiny:

```jsx
useEffect(() => {
  setReady(true);
}, []);
```

Ask whether `ready` is actually synchronization state. If it merely mirrors another state/prop, it may be unnecessary derived state.

### 9. Strict Mode

Development Strict Mode can perform an extra setup → cleanup → setup cycle for effects. This helps expose missing cleanup and non-idempotent setup.

Good effect code should tolerate:

```text
setup
cleanup
setup
```

without accumulating duplicate listeners, timers, subscriptions, or connections.

### 10. Cleanup

A cleanup function should undo the external work performed by setup.

```jsx
useEffect(() => {
  const handler = () => console.log(window.scrollY);

  window.addEventListener("scroll", handler);

  return () => {
    window.removeEventListener("scroll", handler);
  };
}, []);
```

The same function reference is important when removing the listener.

Timer example:

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

### 11. Browser Storage

```jsx
useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

`localStorage` is outside React, so synchronization is a reasonable effect.

For initial reads, a lazy initializer is often preferable when you want the initial render to use stored data directly:

```jsx
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") ?? "light";
});
```

The effect can then persist later changes.

### 12. Focused Counter Example

```jsx
function Counter() {
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

Sequence:

1. Initial render calculates the button.
2. React commits the UI.
3. Effect synchronizes `document.title`.
4. Click updates state.
5. React renders and commits again.
6. Effect runs because `count` changed.

### 13. Effects Do Not Make Render Impure

Keep external synchronization out of the component body:

```jsx
// Avoid side effects during render.
document.title = title;
```

Render can run more than once and can be started or discarded under modern React rendering behavior. Side effects in render are therefore unsafe.

### 14. Dependency Completeness

Consider:

```jsx
function Greeting({ name }) {
  useEffect(() => {
    document.title = `Hello ${name}`;
  }, [name]);

  return <h1>Hello {name}</h1>;
}
```

The dependency list describes which reactive value the synchronization uses. If an effect reads a reactive value, do not arbitrarily omit it just to control frequency. Prefer restructuring the effect or removing the effect if the synchronization is unnecessary.

## End-to-End Practical

### Theme Synchronization

Build a theme toggle that:

- stores the selected theme in React state
- updates a DOM attribute
- persists the selection in `localStorage`
- keeps DOM and storage synchronization separate
- provides a cleanup story when an external subscription is later introduced

```jsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;
}, [theme]);

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

These are intentionally separate synchronization processes.

### Acceptance Criteria

- [ ] Theme is rendered from React state.
- [ ] DOM attribute matches current theme.
- [ ] Storage is updated when theme changes.
- [ ] No derived state is created with an effect.
- [ ] No side effects occur during render.
- [ ] The student can explain why two effects are used.

## Hands-on Exercises

### Level 1 — Document Title

Build a counter that synchronizes `document.title` with the count.

Acceptance:

- [ ] Initial title is correct.
- [ ] Title changes when count changes.
- [ ] No effect is used to calculate a derived label.

### Level 2 — Timer Cleanup

Create an interval that logs once per second and clear it in cleanup.

Acceptance:

- [ ] Interval starts in setup.
- [ ] Interval is cleared in cleanup.
- [ ] No accumulating timers in Strict Mode development.

### Level 3 — External Event Listener

Subscribe to `window.resize` and clean up the exact handler.

Acceptance:

- [ ] Listener is added in setup.
- [ ] Same handler is removed in cleanup.
- [ ] Dependency choices are explained.

### Level 4 — Refactor an Incorrect Effect

Given:

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Replace it with derived render-time calculation and explain why.

## Common Mistakes

### 1. Using an effect for derived values

Calculate pure derived values during render.

### 2. Calling an API or browser API during render

Render should remain pure. Put synchronization in an event handler or effect as appropriate.

### 3. Using `[]` blindly

An empty dependency array does not make stale values safe and does not eliminate development Strict Mode's extra setup/cleanup behavior.

### 4. Ignoring cleanup

Listeners, timers, subscriptions, and connections need reversible cleanup.

### 5. Disabling Strict Mode to hide duplicate setup

Fix setup/cleanup correctness instead.

### 6. One giant effect

Separate independent synchronization processes.

### 7. Infinite effect loops

If setup updates state that changes a dependency, the effect can repeatedly run. Model the state transition before adding the update.

### 8. Suppressing dependency warnings without understanding why

A warning can reveal stale closures or incorrect synchronization design. Do not silence it mechanically.

## Debugging Lab

For each example, decide whether an effect is needed and explain why.

### A

```jsx
const fullName = `${firstName} ${lastName}`;
```

**Expected:** No effect. Pure derived data.

### B

```jsx
useEffect(() => {
  document.title = title;
}, [title]);
```

**Expected:** Effect. Browser document is external to React.

### C

```jsx
useEffect(() => {
  setFiltered(items.filter(matches));
}, [items, matches]);
```

**Expected:** Usually no effect. Derive `filtered` during render.

### D

```jsx
function handleSubmit() {
  saveForm();
}
```

**Expected:** Event handler. The action is caused by the user event.

### E

```jsx
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [handleResize]);
```

**Expected:** Effect, because it synchronizes an external event subscription. Explain the identity/dependency implications of `handleResize`.

## Assessment

1. What problem does `useEffect` solve?
2. What is an external system?
3. Why should render remain pure?
4. When is an event handler preferable to an effect?
5. When is derived data preferable to state + effect?
6. What does `[count]` communicate?
7. What is the difference between no dependency array and `[]`?
8. Why can Strict Mode expose effect bugs?
9. Why does cleanup need to reverse setup?
10. Why split unrelated effects?
11. Why can an effect loop?
12. Why should dependency warnings not be suppressed blindly?

### Answers

1. It lets a component synchronize with systems outside React after a render commits.
2. Something React does not control as part of render, such as the DOM, timers, event targets, storage, subscriptions, or network connections.
3. React may render more than once or discard work; render must only calculate UI.
4. When a specific user action directly causes the work.
5. Derived data is synchronous and avoids duplicate state and synchronization.
6. Re-synchronize when `count` changes.
7. No array means the effect is eligible after every committed render; `[]` means no later reactive dependencies trigger it.
8. Development Strict Mode can intentionally run setup → cleanup → setup to reveal missing cleanup or unsafe setup.
9. So the previous synchronization does not accumulate stale listeners, timers, subscriptions, or connections.
10. Each synchronization then has a smaller dependency and cleanup surface.
11. Setup can update state, which changes a dependency and causes another render/effect cycle.
12. Missing dependencies can produce stale closures or incorrect synchronization.

## Interview Questions

### Beginner

**What is `useEffect`?**  
A React Hook for synchronizing a component with external systems after commit.

**Give a simple effect example.**  
Synchronizing `document.title` with a `title` prop.

### Intermediate

**What is the difference between render and an effect?**  
Render calculates React's UI; an effect performs post-commit synchronization with something outside React.

**What does an empty dependency array mean?**  
The effect does not re-run because of later reactive changes, although development Strict Mode can perform an extra setup/cleanup cycle.

**Why is derived state often an effect smell?**  
Because a value that can be calculated from current props/state does not need a second state value and synchronization step.

### Advanced

**Why does cleanup run before a new setup?**  
It lets the previous synchronization be reversed before React establishes the new one for changed dependencies.

**Why should you not use an effect as a response to a click?**  
The click already has a natural event-handler boundary. Introducing an effect often adds an unnecessary state transition and makes causality harder to follow.

**How do you handle an event listener effect?**  
Create/setup the listener in the effect and remove the exact listener in cleanup, while making dependency identity intentional.

**Why is Strict Mode useful for effects?**  
It exposes assumptions that setup runs only once and catches missing or non-reversible cleanup during development.

**When would `useLayoutEffect` be considered?**  
For DOM measurement or visual synchronization that must happen before the browser paints. It should not be used as a default replacement for `useEffect`.

**How should API calls be approached?**  
An API call can be an event-driven action in an event handler or a synchronization triggered by reactive inputs in an effect. Day 25 will cover practical fetch patterns in detail.

## Verification Checklist

- [ ] Can explain what an effect is.
- [ ] Can identify the external system being synchronized.
- [ ] Can distinguish render, event handler, and effect responsibilities.
- [ ] Understand no dependency array vs `[]` vs specific dependencies.
- [ ] Understand cleanup and setup symmetry.
- [ ] Understand development Strict Mode behavior.
- [ ] Can identify unnecessary derived-state effects.
- [ ] Can split unrelated synchronization processes.
- [ ] Can reason about dependency completeness.
- [ ] Can implement a timer cleanup.
- [ ] Can implement event-listener cleanup.
- [ ] Can explain when `useLayoutEffect` might be appropriate.
- [ ] Can explain why API calls belong in different boundaries depending on the trigger.

## Day 22 Outcome

You now understand the **purpose, lifecycle, dependencies, cleanup, and boundaries of `useEffect`**, rather than memorizing syntax. You can distinguish render-time derivation, event-driven actions, and external synchronization.

**Next:** Day 23 — dependency arrays, reactive dependencies, and stale-closure reasoning.
