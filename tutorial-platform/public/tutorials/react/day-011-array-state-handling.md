---
title: Array State Handling
slug: day-011-array-state-handling
dayLabel: Day 11
level: Intermediate
estimatedMinutes: 90
order: 11
track: react
---
# Day 11: Array State Handling

## Goal

Learn how to safely add, remove, replace, update, reorder, sort, and derive information from array state without mutating existing state.

By the end of this lesson you should be able to:

- update primitive arrays immutably;
- update arrays of objects without mutating nested objects;
- use functional state updates when the next value depends on previous state;
- preserve stable item identity and React keys;
- derive filtered lists, counts, and totals instead of duplicating them in state; and
- choose an appropriate update strategy for common collection operations.

## Prerequisites

You should understand:

- `useState`
- functional state updates
- object state and object spread
- `.map()`, `.filter()`, `.reduce()`, and `.includes()`
- rendering lists with `.map()` and stable `key` values

## Explanation

An array stored in React state should be treated as an immutable value. React does not require that every update create a completely unrelated data structure, but the state value must not be mutated in place.

The core transformation patterns are:

```text
Add        → [...current, newItem]
Remove     → current.filter(...)
Update     → current.map(...)
Replace    → current.map(...)
Clear      → []
Sort       → [...current].sort(...)
Reverse    → [...current].reverse()
Derived    → current.filter(...) / current.reduce(...)
```

The most important rule is:

> Create a new array for the update, and create new nested objects for the items whose data changes.

You do **not** need to deep-clone every item for every update. Unchanged objects can safely retain their references.

## Topic by Topic

### 1. Initialize Array State

```jsx
import { useState } from "react";

const [skills, setSkills] = useState(["HTML", "CSS"]);
```

The array belongs to the component instance and persists between renders until its state is replaced.

### 2. Add Items

```jsx
setSkills((current) => [...current, "React"]);
```

The existing array is not modified; a new array is created.

Insert at a particular position:

```jsx
setSkills((current) => [
  ...current.slice(0, index),
  newSkill,
  ...current.slice(index),
]);
```

For many applications, appending and sorting later is simpler than maintaining arbitrary insertion positions.

### 3. Remove Items

```jsx
setSkills((current) =>
  current.filter((skill) => skill !== "CSS")
);
```

`filter` returns a new array containing only the items that should remain.

For object arrays, remove by a stable identifier:

```jsx
setTasks((current) =>
  current.filter((task) => task.id !== id)
);
```

### 4. Update One Item

For arrays of objects, use `map` and copy the changed object:

```jsx
setTasks((current) =>
  current.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task
  )
);
```

There are two immutable levels here:

1. `map` creates a new array.
2. `{ ...task }` creates a new object for the changed item.

Unchanged objects can safely retain their references.

### 5. Replace an Item

```jsx
setItems((current) =>
  current.map((item) =>
    item.id === updated.id ? updated : item
  )
);
```

Use a stable domain identifier rather than an array position when records have meaningful IDs.

If the replacement object may be incomplete, merge it deliberately instead:

```jsx
setItems((current) =>
  current.map((item) =>
    item.id === updated.id ? { ...item, ...updated } : item
  )
);
```

### 6. Clear an Array

```jsx
setItems([]);
```

This explicitly replaces the current array with a new empty array.

### 7. Prevent Duplicates

For primitive values:

```jsx
setSkills((current) => {
  const value = newSkill.trim();
  if (!value || current.includes(value)) return current;
  return [...current, value];
});
```

Returning `current` when nothing changes is valid.

For object arrays, duplicate detection should normally use a domain identifier or explicit business rule rather than object reference equality.

```jsx
setUsers((current) => {
  if (current.some((user) => user.id === newUser.id)) return current;
  return [...current, newUser];
});
```

### 8. Array of Objects

```jsx
const [cart, setCart] = useState([
  { id: 1, name: "Phone", quantity: 1 },
  { id: 2, name: "Mouse", quantity: 2 },
]);
```

A common immutable update is:

```jsx
setCart((current) =>
  current.map((item) =>
    item.id === id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  )
);
```

Do not do this:

```jsx
cart[0].quantity += 1;
setCart(cart);
```

That mutates the existing object and reuses the same array reference.

### 9. Sorting and Reversing

`sort()` and `reverse()` mutate the array on which they are called.

Do not mutate state directly:

```jsx
items.sort();
```

Create a copy first:

```jsx
setItems((current) =>
  [...current].sort((a, b) => a.name.localeCompare(b.name))
);
```

For reverse:

```jsx
setItems((current) => [...current].reverse());
```

If sorting is only a display preference, consider keeping the underlying state order unchanged and deriving a sorted view instead:

```jsx
const sortedItems = [...items].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

This is often preferable when sorting is presentation rather than data.

### 10. Reordering Items

Reordering is also a state transformation. Do not mutate the existing array with `splice`.

```jsx
setItems((current) => {
  const next = [...current];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
});
```

Here `splice` is safe because it operates on the copied `next` array, not on the state array.

When a drag-and-drop library supplies stable IDs, prefer IDs for identifying the moved item and let the collection's order represent the result.

### 11. Keys and Item Identity

Use a stable key from the data when possible:

```jsx
items.map((item) => <Row key={item.id} item={item} />)
```

An index key is not automatically forbidden. It can be acceptable for a genuinely static list whose order and membership never change. It becomes risky when items are inserted, removed, or reordered because component identity can move between positions.

Never generate random keys during render:

```jsx
// ❌ Avoid
items.map((item) => <Row key={Math.random()} item={item} />)
```

A key identifies an item to React's reconciliation process; it is not the same thing as the item's business ID, although the same stable ID is often a good choice for both.

### 12. Derived Values

Do not store values that can be calculated from the array unless there is a specific architectural reason to do so.

```jsx
const totalQuantity = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
```

Filtered data can also be derived:

```jsx
const completedItems = items.filter((item) => item.done);
```

This avoids creating two sources of truth:

```text
items → source of truth
  ├── filter() → visible items
  ├── reduce() → totals
  └── filter() → counts
```

If a derived calculation becomes expensive, optimize it based on measurement rather than automatically turning the derived value into state.

## Key Concepts

| Operation | Preferred pattern | Why |
|---|---|---|
| Add | `[...current, item]` | New array |
| Insert | `slice()` + spread | New array without mutation |
| Remove | `filter` | New array without target |
| Update | `map` + object spread | New array + new changed object |
| Replace | `map` | Preserves unchanged item references |
| Clear | `[]` | Explicit new empty array |
| Sort | `[...current].sort()` | Avoids mutating state |
| Reverse | `[...current].reverse()` | Avoids mutating state |
| Reorder | Copy + `splice()` | Mutation happens only on a copy |
| Derived total | `reduce()` | Avoids redundant state |
| Derived list | `filter()` | Avoids duplicate collection state |

### Functional Updates

When the next array depends on the previous array, prefer:

```jsx
setItems((current) => [...current, newItem]);
```

This makes the dependency on previous state explicit and avoids relying on a potentially stale render snapshot.

### Immutability Does Not Mean Deep-Cloning Everything

You do not need to deep-clone the entire array for every update. Copy the containers along the path that changes.

For example:

```jsx
setUsers((current) =>
  current.map((user) =>
    user.id === id
      ? { ...user, profile: { ...user.profile, city: "Delhi" } }
      : user
  )
);
```

Only the array, matching user, and changed nested profile are new references.

## Visual Concept Map

```text
                    Array State
                         |
       +-----------------+------------------+
       |                 |                  |
      Add              Remove             Update
       |                 |                  |
    spread            filter          map + spread
       |                 |                  |
       +-----------------+------------------+
                         |
                    New Array
                         |
          +--------------+--------------+
          |              |              |
       Reorder         Derived        Render
          |              |              |
     copy + splice   filter/reduce   stable key
```

## End-to-End Practical

Build a **Shopping Cart Manager**.

### Requirements

- Add a product
- Prevent duplicate product IDs
- Remove a product
- Increase quantity
- Decrease quantity
- Remove an item when its quantity reaches zero
- Empty the cart
- Show derived total quantity
- Show derived total price
- Use stable IDs and keys
- Do not store `totalPrice` separately

### Suggested state

```jsx
const [cart, setCart] = useState([]);
```

### Add product

```jsx
function addProduct(product) {
  setCart((current) => {
    const existing = current.find((item) => item.id === product.id);

    if (existing) {
      return current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...current, { ...product, quantity: 1 }];
  });
}
```

### Quantity updates

```jsx
function increaseQuantity(id) {
  setCart((current) =>
    current.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decreaseQuantity(id) {
  setCart((current) =>
    current.flatMap((item) => {
      if (item.id !== id) return [item];
      if (item.quantity <= 1) return [];
      return [{ ...item, quantity: item.quantity - 1 }];
    })
  );
}
```

### Derived totals

```jsx
const totalQuantity = cart.reduce(
  (total, item) => total + item.quantity,
  0
);

const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
```

### Acceptance Criteria

- Adding does not mutate the old cart.
- Duplicate product IDs are handled intentionally.
- Quantity changes update only the matching item.
- Removing leaves all other items unchanged.
- Totals always reflect the current cart.
- No array index is used as the key for dynamic cart items.
- Sorting, if added, does not mutate the state array.
- Empty cart and zero-quantity behavior are explicit.

## Hands-on Coding

### Exercise 1 — Add and Remove

Start with:

```jsx
const [skills, setSkills] = useState(["HTML", "CSS"]);
```

Implement buttons for adding `React` and removing `CSS`.

### Exercise 2 — Toggle Tasks

Given:

```jsx
const [tasks, setTasks] = useState([
  { id: 1, title: "Design UI", done: false },
  { id: 2, title: "Build API", done: false },
]);
```

Implement `toggleTask(id)` using `map` and immutable object updates.

### Exercise 3 — Cart Quantity

Implement `increaseQuantity(id)` and `decreaseQuantity(id)` without mutation. Define what should happen when quantity reaches `1`.

### Exercise 4 — Reorder

Implement `moveItem(fromIndex, toIndex)` without mutating the state array. Explain why mutating a copied array with `splice` is acceptable.

## Mini Exercise

Implement these functions:

```jsx
function addItem(item) {
  // ...
}

function removeItem(id) {
  // ...
}

function updateQuantity(id, quantity) {
  // ...
}
```

Rules:

- use functional state updates;
- do not mutate state with `push`, `splice`, direct assignment, `sort`, or `reverse`;
- preserve unchanged item references;
- reject invalid quantities; and
- use stable IDs for object-array updates.

One acceptable quantity rule is to remove an item when the resulting quantity is `0` or less.

## Common Mistakes

### Mistake 1 — `push()` on state

```jsx
// ❌
items.push(newItem);
setItems(items);
```

Use:

```jsx
// ✅
setItems((current) => [...current, newItem]);
```

### Mistake 2 — Mutating a nested object

```jsx
// ❌
item.quantity += 1;
```

Use:

```jsx
// ✅
{ ...item, quantity: item.quantity + 1 }
```

### Mistake 3 — Mutating with `sort()` or `reverse()`

```jsx
// ❌
items.sort(compareItems);
```

Use:

```jsx
// ✅
[...items].sort(compareItems);
```

### Mistake 4 — Mutating with `splice()`

```jsx
// ❌
items.splice(index, 1);
```

Use `filter()` for deletion or copy the array first when implementing an operation such as reorder:

```jsx
const next = [...items];
next.splice(index, 1);
```

### Mistake 5 — Storing derived totals

```jsx
// ❌
const [totalPrice, setTotalPrice] = useState(0);
```

Prefer deriving it from `cart` when it is a deterministic calculation.

### Mistake 6 — Random keys

```jsx
// ❌
key={Math.random()}
```

Use a stable key tied to item identity.

## Debugging Challenge

Why is this unsafe?

```jsx
cart[0].quantity += 1;
setCart(cart);
```

### Expected reasoning

There are two mutation problems:

1. The object inside the array is changed directly.
2. The same array reference is passed back to the setter.

Fix it with a stable ID when one exists:

```jsx
setCart((current) =>
  current.map((item) =>
    item.id === firstItemId
      ? { ...item, quantity: item.quantity + 1 }
      : item
  )
);
```

An index can be used for a controlled exercise when there is no stable ID, but stable domain IDs are preferable for real collections.

## Assessment Quiz

1. **How do you add an item immutably?**
   - `[...current, item]`

2. **How do you remove matching items?**
   - `filter`

3. **How do you update one object in an array?**
   - `map` and copy the changed object.

4. **Why copy the object as well as the array?**
   - To avoid mutating the nested object referenced by the previous state.

5. **Why can `sort()` be dangerous?**
   - It mutates the array on which it is called.

6. **Are index keys always forbidden?**
   - No. They can be acceptable for static lists, but are risky when identity/order can change.

7. **Why should totals usually be derived?**
   - To avoid duplicate sources of truth.

8. **What does a functional state update provide?**
   - It explicitly receives the previous state value used to calculate the next state.

9. **Is `splice()` always forbidden in React code?**
   - No. It should not mutate the state array itself, but it can be used on a copied array for operations such as reordering.

10. **Why are unchanged object references usually preserved?**
    - It avoids unnecessary object creation and supports efficient reference-based comparisons.

## Task

Create a **Task Manager** with:

- Add task
- Toggle completion
- Delete task
- Edit task title
- Clear completed tasks
- Filter: All / Active / Completed
- Derived counts
- Empty state
- Stable IDs and keys

### Constraints

- No direct mutation.
- Use functional updates for state transitions based on previous state.
- Do not store filtered tasks as separate state.
- Do not store completed count as separate state.
- Do not use random keys.
- Use a stable task ID for updates and deletion.

### Extension Challenge

Add drag-and-drop-style reordering without a library first. Implement a `moveTask(fromIndex, toIndex)` helper that copies the array before using `splice`.

## Self Check

You should be able to explain without looking at the notes:

- [ ] Why array state should not be mutated.
- [ ] Why `map` is useful for updates.
- [ ] Why `filter` is useful for deletion.
- [ ] Why object spread is needed for changed array items.
- [ ] Why `sort()` and `reverse()` need special care.
- [ ] Why `splice()` is dangerous on the state array but valid on a copy.
- [ ] Why stable keys matter.
- [ ] Why derived values usually should not be stored.
- [ ] When an index key can be acceptable.
- [ ] When to use a stable domain ID.
- [ ] Why unchanged references can be preserved.

## Interview Questions and Answers

### Beginner

**Q: How do you add an item to an array in React state?**

Use a functional update and spread:

```jsx
setItems((current) => [...current, item]);
```

**Q: How do you remove an item?**

Use `filter` to create a new array without the item.

### Intermediate

**Q: How do you update one object inside an array?**

Use `map`, match a stable ID, and return a copied object for the changed item.

**Q: Why is `push()` usually wrong for state arrays?**

Because `push()` mutates the existing array instead of creating a new state value.

**Q: Why should `sort()` be handled carefully?**

Because native `sort()` mutates its receiver. Copy the array before sorting.

**Q: Is `splice()` forbidden?**

No. Mutating the state array directly is the problem. A copied array can be mutated locally for operations such as reordering.

### Advanced

**Q: Does React require deep cloning an array for every update?**

No. Copy the array and the nested objects along the path that actually changes. Unchanged objects can retain their references.

**Q: Why can index keys cause bugs?**

When list membership or order changes, an index can now refer to a different item. React may therefore preserve component state for the wrong logical item.

**Q: Why is storing `filteredItems` often unnecessary?**

If filtering is a deterministic projection of existing state and props, derive it during render. This keeps one source of truth.

**Q: Why should item identity and array position be treated separately?**

Position can change after insertion, deletion, or reordering. A stable domain ID identifies the logical item independently of its current position.

**Q: When might normalized state be useful?**

For complex collections with relationships or frequent targeted updates, separating records by ID and maintaining ordered IDs can simplify updates and reduce duplication.

**Q: When should array data be moved out of local component state?**

When the same collection must be shared across distant components, persisted, synchronized externally, or managed through complex transitions. The appropriate choice may then be lifted state, Context, `useReducer`, or an external store depending on the application.

## Day 11 Outcome

You can safely manage dynamic arrays in React, including immutable add/remove/update/reorder operations, nested object updates, sorting, stable list identity, derived values, debugging, and practical collection management.

You are ready for the next state-data pattern in the curriculum.