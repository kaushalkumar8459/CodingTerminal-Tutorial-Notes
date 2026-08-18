---
title: useRef
slug: day-029-useref
dayLabel: Day 29
level: Intermediate
estimatedMinutes: 90
order: 29
track: react
---
# Day 29 [Intermediate]: `useRef`

## Goal

Understand `useRef` as a stable mutable container and as React's escape hatch for imperative DOM operations, while knowing when **not** to use it.

## Prerequisites

- Days 22–28
- `useState` and `useEffect`
- Basic DOM concepts

## Core Mental Model

```jsx
const ref = useRef(initialValue);
```

React returns the same ref object across renders:

```text
{ current: initialValue }
```

Changing `ref.current` does **not** schedule a render.

That gives two major use cases:

1. reference a DOM node
2. store mutable information that does not belong in rendered UI

## Ref vs State

| Need | State | Ref |
|---|---|---|
| UI must update | ✅ | ❌ |
| Value survives renders | ✅ | ✅ |
| Updating value triggers render | ✅ | ❌ |
| DOM node reference | ❌ | ✅ |
| Timer/request handle | Usually unnecessary | ✅ |
| Previous mutable value | Sometimes | ✅ |

A useful question is:

> If this value changes, should React render a different UI?

If yes, state is usually the better choice.

## DOM References

```jsx
const inputRef = useRef(null);

<input ref={inputRef} />
```

After the element is committed, React assigns the DOM node to `inputRef.current`.

Use it for imperative actions such as:

```jsx
inputRef.current?.focus();
inputRef.current?.scrollIntoView({ behavior: "smooth" });
inputRef.current?.select();
```

Do not use refs to recreate declarative rendering.

## Focus Example

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  function focusSearch() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} aria-label="Search" />
      <button type="button" onClick={focusSearch}>Focus search</button>
    </>
  );
}
```

## Refs Persist Across Renders

```jsx
function RenderCounter() {
  const renders = useRef(0);
  renders.current += 1;

  return <p>Rendered: {renders.current}</p>;
}
```

This demonstrates persistence, but it is not a recommendation to count renders in production UI. If a render count needs to be visible and reactive, state may be more appropriate.

## Previous Value Pattern

A common pattern is:

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

The effect runs after the render that displays the current value, so the next render can read the previous value.

## Timer Handles

Refs are useful for timer IDs because the ID is operational data, not necessarily rendered UI:

```jsx
const intervalRef = useRef(null);

function start() {
  if (intervalRef.current) return;
  intervalRef.current = setInterval(() => {
    // do work
  }, 1000);
}

function stop() {
  clearInterval(intervalRef.current);
  intervalRef.current = null;
}
```

Pair timers with cleanup when the component owns the timer lifecycle.

## Request Handles

Refs can also hold an active `AbortController`:

```jsx
const controllerRef = useRef(null);

function cancelRequest() {
  controllerRef.current?.abort();
}
```

This is useful when an event handler needs access to the current controller without causing a render every time it changes.

## Ref Writes and Rendering

Avoid using a ref as a hidden state store:

```jsx
ref.current = value;
```

If the UI should reflect `value`, React needs state or another reactive mechanism. A ref write can be invisible to the user because it does not trigger rendering.

## Refs and Effects

A DOM ref is populated after React commits the element. Reading it during render is usually the wrong place for imperative DOM work.

Good:

```jsx
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

For layout-sensitive measurement that must happen before the browser paints, `useLayoutEffect` may be appropriate. Use it only when the timing requirement justifies it.

## Callback Refs

Sometimes you need to react when a DOM node is attached or replaced:

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

Callback refs are useful for dynamic lists or measurement lifecycles where an object ref alone is insufficient.

## Forwarding Refs

A custom component does not automatically expose its internal DOM node to its parent. When a reusable component intentionally needs an imperative API, React supports ref forwarding patterns.

Use this sparingly. Prefer a declarative component API whenever possible.

## Common Mistakes

### Mistake 1: Ref for UI state

```jsx
const count = useRef(0);
count.current += 1;
```

If the count must render, use state.

### Mistake 2: Mutating the DOM instead of state

Don't use a ref to manually maintain a CSS class that should simply be determined by state.

### Mistake 3: Reading `ref.current` too early

The DOM node may be `null` before commit or after unmount.

### Mistake 4: Forgetting cleanup

A ref can store a timer or controller, but storing it does not automatically clean it up.

### Mistake 5: Assuming refs are reactive

Changing `.current` does not cause React to render again.

## Practical Labs

1. Build an accessible autofocus search form.
2. Implement a timer whose ID is stored in a ref and cleaned up correctly.
3. Track the previous value of a slider.
4. Store an AbortController in a ref and add Cancel.
5. Measure a dynamic element and compare object refs with callback refs.

## Debugging Scenarios

**The UI doesn't update after changing `ref.current`.** That's expected. Use state if the UI depends on the value.

**`ref.current` is null.** The element may not be mounted yet or may have been conditionally removed.

**A timer continues after navigation.** Add cleanup for the timer lifecycle.

**Previous value equals current value unexpectedly.** Check when the ref is assigned; assigning during render can destroy the intended previous-render relationship.

## Assessment

1. What does `useRef` return?
2. Why doesn't `.current` trigger a render?
3. When should a value be state instead of ref?
4. Why are refs useful for DOM focus?
5. How can refs store timer IDs safely?
6. Why can ref-based mutable state make code harder to reason about?
7. When might `useLayoutEffect` be preferable for DOM measurement?
8. What problem do callback refs solve?
9. Does a ref automatically clean up a timer?
10. Does a child DOM node become accessible through a parent's ref automatically?

## Interview Questions

**What is the main difference between state and ref?** State is reactive and schedules rendering; refs persist mutable values without scheduling rendering.

**When would you use a ref for non-DOM data?** For operational mutable handles such as timer IDs, AbortControllers, or previous values that do not independently determine rendered UI.

**Why not use a global DOM selector?** A ref is scoped to the component instance and follows React's ownership model more closely.

**Can a ref cause a render?** Not by changing `.current` itself. A separate state update or external reactive mechanism would be required.

**When is a ref a code smell?** When it is being used to bypass state/props for ordinary UI data or to manually synchronize a DOM representation that React should own.

## Final Project

Build a `FocusAndTimerLab` containing:

- autofocus input
- focus button
- start/stop timer
- previous-count display
- request cancellation demo
- cleanup verification

Acceptance criteria:

- [ ] UI state uses state
- [ ] DOM actions use refs
- [ ] Timer is cleaned up
- [ ] AbortController is cleaned up/cancelled
- [ ] No global selectors
- [ ] No unnecessary DOM mutation
- [ ] Previous-value behavior is correct

## Day 29 Outcome

You can distinguish reactive state from stable mutable references, use refs for DOM and operational handles, and avoid turning refs into an untracked second state system.

Day 30 applies these principles to DOM manipulation and measurement.