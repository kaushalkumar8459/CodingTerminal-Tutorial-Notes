---
title: Keys and Reconciliation
slug: day-017-keys-and-reconciliation
dayLabel: Day 17
level: Intermediate
estimatedMinutes: 60
order: 17
track: react
---
# Day 17: Keys and Reconciliation

## Goal

Understand how React preserves component identity, why list keys matter, how reconciliation works at a practical level, when index keys are safe or unsafe, and how changing a `key` can intentionally reset component state.

## Prerequisites

- Days 1–16 completed
- Comfortable with components, props, state, lists, and conditional rendering

## Why This Matters

Keys are not merely a way to silence a React warning. They are part of React's identity model. A wrong key can cause local state, focus, animations, or input values to appear attached to the wrong item. A correct key helps React understand that an item remains the same item even when its position changes.

## 1. What Is a Key?

A `key` is a special React value used to identify an element among its siblings. It is primarily used during reconciliation and is **not passed to the component as a normal prop**.

```jsx
function TaskList({ tasks }) {
  return tasks.map((task) => (
    <TaskRow key={task.id} task={task} />
  ));
}
```

Good keys are:

- stable across renders
- unique among siblings
- tied to the item's identity rather than its current position

Do not confuse **unique globally** with **unique among siblings**. Keys only need to be unique within the relevant sibling set.

## 2. Key vs Prop

This does not make `key` available as `props.key`:

```jsx
<Product key={product.id} product={product} />
```

If the child needs the identifier, pass it explicitly:

```jsx
<Product key={product.id} product={product} productId={product.id} />
```

## 3. Stable Data IDs

Prefer an identifier that belongs to the data:

```jsx
const users = [
  { id: "u101", name: "Asha" },
  { id: "u102", name: "Ravi" },
];

users.map((user) => <UserRow key={user.id} user={user} />);
```

Avoid generating a new random key during every render. A key that changes every render tells React that the previous item is no longer the same item.

## 4. Why Index Keys Can Be Dangerous

This is not universally forbidden:

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

It can be acceptable when the list is genuinely static: no insertion, deletion, filtering, sorting, or reordering, and item identity does not change.

It becomes risky when item order changes. Consider rows containing local state or an input. If the first item is removed, the old index `1` becomes `0`, so React may associate the existing component instance with a different data item.

**Rule:** use a stable data ID whenever the list can change or reorder.

## 5. Reordering and Identity

```jsx
const reordered = [tasks[2], tasks[0], tasks[1]];
```

The positions changed, but the tasks did not become different tasks. With stable keys, React can match each task by identity.

Think:

```text
Position:  0   1   2
Before:    A   B   C
After:     C   A   B

Identity: A remains A, B remains B, C remains C
```

## 6. Reconciliation Mental Model

At a practical level, React renders a new element tree and compares it with the previous rendered tree. Element type, position, and keys influence whether React can preserve an existing component instance or needs to create/remove one.

A useful simplified model is:

```text
New render
   ↓
New element tree
   ↓
Reconciliation
   ├── match existing identity
   ├── insert new elements
   ├── remove old elements
   └── preserve/reset component state as appropriate
   ↓
Commit required host updates
```

Do not reduce reconciliation to “React compares HTML and changes only changed nodes.” Rendering, reconciliation, component identity, and committing host updates are related but distinct concepts.

## 7. Component Type Also Matters

Keys are not the only identity signal. If the component type changes, React generally treats the new component as a different component instance.

```jsx
{mode === "edit" ? <EditForm /> : <ViewMode />}
```

Switching between different component types normally creates the new component instance rather than preserving the old component's local state as if it were the same component.

## 8. Using a Key to Intentionally Reset State

Changing a key can intentionally create a fresh component instance:

```jsx
<ProfileForm key={profileId} profileId={profileId} />
```

If `profileId` changes, the form can mount as a new instance. This can be useful when a form's local state should be completely reset for a different record.

This is an intentional identity decision—not a generic replacement for proper state management.

## 9. Add, Remove, and Update Safely

```jsx
const removeTask = (id) => {
  setTasks((current) => current.filter((task) => task.id !== id));
};

const renameTask = (id, title) => {
  setTasks((current) =>
    current.map((task) =>
      task.id === id ? { ...task, title } : task,
    ),
  );
};
```

The same stable identifier should usually be used for the action and the list key.

## 10. Focus and Input-State Demo

A powerful experiment is to render editable rows with index keys, then insert an item at the top. Observe how the wrong row can retain local input state. Repeat using stable IDs.

This demonstrates why key problems are not merely performance problems; they are correctness problems.

## Common Mistakes

### Mistake 1: `key={Math.random()}`

This creates a new identity on every render and can cause unnecessary remounts and lost local state.

### Mistake 2: Using an index for a reorderable list

Use a stable item ID instead.

### Mistake 3: Expecting `props.key`

Pass the ID separately if the component needs it.

### Mistake 4: Assuming keys must be globally unique

They only need to be unique among siblings.

### Mistake 5: Thinking keys directly improve performance

The primary purpose is identity. Better identity can enable correct and efficient reconciliation, but a key itself is not a performance optimization switch.

## Practical Lab: Editable Task Board

```jsx
import { useState } from "react";

function TaskRow({ task, onRename }) {
  const [draft, setDraft] = useState(task.title);

  return (
    <li>
      <input value={draft} onChange={(e) => setDraft(e.target.value)} />
      <button onClick={() => onRename(task.id, draft)}>Save</button>
    </li>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    { id: "a", title: "Design" },
    { id: "b", title: "Develop" },
  ]);

  const renameTask = (id, title) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task)),
    );
  };

  const addTask = () => {
    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title: "New task" },
    ]);
  };

  return (
    <>
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} onRename={renameTask} />
        ))}
      </ul>
    </>
  );
}
```

### Experiment

1. Type different draft text into each row.
2. Add a new row.
3. Reorder the array.
4. Change `key={task.id}` to `key={index}`.
5. Repeat the experiment.
6. Explain the difference in terms of component identity.

## Quiz

1. What does a key identify?
2. Must keys be globally unique?
3. When can index keys be acceptable?
4. Why are index keys risky for editable reorderable lists?
5. Is `key` available through normal props?
6. What can changing a component key intentionally do?
7. What is reconciliation?

**Answers:**

1. An element's identity among siblings.
2. No; sibling uniqueness is the requirement.
3. For genuinely static lists where identity never changes.
4. Component identity can become associated with different data.
5. No; pass the ID separately if needed.
6. It can cause the component instance to be recreated, resetting local state.
7. React's process for determining how a newly rendered element tree relates to the previous tree.

## Interview Questions

### Beginner

**Why does React require keys for dynamic lists?**

Keys help React identify sibling elements across renders.

**Why should a key be stable?**

Because changing the key changes the identity React uses for that element.

### Intermediate

**When is an index key acceptable?**

When the list is static and its ordering and membership never change in a way that affects identity.

**Why can index keys cause incorrect input values?**

Because component instances may be reused for a different data item after insertion, deletion, or reordering.

### Advanced

**What happens when a key changes?**

React can treat the element as a different identity, causing the old component instance to be removed and a new one created. Local state is therefore reset.

**Are keys a performance feature or an identity feature?**

Primarily an identity feature. Correct identity allows reconciliation to preserve the right instances and apply updates appropriately.

## Final Challenge

Build a reorderable employee list with:

- stable IDs
- editable row state
- add/remove
- move-to-top
- filtering
- a demonstration of why index keys are unsafe
- an intentional `key`-based reset for an employee form

## Self Check

You are ready for Day 18 if you can explain, without notes:

- key vs prop
- stable vs index keys
- identity vs position
- reconciliation at a high level
- why state can move to the wrong row with bad keys
- when changing a key is useful

## Day 17 Outcome

You can now reason about list identity instead of treating `key` as boilerplate. This prepares you for dynamic component rendering and more advanced component-state relationships.
