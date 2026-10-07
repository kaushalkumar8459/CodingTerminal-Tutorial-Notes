# Day 036 — filter()

Matches Tutorial Day 36 (Array Iteration with forEach) — practice moves into `filter()`
here, ahead of Tutorial Day 38. No limit on how many you solve.

## Basic

1. Use `.filter()` to get only the even numbers from an array.
2. Use `.filter()` to get only the numbers greater than 50 from an array.
3. Use `.filter()` to get only the strings longer than 5 characters from an array.
4. Use `.filter()` to remove all falsy values from a mixed array.
5. Use `.filter()` to get only positive numbers from an array containing negatives.

## Concept

6. Given an array of user objects (`{name, age}`), use `.filter()` to get only adults (`age >= 18`).
7. Given an array of user objects, use `.filter()` to get only active users (`isActive: true`).
8. Given an array of product objects, use `.filter()` to get only expensive products (`price > 1000`).
9. Given an array of task objects, use `.filter()` to get only completed tasks (`done: true`).
10. Combine `.filter()` with `.map()`: first filter adults, then map to just their names.
11. Use `.filter()` with multiple combined conditions (e.g. `age >= 18 && isActive`).
12. Given an array of numbers, filter out any duplicates (keep only the first occurrence
    of each value).

## Interview-style questions

13. What's the key difference between `.map()` and `.filter()` in terms of what they return?
14. Does `.filter()` mutate the original array?
15. What does `.filter()` return if none of the items match the condition?

## Notes

- `.filter()`'s callback must return `true`/`false` (or a truthy/falsy value) — whatever
  is truthy gets kept, the rest gets excluded.
- `.filter()` can return an empty array — that's normal and expected when nothing matches,
  not an error.

<!-- codingterminal-solution:start -->

# Day 036 — Solution: filter()

**1–5. Basic filtering**

```js
console.log([1, 2, 3, 4].filter((number) => number % 2 === 0));
console.log([20, 60, 80].filter((number) => number > 50));
console.log(
  ["short", "longer", "JavaScript"].filter((word) => word.length > 5),
);
console.log([0, "", false, 4, "yes"].filter(Boolean));
console.log([-2, 0, 4].filter((number) => number > 0));
```

**6. Adults**

```js
const users = [
  { name: "Asha", age: 22 },
  { name: "Ben", age: 15 },
];
const adults = users.filter((user) => user.age >= 18);
```

**7. Active users**

```js
const activeUsers = users.filter((user) => user.isActive === true);
```

**8. Expensive products**

```js
const expensive = [{ price: 800 }, { price: 1500 }].filter(
  (product) => product.price > 1000,
);
```

**9. Completed tasks**

```js
const completed = [
  { task: "Read", done: true },
  { task: "Run", done: false },
].filter((item) => item.done);
```

**10. Filter then map**

```js
const adultNames = users
  .filter((user) => user.age >= 18)
  .map((user) => user.name);
```

**11. Multiple conditions**

```js
const activeAdults = users.filter(
  (user) => user.age >= 18 && user.isActive === true,
);
```

**12. Remove duplicates, keeping the first**

```js
function uniqueValues(values) {
  return values.filter((value, index) => values.indexOf(value) === index);
}
console.log(uniqueValues([2, 2, 4, 2, 4])); // [2, 4]
```

## Interview-style questions

**13.** `map()` returns one transformed value for every input, so its result has the same length. `filter()` returns only matching values, so its result may be shorter.

**14.** No. `filter()` returns a new array and leaves the original array unchanged.

**15.** It returns an empty array, which is a normal result and not an error.

<!-- codingterminal-solution:end -->

