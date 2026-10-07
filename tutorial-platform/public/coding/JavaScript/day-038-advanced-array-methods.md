# Day 038 — Advanced Array Methods (some, every, sort, reverse, flat, flatMap)

Matches Tutorial Day 38 (The filter Method). Challenge: 20 problems total — no limit on
extending further.

## Basic

1. Use `.some()` to check if any number in an array is negative.
2. Use `.every()` to check if all numbers in an array are positive.
3. Use `.sort()` to sort an array of numbers in ascending order (careful — think about
   why a plain `.sort()` might not work correctly on numbers by default).
4. Use `.sort()` to sort an array of numbers in descending order.
5. Use `.reverse()` to reverse the order of an array.

## Concept

6. Use `.sort()` to sort an array of strings alphabetically.
7. Use `.sort()` to sort an array of objects by a numeric property (e.g. sort products by price).
8. Use `.sort()` to sort an array of objects by a string property (e.g. sort users by name).
9. Use `.flat()` to flatten a nested array of arrays into a single-level array.
10. Use `.flat(2)` on a deeply nested array (2 levels) and observe the difference from `.flat()`.
11. Use `.flatMap()` to map and flatten in a single step (e.g. splitting sentences into
    words and flattening them all into one array).
12. Use `.some()` to check whether any product in an array is out of stock.
13. Use `.every()` to check whether all users in an array are verified.
14. Combine `.filter()` and `.sort()` together: filter products in stock, then sort by price.

## Challenge (20 total — keep going)

15. Sort an array of objects by TWO properties (e.g. department first, then name).
16. Implement a custom sort comparator that sorts strings by length instead of alphabetically.
17. Use `.flatMap()` to extract and flatten all "tags" from an array of blog post objects
    (each post has a `tags: []` array).
18. Check whether an array is already sorted, using `.every()` and comparing neighboring
    elements.
19. Sort an array of dates (as strings) chronologically.
20. Combine `.filter()`, `.sort()`, and `.map()` in one chain to build a "top 3 most
    expensive in-stock products" list.

## Interview-style questions

21. Why does `[10, 2, 33].sort()` NOT sort correctly by numeric value without a comparator?
22. What's the difference between `.some()` and `.every()`?
23. What does `.flatMap()` do that `.map()` alone cannot?

## Notes

- `.sort()` and `.reverse()` mutate the original array — unlike most methods this week,
  which return new arrays. Always double check this when chaining.
- `.sort()` needs a comparator function `(a, b) => a - b` for correct numeric sorting —
  without it, JavaScript sorts by converting values to strings, which gives wrong results
  for numbers.

<!-- codingterminal-solution:start -->

# Day 038 — Solution: Advanced Array Methods

```js
console.log([1, -2, 3].some((number) => number < 0));
console.log([1, 2, 3].every((number) => number > 0));
console.log([10, 2, 33].sort((a, b) => a - b));
console.log([10, 2, 33].sort((a, b) => b - a));
console.log([1, 2, 3].reverse());
console.log(["pear", "apple", "orange"].sort());
console.log([{ price: 30 }, { price: 10 }].sort((a, b) => a.price - b.price));
console.log(
  [{ name: "Zoe" }, { name: "Ana" }].sort((a, b) =>
    a.name.localeCompare(b.name),
  ),
);
console.log(
  [
    [1, 2],
    [3, 4],
  ].flat(),
);
console.log([[[1]], [[2]]].flat(2));
console.log(["one two", "three"].flatMap((sentence) => sentence.split(" ")));
```

**12–14. Product and user checks**

```js
const products = [
  { name: "Pen", inStock: true, price: 10 },
  { name: "Book", inStock: false, price: 20 },
];
console.log(products.some((product) => !product.inStock));
const users = [{ verified: true }, { verified: true }];
console.log(users.every((user) => user.verified));
const sortedProducts = products
  .filter((product) => product.inStock)
  .sort((a, b) => a.price - b.price);
```

**15. Sort by department, then name**

```js
const employees = [
  { department: "IT", name: "Zoe" },
  { department: "HR", name: "Ben" },
  { department: "IT", name: "Ana" },
];
employees.sort(
  (a, b) =>
    a.department.localeCompare(b.department) || a.name.localeCompare(b.name),
);
```

**16. Sort strings by length**

```js
const byLength = ["four", "a", "three"].sort((a, b) => a.length - b.length);
```

**17. Flatten blog tags**

```js
const posts = [{ tags: ["js", "web"] }, { tags: ["react"] }];
const allTags = posts.flatMap((post) => post.tags);
```

**18. Check already sorted**

```js
function isSorted(values) {
  return values.every(
    (value, index) => index === 0 || values[index - 1] <= value,
  );
}
```

**19. Sort date strings**

```js
const dates = ["2026-04-01", "2025-12-10", "2026-01-20"].sort(
  (a, b) => new Date(a) - new Date(b),
);
```

**20. Top three in-stock products**

```js
const topThree = products
  .filter((product) => product.inStock)
  .sort((a, b) => b.price - a.price)
  .slice(0, 3)
  .map((product) => product.name);
```

## Interview-style questions

**21.** Default `sort()` compares string representations, so `10` is placed before `2`. Use `(a, b) => a - b` for numeric ascending order.

**22.** `some()` returns true when at least one item matches. `every()` returns true only when all items match.

**23.** `map()` transforms into nested results, while `flatMap()` transforms and flattens one level in the same operation.

<!-- codingterminal-solution:end -->

