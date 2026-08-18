---
title: Mini Project - Notes App
slug: day-014-mini-project-notes-app
dayLabel: Day 14
level: Beginner to Intermediate
estimatedMinutes: 90
order: 14
track: react
---
# Day 14 [Beginner → Intermediate]: Mini Project — Notes App

## Goal

Build a small but production-minded Notes App that combines controlled forms, object/array state, immutable updates, props, callbacks, conditional rendering, stable keys, and browser persistence.

This is not just a CRUD exercise. The goal is to practice **state ownership, component boundaries, data modeling, and UI states**.

## Prerequisites

- Days 4–13
- Components, props, callbacks
- `useState`, arrays/objects, forms, events
- Basic conditional and list rendering

## Feature Specification

The app should support:

1. Create a note
2. Reject empty notes
3. Assign a priority
4. Display notes
5. Delete a note
6. Edit a note
7. Filter by priority
8. Show an empty state
9. Persist notes in `localStorage`
10. Restore notes after refresh

## Data Model

```js
{
  id: "note-1",
  text: "Revise React props",
  priority: "high",
  createdAt: 1710000000000
}
```

A stable identifier is required for updates, deletion, and list keys. `Date.now()` is acceptable for a simple learning project, but production systems should use IDs supplied by a backend or a collision-safe ID strategy appropriate to the application.

## Architecture

```text
App
├── NoteForm
├── FilterBar
└── NoteList
    └── NoteItem
```

**State ownership:** Keep the notes collection in `App` because multiple children need to read or modify it. Pass data down and callbacks up.

## Step 1: Initial State

```jsx
const initialForm = {
  text: "",
  priority: "medium",
};

const [form, setForm] = useState(initialForm);
const [notes, setNotes] = useState([]);
const [filter, setFilter] = useState("all");
const [editingId, setEditingId] = useState(null);
```

Do not store `filteredNotes` as state. It can be derived from `notes` and `filter`.

## Step 2: Create Notes

```jsx
function addNote(event) {
  event.preventDefault();

  const text = form.text.trim();
  if (!text) return;

  const note = {
    id: crypto.randomUUID(),
    text,
    priority: form.priority,
    createdAt: Date.now(),
  };

  setNotes((current) => [...current, note]);
  setForm(initialForm);
}
```

`crypto.randomUUID()` is preferable to `Date.now()` for this browser-only learning project because it provides a purpose-built unique identifier.

## Step 3: Delete

```jsx
function deleteNote(id) {
  setNotes((current) => current.filter((note) => note.id !== id));
}
```

## Step 4: Edit

```jsx
function saveEdit(id, nextText, nextPriority) {
  const text = nextText.trim();
  if (!text) return;

  setNotes((current) =>
    current.map((note) =>
      note.id === id
        ? { ...note, text, priority: nextPriority }
        : note
    )
  );
}
```

`map` creates a new array and replaces only the matching object.

## Step 5: Derived Filtering

```jsx
const visibleNotes =
  filter === "all"
    ? notes
    : notes.filter((note) => note.priority === filter);
```

This is **derived data**. Do not create another state variable for it unless there is a specific architectural reason.

## Step 6: Empty States

There are two useful empty states:

- No notes exist at all → encourage the first note.
- Notes exist, but the current filter has no matches → explain that the filter produced no results.

```jsx
if (notes.length === 0) {
  return <p>No notes yet. Create your first note.</p>;
}

if (visibleNotes.length === 0) {
  return <p>No notes match this filter.</p>;
}
```

In the real application, these messages should be rendered inside the page layout rather than returning from the entire `App` if headers/controls must remain visible.

## Step 7: Component Composition

### `NoteForm`

Responsible for input fields and submission UI.

### `FilterBar`

Responsible for choosing the visible priority.

### `NoteList`

Responsible for rendering the collection.

### `NoteItem`

Responsible for displaying one note and exposing actions through callbacks.

Example:

```jsx
function NoteItem({ note, onDelete, onEdit }) {
  return (
    <article>
      <h2>{note.text}</h2>
      <p>Priority: {note.priority}</p>
      <button type="button" onClick={() => onEdit(note)}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </article>
  );
}
```

The child does not directly modify the parent's notes state.

## Step 8: Persistence

A simple browser-only persistence layer can use `localStorage`.

```jsx
useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);
```

To initialize from storage, use a lazy initializer:

```jsx
const [notes, setNotes] = useState(() => {
  try {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
```

`localStorage` is browser storage, not a database. It is suitable for this learning project but not for sensitive or multi-user production data.

## End-to-End Starter Implementation

```jsx
import { useEffect, useState } from "react";

const initialForm = { text: "", priority: "medium" };

function readNotes() {
  try {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function NoteItem({ note, onDelete }) {
  return (
    <article>
      <h2>{note.text}</h2>
      <p>Priority: {note.priority}</p>
      <button type="button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </article>
  );
}

export default function App() {
  const [notes, setNotes] = useState(readNotes);
  const [form, setForm] = useState(initialForm);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(event) {
    event.preventDefault();
    const text = form.text.trim();
    if (!text) return;

    setNotes((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text,
        priority: form.priority,
        createdAt: Date.now(),
      },
    ]);
    setForm(initialForm);
  }

  function deleteNote(id) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  const visibleNotes =
    filter === "all"
      ? notes
      : notes.filter((note) => note.priority === filter);

  return (
    <main>
      <h1>Notes</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="note-text">Note</label>
        <input
          id="note-text"
          value={form.text}
          onChange={(event) =>
            setForm((current) => ({ ...current, text: event.target.value }))
          }
        />

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={form.priority}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              priority: event.target.value,
            }))
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Note</button>
      </form>

      <label htmlFor="filter">Filter</label>
      <select id="filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {notes.length === 0 ? (
        <p>No notes yet. Create your first note.</p>
      ) : visibleNotes.length === 0 ? (
        <p>No notes match this filter.</p>
      ) : (
        <section>
          {visibleNotes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </section>
      )}
    </main>
  );
}
```

## Common Mistakes

- Mutating `notes` with `push`, `splice`, or direct assignment.
- Using array index as the key when note identity can change.
- Storing filtered notes as duplicate state.
- Saving sensitive information in `localStorage`.
- Using `Date.now()` as a guaranteed globally unique backend ID.
- Forgetting `type="button"` for non-submit buttons inside forms.
- Letting a child component directly own data that the parent also needs.

## Extensions

### Level 1

- Character count
- Search by text
- Sort newest/oldest

### Level 2

- Edit note
- Pin note
- Archive note
- Keyboard-friendly interactions

### Level 3

- Debounced search
- Storage migration/versioning
- Backend persistence
- Optimistic updates
- Error handling for failed saves

## Assessment

1. Why is `notes` state owned by the parent?
2. Why is `visibleNotes` derived instead of stored?
3. Why is `filter` appropriate for deletion?
4. Why should a note have a stable ID?
5. Why should `localStorage` not be treated as secure storage?
6. How would you add editing without mutating an existing note?

## Interview Questions

**How do you update one item in an array state?**  
Use `map` and return a new object for the matching item.

**How do you remove one item?**  
Use `filter` to create a new array without that item.

**Why separate `NoteItem` from `App`?**  
It isolates presentation and creates a clean component API based on data and callbacks.

**Would you store filtered notes in state?**  
Usually no. Filtered notes are derived from source notes and the selected filter.

**Is localStorage suitable for production data?**  
It can be suitable for non-sensitive client preferences, but it is not a secure database or reliable multi-user persistence layer.

## Final Task

Complete the Notes App with:

- [ ] Add
- [ ] Delete
- [ ] Edit
- [ ] Priority
- [ ] Filter
- [ ] Empty state
- [ ] Persistence
- [ ] Reusable components
- [ ] Stable keys
- [ ] Immutable updates
- [ ] Accessible form controls

## Day 14 Outcome

You have combined the fundamentals from the first two weeks into a realistic feature and practiced deciding **where state belongs, what should be derived, how children communicate with parents, and how immutable updates work**. Day 15 will build on this by making UI branches more deliberate.