---
title: List Rendering
slug: day-016-list-rendering
dayLabel: Day 16
level: Beginner to Intermediate
estimatedMinutes: 90
order: 16
track: react
---
# Day 16 [Beginner → Intermediate]: List Rendering

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
- [Common Mistakes](#common-mistakes)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 16 Outcome](#day-16-outcome)

## Goal

Render dynamic collections correctly using `map`, stable keys, filtering, sorting, grouping, empty states, reusable item components, and derived data. Build the foundation for Day 17's deeper discussion of keys, identity, and reconciliation.

## Prerequisites

- JSX fundamentals
- Props
- `useState`
- Event handling
- Arrays and objects
- Immutable state updates
- Conditional rendering from Day 15

## Explanation

Real applications receive collections from APIs, databases, local state, or user input. React lets data drive the UI instead of requiring duplicated JSX for every item.

```text
Array data
   ↓
filter / transform / sort
   ↓
map
   ↓
React elements
   ↓
List UI
```

List rendering has two separate concerns:

1. **What UI should each item produce?**
2. **How should React identify that item across renders?**

The first concern is handled by mapping data into elements. The second is handled by keys.

## Topic by Topic

### 1. `map()` for UI

`map()` returns a new array containing the result for every source item.

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

The key belongs on the element returned directly by `map` at the list boundary.

### 2. `map()` vs `forEach()`

`map()` transforms a collection and returns a new array:

```js
const names = users.map((user) => user.name);
```

`forEach()` returns `undefined`, so it is not the normal method for producing a JSX collection.

### 3. Rendering Components from Data

```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

The list component owns iteration. The item component can own presentation and item-level interactions.

### 4. Keys: First Principles

A key gives React stable identity for a sibling item across renders.

Good keys are:

- unique among siblings
- stable across renders
- tied to the item's logical identity
- available from the data rather than generated during rendering

```jsx
{users.map((user) => (
  <UserCard key={user.id} user={user} />
))}
```

A key is not automatically available as a normal child prop:

```jsx
<UserCard key={user.id} userId={user.id} user={user} />
```

If the child needs the ID, pass it explicitly.

**Important:** keys are about React identity, not about making data unique. A key must be unique among the relevant siblings, but it should also represent the correct logical item. If your backend contains duplicate or missing IDs, fix the data model or create a stable domain-specific identifier; do not generate a random key on every render.

### 5. Key Scope

Keys need to be unique among siblings in the same list. Nested lists have separate sibling scopes.

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

A member ID only needs to be unique within that team's member list.

### 6. Empty Collections

A blank screen is usually poor UX.

```jsx
function ProductList({ products = [] }) {
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

For data-driven screens, distinguish empty, loading, and error states. An empty collection is not necessarily an API failure.

### 7. Filtering Before Mapping

```jsx
const activeUsers = users.filter((user) => user.active);

return activeUsers.map((user) => (
  <UserCard key={user.id} user={user} />
));
```

`filter()` does not mutate the original array.

For simple logic, chaining is also fine:

```jsx
users
  .filter((user) => user.active)
  .map((user) => <UserCard key={user.id} user={user} />);
```

For complex logic, prefer a named derived variable.

### 8. Sorting Without Mutation

`sort()` mutates the array it is called on. Never directly sort a state array.

```jsx
const sortedUsers = [...users].sort((a, b) =>
  a.name.localeCompare(b.name)
);
```

Modern JavaScript also provides `toSorted()` in supported runtimes:

```js
const sortedUsers = users.toSorted((a, b) =>
  a.name.localeCompare(b.name)
);
```

The important rule is that the source state must remain unchanged. If runtime/browser support is uncertain, use the spread-and-`sort()` form or verify your target environment before using `toSorted()`.

### 9. Search + Filter + Sort

```jsx
const normalizedQuery = query.trim().toLowerCase();

const visibleUsers = users
  .filter((user) => user.active)
  .filter((user) => user.name.toLowerCase().includes(normalizedQuery))
  .toSorted((a, b) => a.name.localeCompare(b.name));
```

This is derived data. Usually, do not store `visibleUsers` separately in state when it can be calculated from source state and filter criteria.

### 10. Derived Data vs State

Prefer:

```jsx
const completedTasks = tasks.filter((task) => task.completed);
```

instead of maintaining another state value for `completedTasks` that can become stale.

Store the **source of truth**. Derive views from it. If derivation becomes genuinely expensive, optimize the calculation after measuring rather than duplicating state merely for convenience.

### 11. Nested Lists

Each nested collection has its own key boundary.

```jsx
{categories.map((category) => (
  <section key={category.id}>
    <h2>{category.name}</h2>
    {category.products.map((product) => (
      <p key={product.id}>{product.name}</p>
    ))}
  </section>
))}
```

### 12. Conditional Lists

Guard clauses make collection states readable:

```jsx
function SearchResults({ query, results = [] }) {
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

### 13. Index Keys: The Nuanced Rule

Avoid index keys when list identity can change through insertion, deletion, filtering, or reordering:

```jsx
items.map((item, index) => <Row key={index} item={item} />)
```

For a truly static collection whose order and membership never change, an index key can be acceptable. The goal is stable identity that matches the data semantics, not an absolute rule of never using indexes.

A useful test is: **if the item moves to another position, should its local component state and DOM identity move with the item?** If yes, use a stable item ID instead of the index.

### 14. Random Keys Are Worse

Do not do this:

```jsx
items.map((item) => <Row key={Math.random()} item={item} />)
```

A new key on every render makes React treat items as new identities, which can destroy local component state, remount effects, lose focus, and cause unnecessary work.

### 15. Reusable List Components

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

Keep collection responsibilities in the list component and one-item responsibilities in the item component. Keep the key at the list boundary even when the item UI is extracted.

### 16. Large Lists and Performance

For very large collections, rendering thousands of DOM nodes can become expensive. First use correct data flow and stable keys. If the dataset is genuinely large, consider pagination, incremental loading, or virtualization.

Do not add memoization or virtualization automatically; measure the real bottleneck first. Stable keys improve correctness and identity handling, but **keys do not by themselves make a large list fast**.

## Key Concepts

| Concept | Rule |
|---|---|
| `map()` | Transform each item into UI |
| `forEach()` | Side-effect iteration; not normal JSX mapping |
| Key | Stable sibling identity |
| Domain ID | Preferred key source |
| Index key | Acceptable mainly for truly static lists |
| Random key | Avoid; identity changes every render |
| `filter()` | Creates a derived subset |
| `sort()` | Mutates; copy first |
| `toSorted()` | Non-mutating sort where supported |
| Derived data | Calculate from source state |
| Empty state | Explicitly communicate no items |
| Key scope | Unique among the current siblings, not globally |

## Visual Concept Map

```text
                    Collection
                        |
             +----------+----------+
             |                     |
        transform data        preserve identity
             |                     |
     filter / search / sort       key
             |                     |
             +----------+----------+
                        |
                       map
                        |
                Reusable item UI
                        |
               empty / error / load
```

## End-to-End Practical

### Employee Directory

Build an Employee Directory with:

- source employee data
- reusable `EmployeeCard`
- search by name
- active/inactive filter
- alphabetical sorting
- empty state
- no-results state
- stable domain keys
- nested skills list

```jsx
const employees = [
  { id: 1, name: "Asha", role: "Recruiter", active: true, skills: ["Hiring", "Communication"] },
  { id: 2, name: "Ravi", role: "Designer", active: false, skills: ["Figma", "UX"] },
  { id: 3, name: "Nina", role: "Developer", active: true, skills: ["React", "TypeScript"] },
];

function EmployeeCard({ employee }) {
  return (
    <article>
      <h2>{employee.name}</h2>
      <p>{employee.role}</p>
      <p>{employee.active ? "Active" : "Inactive"}</p>
      <ul>
        {employee.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </article>
  );
}

function EmployeeList({ employees = [] }) {
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <section>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </section>
  );
}
```

If skills can repeat, use a stable skill ID instead of `key={skill}`. A displayed label is only a good key when it is stable and unique within that sibling list.

## Hands-on Coding

### Challenge 1 — Student Directory

Render students with name, course, and score. Add a filter for scores above 70.

### Challenge 2 — Product Search

Add search, category filtering, and alphabetical sorting without mutating the source array.

### Challenge 3 — Nested Categories

Render categories containing products. Give each category and each product an appropriate stable key.

### Challenge 4 — Empty vs No Results

Display different messages for:

- no source items
- active filters with no matches
- successful results

### Challenge 5 — Key Debugging

Create a list with an editable input per item. Reorder the list and observe the difference between stable domain keys and index keys.

### Challenge 6 — Derived Data

Build a filtered/sorted list from one source array and search state. Verify that changing the source data automatically changes the derived result without a second `visibleItems` state variable.

## Mini Exercise

Given:

```jsx
const tasks = [
  { id: 1, title: "Learn React", completed: true },
  { id: 2, title: "Build app", completed: false },
];
```

Render:

1. all tasks
2. only completed tasks
3. task titles alphabetically
4. a useful empty message

Do not mutate `tasks` and use `task.id` as the key.

## Common Mistakes

### Mistake 1 — Missing key

Dynamic sibling elements need an appropriate stable key.

### Mistake 2 — Random key

`Math.random()` creates a new identity every render.

### Mistake 3 — Wrong key

Prefer a domain identifier over array position when identity can change.

### Mistake 4 — Mutating with `sort()`

Use `[...items].sort(...)` or `toSorted()` where supported.

### Mistake 5 — Storing derived lists unnecessarily

Keep the source of truth and derive filtered/sorted views.

### Mistake 6 — Missing collection states

Distinguish loading, error, empty, filtered-empty, and success when the UI needs them.

### Mistake 7 — Key on the wrong element

The key belongs at the element returned by the `map()` call, not inside the child component after the boundary has already been created.

### Mistake 8 — Using index keys without understanding identity

Index keys can attach component state to the wrong item after reorder/insert/delete.

### Mistake 9 — Duplicate or unstable IDs

A database ID should be unique and stable within the relevant collection. If IDs are missing or duplicated, fix the identity source rather than generating a random key during render.

### Mistake 10 — Confusing key correctness with performance

A good key helps React preserve identity; it does not replace pagination, virtualization, or measured performance work for huge lists.

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
10. Why should random keys be avoided?
11. When should virtualization be considered?
12. What should you do if backend IDs are missing or duplicated?
13. Do stable keys by themselves solve large-list performance problems?

### Answers

1. It transforms each item into an array of React elements.
2. `forEach()` returns `undefined` rather than the transformed array.
3. It is stable and unique among siblings and represents the item's identity.
4. `sort()` mutates the array it receives.
5. Position can change while logical identity stays the same.
6. No. It can be reasonable for a truly static collection.
7. No. Pass the value explicitly if the child needs it.
8. It avoids duplicated state that can become inconsistent.
9. Each sibling collection has its own key scope.
10. A random key changes identity on every render and can force remounts.
11. When very large collections make DOM rendering a measured performance bottleneck.
12. Fix or establish a stable domain-specific identity; do not generate a new random key on each render.
13. No. Keys address identity/correctness. Large-list performance may still require pagination, incremental loading, or virtualization.

## Task

Build the **Employee Directory** end-to-end.

### Acceptance Criteria

- [ ] Data drives the UI.
- [ ] `map()` is used correctly.
- [ ] Every dynamic sibling has an appropriate stable key.
- [ ] Index is not used when list identity can change.
- [ ] Random keys are not used.
- [ ] `sort()` does not mutate source state.
- [ ] Search/filter results are derived.
- [ ] Empty and no-results states are distinct.
- [ ] Item UI is separated into a reusable component.
- [ ] Nested skills are rendered with their own appropriate keys.
- [ ] Duplicate/missing item IDs are handled by fixing the data identity strategy.
- [ ] Large-list optimization is considered only when justified by measurement.

## Self Check

- [ ] I can use `map()` to render a collection.
- [ ] I understand why `forEach()` is not the normal JSX mapping method.
- [ ] I can choose a stable domain key.
- [ ] I understand why index keys can fail after reordering.
- [ ] I know why random keys are harmful.
- [ ] I can filter/search/sort without mutating source state.
- [ ] I can identify derived data.
- [ ] I can build empty and filtered-empty states.
- [ ] I can render nested lists with correct key scopes.
- [ ] I know when virtualization may be useful.
- [ ] I can explain that keys are about identity, not global uniqueness or performance.

## Interview Questions and Answers

### Beginner

**Q: Why does React need keys?**  
Keys help React identify which sibling items represent the same logical item across renders.

**Q: Why is `map()` commonly used for rendering lists?**  
It returns a transformed array, making it natural to convert data items into React elements.

### Intermediate

**Q: Why shouldn't you use `Math.random()` as a key?**  
It changes on every render, so React cannot preserve stable identity and may remount components.

**Q: Why can index keys be problematic?**  
After insertion, deletion, filtering, or reordering, the same index can refer to a different logical item, potentially associating child state with the wrong item.

**Q: Should filtered data be stored in state?**  
Usually no. If source data and filter criteria are already state, the visible list is derived.

**Q: Is a key available through `props.key`?**  
No. `key` is a special React property. Pass an ID explicitly if the child needs it.

### Advanced

**Q: Explain key scope in nested lists.**  
Keys need to be unique only among the siblings of the collection being reconciled. Nested collections have independent sibling scopes.

**Q: Why does mutating an array with `sort()` violate React state practices?**  
It changes the existing state value rather than producing a new value, which breaks immutable-update expectations and makes state changes harder to reason about.

**Q: What happens when a key changes?**  
React treats the element as a different identity. The old component can unmount and a new component can mount, so local state and effects are not preserved as if it were the same item.

**Q: When should you use virtualization?**  
When a very large list creates a measured rendering/DOM performance problem. It should be a targeted optimization rather than a default requirement.

**Q: What makes a key semantically good, not merely unique?**  
It should identify the same logical item even when its position changes. A position-based or render-generated value can be unique but still represent the wrong identity.

## Day 16 Outcome

You can now build data-driven React lists with correct identity, immutable transformations, reusable item components, derived views, and realistic collection states. You understand `map()` versus `forEach()`, stable keys, key scope, index-key limitations, random-key problems, non-mutating sorting, and large-list performance trade-offs.

Day 17 will go deeper into **keys, identity, and reconciliation**, including how changing a key can cause a component to remount and reset its local state.
