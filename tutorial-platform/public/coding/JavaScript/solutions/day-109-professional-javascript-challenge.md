# Day 109 — Solution: Personal Utility Library

```js
export function debounce(fn, delay) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => fn.apply(this, args), delay);
  };
}
export function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    if (Date.now() - last >= interval) {
      last = Date.now();
      return fn.apply(this, args);
    }
  };
}
export function memoize(fn) {
  const cache = new Map();
  return (value) =>
    cache.has(value)
      ? cache.get(value)
      : (cache.set(value, fn(value)), cache.get(value));
}
export function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, deepClone(child)]),
  );
}
export function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const ak = Object.keys(a),
    bk = Object.keys(b);
  return (
    ak.length === bk.length &&
    ak.every((key) => Object.hasOwn(b, key) && deepEqual(a[key], b[key]))
  );
}
export function groupBy(array, keyFn) {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {});
}
export function chunk(array, size) {
  if (!Number.isInteger(size) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size));
  return result;
}
export function flatten(array, depth = Infinity) {
  return depth === 0
    ? array.slice()
    : array.reduce(
        (result, value) =>
          result.concat(
            Array.isArray(value) ? flatten(value, depth - 1) : value,
          ),
        [],
      );
}
export function once(fn) {
  let called = false,
    result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
export function pipe(...functions) {
  return (value) => functions.reduce((result, fn) => fn(result), value);
}
```

**Tests**

```js
console.assert(chunk([1, 2, 3], 2).length === 2);
console.assert(deepEqual(deepClone({ a: { b: 1 } }), { a: { b: 1 } }));
console.assert(
  JSON.stringify(flatten([1, [2, [3]]], 2)) === JSON.stringify([1, 2, 3]),
);
console.assert(
  pipe(
    (x) => x * 2,
    (x) => x + 1,
  )(5) === 11,
);
console.assert(
  groupBy([{ type: "a" }, { type: "b" }, { type: "a" }], (item) => item.type).a
    .length === 2,
);
```

A utility library prevents repeated reinvention, centralizes tested behavior, and makes improvements reusable. Debounce, chunk, deepClone, and pipe are likely to recur often, depending on the application domain.
