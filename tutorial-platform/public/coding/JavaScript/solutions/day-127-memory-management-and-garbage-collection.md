# Day 127 Solutions — Memory Management & Garbage Collection

## 1. WeakMap metadata

```js
const metadata = new WeakMap();

const user = { id: 1 };

metadata.set(user, { lastAccessed: Date.now() });

console.log(metadata.get(user));
```

When `user` becomes unreachable elsewhere, the WeakMap entry does not keep it alive.

## 2. Timer leak pattern

Risky:

```js
const timerId = setInterval(() => {
  // long-lived work
}, 1000);
```

Cleanup:

```clearInterval(timerId);```

## 3. Event-listener cleanup

```js
function mount(button) {
  const controller = new AbortController();

  button.addEventListener("click", handleClick, {
    signal: controller.signal
  });

  return () => controller.abort();
}
```

This makes ownership and cleanup explicit.

## Interview Takeaway

A memory leak is generally **memory that remains reachable when the application no longer needs it**. Garbage collection cannot reclaim an object while reachable references still exist.
