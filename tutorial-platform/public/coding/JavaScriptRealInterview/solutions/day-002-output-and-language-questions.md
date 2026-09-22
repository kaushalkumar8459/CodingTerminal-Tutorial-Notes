# Day 002 — Output & Language — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

coercion, equality, closures, hoisting and TDZ

## Executable JavaScript

```js
console.log(typeof null);       // "object"
console.log(typeof NaN);        // "number"
console.log(1 + "2" + 3);       // "123"
console.log(1 + 2 + "3");       // "33"

function createCounter() {
  let count = 0;
  return () => ++count;
}
// Explain coercion and lexical scope instead of memorizing outputs.
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
