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
