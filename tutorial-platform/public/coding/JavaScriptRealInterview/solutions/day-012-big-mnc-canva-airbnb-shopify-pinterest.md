# Day 012 — Canva, Airbnb, Shopify & Pinterest — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

debounced search and pagination

## Executable JavaScript

```js
function createSearch(load) {
  let timer, requestId = 0;
  return (query, onResult) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const id = ++requestId;
      const result = await load(query);
      if (id === requestId) onResult(result);
    }, 300);
  };
}

function pageInfo(total, page, pageSize) {
  const pages = Math.ceil(total / pageSize);
  return { page, pageSize, pages, hasPrevious: page > 1, hasNext: page < pages };
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
