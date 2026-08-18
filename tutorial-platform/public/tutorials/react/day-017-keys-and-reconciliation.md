---
title: Keys and Reconciliation
slug: day-017-keys-and-reconciliation
dayLabel: Day 17
level: Intermediate
estimatedMinutes: 90
order: 17
track: react
---
# Day 17 [Intermediate]: Keys and Reconciliation

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
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 17 Outcome](#day-17-outcome)

## Goal

Understand React identity at a practical level: why list keys matter, how reconciliation relates to component identity, why index keys can break stateful rows, and how changing a `key` can intentionally reset local state.

## Prerequisites

- Days 1–16 completed
- Components and props
- `useState`
- list rendering with `map()`
- immutable array updates
- conditional rendering

## Explanation

A React `key` is a special identity hint for elements in a sibling list. It is not a normal prop. During a new render, React uses element type, position, and keys as part of deciding which component instances can be preserved and which need to be inserted, removed, or recreated.

The important mental model is:

```text
Data identity
     ↓
key + element type + tree position
     ↓
Reconciliation
     ↓
Preserve / create / remove component instances
     ↓
Correct local state, focus and DOM updates
```

Do not reduce reconciliation to “React compares HTML and changes only changed nodes.” Rendering, reconciliation, and committing host updates are related but distinct phases.

## Topic by Topic

### 1. What Is a Key?

```jsx
function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </ul>
  );
}
```

Good keys are:

- stable across renders
- unique among siblings
- tied to the item's identity

Keys do **not** need to be globally unique.

### 2. Key vs Normal Prop

This does not make `key` available as `props.key`:

```jsx
<Product key={product.id} product={product} />
```

If the child needs the identifier:

```jsx
<Product
  key={product.id}
  productId={product.id}
  product={product}
/>
```

### 3. Stable Data IDs

Prefer an ID belonging to the domain object:

```jsx
const users = [
  { id: "u101", name: "Asha" },
  { id: "u102", name: "Ravi" },
];

users.map((user) => (
  <UserRow key={user.id} user={user} />
));
```

Do not use `Math.random()` for a key during rendering. A new random value creates a new identity on every render and can cause remounts and lost local state.

### 4. Identity vs Position

Consider:

```text
Before: A  B  C
After:  C  A  B
```

The positions changed, but the logical items did not. Stable keys allow React to associate A with A, B with B, and C with C.

### 5. Why Index Keys Can Be Dangerous

```jsx
items.map((item, index) => (
  <Row key={index} item={item} />
));
```

An index key can be acceptable for a genuinely static list whose membership and order never change. It is risky when items can be inserted, deleted, filtered, or reordered.

Example:

```text
Before: index 0 → A, index 1 → B
Remove A
After:  index 0 → B
```

The old component instance at index 0 may now represent B. If that instance contained an input or local state, the state can appear to move to the wrong item.

**Rule:** use a stable domain ID whenever item identity can change relative to position.

### 6. Reconciliation Mental Model

A simplified practical model:

```text
New render
   ↓
New element tree
   ↓
Compare with previous tree
   ↓
Use type / position / key identity
   ├── preserve matching instance
   ├── create new instance
   ├── remove old instance
   └── update host output
```

This is a teaching model, not an implementation-level description of every React optimization.

### 7. Element Type Also Matters

Keys are not the only identity signal.

```jsx
{mode === "edit" ? <EditForm /> : <ViewMode />}
```

Switching between different component types normally means React does not preserve the old component instance as though it were the same component type.

### 8. Changing a Key Can Reset State

```jsx
<ProfileForm key={profileId} profileId={profileId} />
```

When `profileId` changes, the new key represents a different identity. The old form instance can be removed and a new instance created, resetting local state.

This is useful when changing records should start a fresh form. It should be an intentional identity decision, not a workaround for every state problem.

### 9. Keys and State Preservation

A key does not “store” state. Instead, it helps React decide whether an existing component identity matches the new tree. If identity is preserved, local state can be preserved. If identity changes, the component can be recreated.

### 10. Keys and Focus / Input State

A bad key can create correctness bugs, not merely performance problems.

A useful experiment:

1. Render editable rows using index keys.
2. Type different values into rows.
3. Insert a new row at the top.
4. Observe which input retains which local state.
5. Repeat with stable IDs.

### 11. Safe Immutable List Updates

Use the same stable identifier for updates and list keys:

```jsx
const removeTask = (id) => {
  setTasks((current) =>
    current.filter((task) => task.id !== id)
  );
};

const renameTask = (id, title) => {
  setTasks((current) =>
    current.map((task) =>
      task.id === id ? { ...task, title } : task
    )
  );
};
```

### 12. Nested Key Scope

Keys only need to be unique among the siblings in the list where they are used.

```jsx
teams.map((team) => (
  <section key={team.id}>
    {team.members.map((member) => (
      <li key={member.id}>{member.name}</li>
    ))}
  </section>
));
```

A member ID does not need to be unique across every team.

## Key Concepts

| Concept | Meaning |
|---|---|
| Key | Identity hint for sibling elements |
| Stable key | Same logical item keeps the same identity |
| Index key | Position-based identity; safe only for suitable static lists |
| Reconciliation | Relating the new rendered tree to the previous tree |
| Remount | Old component instance is removed and a new one is created |
| State preservation | Existing component identity allows local state to continue |
| Key reset | Changing key intentionally creates a new identity |

## Visual Concept Map

```text
                React render
                     ↓
              Element tree
                     ↓
              Reconciliation
                     ↓
        +------------+------------+
        |                         |
   same identity             new identity
        |                         |
 preserve state              create instance
        |                         |
 correct row state          reset local state
```

## End-to-End Practical

### Editable Task Board

Build a task board where each row has local draft state.

```jsx
import { useState } from "react";

function TaskRow({ task, onRename }) {
  const [draft, setDraft] = useState(task.title);

  return (
    <li>
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button type="button" onClick={() => onRename(task.id, draft)}>
        Save
      </button>
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
      current.map((task) =>
        task.id === id ? { ...task, title } : task
      )
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
      <button type="button" onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onRename={renameTask}
          />
        ))}
      </ul>
    </>
  );
}
```

### Experiment

1. Type different draft values into multiple rows.
2. Add a row.
3. Reorder the array.
4. Temporarily change `key={task.id}` to `key={index}`.
5. Insert/delete items.
6. Explain the observed behavior using identity rather than “React got confused.”

## Hands-on Coding

### Challenge 1 — Identity Lab

Create a list with editable rows and demonstrate the difference between stable IDs and index keys.

### Challenge 2 — Key Reset

Build a profile editor where changing `profileId` intentionally resets the form by changing its key.

### Challenge 3 — Reorderable Tasks

Implement add, remove, and move-to-top while preserving the correct draft state for every task.

### Challenge 4 — Nested Collections

Render teams and members with correct keys at both list boundaries.

## Mini Exercise

Given:

```jsx
const items = [
  { id: "a", name: "A" },
  { id: "b", name: "B" },
];
```

Explain why this is safer for a reorderable list:

```jsx
items.map((item) => <Row key={item.id} item={item} />)
```

than:

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

Then describe one scenario where an index key is acceptable.

## Common Mistakes

### `key={Math.random()}`

Creates a changing identity on every render.

### Index key for reorderable data

Associates identity with position instead of the logical item.

### Expecting `props.key`

`key` is special. Pass the value separately if needed.

### Assuming keys are global IDs

Sibling uniqueness is the relevant scope.

### Treating keys as a performance switch

Keys primarily communicate identity. Correct identity supports correct reconciliation.

### Changing keys accidentally

An unstable key can cause unexpected remounts and lost local state.

## Assessment Quiz

1. What does a key identify?
2. Must keys be globally unique?
3. When can an index key be acceptable?
4. Why are index keys risky for editable reorderable lists?
5. Is `key` available through normal props?
6. What can changing a key intentionally do?
7. What is reconciliation at a practical level?
8. Why can a wrong key cause a correctness bug?
9. What other signal besides key influences component identity?

### Answers

1. The identity of an element among its relevant siblings.
2. No; they need to be unique among siblings.
3. For genuinely static lists whose order and membership do not change in a way that affects identity.
4. A component instance can become associated with different data after insertion, deletion, or reordering.
5. No. Pass the identifier as another prop.
6. It can cause a fresh component instance and reset local state.
7. React's process of relating a newly rendered element tree to the previous one and determining what should be preserved, created, removed, or updated.
8. Incorrect identity can preserve state, focus, or input values for the wrong logical item.
9. Element type and tree position also matter.

## Task

Build an **Employee Identity Lab** with:

- 10 employees with stable IDs
- editable row state
- add/remove
- move-to-top
- filtering
- stable-key implementation
- index-key experiment
- intentional key-based form reset

### Acceptance Criteria

- [ ] Domain IDs are used as keys for mutable lists.
- [ ] Index-key limitations are demonstrated rather than memorized.
- [ ] Editable state stays attached to the correct employee.
- [ ] `key` is not expected in child props.
- [ ] Nested lists use keys at each sibling boundary.
- [ ] Changing a key intentionally resets the required local state.
- [ ] No random keys are generated during render.

## Self Check

- [ ] I can explain key vs prop.
- [ ] I can distinguish identity from position.
- [ ] I know when index keys are unsafe.
- [ ] I can explain reconciliation without saying “React compares HTML.”
- [ ] I can predict what changing a key does to local state.
- [ ] I understand sibling key scope.
- [ ] I can debug a state-moving bug caused by keys.

## Interview Questions and Answers

### Beginner

**Why does React need keys?**  
Keys help React identify sibling elements across renders.

**Why should keys be stable?**  
Changing the key changes the identity React uses for the element.

### Intermediate

**When is an index key acceptable?**  
When the collection is genuinely static and item identity never changes relative to position.

**Why can index keys cause incorrect input values?**  
After insertion, deletion, or reordering, a component instance can be reused for a different data item.

### Advanced

**What happens when a key changes?**  
React can treat the element as a new identity, removing the old component instance and creating a new one. Local state is therefore reset.

**Are keys a performance feature or identity feature?**  
Primarily an identity feature. Correct identity enables reconciliation to preserve the correct instances and update the correct output.

**Does changing a key always mean the entire application remounts?**  
No. The identity change applies to the keyed element and its relevant subtree, not the whole application.

## Day 17 Outcome

You can now reason about React list identity instead of treating `key` as boilerplate. You can diagnose state-moving bugs, choose appropriate keys, and intentionally use key changes when a fresh component instance is required.

**Next:** Day 18 builds on component identity and state relationships.
