# Day 006 — 100+ Question Bank — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

flatten, groupBy and memoization

## Executable JavaScript

```js
function flatten(values) {
  const result = [], stack = [...values].reverse();
  while (stack.length) {
    const value = stack.pop();
    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) stack.push(value[i]);
    } else result.push(value);
  }
  return result;
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = item[key];
    (groups[value] ??= []).push(item);
    return groups;
  }, {});
}

function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
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
