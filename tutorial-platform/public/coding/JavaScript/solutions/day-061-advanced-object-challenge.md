# Day 061 — Solution: Advanced Object Challenge

**1. Recursive deep clone**

```js
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);
  const copy = {};
  for (const key of Object.keys(value)) copy[key] = deepClone(value[key]);
  return copy;
}
```

**2. Recursive deep freeze**

```js
function deepFreeze(object) {
  if (object === null || typeof object !== "object" || Object.isFrozen(object))
    return object;
  for (const value of Object.values(object)) deepFreeze(value);
  return Object.freeze(object);
}
```

**3. Recursive equality**

```js
function isEqual(first, second) {
  if (Object.is(first, second)) return true;
  if (
    typeof first !== "object" ||
    first === null ||
    typeof second !== "object" ||
    second === null
  )
    return false;
  if (Array.isArray(first) !== Array.isArray(second)) return false;
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);
  return (
    firstKeys.length === secondKeys.length &&
    firstKeys.every(
      (key) => Object.hasOwn(second, key) && isEqual(first[key], second[key]),
    )
  );
}
```

**4. Flatten nested objects and arrays**

```js
function flattenObject(value, prefix = "", result = {}) {
  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value))
      flattenObject(child, prefix ? `${prefix}.${key}` : key, result);
  } else {
    result[prefix] = value;
  }
  return result;
}
```

**5–9. Tests**

```js
const original = { user: { name: "Asha" }, tags: ["js", "web"], active: true };
const copy = deepClone(original);
copy.user.name = "Ben";
copy.tags[0] = "python";
console.log(original.user.name, original.tags[0]); // Asha js

deepFreeze(original);
// In strict mode, changing original.user.name throws; otherwise it is ignored.
const same = isEqual({ a: { b: 1 } }, { a: { b: 1 } }); // true
const different = isEqual({ a: { b: 1 } }, { a: { b: 2 } }); // false
console.log(flattenObject({ a: { b: { c: 1 } }, tags: ["js", "web"] }));
// Arrays are traversed too: { "a.b.c": 1, "tags.0": "js", "tags.1": "web" }
```

## Interview-style questions

**10.** Nested values can themselves contain objects or arrays, so one top-level loop cannot clone, freeze, or compare their contents.

**11.** `structuredClone()` is robust and built in for supported values. A manual version is useful for learning, custom rules, or environments where the built-in is unavailable.

**12.** `Object.freeze()` freezes only the current object. `deepFreeze()` recursively freezes every nested object and array as well.
