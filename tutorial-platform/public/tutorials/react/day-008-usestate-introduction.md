---
title: useState Deep Introduction
slug: day-008-usestate-introduction
dayLabel: Day 8
level: Intermediate
estimatedMinutes: 120
order: 8
track: react
---

# Day 8: `useState` — Deep Introduction

## Goal

Understand state as changing UI data and master `useState`: initialization, setters, functional updates, batching, object/array updates, lazy initialization, reset patterns, toggles, derived values, state ownership, and common state mistakes.

## Prerequisites

- Day 7 completed
- JavaScript functions, arrays, and objects
- Event handling

## 1. What Is State?

State is data that a component remembers between renders and that can affect what the component renders.

Examples:

- counter value
- selected tab
- modal open/closed state
- form input
- shopping cart contents

State should represent information that needs to be remembered between renders. Avoid storing values that can be calculated from existing props or state.

## 2. `useState` Syntax

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <p>{count}</p>;
}
```

`useState(0)` returns a pair:

```text
[current state value, setter function]
```

The initial value is used to initialize the state for that component instance. Calling the setter requests a state update and a subsequent render when React processes that update.

## 3. Updating State

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

For a simple event handler where the next value is directly calculated from the current render's value, this is valid.

When the next value depends on the previous state, prefer a functional updater.

## 4. Functional Updates

When the next state depends on the previous state, use the updater form:

```jsx
setCount((previous) => previous + 1);
```

This is especially important for multiple updates in the same event:

```jsx
function addThree() {
  setCount((n) => n + 1);
  setCount((n) => n + 1);
  setCount((n) => n + 1);
}
```

React processes these updater functions against the pending state in sequence, so all three increments are represented in the resulting update.

## 5. State Setters Are Not Immediate Variable Mutation

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count);
}
```

The log can show the value from the current render. Calling the setter does not mutate the `count` variable captured by the currently executing function. A later render receives the updated state.

If you need to respond to a committed state change, later lessons will cover Effects.

## 6. Batching

React can batch multiple state updates so related updates are processed together. Do not write logic that assumes each setter immediately changes the local variable.

```jsx
setFirstName("Asha");
setLastName("Kumar");
```

Think in terms of **requesting state updates**, not mutating a local variable synchronously.

Batching is an implementation behavior you should understand, but your component logic should remain correct whether several related updates are processed together or separately.

## 7. Multiple State Variables

```jsx
function Profile() {
  const [name, setName] = useState("Asha");
  const [online, setOnline] = useState(false);

  return (
    <div>
      <p>{name}</p>
      <p>{online ? "Online" : "Offline"}</p>
    </div>
  );
}
```

Multiple independent state variables are often clearer than one large object when the values represent separate concerns.

## 8. Boolean State

```jsx
const [open, setOpen] = useState(false);

<button type="button" onClick={() => setOpen((value) => !value)}>
  {open ? "Close" : "Open"}
</button>
```

Functional toggles are a clean pattern because the next value depends on the previous value.

## 9. Updating Objects — Never Mutate State

Bad:

```jsx
user.name = "Ravi";
setUser(user);
```

Better:

```jsx
setUser((current) => ({
  ...current,
  name: "Ravi",
}));
```

Treat objects held in React state as immutable. Create a new object rather than mutating the existing state object.

### Nested objects

For nested state, copy each object along the path that changes:

```jsx
setUser((current) => ({
  ...current,
  address: {
    ...current.address,
    city: "Delhi",
  },
}));
```

Object spread is shallow. Spreading the outer object does not clone nested objects automatically.

## 10. Updating Arrays

Add:

```jsx
setItems((current) => [...current, newItem]);
```

Remove:

```jsx
setItems((current) =>
  current.filter((item) => item.id !== id)
);
```

Update one item:

```jsx
setItems((current) =>
  current.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  )
);
```

Avoid mutating methods such as `push` and `splice` directly on the existing state array. Use immutable transformations that create a new array.

## 11. Lazy Initial State

If calculating the initial state is expensive, pass an initializer function:

```jsx
const [items, setItems] = useState(() => loadItems());
```

React uses the initializer to obtain the initial state instead of requiring you to evaluate `loadItems()` as an argument expression on every component invocation.

This is different from:

```jsx
useState(loadItems());
```

Here, `loadItems()` is evaluated whenever the component function executes, even though React only uses that argument to initialize the state on the initial mount of that component instance.

The initializer should be pure. In development Strict Mode, React may call an initializer more than once to help detect accidental impurities, so it must not perform side effects.

## 12. Resetting State

Simple reset:

```jsx
const initialForm = { name: "", email: "" };
const [form, setForm] = useState(initialForm);

function reset() {
  setForm(initialForm);
}
```

This is safe as long as the state object is treated immutably. If `initialForm` is itself mutated elsewhere, the reset value can also be affected because it is the same object reference.

A factory can create a fresh reset object when that is useful:

```jsx
const createInitialForm = () => ({ name: "", email: "" });
const [form, setForm] = useState(createInitialForm);

function reset() {
  setForm(createInitialForm());
}
```

## 13. Derived Values: Don't Store What You Can Calculate

Avoid:

```jsx
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0);
```

when `itemCount` always equals `items.length`.

Prefer:

```jsx
const itemCount = items.length;
```

One source of truth is easier to maintain.

## 14. State Ownership

Ask: **Which component needs this data?**

If sibling components need the same changing data, their common parent is often a suitable owner:

```text
       App owns cart
       /          \
ProductList    CartSummary
     ↓              ↑
   props          props
```

This prepares you for lifting state up.

## 15. State and Component Instances

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((n) => n + 1)}>
      {count}
    </button>
  );
}

function App() {
  return (
    <>
      <Counter />
      <Counter />
    </>
  );
}
```

The two counters have independent state because they are separate component instances.

## 16. State Is a Snapshot Per Render

A useful mental model is that each render receives a snapshot of state. Event handlers created during that render see that render's values.

This explains why:

```jsx
setCount(count + 1);
console.log(count);
```

does not mean “change the local `count` variable immediately.” The setter schedules an update; it does not rewrite the variable belonging to the current render.

## 17. Event Handler Pitfall

Wrong:

```jsx
<button type="button" onClick={setCount(count + 1)}>
  Increase
</button>
```

This calls `setCount` while React is rendering the JSX expression.

Correct:

```jsx
<button type="button" onClick={() => setCount((n) => n + 1)}>
  Increase
</button>
```

The correct version passes a function for React to call when the click occurs.

## 18. End-to-End Practical: Interactive Product Cart Counter

```jsx
import { useState } from "react";

function CartDemo() {
  const [quantity, setQuantity] = useState(0);

  return (
    <section>
      <h2>Keyboard</h2>
      <p>Quantity: {quantity}</p>
      <button type="button" onClick={() => setQuantity((q) => q + 1)}>
        +
      </button>
      <button
        type="button"
        disabled={quantity === 0}
        onClick={() => setQuantity((q) => q - 1)}
      >
        -
      </button>
      <button type="button" onClick={() => setQuantity(0)}>
        Reset
      </button>
    </section>
  );
}
```

Extend this with `price`, a derived total, and an availability limit. If the limit is derived from product data, do not duplicate it in state.

## 19. Complete State Lab

Build a dashboard with:

- counter
- online/offline toggle
- selected tab
- editable profile object
- todo array
- derived completed count
- reset action

Acceptance criteria:

- [ ] No direct state mutation.
- [ ] Previous-state updates use functional syntax.
- [ ] Arrays use immutable update patterns.
- [ ] Objects use immutable update patterns.
- [ ] Nested objects are updated by copying each changed level.
- [ ] Derived values are calculated instead of duplicated in state.
- [ ] Two component instances demonstrate independent state.

## Hands-on Challenges

### Challenge 1 — Counter

Increase, decrease, reset, and prevent negative values.

### Challenge 2 — Toggle

Build a show/hide panel.

### Challenge 3 — Form State

Manage `{ name, email }` as one object and update one field immutably.

### Challenge 4 — Todo Array

Add, remove, and toggle completion using immutable array operations.

### Challenge 5 — Multiple Updates

Write one handler that increments a counter three times using functional updates. Explain why three direct `setCount(count + 1)` calls do not produce the same result.

### Challenge 6 — Lazy Initialization

Create initial state from a local calculation and compare an initializer function with an eagerly evaluated expression. Make sure the initializer has no side effects.

### Challenge 7 — Nested Object

Manage a profile containing nested `address` data. Update only `address.city` without mutating the existing objects.

## Common Mistakes

1. Direct mutation of objects or arrays.
2. Assuming setters mutate local variables immediately.
3. Using direct updates when the next value depends on previous state.
4. Storing derived values unnecessarily.
5. Creating duplicated state with two sources of truth.
6. Executing an event handler during render.
7. Forgetting that each component instance has independent state.
8. Performing side effects inside a lazy initializer.
9. Assuming object spread deeply clones nested state.

## Assessment Quiz

### 1. What does `useState` return?

A. A state value and a setter function.

**Answer:** A state value and a setter function.

### 2. When should you use functional updates?

A. Whenever the next state depends on the previous state.

**Answer:** When the next state depends on the previous state.

### 3. Why doesn't `console.log` immediately show a new state value after a setter?

A. The setter does not mutate the variable captured by the current render.

**Answer:** The current render keeps its snapshot; a later render receives the updated state.

### 4. How do you update an object immutably?

A. Create a new object, commonly with object spread, and replace the changed property.

**Answer:** Create a new object instead of mutating the existing object.

### 5. How do you remove an array item immutably?

A. Use `filter()` to create a new array.

**Answer:** Use `filter()` or another immutable transformation.

### 6. What is lazy initialization?

A. Passing a function to `useState` so React can call it to calculate the initial state.

**Answer:** Passing an initializer function rather than eagerly evaluating the initial value expression.

### 7. What is derived state?

A. A value calculated from existing props or state.

**Answer:** A value that can be calculated from existing data rather than maintained as a separate source of truth.

### 8. Why can duplicate state cause bugs?

A. Two values that should agree can become out of sync.

**Answer:** It creates multiple sources of truth.

### 9. Can two instances of the same component have different state?

A. Yes.

**Answer:** Yes. Each component instance has its own state.

### 10. Why should event handlers not be called during render?

A. Calling them during render executes the action immediately instead of passing a function for the event.

**Answer:** Event handlers should be passed as functions so they run when the event occurs.

## Interview Questions and Answers

**Q: What is `useState`?**  
A: A React Hook that lets a function component retain state between renders and request updates to that state.

**Q: What is a state snapshot?**  
A: Each render receives its own state values; event handlers created in that render see that render's snapshot.

**Q: Why use functional updates?**  
A: When the next state depends on previous state, the updater receives the pending state and avoids relying on a potentially stale render value.

**Q: Why is direct mutation problematic?**  
A: React state should be treated as immutable. Mutating existing objects or arrays can produce incorrect updates and makes state changes harder to reason about.

**Q: How do you update an object state?**  
A: Create a new object, commonly with object spread, while preserving unchanged properties. For nested data, copy each object along the changed path.

**Q: How do you update an array?**  
A: Create a new array using methods such as `map`, `filter`, and spread rather than mutating the existing array.

**Q: What is derived state?**  
A: A value calculated from existing props or state. If it can be calculated during rendering, it usually does not need its own state.

**Q: What is lazy initialization?**  
A: Passing an initializer function to `useState` so the initial value can be computed by React when initializing that state.

**Q: Why can multiple state setters be batched?**  
A: React can group related updates to reduce unnecessary rendering work. Component logic should not depend on setters synchronously mutating local variables.

**Q: Why must a lazy initializer be pure?**  
A: React may call it more than once in development Strict Mode to help detect impurities. It should calculate and return a value without performing side effects.

## Final Project

Build a **Shopping Cart Interaction Lab**:

```text
ProductCard
   ↓ onAdd
Cart
   ├── quantity
   ├── remove
   ├── clear
   └── derived total
```

Use `useState` only. Do not introduce Context, reducers, or external state libraries yet. The purpose is to master local state first.

## Day 8 Outcome

You understand state as a render-driven snapshot and can safely update primitive, object, nested-object, and array state using `useState`. You understand when to use functional updates, how to avoid duplicated derived state, and how state ownership affects component design. You are ready for multiple-state patterns and more complex state design in Day 9.