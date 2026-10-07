# Day 073 — Map (frequencyCounter, cache, userLookup, productLookup)

Matches Tutorial Day 73 (OOP Project). No limit on how many you build.

## Basic

1. Create a `Map` and add a few key-value pairs using `.set()`.
2. Retrieve a value from a `Map` using `.get()`.
3. Check if a key exists in a `Map` using `.has()`.
4. Remove a key from a `Map` using `.delete()`.
5. Loop over a `Map` using `for...of` and print each `[key, value]` pair.

## Concept

6. Build a `frequencyCounter(array)` function using a `Map` instead of a plain object —
   compare this to your Day 39/45 object-based frequency counters.
7. Build a `userLookup` `Map` keyed by user ID, allowing instant lookup of full user
   objects by ID.
8. Build a `productLookup` `Map` keyed by product SKU/ID for instant product lookups.
9. Compare using a `Map` vs a plain object for these lookups — what are the practical
   differences (e.g. key types, iteration order, built-in `.size`)?
10. Convert a `Map` into an array of `[key, value]` pairs using `[...map]` or
    `Array.from(map)`.

## Challenge — cache

11. Build a simple `cache` using a `Map`: a function `getOrCompute(key, computeFn)`
    that returns the cached value if `key` already exists in the `Map`, otherwise
    computes it with `computeFn`, stores it, and returns it.
12. Test your cache with a deliberately slow `computeFn` and confirm the SECOND call
    with the same key is instant (similar to Day 54's `memoize()`, but using a `Map`
    explicitly instead of a plain object).

## Interview-style questions

13. What are the practical differences between a `Map` and a plain object for storing
    key-value data?
14. Why can a `Map`'s keys be ANY type (including objects), while a plain object's keys
    are always converted to strings?
15. When would you choose a `Map` over a plain object for a lookup table?

## Notes

- `Map` preserves insertion order reliably and allows non-string keys — both genuine
  advantages over plain objects in certain situations.
- The cache/`memoize()` pattern reappears constantly in real applications — get
  comfortable building it with both objects (Day 54) and `Map` (today).

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

