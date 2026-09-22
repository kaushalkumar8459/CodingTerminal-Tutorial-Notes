# Day 005 — Company-Style Challenges — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

retry with backoff and concurrency limiting

## Executable JavaScript

```js
async function retry(task, attempts = 3, baseDelay = 200) {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try { return await task(); }
    catch (error) {
      lastError = error;
      if (i === attempts - 1) break;
      await new Promise(resolve => setTimeout(resolve, baseDelay * 2 ** i));
    }
  }
  throw lastError;
}

async function mapWithLimit(items, limit, worker) {
  const result = new Array(items.length);
  let next = 0;
  async function run() {
    while (true) {
      const index = next++;
      if (index >= items.length) return;
      result[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return result;
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
