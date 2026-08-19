---
title: Conditional Rendering
slug: day-015-conditional-rendering
dayLabel: Day 15
level: Beginner to Intermediate
estimatedMinutes: 75
order: 15
track: react
---
# Day 15 [Beginner → Intermediate]: Conditional Rendering

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
- [Debugging Challenge](#debugging-challenge)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Self Check](#self-check)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Day 15 Outcome](#day-15-outcome)

## Goal

Learn how to model UI states clearly using JavaScript conditions, ternaries, logical operators, guard clauses, explicit status models, and reusable status components.

## Prerequisites

- JSX fundamentals
- props
- `useState`
- event handling and forms
- arrays and objects in state
- basic component composition

## Explanation

Conditional rendering means deciding which React elements should be produced for the current state or props.

```text
Application state
      ↓
Choose the valid UI branch
      ↓
Render that branch
      ↓
User understands current state
```

Real applications commonly have idle, loading, error, empty, unauthorized, and success states. Good conditional rendering makes those states explicit instead of hiding business logic inside complicated JSX.

A useful rule is: **choose the simplest JavaScript construct that keeps the branch obvious**. `if` is usually best for substantial branches, a ternary for a small two-way choice, and `&&` for an optional branch with no alternative UI.

## Topic by Topic

### 1. `if` and Early Returns

Use `if` when the branch represents a substantial part of a component.

```jsx
function Profile({ user }) {
  if (!user) return <p>Please sign in.</p>;
  return <h1>Welcome, {user.name}</h1>;
}
```

Early returns are often clearer than deeply nested JSX.

### 2. Ternary Operator

Use a ternary for a concise two-way choice.

```jsx
<button type="button">
  {isSaved ? "Saved" : "Save"}
</button>
```

Avoid nested ternaries that require the reader to mentally decode multiple branches.

### 3. Logical AND (`&&`)

Use `&&` when there is an optional branch and no alternative UI.

```jsx
{unreadCount > 0 && <span>{unreadCount} unread</span>}
```

#### Falsy-value pitfall

JavaScript returns the left operand when it is falsy. React can render `0`, so this can be surprising:

```jsx
{count && <Badge />}
```

If `count` is `0`, the expression evaluates to `0`.

Prefer:

```jsx
{count > 0 && <Badge />}
```

Do not blindly apply `!!count && ...` when the business rule is specifically `count > 0`; an explicit condition communicates intent better.

### 4. `null` Means Render Nothing

A component can intentionally return `null` when it should render no UI.

```jsx
function AdminButton({ canDelete }) {
  if (!canDelete) return null;
  return <button type="button">Delete</button>;
}
```

A UI permission check is not a security boundary; protected operations still require server-side authorization.

### 5. Loading, Error, Empty, Success

A robust data-driven component should distinguish these states.

```jsx
function ProductState({ status, products, error }) {
  if (status === "loading") {
    return <p aria-live="polite">Loading products…</p>;
  }

  if (status === "error") {
    return <p role="alert">{error ?? "Unable to load products."}</p>;
  }

  if (status === "success" && products.length === 0) {
    return <p>No products found.</p>;
  }

  if (status === "success") {
    return <ProductList products={products} />;
  }

  return <p>Ready to load products.</p>;
}
```

The exact state model depends on the domain. If `products` is unavailable before a successful load, model that explicitly rather than relying on `products.length` to exist in every state.

### 6. Authentication vs Authorization

- **Authentication:** Who is the user?
- **Authorization:** What is the user allowed to do?

```jsx
{user?.role === "admin" && <AdminPanel />}
```

This controls what the browser displays. The backend must independently enforce authorization for protected operations.

### 7. Multiple Conditions

Prefer a readable state model over a giant expression.

```jsx
function CheckoutStatus({ status }) {
  if (status === "loading") return <p>Processing…</p>;
  if (status === "success") return <p>Order placed.</p>;
  if (status === "error") return <p>Payment failed.</p>;
  return <p>Ready for payment.</p>;
}
```

For an externally controlled status, consider handling unknown values explicitly rather than silently treating every unknown value as `idle`.

### 8. Boolean Explosion

This can become difficult to reason about:

```js
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [success, setSuccess] = useState(false);
```

Impossible combinations can occur, such as loading and success both being true.

For a simple component, a single status can be clearer:

```js
const [status, setStatus] = useState("idle");
// idle | loading | success | error
```

This is a lightweight state-machine mindset. It does not mean every UI needs a formal state-machine library.

### 9. Conditional Attributes and Styles

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

Prefer semantic HTML and native attributes over visual-only behavior.

### 10. Conditional Component Composition

Extract meaningful states instead of putting every branch inside one large component.

```jsx
function Dashboard({ status }) {
  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState />;
  if (status === "success") return <DashboardContent />;
  return <p>Ready to load dashboard.</p>;
}
```

A separate component is especially useful when a branch has its own responsibility, accessibility behavior, or reuse potential.

### 11. Optional Chaining and Nullish Values

Conditional rendering often deals with data that may not exist yet.

```jsx
<p>{user?.profile?.displayName ?? "Guest"}</p>
```

`?.` safely stops property access when an intermediate value is `null` or `undefined`. `??` provides a fallback only for `null` or `undefined`, unlike `||`, which also treats values such as `0` and `""` as absent.

Use the operator that matches the business rule rather than using fallbacks mechanically.

## Key Concepts

| Technique | Best fit |
|---|---|
| `if` / guard clause | Large or early-exit branches |
| Ternary | Simple two-way choice |
| `&&` | Optional UI branch with no alternative |
| `null` | Intentionally render nothing |
| Explicit status | Mutually exclusive UI states |
| Separate component | Complex/reusable branch |
| `?.` / `??` | Optional data and intentional fallbacks |

## Visual Concept Map

```text
                 UI State
                    |
       +------------+------------+
       |            |            |
    simple       multiple      collection
       |            |            |
 ternary / &&   status model   empty/loading/error
       |            |            |
       +------------+------------+
                    |
               readable UI
```

## End-to-End Practical

Build a **Course Dashboard** with:

- idle state
- loading state
- error state
- empty lessons state
- success state
- viewer/editor/admin actions
- retry/reset
- accessible status messages

```jsx
function Dashboard({ status, role, lessons = [] }) {
  if (status === "loading") {
    return <p aria-live="polite">Loading dashboard…</p>;
  }

  if (status === "error") {
    return <p role="alert">Could not load dashboard.</p>;
  }

  if (status === "success" && lessons.length === 0) {
    return <p>No lessons available.</p>;
  }

  if (status !== "success") {
    return <p>Dashboard is ready.</p>;
  }

  return (
    <section>
      <h1>Dashboard</h1>
      {role === "admin" && (
        <button type="button">Manage Users</button>
      )}
      <p>{lessons.length} lessons</p>
    </section>
  );
}
```

In a real application, the `status` value should come from state or a data layer rather than being independently inferred from several booleans.

## Hands-on Coding

### Challenge 1 — Course Dashboard

Model `idle`, `loading`, `error`, `empty`, and `success` states and render a distinct UI for each.

### Challenge 2 — Permission Matrix

Create viewer, editor, and admin roles. Show different actions for each role and explain why the UI is not a security boundary.

### Challenge 3 — Boolean Explosion

Refactor three mutually exclusive booleans into a single status model.

### Challenge 4 — Accessibility

Use `role="alert"` for errors and `aria-live="polite"` for appropriate status changes. Avoid adding live regions to every changing value; use them where a status change should be announced.

## Mini Exercise

Given:

```jsx
function PaymentStatus({ status }) {
  // status: "idle" | "processing" | "success" | "error"
}
```

Render a distinct accessible message for each status without using nested ternaries. Also decide how the component should behave for an unexpected status.

## Common Mistakes

### Mistake 1 — Nested ternaries

Use guard clauses, named variables, or extracted components when the branch becomes hard to read.

### Mistake 2 — Numeric `&&`

Use an explicit boolean expression when a numeric value can be `0`.

### Mistake 3 — UI authorization as security

Hiding a Delete button does not secure the Delete API. The server must authorize the operation.

### Mistake 4 — Conflicting booleans

Use a status value when states are mutually exclusive.

### Mistake 5 — Overly large conditional components

Extract branches when they become independently meaningful or reusable.

### Mistake 6 — Accidental fallback with `||`

Do not use `||` when valid values such as `0` or an empty string must be preserved. Use `??` when the fallback is only for `null` or `undefined`.

## Debugging Challenge

This code can render an unexpected `0`:

```jsx
function CartBadge({ count }) {
  return <div>{count && <span>{count}</span>}</div>;
}
```

### Why?

When `count` is `0`, JavaScript evaluates the expression to `0`, and React can render that value.

### Fix

```jsx
function CartBadge({ count }) {
  return <div>{count > 0 && <span>{count}</span>}</div>;
}
```

## Assessment Quiz

1. When is a ternary appropriate?
2. What happens with `{count && <Badge />}` when `count` is `0`?
3. What does returning `null` do?
4. Why can multiple booleans create impossible states?
5. What is authentication vs authorization?
6. Why is conditional UI not a security boundary?
7. When should a branch become a separate component?
8. What is the difference between `||` and `??` for fallback values?
9. Why can an explicit status model be safer than several flags?
10. When should `aria-live` be used carefully?

### Answers

1. A concise two-way UI choice.
2. The expression evaluates to `0`, which React can render.
3. The component renders no UI for that branch.
4. Independent booleans can represent contradictory combinations.
5. Authentication identifies the user; authorization determines allowed actions.
6. Users can bypass browser UI and call APIs directly.
7. When it has meaningful complexity, repeated use, or an independent responsibility.
8. `||` falls back for any falsy value; `??` falls back only for `null` or `undefined`.
9. A single status can make mutually exclusive states explicit and prevent contradictory combinations.
10. Use it for meaningful status changes that users should be informed about, not for every changing piece of UI.

## Task

Build the Course Dashboard described above.

### Acceptance Criteria

- [ ] Branches are readable.
- [ ] No unnecessary nested ternaries.
- [ ] Numeric `&&` pitfall is avoided.
- [ ] Mutually exclusive states use a clear model.
- [ ] Role checks are described as UI behavior, not security.
- [ ] Loading/error states are accessible.
- [ ] Optional data has intentional fallbacks.
- [ ] Unexpected status values have a deliberate behavior.

## Self Check

- [ ] I can choose between `if`, ternary, and `&&` appropriately.
- [ ] I understand why `0 && <X />` can render `0`.
- [ ] I can model loading/error/empty/success states.
- [ ] I understand authentication vs authorization.
- [ ] I know UI permission checks are not security.
- [ ] I can recognize boolean explosion.
- [ ] I can extract a complex branch into a component.
- [ ] I know when `??` is preferable to `||`.
- [ ] I can handle unexpected state values deliberately.

## Interview Questions and Answers

### Beginner

**Q: How does React perform conditional rendering?**  
React uses ordinary JavaScript control flow and expressions such as `if`, ternary, `&&`, and explicit returns to decide which elements are produced.

**Q: When is a ternary useful?**  
For a concise two-way UI choice where both branches are easy to read.

### Intermediate

**Q: Why can `&&` be surprising with numbers?**  
A falsy numeric `0` is returned by the JavaScript expression and may appear in the UI. Use an explicit boolean condition such as `count > 0`.

**Q: Why can multiple booleans be problematic?**  
They can represent contradictory states. A single status is often clearer when states are mutually exclusive.

**Q: What is the difference between `||` and `??`?**  
`||` treats every falsy value as absent, while `??` treats only `null` and `undefined` as absent.

### Advanced

**Q: How would you model API UI state?**  
Start with explicit mutually exclusive states such as idle/loading/success/error, then add domain-specific states such as empty or unauthorized when necessary.

**Q: Why isn't hiding an admin button a security mechanism?**  
The browser is controlled by the user. Protected APIs must independently validate authentication and authorization on the server.

**Q: When should conditional UI become separate components?**  
When a branch has meaningful complexity, an independent responsibility, repeated use, or needs isolated testing.

**Q: Can `&&` replace every conditional?**  
No. It is best for optional UI where there is no alternate branch. Use `if` or a ternary when the application needs a meaningful alternative.

## Day 15 Outcome

You can now model real UI states with clear, maintainable conditional rendering. You can choose between JavaScript control flow, ternaries, logical operators, guard clauses, optional chaining, and nullish coalescing based on the business rule. You also understand explicit status models, accessibility considerations, and why UI authorization is not a security boundary.

You are now ready to apply the same state-driven thinking to dynamic collections on Day 16.
