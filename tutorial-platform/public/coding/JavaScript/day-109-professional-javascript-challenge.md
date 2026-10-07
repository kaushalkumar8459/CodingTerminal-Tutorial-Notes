# Day 109 — Professional JavaScript Challenge: Personal Utility Library

Matches Tutorial Day 109 (Professional JavaScript Patterns). Build a reusable utility
library combining everything from this course. No limit on how many utilities you add.

## Build your utility library (one file, or organized into modules per Day 101)

1. `debounce(fn, delay)` — from Day 106/107.
2. `throttle(fn, interval)` — from Day 107.
3. `memoize(fn)` — from Day 54.
4. `deepClone(obj)` — from Day 61.
5. `deepEqual(objA, objB)` — a renamed/refined version of your Day 61 `isEqual()`.
6. `groupBy(array, keyFn)` — groups an array of objects by a computed key (reuse the
   Day 45-46 `.reduce()`-based grouping pattern).
7. `chunk(array, size)` — splits an array into smaller arrays of a given size (from
   Day 47's assessment).
8. `flatten(array, depth)` — a manual version of `.flat()`, built with recursion or
   `.reduce()`.
9. `once(fn)` — from Day 53/54.
10. `pipe(...fns)` — from Day 62, combining functions left to right.

## Concept — polish and documentation

11. Add a one-line comment above EACH function explaining what it does and its
    parameters (professional documentation habit).
12. Add basic input validation/defensive checks to at least 3 of these functions
    (e.g. `chunk()` should handle a `size` of 0 or negative gracefully).
13. Write at least 2 test cases (just calling the function and checking the output
    with `console.log`/`console.assert`) for EACH utility, confirming correct behavior.
14. Organize this into proper ES Modules (Day 101) if you haven't already — one file
    per logical group, with a clear `index.js` or `app.js` importing and demonstrating
    all of them together.

## Interview-style questions

15. Why is it valuable to build and maintain a personal utility library like this
    across projects, rather than rewriting these functions from scratch each time?
16. Which of these utilities do you think you'll use MOST often in future projects,
    and why?

## Notes

- This is a genuinely useful, portfolio-worthy artifact — many professional developers
  maintain a personal (or team) utility library exactly like this throughout their career.
- Take real care with documentation and testing today — this is explicitly a
  "professional polish" exercise, not just a coding speed-run.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

