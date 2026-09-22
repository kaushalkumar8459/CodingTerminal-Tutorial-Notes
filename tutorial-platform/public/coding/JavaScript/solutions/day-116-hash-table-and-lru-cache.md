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
