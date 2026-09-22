# Day 008 — Strings & Objects — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

anagram and longest unique substring

## Executable JavaScript

```js
function isAnagram(a, b) {
  if (a.length !== b.length) return false;
  const count = new Map();
  for (const char of a) count.set(char, (count.get(char) ?? 0) + 1);
  for (const char of b) {
    const next = (count.get(char) ?? 0) - 1;
    if (next < 0) return false;
    count.set(char, next);
  }
  return true;
}

function longestUnique(text) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < text.length; right++) {
    const previous = lastSeen.get(text[right]);
    if (previous !== undefined) left = Math.max(left, previous + 1);
    lastSeen.set(text[right], right);
    best = Math.max(best, right - left + 1);
  }
  return best;
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
