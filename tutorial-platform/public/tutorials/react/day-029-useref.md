---
title: useRef
description: Master useRef for DOM references, mutable values, imperative APIs, timers, previous values, and request handles.
slug: day-029-useref
dayLabel: Day 29
level: Intermediate
estimatedMinutes: 150
order: 29
track: react
---
# Day 29 [Intermediate]: `useRef`

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Ref vs State](#ref-vs-state)
- [DOM References](#dom-references)
- [Focus Example](#focus-example)
- [Refs Persist Across Renders](#refs-persist-across-renders)
- [Previous Value Pattern](#previous-value-pattern)
- [Timer Handles](#timer-handles)
- [Request Handles](#request-handles)
- [Ref Writes and Rendering](#ref-writes-and-rendering)
- [Refs and Effects](#refs-and-effects)
- [Callback Refs](#callback-refs)
- [Forwarding Refs and Imperative APIs](#forwarding-refs-and-imperative-apis)
- [Strict Mode and Development Behavior](#strict-mode-and-development-behavior)
- [Common useRef Patterns](#common-useref-patterns)
- [When Not to Use useRef](#when-not-to-use-useref)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Testing Checklist](#testing-checklist)
- [Production Considerations](#production-considerations)
- [Final Acceptance Criteria](#final-acceptance-criteria)
- [Day 29 Outcome](#day-29-outcome)

## Goal

Understand `useRef` as a stable mutable container and React's escape hatch for imperative operations. By the end of the lesson, you should be able to decide confidently whether a value belongs in **state, a ref, an effect, or ordinary local computation**.

The central rule is:

> Use state for data that participates in rendering. Use refs for values or DOM handles that must survive renders but whose changes do not, by themselves, need to render the UI.

## Prerequisites

- Days 22–28
- `useState`
- `useEffect`
- controlled forms
- async/await and promises
- basic DOM concepts
- cleanup functions

## Learning Outcomes

You can now:

- explain what `useRef` returns
- explain why a ref survives renders
- explain why changing `ref.current` does not trigger a render
- attach refs to DOM elements
- focus, select, scroll, and measure DOM nodes safely
- store timer and request handles
- implement a previous-value pattern correctly
- understand callback refs
- explain when `useLayoutEffect` is appropriate for measurement
- expose an intentionally small imperative API when necessary
- identify misuse of refs as hidden state
- test ref-driven behavior without coupling tests to implementation details

## Core Mental Model

```jsx
const ref = useRef(initialValue);
```

React gives the component a stable ref object whose mutable property is:

```text
{ current: initialValue }
```

Across renders, the ref object remains the same for that mounted component instance:

```text
Render 1 ──┐
Render 2 ──┼── same ref object
Render 3 ──┘       ↓
                ref.current
```

Changing `ref.current` does **not** schedule a React render.

That gives two primary categories of use:

1. **DOM references** — access a DOM node for an imperative operation.
2. **Mutable instance-like values** — retain an operational value across renders without making that value part of rendered output.

Examples include:

- DOM nodes
- interval/timeout IDs
- `AbortController`
- previous values
- request IDs
- third-party widget instances

## Ref vs State

| Question | State | Ref |
|---|---|---|
| Survives renders? | ✅ | ✅ |
| Changing it triggers a render? | ✅ | ❌ |
| Intended for rendered UI? | ✅ | Usually no |
| Can hold a DOM node? | ❌ | ✅ |
| Good for timer/request handles? | Usually no | ✅ |
| Good for previous mutable value? | Sometimes | ✅ |
| React tracks changes automatically? | ✅ | ❌ |

Ask:

> If this value changes, should the user see a new render because of that change?

If **yes**, state is usually the correct abstraction.

If **no**, and the value needs to survive renders, a ref may be appropriate.

### Example: wrong abstraction

```jsx
const countRef = useRef(0);

function increment() {
  countRef.current += 1;
}
```

If the UI needs to display the count, this is insufficient because the update does not render.

Use:

```jsx
const [count, setCount] = useState(0);
```

instead.

## DOM References

Attach an object ref to a DOM element:

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  return <input ref={inputRef} />;
}
```

After React commits the element, `inputRef.current` points to the DOM node.

Imperative operations can then be performed:

```jsx
inputRef.current?.focus();
inputRef.current?.select();
inputRef.current?.scrollIntoView({ behavior: "smooth" });
```

When the element is removed, React sets the DOM ref back to `null`.

### Important boundary

A ref gives you an imperative escape hatch. It should **not** become a replacement for React's declarative rendering model.

Prefer:

```jsx
<button disabled={isSaving}>Save</button>
```

over manually doing:

```jsx
buttonRef.current.disabled = isSaving;
```

The first approach lets React own the UI state.

## Focus Example

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  function focusSearch() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} aria-label="Search" />
      <button type="button" onClick={focusSearch}>
        Focus search
      </button>
    </div>
  );
}
```

This is an appropriate use of a ref because focusing is an imperative browser operation.

### Autofocus after mount

If focus should happen after mount:

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

Be intentional with automatic focus because aggressive focus changes can be disruptive for keyboard and assistive-technology users.

## Refs Persist Across Renders

```jsx
function RenderCounter() {
  const renders = useRef(0);
  renders.current += 1;

  return <p>Rendered: {renders.current}</p>;
}
```

This demonstrates that `current` persists, but there is an important teaching point: the displayed value is coupled to the render that is already occurring. Do not use a ref as a substitute for state when you need the value itself to trigger rendering.

A better debugging-only pattern is often to count renders in a ref and log them rather than display them as application state.

## Previous Value Pattern

A common pattern is to update the ref in an effect:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const previous = useRef();

  useEffect(() => {
    previous.current = count;
  }, [count]);

  return (
    <>
      <p>Current: {count}</p>
      <p>Previous: {previous.current ?? "None"}</p>
      <button onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </>
  );
}
```

Why does this work?

```text
Render with count=1
previous.current → 0
       ↓
commit
       ↓
effect stores 1
       ↓
next render
previous.current → 1
```

The ref is deliberately updated **after** the render that needs to display the old value.

## Timer Handles

A timer ID is operational information and usually does not need to render:

```jsx
function Poller() {
  const intervalRef = useRef(null);

  function start() {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      console.log("poll");
    }, 1000);
  }

  function stop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    return stop;
  }, []);

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Why a ref?

Because the interval ID must be available to later event handlers and should not cause a render whenever the operational handle changes.

### Cleanup matters

If the component owns the timer, clean it up when the component unmounts. Otherwise the timer may continue running after the UI that created it is gone.

## Request Handles

A ref can hold an active `AbortController`:

```jsx
const controllerRef = useRef(null);

function cancelRequest() {
  controllerRef.current?.abort();
  controllerRef.current = null;
}
```

This is useful when an event handler needs the current controller without making the controller itself part of UI state.

A similar pattern can hold a request ID:

```jsx
const requestIdRef = useRef(0);

async function loadData() {
  const requestId = ++requestIdRef.current;
  const result = await fetchData();

  if (requestId !== requestIdRef.current) return;
  // safe to update the UI
}
```

The ref is acting as an instance-level ownership marker, not as rendered state.

## Ref Writes and Rendering

This is a critical distinction:

```jsx
ref.current = value;
```

does **not** tell React:

```text
"Render again because the ref changed."
```

Therefore this is a common bug:

```jsx
function Example() {
  const messageRef = useRef("");

  return (
    <>
      <button onClick={() => {
        messageRef.current = "Hello";
      }}>
        Set message
      </button>
      <p>{messageRef.current}</p>
    </>
  );
}
```

The paragraph will not reliably update when the button is clicked because the ref update does not schedule a render.

Correct:

```jsx
const [message, setMessage] = useState("");
```

## Refs and Effects

A DOM ref is populated during React's commit process. Reading it for imperative work during render is usually the wrong timing.

Good:

```jsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

For layout measurement or synchronous DOM adjustments that must happen before the browser paints, `useLayoutEffect` may be appropriate:

```jsx
useLayoutEffect(() => {
  const rect = boxRef.current?.getBoundingClientRect();
  // measure before paint when timing matters
}, []);
```

Do not choose `useLayoutEffect` merely because it sounds more advanced. Prefer `useEffect` unless the visual timing requirement actually needs layout-phase work.

## Callback Refs

An object ref is convenient when you simply need a stable reference:

```jsx
const nodeRef = useRef(null);
```

A callback ref is useful when you need code to run as the node is attached or detached:

```jsx
function Example() {
  const setNode = useCallback((node) => {
    if (node) {
      console.log(node.getBoundingClientRect());
    }
  }, []);

  return <div ref={setNode}>Measure me</div>;
}
```

The callback receives the DOM node when attached and `null` when detached.

### Dynamic lists

Callback refs can be useful when different list items need individual measurement or registration. Avoid creating a complicated imperative registry when a declarative data flow can solve the problem more simply.

## Forwarding Refs and Imperative APIs

A custom component does not automatically expose its internal DOM node to its parent merely because the child has a DOM ref.

When a reusable component intentionally needs an imperative API, expose only the operations the parent actually needs.

Conceptually:

```text
Parent
  ↓ imperative command
Child public API
  ↓
Internal DOM node
```

For example, an input wrapper might intentionally expose:

```text
focus()
clear()
select()
```

rather than exposing its entire implementation.

In modern React, the exact ref-forwarding API depends on the React version and component architecture. The important design rule is stable: **imperative APIs should be small, intentional, and exceptional**.

Prefer ordinary props for normal component communication.

## Strict Mode and Development Behavior

React development Strict Mode may intentionally invoke certain lifecycle-related logic more than once to expose unsafe side effects.

Do not interpret development-only repeated setup/cleanup as proof that refs are broken.

Timer, subscription, and imperative-resource code should be written so that setup and cleanup are safe and symmetrical.

A useful pattern is:

```text
setup resource
     ↓
cleanup resource
     ↓
setup again safely
```

This mindset catches resource leaks early.

## Common useRef Patterns

| Pattern | Example | Why ref? |
|---|---|---|
| DOM node | `inputRef.current` | Imperative DOM operation |
| Timer ID | `intervalRef.current` | Operational handle |
| Abort controller | `controllerRef.current` | Current cancellation handle |
| Request ID | `requestIdRef.current` | Latest-request ownership |
| Previous value | `previous.current` | Persist across renders |
| Third-party instance | `chartRef.current` | External imperative API |
| Render-debug counter | `renders.current` | Diagnostics, not UI state |

## When Not to Use `useRef`

Do **not** reach for refs merely because they can store anything.

### Use state when:

- the value appears in JSX
- a change should trigger a render
- React needs to coordinate the value with the UI

### Use ordinary local variables when:

- the value only exists for one render
- persistence across renders is unnecessary

### Use derived values when:

- the value can be calculated from props/state during render

Example:

```jsx
const fullName = `${firstName} ${lastName}`;
```

There is no need for:

```jsx
const fullNameRef = useRef("");
```

### Use effects when:

- you are synchronizing React with an external system
- a side effect must happen after commit

A ref and an effect often work together, but they solve different problems.

## Common Mistakes

### Mistake 1 — Expecting a ref update to render

```jsx
ref.current = 10;
```

This does not schedule a render.

### Mistake 2 — Using a ref for normal UI state

If a value is visible and reactive, use state.

### Mistake 3 — Reading a DOM ref during render for imperative work

Wait until commit/effect timing or use a callback ref when attachment timing itself matters.

### Mistake 4 — Forgetting cleanup

Timers, subscriptions, observers, and third-party instances need lifecycle cleanup when the component owns them.

### Mistake 5 — Overusing imperative DOM mutation

Do not manually modify DOM properties that React already owns unless there is a real escape-hatch requirement.

### Mistake 6 — Assuming refs are shared across component instances

Each mounted component instance gets its own ref state. A ref created inside one component is not automatically shared with another instance.

### Mistake 7 — Storing derived data in refs

If it can simply be calculated from current props/state, derive it instead.

### Mistake 8 — Exposing an entire child implementation

If an imperative child API is necessary, expose a narrow command surface rather than internal DOM details.

## Debugging Lab

### Bug 1 — UI does not update

```jsx
const valueRef = useRef(0);

function increment() {
  valueRef.current += 1;
}
```

**Question:** Why doesn't the displayed value change?

**Fix:** Use state if the value is rendered.

### Bug 2 — Timer keeps running

A component starts an interval but never clears it.

**Fix:** Store the ID in a ref and clean it up during unmount.

### Bug 3 — Old request updates the UI

Two requests overlap and the first response arrives last.

**Fix:** use cancellation and/or a request ID stored in a ref to ensure only the current request owns the result.

### Bug 4 — DOM access crashes

```jsx
inputRef.current.focus();
```

**Fix:** account for `null` when the node has not yet been attached or has been removed:

```jsx
inputRef.current?.focus();
```

### Bug 5 — Effect recreates an imperative resource

An effect repeatedly creates a widget without cleaning up the previous instance.

**Fix:** establish one resource, return cleanup, and make setup/cleanup symmetrical.

## Hands-on Exercises

### Level 1 — Focus Manager

Build a search box with:

- focus button
- select-all button
- keyboard-accessible controls

### Level 2 — Stopwatch

Build a stopwatch where the interval ID lives in a ref and the displayed elapsed time lives in state.

This exercise demonstrates the important separation:

```text
interval handle → ref
elapsed UI      → state
```

### Level 3 — Previous Value Tracker

Build a component that displays current and previous prop values without creating duplicate state.

### Level 4 — Request Cancellation

Build a search component that stores the current `AbortController` in a ref and cancels the previous request before starting a new one.

### Level 5 — Imperative Child API

Create a reusable input wrapper that exposes only `focus()` and `clear()` through an intentionally narrow imperative interface.

For every exercise document:

- why the value is state or ref
- when it changes
- whether it should trigger rendering
- lifecycle/cleanup requirements
- accessibility implications

## Assessment

1. What does `useRef()` return?
2. Why does changing `ref.current` not cause a render?
3. When should you use state instead of a ref?
4. Give three valid uses for refs.
5. Why can refs hold timer IDs?
6. Why should DOM focus usually happen after commit?
7. What is the previous-value pattern?
8. When might `useLayoutEffect` be preferable to `useEffect`?
9. What is a callback ref?
10. How do refs help with request cancellation?
11. Why can a ref be considered an escape hatch?
12. Why should imperative child APIs remain narrow?
13. Why is cleanup important for ref-held resources?
14. Why is a ref not a replacement for state?

### Answers

1. A stable object with a mutable `current` property.
2. React does not treat `current` mutation as state that schedules rendering.
3. When the value participates in rendered UI or changes must trigger rendering.
4. DOM nodes, timer/request handles, previous values, request IDs, and external widget instances.
5. The handle must persist across renders but does not itself need to render.
6. The DOM node must exist after React commits it.
7. Store the current value in an effect after render so the next render can read the prior value.
8. When DOM measurement or mutation must occur before the browser paints.
9. A function React calls with the attached node and later with `null` when detached.
10. A ref can retain the latest `AbortController` so event handlers can cancel it.
11. It allows imperative interaction with DOM/external systems outside ordinary declarative rendering.
12. It reduces coupling and prevents parent components from depending on internal implementation details.
13. Otherwise timers, subscriptions, observers, or external instances can outlive the component.
14. Ref writes do not schedule the render needed to update reactive UI.

## Interview Questions

### Beginner

**What is `useRef`?**

A React hook that provides a stable mutable object whose `current` value persists across renders without causing renders when mutated.

**Does changing `ref.current` trigger a render?**

No.

**What is the most common DOM use case?**

Imperative operations such as focusing an input or scrolling to an element.

### Intermediate

**State vs ref — how do you decide?**

If changing the value should cause the UI to update, use state. If it must persist but does not itself need to trigger rendering, a ref may be appropriate.

**Why store an interval ID in a ref?**

Event handlers need access to the current operational handle across renders, while changing the handle does not need to update the UI.

**How do you store a previous value?**

Keep a ref and update it after the relevant render, commonly inside an effect.

**Why not use refs for everything?**

They bypass React's reactive rendering model and can create invisible, difficult-to-reason-about state.

### Advanced

**When would you choose a callback ref?**

When attachment/detachment itself matters or when dynamic node registration/measurement needs to happen at the ref boundary.

**When is `useLayoutEffect` justified?**

When DOM measurement or a visual DOM adjustment must happen before paint to avoid visible layout flicker.

**How can refs help with race-condition protection?**

A ref can hold a monotonically increasing request ID so only the latest request is allowed to update the UI.

**When should a component expose an imperative API?**

Only when a declarative prop-based API cannot express the required interaction cleanly, such as focus, selection, or integration with an imperative third-party widget.

**Why is direct DOM mutation risky in React?**

React owns the declarative DOM representation; arbitrary mutations can conflict with future renders and make UI state harder to reason about.

## Testing Checklist

### Behavior

- [ ] Focus action focuses the intended element.
- [ ] Select action selects the intended text.
- [ ] Timer starts only once when repeated start is pressed.
- [ ] Timer cleanup runs on unmount.
- [ ] Cancellation targets the active request.
- [ ] Stale request results cannot overwrite the latest result.

### State model

- [ ] UI-visible values use state.
- [ ] Operational handles use refs where appropriate.
- [ ] Derived values are not duplicated in refs.

### Accessibility

- [ ] Controls have accessible names.
- [ ] Focus behavior is intentional.
- [ ] Keyboard users can perform the same actions.
- [ ] Imperative focus does not unexpectedly steal focus.

### Lifecycle

- [ ] DOM access happens at a valid lifecycle point.
- [ ] Timers/subscriptions/observers are cleaned up.
- [ ] Third-party instances are destroyed when owned by the component.

## Production Considerations

- Prefer declarative props/state over imperative DOM changes.
- Keep imperative APIs narrow.
- Keep resource setup and cleanup symmetrical.
- Treat refs as component-instance-local storage, not global state.
- Do not use refs to hide business state from React.
- For third-party libraries, keep the instance in a ref and synchronize it from props/effects.
- For request cancellation, combine refs with explicit lifecycle and error handling.
- Use `useLayoutEffect` only where pre-paint timing genuinely matters.
- In tests, verify user-visible outcomes rather than merely asserting that `.current` changed.

## Final Acceptance Criteria

- [ ] Complete Index.
- [ ] Goal and prerequisites are clear.
- [ ] Learning outcomes are measurable.
- [ ] `useRef` mental model is correct.
- [ ] Ref vs state is clearly explained.
- [ ] DOM refs and imperative operations are covered.
- [ ] Ref persistence is demonstrated.
- [ ] Previous-value pattern is explained correctly.
- [ ] Timer/request handle patterns are covered.
- [ ] Ref writes vs rendering is explicit.
- [ ] `useEffect` vs `useLayoutEffect` timing is explained.
- [ ] Callback refs are covered.
- [ ] Imperative APIs/ref forwarding are covered with appropriate caution.
- [ ] Strict Mode/resource cleanup considerations are covered.
- [ ] Common misuse is covered.
- [ ] Debugging lab is included.
- [ ] Progressive hands-on exercises are included.
- [ ] Assessment and answers are included.
- [ ] Beginner/intermediate/advanced interview questions are included.
- [ ] Testing checklist is included.
- [ ] Production considerations are included.
- [ ] Day outcome and next-day transition are included.

## Day 29 Outcome

You can now distinguish **reactive state** from **persistent mutable references**, use refs safely for DOM and imperative resources, and recognize when a ref is an appropriate escape hatch versus a hidden-state anti-pattern.

**Next:** Day 30 — DOM manipulation in React, building on `useRef` while reinforcing declarative React patterns.