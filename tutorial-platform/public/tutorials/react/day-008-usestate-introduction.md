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
Understand state as changing UI data and master `useState`: initialization, setters, functional updates, batching, object/array updates, lazy initialization, reset patterns, toggles, derived values, and common state mistakes.

## Prerequisites
- Day 7 completed
- JavaScript functions, arrays, objects
- Event handling

## 1. What Is State?
State is data that can change over time and whose changes may affect what a component renders.

Examples:
- counter value
- selected tab
- modal open/closed
- form input
- shopping cart contents

State should represent information needed to render the UI or coordinate behavior. Avoid storing values that can be calculated from existing props/state.

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

The initial value is used for the component's initial state. Calling the setter requests an update.

## 3. Updating State

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

For simple event handlers where the next value is directly based on the current render value, this is valid.

## 4. Functional Updates
When the next state depends on the previous state, prefer the updater form:

```jsx
setCount((previous) => previous + 1);
```

This is especially important for multiple updates:

```jsx
function addThree() {
  setCount((n) => n + 1);
  setCount((n) => n + 1);
  setCount((n) => n + 1);
}
```

Each updater receives the latest queued state for that update.

## 5. State Setters Are Not Immediate Variable Mutation

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count);
}
```

The log can show the value from the current render. Calling the setter does not mutate the `count` variable captured by the currently executing function. A later render receives the updated state.

If you need to react to a committed state change, later lessons will cover `useEffect`.

## 6. Batching
React may batch multiple state updates so related changes can be processed together. Do not write logic that assumes each setter immediately changes the local variable.

```jsx
setFirstName("Asha");
setLastName("Kumar");
```

Think in terms of **requesting a new render**, not mutating a variable synchronously.

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

<button onClick={() => setOpen((value) => !value)}>
  {open ? "Close" : "Open"}
</button>
```

Functional toggles are a clean pattern because the next value depends on the previous value.

## 9. Updating Objects — Never Mutate
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

React state values should be treated as immutable. Create a new object rather than mutating the existing object.

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

Avoid mutating methods such as `push`, `splice`, or direct property assignment on the existing state value.

## 11. Lazy Initial State
If creating the initial state is expensive, pass an initializer function:

```jsx
const [items, setItems] = useState(() => loadItems());
```

The function is used to calculate the initial state rather than calling `loadItems()` on every render.

This is different from:

```jsx
useState(loadItems());
```

which evaluates `loadItems()` during every component execution before passing the resulting value to `useState`.

## 12. Resetting State
Simple reset:

```jsx
const initialForm = { name: "", email: "" };
const [form, setForm] = useState(initialForm);

function reset() {
  setForm(initialForm);
}
```

For objects, consider whether the initial object should be recreated when necessary to avoid sharing mutable references in custom patterns.

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

If sibling components need the same changing data, the common parent is often a suitable owner:

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
  return <button onClick={() => setCount((n) => n + 1)}>{count}</button>;
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

does not mean “change the local `count` variable immediately.”

## 17. Event Handler Pitfall
Wrong:

```jsx
<button onClick={setCount(count + 1)}>Increase</button>
```

This executes during rendering.

Correct:

```jsx
<button onClick={() => setCount((n) => n + 1)}>
  Increase
</button>
```

## 18. End-to-End Practical: Interactive Product Cart Counter

```jsx
import { useState } from "react";

function CartDemo() {
  const [quantity, setQuantity] = useState(0);

  return (
    <section>
      <h2>Keyboard</h2>
      <p>Quantity: {quantity}</p>
      <button onClick={() => setQuantity((q) => q + 1)}>+</button>
      <button
        disabled={quantity === 0}
        onClick={() => setQuantity((q) => q - 1)}
      >
        -
      </button>
      <button onClick={() => setQuantity(0)}>Reset</button>
    </section>
  );
}
```

Extend this with `price`, derived total, and an availability limit.

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
- [ ] Derived values are calculated instead of duplicated in state.
- [ ] Two component instances demonstrate independent state.

## Hands-on Challenges
### Challenge 1 — Counter
Increase, decrease, reset, and prevent negative values.

### Challenge 2 — Toggle
Build a show/hide panel.

### Challenge 3 — Form State
Manage `{name, email}` as one object and update one field immutably.

### Challenge 4 — Todo Array
Add, remove, and toggle completion using immutable array operations.

### Challenge 5 — Multiple Updates
Write one handler that increments a counter three times using functional updates. Explain why three direct `setCount(count + 1)` calls do not produce the same result.

### Challenge 6 — Lazy Initialization
Create initial state from a local calculation and compare an initializer function with an eagerly evaluated expression.

## Common Mistakes
1. Direct mutation of objects/arrays.
2. Assuming setters mutate local variables immediately.
3. Using direct updates when the next value depends on previous state.
4. Storing derived values unnecessarily.
5. Creating duplicated state with two sources of truth.
6. Executing an event handler during render.
7. Forgetting that each component instance has independent state.
8. Using an initializer function incorrectly.

## Assessment Quiz
1. What does `useState` return?
2. When should you use functional updates?
3. Why doesn't `console.log` immediately show a new state value after a setter?
4. How do you update an object immutably?
5. How do you remove an array item immutably?
6. What is lazy initialization?
7. What is derived state?
8. Why can duplicate state cause bugs?
9. Can two instances of the same component have different state?
10. Why should event handlers not be called during render?

## Interview Questions and Answers
**Q: What is `useState`?** A: A React Hook that lets a function component retain state between renders and request updates to that state.

**Q: What is a state snapshot?** A: Each render receives its own state values; event handlers created in that render see that render's snapshot.

**Q: Why use functional updates?** A: When the next state depends on the previous state, the updater receives the appropriate pending state and avoids relying on a stale render value.

**Q: Why is direct mutation problematic?** A: It breaks immutable update expectations and can prevent React/application logic from reliably recognizing the intended change.

**Q: How do you update an object state?** A: Create a new object, commonly with object spread, while preserving unchanged properties.

**Q: How do you update an array?** A: Create a new array using methods such as `map`, `filter`, and spread rather than mutating the existing array.

**Q: What is derived state?** A: A value calculated from existing props/state. If it can be calculated during rendering, it usually does not need its own state.

**Q: What is lazy initialization?** A: Passing an initializer function to `useState` so the initial value can be computed lazily.

**Q: Why can multiple state setters be batched?** A: React can group related updates to reduce unnecessary rendering work; application code should not depend on synchronous setter mutation.

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
You understand state as a render-driven snapshot and can safely update primitive, object, and array state using `useState`. You are ready for multiple-state patterns and more complex state design in Day 9.