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
