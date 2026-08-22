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
- [Focus and Selection](#focus-and-selection)
- [Previous Value Pattern](#previous-value-pattern)
- [Timer Handles](#timer-handles)
- [Request Handles](#request-handles)
- [Ref Writes and Rendering](#ref-writes-and-rendering)
- [Refs and Effects](#refs-and-effects)
- [Callback Refs](#callback-refs)
- [Imperative APIs](#imperative-apis)
- [Strict Mode](#strict-mode)
- [Common Patterns](#common-patterns)
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

Understand `useRef` as a stable mutable container and React's escape hatch for imperative operations. By the end of this lesson, you should be able to decide whether a value belongs in **state, a ref, an effect, or ordinary derived/local computation**.

> **Core rule:** Use state when a change should participate in rendering. Use a ref when a value or resource must survive renders but changing it does not, by itself, need to update the UI.

A ref is not a second state system. It is an escape hatch for values React does not need to render.

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
- explain why a ref survives renders for a mounted component instance
- explain why changing `ref.current` does not trigger a render
- attach refs to DOM elements
- focus, select, scroll, and measure DOM nodes safely
- store timer and request handles
- implement a previous-value pattern
- understand callback refs and their attach/detach behavior
- choose between `useEffect` and `useLayoutEffect` for imperative work
- expose a deliberately small imperative API when necessary
- identify misuse of refs as hidden application state
- test ref-driven behavior without testing implementation details

## Core Mental Model

```jsx
const ref = useRef(initialValue);
```

React gives the component a stable ref object with a mutable `current` property:

```text
{ current: initialValue }
```

For a mounted component instance:

```text
Render 1 ──┐
Render 2 ──┼── same ref object
Render 3 ──┘       ↓
                ref.current
```

Changing `ref.current` does **not** schedule a React render.

Typical uses:

1. **DOM references** — focus, selection, scrolling, measurement.
2. **Imperative resource handles** — timers, controllers, subscriptions, widgets.
3. **Instance-like mutable values** — previous values, request versions, flags that do not belong in rendered state.

### Important lifecycle rule

A ref belongs to the component instance. When that component unmounts, its ref does not survive as application state. If the component is mounted again, it receives a new hook state/ref object.

## Ref vs State

| Question | State | Ref |
|---|---|---|
| Survives renders? | Yes | Yes |
| Changing it schedules a render? | Yes | No |
| Intended to drive JSX? | Yes | Usually no |
| Can reference a DOM node? | No | Yes |
| Good for timer/request handles? | Usually no | Yes |
| React tracks changes automatically? | Yes | No |

Ask:

> If this value changes, should the UI update because of that change?

If **yes**, state is usually correct. If **no**, and the value needs to persist across renders, a ref may be appropriate.

### Wrong abstraction

```jsx
const countRef = useRef(0);

function increment() {
  countRef.current += 1;
}
```

If the UI needs to display `countRef.current`, the update will not cause the UI to re-render.

Use state instead:

```jsx
const [count, setCount] = useState(0);
```

## DOM References

Attach an object ref to a DOM element:

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  return <input ref={inputRef} />;
}
```

After React commits the element, `inputRef.current` points to the DOM node. If the node is removed, React sets the DOM ref back to `null`.

Appropriate imperative operations include:

```jsx
inputRef.current?.focus();
inputRef.current?.select();
inputRef.current?.scrollIntoView({ behavior: "smooth" });
```

### Declarative boundary

Prefer React-owned state for normal UI behavior:

```jsx
<button disabled={isSaving}>Save</button>
```

over manually mutating a DOM property:

```jsx
buttonRef.current.disabled = isSaving;
```

Use direct DOM manipulation only when there is a real imperative requirement.

## Focus and Selection

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

For focus after mount:

```jsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

Automatic focus should be intentional. Unexpected focus movement can be disruptive for keyboard and assistive-technology users.

For measurement or visual correction that must happen before paint, `useLayoutEffect` can be appropriate. Do not use it merely because it sounds more advanced.

## Previous Value Pattern

A common pattern is to update a ref after the render that consumed the previous value:

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
      <button type="button" onClick={() => setCount((value) => value + 1)}>
        Increment
      </button>
    </>
  );
}
```

The sequence is:

```text
render count=1 → previous.current is still 0
        ↓
commit
        ↓
effect stores 1
        ↓
next render can observe previous.current as 1
```

This pattern is useful when the previous value itself does not need to trigger rendering.

## Timer Handles

Timer IDs are operational handles, not normally UI state:

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

  useEffect(() => stop, []);

  return (
    <div>
      <button type="button" onClick={start}>Start</button>
      <button type="button" onClick={stop}>Stop</button>
    </div>
  );
}
```

The important design point is that the ref stores the **resource handle**, while the visible `isRunning` status, if needed, should be state.

### Cleanup rule

If the component creates a timer, subscription, observer, controller, or third-party instance, it should normally own and clean up that resource.

## Request Handles

A ref can hold an active `AbortController`:

```jsx
const controllerRef = useRef(null);

function cancelRequest() {
  controllerRef.current?.abort();
  controllerRef.current = null;
}
```

A request version can also live in a ref:

```jsx
const requestIdRef = useRef(0);

async function loadData() {
  const requestId = ++requestIdRef.current;
  const result = await fetchData();

  if (requestId !== requestIdRef.current) return;
  setData(result);
}
```

The ref is acting as an instance-level ownership marker. It is not the rendered source of truth.

### Cancellation is not the same as ownership

`AbortController` is useful, but cancellation cannot retroactively stop a request that has already completed. When overlapping requests are possible, a request ID/version guard can provide an additional correctness boundary.

## Ref Writes and Rendering

This:

```jsx
ref.current = value;
```

does **not** tell React to render again.

Therefore this is not a reactive counter:

```jsx
function Example() {
  const valueRef = useRef(0);

  function increment() {
    valueRef.current += 1;
  }

  return (
    <>
      <button type="button" onClick={increment}>Increment</button>
      <p>{valueRef.current}</p>
    </>
  );
}
```

If the paragraph must update after the click, use state.

### Render-phase ref writes

Avoid mutating refs during render when the mutation represents application behavior or resource creation. Render should remain predictable and free of side effects.

A ref may be initialized with a value, but resource creation that has lifecycle implications generally belongs in an effect or event handler with appropriate cleanup.

## Refs and Effects

A DOM ref is available after React commits the element. Imperative work should therefore happen in an event handler, callback ref, `useEffect`, or `useLayoutEffect` depending on the requirement.

### `useEffect`

Use when the operation can happen after paint:

```jsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

### `useLayoutEffect`

Use only when you must read layout or make a visual DOM adjustment before the browser paints:

```jsx
useLayoutEffect(() => {
  const rect = boxRef.current?.getBoundingClientRect();
  // use rect when pre-paint timing matters
}, []);
```

Do not use `useLayoutEffect` as a generic replacement for `useEffect`.

## Callback Refs

An object ref is convenient when you need a stable reference:

```jsx
const nodeRef = useRef(null);
```

A callback ref is useful when attachment/detachment itself is important:

```jsx
const setNode = useCallback((node) => {
  if (node) {
    console.log(node.getBoundingClientRect());
  }
}, []);

return <div ref={setNode}>Measure me</div>;
```

React calls the callback with the node when attached and with `null` when detached.

For callback refs that add listeners or register external resources, clean up the previous node before registering the new one. This matters especially when the callback identity changes or a list item is replaced.

## Imperative APIs

A custom component does not automatically expose an internal DOM node to its parent merely because the child has a ref.

When a reusable component genuinely needs an imperative API, expose a small command surface such as:

```text
focus()
clear()
select()
```

rather than exposing implementation details.

Prefer ordinary props for normal data flow. Imperative APIs should be deliberate exceptions.

### React-version note

Ref forwarding and imperative-handle APIs have evolved across React versions. Follow the API supported by the React version used by this course. The design principle remains the same: keep imperative surfaces small and intentional.

## Strict Mode

In development, React Strict Mode may intentionally perform additional setup/cleanup behavior to expose unsafe side effects.

This is not evidence that refs are broken. Resource code should be safe under:

```text
setup
  ↓
cleanup
  ↓
setup again
```

If a timer, subscription, observer, or widget breaks when setup/cleanup is repeated during development, the lifecycle logic likely needs improvement.

## Common Patterns

| Pattern | Example | Why ref? |
|---|---|---|
| DOM node | `inputRef.current` | Imperative browser operation |
| Timer ID | `intervalRef.current` | Resource handle |
| Abort controller | `controllerRef.current` | Cancellation handle |
| Request ID | `requestIdRef.current` | Latest-request ownership |
| Previous value | `previous.current` | Persist without rendering |
| Third-party instance | `chartRef.current` | External imperative API |
| Debug counter | `renders.current` | Diagnostics, not UI state |

## When Not to Use `useRef`

### Use state when

- the value appears in JSX
- a change should trigger a render
- React needs to coordinate the value with the UI

### Use ordinary local variables when

- the value only exists for one render
- persistence across renders is unnecessary

### Use derived values when

- the value can be calculated from props/state during render

```jsx
const fullName = `${firstName} ${lastName}`;
```

There is no reason to store this in a ref.

### Use effects when

- React must synchronize with an external system
- work belongs after commit

A ref and an effect often work together, but they solve different problems.

## Common Mistakes

### Mistake 1 — Expecting a ref update to render

```jsx
ref.current = 10;
```

No render is scheduled.

### Mistake 2 — Using a ref for normal UI state

If users must see the change, state is usually the correct abstraction.

### Mistake 3 — Reading a DOM ref during render for imperative work

Wait until the DOM has committed or use a callback ref when attachment timing matters.

### Mistake 4 — Forgetting cleanup

Timers, subscriptions, observers, and third-party instances can outlive the UI that created them if cleanup is omitted.

### Mistake 5 — Mutating React-owned DOM unnecessarily

Do not manually change DOM properties that should be controlled by JSX/state.

### Mistake 6 — Assuming refs are shared between component instances

Each mounted instance owns its own hook state and refs.

### Mistake 7 — Storing derived data in refs

If it can be calculated from current props/state, derive it.

### Mistake 8 — Exposing an entire child implementation

Expose a narrow imperative API instead.

### Mistake 9 — Creating resources during render

Do not create timers, subscriptions, observers, or external widget instances during render. Put lifecycle-managed resources in the appropriate effect or event-driven flow.

## Debugging Lab

### Bug 1 — UI does not update

```jsx
const valueRef = useRef(0);

function increment() {
  valueRef.current += 1;
}
```

**Question:** Why does the displayed value stay unchanged?

**Fix:** Use state for rendered values.

### Bug 2 — Timer survives unmount

```jsx
useEffect(() => {
  intervalRef.current = setInterval(doWork, 1000);
}, []);
```

**Question:** What is missing?

**Fix:** Return cleanup that clears the interval.

### Bug 3 — Stale request wins

Two requests overlap and the older response replaces newer data.

**Fix:** Abort obsolete work where possible and use a request version/ID guard when ownership must be explicit.

### Bug 4 — Imperative DOM mutation fights React

A component manually changes `input.value` while React also controls `value`.

**Question:** Why can the UI become confusing?

**Fix:** Let React own controlled input value; use refs for imperative operations such as focus/select.

### Bug 5 — Measurement happens too late

A tooltip measures itself in `useEffect` and visibly jumps after paint.

**Fix:** Evaluate whether `useLayoutEffect` is required for the pre-paint measurement/correction.

### Bug 6 — Callback ref leaks a listener

A callback ref adds a listener to every new node but never removes it from the previous node.

**Fix:** Detach from the old node before attaching to the new node, or use an effect tied to a stable object ref where appropriate.

## Hands-on Exercises

### Level 1

- Build a focus-input component.
- Add a Select All button using a DOM ref.
- Build a timer that stores its handle in a ref.

### Level 2

- Build a previous-value display.
- Add cancelable search using `AbortController` in a ref.
- Track the latest request ID with a ref.

### Level 3

- Measure a tooltip before paint.
- Integrate a small third-party imperative widget and clean it up correctly.
- Build a reusable input component with a deliberately small imperative API.

### Level 4

- Create a dynamic list whose items need measurement using callback refs.
- Write tests proving that a stale request cannot update the current UI.
- Refactor a component that uses refs as hidden state and identify which values should become state or derived data.

## Assessment

1. What does `useRef` return?
2. Why does changing `ref.current` not trigger a render?
3. When should a ref be preferred over state?
4. Why are DOM refs usually read after commit rather than during render?
5. Why do timer IDs belong naturally in refs?
6. What is the difference between a ref and a local variable?
7. Why can an AbortController be stored in a ref?
8. When is a request ID guard useful in addition to cancellation?
9. When might `useLayoutEffect` be justified?
10. Why should refs not replace ordinary props/state communication?
11. What happens to a DOM ref when its node is removed?
12. Why does Strict Mode make cleanup quality important?
13. Why can a ref be appropriate for a third-party widget instance?
14. Why is a ref a poor choice for derived display data?
15. Why should resource creation not happen during render?

### Answers

1. A stable ref object with a mutable `current` property for the mounted component instance.
2. Refs are mutable containers and React does not use `current` changes as a render signal.
3. When the value must persist across renders but its changes do not themselves need to update the UI.
4. DOM refs are populated during the commit phase, so imperative work should happen after the DOM exists.
5. The handle must persist so later handlers/cleanup can access it, but changing the handle does not need to render UI.
6. A local variable is recreated for each render; a ref persists for the component instance.
7. It is an imperative cancellation resource that event handlers or cleanup may need to access without making the controller UI state.
8. Cancellation cannot guarantee that an already-completed/near-completed response cannot win; a version guard explicitly defines ownership.
9. When layout must be measured or corrected before paint to avoid visible flicker.
10. Refs bypass React's normal declarative data flow and can become hidden, hard-to-reason-about state.
11. React sets the DOM ref's `current` value to `null`.
12. Development checks can expose non-symmetrical setup/cleanup and resource leaks.
13. Third-party widgets often expose imperative APIs that React cannot declaratively own directly.
14. Derived data should be calculated from current props/state instead of being synchronized manually.
15. Render should remain predictable; lifecycle-managed resources need setup and cleanup outside render.

## Interview Questions

### Beginner

**What is `useRef`?**  
A React hook that provides a stable mutable object whose `current` value can persist across renders without causing a render when changed.

**What is the most common DOM use case?**  
Focusing, selecting, scrolling, or measuring an element imperatively.

### Intermediate

**State vs ref?**  
State drives rendering; refs preserve mutable values or handles without making those changes reactive.

**Why use a ref for an AbortController?**  
The controller is an operational resource. Event handlers and cleanup need the latest instance, but the controller itself is not UI state.

**Why not use a ref for a counter shown on screen?**  
Changing it does not schedule a render, so the UI will not react to the update.

### Advanced

**When would you combine `useRef` and `useEffect`?**  
When a ref stores an imperative resource/DOM handle and an effect manages the resource lifecycle or synchronizes it after commit.

**When is `useLayoutEffect` preferable?**  
When layout measurement or DOM correction must occur before the browser paints and a normal effect would visibly flicker.

**How would you prevent stale async responses?**  
Abort obsolete requests when possible and associate each request with a monotonically increasing ID/version so only the current owner may update state.

**How would you expose an imperative API from a reusable component?**  
Use the ref API supported by the project's React version and expose only a small, intentional command surface such as `focus()` or `clear()`.

**What is the danger of overusing refs?**  
They can hide application state from React, create imperative coupling, make updates difficult to trace, and undermine declarative component design.

## Testing Checklist

### DOM behavior

- [ ] Focus action focuses the intended element.
- [ ] Select/scroll behavior works when the node exists.
- [ ] Conditional removal safely handles `ref.current === null`.

### State/ref distinction

- [ ] Rendered values use state or derived data.
- [ ] Operational handles use refs where appropriate.
- [ ] Ref updates are not incorrectly expected to render.

### Resources

- [ ] Timers are cleared.
- [ ] Observers/subscriptions are cleaned up.
- [ ] Abort controllers are canceled when ownership ends.
- [ ] Third-party instances are disposed/destroyed when required.

### Async correctness

- [ ] Obsolete requests are canceled where possible.
- [ ] Request ownership/version prevents stale data from winning.
- [ ] Cancellation is not shown as a user-facing error unless the product explicitly wants that behavior.

### Accessibility

- [ ] Focus movement is intentional.
- [ ] Automatic focus does not unexpectedly steal focus.
- [ ] Keyboard users can reach imperative controls.

## Production Considerations

- Prefer declarative React APIs before imperative refs.
- Keep imperative APIs narrow and documented.
- Treat refs as component-instance resources, not global state.
- Always pair owned resources with cleanup.
- Consider Strict Mode behavior when validating lifecycle code.
- Avoid storing derived data in refs.
- Avoid mutating React-owned DOM properties unless an escape hatch is genuinely required.
- For async work, distinguish cancellation from stale-response ownership.
- When integrating third-party libraries, keep the integration boundary isolated and test cleanup.
- Use TypeScript types such as `useRef<HTMLInputElement | null>(null)` when working in a TypeScript project.

## Final Acceptance Criteria

- [ ] Can explain `useRef` without calling it a replacement for state.
- [ ] Can distinguish state, ref, local variable, derived value, and effect.
- [ ] Can focus/select/scroll a DOM element safely.
- [ ] Can store and clean up a timer handle.
- [ ] Can store an AbortController or request ID.
- [ ] Understands that ref writes do not trigger renders.
- [ ] Understands callback ref attach/detach behavior.
- [ ] Knows when `useLayoutEffect` is justified.
- [ ] Avoids unnecessary imperative DOM mutation.
- [ ] Cleans up owned resources.
- [ ] Can explain stale async response protection.
- [ ] Can design a narrow imperative API.
- [ ] Understands why refs should not become hidden application state.

## Day 29 Outcome

You can now use `useRef` deliberately rather than mechanically. You understand its two major roles—**DOM/imperative access and persistent mutable instance data**—and, more importantly, when **not** to use it.

This prepares you for the next stage of the course, where refs, effects, memoization, and custom hooks can be combined to build reusable and performant React features.