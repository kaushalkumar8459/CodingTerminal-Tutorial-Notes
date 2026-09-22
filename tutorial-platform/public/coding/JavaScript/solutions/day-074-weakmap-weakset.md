# Day 074 — Solution: WeakMap / WeakSet

```js
const metadata = new WeakMap();
const element = {};
metadata.set(element, { role: "button" });
console.log(metadata.get(element));
// metadata.set("key", 1) throws TypeError because WeakMap keys must be objects.

const processed = new WeakSet();
const first = {};
const second = {};
processed.add(first).add(second);
console.log(processed.has(first));
// for (const item of processed) {} throws: WeakSet is not iterable.
```

**6. Private metadata**

```js
const domMetadata = new WeakMap();
const node = { id: "save" };
domMetadata.set(node, { initialized: true });
console.log(domMetadata.get(node));
```

**7. Track processed objects**

```js
const seen = new WeakSet();
function process(object) {
  if (seen.has(object)) return "already processed";
  seen.add(object);
  return "processed";
}
```

**8–9.** Weak collections use object keys because their weak references can disappear when no strong reference remains. A regular Map would keep processed objects alive and could cause memory growth.

## Interview-style questions

**10.** Map/Set are iterable and strongly retain entries. WeakMap/WeakSet accept objects only, are not iterable, and do not prevent garbage collection.

**11.** Iteration would expose which objects are still weakly reachable and could interfere with predictable garbage collection behavior.

**12.** Garbage collection reclaims unreachable memory. Weak collections allow metadata or membership tracking to disappear with objects that the rest of the program no longer uses.
