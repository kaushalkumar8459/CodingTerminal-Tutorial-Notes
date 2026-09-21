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
