---
title: Conditional Rendering
slug: day-015-conditional-rendering
dayLabel: Day 15
level: Beginner to Intermediate
estimatedMinutes: 60
order: 15
track: react
---
# Day 15 [Beginner → Intermediate]: Conditional Rendering

## Goal

Learn how to model UI states clearly using JavaScript conditions, ternaries, logical operators, guard clauses, state machines, and reusable status components.

## Why It Matters

Real applications rarely have only a single "success" screen. A page may be loading, failed, empty, unauthorized, partially complete, or ready. Conditional rendering turns those states into explicit UI.

## Mental Model

```text
Application state
      ↓
Choose the valid UI branch
      ↓
Render that branch
      ↓
User understands current state
```

## 1. `if` and Early Returns

Use `if` when the branch represents a substantial part of the component.

```jsx
function Profile({ user }) {
  if (!user) return <p>Please sign in.</p>;
  return <h1>Welcome, {user.name}</h1>;
}
```

Early returns are often clearer than deeply nested JSX.

## 2. Ternary Operator

Use a ternary for a concise two-way choice.

```jsx
<button type="button">
  {isSaved ? "Saved" : "Save"}
</button>
```

Avoid nested ternaries that require the reader to mentally decode multiple branches.

## 3. Logical AND (`&&`)

Use `&&` when there is an optional branch and no alternative UI.

```jsx
{unreadCount > 0 && <span>{unreadCount} unread</span>}
```

### Important falsy-value pitfall

JavaScript returns the left operand when it is falsy. React can render some values such as `0`, so this can be surprising:

```jsx
{count && <Badge />}
```

If `count` is `0`, the expression evaluates to `0`.

Prefer:

```jsx
{count > 0 && <Badge />}
```

or an explicit ternary when appropriate.

## 4. `null` Means Render Nothing

A component can intentionally return `null` when it should render no UI.

```jsx
function AdminButton({ canDelete }) {
  if (!canDelete) return null;
  return <button type="button">Delete</button>;
}
```

This is useful for optional UI, but permission checks in the UI are not security controls.

## 5. Loading, Error, Empty, Success

A robust data-driven component should distinguish these states.

```jsx
function ProductState({ loading, error, products }) {
  if (loading) return <p>Loading products…</p>;
  if (error) return <p role="alert">Unable to load products.</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return <ProductList products={products} />;
}
```

The exact priority depends on the domain. Do not blindly apply `loading → error → empty` when the application needs a different state model.

## 6. Authentication vs Authorization

These concepts should not be confused.

- **Authentication:** Who is the user?
- **Authorization:** What is the user allowed to do?

```jsx
{user?.role === "admin" && <AdminPanel />}
```

This controls what the current browser displays. The backend must independently enforce authorization for protected operations.

## 7. Multiple Conditions

Prefer a readable state model over a giant expression.

```jsx
function CheckoutStatus({ status }) {
  if (status === "loading") return <p>Processing…</p>;
  if (status === "success") return <p>Order placed.</p>;
  if (status === "error") return <p>Payment failed.</p>;
  return <p>Ready for payment.</p>;
}
```

If the number of states grows, consider representing the state explicitly rather than creating many unrelated booleans.

## 8. Boolean Explosion

This can become difficult to reason about:

```js
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);
```

Impossible combinations can occur, such as `loading === true` and `success === true`.

For a simple component, a single status can be clearer:

```js
const [status, setStatus] = useState("idle");
// idle | loading | success | error
```

This is a lightweight state-machine mindset.

## 9. Conditional Attributes and Styles

Conditions can affect props too.

```jsx
<button
  type="button"
  disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? "Saving…" : "Save"}
</button>
```

Prefer semantic HTML and native attributes over custom visual-only behavior.

## 10. Conditional Component Composition

Instead of putting every branch inside one large component, extract meaningful states:

```jsx
function Dashboard({ status }) {
  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState />;
  return <DashboardContent />;
}
```

This makes each state easier to test and maintain.

## Complete Practical Example

```jsx
import { useState } from "react";

function Dashboard() {
  const [status, setStatus] = useState("idle");
  const [role, setRole] = useState("user");

  function simulateLoad() {
    setStatus("loading");
    setTimeout(() => setStatus("success"), 800);
  }

  if (status === "loading") {
    return <p aria-live="polite">Loading dashboard…</p>;
  }

  if (status === "error") {
    return <p role="alert">Could not load dashboard.</p>;
  }

  if (status === "success") {
    return (
      <section>
        <h1>Dashboard</h1>
        {role === "admin" && <button type="button">Manage Users</button>}
        <button type="button" onClick={() => setStatus("idle")}>
          Reset
        </button>
      </section>
    );
  }

  return (
    <section>
      <p>Ready to load.</p>
      <button type="button" onClick={simulateLoad}>Load</button>
      <button type="button" onClick={() => setRole("admin")}>Become Admin (demo)</button>
    </section>
  );
}
```

## Common Mistakes

### Mistake 1: Nested ternaries

Replace unreadable nested expressions with variables, helper components, or guard clauses.

### Mistake 2: `count && ...`

If `count` can be `0`, use `count > 0 && ...`.

### Mistake 3: UI authorization as security

Hiding a Delete button does not secure the Delete API. The server must authorize the operation.

### Mistake 4: Conflicting booleans

Prefer a single status when states are mutually exclusive.

### Mistake 5: Overusing conditional CSS

Use semantic attributes such as `disabled`, `hidden` where appropriate, and accessible structure instead of visually hiding important state without communicating it.

## Hands-on Challenges

### Challenge 1 — Course Dashboard

Model `idle`, `loading`, `error`, `empty`, and `success` states and render a distinct UI for each.

### Challenge 2 — Permission Matrix

Create `viewer`, `editor`, and `admin` roles. Show different actions for each role and explain why the UI is not a security boundary.

### Challenge 3 — Refactor Boolean Explosion

Start with three booleans (`isLoading`, `hasError`, `hasData`) and refactor to a single status model.

### Challenge 4 — Accessibility

Add `role="alert"` for errors and `aria-live="polite"` for status changes where appropriate.

## Assessment Quiz

1. When is a ternary appropriate?
2. What happens with `{count && <Badge />}` when count is `0`?
3. What does returning `null` do?
4. Why can multiple booleans create impossible states?
5. What is the difference between authentication and authorization?
6. Why is conditional UI not a security boundary?
7. When should a branch become a separate component?

**Answers:**

1. A concise two-way UI choice.
2. The expression evaluates to `0`, which React can render.
3. The component renders no UI.
4. Independent booleans can represent contradictory combinations.
5. Authentication identifies the user; authorization determines allowed actions.
6. Users can bypass browser UI and call APIs directly.
7. When the branch has meaningful complexity, repeated use, or an independent responsibility.

## Interview Questions

**How does React perform conditional rendering?**  
React uses ordinary JavaScript expressions and control flow such as `if`, ternary, `&&`, and explicit returns to decide which elements are produced.

**When would you avoid a ternary?**  
When the expression becomes nested, lengthy, or contains business logic that is easier to understand in a guard clause or separate component.

**Why can `&&` be dangerous with numbers?**  
A falsy numeric `0` is returned by the JavaScript expression and may appear in the UI. Use an explicit boolean condition such as `count > 0`.

**How would you model API UI state?**  
Start with explicit mutually exclusive states such as idle/loading/success/error, then add domain-specific states like empty or unauthorized when necessary.

## Final Task

Build a **Course Dashboard** with:

- login/logout state
- loading state
- error state
- empty lessons state
- success state
- role-based actions
- retry action
- accessible status/error messaging

### Acceptance Criteria

- [ ] Branches are readable.
- [ ] No unnecessary nested ternaries.
- [ ] Numeric `&&` pitfall is avoided.
- [ ] Mutually exclusive states use a clear model.
- [ ] Role checks are explicitly described as UI behavior, not security.
- [ ] Loading/error states are accessible.

## Day 15 Outcome

You can now model real UI state instead of merely showing/hiding elements. This prepares you for Day 16, where the same state-driven thinking will be applied to dynamic collections.