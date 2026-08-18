---
title: Array State Handling
slug: day-011-array-state-handling
dayLabel: Day 11
level: Intermediate
estimatedMinutes: 60
order: 11
track: react
---
# Day 11: Array State Handling

## Goal

Learn how to add, remove, replace, and update objects inside array state without mutation.

## Core Rule

Treat state arrays as immutable values.

```text
Add    → [...current, newItem]
Remove → current.filter(...)
Update → current.map(...)
```

## 1. Initialize Array State

```jsx
const [skills, setSkills] = useState(["HTML", "CSS"]);
```

## 2. Add Items

```jsx
setSkills((current) => [...current, "React"]);
```

The old array is not modified; a new array is created.

## 3. Remove Items

```jsx
setSkills((current) => current.filter((skill) => skill !== "CSS"));
```

`filter` returns a new array containing the items that should remain.

## 4. Update One Item

For arrays of objects, use `map` and preserve the unchanged items.

```jsx
setTasks((current) =>
  current.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  ),
);
```

Notice there are **two immutable levels**: a new array and a new object for the changed item.

## 5. Replace an Item

```jsx
setItems((current) =>
  current.map((item) => (item.id === updated.id ? updated : item)),
);
```

Use a stable identifier rather than position when the collection has meaningful IDs.

## 6. Clear an Array

```jsx
setItems([]);
```

## 7. Prevent Duplicates

```jsx
setSkills((current) => {
  const value = newSkill.trim();
  if (!value || current.includes(value)) return current;
  return [...current, value];
});
```

Returning the existing array when nothing changes is also a clear way to express that no update is needed.

## 8. Array of Objects

```jsx
const [cart, setCart] = useState([
  { id: 1, name: "Phone", quantity: 1 },
  { id: 2, name: "Mouse", quantity: 2 },
]);
```

A common update is:

```jsx
setCart((current) =>
  current.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  ),
);
```

## 9. Sorting and Reversing

Be careful: `sort()` and `reverse()` mutate an array.

Do not do this directly to state:

```jsx
items.sort();
```

Create a copy first:

```jsx
setItems((current) => [...current].sort((a, b) => a.name.localeCompare(b.name)));
```

This is an important real-world immutability edge case.

## 10. Keys

Use a stable key from the data when possible:

```jsx
items.map((item) => <Row key={item.id} item={item} />)
```

An array index is not automatically wrong, but it becomes risky when items can be inserted, removed, or reordered because identity can move between positions. Never use random values as keys.

## Complete Example

```jsx
import { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design UI", done: false },
    { id: 2, title: "Build API", done: false },
  ]);
  const [title, setTitle] = useState("");

  function addTask() {
    const value = title.trim();
    if (!value) return;

    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title: value, done: false },
    ]);
    setTitle("");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <section>
      <input value={title} onChange={(event) => setTitle(event.target.value)} />
      <button type="button" onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.done ? "Done" : "Pending"}
            <button type="button" onClick={() => toggleTask(task.id)}>Toggle</button>
            <button type="button" onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

## Common Mistakes

- `push`, `pop`, `splice`, `sort`, and `reverse` can mutate the existing array.
- Updating an object in an array without copying that object mutates nested state.
- Using array index as key for dynamic/reorderable lists.
- Generating random keys during render.
- Using array position instead of a stable domain ID for updates/deletes.

## Hands-on Lab

Build a **Shopping Cart Manager** with:

- Add product
- Remove product
- Increase/decrease quantity
- Empty cart
- Derived total quantity
- Derived total price
- Stable IDs and keys

Do not store `totalPrice` separately; calculate it from cart state.

## Debugging Challenge

Why is this unsafe?

```jsx
cart[0].quantity += 1;
setCart(cart);
```

Fix it with an immutable `map` update.

## Assessment

1. Add item? **Spread.**
2. Remove item? **Filter.**
3. Update one item? **Map.**
4. Why copy an object inside the array? **To avoid mutating nested state.**
5. Why can `sort()` be dangerous? **It mutates the array.**
6. Are index keys always forbidden? **No; they can be acceptable for static lists, but are risky when identity/order changes.**

## Interview Questions

**How do you update one object in an array?** `map` and return a copied object for the matching ID.

**Why is `filter` useful for deletion?** It creates a new array without the selected item.

**Why should array methods such as `sort` be handled carefully?** Some mutate their receiver.

**Why are stable keys important?** They preserve item identity across renders.

**What is a normalized list?** A design that separates item records from their IDs/references; useful for complex collections and efficient updates.

## Day 11 Outcome

You can safely manage dynamic arrays, nested objects, list identity, derived totals, and immutable add/remove/update operations.
