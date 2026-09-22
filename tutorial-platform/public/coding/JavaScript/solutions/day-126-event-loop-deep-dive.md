# Day 126 Solutions — Event Loop Deep Dive

## 1. Predict execution order

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

queueMicrotask(() => console.log("D"));

console.log("E");
```

Output:

```text
A
E
C
D
B
```

Synchronous code runs first. Microtasks run after the current task completes. The timer callback runs in a later task.

## 2. requestAnimationFrame

Use `requestAnimationFrame` when the work updates the visual frame:

```js
requestAnimationFrame(() => {
  element.style.transform = "translateX(100px)";
});
```

## 3. MutationObserver

```js
const observer = new MutationObserver((records) => {
  console.log(records.length);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Later
observer.disconnect();
```

## Interview Takeaway

Remember: **sync code → microtasks → browser scheduling/rendering opportunities → later tasks**. Exact rendering details are browser/runtime dependent, so avoid claiming a universal paint order for every situation.

## Complexity

Event-loop scheduling is not an algorithmic complexity problem. Focus on ordering, blocking time, and lifecycle cleanup.
