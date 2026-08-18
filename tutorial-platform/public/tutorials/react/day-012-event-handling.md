---
title: Event Handling
slug: day-012-event-handling
dayLabel: Day 12
level: Intermediate
estimatedMinutes: 60
order: 12
track: react
---
# Day 12: Event Handling

## Goal

Understand React events deeply enough to build reliable click, input, form, keyboard, mouse, checkbox, and list interactions.

## Mental Model

```text
Browser interaction
      ↓
React event handler
      ↓
Application logic
      ↓
State update / side effect
      ↓
React render
```

## 1. Event Handler Syntax

React uses camelCase event props and functions.

```jsx
<button onClick={handleClick}>Save</button>
```

Pass a function reference. Do not call it during render:

```jsx
// Wrong for a click handler
<button onClick={handleClick()}>Save</button>

// Correct
<button onClick={handleClick}>Save</button>
```

## 2. Inline Handlers

Inline functions are useful when the logic is small.

```jsx
<button onClick={() => setCount((current) => current + 1)}>
  Increase
</button>
```

For complex behavior, extract a named handler for readability and testing.

## 3. Passing Arguments

```jsx
<button onClick={() => removeItem(item.id)}>Delete</button>
```

The arrow function delays the call until the click occurs.

## 4. Event Object

Handlers receive an event object.

```jsx
function handleChange(event) {
  console.log(event.target.value);
}
```

For checkboxes:

```jsx
function handleAgree(event) {
  setAgree(event.target.checked);
}
```

Use the property appropriate to the input type.

## 5. Form Submit

Use `onSubmit` on the form rather than putting submission logic only on a button.

```jsx
function handleSubmit(event) {
  event.preventDefault();
  console.log("Submit application");
}

<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

`preventDefault()` prevents the browser's default form navigation so React can control the workflow.

## 6. Common React Events

| Event | Typical use |
|---|---|
| `onClick` | Buttons and clickable UI |
| `onChange` | Controlled form fields |
| `onSubmit` | Form submission |
| `onFocus` | Focus behavior |
| `onBlur` | Leaving a field |
| `onKeyDown` | Keyboard shortcuts |
| `onMouseEnter` | Pointer entering an element |
| `onDoubleClick` | Double-click interaction |

Event support depends on the element and browser semantics; prefer semantic HTML controls.

## 7. Keyboard Events

```jsx
function handleKeyDown(event) {
  if (event.key === "Enter") {
    submitSearch();
  }
}
```

Prefer meaningful keys such as `Enter`, `Escape`, and `ArrowDown` rather than hard-coded key codes.

## 8. Event Propagation

Events can bubble from a child to ancestors.

```jsx
<div onClick={() => console.log("Card clicked")}>
  <button
    onClick={(event) => {
      event.stopPropagation();
      console.log("Delete clicked");
    }}
  >
    Delete
  </button>
</div>
```

Use `stopPropagation()` only when the parent interaction should genuinely not receive the event. It should not be used as a general fix for event architecture.

## 9. `preventDefault` vs `stopPropagation`

They solve different problems.

- `preventDefault()` stops the browser's default action.
- `stopPropagation()` stops the event from continuing through propagation.

They are not interchangeable.

## 10. React Event System

React provides event handling APIs that integrate browser events with React's rendering model. Modern React uses delegated event handling internally, while developers normally interact with the event object through familiar properties and methods.

Do not teach the old claim that every event is a persistent pooled object that must be manually persisted; modern React removed event pooling.

## 11. Event Handlers and State Snapshots

Handlers run with values from the render in which they were created.

```jsx
function handleClick() {
  console.log(count);
  setCount((current) => current + 1);
  console.log(count); // still the current render's value
}
```

This is why state should be understood as a snapshot for a particular render, not as a mutable variable that changes immediately inside the same function.

## Complete Example

```jsx
import { useState } from "react";

export default function EventLab() {
  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      accepted ? `Welcome, ${name}` : "Please accept the terms",
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setName("");
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
        />
        Accept terms
      </label>
      <button type="submit">Continue</button>
      <p>{message}</p>
    </form>
  );
}
```

## Real-World Patterns

### List action

```jsx
<button type="button" onClick={() => removeItem(item.id)}>
  Delete
</button>
```

### Checkbox

```jsx
<input
  type="checkbox"
  checked={enabled}
  onChange={(event) => setEnabled(event.target.checked)}
/>
```

### Search field

```jsx
<input
  value={query}
  onChange={(event) => setQuery(event.target.value)}
  onKeyDown={(event) => {
    if (event.key === "Enter") search();
  }}
/>
```

## Common Mistakes

- Calling the handler during render.
- Forgetting `preventDefault()` for a controlled form workflow.
- Using `value` instead of `checked` for checkbox state.
- Calling `stopPropagation()` everywhere instead of fixing component boundaries.
- Using array indexes or unstable values to identify list actions.
- Putting too much business logic inside JSX.
- Assuming state changes immediately inside the current event handler.

## Hands-on Lab

Build a **Candidate Review Panel** with:

- Approve and Reject actions.
- Search input.
- Keyboard Enter shortcut.
- Checkbox for shortlist.
- Submit form.
- Parent card click plus child action demonstrating propagation correctly.

Acceptance criteria:

- Uses `onClick`, `onChange`, and `onSubmit`.
- Uses event values correctly.
- Uses a parameterized handler for candidate ID.
- Uses `preventDefault` only for the intended default action.
- Uses `stopPropagation` only where parent/child behavior requires it.

## Debugging Challenge

Find the bug:

```jsx
<form onSubmit={handleSubmit}>
  <button onClick={handleSubmit}>Save</button>
</form>
```

Explain why the handler can run through both the button click and form submission path. Rewrite it using a submit button and one `onSubmit` handler.

## Assessment

1. Why use `onSubmit` on a form? **It represents the form submission action.**
2. How do you pass an ID? **Wrap the handler in a function.**
3. What does `preventDefault()` do? **Stops the default browser action.**
4. What does `stopPropagation()` do? **Stops event propagation.**
5. Which property is used for a checkbox? **`checked`.**
6. Why can state logs look old after a setter? **The handler sees the current render's state snapshot.**

## Interview Questions

**What is an event handler?** A function invoked in response to a user/browser event.

**Why `onClick={handleClick}` instead of `onClick={handleClick()}`?** The first passes a function; the second executes it during rendering.

**What is the difference between `preventDefault` and `stopPropagation`?** Default action vs propagation.

**Why use functional state updates in event handlers?** When the next state depends on previous state.

**How do keyboard shortcuts work?** Handle keyboard events and inspect semantic keys such as `Enter` or `Escape`.

**Should every click be handled with a `div`?** No. Prefer semantic buttons, links, and form controls for accessibility and correct browser behavior.

## Day 12 Outcome

You can implement reliable React event handling for buttons, forms, inputs, checkboxes, keyboard actions, list operations, and propagation scenarios, while understanding state snapshots and browser defaults.
