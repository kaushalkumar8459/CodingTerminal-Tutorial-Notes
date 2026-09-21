# Day 072 — Solution: Set

```js
const values = new Set([1, 2, 2, 3]);
values.add(4);
console.log(values.has(2));
values.delete(1);
console.log([...values]);
console.log(values.size);
for (const value of values) console.log(value);
```

**6–10. Practical uses**

```js
const uniqueUserIds = [...new Set([101, 101, 202, 303])];
const posts = [{ tags: ["js", "web"] }, { tags: ["web", "dom"] }];
const tags = new Set(posts.flatMap((post) => post.tags));
const registered = new Set(["asha", "ben"]);
const isTaken = (username) => registered.has(username);
registered.add("maya");
```

**11–13. Set operations**

```js
function union(setA, setB) {
  return new Set([...setA, ...setB]);
}
function intersection(setA, setB) {
  return new Set([...setA].filter((value) => setB.has(value)));
}
function difference(setA, setB) {
  return new Set([...setA].filter((value) => !setB.has(value)));
}

const first = new Set([1, 2, 3]);
const second = new Set([3, 4, 5]);
console.log(union(first, second));
console.log(intersection(first, second));
console.log(difference(first, second));
console.log(intersection(new Set(["js", "web"]), new Set(["web", "dom"])));
```

## Interview-style questions

**15.** A Set guarantees uniqueness without manual duplicate checks.

**16.** Set membership is generally near constant-time, while array `includes()` scans values linearly.

**17.** Use `[...set]` or `Array.from(set)` when array methods, indexing, or JSON-style serialization are needed.
