---
title: Loading Error and Empty States
slug: day-027-loadingerrorempty-states
dayLabel: Day 27
level: Intermediate
estimatedMinutes: 120
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

### Important production correction

The practical above intentionally demonstrates the state model, but a real implementation should avoid relying on `products` or `search` through a stale closure when requests can overlap. Prefer passing request parameters explicitly and use a request ID or cancellation strategy so an older response cannot overwrite a newer one.

```jsx
const requestIdRef = useRef(0);

async function loadProducts({ searchTerm, preserveData = false }) {
  const requestId = ++requestIdRef.current;

  try {
    const response = await apiClient.get("/products", {
      params: { search: searchTerm },
    });

    if (requestId !== requestIdRef.current) return;

    const items = Array.isArray(response.data.items)
      ? response.data.items
      : [];

    setProducts(items);
    setStatus("success");
    setError(null);
  } catch (error) {
    if (requestId !== requestIdRef.current) return;
    setError("We couldn't load products. Please try again.");
    setStatus(preserveData ? "success" : "error");
  }
}
```

For `fetch`, `AbortController` is often preferable when an older request should actually be cancelled. Cancellation should not be shown as a user-facing error.

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

### Bug 7 — Older response overwrites newer results

**Cause:** two requests finish out of order.

**Fix:** cancel obsolete requests or ignore responses that no longer represent the latest request.

### Bug 8 — Cancellation is shown as an error

**Cause:** treating `AbortError` like a network/server failure.

**Fix:** recognize intentional cancellation and keep the UI in the appropriate current state.

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

### Level 6 — Race Conditions

Simulate a slow first request followed by a faster second request. Verify that the older response cannot replace the newer results.

### Level 7 — Test the State Matrix

Test at minimum:

| Scenario | Expected UI |
|---|---|
| First request | Skeleton/loading |
| Success with items | Content |
| Success with zero items | Empty state |
| Initial failure | Error + retry |
| Refresh success | Old data then updated data |
| Refresh failure | Old data + non-blocking error |
| Cancelled request | No error message |
| Rapid searches | Latest request wins |

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

### 11. Stale responses

Do not allow an older request to overwrite the result of a newer request.

### 12. Treating cancellation as failure

Cancellation is often an intentional control-flow event, not an error the user needs to see.

## Assessment

1. Why should loading, error, and empty be separate concepts?
2. What is boolean explosion?
3. Why is empty not an error?
4. What is the difference between initial loading and refreshing?
5. Why should existing data often remain visible during refresh?
6. Why should raw backend errors not be displayed directly?
7. When is automatic retry dangerous?
8. Why do mutations need special retry consideration?
9. How can a stale response corrupt the UI?
10. Why should cancellation normally not be shown as an error?
11. When should a reducer replace several independent state variables?
12. Why should derived empty state be based on successful data rather than only `data.length`?

### Answers

1. They communicate different realities: work in progress, failure, and successful zero-result data.
2. It is the uncontrolled growth of independent booleans that permits contradictory combinations.
3. Empty means the request succeeded and there is no relevant data.
4. Initial loading has no usable data; refreshing has existing data that should usually remain visible.
5. It avoids flicker, preserves context, and makes the interface feel faster.
6. Backend details may expose sensitive information and are not useful to most users.
7. Automatic retries can multiply traffic, worsen outages, or duplicate unsafe operations.
8. A timed-out mutation may have succeeded even though the client did not receive the response.
9. Concurrent requests can complete out of order, causing an older result to overwrite a newer one.
10. Cancellation is commonly intentional and should not create a misleading failure message.
11. Use a reducer or explicit state machine when transitions involve several related values and must remain consistent.
12. `data.length === 0` can also occur before the first successful request; status supplies the missing context.

## Interview Questions

### Beginner

**How would you represent loading, error, and success in React?**  
Use an explicit status model plus the data and error needed by that status.

**Is an empty API response an error?**  
No. If the request succeeded and returned zero relevant records, it is an empty state.

### Intermediate

**Why should you preserve data during refresh?**  
It prevents unnecessary flicker and lets users continue using already-valid information while the new request runs.

**Why is boolean explosion dangerous?**  
Independent flags can represent impossible combinations and make transitions difficult to reason about.

**How should a retry work?**  
It should repeat the current read operation with current parameters, clear stale error state, and handle cancellation/race conditions correctly.

### Advanced

**How do you prevent stale API responses from overwriting current data?**  
Cancel obsolete requests or track request identity and ignore responses that are no longer current.

**How do you model refresh failure?**  
Keep the previous successful data visible and expose a non-blocking refresh error instead of replacing useful content with a full-screen failure.

**When would you use a reducer or server-state library?**  
When request transitions, caching, synchronization, pagination, retries, or concurrent operations become complex enough that local independent state is difficult to maintain.

**How would you distinguish transport errors from domain errors?**  
Normalize the API layer into predictable application errors, then map those errors to user-facing messages and recovery actions.

**How would you test an async state machine?**  
Test each transition and race scenario independently: initial load, success, empty, initial failure, retry, refresh success/failure, cancellation, and latest-request-wins behavior.

## Verification Checklist

- [ ] Initial loading is distinct from empty.
- [ ] Success with zero items renders an empty state.
- [ ] Initial errors provide a safe recovery action.
- [ ] Existing data remains visible during refresh where appropriate.
- [ ] Refresh failure does not unnecessarily discard valid old data.
- [ ] Previous errors are cleared when a new request begins.
- [ ] Retry uses current request parameters.
- [ ] Stale responses cannot overwrite newer results.
- [ ] Intentional cancellation is not shown as a generic error.
- [ ] Automatic retries are bounded and safe.
- [ ] Mutations are not blindly retried.
- [ ] User-facing messages do not expose backend internals.
- [ ] Loading and error feedback is accessible.
- [ ] Empty states explain what happened and what the user can do next.
- [ ] Generic state components remain presentation-focused.
- [ ] Derived empty state includes request-status context.
- [ ] Complex transitions have a documented state model.
- [ ] Tests cover the main state matrix.

## Day 27 Outcome

You can now design asynchronous React screens around explicit user-visible states rather than accidental combinations of flags.

The most important production mental model is:

```text
Initial request:
idle → loading → success | empty | error

Existing data:
success → refreshing → success | refresh-error

Concurrent requests:
latest request wins
obsolete request → cancelled or ignored
```

You are now ready for the next stage: composing API-driven screens with more advanced data-fetching patterns, reusable hooks, and server-state management.
