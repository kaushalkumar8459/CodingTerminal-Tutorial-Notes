---
title: Effect Cleanup, Cancellation & Race Conditions
slug: day-024-cleanup-functions
dayLabel: Day 24
level: Intermediate
estimatedMinutes: 150
order: 24
track: react
---
# Day 24 [Intermediate]: Effect Cleanup, Cancellation & Race Conditions

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Learning Outcomes](#learning-outcomes)
- [Core Mental Model](#core-mental-model)
- [Cleanup Lifecycle](#cleanup-lifecycle)
- [Topic by Topic](#topic-by-topic)
- [End-to-End Practical](#end-to-end-practical)
- [Common Mistakes](#common-mistakes)
- [Debugging Lab](#debugging-lab)
- [Hands-on Exercises](#hands-on-exercises)
- [Assessment Quiz](#assessment-quiz)
- [Interview Questions and Answers](#interview-questions-and-answers)
- [Production Checklist](#production-checklist)
- [Day 24 Outcome](#day-24-outcome)

## Goal

Master the cleanup function returned by `useEffect` and understand **resource ownership, dependency changes, cancellation, stale asynchronous work, race conditions, and Strict Mode**.

The goal is not to memorize `return () => ...`. The goal is to reason about an effect as a synchronization that must have a clear lifetime:

> **What did setup start, and exactly how do I stop or invalidate that work when the synchronization is no longer current?**

## Prerequisites

- Days 22–23
- `useEffect` lifecycle
- Dependency arrays
- JavaScript promises and async/await
- Browser events and timers
- Basic error handling

## Learning Outcomes

By the end of Day 24 you can:

- explain exactly when cleanup runs
- pair every ongoing resource with teardown
- clean up intervals, timeouts, listeners, subscriptions, and observers
- cancel obsolete `fetch` requests with `AbortController`
- distinguish cancellation from stale-result protection
- diagnose race conditions in async effects
- understand cleanup when dependencies change
- reason about Strict Mode setup → cleanup → setup
- avoid unnecessary cleanup and unnecessary effects
- design effect setup/cleanup as a reversible pair

## Core Mental Model

An effect establishes a synchronization for the current committed render.

```text
Render
  ↓
Commit
  ↓
Effect setup
  ↓
External resource active
  ↓
Dependency changes OR component unmounts
  ↓
Cleanup previous synchronization
  ↓
New setup, if the effect still applies
```

Think in pairs:

```text
SETUP                         CLEANUP
────────────────────          ────────────────────
setInterval(...)       ↔      clearInterval(id)
setTimeout(...)        ↔      clearTimeout(id)
addEventListener(...)  ↔      removeEventListener(...)
subscribe(...)         ↔      unsubscribe()
observer.observe(...)  ↔      observer.disconnect()
connect(...)            ↔      disconnect()
fetch(..., signal)      ↔      controller.abort()
```

The cleanup should undo, stop, disconnect, unsubscribe, or invalidate the work established by the corresponding setup.

## Cleanup Lifecycle

Cleanup does **not** mean "code that only runs when the component unmounts."

For an effect with dependencies, the important lifecycle is:

```text
render A
  ↓
commit A
  ↓
setup A
  ↓
render B with changed dependency
  ↓
commit B
  ↓
cleanup A
  ↓
setup B
```

When the component is removed, React also runs the cleanup for the active effect.

Development Strict Mode can intentionally exercise an extra setup → cleanup → setup sequence. Correct effects must tolerate that lifecycle without leaking resources.

## Topic by Topic

### 1. Timer Cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Without cleanup, the interval can continue after the component's synchronization ends.

#### Timeout

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log("done");
  }, 1000);

  return () => clearTimeout(id);
}, []);
```

### 2. Event Listener Cleanup

The listener identity must match:

```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

This is wrong:

```jsx
window.addEventListener("resize", () => console.log("resize"));

window.removeEventListener("resize", () => console.log("resize"));
```

Those are two different function objects.

### 3. Subscription Cleanup

External subscriptions should provide an unsubscribe mechanism:

```jsx
useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    console.log("store changed");
  });

  return unsubscribe;
}, []);
```

The same principle applies to event emitters, WebSockets, browser observers, and other long-lived external resources.

### 4. Cleanup When Dependencies Change

```jsx
useEffect(() => {
  const connection = connectToRoom(roomId);

  return () => {
    connection.disconnect();
  };
}, [roomId]);
```

When `roomId` changes, the old room connection must be stopped before the new synchronization is established.

```text
room-a connection
      ↓
roomId changes to room-b
      ↓
disconnect room-a
      ↓
connect room-b
```

This is one of the most important reasons cleanup is more than an unmount concept.

### 5. Abort Fetch Requests

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      if (error?.name === "AbortError") {
        return;
      }

      setError(error instanceof Error ? error : new Error("Request failed"));
    }
  }

  loadUser();

  return () => controller.abort();
}, [userId]);
```

`AbortController` signals cancellation to supported browser APIs such as `fetch`. It can stop the client-side operation when that request is no longer relevant.

Important: aborting the client request does **not** guarantee that the server has not already received or processed the request. Cancellation is not a server-side rollback.

### 6. Cancellation vs Ignore Flag

Sometimes you cannot cancel the underlying work, or you still need stale-result protection:

```jsx
useEffect(() => {
  let ignore = false;

  async function load() {
    const response = await fetch(url);
    const data = await response.json();

    if (!ignore) {
      setData(data);
    }
  }

  load();

  return () => {
    ignore = true;
  };
}, [url]);
```

This does **not** cancel the network request. It only invalidates the old result for this effect instance.

Comparison:

| Technique | Cancels supported client-side work? | Prevents stale UI update? |
|---|---:|---:|
| `AbortController` | Yes, when the API supports abort | Usually, but explicit stale-result protection may still be useful |
| Ignore flag | No | Yes |
| Both | Yes, when supported | Yes |

Use cancellation when useful, but understand that **cancellation and correctness are separate concerns**.

### 7. Race Conditions

Suppose the user changes a search query quickly:

```text
A: react
B: react hooks
C: react hooks useEffect
```

A request may start first but finish last.

```text
A starts ─────────────────────── finishes
B starts ─────── finishes
C starts ─────────────── finishes

Desired UI: C
Danger:      A overwrites C
```

A robust design ensures obsolete work cannot win:

```text
C finishes → show C
A finishes later → cancelled or ignored
```

Cleanup provides the lifecycle boundary that identifies A as obsolete when the dependency changes.

### 8. Debounced Work

Cleanup can cancel a scheduled timeout before it fires:

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    search(query);
  }, 300);

  return () => clearTimeout(id);
}, [query]);
```

If the user types again within 300 ms, the previous timeout is cleared and a new one is scheduled.

This is a common practical use of cleanup, but remember that debouncing and request cancellation are separate mechanisms.

### 9. Browser Observers

The same lifecycle applies to observers:

```jsx
useEffect(() => {
  if (!element) return;

  const observer = new ResizeObserver(() => {
    console.log("resized");
  });

  observer.observe(element);

  return () => observer.disconnect();
}, [element]);
```

The exact teardown method depends on the external API. In real code, make sure the referenced element exists before observing it.

### 10. WebSocket / Connection Cleanup

```jsx
useEffect(() => {
  const socket = new WebSocket(url);

  function handleMessage(event) {
    console.log(event.data);
  }

  socket.addEventListener("message", handleMessage);

  return () => {
    socket.removeEventListener("message", handleMessage);
    socket.close();
  };
}, [url]);
```

If the URL changes, the previous socket belongs to the old synchronization and must be closed.

If `handleMessage` is defined outside the effect and depends on changing values, those values must be represented correctly in the effect's dependencies or the handler must be designed to avoid stale values.

### 11. Effects That Do Not Need Cleanup

Not every effect creates a resource:

```jsx
useEffect(() => {
  document.title = title;
}, [title]);
```

There is no ongoing subscription, timer, connection, or listener to tear down.

Do **not** return meaningless cleanup simply because an effect exists.

### 12. State Updates in Cleanup

Avoid treating cleanup as a general place to reset component state:

```jsx
return () => {
  setLoading(false);
};
```

Cleanup's primary responsibility is to undo the external synchronization. State updates in cleanup can be unnecessary or misleading, especially when the component is being removed.

If a state transition is required for an active synchronization, model it deliberately rather than using cleanup as a generic reset hook.

### 13. Strict Mode

Development Strict Mode may exercise:

```text
setup
  ↓
cleanup
  ↓
setup
```

This helps reveal code such as:

```jsx
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);
```

because the listener is never removed.

Do not hide the problem with a ref that prevents setup. Make setup and cleanup symmetrical.

### 14. Idempotent / Safe Teardown

Cleanup should be designed around the resource created by that specific setup.

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);

  return () => clearInterval(id);
}, []);
```

The cleanup closes over the exact resource it owns. This is safer than trying to maintain a global timer ID shared by unrelated component instances.

## End-to-End Practical — Search With Cancellation

```jsx
import { useEffect, useState } from "react";

export default function Search({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }

        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    runSearch();

    return () => controller.abort();
  }, [query]);

  if (loading) return <p>Searching...</p>;
  if (error) return <p role="alert">{error}</p>;

  return <pre>{JSON.stringify(results, null, 2)}</pre>;
}
```

### Why the `finally` guard?

An obsolete request may reject because it was aborted. Its `finally` block can still execute. The guard prevents that old effect instance from incorrectly setting `loading` to `false` while a newer request is active.

### Production Consideration

For larger applications, API caching, deduplication, retries, pagination, and request state are often better handled by a dedicated data-fetching layer. Day 24 teaches the underlying effect lifecycle; it is not suggesting that every production application should build a complete server-state library by hand.

## Common Mistakes

### 1. Forgetting timer cleanup

Creates work that can survive the intended synchronization lifetime.

### 2. Removing a different event handler reference

`removeEventListener` must receive the same listener identity used during registration.

### 3. Treating abort as a server-side rollback

Client-side abort does not undo server-side work that may already have happened.

### 4. Ignoring stale async results

An older request can finish after a newer request and overwrite current UI state.

### 5. Adding cleanup to every effect

Only ongoing/teardown-requiring synchronization needs cleanup.

### 6. Resetting state generically in cleanup

Cleanup is primarily about external resources, not a universal state-reset mechanism.

### 7. Disabling Strict Mode

Strict Mode helps reveal incorrect setup/cleanup assumptions during development.

### 8. Using one global resource for multiple component instances

Keep resource ownership local to the effect instance whenever possible.

### 9. Debounce mistaken for cancellation

Clearing a timeout prevents scheduled work from starting. It does not cancel a request that has already started.

### 10. Hiding dependencies to avoid stale closures

Do not remove a dependency merely to silence an effect warning. First decide whether the effect should depend on that value, whether the value belongs in the event handler instead, or whether the effect can be refactored.

## Debugging Lab

### Bug 1 — Duplicate interval

```jsx
useEffect(() => {
  setInterval(() => console.log("tick"), 1000);
}, []);
```

**Fix:** Store the ID and return `clearInterval(id)`.

### Bug 2 — Duplicate resize listeners

```jsx
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []);
```

**Fix:** Remove the same handler in cleanup.

### Bug 3 — Search race

Simulate two delayed requests where the older response arrives last. Add cancellation or an ignore strategy so the newest query wins.

### Bug 4 — Debounce misunderstanding

A timeout is cleared when the query changes, but the fetch has already started. Explain why `clearTimeout` cannot cancel that fetch and where `AbortController` belongs.

### Bug 5 — Incorrect loading reset

An old request's `finally` sets `loading(false)` after a new request has started. Explain why the controller/instance guard is needed.

### Bug 6 — Stale event handler

An effect registers a handler that reads a changing prop, but the dependency list omits that prop. Explain how the handler can observe an old value and propose a correct dependency/refactor strategy.

## Hands-on Exercises

### Level 1 — Timer

Build a timer that:

- starts an interval in an effect
- displays elapsed seconds
- clears the interval in cleanup

**Acceptance criteria**

- [ ] No duplicate intervals under Strict Mode development.
- [ ] Interval stops when the component is removed.
- [ ] Functional state update is used where appropriate.

### Level 2 — Resize Subscription

Subscribe to `window.resize` and display the current width.

**Acceptance criteria**

- [ ] Listener added in setup.
- [ ] Same listener removed in cleanup.
- [ ] No duplicate listeners after dependency changes.

### Level 3 — Debounced Search

Implement a 300 ms debounce before starting a search request.

**Acceptance criteria**

- [ ] Previous timeout is cleared when query changes.
- [ ] Empty query does not trigger a request.
- [ ] Debounce is not described as network cancellation.

### Level 4 — Abortable Search

Add `AbortController` to the request.

**Acceptance criteria**

- [ ] Controller is created per effect instance.
- [ ] Signal is passed to `fetch`.
- [ ] Cleanup aborts the obsolete request.
- [ ] `AbortError` is not shown as a user-facing error.
- [ ] Older requests cannot incorrectly win.

### Level 5 — Compare Strategies

Implement both an abort strategy and an ignore-result strategy.

Explain:

- what work each strategy stops
- what work each strategy does not stop
- why correctness and resource efficiency are different concerns

## Assessment Quiz

1. When does cleanup run?
2. Why is cleanup needed for an interval?
3. Why must event-listener references match?
4. What happens when a dependency changes?
5. What is a race condition in an async effect?
6. What does `AbortController` do?
7. How does an ignore flag differ from aborting?
8. Why does Strict Mode exercise setup/cleanup in development?
9. Which effects do not need cleanup?
10. Why is cleanup not a generic state-reset mechanism?
11. Why is debounce different from request cancellation?
12. Why should each effect instance own the resource it creates?
13. Why should you not simply remove a dependency to make an effect run less often?

### Answers

1. Before a changed-dependency effect runs again and when the component is removed; development Strict Mode can also exercise an extra setup/cleanup cycle.
2. To stop the interval when that synchronization is no longer active.
3. The browser removes the listener by matching the listener identity.
4. React cleans up the previous effect synchronization and then establishes the new one.
5. Older async work finishes after newer work and can overwrite current state.
6. It signals an abort to supported async APIs such as `fetch`, allowing obsolete client-side work to be cancelled.
7. Ignore prevents stale results from being applied but does not cancel the underlying request.
8. To expose effects that cannot be safely started, stopped, and restarted.
9. One-way synchronizations that create no ongoing resource, such as assigning `document.title`.
10. Cleanup's main responsibility is to reverse external synchronization; generic state resetting can create confusing or unnecessary transitions.
11. Debounce prevents scheduled work from starting; it cannot cancel work that has already started.
12. Local ownership makes setup/cleanup pairing deterministic and prevents unrelated component instances from interfering with each other.
13. Dependencies describe the reactive values used by the synchronization. Removing one without redesigning the effect can create stale closures or incorrect behavior; refactor the synchronization instead.

## Interview Questions and Answers

### Beginner

**Does cleanup run only on unmount?**

No. It also runs before an effect re-runs because its dependencies changed.

**What is the purpose of cleanup?**

To undo or stop the external synchronization established by the effect's previous setup.

**Give three cleanup examples.**

`clearInterval`, `removeEventListener`, and `unsubscribe` are common examples.

### Intermediate

**How do you cancel a fetch?**

Create an `AbortController`, pass its `signal` to `fetch`, and call `abort()` in cleanup.

**How do you prevent stale search results?**

Cancel obsolete requests when supported and/or ignore results belonging to an obsolete effect instance.

**Why is cleanup required when `roomId` changes?**

The old room connection is no longer the active synchronization and must be disconnected before connecting to the new room.

**Why does Strict Mode help find cleanup bugs?**

It exercises setup and cleanup in development so leaked listeners, timers, and connections become visible earlier.

### Advanced

**Does `AbortController` guarantee that the server never processed the request?**

No. It controls the client-side fetch operation. The server may already have received or processed the request.

**Why can an old request still affect state if it was aborted?**

Depending on timing and implementation, asynchronous control flow can still reach handlers/finally blocks. Code should explicitly handle aborts and protect current state transitions.

**Why is cleanup best understood as resource ownership?**

Each effect instance creates a synchronization resource and retains the exact handle needed to tear that resource down. This makes lifetimes explicit and prevents cross-instance interference.

**Why should you not use a ref simply to force an effect to run once under Strict Mode?**

That hides the lifecycle problem instead of making setup reversible. The effect should correctly support setup → cleanup → setup.

**How would you design a production search experience?**

Separate UI state from server-state concerns, debounce user input when appropriate, cancel obsolete requests where supported, protect against stale results, and consider caching/deduplication rather than putting every concern into one effect.

**Why is removing a dependency usually not the right optimization?**

A dependency is part of the synchronization contract. Removing it can make the effect read stale values. Optimize by changing the effect design, not by hiding a required dependency.

## Production Checklist

Before shipping an effect that creates ongoing work, verify:

- [ ] I can name the external system being synchronized.
- [ ] Setup creates one clearly owned resource.
- [ ] Cleanup reverses that resource.
- [ ] Cleanup uses the exact resource/handler created by setup.
- [ ] Dependencies describe when the synchronization should change.
- [ ] Dependency changes cannot leave the old resource active.
- [ ] Async work cannot let stale results overwrite current state.
- [ ] Abort is used where cancellation is supported and useful.
- [ ] Abort is not confused with server-side rollback.
- [ ] Debounce is not confused with cancellation.
- [ ] Strict Mode does not create duplicate resources.
- [ ] Cleanup is not being used as a generic state reset.
- [ ] Effects without ongoing resources do not have meaningless cleanup.
- [ ] The effect is not doing work that belongs in an event handler or render calculation.
- [ ] Required reactive dependencies are not removed merely to suppress re-runs.
- [ ] Event handlers used by subscriptions do not read stale values.

## Verification Checklist

- [ ] Can explain cleanup beyond "on unmount".
- [ ] Can explain setup → cleanup → setup.
- [ ] Can clean up timers.
- [ ] Can clean up event listeners.
- [ ] Can unsubscribe from external subscriptions.
- [ ] Can clean up observers/connections.
- [ ] Can reason about dependency-change cleanup.
- [ ] Can use `AbortController` correctly.
- [ ] Understand cancellation vs stale-result protection.
- [ ] Understand race conditions.
- [ ] Can implement debounce cleanup.
- [ ] Understand Strict Mode behavior.
- [ ] Know when cleanup is unnecessary.
- [ ] Can explain resource ownership.
- [ ] Can debug an effect leak.
- [ ] Can reason about stale closures in effect callbacks.
- [ ] Can explain the production trade-offs.

## Day 24 Outcome

You can now build **reversible effect synchronizations** instead of treating cleanup as an unmount-only trick. You understand timers, subscriptions, event listeners, connections, abortable requests, stale results, debouncing, race conditions, stale closures, and Strict Mode behavior.

**Next:** Day 25 — API calls with `fetch`, where these lifecycle principles are applied to real loading, error, empty, success, and request-state flows.
