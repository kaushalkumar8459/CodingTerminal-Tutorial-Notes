---
title: List Rendering
slug: day-016-list-rendering
dayLabel: Day 16
level: Beginner to Intermediate
estimatedMinutes: 60
order: 16
track: react
---
# Day 16 [Beginner → Intermediate]: List Rendering

## Goal

Render dynamic collections correctly using `map`, stable keys, filtering, sorting, grouping, empty states, reusable item components, and derived data. Learn how list rendering prepares the foundation for Day 17's deeper reconciliation and key-identity discussion.

## Why List Rendering Matters

Real applications receive collections from APIs, databases, local state, or user input. Copy-pasting JSX for every item does not scale. React lets the data drive the UI:

```text
Array data
   ↓
transform/filter/sort
   ↓
map
   ↓
React elements
   ↓
List UI
```

## 1. `map()` for UI

JavaScript's `map()` returns a new array containing the result of a callback for every source item.

```jsx
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
];

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

The key is placed on the **element returned by `map` at the list boundary**.

## 2. Map vs `forEach`

`map()` is useful because it returns a transformed array.

```js
const names = users.map((user) => user.name);
```

`forEach()` returns `undefined`, so it is not the normal choice for producing JSX lists.

## 3. Rendering Different Shapes

A collection can produce cards, table rows, navigation links, menu items, or custom components.

```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

The parent owns the collection; `ProductCard` can own the presentation of one item.

## 4. Keys: First Principles

A key gives React stable identity for a sibling item across renders.

```jsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}
```

Good keys are:

- unique among siblings
- stable across renders
- tied to the item's identity

A key is **not automatically available as a normal component prop**. If the child needs the ID, pass it explicitly:

```jsx
<UserCard key={user.id} userId={user.id} user={user} />
```

A deeper treatment of keys and reconciliation comes on Day 17.

## 5. Empty Collections

Do not leave users with a blank page when a collection is empty.

```jsx
function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

For data-driven screens, distinguish **empty** from **loading** and **error**. They are different states.

## 6. Filtering Before Mapping

```jsx
const activeUsers = users.filter((user) => user.active);

return activeUsers.map((user) => (
  <UserCard key={user.id} user={user} />
));
```

This does not mutate the original array.

You can also chain operations:

```jsx
users
  .filter((user) => user.active)
  .map((user) => <UserCard key={user.id} user={user} />);
```

For complex logic, a named derived variable is often easier to read and debug.

## 7. Sorting Without Mutation

`sort()` mutates the array it is called on. Never sort a state array directly.

```jsx
const sortedUsers = [...users].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

The spread creates a new array before sorting.

## 8. Search + Filter + Sort

```jsx
const visibleUsers = [...users]
  .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
  .filter((user) => user.active)
  .sort((a, b) => a.name.localeCompare(b.name));
```

This is **derived data**. Do not create another state variable just to store `visibleUsers` unless there is a specific need.

## 9. Nested Lists

Sometimes each item contains its own collection.

```jsx
{teams.map((team) => (
  <section key={team.id}>
    <h2>{team.name}</h2>
    <ul>
      {team.members.map((member) => (
        <li key={member.id}>{member.name}</li>
      ))}
    </ul>
  </section>
))}
```

Each sibling list has its own key scope. A member key only needs to be unique among that team's member siblings.

## 10. Conditional Lists

Avoid returning malformed markup when conditions become complicated.

```jsx
function SearchResults({ query, results }) {
  if (!query.trim()) return <p>Enter a search term.</p>;
  if (results.length === 0) return <p>No results found.</p>;

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  );
}
```

Guard clauses can make collection states much clearer.

## 11. Index Keys: The Nuanced Rule

Avoid index keys when list identity can change because of insertion, deletion, or reordering:

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

For a truly static collection whose order never changes, an index key can be acceptable. The goal is not "never use index"; the goal is **stable identity that matches the data's semantics**.

## 12. Reusable List Components

```jsx
function ProductList({ products, onSelect }) {
  return (
    <ul>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}
```

The list component owns collection iteration. The item component owns one item's UI.

## Complete Practical: Employee Directory

```jsx
const employees = [
  { id: 1, name: "Asha", role: "Recruiter", active: true },
  { id: 2, name: "Ravi", role: "Designer", active: false },
  { id: 3, name: "Nina", role: "Developer", active: true },
];

function EmployeeList({ employees }) {
  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <ul>
      {employees.map((employee) => (
        <li key={employee.id}>
          <strong>{employee.name}</strong> — {employee.role}
          {employee.active ? " (Active)" : " (Inactive)"}
        </li>
      ))}
    </ul>
  );
}
```

## Common Mistakes

### Mistake 1: Forgetting a key

React needs a stable key for dynamically rendered sibling elements.

### Mistake 2: Using a random key

Do not generate a new random key on every render. That destroys stable identity.

### Mistake 3: Using the wrong key

A key based on array position can be wrong when items reorder. Prefer a domain ID.

### Mistake 4: Mutating state with `sort()`

Use `[...items].sort(...)` instead.

### Mistake 5: Storing derived lists unnecessarily

Prefer calculating filtered/sorted views from source state.

### Mistake 6: Missing empty/loading/error states

A collection UI should communicate why there are no visible items.

### Mistake 7: Putting the key on the wrong component

The key belongs where the array is being mapped. If the map returns `<Card />`, put `key` on `<Card />`, not inside `Card`.

## Hands-on Challenges

### Challenge 1 — Student Directory

Render students with name, course, and score. Add a filter for scores above 70.

### Challenge 2 — Product Search

Add search, category filtering, and alphabetical sorting. Keep the source array unchanged.

### Challenge 3 — Nested Categories

Render categories containing products. Each category and each product must have a stable key.

### Challenge 4 — Empty/Filtered State

Display different messages for:

- no source items
- active filters with no matches
- successful results

## Assessment Quiz

1. Why is `map()` commonly used for React lists?
2. Why is `forEach()` not the normal JSX list method?
3. What makes a good key?
4. Why does `sort()` require care with state arrays?
5. Why can index keys be problematic?
6. Is an index key always invalid?
7. Is a key passed to a child as a normal prop?
8. Why should filtered data usually be derived?
9. How are keys scoped in nested lists?

**Answers:**

1. It transforms each item into an element and returns a new array.
2. It does not return the transformed array.
3. Stable identity and uniqueness among siblings.
4. `sort()` mutates the array.
5. Item identity can become associated with the wrong position after reordering/insertion/removal.
6. No; it can be acceptable for truly static collections.
7. No. Pass the value separately if the child needs it.
8. It avoids duplicated state that can become inconsistent with the source.
9. Each sibling collection has its own key scope.

## Interview Questions

**Why does React need keys?**  
Keys help React identify which sibling items represent the same logical item across renders.

**Why shouldn't you use `Math.random()` as a key?**  
It changes on every render, so React cannot preserve stable identity for the item.

**Why does `sort()` cause a React state bug?**  
`sort()` mutates the existing array. Mutating state directly can produce unpredictable updates and violates immutable state-update practices.

**Should filtering be stored in state?**  
Usually no. If the filter criteria and source data are already state, the visible collection is derived.

**When would virtualization matter?**  
When rendering very large collections makes DOM creation and layout expensive. Virtualization renders only the visible portion.

## Final Task

Build an **Employee Directory** with:

- 10+ employees
- reusable `EmployeeCard`
- search
- active/inactive filter
- name sorting
- empty state
- no-results state
- stable domain keys
- nested skills list

### Acceptance Criteria

- [ ] Data drives the UI.
- [ ] `map()` is used correctly.
- [ ] Every dynamic sibling has an appropriate stable key.
- [ ] Index is not used as key when identity can change.
- [ ] `sort()` does not mutate source state.
- [ ] Search/filter results are derived.
- [ ] Empty and no-results states are distinct.
- [ ] Item UI is separated into a reusable component.

## Day 16 Outcome

You can now build data-driven React lists with correct identity, immutable transformations, reusable item components, and realistic empty/filter states. Day 17 will go deeper into **keys, identity, and reconciliation**, including why changing a key can cause a component to remount.