---
title: Cleanup Functions
slug: day-024-cleanup-functions
dayLabel: Day 24
level: Intermediate
estimatedMinutes: 120
order: 24
track: react
---
# Day 24 [Intermediate]: Effect Cleanup, Cancellation & Race Conditions

## Goal

Master the cleanup function returned by `useEffect`, including timers, event listeners, subscriptions, async work, `AbortController`, dependency changes, Strict Mode, and race-condition prevention.

## Prerequisites

- Days 22–23
- `useEffect` dependencies
- JavaScript promises and events

## The Core Rule

An effect can return a cleanup function:

```jsx
useEffect(() => {
  const connection = connect();

  return () => {
    connection.disconnect();
  };
}, []);
```

Cleanup runs:

1. before React runs the effect again because dependencies changed
2. when the component is removed from the tree
3. during development Strict Mode's extra setup/cleanup cycle

Cleanup is not "only for unmount." Its primary purpose is to **stop or undo the synchronization established by the previous effect setup**.

## Setup → Cleanup Pair

Think in pairs:

```text
setup external synchronization
        ↓
external system is active
        ↓
dependencies change / component unmounts
        ↓
cleanup previous synchronization
        ↓
new setup, if needed
```

A good cleanup should be safe and should undo what the setup created.

## Topic 1 — Timers

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Without cleanup, the interval can continue after the component is removed.

### Timeout

```jsx
useEffect(() => {
  const id = setTimeout(() => {
    console.log("done");
  }, 1000);

  return () => clearTimeout(id);
}, []);
```

## Topic 2 — Event Listeners

The same function reference must be removed:

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

Do not create one anonymous function for `addEventListener` and a different anonymous function for removal; they are different references.

## Topic 3 — Subscriptions

Any external subscription should have a matching unsubscribe operation:

```jsx
useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    console.log("store changed");
  });

  return unsubscribe;
}, []);
```

This pattern is common with event emitters, WebSockets, browser observers, and external stores.

## Topic 4 — Cleanup on Dependency Change

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(roomId);
  }, 1000);

  return () => clearInterval(id);
}, [roomId]);
```

When `roomId` changes:

```text
old interval cleanup
        ↓
new effect setup
```

This prevents multiple room-specific timers from remaining active.

## Topic 5 — Abort Fetch Requests

For network requests, `AbortController` can cancel a fetch that is no longer relevant:

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
      if (error.name !== "AbortError") {
        setError(error);
      }
    }
  }

  loadUser();

  return () => controller.abort();
}, [userId]);
```

When `userId` changes, the previous request is aborted before the new synchronization starts.

## Topic 6 — Cancellation vs Ignore Flag

Another approach is to allow the request to finish but ignore a stale result:

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

This does **not cancel the network request**. It only prevents a stale response from updating this component's state. `AbortController` is preferable when the underlying API supports cancellation and you want to stop unnecessary work.

## Topic 7 — Race Conditions

Suppose the user searches:

```text
react → react hooks → react hooks useEffect
```

Request A may start first but finish last. Without cancellation or stale-result protection, an old response can overwrite newer data.

Correct mental model:

```text
Query A starts
Query B starts
B finishes → show B
A finishes later → ignore/cancel A
```

Cleanup creates the boundary between the old synchronization and the new one.

## Topic 8 — Cleanup Is Not Needed Everywhere

No cleanup is necessary for an effect that only performs a one-way synchronization such as:

```jsx
useEffect(() => {
  document.title = title;
}, [title]);
```

There is no ongoing resource created that needs teardown.

Do not return meaningless cleanup functions merely because every effect "should" have one.

## Topic 9 — Strict Mode

In development Strict Mode, React may execute:

```text
setup → cleanup → setup
```

This is intentional. If this causes duplicate subscriptions or timers, the effect likely does not clean up correctly.

Do not solve the symptom by adding a ref that prevents setup from running. Make the setup/cleanup pair correct.

## Topic 10 — Idempotent Cleanup

Cleanup should be safe to run as part of the normal effect lifecycle.

Good:

```jsx
return () => clearInterval(id);
```

The intent is straightforward: release the resource established by setup.

## Topic 11 — Dependency and Cleanup Together

```jsx
useEffect(() => {
  const socket = connect(roomId);

  return () => {
    socket.disconnect();
  };
}, [roomId]);
```

The dependency describes **which synchronization is active**; cleanup describes **how to stop the previous synchronization**.

## End-to-End Practical — Search With Cancellation

```jsx
import { useEffect, useState } from "react";

export default function Search({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function runSearch() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
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
  if (error) return <p>{error}</p>;

  return <pre>{JSON.stringify(results, null, 2)}</pre>;
}
```

### Why the `finally` guard?

If an old request is aborted because a newer query started, its `finally` block can still execute. The guard prevents that old request from incorrectly turning off the loading state for the newer request.

## Common Mistakes

### 1. Forgetting cleanup for intervals

Creates background work that survives the intended lifetime.

### 2. Removing the wrong event handler reference

`removeEventListener` must receive the same function identity used for registration.

### 3. Treating `AbortController` as a stale-data guarantee

Cancellation and stale-result protection are related but distinct concerns. A server may have already processed a request even if the browser aborts reading it.

### 4. Updating state after an old request wins

Use cancellation or an ignore strategy.

### 5. Adding cleanup to every effect

Only ongoing/teardown-required work needs cleanup.

### 6. Disabling Strict Mode

Strict Mode is useful for finding effects that cannot be safely started and stopped.

## Debugging Lab

### Bug 1 — Duplicate interval

```jsx
useEffect(() => {
  setInterval(() => console.log("tick"), 1000);
}, []);
```

Find the missing cleanup.

### Bug 2 — Duplicate resize listeners

Explain why failing to remove a listener can cause the handler to fire multiple times after remount/re-synchronization.

### Bug 3 — Search race

Simulate two delayed requests and make the older response arrive last. Add cancellation or an ignore strategy so the newest query wins.

## Exercises

### Level 1
- Build a timer with cleanup.
- Build a window resize listener.

### Level 2
- Build a debounced search using `setTimeout` cleanup.
- Add `AbortController` to a fetch effect.

### Level 3
- Build a room subscription that changes when `roomId` changes.
- Explain setup/cleanup behavior under Strict Mode.
- Implement both abort and ignore approaches and compare them.

## Assessment

1. When does cleanup run?
2. Why is cleanup needed for an interval?
3. Why must event-listener references match?
4. What happens when a dependency changes?
5. What is a race condition in async effects?
6. What does `AbortController` actually do?
7. How does an ignore flag differ from aborting?
8. Why does Strict Mode run setup/cleanup again in development?
9. Which effects do not need cleanup?
10. What does a correct setup/cleanup pair look like?

## Interview Questions

**Does cleanup run only on unmount?**  
No. It also runs before an effect re-runs because its dependencies changed.

**How do you cancel a fetch?**  
Create an `AbortController`, pass its signal to `fetch`, and call `controller.abort()` in cleanup.

**Does abort guarantee the server never processed the request?**  
No. It primarily cancels the client-side fetch operation; the server may already have received or processed the request.

**How do you prevent stale search results?**  
Cancel obsolete requests when possible, or ignore responses that no longer correspond to the latest synchronization.

**Why does Strict Mode help test cleanup?**  
It intentionally exercises setup/cleanup behavior in development, exposing effects that leave resources behind.

## Final Checklist

- [ ] Can clean up timers
- [ ] Can remove event listeners
- [ ] Can unsubscribe from external subscriptions
- [ ] Understand dependency-change cleanup
- [ ] Can use `AbortController`
- [ ] Understand stale-response races
- [ ] Understand ignore vs cancellation
- [ ] Understand Strict Mode setup/cleanup
- [ ] Know when cleanup is unnecessary

## Day 24 Outcome

You can now build reversible effect synchronizations and protect asynchronous UI from stale work. Day 25 applies this to API fetching with loading, errors, retries, and request cancellation.