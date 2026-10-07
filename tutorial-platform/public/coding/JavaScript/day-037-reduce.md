# Day 037 — reduce()

Matches Tutorial Day 37 (The map Method) — practice moves into `reduce()` here, ahead of
Tutorial Day 39. No limit on how many you solve.

## Basic

1. Use `.reduce()` to calculate the sum of all numbers in an array.
2. Use `.reduce()` to calculate the product of all numbers in an array.
3. Use `.reduce()` to find the maximum value in an array.
4. Use `.reduce()` to find the minimum value in an array.
5. Use `.reduce()` to calculate the average of an array of numbers.

## Concept

6. Given an array of cart items (`{name, price, quantity}`), use `.reduce()` to calculate
   the total cart price.
7. Use `.reduce()` to count how many times each value appears in an array (build a
   frequency object).
8. Use `.reduce()` to group an array of numbers into `"even"` and `"odd"` buckets in one object.
9. Use `.reduce()` to flatten a simple array of arrays into a single array (without using `.flat()`).
10. Use `.reduce()` to build a single string out of an array of words (similar to `.join()`,
    but done manually).
11. Use `.reduce()` combined with an initial value object to count how many users are
    `"active"` vs `"inactive"` from an array of user objects.
12. Use `.reduce()` to find the longest string in an array of strings.

## Interview-style questions

13. What are the two main things you pass to `.reduce()`, and what does the "initial value"
    actually control?
14. Why is `.reduce()` sometimes described as "the most powerful" array method (hint:
    think about whether you could implement `map`/`filter` using only `reduce`)?
15. What happens if you call `.reduce()` on an empty array without providing an initial value?

## Notes

- `.reduce()`'s callback takes `(accumulator, currentItem)` — the accumulator carries
  forward whatever you're building up (a sum, an object, a new array, anything).
- Always provide an initial value for `.reduce()` unless you're certain the array will
  never be empty — it avoids a confusing runtime error.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

