---
title: DOM Manipulation in React
description: Learn React-first DOM manipulation, refs, effects, measurement, focus, scrolling, media APIs, and third-party DOM ownership.
slug: day-030-dom-manipulation-in-react
dayLabel: Day 30
level: Intermediate
estimatedMinutes: 150
order: 30
track: react
---
# Day 30 [Intermediate]: DOM Manipulation in React

## Goal

Learn how to perform necessary imperative DOM operations without abandoning React's declarative model.

> Let React own application UI. Use refs and DOM APIs for narrow imperative escape hatches such as focus, scrolling, measurement, media control, and isolated third-party integrations.

## Prerequisites

- Day 29: `useRef`
- `useState`
- `useEffect`
- basic DOM APIs
- controlled forms
- cleanup functions

## Learning Outcomes

By the end of this day, you can:

- explain declarative vs imperative UI
- decide when a DOM ref is appropriate
- focus and select an element safely
- scroll to an element after it is committed
- control media elements through refs
- measure DOM layout correctly
- distinguish `useEffect` from `useLayoutEffect`
- use `ResizeObserver` for changing dimensions
- understand callback refs
- isolate third-party DOM ownership
- implement cleanup for imperative resources
- avoid competing DOM sources of truth
- account for Strict Mode development behavior
- avoid browser-only APIs during server rendering
- build accessible focus and scrolling behavior

## Index

- [Core Mental Model](#core-mental-model)
- [Declarative vs Imperative](#declarative-vs-imperative)
- [DOM References with useRef](#dom-references-with-useref)
- [Focus Management](#focus-management)
- [Scrolling](#scrolling)
- [Text Selection](#text-selection)
- [Media Controls](#media-controls)
- [Measuring Layout](#measuring-layout)
- [useEffect vs useLayoutEffect](#useeffect-vs-uselayouteffect)
- [Responsive Measurement with ResizeObserver](#responsive-measurement-with-resizeobserver)
- [Callback Refs](#callback-refs)
- [DOM Ownership](#dom-ownership)
- [Third-Party Library Integration](#third-party-library-integration)
- [Avoiding document.querySelector](#avoiding-documentqueryselector)
- [Avoiding Manual DOM State](#avoiding-manual-dom-state)
- [Strict Mode and Cleanup](#strict-mode-and-cleanup)
- [SSR and Browser APIs](#ssr-and-browser-apis)
- [Accessibility](#accessibility)
- [Complete Practical](#complete-practical)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Testing Checklist](#testing-checklist)
- [Production Considerations](#production-considerations)
- [Final Acceptance Criteria](#final-acceptance-criteria)
- [Day 30 Outcome](#day-30-outcome)

## Core Mental Model

React normally works like this:

```text
State / Props → React render → DOM
```

Imperative DOM work is an escape hatch:

```text
React render → DOM ref → Browser API / external library
```

The escape hatch should be small and intentional. If React can express the behavior declaratively, prefer React.

## Declarative vs Imperative

| Requirement | Preferred approach |
|---|---|
| Show/hide content | State + conditional rendering |
| Toggle CSS class | State + `className` |
| Disable button | State + `disabled` |
| Change text | Render from state |
| Focus input | Ref + `.focus()` |
| Select input text | Ref + `.select()` |
| Scroll to section | Ref + `scrollIntoView()` |
| Play/pause video | Ref + media API |
| Measure element | Ref + measurement API |
| Integrate chart/widget | Ref container + lifecycle |

## DOM References with useRef

```jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);
  return <input ref={inputRef} />;
}
```

After React commits the DOM node:

```jsx
inputRef.current?.focus();
```

When the node is removed, React clears the object ref. Do not perform imperative DOM mutations during render.

## Focus Management

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  function focusSearch() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" ref={inputRef} />
      <button type="button" onClick={focusSearch}>Focus search</button>
    </div>
  );
}
```

If a state transition creates an element that should receive focus, synchronize after commit:

```jsx
useEffect(() => {
  if (isEditing) inputRef.current?.focus();
}, [isEditing]);
```

Focus should have a clear user-experience reason. Do not steal focus unexpectedly.

## Scrolling

```jsx
sectionRef.current?.scrollIntoView({
  behavior: "smooth",
  block: "start",
});
```

For a direct user action, an event handler is often enough. If the target is created by a state transition, an effect can run after the DOM exists. Prefer `useEffect` for normal scrolling; use `useLayoutEffect` only when pre-paint timing is actually required.

## Text Selection

```jsx
inputRef.current?.select();
inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
```

Selection is a browser operation, so a ref is appropriate.

## Media Controls

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);

  async function playVideo() {
    try {
      await videoRef.current?.play();
    } catch (error) {
      console.error("Playback was blocked or failed", error);
    }
  }

  return (
    <>
      <video ref={videoRef} controls src="/demo.mp4" />
      <button type="button" onClick={playVideo}>Play</button>
      <button type="button" onClick={() => videoRef.current?.pause()}>Pause</button>
    </>
  );
}
```

`play()` may reject because of autoplay policies, so production code should handle the promise.

## Measuring Layout

```jsx
import { useLayoutEffect, useRef, useState } from "react";

function MeasuredBox() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = boxRef.current;
    if (!element) return;
    setWidth(element.getBoundingClientRect().width);
  }, []);

  return <div ref={boxRef}>Width: {width}px</div>;
}
```

`useLayoutEffect` runs after commit but before paint. Use it when the measurement must be available before the browser paints. Otherwise prefer `useEffect`.

## useEffect vs useLayoutEffect

| Situation | Choice |
|---|---|
| Fetching data | `useEffect` |
| External subscription | `useEffect` |
| Logging | `useEffect` |
| Normal focus after interaction | Event handler / `useEffect` |
| Reading layout before paint matters | `useLayoutEffect` |
| Synchronously correcting measured layout | `useLayoutEffect` |

Keep `useLayoutEffect` work small because it can delay painting.

## Responsive Measurement with ResizeObserver

A one-time measurement becomes stale when the element resizes:

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

Every imperative subscription/resource needs a clear cleanup boundary.

## Callback Refs

Callback refs are useful when attachment/detachment itself is the lifecycle signal.

```jsx
import { useCallback, useState } from "react";

function MeasuredBox() {
  const [node, setNode] = useState(null);

  const setRef = useCallback((element) => {
    setNode(element);
  }, []);

  return <div ref={setRef}>Content</div>;
}
```

A callback ref receives the node when attached and `null` when detached. Use it when node changes need immediate handling; otherwise an object ref is usually simpler.

## DOM Ownership

> One system should have clear ownership of a DOM property.

Avoid having React and an external library both mutate the same class, text, style, or subtree. For third-party widgets, give the library a dedicated container that React does not otherwise manipulate.

## Third-Party Library Integration

```jsx
function Chart({ options }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, options);
    return () => chart.destroy();
  }, [options]);

  return <div ref={containerRef} />;
}
```

If the library has an update API, prefer updating an existing instance rather than destroying/recreating it whenever an equivalent update can be performed safely. If `options` is recreated every render, stabilize or appropriately derive it rather than using memoization blindly.

## Avoiding document.querySelector

Prefer component-scoped refs:

```jsx
searchRef.current?.focus();
```

over:

```jsx
document.querySelector("#search")?.focus();
```

Global DOM APIs are appropriate when the requirement is genuinely global, but they should be intentional.

## Avoiding Manual DOM State

Do not manually mutate React-owned application state in the DOM:

```jsx
// Avoid
buttonRef.current.classList.toggle("active");
node.textContent = message;
node.style.display = "none";
node.disabled = isDisabled;
```

Prefer React state/props for those values. Refs are an escape hatch, not a second rendering engine.

## Strict Mode and Cleanup

Development Strict Mode may exercise effect setup/cleanup more than once. Correct integrations tolerate:

```text
setup → cleanup → setup
```

For observers, listeners, timers, subscriptions, and widgets, cleanup must fully release what setup created.

## SSR and Browser APIs

Browser globals do not exist during server rendering. Avoid module-level browser access such as:

```jsx
const width = document.body.clientWidth;
```

Access browser APIs only from an appropriate client-side boundary such as an effect or event handler, according to the framework's SSR model.

## Accessibility

- Move focus only for a meaningful reason.
- Preserve keyboard navigation.
- Restore focus when temporary UI closes when appropriate.
- Do not use scrolling as the only communication mechanism for important dynamic changes.
- Use semantic status/live-region patterns where appropriate.
- Keep native media controls or provide correctly labelled keyboard-accessible custom controls.

## Complete Practical

Build an accessible **Search + Details** page with:

1. Search input and focus button.
2. Details section that can be revealed and scrolled into view.
3. Live card-width measurement with `ResizeObserver`.
4. An error summary that can receive focus after validation failure.
5. No `document.querySelector`.
6. No manual mutation of React-owned DOM state.
7. Correct cleanup.

```jsx
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export default function App() {
  const searchRef = useRef(null);
  const detailsRef = useRef(null);
  const cardRef = useRef(null);
  const errorRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [showDetails]);

  useEffect(() => {
    if (showDetails) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showDetails]);

  useLayoutEffect(() => {
    if (hasError) errorRef.current?.focus();
  }, [hasError]);

  return (
    <main>
      <h1>DOM Escape Hatch Demo</h1>

      <label htmlFor="search">Search</label>
      <input id="search" ref={searchRef} />
      <button type="button" onClick={() => searchRef.current?.focus()}>
        Focus search
      </button>
      <button type="button" onClick={() => setShowDetails(true)}>
        Show details
      </button>
      <button type="button" onClick={() => setHasError(true)}>
        Simulate validation error
      </button>

      {hasError && (
        <p ref={errorRef} tabIndex={-1} role="alert">
          Please correct the form errors.
        </p>
      )}

      {showDetails && (
        <section ref={detailsRef} aria-labelledby="details-heading">
          <div ref={cardRef}>
            <h2 id="details-heading">Details</h2>
            <p>Card width: {width}px</p>
          </div>
        </section>
      )}
    </main>
  );
}
```

Notice the timing distinction: scrolling uses `useEffect` because the DOM must exist after the state transition; focus uses `useLayoutEffect` here because the example wants focus applied before paint. In a real application, prefer the least disruptive timing that satisfies the UX requirement.

## Common Mistakes

1. Using refs for values that should render.
2. Mutating React-owned DOM properties manually.
3. Calling DOM APIs during render.
4. Using `querySelector` when a component ref is available.
5. Forgetting cleanup for observers/listeners/widgets.
6. Using `useLayoutEffect` everywhere.
7. Measuring only once when the element can resize.
8. Moving focus without considering keyboard users.
9. Creating duplicate third-party instances in Strict Mode.
10. Reading `document`/`window` during SSR evaluation.
11. Assuming `ref.current` is always non-null.
12. Creating a ref when ordinary state/props would solve the problem more safely.
13. Recreating an expensive third-party instance on every render when an update API exists.

## Debugging Lab

### Bug 1 — Class keeps reverting

An external script adds a class but React later removes it.

**Cause:** two systems own the same DOM property.

**Fix:** move the state into React or isolate the external library's DOM subtree.

### Bug 2 — Duplicate chart

A chart appears twice in development.

**Cause:** effect setup has no correct cleanup.

**Fix:** destroy the chart instance in cleanup and make setup/cleanup symmetrical.

### Bug 3 — Width is stale

The initial width is correct but becomes wrong after resizing.

**Fix:** use `ResizeObserver` rather than a one-time measurement.

### Bug 4 — SSR crash

`document is not defined`.

**Fix:** move browser-only work into an appropriate client-side lifecycle/event boundary.

### Bug 5 — Focus breaks keyboard flow

A modal repeatedly steals focus.

**Fix:** define deliberate focus ownership, move focus only on meaningful transitions, and restore focus when the modal closes.

### Bug 6 — Scroll runs too early

A state update is followed immediately by `detailsRef.current?.scrollIntoView()` in the same event handler, but the element does not exist yet.

**Fix:** perform the scroll after the state transition commits, usually in an effect keyed to the state that creates the element.

## Hands-on Exercises

### Level 1 — Focus Manager

Create a form where a validation error focuses the first invalid field. Explain why focus is an imperative operation.

### Level 2 — Scroll Navigator

Build a multi-section page with buttons that scroll to each section. Compare event-handler scrolling with state-transition scrolling.

### Level 3 — Media Controller

Build play, pause, mute, and seek controls around a video element. Handle rejected `play()` promises.

### Level 4 — Responsive Measurement

Build a card that displays its live width using `ResizeObserver` and disconnects the observer on unmount.

### Level 5 — Third-Party Integration

Integrate a DOM-based chart/widget into a dedicated container with correct setup, update, and cleanup behavior. Test the integration under Strict Mode.

For every exercise explain:

- why imperative DOM access is necessary
- why state/props alone are insufficient
- ref ownership
- lifecycle timing
- cleanup
- accessibility implications

## Assessment

1. Why should React normally own the DOM?
2. Give three valid uses of a DOM ref.
3. Why is manually toggling a React-owned class dangerous?
4. When is `useLayoutEffect` justified?
5. Why is `ResizeObserver` better than a one-time measurement for resizable elements?
6. Why is `querySelector` usually inferior to a component ref?
7. Why must third-party integrations clean up?
8. What does Strict Mode reveal about imperative integrations?
9. Why can direct `document` access break SSR?
10. What is the DOM ownership rule?
11. Why can a state transition require an effect for scrolling?
12. Why should a third-party instance not necessarily be recreated for every options object identity change?

### Answers

1. React's declarative model keeps UI state and rendered output synchronized.
2. Focus, scrolling, media control, measurement, and third-party integration are common examples.
3. React may render again and overwrite the manual mutation, creating competing sources of truth.
4. When DOM measurement/layout correction must happen after commit but before paint and a visible intermediate layout would be problematic.
5. It tracks actual element-size changes rather than assuming the initial measurement remains valid.
6. A component ref is scoped to the component instance and avoids global selectors/IDs.
7. Otherwise listeners, observers, timers, or widget instances can leak or duplicate.
8. It exercises setup/cleanup patterns and exposes missing cleanup or non-idempotent side effects during development.
9. The server does not provide browser DOM globals.
10. Avoid having React and an external imperative system simultaneously own the same DOM properties/subtree.
11. The element may not exist until React commits the render caused by the state update.
12. An update API can preserve the existing instance and avoid unnecessary teardown/recreation; dependency identity should reflect the actual lifecycle requirement.

## Interview Questions

### Beginner

**When should you use a ref for DOM manipulation?**

When you need an imperative browser operation such as focus, scroll, selection, media control, or measurement.

**Why not manipulate DOM for normal UI state?**

React should remain the source of truth for declarative UI.

### Intermediate

**When would you use `useLayoutEffect`?**

For layout-sensitive DOM reads/writes that need to happen after commit but before paint.

**How do you integrate a non-React chart library?**

Give it an isolated container ref, initialize it in an effect, update it intentionally, and destroy it in cleanup.

**Why can `querySelector` be problematic in reusable components?**

It relies on global DOM lookup and can collide across instances or cross component boundaries.

### Advanced

**Why isn't cleanup just about avoiding memory leaks?**

Cleanup also prevents duplicate subscriptions, stale callbacks, duplicate widget instances, inconsistent external state, and race-related behavior.

**How would you design focus management for a modal?**

Move focus into the modal when appropriate, keep keyboard navigation valid, and restore focus to the invoking control when the modal closes.

**When is an imperative API justified in a React component?**

When the parent needs a narrow command such as focus, scroll, or reset that cannot be expressed cleanly through declarative props. The API should remain small and intentional.

## Testing Checklist

- [ ] Focus behavior works and has a clear reason.
- [ ] Scroll targets the intended element after it exists.
- [ ] Measurement is updated when the element resizes.
- [ ] Media controls handle browser playback restrictions.
- [ ] React-owned classes/text/styles are not manually mutated.
- [ ] Third-party DOM is isolated.
- [ ] Observers/listeners/widgets are cleaned up.
- [ ] Strict Mode does not create duplicate resources.
- [ ] Keyboard users can operate controls.
- [ ] Focus is restored appropriately for temporary UI.
- [ ] Browser globals are not accessed during SSR evaluation.
- [ ] `ref.current` null cases are handled.

## Production Considerations

- Prefer declarative React state for application UI.
- Keep imperative code at the component boundary.
- Keep refs narrowly scoped.
- Clean up every resource you create.
- Use `ResizeObserver` for element-driven resize behavior.
- Use `useLayoutEffect` only when visual timing requires it.
- Isolate third-party DOM ownership.
- Handle browser autoplay restrictions for media.
- Consider SSR when using `window`, `document`, `ResizeObserver`, or media APIs.
- Prefer updating long-lived third-party instances when their API supports it.
- Test behavior rather than implementation details where possible.

## Final Acceptance Criteria

- [ ] Clear React-first mental model.
- [ ] Declarative vs imperative comparison.
- [ ] Correct `useRef` usage.
- [ ] Focus, scroll, selection, and media examples.
- [ ] Layout measurement.
- [ ] `useEffect` vs `useLayoutEffect` guidance.
- [ ] Responsive measurement with cleanup.
- [ ] Callback refs.
- [ ] Third-party integration and update strategy.
- [ ] DOM ownership rules.
- [ ] No unnecessary `querySelector`.
- [ ] No manual React-owned DOM state.
- [ ] Strict Mode cleanup guidance.
- [ ] SSR/browser boundary.
- [ ] Accessibility guidance.
- [ ] Complete practical project.
- [ ] Debugging lab.
- [ ] Progressive exercises.
- [ ] Assessment + answers.
- [ ] Interview questions.
- [ ] Testing checklist.
- [ ] Production guidance.
- [ ] Day outcome.

## Day 30 Outcome

You can now explain **when DOM manipulation belongs in React and when it does not**. You can safely use refs for focus, scrolling, selection, media, measurement, and isolated third-party integrations while keeping React as the primary owner of application UI.

**Next:** Day 31 — `useMemo`, memoization, referential equality, and performance trade-offs.
