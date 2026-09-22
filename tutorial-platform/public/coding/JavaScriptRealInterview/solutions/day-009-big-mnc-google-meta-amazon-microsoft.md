# Day 009 — Google, Meta, Amazon & Microsoft — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

deep clone and Promise.all

## Executable JavaScript

```js
function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  if (value instanceof Date) return new Date(value);
  const copy = Array.isArray(value) ? [] : {};
  seen.set(value, copy);
  for (const key of Reflect.ownKeys(value)) copy[key] = deepClone(value[key], seen);
  return copy;
}

function promiseAll(values) {
  return new Promise((resolve, reject) => {
    const items = Array.from(values);
    if (!items.length) return resolve([]);
    const result = new Array(items.length);
    let completed = 0;
    items.forEach((item, index) => {
      Promise.resolve(item).then(value => {
        result[index] = value;
        completed++;
        if (completed === items.length) resolve(result);
      }, reject);
    });
  });
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
