---
title: Reusable React Components
slug: day-005-reusable-components
dayLabel: Day 5
level: Beginner to Intermediate
estimatedMinutes: 75
order: 5
track: react
---
# Day 5: Reusable Components — From Simple Props to Component APIs

## Goal
Learn how to turn UI patterns into reusable components without creating either duplication or overly generic “god components”. You will learn props-driven APIs, defaults, `children`, composition, variants, callbacks, and how to decide when abstraction is appropriate.

## Prerequisites
- Day 4 completed
- Components, JSX, imports/exports understood
- Basic JavaScript objects and functions

## 1. The Reusability Mindset
Start with a real repeated pattern. If three screens have nearly identical cards, first identify what is fixed and what varies.

```jsx
function Badge({ text }) {
  return <span className="badge">{text}</span>;
}
```

```jsx
<Badge text="Active" />
<Badge text="Pending" />
<Badge text="Completed" />
```

The component's **props form its public API**. A good API exposes meaningful variation without leaking unnecessary implementation details.

## 2. Props and Default Values

```jsx
function Button({ label, variant = "primary", disabled = false }) {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled}>
      {label}
    </button>
  );
}
```

Default values apply when the prop is `undefined`. They do not replace an explicitly supplied `null`.

## 3. `children` and Composition
Use `children` when the wrapper controls layout but the caller controls inner content.

```jsx
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function App() {
  return (
    <Panel title="Announcement">
      <p>New React lesson is available.</p>
    </Panel>
  );
}
```

This is often better than adding props such as `paragraph`, `listItems`, `image`, `buttonText`, and `buttonUrl` for every possible child layout.

## 4. Variants Instead of Duplicate Components
Avoid:

```text
PrimaryButton.jsx
DangerButton.jsx
SuccessButton.jsx
```

when the differences are only visual. Prefer a clear variant API:

```jsx
function Button({ children, variant = "primary" }) {
  return <button className={`button button--${variant}`}>{children}</button>;
}
```

```jsx
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>
```

The component should validate or constrain variants in production-quality applications rather than accepting arbitrary strings blindly.

## 5. Flexible Content: Data Props vs `children`
Use a named prop when the value has a semantic meaning:

```jsx
<ProductCard title="Keyboard" price={1200} />
```

Use `children` when callers should control nested content:

```jsx
<Card>
  <ProductSummary />
  <BuyButton />
</Card>
```

The distinction helps keep component APIs understandable.

## 6. Callback Props
Reusable components often need to report user actions without owning the application's business state.

```jsx
function DeleteButton({ onDelete }) {
  return <button onClick={onDelete}>Delete</button>;
}

function App() {
  function handleDelete() {
    console.log("Delete requested");
  }

  return <DeleteButton onDelete={handleDelete} />;
}
```

Flow remains explicit:

```text
Parent owns decision/state
       ↓ callback prop
Child reports user action
       ↓
Parent handles action
```

## 7. Passing Data Through Reusable Components
A reusable list can receive data without knowing where it came from:

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

This makes the component compatible with local arrays, API responses, or state managed elsewhere—as long as the input contract is the same.

## 8. Avoiding Over-Abstraction
Not every duplicate-looking line needs a component.

A useful rule:

- duplicate UI with a meaningful shared contract → consider abstraction
- tiny one-off markup → keep it local
- abstraction requires many boolean props → reconsider the design
- abstraction hides important behavior → simplify it

### Warning sign

```jsx
<Button primary danger large rounded outlined iconOnly loading compact ... />
```

A component with many interacting boolean props may have too many responsibilities. Prefer a smaller API or composition.

## 9. Container and Presentational Thinking
This is a useful design model, not a mandatory React architecture.

```jsx
function ProductList({ products }) {
  return products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
}

function ProductCard({ product }) {
  return <article>{product.name}</article>;
}
```

The list coordinates collection rendering; the card focuses on presentation. In larger applications, data fetching may live elsewhere entirely.

## 10. Component API Design Checklist
Before publishing a reusable component, ask:

1. What is the minimum useful API?
2. Which props are required?
3. Which props are optional?
4. Should nested content use `children`?
5. Should events be callback props?
6. Are defaults sensible?
7. Can consumers understand the API without reading implementation?
8. Are there too many booleans or special cases?
9. Is the abstraction actually reused?
10. Can accessibility semantics be preserved?

## End-to-End Practical: Reusable Dashboard UI
Build:

```text
Dashboard
├── Button
├── StatCard
├── Panel
└── UserList
```

```jsx
function StatCard({ label, value, trend }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{trend}</span>
    </article>
  );
}

function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

Use the same components for users, sales, orders, and revenue. Then add a `Button` variant and callback.

## Hands-on Coding
### Challenge 1 — Product Card
Build a reusable card with `name`, `price`, `rating`, `image`, and `onAddToCart`.

### Challenge 2 — Flexible Panel
Build a `Panel` that accepts `title` and `children`.

### Challenge 3 — Button API
Support `primary`, `secondary`, and `danger` variants and a disabled state.

### Challenge 4 — Refactor
Start with three duplicated cards. Refactor them into one component. Explain which values became props and why.

### Challenge 5 — Design Review
Create a component with six props, then reduce it to the smallest sensible API. Explain every removed prop.

## Common Mistakes
- Creating a separate component for every tiny variation.
- Passing dozens of unrelated props.
- Using `children` when a semantic named prop is clearer.
- Using named props for every possible nested layout instead of composition.
- Making reusable components depend directly on a specific API response shape when a simpler contract is possible.
- Forgetting accessibility semantics while focusing only on visual reuse.

## Assessment Quiz
1. What makes a component reusable?
2. Why are props considered a component API?
3. When is `children` preferable to many named props?
4. What is a variant?
5. Why can too many boolean props be a design smell?
6. Should every repeated `<div>` become a component?
7. How does a callback prop preserve one-way data flow?
8. Why separate collection rendering from card presentation?

## Interview Questions
**Q: What is component reusability?**  A: Designing a component around a stable contract so it can render different data or content without duplicating implementation.

**Q: What is composition in React?** A: Combining components and nested content to build larger UI, commonly using `children` and component props.

**Q: When should you use `children`?** A: When the parent controls the wrapper/layout and the caller should control the nested content.

**Q: How do callback props work?** A: The parent supplies a function; the child invokes it to report an event or value, while the parent remains the owner of the resulting state/decision.

**Q: What is over-abstraction?** A: Introducing a generic abstraction whose complexity exceeds its reuse or value, making code harder to understand.

**Q: How do you design a reusable component API?** A: Start from real use cases, identify stable variation, minimize props, use composition where appropriate, preserve semantics/accessibility, and avoid speculative flexibility.

## Self Check
You are ready for Day 6 if you can build a reusable component with required/optional props, `children`, variants, and callback props, and can justify why an abstraction should or should not exist.

## Day 5 Outcome
You can design reusable component APIs rather than merely copy UI. Day 6 will take props to an advanced practical level.