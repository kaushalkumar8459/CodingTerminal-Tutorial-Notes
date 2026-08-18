---
title: DOM Manipulation in React
slug: day-030-dom-manipulation-in-react
dayLabel: Day 30
level: Intermediate
estimatedMinutes: 100
order: 30
track: react
---
# Day 30 [Intermediate]: DOM Manipulation in React

## Goal

Learn when imperative DOM access is justified in React, how refs interact with effects, how to measure/layout safely, and how to avoid fighting React's declarative rendering model.

## Prerequisites

- Day 29: `useRef`
- `useEffect`
- Basic browser DOM concepts

## React-first Rule

React should normally own the rendered DOM through props and state:

```jsx
className={isActive ? "active" : ""}
```

Prefer this over:

```jsx
element.classList.add("active");
```

Imperative DOM access is appropriate when the browser exposes behavior that is naturally imperative:

- focus
- scroll
- text selection
- media playback
- measuring layout
- integrating third-party DOM libraries
- reading a browser property that is not naturally represented as React state

## Declarative vs Imperative

| Problem | Preferred approach |
|---|---|
| Show/hide UI | State + conditional rendering |
| CSS class | State + `className` |
| Input value | Controlled input when appropriate |
| Focus | Ref |
| Scroll | Ref + DOM method |
| Measure size | Ref + effect/layout effect |
| Chart library | Ref container + library lifecycle |
| Video play/pause | Ref to media element |

## Focus

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);
```

A user action can also trigger focus directly without an effect:

```jsx
<button type="button" onClick={() => inputRef.current?.focus()}>
  Focus search
</button>
```

Use an effect when focus is a synchronization that should happen after a render, not simply because effects are available.

## Scroll

```jsx
sectionRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "start",
});
```

Useful for validation summaries, chat windows, onboarding steps, and navigation.

## Text Selection

```jsx
inputRef.current?.select();
```

This is an imperative browser operation; state alone cannot request text selection.

## Media Controls

```jsx
const videoRef = useRef(null);

function play() {
  videoRef.current?.play();
}

function pause() {
  videoRef.current?.pause();
}
```

This is a good example of a browser API that does not map neatly to declarative JSX props.

## Measuring Layout

```jsx
const boxRef = useRef(null);
const [width, setWidth] = useState(0);

useLayoutEffect(() => {
  const element = boxRef.current;
  if (!element) return;

  setWidth(element.getBoundingClientRect().width);
}, []);
```

### `useEffect` vs `useLayoutEffect`

`useEffect` runs after the browser has generally painted. `useLayoutEffect` runs after DOM mutation but before the browser paints, making it useful when a measurement must be read and synchronously reflected without a visible intermediate layout.

Do not default to `useLayoutEffect`. It can block painting and should be reserved for layout-sensitive work.

## Responsive Measurement

A one-time measurement is insufficient if the element can resize.

For a robust solution, `ResizeObserver` can watch the element:

```jsx
useEffect(() => {
  const element = boxRef.current;
  if (!element) return;

  const observer = new ResizeObserver(([entry]) => {
    setWidth(entry.contentRect.width);
  });

  observer.observe(element);
  return () => observer.disconnect();
}, []);
```

The cleanup prevents the observer from continuing after unmount.

## DOM Ownership

React should not compete with another system for the same DOM properties.

Bad architecture:

```text
React changes className
        ↓
third-party script changes className
        ↓
React renders again
        ↓
DOM becomes difficult to reason about
```

For third-party libraries, isolate their DOM ownership to a dedicated container:

```jsx
<div ref={containerRef} />
```

Then initialize and destroy the library inside an effect.

## Third-Party Integration Pattern

```jsx
useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const chart = createChart(container, options);

  return () => {
    chart.destroy();
  };
}, [options]);
```

The lifecycle is:

```text
render container
→ effect initializes library
→ dependency changes
→ cleanup old library
→ effect initializes new configuration
→ unmount
→ cleanup
```

## Avoid `document.querySelector`

This:

```jsx
document.querySelector("#search")?.focus();
```

is usually inferior inside a component because it can cross component boundaries, depend on global IDs, and become fragile with multiple component instances.

Prefer:

```jsx
searchRef.current?.focus();
```

## Avoid Manual DOM State

Do not write:

```jsx
buttonRef.current.classList.toggle("active");
```

when the active state belongs to React.

Use:

```jsx
<button className={active ? "active" : ""} />
```

The ref should perform the imperative exception, not become a second source of truth.

## Strict Mode and Effects

In development, React Strict Mode may run an effect setup/cleanup cycle more than once to reveal unsafe side effects. Correct imperative integrations should therefore be restartable:

```text
setup → cleanup → setup
```

If an integration breaks under this sequence, its lifecycle is probably not implemented correctly.

## Complete Example: Accessible Jump Navigation + Measurement

```jsx
import { useEffect, useRef, useState } from "react";

export default function App() {
  const searchRef = useRef(null);
  const detailsRef = useRef(null);
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const update = () => {
      setWidth(element.getBoundingClientRect().width);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <h1>DOM Interaction Lab</h1>

      <label htmlFor="search">Search</label>
      <input id="search" ref={searchRef} />

      <button
        type="button"
        onClick={() =>
          detailsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      >
        Jump to details
      </button>

      <section ref={detailsRef} aria-labelledby="details-title">
        <h2 id="details-title">Details</h2>
        <div ref={cardRef}>
          <p>Measured width: {Math.round(width)}px</p>
        </div>
      </section>
    </main>
  );
}
```

## Focus Management After Conditional Rendering

A common real-world pattern is focusing a newly opened dialog or error summary.

```jsx
useEffect(() => {
  if (isOpen) {
    dialogRef.current?.focus();
  }
}, [isOpen]);
```

The element must actually be mounted before the ref can point to it. For dialogs, use an accessible dialog implementation and manage focus return to the triggering element as well.

## Measurement Pitfalls

Be careful with:

- hidden elements (`display: none`)
- fonts loading after initial measurement
- responsive resizing
- scrollbars
- transforms
- layout shifts

A measurement is a snapshot of layout, not application state that should automatically be stored forever.

## Performance

Avoid reading layout and immediately writing layout repeatedly in loops because this can cause layout thrashing.

Prefer batching reads and writes and use browser observers when appropriate.

Do not put every DOM read into `useLayoutEffect`. Measure only what the feature actually needs.

## Accessibility Checklist

- preserve keyboard focus order
- use semantic controls
- do not move focus unexpectedly without a user/task reason
- announce important dynamic changes
- ensure custom focus behavior has a logical fallback
- restore focus when closing dialogs or popovers where appropriate

## Common Mistakes

### 1. Using refs for ordinary UI state

If a value controls rendering, state is usually the correct source of truth.

### 2. Querying the whole document

Use component-scoped refs instead.

### 3. Forgetting cleanup

Observers, subscriptions, timers, and third-party widgets must be cleaned up.

### 4. Measuring only once

Responsive elements may need `ResizeObserver` or another explicit re-measure strategy.

### 5. Using `useLayoutEffect` everywhere

It can delay painting. Use it when pre-paint measurement is actually required.

### 6. Two owners for one DOM property

React and a third-party imperative system should not both control the same property without a clear boundary.

## Practical Labs

1. Build a search input with autofocus.
2. Add a "scroll to results" action.
3. Add a text-select button.
4. Measure a responsive card with `ResizeObserver`.
5. Integrate a small third-party widget into a dedicated ref container and destroy it on cleanup.
6. Build a modal with focus-in and focus-return behavior.

## Debugging Scenarios

**Focus fails on first render:** the element may not exist yet or is conditionally rendered; move synchronization to an appropriate effect.

**Width is always zero:** check whether the element is hidden or whether measurement occurs before it has meaningful layout.

**Observer keeps firing after navigation:** cleanup is missing.

**UI class changes disappear:** React is re-rendering from state and overwriting manual DOM changes; move the source of truth into state.

**Third-party widget duplicates itself in development:** effect setup is not idempotent or cleanup is incomplete; verify the setup → cleanup → setup lifecycle.

## Assessment

1. What should React own declaratively?
2. When is direct DOM access justified?
3. Why are refs preferable to global selectors?
4. When is `useLayoutEffect` appropriate?
5. Why can `ResizeObserver` be better than a one-time width measurement?
6. What is layout thrashing?
7. Why must third-party DOM integrations clean up?
8. What does Strict Mode reveal about effect design?
9. How should focus be managed in a dialog?
10. Why should a ref not become a second source of truth?

## Interview Questions

**When should you manipulate the DOM directly in React?** For imperative browser capabilities such as focus, scroll, selection, media controls, measurement, or isolated third-party integrations.

**Why use `useLayoutEffect` instead of `useEffect`?** When a DOM measurement or synchronous layout adjustment must happen before the browser paints to avoid visible flicker. It should not be the default effect.

**How do you integrate a DOM library?** Give the library an isolated container ref, initialize it in an effect, and destroy it in cleanup.

**How do you measure a responsive element?** Use a ref plus `ResizeObserver`, updating reactive state only if the measurement is needed by the UI.

**What is the biggest DOM manipulation anti-pattern in React?** Manually changing DOM state that React is also responsible for rendering.

## Final Project

Build a `DOM Interaction Playground` with:

- autofocus search
- scroll-to-section
- select-all text action
- responsive measurement
- accessible modal focus management
- third-party widget lifecycle simulation

Acceptance criteria:

- [ ] State drives ordinary UI
- [ ] Refs handle imperative operations
- [ ] Effects have correct dependencies
- [ ] All observers/widgets are cleaned up
- [ ] Responsive measurement works
- [ ] Focus behavior is accessible
- [ ] No global DOM selectors
- [ ] No competing DOM owners
- [ ] Strict Mode lifecycle is safe

## Day 30 Outcome

You now understand React's boundary between declarative rendering and imperative browser APIs. You can use refs and effects deliberately without turning the DOM into a competing source of truth.

The next stage can build on this foundation with memoization, referential equality, and performance optimization.