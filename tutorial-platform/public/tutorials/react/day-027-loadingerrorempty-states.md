---
title: Loading Error and Empty States
slug: day-027-loadingerrorempty-states
dayLabel: Day 27
level: Intermediate
estimatedMinutes: 75
order: 27
track: react
---
# Day 27 [Intermediate]: Loading, Error, Empty and Success States

## Goal

Design API-driven React UI as an explicit request state machine rather than a collection of unrelated booleans.

## Prerequisites

- Day 25: Fetch
- Day 26: Axios and query basics
- `useState`, `useEffect`, async/await, conditional rendering

## The Mental Model

A request is not simply `data` or `error`. A useful UI distinguishes:

```text
idle → loading → success
              ↘ error
```

Success can then have two meaningful outcomes:

```text
success + data
success + empty
```

For a production screen you may also need refreshing, retrying, cancelled, unauthorized, or offline states.

## Why Four States Matter

A blank screen is ambiguous. The user cannot tell whether the app is loading, failed, has no data, or is broken.

| State | Meaning | Typical UI |
|---|---|---|
| Idle | Nothing requested yet | Search instructions |
| Loading | Request in progress | Spinner/skeleton |
| Success + data | Request succeeded | Content |
| Success + empty | Request succeeded with zero results | Helpful empty state |
| Error | Request failed | Message + retry |

## Avoid Boolean Explosion

This can create impossible combinations:

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [hasLoaded, setHasLoaded] = useState(false);
const [isEmpty, setIsEmpty] = useState(false);
```

For a simple request, prefer a single status plus data/error:

```jsx
const [status, setStatus] = useState("idle");
const [data, setData] = useState([]);
const [error, setError] = useState(null);
```

Possible statuses:

```text
idle | loading | success | error
```

Empty is derived from `status === "success" && data.length === 0`.

## Complete Request Example

```jsx
async function loadProducts() {
  setStatus("loading");
  setError(null);

  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error("Unable to load products");

    const result = await response.json();
    setData(result);
    setStatus("success");
  } catch (error) {
    setError(error instanceof Error ? error.message : "Request failed");
    setStatus("error");
  }
}
```

## Rendering Order

```jsx
if (status === "idle") return <p>Choose a filter to begin.</p>;
if (status === "loading") return <p aria-live="polite">Loading...</p>;
if (status === "error") {
  return (
    <section role="alert">
      <p>{error}</p>
      <button type="button" onClick={loadProducts}>Retry</button>
    </section>
  );
}

if (data.length === 0) {
  return <p>No products found. Try changing your filters.</p>;
}

return <ProductList products={data} />;
```

## Loading: Spinner vs Skeleton

A spinner communicates progress. A skeleton preserves page structure and often feels better for content-heavy screens.

Do not show a loading indicator so briefly that it causes distracting flashes without a product reason. More importantly, never hide a slow request behind an apparently frozen interface.

## Error States

Separate technical details from user-facing messages:

```jsx
const message = "We couldn't load products. Please try again.";
```

Log diagnostic details separately when appropriate. Never expose API keys, stack traces, or internal server details to users.

Retry should repeat the request using the current parameters.

## Empty States Are Not Errors

An empty successful response means the system worked.

Good:

```text
No results for “react”. Try another search.
```

Bad:

```text
ERROR: 0 records
```

An empty state can provide a next action such as clearing filters or creating the first item.

## Preserving Existing Data During Refresh

There is a difference between initial loading and background refresh.

Instead of replacing a populated screen with a blank spinner on every refresh:

```text
Initial request: skeleton
Refresh request: keep current data + small refreshing indicator
```

This distinction improves perceived performance and prevents unnecessary layout shifts.

## Retry and Idempotency

Retrying a GET is usually straightforward. Retrying a mutation such as payment or order creation can have side effects. Never blindly apply the same retry strategy to every HTTP operation.

## Accessibility

Use:

- `role="alert"` for important errors
- `aria-live="polite"` for non-critical loading/status messages
- descriptive button text such as `Retry products`
- keyboard-accessible controls
- sufficient status contrast

Do not rely only on color to communicate state.

## Reusable State Components

A larger application can extract consistent UI:

```jsx
function ErrorState({ message, onRetry }) {
  return (
    <section role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>Try again</button>
    </section>
  );
}
```

Keep domain-specific actions outside generic presentation components.

## Debugging Lab

### Bug 1
`error` remains visible after a successful retry.

**Fix:** clear the previous error when the new request starts.

### Bug 2
Empty state appears while loading.

**Fix:** derive empty only after successful completion.

### Bug 3
Old results disappear during every refresh.

**Fix:** distinguish initial loading from background refreshing.

### Bug 4
Two requests finish out of order and the older result wins.

**Fix:** use cancellation or a request identity strategy; Day 25 introduced this problem and Day 28 will apply it in a project.

## Hands-on Labs

1. Refactor a boolean-based API component to a `status` state machine.
2. Add retry to an error state.
3. Create separate first-load and refreshing UI.
4. Build an empty state with a clear-filter action.
5. Add accessible status announcements.

## Assessment

1. Why is empty different from error?
2. What impossible states can boolean flags create?
3. Why should empty be derived from successful data?
4. When should existing data remain visible during refresh?
5. Why is retrying a mutation different from retrying a GET?
6. How would you model unauthorized separately from generic errors?
7. Why should error details be sanitized?
8. How can loading UI improve perceived performance?

## Interview Questions

**What are the common API UI states?** Idle, loading, success-with-data, success-empty, and error; production systems may add refreshing, cancelled, unauthorized, and offline states.

**Why not store `isEmpty` in state?** It can be derived from successful data, so storing it creates another synchronization point.

**How do you avoid a stale error after retry?** Clear the error at request start and set a terminal status only after the request completes.

**How would you preserve data while refetching?** Keep the existing data and represent refresh separately from initial loading.

## Final Project

Build a reusable `ResourceView` demo that supports idle, loading, success, empty, error, and retry states for a searchable product list.

Acceptance criteria:

- [ ] No blank request state
- [ ] Loading is distinguishable from empty
- [ ] Errors have recovery actions
- [ ] Empty state has useful guidance
- [ ] Refresh does not unnecessarily erase existing data
- [ ] Status announcements are accessible
- [ ] No impossible boolean combinations
- [ ] Request race conditions are handled

## Day 27 Outcome

You can model API UI explicitly, communicate request state clearly, design resilient error/empty experiences, and choose the right state representation before building the UI.

Day 28 applies these principles in the Weather App.