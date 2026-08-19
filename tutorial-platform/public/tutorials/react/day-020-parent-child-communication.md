---
title: Parent-Child Communication
slug: day-020-parent-child-communication
dayLabel: Day 20
level: Intermediate
estimatedMinutes: 100
order: 20
track: react
---
# Day 20 [Intermediate]: Parent-Child Communication

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Common Mistakes](#common-mistakes)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 20 Outcome](#day-20-outcome)

## Goal

Master React's parent-child communication model and learn to design reusable component contracts. You will learn parent-to-child props, child-to-parent callbacks, payload design, controlled components, sibling coordination, event boundaries, composition, prop drilling, and the difference between declarative communication and imperative refs.

## Prerequisites

- Days 1–19 completed
- Components and JSX
- Props
- `useState`
- Event handling
- Lists and keys
- Forms and controlled inputs
- Lifting state up

## Explanation

React communication is primarily one-way and declarative:

```text
                 Parent
          owns authoritative state
              /          \
       props ↓            ↑ callback / intent
            Child A     Child B
```

A parent passes data and behavior to a child through props. A child cannot directly mutate the parent's state. Instead, the parent exposes a callback and the child invokes that callback when the user expresses an intent.

This creates a predictable contract:

```text
Parent state
    ↓
props / values
    ↓
Child renders UI
    ↓
user action
    ↓
callback(payload)
    ↓
Parent decides state update
```

The important design question is not merely “How do I pass a function?” It is:

> **Which component owns the state, and what is the smallest useful API that another component needs to communicate with it?**

## Topic by Topic

### 1. Parent → Child: Props

Props are the child's input API.

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

The child should treat props as read-only inputs. It can use them to render, derive values, and invoke callback props.

### 2. Child → Parent: Callback Props

The parent owns the state and passes a callback:

```jsx
function App() {
  const [message, setMessage] = useState("");

  const handleSelect = (value) => {
    setMessage(`Selected: ${value}`);
  };

  return <Selector onSelect={handleSelect} />;
}
```

The child emits intent:

```jsx
function Selector({ onSelect }) {
  return (
    <button type="button" onClick={() => onSelect("React")}>
      Select React
    </button>
  );
}
```

The child does not need to know how the parent stores the selection.

### 3. Callback Invocation Timing

This is wrong:

```jsx
<button onClick={onSelect("React")}>Select</button>
```

It calls `onSelect` while rendering.

This is correct:

```jsx
<button onClick={() => onSelect("React")}>Select</button>
```

React receives a function and invokes it when the event occurs.

If no payload is required, passing the function directly is also valid:

```jsx
<button onClick={onSave}>Save</button>
```

### 4. Payload Design

A callback often needs domain information such as an ID:

```jsx
<button type="button" onClick={() => onDelete(task.id)}>
  Delete
</button>
```

The parent can update the authoritative collection:

```jsx
const handleDelete = (id) => {
  setTasks((current) => current.filter((task) => task.id !== id));
};
```

For more complex actions, an object can make the contract explicit:

```jsx
onStatusChange({
  taskId: task.id,
  nextStatus: "done",
});
```

Use a consistent convention within a component API.

### 5. Semantic Callback Contracts

Prefer:

```jsx
<TaskItem
  task={task}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
/>
```

over an ambiguous API:

```jsx
<TaskItem onChange={doSomething} />
```

Good callback names communicate intent:

- `onDelete(taskId)`
- `onSelect(productId)`
- `onStatusChange(taskId, nextStatus)`
- `onQuantityChange(productId, quantity)`
- `onSubmit(formData)`

### 6. Parent Should Own Business State

If a parent owns a task collection, a row component should request an action rather than mutate the collection itself.

```jsx
function TaskItem({ task, onDelete }) {
  return (
    <button type="button" onClick={() => onDelete(task.id)}>
      Delete {task.title}
    </button>
  );
}
```

This keeps `TaskItem` reusable and separates presentation from collection ownership.

### 7. Controlled Components

A controlled component receives its important value from props and reports changes through a callback:

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

Parent:

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");

  return <SearchInput value={query} onChange={setQuery} />;
}
```

The input does not maintain a competing source of truth for its value.

### 8. Event Data vs Business Data

A reusable child can translate a DOM event into domain information:

```jsx
function DepartmentSelect({ employeeId, value, onDepartmentChange }) {
  return (
    <select
      value={value}
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

The parent receives `employeeId` and the new department instead of needing to understand the child's DOM implementation.

### 9. Child Should Not Mutate Props

Avoid patterns such as:

```jsx
// Wrong
props.user.name = "New name";
```

Instead, communicate the desired action:

```jsx
onNameChange("New name");
```

The owner decides how to update state immutably.

### 10. Multiple Children and Sibling Communication

Siblings should normally coordinate through their common owner:

```text
              Parent
            /        \
           ↓          ↓
       InputChild  PreviewChild
           ↑
        callback
```

Example:

```jsx
function ProfileFeature() {
  const [name, setName] = useState("");

  return (
    <>
      <NameEditor value={name} onChange={setName} />
      <NamePreview name={name} />
    </>
  );
}
```

This is the direct application of Day 19's lifting-state-up pattern.

### 11. Parent-to-Child Actions

A parent can pass callbacks for child-triggered actions and also pass configuration or status down:

```jsx
function Dialog({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <section aria-labelledby="dialog-title">
      <h2 id="dialog-title">{title}</h2>
      {children}
      <button type="button" onClick={onClose}>
        Close
      </button>
    </section>
  );
}
```

The parent controls whether the dialog is open; the child requests closing.

### 12. Prop Drilling

Passing props through a few layers is normal:

```text
App → Layout → Panel → Button
```

It becomes a concern when intermediate components repeatedly accept and forward data they do not use:

```text
App
 ↓ user
Layout
 ↓ user
Panel
 ↓ user
Section
 ↓ user
Button
```

Possible solutions include:

- move the consumer closer to the owner
- composition
- Context for broadly shared subtree values
- a dedicated state solution for genuinely complex application state

Prop drilling is a trade-off, not automatically a bug.

### 13. Composition

Composition can remove unnecessary communication plumbing:

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

The parent supplies the actual content instead of forcing intermediate components to understand every detail.

### 14. Callbacks vs Refs

Use props and callbacks for normal declarative data flow.

Use refs for imperative operations such as focusing an input:

```jsx
function SearchForm() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button type="button" onClick={focusInput}>
        Focus
      </button>
    </>
  );
}
```

A ref should not become a hidden event bus between components.

### 15. Accessibility Is Part of the Contract

Use semantic interactive elements:

```jsx
<button type="button" onClick={onDelete}>
  Delete
</button>
```

Avoid using a clickable `<div>` when a button communicates the action naturally. A reusable communication API should preserve accessible behavior.

### 16. Error Boundaries of Responsibility

A useful component contract separates responsibilities:

```text
Parent
├── owns state
├── owns business rules
└── passes data + allowed actions

Child
├── renders props
├── handles local presentation
└── emits user intent
```

This does not mean every business rule must live in the parent. The principle is to keep ownership explicit rather than making components reach into each other's internals.

### 17. Callback Identity and Performance

Every render creates function values when callbacks are defined inline. That alone is not a reason to use `useCallback`.

Optimize only when a real rendering or dependency problem has been identified. Component boundaries, state locality, and correct ownership usually matter before premature callback memoization.

## Key Concepts

| Concept | Meaning |
|---|---|
| Props | Parent-provided child inputs |
| Callback prop | Function supplied by parent for child-triggered intent |
| Payload | Data sent with a callback |
| Controlled component | Important value is owned by parent |
| One-way data flow | Data authority flows down; changes are requested upward |
| Semantic API | Callback names describe domain intent |
| Prop drilling | Forwarding props through uninterested layers |
| Composition | Supplying UI through children/props |
| Ref | Imperative handle, not normal data flow |

## Visual Concept Map

```text
                  STATE OWNER
                      │
             ┌────────┴────────┐
             │                 │
          value/data       callback API
             │                 │
             ▼                 ▲
          CHILD UI ──user──→ intent
             │                 │
             └────── event ────┘
                      │
                      ▼
                owner updates state
```

## End-to-End Practical

### Task Manager

Build this structure:

```text
TaskManager
├── AddTaskForm
├── TaskList
│   └── TaskItem
└── EmptyState
```

The parent owns the task collection:

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

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = (event) => {
    event.preventDefault();
    const value = title.trim();
    if (!value) return;
    onAdd(value);
    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <label>
        Task
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <button type="submit">Add task</button>
    </form>
  );
}

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Read React docs", done: false },
    { id: 2, title: "Build a component", done: false },
  ]);

  const addTask = (title) => {
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  };

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
      <AddTaskForm onAdd={addTask} />
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
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
      )}
    </main>
  );
}
```

### Why this architecture works

- `TaskManager` owns business state.
- `AddTaskForm` owns only its local input state.
- `TaskItem` does not know how the collection is stored.
- IDs are used as stable keys and callback payloads.
- Children emit intent; the owner performs updates.
- Updates are immutable.

### Acceptance Criteria

- [ ] Parent owns the task collection.
- [ ] Add form is controlled.
- [ ] Child receives task data through props.
- [ ] Child emits complete/delete actions through callbacks.
- [ ] Callback names communicate intent.
- [ ] Payloads contain stable task IDs.
- [ ] No child mutates parent state directly.
- [ ] Stable keys are used for the list.
- [ ] Empty state is handled.
- [ ] Interactive elements are semantic and accessible.

## Hands-on Coding

### Challenge 1 — Product Selection

Build `ProductList` and `ProductDetails`.

Requirements:

- Parent owns `selectedProductId`.
- Product rows receive product data.
- Row calls `onSelect(product.id)`.
- Details derives the selected product.

### Challenge 2 — Cart Communication

Build `ProductCard` and `CartSummary`.

Requirements:

- Parent owns cart state.
- Card emits `onAddToCart(productId)`.
- Quantity control emits `onQuantityChange(productId, quantity)`.
- Summary receives derived totals.

### Challenge 3 — Controlled Form

Create a reusable `UserForm` with:

```text
value
onChange
onSubmit
```

The parent owns the submitted data while the form remains reusable.

### Challenge 4 — Prop Drilling Refactor

Create a five-level component tree that passes a user object through every layer. Refactor it using composition or Context. Explain why your chosen approach is better for this scenario.

### Challenge 5 — Ref Boundary

Build a search input where the parent has a `Focus` button. Use a ref only for focus and use props/callbacks for actual data changes.

## Mini Exercise

Classify each scenario:

1. Parent passes `user.name` to a card.
2. Child reports `onDelete(id)`.
3. Two siblings need the same selected ID.
4. A search input needs to expose its current text.
5. Parent needs to focus a DOM input.

**Answers:**

1. Parent → child props.
2. Child → parent callback.
3. Lift state to their common owner.
4. Controlled component with value + change callback.
5. Ref/imperative operation.

## Common Mistakes

1. Calling callbacks during render.
2. Mutating props.
3. Letting children mutate parent collections.
4. Passing vague callback names such as `onChange` for unrelated business actions.
5. Passing entire collections when an ID is sufficient.
6. Lifting local-only state unnecessarily.
7. Using refs as a normal communication channel.
8. Assuming prop drilling is always bad.
9. Introducing Context before checking state placement or composition.
10. Memoizing every callback without evidence of a performance problem.

## Assessment Quiz

1. How does a parent pass data to a child?
2. How does a child request a parent update?
3. Why is `onClick={handleClick()}` usually wrong?
4. What is a callback payload?
5. Why can `onDelete(id)` be better than passing the whole list?
6. What makes a callback API semantic?
7. What is a controlled component?
8. How should siblings normally communicate?
9. When does prop drilling become a design concern?
10. When should a ref be preferred over a callback?
11. Why should children not mutate props?
12. Why is `useCallback` not automatically required for callback props?

### Answers

1. Through props.
2. By invoking a callback prop supplied by the parent.
3. It executes during render instead of passing a function for the event to call.
4. Information supplied when the child invokes the callback.
5. The parent owns the collection; the child usually needs only the action and identity.
6. Its name and payload clearly describe the action the child is allowed to request.
7. A component whose important value is controlled through props and whose changes are reported upward.
8. Through their common owner using shared state and callbacks.
9. When many uninterested layers repeatedly forward props and the resulting APIs become difficult to maintain.
10. For imperative operations such as focus or DOM interaction.
11. Props are inputs owned by another component; mutation breaks predictable ownership and can create bugs.
12. Function creation alone is not a demonstrated performance problem; profile and optimize where it matters.

## Task

Build a **Product Catalog Communication System**.

### Requirements

- `ProductPage` owns selected product and cart state.
- `ProductList` receives products and `onSelect`.
- `ProductCard` receives one product and calls `onAddToCart(product.id)`.
- `ProductDetails` receives the selected product.
- `QuantityControl` emits `onQuantityChange(productId, quantity)`.
- `CartSummary` receives derived item count and total.
- At least one child has local UI state that should not be lifted.
- No child directly mutates parent state.

### Acceptance Criteria

- [ ] Parent owns shared business state.
- [ ] Child APIs are explicit and semantic.
- [ ] Payloads use stable domain identifiers.
- [ ] Derived totals are not duplicated state.
- [ ] Controlled components are used where appropriate.
- [ ] Local-only state remains local.
- [ ] No direct parent-state mutation from children.
- [ ] Components remain reusable.

## Self Check

- [ ] I can explain parent → child props.
- [ ] I can implement child → parent callbacks.
- [ ] I know the difference between a callback reference and callback invocation.
- [ ] I can design a useful payload.
- [ ] I can choose semantic callback names.
- [ ] I can build a controlled component.
- [ ] I can coordinate siblings through a common owner.
- [ ] I can recognize harmful prop drilling.
- [ ] I can use composition to reduce unnecessary prop plumbing.
- [ ] I know why refs are not normal data flow.
- [ ] I can explain why local state should remain local when possible.
- [ ] I can explain when Context may be appropriate.

## Interview Questions and Answers

### Beginner

**How does a parent pass data to a child?**  
Through props.

**How does a child communicate with a parent?**  
The parent passes a callback prop and the child invokes it with an optional payload.

**Can a child directly modify the parent's state?**  
No. The child can request a change through a callback; the state owner performs the update.

### Intermediate

**Why are semantic callback names useful?**  
They express intent and hide the parent's implementation details. `onDelete(id)` is clearer than a generic `onChange` or exposing a collection setter.

**How do siblings communicate?**  
Usually through their nearest common owner: shared state is stored there, values flow down, and callbacks flow back up.

**What is a controlled component?**  
A component whose important value is controlled by its parent through props and whose changes are reported through a callback.

**When is a payload object useful?**  
When an action has multiple related fields or the contract benefits from named properties.

### Advanced

**Why is React's data flow called one-way if children can update parent state?**  
Because the authoritative value still flows down from the owner. A child does not mutate that value directly; it emits an event or intent that the owner handles.

**How would you reduce coupling between a reusable child and its parent?**  
Define a small prop contract, use semantic callbacks, avoid exposing implementation-specific setters, keep business ownership explicit, and use composition where it simplifies the API.

**When would you use Context instead of callbacks through many layers?**  
When many descendants need a broadly shared value/dependency and explicit prop passing has become a real maintenance problem. Context should solve a scope problem, not merely replace one prop.

**Why can passing an entire object as a callback payload be less ideal than an ID?**  
If the parent already owns the authoritative object, an ID communicates identity without duplicating potentially stale data.

**When should refs be used?**  
For imperative operations such as focusing, measuring, or interacting with a DOM node or imperative API. They are not a substitute for normal declarative state flow.

**How would you investigate a performance problem caused by parent updates?**  
Profile first, identify which subtree work is expensive, then consider state locality, component boundaries, reducing unnecessary computation, and targeted memoization.

## Day 20 Outcome

You can now design production-quality parent-child communication contracts: data flows down through props, user intent flows up through semantic callbacks, shared state has a clear owner, controlled components have explicit APIs, siblings coordinate through a common owner, and refs remain reserved for imperative work.

**Next:** Day 21 combines these communication patterns in an integrated Todo mini-project.
