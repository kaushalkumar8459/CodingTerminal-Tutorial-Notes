---
title: Managing Multiple States
slug: day-009-managing-multiple-states
dayLabel: Day 9
level: Intermediate
estimatedMinutes: 60
order: 9
track: react
---
# Day 9: Managing Multiple States

## Goal

Learn how to design several state values without redundant data, stale updates, or confusing state boundaries.

## Prerequisites

Days 1–8, especially `useState`, props, events, and controlled inputs.

## 1. Multiple `useState` Values

Use separate state when values have independent meaning or update independently.

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [isOpen, setIsOpen] = useState(false);
```

The existence of multiple state variables is not a problem. **Good state modeling** is the goal.

## 2. Controlled Inputs

A controlled input gets its displayed value from React state and reports changes through an event.

```jsx
<input
  value={name}
  onChange={(event) => setName(event.target.value)}
/>
```

Flow:

```text
User input → event → setter → new render → updated input
```

## 3. State vs Derived Data

Do not store a value that can be calculated from existing state unless there is a deliberate reason.

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const fullName = `${firstName} ${lastName}`.trim();
```

Avoid creating another `fullName` state by default. Two sources of truth can become inconsistent.

## 4. Functional Updates

When the next state depends on the previous state, use the functional form.

```jsx
setCount((current) => current + 1);
setCount((current) => current + 1);
```

This is especially important when several updates are queued in the same event.

## 5. Resetting Several Values

Keep initial values explicit and make reset behavior predictable.

```jsx
const initialForm = { name: "", email: "", city: "" };
const [form, setForm] = useState(initialForm);

function resetForm() {
  setForm(initialForm);
}
```

Object-state updates are covered deeply on Day 10.

## 6. Separate State vs Grouped State

Both approaches are valid.

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
```

or:

```jsx
const [profile, setProfile] = useState({ firstName: "", lastName: "" });
```

Choose based on relationships and update patterns—not on a blanket rule.

## 7. Avoid Impossible State Combinations

Instead of several booleans that can contradict one another:

```jsx
const [status, setStatus] = useState("idle");
```

Possible values can be `idle`, `loading`, `success`, and `error`. A single status can make mutually exclusive UI states easier to reason about.

## 8. State Ownership

Ask **which component should own the source of truth?** Keep state close to where it is used. If sibling components need the same data, the state may need to move to their common parent. This prepares you for lifting state up.

## Real-World Example

```jsx
import { useState } from "react";

const initialForm = { name: "", email: "", city: "" };

export default function RegistrationForm() {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input name="city" value={form.city} onChange={handleChange} />
      <p>{`${form.name} — ${form.city}`}</p>
      <button type="button" onClick={() => setForm(initialForm)}>
        Reset
      </button>
    </form>
  );
}
```

## Common Mistakes

- Storing derived values unnecessarily.
- Using `setCount(count + 1)` when the next value depends on previous state in repeated updates.
- Creating many booleans for mutually exclusive states.
- Putting all state into one giant object without a reason.
- Putting shared state in a child when multiple siblings need it.
- Treating a normal constant as state when changing it does not need to update the UI.

## Hands-on Lab

Build a **Student Registration Panel** with name, email, city, course, open/closed UI state, submit status, live preview, and reset.

Acceptance criteria:

- Three or more controlled inputs.
- One independent boolean state.
- One derived value.
- Functional update where previous state is required.
- No redundant state.
- Reset restores the initial UI.

## Assessment

1. When should state be split?
2. What makes an input controlled?
3. Why avoid redundant state?
4. When should functional updates be used?
5. Why can one `status` value be better than several booleans?
6. When should state move to a parent?

**Answers:** independent meaning; React-driven `value`; to avoid multiple sources of truth; when next state depends on previous state; it prevents contradictory combinations; when multiple components need the same source of truth.

## Interview Questions

**Can a component use multiple `useState` hooks?** Yes.

**Should every form use one object?** No. Both separate and grouped state are valid.

**What is derived data?** A value calculated from existing props/state.

**Why avoid redundant state?** It can become inconsistent and needs synchronization.

**Why use functional updates?** They calculate from the latest queued state when the next value depends on previous state.

## Self Check

Explain why each state value exists in your lab. If you cannot explain a state variable's ownership or why it cannot simply be derived, redesign it.

## Day 9 Outcome

You can model multiple state values, controlled inputs, derived values, reset behavior, state ownership, and safe previous-state updates.
