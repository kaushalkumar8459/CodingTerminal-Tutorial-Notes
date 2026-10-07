# Day 023 — for...in Practice

Matches Tutorial Day 23 (The `for...in` Loop). No limit on how many you solve.

## Basic

1. Print all property names of an object using `for...in`.
2. Print all property names AND values of an object using `for...in`.
3. Count how many properties an object has using `for...in`.
4. Search for a specific property name in an object using `for...in`, printing whether it exists.
5. Print only the properties whose value is a number, skipping the rest.

## Concept

6. Find the property with the highest numeric value in an object (e.g. highest test score
   among subjects).
7. Convert an object into an array of `[key, value]` pairs manually using `for...in`.
8. Build a new object that only contains the properties whose value is truthy.
9. Sum all numeric values in an object using `for...in`.
10. Given a nested object (an object containing another object), loop over the outer
    object and print each inner object's properties too.

## Interview-style questions

11. What does `for...in` actually give you on each iteration — the key, the value, or both?
12. Why is using `for...in` on an array generally discouraged?
13. How would you access a property's value inside a `for...in` loop, given only the key?

## Notes

- Always double check: are you looping over an **object** (use `for...in`) or an
  **array/string/collection** (use `for...of`)? Mixing these up is extremely common
  early on.
- These manual patterns (counting, searching, converting to pairs) will get much simpler
  once `Object.keys/values/entries()` are introduced on Day 43 — today builds the
  foundation for appreciating why those methods exist.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

