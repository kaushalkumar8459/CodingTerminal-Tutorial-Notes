# Day 016 — Dropbox, Roblox, Palantir & Rippling — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

file tree and undo/redo history

## Executable JavaScript

```js
function buildTree(nodes) {
  const byId = new Map(nodes.map(node => [node.id, { ...node, children: [] }]));
  const root = [];
  for (const node of nodes) {
    const item = byId.get(node.id);
    if (node.parentId == null) root.push(item);
    else byId.get(node.parentId)?.children.push(item);
  }
  return root;
}

function createHistory(initial) {
  const past = [], future = [];
  let current = initial;
  return {
    get: () => current,
    set(next) { past.push(current); current = next; future.length = 0; },
    undo() { if (past.length) { future.push(current); current = past.pop(); } },
    redo() { if (future.length) { past.push(current); current = future.pop(); } }
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
