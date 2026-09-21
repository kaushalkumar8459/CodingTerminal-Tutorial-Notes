# Day 073 — Solution: Map

```js
const map = new Map();
map.set("name", "Asha").set("age", 25);
console.log(map.get("name"));
console.log(map.has("age"));
map.delete("age");
for (const [key, value] of map) console.log(key, value);
```

**6. Frequency counter**

```js
function frequencyCounter(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
}
```

**7–8. Lookup maps**

```js
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ben" },
];
const userLookup = new Map(users.map((user) => [user.id, user]));
const products = [{ sku: "B1", name: "Book" }];
const productLookup = new Map(
  products.map((product) => [product.sku, product]),
);
```

**9–10.** A Map supports keys of any type, preserves insertion order, and exposes `.size`; object keys are normally strings or symbols. Convert a Map with `[...map]` or `Array.from(map)`.

**11. Cache**

```js
const cache = new Map();
function getOrCompute(key, computeFn) {
  if (!cache.has(key)) cache.set(key, computeFn());
  return cache.get(key);
}
const slowResult = getOrCompute("square-10", () => 10 ** 2);
const sameResult = getOrCompute("square-10", () => 999); // cached 100
```

**12.** The second call returns the stored value without running the computation again.

## Interview-style questions

**13.** Map has explicit key-value methods, any key type, insertion order, and size; objects are convenient records with string/symbol keys and inherited properties to consider.

**14.** Map stores key identity directly; object property keys are converted to strings unless they are symbols.

**15.** Choose Map for dynamic lookup tables, non-string keys, frequent additions/removals, or when clear iteration and size behavior matter.
