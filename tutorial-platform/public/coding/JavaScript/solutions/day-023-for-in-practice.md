# Day 023 — Solution: for...in Practice

## Basic

**1. Print property names**

```js
const user = { name: "Maya", age: 28, active: true };
for (const key in user) console.log(key);
```

**2. Print names and values**

```js
for (const key in user) console.log(key, user[key]);
```

**3. Count properties**

```js
let propertyCount = 0;
for (const key in user) propertyCount++;
console.log(propertyCount); // 3
```

**4. Search for a property**

```js
function hasProperty(object, wanted) {
  for (const key in object) if (key === wanted) return true;
  return false;
}
console.log(hasProperty(user, "age")); // true
```

**5. Print numeric properties**

```js
for (const key in user) {
  if (typeof user[key] === "number") console.log(key, user[key]);
}
```

## Concept

**6. Highest numeric value**

```js
const scores = { math: 88, science: 94, history: 79 };
let highestSubject;
for (const subject in scores) {
  if (
    highestSubject === undefined ||
    scores[subject] > scores[highestSubject]
  ) {
    highestSubject = subject;
  }
}
console.log(highestSubject, scores[highestSubject]); // science 94
```

**7. Object to pairs manually**

```js
function toPairs(object) {
  const pairs = [];
  for (const key in object) pairs.push([key, object[key]]);
  return pairs;
}
console.log(toPairs({ a: 1, b: 2 }));
```

**8. Keep truthy values**

```js
function truthyProperties(object) {
  const result = {};
  for (const key in object) if (object[key]) result[key] = object[key];
  return result;
}
console.log(truthyProperties({ name: "Sam", age: 0, active: true }));
```

**9. Sum numeric values**

```js
let total = 0;
for (const key in { a: 10, b: "skip", c: 5 }) {
  if (typeof { a: 10, b: "skip", c: 5 }[key] === "number")
    total += { a: 10, b: "skip", c: 5 }[key];
}
console.log(total); // 15
```

A clearer reusable version:

```js
function sumNumbers(object) {
  let total = 0;
  for (const key in object)
    if (typeof object[key] === "number") total += object[key];
  return total;
}
console.log(sumNumbers({ a: 10, b: "skip", c: 5 })); // 15
```

**10. Nested objects**

```js
const departments = {
  engineering: { lead: "Ava", size: 8 },
  design: { lead: "Leo", size: 3 },
};
for (const department in departments) {
  for (const property in departments[department]) {
    console.log(department, property, departments[department][property]);
  }
}
```

## Interview-style questions

**11.** `for...in` gives the property key. Use `object[key]` to read its value.

**12.** Arrays have numeric indexes, but `for...in` can also include custom enumerable properties and does not guarantee array-value iteration order. Use `for...of` for array values.

**13.** Access it with bracket notation: `object[key]`.
