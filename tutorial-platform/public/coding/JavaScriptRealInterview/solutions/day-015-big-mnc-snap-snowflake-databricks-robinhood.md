# Day 015 — Snap, Snowflake, Databricks & Robinhood — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

rate limiting and batching

## Executable JavaScript

```js
function createRateLimiter(limit, windowMs) {
  const timestamps = [];
  return function allowed() {
    const now = Date.now();
    while (timestamps.length && timestamps[0] <= now - windowMs) timestamps.shift();
    if (timestamps.length >= limit) return false;
    timestamps.push(now); return true;
  };
}

async function batch(items, size, worker) {
  const output = [];
  for (let i = 0; i < items.length; i += size) {
    output.push(...await Promise.all(items.slice(i, i + size).map(worker)));
  }
  return output;
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
