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

## Goal

Build a complete Todo application that consolidates the first React fundamentals: controlled inputs, state ownership, immutable array updates, stable keys, conditional rendering, callbacks, and accessible event handling.

The goal is not merely to make CRUD work. You will practice **state modeling, identity, derived data, component boundaries, and predictable state transitions** before `useEffect` is introduced on Day 22.

## Prerequisites

- Days 1–20 completed
- `useState`
- Props and callback props
- Forms and events
- Array/object state
- Conditional rendering
- List keys
- Lifting state

## Product Requirements

The finished app should support:

- add todo
- edit todo
- cancel edit
- toggle complete/incomplete
- delete todo
- filter all/active/completed
- show counts
- clear completed
- empty and no-results states
- Enter-to-submit through a real form
- stable IDs and keys
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

Use a stable ID for both data identity and React's `key`. Do not use array indexes for a mutable todo collection.

For this browser-only exercise, `crypto.randomUUID()` is preferred over `Date.now()` because timestamps are not guaranteed to be unique when multiple items are created quickly.

## State Design Before Code

```jsx
const [todos, setTodos] = useState([]);
const [draft, setDraft] = useState("");
const [editingId, setEditingId] = useState(null);
const [filter, setFilter] = useState("all");
```

Do not store:

```text
visibleTodos
activeCount
completedCount
```

Those values can be derived from `todos` and `filter`.

### State ownership rule

Keep the collection in the nearest common owner that needs to coordinate it. The form draft can remain local to the form when appropriate; `editingId` belongs with the state that coordinates edit mode. Do not lift state simply because a component is a parent.

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

The next array depends on the previous array. The updater form makes that relationship explicit and remains safe when React queues multiple updates.

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

`map` creates a new array and only the matching todo receives a new object.

## Step 3 — Delete

```jsx
function deleteTodo(id) {
  setTodos((current) =>
    current.filter((todo) => todo.id !== id)
  );

  if (editingId === id) {
    setEditingId(null);
    setDraft("");
  }
}
```

A subtle requirement: if the item being edited is deleted, edit mode must also be cancelled.

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

## Step 5 — Derived Filtering

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

Do not synchronize a second `visibleTodos` state with an effect. It is derived synchronously from current state.

## Step 6 — Component Architecture

```text
App
├── TodoForm
├── TodoFilters
└── TodoList
    └── TodoItem
```

### `TodoForm`
Owns the input UI and reports submission/cancel actions.

### `TodoFilters`
Displays filter controls and reports the selected filter.

### `TodoList`
Receives the visible collection and callbacks.

### `TodoItem`
Displays one todo and invokes callbacks; it does not mutate the parent's collection directly.

Example API:

```jsx
<TodoItem
  todo={todo}
  onToggle={toggleTodo}
  onEdit={startEdit}
  onDelete={deleteTodo}
/>
```

## Step 7 — Stable Keys

```jsx
{visibleTodos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}
```

The key is for React's identity tracking. It is not automatically passed to `TodoItem` as a prop.

Avoid:

```jsx
key={index}
key={Math.random()}
```

for a mutable collection.

## Step 8 — Accessible Form and Buttons

Use a real form so Enter works naturally:

```jsx
<form onSubmit={editingId ? saveEdit : addTodo}>
  <label htmlFor="todo-title">Task</label>
  <input
    id="todo-title"
    value={draft}
    onChange={(event) => setDraft(event.target.value)}
  />

  <button type="submit">
    {editingId ? "Save" : "Add"}
  </button>

  {editingId && (
    <button type="button" onClick={cancelEdit}>
      Cancel
    </button>
  )}
</form>
```

Buttons that should not submit must explicitly use `type="button"`.

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
    setTodos((current) =>
      current.filter((todo) => !todo.completed)
    );
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

## Why This Project Matters Before useEffect

Everything above can be derived from current React state and event handlers. There is no need to introduce an effect merely to calculate filtered todos, counts, or completion state.

That boundary matters: **rendering/derivation belongs in render; synchronization with external systems belongs in effects.** Day 22 will introduce that distinction formally.

## Common Bugs

### Mutating state

```jsx
todos.push(newTodo);
setTodos(todos);
```

Use a new array instead.

### Replacing the wrong object

```jsx
todos.map((todo) => ({ ...todo, completed: true }))
```

This marks every todo complete. Match the ID first.

### Storing derived state

Avoid state for `visibleTodos` and `completedCount` unless there is a specific architectural reason.

### Index keys

Deletion/reordering can cause identity mismatches when index keys are used.

### Submit-button bug

A Cancel button inside a form without `type="button"` can submit the form unexpectedly.

### Stale edit mode

Deleting an item while it is being edited should cancel edit mode.

## Debugging Lab

1. Why does adding a todo not change the UI if `push()` is used?
2. Why does an edit accidentally affect every todo?
3. Why does the filter reset when the list changes if it is incorrectly stored as derived state?
4. Why does Cancel submit the form?
5. Why can an index key produce confusing behavior after deletion?

## Exercises

### Level 1
- Add character validation with a minimum length.
- Add a remaining-task count.

### Level 2
- Add search by title.
- Add priority to each todo.
- Add a clear-all confirmation.

### Level 3
- Add undo delete.
- Add drag-and-drop ordering while preserving stable IDs.
- Add persistence as an optional extension, then compare that implementation with the effect-based persistence pattern introduced later.

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

## Interview Questions

**How do you update one object inside array state?**  
Use `map`, return a new object for the matching ID, and return existing objects for other items.

**Why is index a poor key for an editable todo list?**  
The position can change independently of item identity.

**Should filtering be implemented with an effect?**  
No. Filtering is synchronous derived data and can be calculated during render.

**Why use functional updates?**  
They express that the next state depends on the previous state and avoid relying on a potentially stale captured value.

**How would you persist this app?**  
Synchronize state with an external persistence mechanism such as `localStorage`; that is an effect because storage is outside React's render calculation.

## Verification Checklist

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
- [ ] Stable keys
- [ ] No direct mutation
- [ ] Enter submits the form
- [ ] Cancel does not submit
- [ ] Labels and controls are accessible

## Day 21 Outcome

You can now model and update a realistic collection in React without mutation, derive UI from a single source of truth, design parent/child callback contracts, and reason about identity. You are ready for **Day 22: useEffect and synchronization with external systems**.