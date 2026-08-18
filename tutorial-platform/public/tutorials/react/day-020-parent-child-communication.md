---
title: Parent-Child Communication
slug: day-020-parent-child-communication
dayLabel: Day 20
level: Intermediate
estimatedMinutes: 60
order: 20
track: react
---
# Day 20: Parent-Child Communication

## Goal

Master React's parent-child communication model: parent-to-child props, child-to-parent callbacks, payload design, controlled components, event boundaries, and component API contracts. Learn how to keep state ownership clear without creating tightly coupled components.

## Prerequisites

- Days 1–19 completed
- Comfortable with props, state, events, lists, and lifting state up

## Core Mental Model

React communication is primarily top-down:

```text
Parent state
    │
    │ props / values
    ▼
Child
    │
    │ callback / intent
    ▼
Parent state update
```

A child does not directly mutate a parent's state. The parent exposes a function or callback contract, and the child invokes it when an action occurs.

## 1. Parent to Child: Props

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}

function App() {
  return <UserCard name="Asha" role="Frontend Developer" />;
}
```

Props define the child's input API.

## 2. Child to Parent: Callback Props

The parent owns the state:

```jsx
function App() {
  const [message, setMessage] = useState("");

  const handleSelect = (value) => {
    setMessage(`Selected: ${value}`);
  };

  return <Selector onSelect={handleSelect} />;
}
```

The child invokes the callback:

```jsx
function Selector({ onSelect }) {
  return (
    <button type="button" onClick={() => onSelect("React")}>
      Select React
    </button>
  );
}
```

The child is communicating **intent**; the parent decides what state change should happen.

## 3. Never Call the Callback During Render

Incorrect:

```jsx
<button onClick={onSelect("React")}>Select</button>
```

This executes immediately while rendering.

Correct:

```jsx
<button onClick={() => onSelect("React")}>Select</button>
```

The function is invoked later by the event.

## 4. Passing Payloads

List actions usually need an identifier:

```jsx
<button type="button" onClick={() => onDelete(task.id)}>
  Delete
</button>
```

The parent can then update the authoritative collection:

```jsx
const handleDelete = (id) => {
  setTasks((current) => current.filter((task) => task.id !== id));
};
```

## 5. Designing Callback Contracts

Prefer meaningful APIs:

```jsx
<TaskItem
  task={task}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
/>
```

over vague contracts:

```jsx
<TaskItem onChange={doSomething} />
```

Good callback names communicate intent.

Examples:

- `onDelete(taskId)`
- `onSelect(productId)`
- `onStatusChange(taskId, nextStatus)`
- `onQuantityChange(productId, quantity)`

## 6. Payload Shape

For simple actions, positional arguments can be clear:

```jsx
onStatusChange(task.id, "done");
```

For complex domain actions, an object can make the contract easier to extend:

```jsx
onStatusChange({
  taskId: task.id,
  nextStatus: "done",
});
```

Choose one convention and keep it consistent within the component API.

## 7. Controlled Components

A parent-controlled input exposes a value and change callback:

```jsx
function SearchInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
```

The parent:

```jsx
function App() {
  const [query, setQuery] = useState("");

  return <SearchInput value={query} onChange={setQuery} />;
}
```

This is a reusable communication contract.

## 8. Event + Business Data

Sometimes the child needs to translate a browser event into a domain action:

```jsx
function DepartmentSelect({ employeeId, onDepartmentChange }) {
  return (
    <select
      value="Engineering"
      onChange={(event) =>
        onDepartmentChange(employeeId, event.target.value)
      }
    >
      <option value="HR">HR</option>
      <option value="Engineering">Engineering</option>
    </select>
  );
}
```

The parent receives business data rather than needing to know about the child's DOM event implementation.

## 9. Parent Should Own Business State

A child should not be responsible for deleting an item from the parent's array simply because it renders the delete button.

```jsx
function TaskItem({ task, onDelete }) {
  return (
    <button type="button" onClick={() => onDelete(task.id)}>
      Delete {task.title}
    </button>
  );
}
```

This makes `TaskItem` reusable in different lists because it communicates an action rather than owning the collection.

## 10. Full Task Example

```jsx
import { useState } from "react";

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <li>
      <span>
        {task.title} — {task.done ? "Done" : "Pending"}
      </span>
      <button
        type="button"
        onClick={() => onComplete(task.id)}
        disabled={task.done}
      >
        Complete
      </button>
      <button type="button" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read docs", done: false },
    { id: 2, title: "Build app", done: false },
  ]);

  const completeTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: true } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return (
    <main>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onComplete={completeTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
}
```

## 11. Sibling Communication

Children should normally not communicate by directly finding each other. If two siblings need to coordinate, place their shared state in the parent:

```text
          Parent
        /         \
   InputChild   PreviewChild
       │             ▲
       └─ callback ──┘
```

This connects directly to Day 19's lifting-state-up pattern.

## 12. Prop Drilling

Passing a prop through one or two layers is normal. It becomes a design concern when intermediate components receive and forward many props they do not use:

```text
App
 ↓
Layout
 ↓
Panel
 ↓
Section
 ↓
Button
```

Possible solutions:

- move the consumer closer to the owner
- use composition
- use Context for broadly shared values
- use a dedicated state solution when the application actually needs it

Do not treat prop drilling as automatically bad.

## 13. Composition Can Reduce Communication Complexity

Instead of passing many layout-specific props through intermediate components, sometimes pass the content itself:

```jsx
function Panel({ header, children }) {
  return (
    <section>
      <header>{header}</header>
      <div>{children}</div>
    </section>
  );
}
```

This is often cleaner than creating a long chain of configuration props.

## 14. Ref vs Callback Communication

Do not use refs as a replacement for normal parent-child data flow. Props and callbacks are the default communication model. Refs are appropriate for imperative operations such as focusing an input or interacting with a DOM node.

This distinction becomes important later when learning `useRef` and imperative APIs.

## 15. Accessibility and Communication

Use semantic controls when emitting actions:

```jsx
<button type="button" onClick={onDelete}>
  Delete
</button>
```

Avoid making a non-interactive `<div>` behave like a button unless there is a strong reason. Communication design includes accessible interaction design.

## Common Mistakes

### Calling a callback immediately

Use a function wrapper when arguments are required.

### Passing raw setters everywhere

`onSelectProduct` often communicates intent more clearly than exposing `setSelectedProduct` to deeply nested children.

### Child owns parent collection logic

Keep collection ownership in the component responsible for the collection.

### Callback API is ambiguous

Prefer names and payloads that describe the business action.

### Overusing Context

First determine whether normal props, composition, or better state placement solve the problem.

### Using refs for normal data flow

Use props and callbacks for declarative communication.

## End-to-End Mini Project: Task Manager

Requirements:

- Parent owns task array.
- Child displays one task.
- Child can request complete/delete.
- Parent performs immutable updates.
- List uses stable IDs as keys.
- Add-task form uses a callback contract.
- Empty state is displayed when no tasks remain.

### Acceptance Criteria

- [ ] Parent owns business state.
- [ ] Child receives data through props.
- [ ] Child emits actions through callbacks.
- [ ] Callback names describe intent.
- [ ] Payloads contain enough information for the parent.
- [ ] No direct child mutation of parent state.
- [ ] Stable list keys are used.
- [ ] Buttons are semantic and accessible.

## Assessment Quiz

1. How does a parent pass data to a child?
2. How does a child request a parent update?
3. Why should a callback not be invoked during render?
4. What is a callback payload?
5. Why use `onDelete(id)` rather than passing an entire mutable list to a row?
6. When does prop drilling become a meaningful concern?
7. When should a ref be used instead of a callback?

**Answers:**

1. Through props.
2. By invoking a callback prop.
3. It executes during rendering instead of in response to the intended event.
4. Data supplied when the child invokes the callback.
5. The parent owns the collection and the child only needs the identity/action information.
6. When many intermediate layers forward props and the API becomes difficult to maintain.
7. For imperative operations such as DOM focus, not ordinary data flow.

## Interview Questions

**How does child-to-parent communication work in React?**

The parent passes a callback prop to the child. The child invokes it with an optional payload, and the parent decides how to update its state.

**Why is React described as one-way data flow?**

Authoritative data normally flows from parent to child through props. A child can request changes through callbacks, but it does not directly mutate the parent's state.

**Why should callbacks represent intent?**

An intent-oriented API keeps the child decoupled from the parent's implementation. `onDelete(id)` is more reusable than a child knowing how a parent's array is stored.

**When is a callback payload object preferable?**

When an action has several related values or may evolve over time. A named object can make the contract self-documenting.

**How can you reduce parent-child coupling?**

Keep clear prop contracts, use composition, keep state near the appropriate owner, and introduce Context or state management only when justified.

**Should children receive setters directly?**

They can, and simple examples often do. In larger components, a semantic callback such as `onStatusChange` can better express the child's allowed action and hide the parent's state implementation.

## Final Challenge

Build an ecommerce product grid where:

- Parent owns cart state.
- `ProductCard` receives product data.
- `ProductCard` calls `onAddToCart(productId)`.
- Cart summary receives derived totals.
- Quantity controls send `onQuantityChange(productId, quantity)`.
- No child directly mutates the cart.
- Components remain reusable.

## Self Check

You should be able to explain:

- parent → child props
- child → parent callbacks
- callback invocation timing
- payload design
- controlled components
- sibling coordination
- prop drilling
- composition
- callbacks vs refs
- semantic component APIs

## Day 20 Outcome

You can now design clear, reusable parent-child communication contracts instead of treating callbacks as simple plumbing. Day 21 will combine these patterns in an integrated Todo project.
