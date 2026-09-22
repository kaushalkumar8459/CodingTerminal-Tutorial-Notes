# Day 037 — Solution: reduce()

**1–5. Basic reductions**

```js
const values = [2, 4, 6];
console.log(values.reduce((sum, value) => sum + value, 0));
console.log(values.reduce((product, value) => product * value, 1));
console.log(
  values.reduce((best, value) => (value > best ? value : best), -Infinity),
);
console.log(
  values.reduce((best, value) => (value < best ? value : best), Infinity),
);
console.log(values.reduce((sum, value) => sum + value, 0) / values.length);
```

**6. Cart total**

```js
const cart = [
  { name: "Book", price: 20, quantity: 2 },
  { name: "Pen", price: 5, quantity: 3 },
];
const cartTotal = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0,
);
```

**7. Frequency object**

```js
const frequency = ["a", "b", "a"].reduce((counts, value) => {
  counts[value] = (counts[value] || 0) + 1;
  return counts;
}, {});
```

**8. Even and odd buckets**

```js
const buckets = [1, 2, 3, 4].reduce(
  (result, number) => {
    result[number % 2 === 0 ? "even" : "odd"].push(number);
    return result;
  },
  { even: [], odd: [] },
);
```

**9. Flatten without `.flat()`**

```js
const flattened = [[1, 2], [3], [4, 5]].reduce(
  (result, row) => result.concat(row),
  [],
);
```

**10. Build a string manually**

```js
const sentence = ["learn", "code", "daily"].reduce(
  (result, word, index) => result + (index ? " " : "") + word,
  "",
);
```

**11. Active versus inactive**

```js
const statusCounts = [
  { isActive: true },
  { isActive: false },
  { isActive: true },
].reduce(
  (counts, user) => {
    counts[user.isActive ? "active" : "inactive"]++;
    return counts;
  },
  { active: 0, inactive: 0 },
);
```

**12. Longest string**

```js
const longest = ["cat", "elephant", "dog"].reduce(
  (best, word) => (word.length > best.length ? word : best),
  "",
);
```

## Interview-style questions

**13.** Pass a reducer callback and an initial value. The initial value becomes the accumulator's starting state and also makes empty-array behavior predictable.

**14.** The accumulator can be a number, object, string, or array. With that flexibility, `reduce()` can reproduce transformations, filtering, grouping, and many other operations.

**15.** It throws a `TypeError` because JavaScript has no first element to use as the accumulator. Provide an initial value to avoid this.
