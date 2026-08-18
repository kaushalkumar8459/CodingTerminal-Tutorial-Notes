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

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Declarative vs Imperative](#declarative-vs-imperative)
- [When DOM Manipulation Is Appropriate](#when-dom-manipulation-is-appropriate)
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

## Goal

Learn how to perform **necessary imperative DOM operations without abandoning React's declarative model**.

The most important lesson is not how to call DOM APIs. It is how to decide whether you should call them at all.

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
- scroll an element into view
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

## Core Mental Model

React normally works like this:

```text
State / Props
     ↓
React render
     ↓
DOM
```

Imperative DOM work is an escape hatch:

```text
React render
     ↓
DOM ref
     ↓
Browser API / external library
```

The escape hatch should be **small and intentional**.

If React can express the behavior declaratively, prefer React.

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

### Rule of thumb

Ask:

> Can React's props/state/rendering model express this behavior correctly?

If yes, use React.

If the operation is inherently imperative and browser/external-library APIs require a DOM handle, use a ref.

## When DOM Manipulation Is Appropriate

Good examples:

- focus management
- cursor/text selection
- scrolling
- measuring layout
- reading DOM geometry
- media playback
- integrating non-React widgets
- interacting with browser APIs attached to DOM nodes

Poor examples:

- manually adding/removing React-controlled classes
- manually changing text React renders
- manually hiding React-owned elements
- manually changing form values that are controlled by state
- using refs as a replacement for state

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

When the node is removed, React clears the object ref.

Never assume `current` is non-null during render:

```jsx
// Avoid doing imperative DOM work during render.
const element = inputRef.current;
```

Imperative operations normally belong in event handlers, effects, or dedicated callbacks.

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
      <button type="button" onClick={focusSearch}>
        Focus search
      </button>
    </div>
  );
}
```

### Focus after a render

If a state transition creates an element and that element should receive focus, an effect can synchronize focus after the commit:

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

Useful for:

- validation summaries
- chat windows
- onboarding
- section navigation
- newly revealed content

If scrolling is triggered by a user action, an event handler is often enough. An effect is useful when scrolling synchronizes with a state/route transition.

## Text Selection

```jsx
inputRef.current?.select();
```

Selection is a browser operation, so a ref is appropriate.

For more precise cursor placement, the DOM selection APIs can be used carefully:

```jsx
inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
```

## Media Controls

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);

  return (
    <>
      <video ref={videoRef} controls src="/demo.mp4" />
      <button type="button" onClick={() => videoRef.current?.play()}>
        Play
      </button>
      <button type="button" onClick={() => videoRef.current?.pause()}>
        Pause
      </button>
    </>
  );
}
```

`play()` returns a promise and may reject because of browser autoplay policies. Production code should handle that promise when playback is initiated programmatically.

## Measuring Layout

A DOM ref can read geometry:

```jsx
const boxRef = useRef(null);
const [width, setWidth] = useState(0);

useLayoutEffect(() => {
  const element = boxRef.current;
  if (!element) return;

  setWidth(element.getBoundingClientRect().width);
}, []);
```

### Why measurement is special

Reading layout and immediately updating layout-sensitive state can cause a visible intermediate frame if done too late. `useLayoutEffect` runs after React commits the DOM but before the browser paints the updated screen.

Do not use `useLayoutEffect` by default. Prefer `useEffect` when there is no visual/layout requirement.

## useEffect vs useLayoutEffect

| Situation | Choice |
|---|---|
| Fetching data | `useEffect` |
| Subscribing to external data | `useEffect` |
| Logging | `useEffect` |
| Focus after a normal interaction | Usually event/effect |
| Reading layout before paint matters | `useLayoutEffect` |
| Synchronously correcting measured layout | `useLayoutEffect` |

`useLayoutEffect` can delay painting, so keep the work small.

## Responsive Measurement with ResizeObserver

A single measurement does not remain correct when the element resizes.

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

This demonstrates a broader rule:

> Every imperative subscription/resource needs a clear cleanup boundary.

## Callback Refs

Object refs are convenient, but callback refs are useful when React should notify you whenever the attached node changes.

```jsx
function MeasuredBox() {
  const [node, setNode] = useState(null);

  const setRef = useCallback((element) => {
    setNode(element);
  }, []);

  return <div ref={setRef}>Content</div>;
}
```

Callback refs are especially useful when:

- a node can appear/disappear dynamically
- a list contains independently measured items
- the setup should happen exactly when a node is attached
- the node itself is the lifecycle trigger

Keep callback-ref side effects controlled and cleaned up when the callback receives `null`.

## DOM Ownership

A critical production rule is:

> One system should have clear ownership of a DOM property.

Bad:

```text
React sets className
        ↓
external code changes className
        ↓
React renders
        ↓
external code changes it again
```

This creates competing sources of truth.

Better:

```text
React-owned DOM
        │
        └── dedicated container
                 ↓
          third-party library
```

Give the external library a DOM subtree that React does not simultaneously manipulate.

## Third-Party Library Integration

```jsx
function Chart({ options }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, options);

    return () => {
      chart.destroy();
    };
  }, [options]);

  return <div ref={containerRef} />;
}
```

Lifecycle:

```text
render container
    ↓
effect creates library instance
    ↓
options change
    ↓
cleanup old instance
    ↓
create new instance
    ↓
unmount
    ↓
cleanup
```

If the library has a dedicated update API, prefer updating the existing instance rather than destroying/recreating it unnecessarily.

## Avoiding document.querySelector

This is usually fragile inside a component:

```jsx
document.querySelector("#search")?.focus();
```

Problems include:

- global lookup
- duplicate IDs
- component reuse issues
- hidden coupling between components
- difficulty testing isolated components

Prefer:

```jsx
searchRef.current?.focus();
```

Global DOM APIs are still appropriate when the actual requirement is global, but they should be intentional rather than the default component technique.

## Avoiding Manual DOM State

Avoid:

```jsx
buttonRef.current.classList.toggle("active");
```

when `active` is application state.

Prefer:

```jsx
<button className={active ? "active" : ""} />
```

Likewise, avoid manually setting:

```jsx
node.textContent = message;
node.style.display = "none";
node.disabled = isDisabled;
```

when React owns those properties.

Use refs for the imperative exception, not as a second rendering engine.

## Strict Mode and Cleanup

Development Strict Mode can intentionally exercise effect setup/cleanup more than once to reveal unsafe side effects.

Correct integration should tolerate:

```text
setup → cleanup → setup
```

Examples:

```jsx
useEffect(() => {
  const observer = new ResizeObserver(handleResize);
  observer.observe(element);

  return () => observer.disconnect();
}, []);
```

or:

```jsx
useEffect(() => {
  const chart = createChart(container);
  return () => chart.destroy();
}, []);
```

If cleanup is missing, development behavior may expose leaks, duplicate listeners, duplicate widgets, or stale subscriptions.

## SSR and Browser APIs

DOM APIs do not exist during server rendering.

Avoid executing browser-only work at module evaluation time:

```jsx
// Bad for SSR environments
const width = document.body.clientWidth;
```

Instead, access browser APIs only when running on the client, commonly from an effect or event handler:

```jsx
useEffect(() => {
  const width = document.body.clientWidth;
  // ...
}, []);
```

Framework-specific SSR rules vary, but the underlying principle is stable: **browser globals require a browser environment**.

## Accessibility

Imperative DOM work must preserve accessibility.

### Focus

- move focus only when there is a meaningful reason
- do not trap focus accidentally
- ensure keyboard users can continue their workflow
- restore focus when a temporary UI closes when appropriate

### Scrolling

Scrolling should not hide important content or make keyboard navigation confusing.

### Dynamic content

If content changes asynchronously, use appropriate semantic status/live-region patterns rather than relying on scrolling alone to communicate the change.

### Media

Keep native media controls or provide accessible custom controls with correct labels and keyboard behavior.

## Complete Practical

Build an accessible **Search + Details** page:

Requirements:

1. Search input.
2. Focus-search button.
3. Details section with a ref.
4. Button that scrolls to details.
5. Measured details card width.
6. Responsive width tracking with `ResizeObserver`.
7. Error summary that receives focus after validation failure.
8. No `document.querySelector`.
9. No manual React-owned class/text mutation.
10. All observers/listeners cleaned up.

Example skeleton:

```jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function App() {
  const searchRef = useRef(null);
  const detailsRef = useRef(null);
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.round(entry.contentRect.width));
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [showDetails]);

  function focusSearch() {
    searchRef.current?.focus();
  }

  function showAndScroll() {
    setShowDetails(true);
  }

  useLayoutEffect(() => {
    if (showDetails) detailsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [showDetails]);

  return (
    <main>
      <h1>DOM Escape Hatch Demo</h1>

      <label htmlFor="search">Search</label>
      <input id="search" ref={searchRef} />
      <button type="button" onClick={focusSearch}>Focus search</button>
      <button type="button" onClick={showAndScroll}>Show details</button>

      {showDetails && (
        <section ref={detailsRef}>
          <div ref={cardRef}>
            <h2>Details</h2>
            <p>Card width: {width}px</p>
          </div>
        </section>
      )}
    </main>
  );
}
```

For a production version, consider whether `useEffect` is sufficient for the scroll and whether the resize observer should be established immediately when the node mounts via a callback ref or a more precise lifecycle.

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
10. Reading `document`/`window` during SSR.
11. Assuming `ref.current` is always non-null.
12. Creating a ref when ordinary React state/props would solve the problem more safely.

## Debugging Lab

### Bug 1 — class keeps reverting

An external script adds a class but React later removes it.

**Cause:** two systems own the same DOM property.

**Fix:** move the state into React or isolate the external library's DOM subtree.

### Bug 2 — duplicate chart

A chart appears twice in development.

**Cause:** effect setup has no correct cleanup.

**Fix:** destroy the chart instance in the cleanup function.

### Bug 3 — width is stale

The initial width is correct but becomes wrong after resizing.

**Fix:** use `ResizeObserver` rather than a one-time measurement.

### Bug 4 — SSR crash

`document is not defined`.

**Fix:** move browser-only work into a client-only lifecycle/event boundary appropriate to the framework.

### Bug 5 — focus breaks keyboard flow

A modal repeatedly steals focus.

**Fix:** define a deliberate focus-management policy and restore focus when the modal closes.

## Hands-on Exercises

### Level 1 — Focus Manager

Create a form where a validation error focuses the first invalid field.

### Level 2 — Scroll Navigator

Build a multi-section page with buttons that scroll to each section.

### Level 3 — Media Controller

Build play, pause, mute, and seek controls around a video element.

### Level 4 — Responsive Measurement

Build a card that displays its live width using `ResizeObserver`.

### Level 5 — Third-Party Integration

Integrate a DOM-based chart/widget into a dedicated container with correct setup, update, and cleanup behavior.

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

### Answers

1. React's declarative model keeps UI state and rendered output synchronized.
2. Focus, scrolling, media control, measurement, and third-party integration are common examples.
3. React may render again and overwrite the manual mutation, creating competing sources of truth.
4. When DOM measurement/layout correction must happen before paint and a visible intermediate layout would be problematic.
5. It tracks actual element-size changes rather than assuming the initial measurement remains valid.
6. A component ref is scoped to the component instance and avoids global selectors/IDs.
7. Otherwise listeners, observers, timers, or widget instances can leak or duplicate.
8. It exercises setup/cleanup patterns and exposes missing cleanup or non-idempotent side effects during development.
9. The server does not provide browser DOM globals.
10. Avoid having React and an external imperative system simultaneously own the same DOM properties/subtree.

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

**Why isn't cancellation/cleanup just about avoiding memory leaks?**

Cleanup also prevents duplicate subscriptions, stale callbacks, duplicate widget instances, inconsistent external state, and race-related behavior.

**How would you design focus management for a modal?**

Move focus into the modal when appropriate, keep keyboard navigation valid, and restore focus to the invoking control when the modal closes.

**When is an imperative API justified in a React component?**

When the parent needs a narrow command such as focus, scroll, or reset that cannot be expressed cleanly through declarative props. The API should remain small and intentional.

## Testing Checklist

### Functional

- [ ] Focus button focuses the intended input.
- [ ] Scroll button reaches the intended section.
- [ ] Measurement renders a sensible value.
- [ ] Resize updates measurement.
- [ ] Media controls operate correctly.

### Ownership

- [ ] React-controlled classes are not manually mutated.
- [ ] React-controlled text is not manually mutated.
- [ ] Third-party DOM is isolated.

### Lifecycle

- [ ] Observers are disconnected.
- [ ] Event listeners are removed.
- [ ] Widget instances are destroyed.
- [ ] Strict Mode does not create duplicate resources.

### Accessibility

- [ ] Focus movement is intentional.
- [ ] Controls have accessible names.
- [ ] Keyboard users can operate controls.
- [ ] Dynamic changes have appropriate semantic feedback.

### Environment

- [ ] Browser globals are not accessed during SSR evaluation.
- [ ] `ref.current` null cases are handled.

## Production Considerations

- Prefer declarative React state for application UI.
- Keep imperative code at the boundary of the component.
- Keep refs narrowly scoped.
- Clean up every resource you create.
- Use `ResizeObserver` for element-driven resize behavior.
- Use `useLayoutEffect` only when visual timing requires it.
- Isolate third-party DOM ownership.
- Handle browser autoplay restrictions for media.
- Consider SSR when using `window`, `document`, `ResizeObserver`, or media APIs.
- Test behavior rather than implementation details where possible.

## Final Acceptance Criteria

- [ ] Complete Index.
- [ ] Clear React-first mental model.
- [ ] Declarative vs imperative comparison.
- [ ] Correct `useRef` usage.
- [ ] Focus example.
- [ ] Scroll example.
- [ ] Selection example.
- [ ] Media example.
- [ ] Layout measurement.
- [ ] `useEffect` vs `useLayoutEffect`.
- [ ] Responsive measurement.
- [ ] Callback refs.
- [ ] Third-party integration.
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
