---
title: Array State Handling
slug: day-011-array-state-handling
dayLabel: Day 11
level: Intermediate
estimatedMinutes: 75
order: 11
track: react
---
# Day 11: Array State Handling

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
- [Day 11 Outcome](#day-11-outcome)

## Goal

Learn how to safely add, remove, replace, update, sort, and derive information from array state without mutating existing state.

## Prerequisites

You should understand:

- `useState`
- functional state updates
- object state and object spread
- `.map()`, `.filter()`, and `.includes()`
- rendering lists with `.map()` and stable `key` values

## Explanation

An array stored in React state should be treated as an immutable value. React does not require that every update create a completely unrelated data structure, but the state value must not be mutated in place.

The core transformation patterns are:

```text
Add       → [...current, newItem]
Remove    → current.filter(...)
Update    → current.map(...)
Replace   → current.map(...)
Clear     → []
Sort      → [...current].sort(...)
```

The most important rule is:

> Create a new array for the update, and create new nested objects for the items whose data changes.

## Topic by Topic

### 1. Initialize Array State

```jsx
const [skills, setSkills] = useState(["HTML", "CSS"]);
```

### 2. Add Items

```jsx
setSkills((current) => [...current, "React"]);
```

The existing array is not modified; a new array is created.

### 3. Remove Items

```jsx
setSkills((current) =>
  current.filter((skill) => skill !== "CSS"),
);
```

`filter` returns a new array containing only the items that should remain.

### 4. Update One Item

For arrays of objects, use `map` and copy the changed object:

```jsx
setTasks((current) =>
  current.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  ),
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
    item.id === updated.id ? updated : item,
  ),
);
```

Use a stable domain identifier rather than an array position when records have meaningful IDs.

### 6. Clear an Array

```jsx
setItems([]);
```

### 7. Prevent Duplicates

```jsx
setSkills((current) => {
  const value = newSkill.trim();
  if (!value || current.includes(value)) return current;
  return [...current, value];
});
```

Returning `current` when nothing changes is valid and communicates that no state update is necessary.

For object arrays, duplicate detection should normally use a domain identifier or an explicit business rule rather than object reference equality.

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
      : item,
  ),
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
  [...current].sort((a, b) => a.name.localeCompare(b.name)),
);
```

The same principle applies to `reverse()` and other mutating array APIs.

### 10. Keys and Item Identity

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

### 11. Derived Values

Do not store values that can be calculated from the array unless there is a specific architectural reason to do so.

```jsx
const totalQuantity = cart.reduce(
  (total, item) => total + item.quantity,
  0,
);
```

This avoids creating two sources of truth:

```text
cart → source of truth
  ↓
reduce()
  ↓
totalQuantity → derived value
```

The same approach can be used for totals, counts, filtered results, and other deterministic projections.

## Key Concepts

| Operation | Preferred pattern | Why |
|---|---|---|
| Add | `[...current, item]` | New array |
| Remove | `filter` | New array without target |
| Update | `map` + object spread | New array + new changed object |
| Replace | `map` | Preserves stable identity for unchanged items |
| Clear | `[]` | Explicit new empty array |
| Sort | `[...current].sort()` | Avoids mutating state |
| Reverse | `[...current].reverse()` | Avoids mutating state |
| Derived total | `reduce()` | Avoids redundant state |

### Functional Updates

When the next array depends on the previous array, prefer:

```jsx
setItems((current) => [...current, newItem]);
```

This makes the dependency on the previous state explicit and avoids relying on a potentially stale render snapshot.

### Immutability Does Not Mean Deep-Cloning Everything

You do not need to deep-clone the entire array for every update. Copy the containers along the path that changes.

For example:

```jsx
setUsers((current) =>
  current.map((user) =>
    user.id === id
      ? { ...user, profile: { ...user.profile, city: "Delhi" } }
      : user,
  ),
);
```

Only the array, matching user, and changed nested profile are new references.

## Visual Concept Map

```text
                    Array State
                         |
          +--------------+--------------+
          |              |              |
         Add           Remove         Update
          |              |              |
       spread         filter       map + spread
          |              |              |
          +--------------+--------------+
                         |
                    New Array
                         |
             +-----------+-----------+
             |                       |
        Derived data            Render list
             |                       |
          reduce()                stable key
```

## End-to-End Practical

Build a **Shopping Cart Manager**.

### Requirements

- Add a product
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

### Derived totals

```jsx
const totalQuantity = cart.reduce(
  (total, item) => total + item.quantity,
  0,
);

const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);
```

### Acceptance Criteria

- Adding does not mutate the old cart.
- Quantity changes update only the matching item.
- Removing leaves all other items unchanged.
- Totals always reflect the current cart.
- No array index is used as the key for dynamic cart items.
- Sorting, if added, does not mutate the state array.

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

Implement `increaseQuantity(id)` and `decreaseQuantity(id)` without mutation.

## Mini Exercise

Implement these three functions:

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

- use functional state updates
- do not use `push`, `splice`, or direct assignment
- preserve unchanged item references
- reject invalid quantities

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

### Mistake 3 — Mutating with `sort()`

```jsx
// ❌
items.sort(compareItems);
```

Use:

```jsx
// ✅
[...items].sort(compareItems);
```

### Mistake 4 — Storing derived totals

```jsx
// ❌
const [totalPrice, setTotalPrice] = useState(0);
```

Prefer deriving it from `cart` when it is a deterministic calculation.

### Mistake 5 — Random keys

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

Fix it with:

```jsx
setCart((current) =>
  current.map((item, index) =>
    index === 0
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  ),
);
```

In production code, prefer a stable item ID instead of an index when one exists.

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
   - It explicitly receives the latest previous state value used to calculate the next state.

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

## Self Check

You should be able to explain without looking at the notes:

- [ ] Why array state should not be mutated
- [ ] Why `map` is useful for updates
- [ ] Why `filter` is useful for deletion
- [ ] Why object spread is needed for changed array items
- [ ] Why `sort()` needs special care
- [ ] Why stable keys matter
- [ ] Why derived values usually should not be stored
- [ ] When an index key can be acceptable
- [ ] When to use a stable domain ID

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

### Advanced

**Q: Does React require deep cloning an array for every update?**

No. Copy the array and the nested objects along the path that actually changes. Unchanged objects can retain their references.

**Q: Why can index keys cause bugs?**

When list membership or order changes, an index can now refer to a different item. React may therefore preserve component state for the wrong logical item.

**Q: Why is storing `filteredItems` often unnecessary?**

If filtering is a deterministic projection of existing state and props, derive it during render. This keeps one source of truth.

**Q: When might normalized state be useful?**

For complex collections with relationships or frequent targeted updates, separating records by ID and maintaining ordered IDs can simplify updates and reduce duplication.

## Day 11 Outcome

You can safely manage dynamic arrays in React, including immutable add/remove/update operations, nested object updates, sorting, stable list identity, derived values, debugging, and practical collection management.
