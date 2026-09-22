# Day 003 — Polyfills & Core APIs — Detailed Solutions

> Original practice solutions for interview preparation. Company names in the filename identify the topic group; they do not mean every exercise below is a verified question from that company.

## Problems Covered

map/filter/call polyfills and callback semantics

## Executable JavaScript

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (this == null || typeof callback !== "function") {
    throw new TypeError("Invalid arguments");
  }
  const source = Object(this);
  const result = new Array(source.length);
  for (let i = 0; i < source.length; i++) {
    if (i in source) result[i] = callback.call(thisArg, source[i], i, source);
  }
  return result;
};

Function.prototype.myCall = function (context, ...args) {
  const target = context == null ? globalThis : Object(context);
  const key = Symbol("fn");
  target[key] = this;
  try { return target[key](...args); }
  finally { delete target[key]; }
};
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
