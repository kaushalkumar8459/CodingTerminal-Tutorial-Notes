# Day 010 — Apple, Netflix, Uber & LinkedIn — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

LRU cache and promise timeout

## Executable JavaScript

```js
class LRUCache {
  #limit; #map = new Map();
  constructor(limit) { this.#limit = limit; }
  get(key) {
    if (!this.#map.has(key)) return undefined;
    const value = this.#map.get(key);
    this.#map.delete(key); this.#map.set(key, value);
    return value;
  }
  set(key, value) {
    this.#map.delete(key); this.#map.set(key, value);
    if (this.#map.size > this.#limit) this.#map.delete(this.#map.keys().next().value);
  }
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms))
  ]);
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
