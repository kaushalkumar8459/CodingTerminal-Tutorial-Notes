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
- [Day 54 Outcome](#day-54-outcome)

## Goal

Handle async API workflows in Redux using `createAsyncThunk` and lifecycle reducers.

## Prerequisites

- Day 53 completed
- Slice reducer and store familiarity

## Explanation

Async thunks dispatch `pending`, `fulfilled`, and `rejected` actions automatically so UI can respond to loading and error states.

## Topic by Topic

### Topic 1: createAsyncThunk Basics

Theory:
Thunk wraps async logic and returns promise lifecycle actions.

Practical:
Create product fetch thunk.

Code Example:

```jsx
createAsyncThunk("products/fetchAll", async () => { ... });
```

**Explanation:** This topic explains createAsyncThunk Basics in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of createAsyncThunk Basics.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 2: pending/fulfilled/rejected Lifecycle

Theory:
Reducer handles each stage to update `loading`, `data`, and `error`.

Practical:
Set status flag in each case.

Code Example:

```jsx
builder.addCase(fetchProducts.pending, (state) => {
  state.status = "loading";
});
```

**Explanation:** This topic explains pending/fulfilled/rejected Lifecycle in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of pending/fulfilled/rejected Lifecycle.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 3: Error Propagation

Theory:
Use `rejectWithValue` for controlled error payloads.

Practical:
Return API error message to UI state.

Code Example:

```jsx
return thunkAPI.rejectWithValue("Failed to load products");
```

**Explanation:** This topic explains Error Propagation in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Error Propagation.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 4: Dispatching Thunks in Components

Theory:
Dispatch thunk like normal action inside effects or events.

Practical:
Fetch on component mount.

Code Example:

```jsx
dispatch(fetchProducts());
```

**Explanation:** This topic explains Dispatching Thunks in Components in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Dispatching Thunks in Components.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 5: Avoid Duplicate Requests

Theory:
Use status checks before re-dispatching same request.

Practical:
Skip fetch if already loading.

Code Example:

```jsx
if (status === "idle") dispatch(fetchProducts());
```

**Explanation:** This topic explains Avoid Duplicate Requests in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Avoid Duplicate Requests.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

### Topic 6: Production Guardrails for Async Thunks

Theory:
At this stage, strong engineering comes from repeatable quality checks that prevent regressions in state flow, edge cases, and maintainability.

Practical:
Define a short review checklist for this topic that verifies correctness, fallback behavior, and readability before merge.

Code Example:

`jsx
// Add a checklist step before release for this feature area.
`
**Explanation:** This topic explains Production Guardrails for Async Thunks in a practical way so you can apply it confidently in real React projects.

**Key Points:**

- Understand the core idea of Production Guardrails for Async Thunks.
- Apply the pattern using clean, readable code.
- Avoid common mistakes through predictable React flow.

## Key Concepts

- Async thunk generation
- Lifecycle state transitions
- Error payload handling
- Component dispatch integration
- Request deduping awareness

- Quality guardrail mindset

## Visual Concept Map

```mermaid
flowchart TD
		A[dispatch(fetchThunk)] --> B[pending]
		B --> C[fulfilled]
		B --> D[rejected]
		C --> E[data in store]
		D --> F[error in store]
```

## End-to-End Practical

1. Create async thunk for API call.
2. Add slice status and error fields.
3. Handle pending/fulfilled/rejected in extraReducers.
4. Dispatch thunk in component lifecycle.
5. Render loading/error/data states.

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
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch";
      });
  },
});
```

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
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;
  return items.slice(0, 5).map((p) => <p key={p.id}>{p.title}</p>);
}
```

### Example 3: Case - Retry Failed Thunk Request

Scenario:
Support dashboard should allow retry when initial fetch fails.

```jsx
function RetryBlock() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.products);

  if (status !== "failed") return null;
  return <button onClick={() => dispatch(fetchProducts())}>Retry</button>;
}
```

## Mini Exercise

Scenario:
You are building an employee management console.

Create thunk `fetchEmployees`, handle pending/fulfilled/rejected, and render list with retry button.

Expected output:

- UI reflects loading/success/error states
- Error message is user-friendly
- Retry dispatches same thunk again

## Assessment Quiz

### Quiz Questions

1. What lifecycle actions does createAsyncThunk generate?
2. Where are thunk lifecycle handlers usually written?
3. True or False: rejected case should never update error state.
4. Why use rejectWithValue?
5. How do you avoid repeated duplicate fetch calls?

### Quiz Answers

1. pending, fulfilled, rejected
2. slice extraReducers
3. False
4. To pass controlled error payloads to reducer
5. Check request status before dispatching again

## Task

- Build one async thunk flow end-to-end
- Handle three lifecycle states in UI
- Complete mini exercise

## Self Check

- You can wire async thunks to slice lifecycle reducers
- You can build resilient loading/error UX
- You can answer at least 4 out of 5 quiz questions correctly

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

### Advanced

**Question:** When would you cancel or ignore stale thunk results?

**Answer:** During rapid parameter changes to avoid outdated UI updates.

**Question:** What architecture decision separates thunk and UI concerns?

**Answer:** Keep API logic in thunks, rendering state decisions in components.

## Day 54 Outcome

- You can implement robust async Redux workflows with lifecycle handling
- You can manage API states predictably in the store
- You are ready for RTK Query abstraction in Day 55

