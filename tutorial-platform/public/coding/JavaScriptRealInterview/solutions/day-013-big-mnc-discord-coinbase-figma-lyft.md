# Day 013 — Discord, Coinbase, Figma & Lyft — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

EventEmitter and normalized state

## Executable JavaScript

```js
class EventEmitter {
  #events = new Map();
  on(event, listener) {
    const listeners = this.#events.get(event) ?? new Set();
    listeners.add(listener); this.#events.set(event, listeners);
    return () => this.off(event, listener);
  }
  off(event, listener) { this.#events.get(event)?.delete(listener); }
  emit(event, ...args) {
    for (const listener of this.#events.get(event) ?? []) listener(...args);
  }
}
// Normalize shared entities by stable ID when many UI views update the same entity.
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
