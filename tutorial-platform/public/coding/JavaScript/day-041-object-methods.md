# Day 041 — Object Methods (keys, values, entries)

Matches Tutorial Day 41 (Objects Fundamentals). No limit on how many you solve.

## Basic

1. Use `Object.keys()` to get all property names of an object as an array.
2. Use `Object.values()` to get all property values of an object as an array.
3. Use `Object.entries()` to get an array of `[key, value]` pairs from an object.
4. Use `Object.keys(obj).length` to count how many properties an object has.
5. Loop over `Object.entries()` using `for...of` to print each key and value.

## Concept

6. Given an object of product prices (`{apple: 50, banana: 30}`), use `Object.values()`
   to calculate the total.
7. Given an object of exam scores, use `Object.entries()` to find the subject with the
   highest score.
8. Convert an object into an array of formatted strings (e.g. `"name: value"`) using
   `Object.entries()` and `.map()`.
9. Given an array of `[key, value]` pairs, use `Object.fromEntries()` to convert it back
   into an object.

## Challenge

10. Convert an object into an array of `[key, value]` pairs, then back into a `Map`
    using `new Map(Object.entries(obj))`.
11. Convert a `Map` back into a plain object using `Object.fromEntries(map)`.
12. Given two objects representing settings, merge them so the second object's values
    override the first's for matching keys (a manual preview of `Object.assign`/spread,
    covered fully on Day 43).

## Interview-style questions

13. What's the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?
14. Why might `Object.entries()` combined with `.map()`/`.filter()`/`.reduce()` be more
    convenient than manually looping with `for...in`?
15. What does `Object.fromEntries()` do, and when would you need it?

## Notes

- `Object.keys/values/entries()` all return real arrays, meaning you get full access to
  `.map()`, `.filter()`, `.reduce()`, etc. — this is usually more convenient than
  `for...in` from Day 23.
- These three methods will become your default toolkit for object iteration going forward.

<!-- codingterminal-solution:start -->

# Day 041 — Solution: Object Methods

```js
const scores = { math: 88, science: 94, english: 82 };
console.log(Object.keys(scores));
console.log(Object.values(scores));
console.log(Object.entries(scores));
console.log(Object.keys(scores).length);
for (const [subject, score] of Object.entries(scores))
  console.log(subject, score);
```

**6. Total product prices**

```js
const prices = { apple: 50, banana: 30 };
const total = Object.values(prices).reduce((sum, price) => sum + price, 0);
```

**7. Highest exam score**

```js
const highest = Object.entries(scores).reduce((best, entry) =>
  entry[1] > best[1] ? entry : best,
);
console.log(highest); // ["science", 94]
```

**8. Formatted strings**

```js
const formatted = Object.entries(scores).map(
  ([subject, score]) => `${subject}: ${score}`,
);
```

**9. Pairs to object**

```js
const object = Object.fromEntries([
  ["name", "Asha"],
  ["age", 25],
]);
```

**10. Object to Map**

```js
const settings = { darkMode: true, notifications: false };
const settingsMap = new Map(Object.entries(settings));
```

**11. Map to object**

```js
const plainSettings = Object.fromEntries(settingsMap);
```

**12. Merge with second object winning**

```js
function mergeSettings(first, second) {
  const result = { ...first };
  for (const [key, value] of Object.entries(second)) result[key] = value;
  return result;
}
```

## Interview-style questions

**13.** `keys()` returns property names, `values()` returns property values, and `entries()` returns `[key, value]` pairs.

**14.** Entries are arrays, so they work naturally with `map`, `filter`, and `reduce` without manually indexing into an object.

**15.** `Object.fromEntries()` rebuilds an object from iterable key-value pairs, useful after transforming or filtering entries.

<!-- codingterminal-solution:end -->

