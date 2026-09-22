# Day 004 — DOM & Async — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

event delegation, debounce, abortable fetch

## Executable JavaScript

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

list.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (button && list.contains(button)) console.log(button.dataset.id);
});

async function loadUser(id, signal) {
  const response = await fetch("/api/users/" + id, { signal });
  if (!response.ok) throw new Error("HTTP " + response.status);
  return response.json();
}
```

## How to Explain It

- Start with the requirement and assumptions.
- Explain the data structure or runtime behavior.
- State time and space complexity.
- Walk through one normal case and one edge case.
- Mention a production trade-off or failure mode.

## Edge Cases

- Empty input
- Single item
- Duplicate values
- Invalid input
- Large input
- Repeated calls or concurrent operations where applicable

## Follow-Up Questions

1. Can you improve the complexity?
2. What changes for very large input?
3. How would you test it?
4. How would you handle cancellation or failure?
5. What changes in a browser/UI implementation?
