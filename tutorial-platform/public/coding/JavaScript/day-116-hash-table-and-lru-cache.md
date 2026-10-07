# Day 116 — Hash Table & LRU Cache

Bonus practice. Build a hash table from scratch (rather than relying on plain objects
or `Map`), then use similar ideas to build an LRU cache. No limit on how many
variations you try.

## Basic — Hash Table

1. Implement a simple `hash(key, tableSize)` function that converts a string key into
   a numeric index (e.g. sum character codes, then `% tableSize`).
2. Implement a `HashTable` class with `set(key, value)` and `get(key)`, using an array
   of "buckets" internally.
3. Handle collisions (two keys hashing to the same bucket) by storing an array of
   `[key, value]` pairs in each bucket, and searching within it.
4. Implement `remove(key)` and `has(key)` on your `HashTable`.

## Concept

5. Test your `HashTable` with enough keys that collisions definitely happen (a small
   table size on purpose), and confirm `get()` still returns the correct value for
   every key despite the collisions.
6. Compare your `HashTable`'s behavior against a plain JavaScript object or `Map` doing
   the same job — what does your implementation teach you about how those built-ins
   likely work internally?

## Challenge — LRU Cache

7. Implement an `LRUCache(capacity)` class with `get(key)` and `put(key, value)`,
   where the LEAST RECENTLY USED item is automatically evicted once the cache exceeds
   its capacity.
8. Use a `Map` internally for your `LRUCache` (Map preserves insertion order, which
   helps track "recently used" order cleanly).
9. Test your `LRUCache` with a capacity of 3: insert 4 items and confirm the least
   recently used one was evicted correctly; then `get()` an item to "refresh" it and
   confirm the eviction order changes accordingly.

## Interview-style questions

10. Why do hash tables generally offer O(1) average-case lookup, and what makes
    collisions a performance concern?
11. What does "LRU" stand for, and why is it a useful cache eviction strategy?
12. Why is `Map` (which preserves insertion order) a good fit for implementing an LRU
    cache, compared to a plain object?

## Notes

- LRU Cache is a very common, practical interview question — get comfortable with the
  `Map`-based approach, it's the cleanest way to implement it in JavaScript.
- This connects directly back to Day 73/108's caching patterns — an LRU cache is just
  a cache with a smart, bounded eviction policy.

<!-- codingterminal-solution:start -->

# Day 116 — Solution: Hash Table and LRU Cache

```js
function hash(key, tableSize) {
  let total = 0;
  for (const character of String(key)) total += character.charCodeAt(0);
  return total % tableSize;
}
class HashTable {
  constructor(size = 8) {
    this.buckets = Array.from({ length: size }, () => []);
  }
  set(key, value) {
    const bucket = this.buckets[hash(key, this.buckets.length)];
    const pair = bucket.find((item) => item[0] === key);
    if (pair) pair[1] = value;
    else bucket.push([key, value]);
  }
  get(key) {
    return this.buckets[hash(key, this.buckets.length)].find(
      (item) => item[0] === key,
    )?.[1];
  }
  has(key) {
    return this.buckets[hash(key, this.buckets.length)].some(
      (item) => item[0] === key,
    );
  }
  remove(key) {
    const bucket = this.buckets[hash(key, this.buckets.length)];
    const index = bucket.findIndex((item) => item[0] === key);
    if (index < 0) return false;
    bucket.splice(index, 1);
    return true;
  }
}
const table = new HashTable(2);
table.set("a", 1);
table.set("b", 2);
console.log(table.get("a"), table.has("b"));

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.values = new Map();
  }
  get(key) {
    if (!this.values.has(key)) return undefined;
    const value = this.values.get(key);
    this.values.delete(key);
    this.values.set(key, value);
    return value;
  }
  put(key, value) {
    this.values.delete(key);
    this.values.set(key, value);
    if (this.values.size > this.capacity)
      this.values.delete(this.values.keys().next().value);
  }
}
const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
cache.get("a");
cache.put("d", 4);
console.log(cache.get("b")); // undefined
```

Hash tables are O(1) on average because hashing jumps to a bucket; collisions require extra bucket searching. LRU means least recently used. Map's insertion order makes refreshing and evicting the oldest entry straightforward.

<!-- codingterminal-solution:end -->

