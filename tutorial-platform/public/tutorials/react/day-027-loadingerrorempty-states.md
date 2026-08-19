---
title: Loading Error and Empty States
slug: day-027-loadingerrorempty-states
dayLabel: Day 27
level: Intermediate
estimatedMinutes: 90
order: 27
track: react
---
# Day 27 [Intermediate]: Loading, Error, Empty and Success States

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Request State Machine](#request-state-machine)
- [Why These States Matter](#why-these-states-matter)
- [Avoid Boolean Explosion](#avoid-boolean-explosion)
- [Initial Loading vs Refreshing](#initial-loading-vs-refreshing)
- [Loading States](#loading-states)
- [Success States](#success-states)
- [Empty States](#empty-states)
- [Error States](#error-states)
- [Retry](#retry)
- [Accessibility](#accessibility)
- [Reusable State Components](#reusable-state-components)
- [Complete Practical](#complete-practical)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Common Mistakes](#common-mistakes)
- [Assessment](#assessment)
- [Interview Questions](#interview-questions)
- [Verification Checklist](#verification-checklist)
- [Day 27 Outcome](#day-27-outcome)

## Goal

Learn to design API-driven React interfaces as an explicit **request state machine** instead of a collection of unrelated booleans.

The objective is not merely to show a spinner. You should be able to answer:

- Has a request started?
- Is the first load happening?
- Is existing data being refreshed?
- Did the request succeed?
- Did it succeed with zero results?
- Did it fail?
- Can the user recover?
- What should assistive technology announce?

## Prerequisites

- Days 1–26
- `useState`
- `useEffect`
- Conditional rendering
- `fetch` / Axios
- Promises and `async`/`await`
- Basic HTTP status/error concepts

## Learning Outcomes

By the end you can:

- model request state explicitly
- distinguish idle, loading, success, empty, refreshing, and error states
- avoid contradictory boolean state
- preserve existing data during refresh
- design useful empty states
- design recoverable error states
- implement retry correctly
- distinguish retryable failures from non-retryable operations
- build accessible loading and error feedback
- avoid stale error/data combinations
- build reusable state UI components
- debug common async UI bugs

## Core Mental Model

A request is not simply `data` or `error`.

```text
idle
  ↓
loading
  ↓
success ─────→ data
  │
  └───────────→ empty

loading → error

success(data) → refreshing → success(data)
                         ↘ error while preserving old data
```

For a production application you may also need:

```text
cancelled | unauthorized | forbidden | offline | rate-limited
```

The exact state model should reflect the product's UX requirements rather than blindly creating a state for every possible event.

## Request State Machine

A useful conceptual model is:

| State | Meaning | Typical UI |
|---|---|---|
| `idle` | No request has started | Instructions / initial CTA |
| `loading` | Initial request is running | Skeleton / loading indicator |
| `success` | Request succeeded with data | Content |
| `empty` | Request succeeded with zero relevant items | Empty-state guidance |
| `refreshing` | Existing data remains while a new request runs | Existing content + subtle progress |
| `error` | Request failed and no usable data is available | Error + retry |
| `refresh-error` | Refresh failed but old data is still usable | Existing content + non-blocking error |

Notice that **empty is usually derived from successful data**, while refreshing can be a separate UI concern layered over existing success data.

## Why These States Matter

A blank screen is ambiguous. The user cannot tell whether:

- the application is loading
- the request failed
- there are no results
- the application is still working
- the UI itself is broken

A clear state model removes that ambiguity.

## Avoid Boolean Explosion

This is dangerous:

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [hasLoaded, setHasLoaded] = useState(false);
const [isEmpty, setIsEmpty] = useState(false);
const [refreshing, setRefreshing] = useState(false);
```

It allows impossible combinations such as:

```text
loading = true
hasLoaded = true
isEmpty = true
error = "Failed"
```

For a simple request, prefer a small state model:

```jsx
const [status, setStatus] = useState("idle");
const [data, setData] = useState([]);
const [error, setError] = useState(null);
```

Then derive:

```jsx
const isEmpty = status === "success" && data.length === 0;
```

For a more complex screen, a reducer or explicit discriminated state object may be clearer.

## Initial Loading vs Refreshing

This distinction is one of the most important production concepts in this lesson.

### Initial load

There is no useful data yet:

```text
loading
  ↓
show skeleton
```

### Background refresh

The user already has useful data:

```text
existing data
     ↓
refresh request
     ↓
keep data visible
     ↓
show small refreshing indicator
```

Avoid this poor experience:

```text
existing data
     ↓
clear everything
     ↓
large spinner
     ↓
show same data again
```

The second approach causes unnecessary layout shifts and makes the application feel slower.

## Loading States

### Spinner

Good for small or unpredictable operations:

```jsx
<p aria-live="polite">Loading...</p>
```

### Skeleton

Useful when the shape of the final content is known:

```jsx
function ProductSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton-title" />
      <div className="skeleton-row" />
      <div className="skeleton-row" />
    </div>
  );
}
```

Do not use skeletons merely for decoration. They should communicate that content is being prepared.

### Loading timing

Very short requests can make indicators flash. For a polished application, consider a small minimum-display threshold or delayed indicator when appropriate. Do not artificially delay the actual request just to make the spinner visible.

## Success States

A successful request does not automatically mean “render a list.” First determine what the response means.

```text
HTTP/request success
       ↓
valid application data?
       ↓
items.length > 0 → content
items.length === 0 → empty
```

For APIs where `null`, missing properties, or invalid shapes are possible, validate/normalize data before rendering.

Example:

```jsx
const items = Array.isArray(result.items) ? result.items : [];
setData(items);
setStatus("success");
```

Do not silently convert malformed API responses to an apparently valid empty state if that would hide a backend contract bug. Validation strategy should match application requirements.

## Empty States

**Empty is not an error.**

The request succeeded, but there is nothing relevant to display.

### Search empty

```text
No results for “react”.
Try a different keyword or clear your filters.
```

### First-use empty

```text
You don't have any projects yet.
Create your first project to get started.
```

### Filtered empty

```text
No products match the selected filters.
Clear filters
```

A useful empty state answers:

1. What happened?
2. Why is the screen empty?
3. What can the user do next?

Avoid:

```text
ERROR: 0 records
```

## Error States

An error state should be:

- understandable
- actionable
- safe
- recoverable where possible

Prefer:

```text
We couldn't load your projects.
Please check your connection and try again.

[Try again]
```

Avoid exposing:

- stack traces
- database errors
- internal URLs
- authentication tokens
- API keys
- raw backend exceptions

### Technical error vs user message

```jsx
const userMessage = "We couldn't load the products. Please try again.";

console.error("Product request failed", error);
```

Diagnostics and user communication have different purposes.

## Retry

Retry should use the **current request parameters**.

```jsx
async function loadProducts() {
  setStatus("loading");
  setError(null);

  try {
    const response = await apiClient.get("/products", {
      params: { page, search }
    });

    setData(response.data.items ?? []);
    setStatus("success");
  } catch (error) {
    setError("Unable to load products.");
    setStatus("error");
  }
}
```

A retry button can call the same operation:

```jsx
<button type="button" onClick={loadProducts}>
  Try again
</button>
```

### Retry safety

Be careful with automatic retries.

Retrying a read such as GET is usually safer than blindly retrying a mutation such as:

```text
Create payment
Create order
Send email
Charge card
```

A network timeout does not always mean the server did nothing. A mutation may have succeeded even if the client never received the response.

Idempotency keys and backend API design matter for safe mutation retries.

## Accessibility

State feedback must be available to users who do not rely on visual changes.

### Important error

```jsx
<section role="alert">
  <p>We couldn't load the products.</p>
</section>
```

### Non-critical status

```jsx
<p aria-live="polite">Refreshing products...</p>
```

### Buttons

Prefer:

```jsx
<button type="button">Retry products</button>
```

over vague labels such as:

```jsx
<button>Retry</button>
```

when multiple retry actions exist.

Also ensure:

- keyboard access
- visible focus
- sufficient contrast
- meaningful status text
- no reliance on color alone

## Reusable State Components

Generic presentation components can standardize the UX:

```jsx
function ErrorState({ message, onRetry }) {
  return (
    <section role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </section>
  );
}

function EmptyState({ message, action }) {
  return (
    <section>
      <p>{message}</p>
      {action}
    </section>
  );
}
```

Keep domain-specific behavior outside generic presentation components.

## Complete Practical

Build a **Product Directory** with:

- initial loading skeleton
- product list
- empty search state
- error state
- retry
- refresh indicator
- search/filter parameters
- accessible status announcements

### State

```jsx
const [status, setStatus] = useState("idle");
const [products, setProducts] = useState([]);
const [error, setError] = useState(null);
const [refreshing, setRefreshing] = useState(false);
```

### Request

```jsx
async function loadProducts({ preserveData = false } = {}) {
  if (preserveData && products.length > 0) {
    setRefreshing(true);
  } else {
    setStatus("loading");
  }

  setError(null);

  try {
    const response = await apiClient.get("/products", {
      params: { search }
    });

    const items = Array.isArray(response.data.items)
      ? response.data.items
      : [];

    setProducts(items);
    setStatus("success");
  } catch (error) {
    setError("We couldn't load products. Please try again.");

    if (preserveData && products.length > 0) {
      // Keep existing data visible and show a refresh error.
    } else {
      setStatus("error");
    }
  } finally {
    setRefreshing(false);
  }
}
```

### Rendering

```jsx
if (status === "idle") {
  return <p>Search for a product to begin.</p>;
}

if (status === "loading") {
  return <ProductSkeleton />;
}

if (status === "error") {
  return (
    <ErrorState
      message={error}
      onRetry={() => loadProducts()}
    />
  );
}

if (products.length === 0) {
  return (
    <EmptyState
      message="No products match your search."
      action={<button type="button">Clear filters</button>}
    />
  );
}

return (
  <section>
    {refreshing && (
      <p aria-live="polite">Refreshing products...</p>
    )}
    <ProductList products={products} />
  </section>
);
```

For production code, avoid stale closures in request functions and consider a reducer or server-state library as request complexity grows.

## Debugging Lab

### Bug 1 — Error remains after retry

```jsx
async function load() {
  setStatus("loading");
  // error was not cleared
}
```

**Fix:** clear the previous error when starting a new request.

### Bug 2 — Empty state appears during loading

```jsx
if (data.length === 0) return <EmptyState />;
```

**Fix:** only render empty after a successful request:

```jsx
if (status === "success" && data.length === 0) {
  return <EmptyState />;
}
```

### Bug 3 — Existing results disappear during refresh

**Cause:** setting `data = []` before every request.

**Fix:** preserve existing data during background refresh.

### Bug 4 — Retry uses old search text

**Cause:** request function captured stale values.

**Fix:** ensure the retry operation reads the current state or receives current parameters explicitly.

### Bug 5 — Error replaces useful old data after refresh

**Fix:** distinguish initial-load failure from refresh failure and keep old data when it remains valid.

### Bug 6 — Every retry is automatic

**Problem:** repeated failures can create excessive traffic.

**Fix:** use bounded retries/backoff where automatic retry is actually appropriate.

## Hands-on Exercises

### Level 1 — Four States

Create a product page supporting:

- loading
- success
- empty
- error

### Level 2 — Retry

Add a retry button and verify that the error disappears when a new request starts.

### Level 3 — Refresh UX

Keep existing data visible while refreshing.

### Level 4 — Search

Add search parameters and ensure the empty state is different from the error state.

### Level 5 — Production State Machine

Implement:

- idle
- initial loading
- success
- empty
- refreshing
- refresh error
- retry
- cancellation
- accessible announcements

Document the allowed transitions.

## Common Mistakes

### 1. Boolean explosion

Multiple booleans can describe contradictory states. Prefer an explicit status model.

### 2. Empty means error

Zero results after a successful request is not a failure.

### 3. Clearing data on every refresh

This causes unnecessary flicker and layout shifts.

### 4. Showing raw errors

Convert technical failures into safe user-facing messages.

### 5. Retry without considering side effects

Mutations require special care and may need idempotency.

### 6. Infinite automatic retries

Bound retries and use backoff where appropriate.

### 7. No recovery action

If the user can retry, clear filters, sign in, or take another action, expose that action.

### 8. Color-only state indicators

Use text and accessible semantics as well.

### 9. Loading forever

Always consider timeout, cancellation, network failure, or server failure paths.

### 10. Mixing transport and UI state everywhere

Centralize API behavior where appropriate and keep state transitions understandable.

## Assessment

1. Why should loading, error, and empty be separate concepts?
2. What is boolean explosion?
3. Why is empty not an error?
4. What is the difference between initial loading and refreshing?
5. Why should existing data often remain visible during refresh?
6. Why should raw backend errors not be displayed directly?
7. When is automatic retry dangerous?
8. Why do mutations need special retry consideration?
9. How can accessibility APIs communicate loading and errors?
10. What causes an empty state to appear too early?
11. How can stale request values affect retry?
12. When might a reducer be better than several `useState` calls?

### Answers

1. They communicate different user situations and require different UI/actions.
2. Using many independent booleans that can represent contradictory combinations.
3. The request succeeded; there simply are no relevant records.
4. Initial loading has no useful data yet; refreshing happens while useful existing data remains available.
5. It reduces flicker and layout shifts and preserves context.
6. They may expose implementation details, secrets, or confusing technical information.
7. It can create excessive traffic or repeat operations that are not safe to repeat.
8. A mutation may have succeeded even if the client did not receive the response; repeating it can duplicate side effects.
9. Use semantics such as `role="alert"` and `aria-live` appropriately.
10. Rendering `data.length === 0` without checking whether the request has successfully completed.
11. A closure can hold parameters from an older render, causing retry to request stale data.
12. When transitions involve many related fields and explicit state transitions are easier to reason about.

## Interview Questions

### Beginner

**Why do we need loading and error states?**

They tell the user what the application is currently doing and whether recovery is needed.

**Is an empty list an error?**

No. A successful request can legitimately return zero items.

### Intermediate

**How would you model request state?**

Use an explicit status/discriminated state model instead of unrelated booleans.

**How do you preserve old data during refresh?**

Keep the existing data and represent refreshing separately from the initial loading state.

**How should retry work?**

Repeat the current operation with current parameters, clear stale error state, and avoid unsafe automatic retries for non-idempotent mutations.

### Advanced

**How would you model a refresh failure?**

Keep valid previous data visible and expose a non-blocking refresh error/retry affordance rather than replacing useful content with an empty error screen.

**Why can an HTTP request succeed but the UI still fail?**

The response can have an unexpected shape or the client can fail while transforming/validating data.

**How would you prevent impossible request states?**

Use a finite state model/reducer/discriminated union and define allowed transitions.

**Why is perceived performance important here?**

The same network latency can feel much faster when the UI preserves context, shows meaningful progress, and avoids unnecessary layout shifts.

## Verification Checklist

- [ ] Can explain idle, loading, success, empty, error, and refreshing.
- [ ] Can model request state without boolean explosion.
- [ ] Can distinguish initial loading from background refresh.
- [ ] Can preserve useful data during refresh.
- [ ] Can design meaningful empty states.
- [ ] Can create actionable error states.
- [ ] Can implement retry.
- [ ] Understand why mutation retries need special care.
- [ ] Understand idempotency at a high level.
- [ ] Can prevent stale error messages after successful retry.
- [ ] Can prevent empty state during initial loading.
- [ ] Can explain stale closures in retry functions.
- [ ] Can use `role="alert"` and `aria-live` appropriately.
- [ ] Can build reusable state components.
- [ ] Can debug refresh/error/empty-state bugs.
- [ ] Can explain the request state machine in an interview.

## Day 27 Outcome

You can now design API-driven React interfaces that communicate request state clearly instead of leaving users with blank screens or ambiguous feedback.

You understand the difference between **loading, success, empty, error, and refresh states**, can implement recovery actions, preserve useful data during refresh, and build accessible, production-oriented asynchronous UI.

**Next:** Day 28 — Mini Project: Weather App.