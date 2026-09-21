---
title: Memory Management
slug: day-106-memory-management
dayLabel: Day 106
level: Advanced
estimatedMinutes: 25
order: 106
track: javascript
---

# Day 106 [Advanced]: Memory Management

## Goal

Understand the JavaScript memory lifecycle, garbage collection, and the most common causes of memory leaks in real applications.

## Prerequisites

- Day 74–75 (WeakMap/WeakSet, a preview of garbage collection concerns)

## Explanation

JavaScript manages memory automatically through a process called **garbage collection** — memory allocated for values (objects, arrays, closures) is automatically freed once nothing in your program can reach/reference them anymore. A **memory leak** happens when memory that's no longer actually needed CAN'T be freed, because something is still (often accidentally) holding a reference to it — over time, this can slow down or crash long-running applications.

## Topic by Topic

### Topic 1: The memory lifecycle

Theory:
Memory goes through three phases: **allocation** (memory is reserved when you create a value), **use** (your program reads/writes that memory), and **release** (memory is freed once nothing references the value anymore).

Code Example:

```js
function createUser() {
  const user = { name: "Zoe" }; // allocation - memory reserved for this object
  console.log(user.name); // use
  return user;
}

let myUser = createUser();
myUser = null; // removes the only reference - object becomes eligible for release
```

**Explanation:** Once `myUser` is set to `null`, NOTHING in the program can reach the original `{ name: "Zoe" }` object anymore — the garbage collector can now safely reclaim that memory.

**Key Points:**

- Allocation happens automatically whenever you create objects, arrays, functions, etc.
- Memory is only released once NOTHING references a value anymore — this is called being "unreachable."
- You don't manually free memory in JavaScript — the garbage collector handles this automatically.

### Topic 2: How garbage collection decides what to free

Theory:
The garbage collector periodically checks which values are still "reachable" (accessible from anywhere your program could still use them) — anything unreachable gets cleaned up.

Code Example:

```js
let objA = { data: "important" };
let objB = objA; // objB now ALSO references the same object

objA = null; // objA no longer references it, but objB STILL does
// The object is NOT garbage collected yet - objB keeps it reachable

objB = null; // NOW nothing references it - eligible for garbage collection
```

**Explanation:** The object isn't freed after just `objA = null`, because `objB` still provides a path to reach it — only once ALL references are gone does it become eligible for cleanup.

**Key Points:**

- "Reachability" means: can this value still be accessed from anywhere your running program could look?
- Multiple variables can reference the same object — ALL references must be gone before cleanup.
- This is exactly why closures (Day 57) can keep variables "alive" long after their outer function finished — the closure IS a reference keeping them reachable.

### Topic 3: Common causes of memory leaks

Theory:
Memory leaks in JavaScript typically come from accidentally-retained references: forgotten event listeners, growing caches/arrays that are never cleared, and unintentional closures holding onto large data.

Code Example:

```js
// LEAK RISK - listener never removed, element/closure could be retained indefinitely
function setupButton() {
  const button = document.querySelector("#myButton");
  let largeData = new Array(1000000).fill("data"); // large, unnecessary data
  button.addEventListener("click", () => {
    console.log(largeData.length); // this closure keeps "largeData" alive forever
  });
}
```

**Explanation:** As long as `button`'s click listener exists, the closure (and therefore `largeData`) can NEVER be garbage collected — even if this data is only needed briefly, it stays in memory for the entire lifetime of the listener.

**Key Points:**

- Event listeners that are never removed (Day 95's `removeEventListener`) are a classic leak source.
- Closures accidentally holding onto large, no-longer-needed data is a common, subtle leak cause.
- Ever-growing arrays/caches (like an unbounded `Map` cache) that never remove old entries can also leak memory over time.

### Topic 4: Practical steps to avoid leaks

Theory:
Cleaning up event listeners when no longer needed, avoiding unnecessary closures over large data, and using `WeakMap`/`WeakSet` (Day 74) where appropriate are the main practical defenses.

Code Example:

```js
function setupButtonSafely() {
  const button = document.querySelector("#myButton");
  function handleClick() {
    console.log("Clicked");
  }
  button.addEventListener("click", handleClick);

  // later, when no longer needed:
  button.removeEventListener("click", handleClick);
}
```

**Explanation:** Explicitly removing the listener (using a NAMED function reference, as covered on Day 95) allows the browser to eventually clean up both the listener and anything it was keeping alive via closure.

**Key Points:**

- Always remove event listeners you no longer need, especially in longer-lived applications.
- Be mindful of what large data a closure might be unnecessarily keeping alive.
- `WeakMap`/`WeakSet` (Day 74) are specifically designed to avoid this class of leak for object-keyed metadata.

## Recap

- Memory goes through allocation, use, and release — release happens automatically once a value is unreachable.
- Multiple references (including closures) can keep a value alive; ALL must be gone before garbage collection.
- Common leak causes: unremoved event listeners, unnecessary closures over large data, and ever-growing caches — mitigate with cleanup and `WeakMap`/`WeakSet` where appropriate.

## What's Next

Practice for today: `public/coding/JavaScript/day-106-debounce.md` — build a debounced search box. Day 107 covers debouncing and throttling in full depth.
