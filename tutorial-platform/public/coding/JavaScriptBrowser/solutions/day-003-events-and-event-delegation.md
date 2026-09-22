# Day 003 Solutions — Events & Event Delegation

## Event Delegation

```js
list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");

  if (!button || !list.contains(button)) {
    return;
  }

  button.closest("li")?.remove();
});
```

One listener can handle current and future matching children because the event bubbles to the parent.

## Cleanup with AbortController

```js
const controller = new AbortController();

button.addEventListener("click", handleClick, {
  signal: controller.signal
});

// cleanup
controller.abort();
```

## Interview Takeaway

Use `target` for the original event target and `currentTarget` for the element whose listener is currently running.
