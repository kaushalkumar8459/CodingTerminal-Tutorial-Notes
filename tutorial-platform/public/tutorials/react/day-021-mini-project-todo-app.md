---
title: Mini Project Todo App
slug: day-021-mini-project-todo-app
dayLabel: Day 21
level: Beginner to Intermediate
estimatedMinutes: 120
order: 21
track: react
---
# Day 21 [Beginner → Intermediate]: Mini Project — Todo App

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Product Requirements](#product-requirements)
- [Data Model](#data-model)
- [State Design](#state-design-before-code)
- [Architecture](#component-architecture)
- [Implementation](#step-1--add-a-todo)
- [Complete Reference Implementation](#step-9--complete-reference-implementation)
- [Why This Project Matters Before useEffect](#why-this-project-matters-before-useeffect)
- [Common Bugs](#common-bugs)
- [Debugging Lab](#debugging-lab)
- [Exercises](#exercises)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Verification Checklist](#verification-checklist)
- [Day 21 Outcome](#day-21-outcome)

## Goal

Build a realistic Todo application that consolidates the first React fundamentals: controlled inputs, state ownership, immutable array/object updates, stable keys, conditional rendering, callbacks, derived data, forms, accessibility, and predictable state transitions.

The goal is not merely to make CRUD work. You should be able to explain **why each piece of state exists, where it belongs, how identity is preserved, and why derived UI does not need an effect**.

## Prerequisites

- Days 1–20 completed
- `useState`
- Props and callback props
- Forms and events
- Object and array state
- Conditional rendering
- List rendering and keys
- Lifting state up
- Parent-child communication

## Learning Outcomes

By the end of this project you can:

- model a collection with stable identity
- add, edit, toggle, and delete items immutably
- keep one source of truth for todos
- distinguish stored state from derived values
- build controlled form inputs
- coordinate parent/child callbacks
- choose stable React keys
- handle empty and filtered-empty states
- build accessible form controls
- debug common immutable-state mistakes
- explain why `useEffect` is not needed for synchronous filtering/counts

## Product Requirements

The finished app should support:

- add todo
- reject empty/whitespace-only todo
- edit todo
- cancel edit
- toggle complete/incomplete
- delete todo
- filter all/active/completed
- show active/completed counts
- clear completed
- empty state
- no-results state
- Enter-to-submit through a real form
- stable IDs and React keys
- immutable updates
- accessible labels and buttons

## Data Model

```js
{
  id: "todo-unique-id",
  title: "Learn React",
  completed: false,
  createdAt: 1710000000000
}
```

`id` represents domain identity. Use the same stable identity for the React `key`.

For this browser-only exercise, `crypto.randomUUID()` is preferred over `Date.now()` as the ID generator because timestamps are not guaranteed to be unique for rapidly created items. `createdAt` can still be a timestamp because it represents time, not identity.

## State Design Before Code

Start by deciding what must actually be state:

```jsx
const [todos, setTodos] = useState([]);
const [draft, setDraft] = useState("");
const [editingId, setEditingId] = useState(null);
const [filter, setFilter] = useState("all");
```

Do **not** automatically store:

```text
visibleTodos
activeCount
completedCount
```

These are derived from current state.

### State ownership rule

Keep the collection in the nearest common owner that coordinates the feature. Input draft state can remain local to the form if the architecture does not require it elsewhere. `editingId` belongs wherever edit mode is coordinated. Do not lift state simply because a component is a parent.

## State Transition Model

Think of each user action as a transition:

```text
Add      → todos + new item
Toggle   → one item.completed changes
Edit     → one item.title changes
Delete   → one item removed
Filter   → filter changes; todos stay unchanged
Clear    → completed items removed
Cancel   → editor state reset; todos unchanged
```

This makes debugging easier because every event has a predictable state transition.

## Component Architecture

```text
App
├── TodoForm
├── TodoFilters
├── TodoSummary
└── TodoList
    └── TodoItem
```

### `App`
Owns the feature state and state transitions when those values are shared.

### `TodoForm`
Owns input presentation and reports submit/cancel actions through a clear API.

### `TodoFilters`
Displays filter controls and reports the selected filter.

### `TodoSummary`
Displays derived counts.

### `TodoList`
Receives the currently visible collection and callbacks.

### `TodoItem`
Displays one todo and emits actions. It does not mutate the parent's collection directly.

Example API:

```jsx
<TodoItem
  todo={todo}
  onToggle={toggleTodo}
  onEdit={startEdit}
  onDelete={deleteTodo}
/>
```

## Step 1 — Add a Todo

```jsx
function addTodo(event) {
  event.preventDefault();

  const title = draft.trim();
  if (!title) return;

  const todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  };

  setTodos((current) => [...current, todo]);
  setDraft("");
}
```

### Why the functional update?

The next array depends on the previous array. The updater form explicitly expresses that relationship and is the correct pattern when calculating next state from previous state.

## Step 2 — Toggle Completion

```jsx
function toggleTodo(id) {
  setTodos((current) =>
    current.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}
```

`map` creates a new array and only the matching todo receives a new object. Other objects can retain their identity.

## Step 3 — Delete

```jsx
function deleteTodo(id) {
  setTodos((current) => current.filter((todo) => todo.id !== id));

  if (editingId === id) {
    setEditingId(null);
    setDraft("");
  }
}
```

A subtle requirement is handled here: deleting the item currently being edited also cancels edit mode.

## Step 4 — Edit

```jsx
function startEdit(todo) {
  setEditingId(todo.id);
  setDraft(todo.title);
}

function saveEdit(event) {
  event.preventDefault();

  const title = draft.trim();
  if (!title || !editingId) return;

  setTodos((current) =>
    current.map((todo) =>
      todo.id === editingId
        ? { ...todo, title }
        : todo
    )
  );

  setEditingId(null);
  setDraft("");
}
```

The todo ID remains unchanged during editing. **Identity is not editable content.**

## Step 5 — Derived Filtering and Counts

```jsx
const visibleTodos =
  filter === "all"
    ? todos
    : filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos.filter((todo) => todo.completed);

const activeCount = todos.filter((todo) => !todo.completed).length;
const completedCount = todos.length - activeCount;
```

Do not synchronize `visibleTodos` with an effect. It is a pure calculation from current state and can be derived during render.

For a larger dataset, performance can later be measured and optimized. Do not add memoization automatically.

## Step 6 — Stable Keys

```jsx
{visibleTodos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

The key gives React stable identity among siblings. It is not automatically passed to `TodoItem` as a prop.

Avoid these for a mutable Todo collection:

```jsx
key={index}
key={Math.random()}
```

Random keys are especially harmful because they change identity on every render and can force remounts.

## Step 7 — Accessible Form and Buttons

Use a real form so Enter submits naturally:

```jsx
<form onSubmit={submitTodo}>
  <label htmlFor="todo-title">Task</label>
  <input
    id="todo-title"
    value={draft}
    onChange={(event) => setDraft(event.target.value)}
  />
  <button type="submit">Add</button>
  <button type="button" onClick={resetEditor}>Cancel</button>
</form>
```

Buttons that should not submit must explicitly use `type="button"`.

For todo checkboxes, connect labels with matching `id`/`htmlFor` values and use a native checkbox instead of recreating checkbox behavior with a generic element.

## Step 8 — Callback Contracts

Children should emit intent rather than mutate parent state:

```jsx
<TodoItem
  todo={todo}
  onToggle={toggleTodo}
  onEdit={startEdit}
  onDelete={deleteTodo}
/>
```

Prefer semantic APIs such as `onDelete(todoId)` over passing the entire collection or exposing internal state-management details.

## Step 9 — Complete Reference Implementation

```jsx
import { useState } from "react";

function createTodo(title) {
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: Date.now(),
  };
}

export default function App() {
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  function resetEditor() {
    setEditingId(null);
    setDraft("");
  }

  function submitTodo(event) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;

    if (editingId) {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === editingId ? { ...todo, title } : todo
        )
      );
    } else {
      setTodos((current) => [...current, createTodo(title)]);
    }

    resetEditor();
  }

  function toggleTodo(id) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
    if (editingId === id) resetEditor();
  }

  function clearCompleted() {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setDraft(todo.title);
  }

  const visibleTodos =
    filter === "all"
      ? todos
      : filter === "active"
        ? todos.filter((todo) => !todo.completed)
        : todos.filter((todo) => todo.completed);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <main>
      <h1>Todo App</h1>

      <form onSubmit={submitTodo}>
        <label htmlFor="todo-title">Task</label>
        <input
          id="todo-title"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">
          {editingId ? "Save" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={resetEditor}>
            Cancel
          </button>
        )}
      </form>

      <p>
        Active: {activeCount} · Completed: {completedCount}
      </p>

      <label htmlFor="todo-filter">Filter</label>
      <select
        id="todo-filter"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={clearCompleted}
        disabled={completedCount === 0}
      >
        Clear completed
      </button>

      {todos.length === 0 ? (
        <p>No tasks yet. Add your first task.</p>
      ) : visibleTodos.length === 0 ? (
        <p>No tasks match this filter.</p>
      ) : (
        <ul>
          {visibleTodos.map((todo) => (
            <li key={todo.id}>
              <input
                id={`todo-${todo.id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <label htmlFor={`todo-${todo.id}`}>
                {todo.title}
              </label>
              <button type="button" onClick={() => startEdit(todo)}>
                Edit
              </button>
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

## Why This Project Matters Before `useEffect`

Everything above can be calculated from React state and user events. There is no need for an effect to calculate filtered todos, counts, or completion state.

The important boundary is:

```text
Render-time derivation → calculate from props/state
User interaction       → event handler
External synchronization → effect
```

Day 22 will introduce effects and explain synchronization with systems outside React.

## Common Bugs

### 1. Mutating state

```jsx
todos.push(newTodo);
setTodos(todos);
```

Create a new array instead.

### 2. Updating every item accidentally

```jsx
todos.map((todo) => ({ ...todo, completed: true }));
```

This updates every todo. Match the target ID first.

### 3. Storing derived state

Do not add separate state for `visibleTodos` or `completedCount` merely because they appear in the UI.

### 4. Index keys

Position is not stable identity when items can be inserted, removed, or reordered.

### 5. Random keys

`Math.random()` creates a new key on every render and destroys useful component identity.

### 6. Cancel submits the form

A non-submit button inside a form needs `type="button"`.

### 7. Stale edit mode

Deleting an item while editing it must clear `editingId` and the draft.

### 8. Trimming only for validation

Store the normalized title if that is the intended product behavior; otherwise whitespace differences can become inconsistent. This tutorial intentionally stores `draft.trim()`.

### 9. Effect for filtering

An effect plus another state variable creates unnecessary synchronization. Filtering is derived data.

## Debugging Lab

1. Why does `push()` followed by `setTodos(todos)` create a bad state update pattern?
2. Why does a careless `map` implementation mark every todo complete?
3. Why can an index key cause confusing UI identity after deletion?
4. Why does Cancel submit a form without `type="button"`?
5. Why should deleting the edited todo clear edit state?
6. Why is `visibleTodos` not a good candidate for independent state?
7. Why does a random key cause remount-like behavior?

## Exercises

### Level 1

- Add a minimum title length.
- Add a remaining-task count.
- Disable Add when the trimmed title is empty.

### Level 2

- Add search by title.
- Add priority to each todo.
- Add a confirmation before Clear completed.

### Level 3

- Add undo delete without mutating state.
- Add drag-and-drop ordering while preserving stable IDs.
- Add an edit form per item and compare local editor state with parent-owned editor state.
- Add persistence as an optional extension, then compare it with the effect-based persistence pattern introduced later.

## Assessment

1. Why use a stable ID?
2. Why is `map` appropriate for toggle/update?
3. Why is `filter` appropriate for delete?
4. Why should `visibleTodos` normally be derived?
5. Where should edit state live?
6. Why use functional state updates?
7. What is the purpose of a React key?
8. Why does a child receive callbacks rather than mutate parent state?
9. Why does `type="button"` matter inside a form?
10. Which parts of this application are candidates for `useEffect`, and which are not?

### Answers

1. Stable IDs represent domain identity across renders.
2. `map` returns a new array while changing only the matching item.
3. `filter` returns a new array without the deleted item.
4. It is synchronously calculated from `todos` and `filter` and does not need synchronization state.
5. With the component that coordinates edit mode; in this reference architecture the parent owns `editingId`.
6. The next state depends on the previous state, so the updater form communicates that dependency directly.
7. A key gives React stable identity among siblings; it is not automatically a component prop.
8. The parent owns the authoritative collection; callbacks let children express intent without knowing storage details.
9. Buttons default to submit behavior in forms unless their type is specified otherwise.
10. External persistence is a candidate; filtering, counts, and synchronous calculations are not.

## Interview Questions

### Beginner

**How do you add an item to array state?**

Create a new array, usually with the spread operator and the new item, rather than mutating the existing array.

**How do you delete one item?**

Use `filter` to return every item except the target ID.

### Intermediate

**How do you update one object inside an array?**

Use `map`, match the ID, and return a new object for that item while preserving the others.

**Why is an index a poor key for an editable Todo list?**

Indexes describe positions, not domain identity. Removing or reordering items can make positions point to different logical items.

**Should filtering be implemented with an effect?**

No. Filtering is synchronous derived data and belongs in render-time calculation.

**Why use functional updates?**

They explicitly calculate next state from previous state and are appropriate when updates depend on the current collection.

### Advanced

**Why separate domain identity from content?**

An item's title can change while its identity must remain stable. Stable identity lets React and the application track the same logical item across updates.

**How would you persist this application?**

Synchronize React state with an external persistence mechanism such as `localStorage`. That synchronization is an effect because storage is outside React's render calculation.

**When would you optimize filtering?**

Only after measuring a real performance problem. For a small Todo list, straightforward derivation is preferable to premature memoization.

**How would you scale this Todo app?**

Separate domain/state logic from presentation, define clear component contracts, consider a reducer for complex transitions, and introduce server-state tooling only when data becomes remote. Do not add abstractions solely because the application has more files.

## Verification Checklist

### Functional

- [ ] Add valid todo
- [ ] Reject whitespace-only todo
- [ ] Toggle completion
- [ ] Edit and save
- [ ] Cancel edit
- [ ] Delete
- [ ] Delete currently edited item
- [ ] Filter all/active/completed
- [ ] Clear completed
- [ ] Empty state
- [ ] No-results state

### React correctness

- [ ] Stable IDs
- [ ] Stable React keys
- [ ] No direct mutation
- [ ] Functional updates used where previous state is required
- [ ] Derived values are not duplicated as state
- [ ] Child components communicate through callbacks
- [ ] Edit preserves todo identity
- [ ] No unnecessary effect for synchronous derivation

### Accessibility

- [ ] Form uses a real `<form>`
- [ ] Input has an associated label
- [ ] Todo checkboxes have associated labels
- [ ] Non-submit buttons use `type="button"`
- [ ] Native controls are preferred over clickable generic elements

### Quality

- [ ] Component responsibilities are clear
- [ ] State ownership is explainable
- [ ] Code examples are internally consistent
- [ ] Exercises progress from beginner to advanced
- [ ] Interview questions test reasoning, not memorization

## Day 21 Outcome

You can now build and reason about a complete collection-based React feature without mutation, duplicated derived state, unstable identity, or unnecessary effects. You understand how state ownership, callbacks, keys, forms, and derived rendering work together.

**Next:** Day 22 — `useEffect` fundamentals and synchronization with external systems.
