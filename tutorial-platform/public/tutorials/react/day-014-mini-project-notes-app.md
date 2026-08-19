---
title: Mini Project - Notes App
slug: day-014-mini-project-notes-app
dayLabel: Day 14
level: Beginner to Intermediate
estimatedMinutes: 120
order: 14
track: react
---
# Day 14 [Beginner → Intermediate]: Mini Project — Notes App

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Feature Specification](#feature-specification)
- [Data Model](#data-model)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Visual Concept Map](#visual-concept-map)
- [End-to-End Practical](#end-to-end-practical)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Common Mistakes](#common-mistakes)
- [How to Verify the Project](#how-to-verify-the-project)
- [Debugging Challenge](#debugging-challenge)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 14 Outcome](#day-14-outcome)

## Goal

Build a production-minded Notes App that combines the React fundamentals from Days 4–13:

- components and composition
- props and callback props
- controlled forms
- `useState`
- object and array state
- immutable updates
- derived data
- conditional rendering
- list rendering and stable keys
- state ownership
- browser persistence

The main goal is to practice deciding **where state belongs, what should be stored, what should be derived, and how components communicate through explicit APIs**.

## Prerequisites

Complete Days 4–13 and be comfortable with:

- components and props
- callback props
- `useState`
- object and array state
- forms and events
- conditional rendering
- list rendering and stable keys
- immutable state updates

## Explanation

A mini project is where isolated React concepts become one coherent feature.

```text
                    App
                     |
          +----------+----------+
          |          |          |
      NoteForm   FilterBar   NoteList
                               |
                           NoteItem
```

The collection belongs to the component that coordinates the feature. Child components receive data and callback props instead of mutating parent state directly.

The project reinforces these rules:

1. Keep one source of truth.
2. Use functional updates when the next value depends on previous state.
3. Derive values that can be calculated from state.
4. Update arrays and objects immutably.
5. Use stable item identity for list keys and updates.
6. Keep form actions explicit with correct button types.
7. Treat browser persistence as a storage mechanism, not a database.

## Feature Specification

The completed application should support:

1. Create a note.
2. Reject empty and whitespace-only notes.
3. Assign Low, Medium, or High priority.
4. Display notes.
5. Delete a note.
6. Edit a note.
7. Cancel an edit.
8. Filter by priority.
9. Show useful empty states.
10. Persist notes in `localStorage`.
11. Restore notes after refresh.
12. Keep note identity stable while editing.
13. Keep non-submit buttons from accidentally submitting the form.
14. Derive counts and filtered results rather than duplicating state.

## Data Model

```js
{
  id: "550e8400-e29b-41d4-a716-446655440000",
  text: "Revise React props",
  priority: "high",
  createdAt: 1710000000000
}
```

A stable identifier is required for updates, deletion, and list keys. `crypto.randomUUID()` is suitable for this browser-based learning project in supported secure/browser environments. Real applications may generate IDs on the backend.

Do not change `id` when editing text or priority. Identity and editable data are different concepts.

## Topic by Topic

### Topic 1: Design the State Before Coding

Start with the smallest useful state:

```jsx
const createInitialForm = () => ({
  text: "",
  priority: "medium",
});

const [form, setForm] = useState(createInitialForm);
const [notes, setNotes] = useState([]);
const [filter, setFilter] = useState("all");
const [editingId, setEditingId] = useState(null);
```

Do not store `filteredNotes`, `notesCount`, or `highPriorityCount` separately. They can be derived from existing state.

A useful design question is:

> If I delete this state variable, can I calculate the same value from another state variable?

If yes, it is often derived data rather than independent state.

### Topic 2: Notes Data Model

```jsx
const note = {
  id: crypto.randomUUID(),
  text: "Revise hooks",
  priority: "high",
  createdAt: Date.now(),
};
```

A timestamp is useful for display/sorting but should not be treated as a guaranteed unique identifier.

### Topic 3: Add Note Flow

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
  setForm(createInitialForm());
}
```

The functional update is appropriate because the new array depends on the previous notes array. `trim()` rejects whitespace-only content.

### Topic 4: Delete Note Flow

```jsx
function deleteNote(id) {
  setNotes((current) => current.filter((note) => note.id !== id));

  // If the deleted note is being edited, leave edit mode.
  setEditingId((currentId) => (currentId === id ? null : currentId));
  setForm((current) => (editingId === id ? createInitialForm() : current));
}
```

A cleaner implementation avoids relying on a potentially stale `editingId` inside the same event by handling edit cancellation explicitly:

```jsx
function deleteNote(id) {
  setNotes((current) => current.filter((note) => note.id !== id));

  if (editingId === id) {
    setEditingId(null);
    setForm(createInitialForm());
  }
}
```

`filter` creates a new array and does not mutate the old state array.

### Topic 5: Edit Note Flow

Editing has two operations: enter edit mode and save the edited values.

```jsx
function startEdit(note) {
  setEditingId(note.id);
  setForm({
    text: note.text,
    priority: note.priority,
  });
}

function cancelEdit() {
  setEditingId(null);
  setForm(createInitialForm());
}

function saveEdit() {
  if (editingId === null) return;

  const text = form.text.trim();
  if (!text) return;

  setNotes((current) =>
    current.map((note) =>
      note.id === editingId
        ? { ...note, text, priority: form.priority }
        : note,
    ),
  );

  cancelEdit();
}
```

`map` creates a new array and a new object only for the changed note. The existing `id` and `createdAt` remain unchanged.

### Topic 6: Derived Filtering and Counts

```jsx
const visibleNotes =
  filter === "all"
    ? notes
    : notes.filter((note) => note.priority === filter);

const totalCount = notes.length;
const highPriorityCount = notes.filter(
  (note) => note.priority === "high",
).length;
```

Do not store `visibleNotes` or these counts as additional state. They are derived from the source of truth.

### Topic 7: Empty States

There are two different empty situations:

```jsx
if (notes.length === 0) {
  return <p>No notes yet. Create your first note.</p>;
}

if (visibleNotes.length === 0) {
  return <p>No notes match this filter.</p>;
}
```

Distinguish **no data** from **no matching data**. A production/server-backed application may also need loading, error, retry, saving, authentication, and synchronization states.

### Topic 8: Component Decomposition

Suggested architecture:

```text
App
├── NoteForm
├── FilterBar
└── NoteList
    └── NoteItem
```

`NoteForm` owns presentation of the controlled form but receives the source-of-truth values and callbacks from its owner.

```jsx
<NoteForm
  value={form}
  isEditing={editingId !== null}
  onChange={setForm}
  onSubmit={handleSubmit}
  onCancel={cancelEdit}
/>
```

```jsx
<FilterBar value={filter} onChange={setFilter} />
```

```jsx
<NoteList
  notes={visibleNotes}
  onEdit={startEdit}
  onDelete={deleteNote}
/>
```

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

The child requests actions through callbacks; it does not directly mutate the parent's collection.

### Topic 9: Stable Keys and Identity

```jsx
{visibleNotes.map((note) => (
  <NoteItem
    key={note.id}
    note={note}
    onEdit={startEdit}
    onDelete={deleteNote}
  />
))}
```

The note ID represents stable logical identity. Index keys are risky when items can be inserted, removed, filtered, or reordered. Random keys are especially problematic because they change between renders.

### Topic 10: Forms and Accessibility

```jsx
<form onSubmit={handleSubmit}>
  <label htmlFor="note-text">Note</label>
  <textarea
    id="note-text"
    name="text"
    value={form.text}
    onChange={handleChange}
  />

  <label htmlFor="note-priority">Priority</label>
  <select
    id="note-priority"
    name="priority"
    value={form.priority}
    onChange={handleChange}
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <button type="submit">
    {editingId !== null ? "Save Note" : "Add Note"}
  </button>
  {editingId !== null && (
    <button type="button" onClick={cancelEdit}>Cancel</button>
  )}
</form>
```

Use semantic controls, associated labels, and explicit button types. Avoid clickable `div` elements for actions.

### Topic 11: Local Storage Persistence

Browser storage is a side effect, so persistence belongs in an effect rather than inside the state setter.

```jsx
import { useEffect, useState } from "react";

useEffect(() => {
  try {
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    console.error("Unable to save notes", error);
  }
}, [notes]);
```

Restore with a lazy initializer:

```jsx
function readNotes() {
  try {
    const saved = localStorage.getItem("notes");
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const [notes, setNotes] = useState(readNotes);
```

`localStorage` is browser-local, synchronous, size-limited, and not a secure secret store or backend database. Production applications should consider schema validation/versioning and migrations when stored data changes shape.

## Key Concepts

| Concept | Rule |
|---|---|
| State | Store source-of-truth data |
| Derived data | Calculate from existing state |
| Add | `[...current, item]` |
| Remove | `filter` |
| Update | `map` + object spread |
| Form | Keep inputs controlled when React owns the value |
| Identity | Preserve stable IDs during edits |
| Keys | Use stable item identity |
| Child actions | Communicate through callback props |
| Persistence | Serialize/deserialize browser storage carefully |

### State Ownership Rule

> Keep state where its lifetime and consumers make the most sense, and lift it when multiple components need coordinated access.

Do not interpret this as “always keep state in the parent.” The owner should be the component responsible for coordinating the relevant source of truth.

## Visual Concept Map

```text
                    Notes App
                        |
             +----------+----------+
             |          |          |
          Form State  Notes      Filter
             |          |          |
             |          |       visibleNotes
             |          |          |
             |     +----+----+     |
             |     |         |     |
           Add   Edit     Delete   |
             |     |         |     |
             +-----+---------+-----+
                       |
                 Derived UI
                       |
                  Render List
                       |
                  stable key
                       |
                  localStorage
```

## End-to-End Practical

Build the complete Notes App with:

- Add
- Delete
- Edit
- Cancel edit
- Priority
- Priority filter
- Empty states
- Stable IDs and keys
- Derived counts
- `localStorage` persistence
- Accessible labels and buttons

### Acceptance Criteria

- Adding valid text creates a note immediately.
- Empty and whitespace-only notes are rejected.
- Editing preserves the existing note ID and creation time.
- Deleting removes only the selected note.
- Deleting the note currently being edited exits edit mode.
- Filtering does not mutate the source collection.
- Derived counts always match the source collection.
- Refresh restores saved notes.
- Cancel exits edit mode without changing the note.
- Dynamic notes use stable keys.
- Cancel/Delete buttons do not accidentally submit a form.
- No direct mutation of arrays or note objects occurs.

## Hands-on Coding

### Example 1: Daily Study Notes

```jsx
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setNotes((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text: value,
        createdAt: Date.now(),
      },
    ]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <label htmlFor="study-note">Study note</label>
        <input
          id="study-note"
          value={text}
          placeholder="Write note"
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => <p key={note.id}>{note.text}</p>)
      )}
    </div>
  );
}
```

### Example 2: Team Meeting Note With Delete

```jsx
function NoteItem({ note, onDelete }) {
  return (
    <article>
      <p>{note.text}</p>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
      <button type="button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </article>
  );
}
```

### Example 3: Derived Filter

```jsx
const visibleNotes =
  filter === "all"
    ? notes
    : notes.filter((note) => note.priority === filter);

const visibleCount = visibleNotes.length;
```

`visibleCount` is derived and therefore does not need its own state.

## Mini Exercise

Build a personal idea board with:

- priority: High / Medium / Low
- a filter that shows only High notes
- a count of visible notes
- delete functionality

### Expected Output

- Notes store text and priority.
- Filter changes the visible collection.
- Count is derived rather than stored as separate state.
- Existing add/delete flows continue to work.

### Extension

Add editing without changing the note ID.

## Common Mistakes

### Mistake 1 — Direct array mutation

```jsx
// ❌
notes.push(note);
setNotes(notes);
```

Use:

```jsx
// ✅
setNotes((current) => [...current, note]);
```

### Mistake 2 — Direct object mutation

```jsx
// ❌
note.text = "New text";
```

Use an immutable object update inside `map`.

### Mistake 3 — Storing filtered notes

```jsx
// ❌
const [filteredNotes, setFilteredNotes] = useState([]);
```

Prefer deriving filtered notes from `notes` and `filter`.

### Mistake 4 — Changing identity during edit

```jsx
// ❌
{ ...note, id: crypto.randomUUID(), text }
```

The ID should remain stable when the logical note is edited.

### Mistake 5 — Wrong button type

```jsx
// ❌
<button onClick={cancelEdit}>Cancel</button>
```

Inside a form this may submit. Use:

```jsx
// ✅
<button type="button" onClick={cancelEdit}>Cancel</button>
```

### Mistake 6 — Random list keys

```jsx
// ❌
key={Math.random()}
```

Use the stable note ID.

### Mistake 7 — Unsafe stored data

Do not assume parsed `localStorage` data has the current schema. Validate the basic shape before rendering it.

## How to Verify the Project

### Create

- [ ] Enter valid text.
- [ ] Select a priority.
- [ ] Submit.
- [ ] Confirm a new note appears.
- [ ] Confirm the form resets.

### Validation

- [ ] Submit an empty value.
- [ ] Submit whitespace only.
- [ ] Confirm no invalid note is created.

### Edit

- [ ] Click Edit.
- [ ] Confirm the form contains the selected note.
- [ ] Change text or priority.
- [ ] Save.
- [ ] Confirm the same ID remains.
- [ ] Cancel and confirm the original note remains unchanged.

### Delete

- [ ] Delete a note.
- [ ] Confirm only that note disappears.
- [ ] Delete the note currently being edited.
- [ ] Confirm edit mode is cancelled.

### Filter

- [ ] Show all notes.
- [ ] Select High.
- [ ] Confirm only High notes appear.
- [ ] Select a priority with no matches.
- [ ] Confirm the filtered empty state appears.

### Persistence

- [ ] Create a note.
- [ ] Refresh the browser.
- [ ] Confirm the note is restored.
- [ ] Inspect storage and confirm JSON is valid.
- [ ] Test malformed stored JSON and confirm the app does not crash.

## Debugging Challenge

This code is incorrect:

```jsx
notes[0].text = "Updated";
setNotes(notes);
```

It mutates the existing note object and reuses the existing array reference.

Correct approach:

```jsx
setNotes((current) =>
  current.map((note) =>
    note.id === id ? { ...note, text: "Updated" } : note,
  ),
);
```

The update creates a new array and a new object only for the changed note.

## Assessment Quiz

### Questions

1. Why should a note have a stable ID?
2. What method is normally used to remove a note from an array state?
3. Why should `visibleNotes` usually be derived instead of stored?
4. Why use a functional update when adding a note?
5. Why should an edit preserve the note ID?
6. What is the difference between `key` and a normal prop?
7. Why should a Cancel button inside a form use `type="button"`?
8. Why can `localStorage` not be treated as a backend database?
9. How do you immutably update one note in an array?
10. What is the difference between “no notes” and “no matching notes”?

### Answers

1. It provides stable identity for targeting updates/deletion and list reconciliation.
2. `filter`.
3. It is derived from the source collection and filter, so storing it creates another source of truth.
4. Because the next array depends on the previous array state.
5. The logical entity is the same; only editable fields changed.
6. `key` is used by React for reconciliation and is not passed to the component as a normal prop.
7. A button in a form defaults to submit behavior unless another type is specified.
8. It is local browser storage, not secure, centralized, transactional, multi-user persistence.
9. Use `map`, match the stable ID, and return a copied object for the matching item.
10. The first means the source collection is empty; the second means data exists but the current filter matches nothing.

## Task

Build the complete Notes App.

### Required

- Add note
- Delete note
- Edit note
- Cancel edit
- Priority
- Priority filter
- Timestamp
- Empty state
- Filtered empty state
- Stable IDs and keys
- Derived counts
- `localStorage` persistence

### Constraints

- No direct mutation.
- Use functional updates when transitions depend on previous state.
- Do not store filtered notes separately.
- Do not store counts that can be derived.
- Preserve note identity during edits.
- Use semantic form controls and correct button types.

### Stretch Goals

- Search by note text.
- Sort by creation time.
- Add character-count validation.
- Add a confirmation flow before deletion.
- Add storage schema versioning.
- Extract persistence into a reusable custom hook after Day 33.

## Self Check

Before moving to Day 15, you should be able to explain:

- [ ] Why arrays in React state should not be mutated directly.
- [ ] Why `map` is useful for updating one note.
- [ ] Why `filter` is useful for deletion.
- [ ] Why filtered notes are derived data.
- [ ] Why stable IDs matter.
- [ ] Why editing should preserve identity.
- [ ] Why callback props are used for child-to-parent actions.
- [ ] Why functional updates are useful.
- [ ] Why Cancel buttons need an explicit type inside forms.
- [ ] What `localStorage` can and cannot provide.

## Interview Questions and Answers

### Beginner

**Question: Which React concepts are used in the Notes App?**

**Answer:** Components, props, callback props, controlled forms, events, `useState`, array/object state, immutable updates, conditional rendering, list rendering, stable keys, derived data, and persistence.

**Question: How do you avoid adding empty notes?**

**Answer:** Trim the input and reject an empty result before creating the note.

### Intermediate

**Question: How do you update one note immutably?**

**Answer:** Use `map`, match the note by stable ID, and return `{ ...note, changedField }` for the matching item.

**Question: Why not store `filteredNotes` in state?**

**Answer:** It can be derived from `notes` and `filter`; storing it introduces duplicated state and synchronization problems.

**Question: How would you implement edit functionality?**

**Answer:** Track the editing ID, load the selected note into the controlled form, then update the matching note with `map` while preserving its ID.

**Question: Why should a reusable `NoteItem` receive callbacks?**

**Answer:** The parent owns the collection state. The child can request an action without taking ownership of or mutating that state.

### Advanced

**Question: Why can index keys cause bugs in a Notes App?**

**Answer:** When notes are inserted, removed, filtered, or reordered, indexes can point to different logical notes. Stable IDs preserve item identity across renders.

**Question: Why is preserving object references for unchanged notes useful?**

**Answer:** Immutable updates do not require deep-cloning everything. Keeping unchanged references accurately communicates what changed and can support efficient memoized rendering.

**Question: What are the limitations of `localStorage`?**

**Answer:** It is browser-local, synchronous, size-limited, not a secure secret store, not automatically synchronized across users/devices, and not a substitute for backend persistence.

**Question: How would you move persistence into reusable architecture?**

**Answer:** Separate storage from UI state, validate parsed data, handle storage errors, and later extract the behavior into a custom hook or service.

**Question: What would change if notes came from an API?**

**Answer:** The app would need explicit loading, error, retry, saving/mutation, authorization, stale-data, and synchronization considerations. Server state should not automatically be treated as local UI state.

## Day 14 Outcome

By the end of Day 14, you can:

- combine React fundamentals into a coherent feature;
- design state around a single source of truth;
- add, edit, delete, and filter array state immutably;
- preserve stable item identity during edits;
- derive filtered results and counts instead of duplicating state;
- coordinate child components through callback props;
- build accessible controlled forms;
- persist and restore browser-local data safely; and
- explain the tradeoffs and limitations of `localStorage`.

You are ready for **Day 15**, where the next React concept builds on this project foundation.
