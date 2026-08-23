---
title: Async Thunks
slug: day-054-async-thunks
dayLabel: Day 54
level: Advanced
estimatedMinutes: 30
order: 54
track: react
---
---
title: Async Thunks
slug: day-054-async-thunks
dayLabel: Day 54
level: Advanced
estimatedMinutes: 30
order: 54
track: react
---
# Day 54 [Advanced]: Async Thunks

## Goal

Handle async API workflows in Redux using `createAsyncThunk` and lifecycle reducers.

By the end of this lesson, you should be able to model an asynchronous request as an explicit state transition, handle success and failure consistently, avoid unnecessary duplicate requests, and understand when a thunk is appropriate versus when RTK Query is a better abstraction.

## Prerequisites

- Day 53 completed
- Slice reducer and store familiarity

You should also be comfortable with `createSlice`, `extraReducers`, `configureStore`, `useDispatch`, `useSelector`, promises, `async/await`, and basic HTTP response handling.

## Explanation

Async thunks dispatch `pending`, `fulfilled`, and `rejected` actions automatically so UI can respond to loading and error states.

`createAsyncThunk` does not make the network request itself magical. It gives the asynchronous workflow a predictable Redux lifecycle. The payload creator performs the async work, while the slice decides how the request state should be represented in the store.

A useful mental model is:

```text
dispatch(fetchProducts())
        ↓
     pending
        ↓
   API request
    ↙       ↘
success     failure
  ↓            ↓
fulfilled    rejected
  ↓            ↓
store data   store error
  ↓            ↓
     UI renders state
```

The important separation is:

- **Thunk:** performs or coordinates asynchronous work.
- **Reducer:** records the resulting state transition.
- **Selector:** reads the relevant state.
- **Component:** decides how that state is presented.

This keeps network concerns out of reducers, because reducers must remain synchronous and deterministic.

## Topic by Topic

### Topic 1: createAsyncThunk Basics

Theory:
Thunk wraps async logic and returns promise lifecycle actions.

`createAsyncThunk` accepts a unique action type prefix and an async payload creator. The returned thunk can then be dispatched like a normal Redux action.

Practical:
Create product fetch thunk.

Code Example:

```jsx
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  },
);
```

**Explanation:** The first argument becomes the action-type prefix. When the thunk runs, Redux Toolkit generates lifecycle actions such as `products/fetchAll/pending`, `products/fetchAll/fulfilled`, and `products/fetchAll/rejected`.

**Key Points:**

- Understand the core idea of createAsyncThunk Basics.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Throw or return controlled failures so the rejected lifecycle can represent them correctly.
- Keep the payload creator focused on asynchronous work rather than UI rendering.

### Topic 2: pending/fulfilled/rejected Lifecycle

Theory:
Reducer handles each stage to update `loading`, `data`, and `error`.

A request state should normally have an explicit initial state such as `idle`. Moving from `idle` to `loading`, then to either `succeeded` or `failed`, makes the UI state predictable.

Practical:
Set status flag in each case.

Code Example:

```jsx
builder
  .addCase(fetchProducts.pending, (state) => {
    state.status = "loading";
    state.error = null;
  })
  .addCase(fetchProducts.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.items = action.payload;
  })
  .addCase(fetchProducts.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload ?? action.error.message ?? "Request failed";
  });
```

**Explanation:** This topic explains pending/fulfilled/rejected Lifecycle in a practical way so you can apply it confidently in real React projects. The important design decision is that the three lifecycle handlers should not accidentally leave stale loading or error state behind.

**Key Points:**

- Understand the core idea of pending/fulfilled/rejected Lifecycle.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Clear stale errors when a new request starts.
- Mark the request as successful only after the payload is available.

### Topic 3: Error Propagation

Theory:
Use `rejectWithValue` for controlled error payloads.

A thrown error is available through `action.error`, while `rejectWithValue` places an application-controlled value in `action.payload`. The latter is useful when an API returns structured validation or business errors that the UI needs to display.

Practical:
Return API error message to UI state.

Code Example:

```jsx
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/products");

      if (!response.ok) {
        return thunkAPI.rejectWithValue({
          message: "Unable to load products",
          status: response.status,
        });
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error instanceof Error ? error.message : "Network error",
      });
    }
  },
);
```

The rejected reducer can then read `action.payload?.message` while still falling back to `action.error.message` for failures that were not produced by `rejectWithValue`.

**Explanation:** This topic explains Error Propagation in a practical way so you can apply it confidently in real React projects. Controlled error payloads are especially useful when the backend returns predictable error information.

**Key Points:**

- Understand the core idea of Error Propagation.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Prefer a stable error shape when the UI needs structured information.
- Do not expose raw technical errors to users without considering the user experience.

### Topic 4: Dispatching Thunks in Components

Theory:
Dispatch thunk like normal action inside effects or events.

A component should normally dispatch the thunk and subscribe to the resulting state. It should not contain the API implementation itself.

Practical:
Fetch on component mount.

Code Example:

```jsx
useEffect(() => {
  if (status === "idle") {
    dispatch(fetchProducts());
  }
}, [dispatch, status]);
```

**Explanation:** This topic explains Dispatching Thunks in Components in a practical way so you can apply it confidently in real React projects. The `dispatch` function is stable, while the status check prevents the effect from repeatedly requesting data after a successful load.

**Key Points:**

- Understand the core idea of Dispatching Thunks in Components.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Keep API implementation outside the component.
- Include values used by the effect in its dependency array.

### Topic 5: Avoid Duplicate Requests

Theory:
Use status checks before re-dispatching same request.

A status check such as `idle → loading → succeeded/failed` is a simple guard, but it is not a complete request-deduplication system. In larger applications, request arguments, caching, component lifetimes, and concurrent requests can make this problem more complex.

Practical:
Skip fetch if already loading.

Code Example:

```jsx
if (status === "idle") {
  dispatch(fetchProducts());
}
```

For parameterized requests, include the parameter in the thunk call and consider whether the current state already represents that parameter before dispatching again.

**Explanation:** This topic explains Avoid Duplicate Requests in a practical way so you can apply it confidently in real React projects. A status guard prevents many accidental repeat requests, but it should not be treated as a replacement for a caching/data-fetching strategy.

**Key Points:**

- Understand the core idea of Avoid Duplicate Requests.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Check the request status before dispatching simple initial-load requests.
- For complex server-state caching, prefer a purpose-built approach such as RTK Query, covered next.

### Topic 6: Production Guardrails for Async Thunks

Theory:
At this stage, strong engineering comes from repeatable quality checks that prevent regressions in state flow, edge cases, and maintainability.

Practical:
Define a short review checklist for this topic that verifies correctness, fallback behavior, and readability before merge.

Code Example:

```text
[ ] Initial request state is explicit
[ ] pending clears stale request errors when appropriate
[ ] fulfilled stores the expected payload shape
[ ] rejected handles both controlled and unexpected errors
[ ] Reducers contain no network or timer side effects
[ ] Components do not duplicate API implementation
[ ] Duplicate requests are considered
[ ] Retry behavior is intentional
[ ] Selectors match the actual store shape
```

**Explanation:** This topic explains Production Guardrails for Async Thunks in a practical way so you can apply it confidently in real React projects. A valid JavaScript implementation can still produce poor UX if loading, stale data, retries, cancellation, or error recovery are not considered.

**Key Points:**

- Understand the core idea of Production Guardrails for Async Thunks.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.
- Keep reducers synchronous and deterministic.
- Treat server-state caching, retries, cancellation, and deduplication as explicit design concerns.

## Key Concepts

- Async thunk generation
- Lifecycle state transitions
- Error payload handling
- Component dispatch integration
- Request deduping awareness
- `createAsyncThunk` payload creators
- `rejectWithValue` vs thrown errors
- Request status modeling
- Server-state considerations
- Quality guardrail mindset

## Visual Concept Map

```mermaid
flowchart TD
    A[dispatch(fetchThunk)] --> B[pending]
    B --> C[fulfilled]
    B --> D[rejected]
    C --> E[data in store]
    D --> F[error in store]
    E --> G[selectors]
    F --> G
    G --> H[UI]
```

## End-to-End Practical

1. Create async thunk for API call.
2. Add slice status and error fields.
3. Handle pending/fulfilled/rejected in extraReducers.
4. Dispatch thunk in component lifecycle.
5. Render loading/error/data states.
6. Clear stale errors when a new request begins.
7. Provide a retry path for recoverable failures.
8. Verify that the reducer payload shape matches the API response shape.
9. Consider whether repeated requests should eventually be replaced with RTK Query caching.

## Hands-on Coding

### Example 1: Case - Product List Async Fetch

Scenario:
An e-commerce admin app fetches products from server with loading and failure handling.

```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Request failed");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unable to fetch products",
      );
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Failed to fetch";
      });
  },
});

export default productsSlice.reducer;
```

**Important:** In a real application, the API response should be validated or normalized when its shape is not trusted. The example endpoint returns posts, so the tutorial should treat those records as demo data rather than production product entities.

### Example 2: Case - Dispatch Thunk on Mount

Scenario:
A product page should request data only once when state is idle.

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ProductsPage() {
  const dispatch = useDispatch();
  const { status, items, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p role="alert">{error}</p>;

  return items.slice(0, 5).map((p) => <p key={p.id}>{p.title}</p>);
}

export default ProductsPage;
```

**Code review note:** The example assumes the store has been configured with `products: productsReducer` and that `fetchProducts` is imported from the slice module. Keeping those assumptions explicit prevents learners from copying an incomplete snippet into an application and getting an undefined-state error.

### Example 3: Case - Retry Failed Thunk Request

Scenario:
Support dashboard should allow retry when initial fetch fails.

```jsx
function RetryBlock() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);

  if (status !== "failed") return null;

  return (
    <button type="button" onClick={() => dispatch(fetchProducts())}>
      Retry
    </button>
  );
}
```

A retry should normally be available only for recoverable failures. If the server consistently returns an authorization error, repeatedly retrying the same request does not solve the underlying problem.

## Mini Exercise

Scenario:
You are building an employee management console.

Create thunk `fetchEmployees`, handle pending/fulfilled/rejected, and render list with retry button.

Expected output:

- UI reflects loading/success/error states
- Error message is user-friendly
- Retry dispatches same thunk again
- A second request does not start automatically while the first request is already loading
- Empty employee results are handled separately from an error state

## Assessment Quiz

### Quiz Questions

1. What lifecycle actions does createAsyncThunk generate?
2. Where are thunk lifecycle handlers usually written?
3. True or False: rejected case should never update error state.
4. Why use rejectWithValue?
5. How do you avoid repeated duplicate fetch calls?
6. What is the difference between `action.payload` and `action.error` in a rejected thunk?
7. Why should network calls never be placed directly inside a reducer?

### Quiz Answers

1. pending, fulfilled, rejected
2. slice extraReducers
3. False
4. To pass controlled error payloads to reducer
5. Check request status before dispatching again
6. `action.payload` can contain a value supplied through `rejectWithValue`, while `action.error` contains Redux Toolkit's serialized error information.
7. Reducers must remain synchronous and deterministic; asynchronous side effects belong outside reducers, such as in thunks.

## Task

- Build one async thunk flow end-to-end
- Handle three lifecycle states in UI
- Complete mini exercise
- Add a retry interaction
- Handle both a controlled API error and an unexpected error fallback
- Verify that the reducer state shape matches the selectors used by the component

## Self Check

- You can wire async thunks to slice lifecycle reducers
- You can build resilient loading/error UX
- You can answer at least 4 out of 5 quiz questions correctly
- You can explain the difference between a thunk and a reducer
- You can explain when `rejectWithValue` is useful
- You can identify why a status guard does not provide full server-state caching

## Interview Questions and Answers

### Beginner

**Question:** What is createAsyncThunk used for?

**Answer:** Creating Redux async actions with lifecycle states.

**Question:** What does pending state represent?

**Answer:** Request is currently in progress.

### Middle

**Question:** Why is extraReducers needed for async thunks?

**Answer:** Async actions are generated outside slice `reducers` field.

**Question:** How do you display request errors to users?

**Answer:** Store error in state during rejected case and render message.

**Question:** Why should a request status usually include an `idle` state?

**Answer:** It distinguishes an initial state where no request has started from an active request, successful response, or failed request.

### Advanced

**Question:** When would you cancel or ignore stale thunk results?

**Answer:** During rapid parameter changes to avoid outdated UI updates. For parameterized requests, the application may need request identity, cancellation, or a server-state library that handles these concerns more comprehensively.

**Question:** What architecture decision separates thunk and UI concerns?

**Answer:** Keep API logic in thunks, rendering state decisions in components.

**Question:** When might RTK Query be preferable to hand-written async thunks?

**Answer:** When the application primarily needs server-state fetching, caching, deduplication, invalidation, refetching, and request lifecycle management. RTK Query provides those capabilities without requiring each feature to implement them manually.

## Day 54 Outcome

- You can implement robust async Redux workflows with lifecycle handling
- You can manage API states predictably in the store
- You can handle controlled and unexpected request failures
- You can reason about duplicate requests and retry behavior
- You understand the limitations of hand-written async thunks for server-state management
- You are ready for RTK Query abstraction in Day 55
