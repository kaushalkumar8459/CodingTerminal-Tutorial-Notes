# Day 035 — Solution: map()

**1–5. Basic transformations**

```js
console.log([1, 2, 3].map((number) => number * 2));
console.log([2, 3, 4].map((number) => number ** 2));
console.log(["red", "blue"].map((word) => word.toUpperCase()));
console.log([{ name: "Asha" }, { name: "Ben" }].map((user) => user.name));
console.log([100, 200].map((price) => price * 1.1));
```

**6. Currency strings**

```js
const currency = [499, 1250].map((price) => `$${price.toFixed(2)}`);
```

**7. Product display strings**

```js
const display = [
  { name: "Laptop", price: 55000 },
  { name: "Mouse", price: 800 },
].map((product) => `${product.name} - $${product.price}`);
```

**8. Reshape API data**

```js
const rawUsers = [{ user_id: 1, full_name: "Asha", extra: "ignore" }];
const simpleUsers = rawUsers.map((user) => ({
  id: user.user_id,
  name: user.full_name,
}));
```

**9. Label even and odd**

```js
const labels = [2, 5, 8].map((number) => (number % 2 === 0 ? "even" : "odd"));
```

**10. Celsius to Fahrenheit**

```js
const fahrenheit = [0, 20, 30].map((celsius) => (celsius * 9) / 5 + 32);
```

**11. Add index-based IDs**

```js
const items = [{ name: "Book" }, { name: "Pen" }];
const withIds = items.map((item, index) => ({ ...item, id: index + 1 }));
```

**12. Map and join**

```js
const sentence = ["learn", "code", "daily"]
  .map((word) => word.toUpperCase())
  .join(" ");
console.log(sentence); // LEARN CODE DAILY
```

## Interview-style questions

**13.** `map()` transforms every item and returns a new array. `forEach()` only performs an action and returns `undefined`.

**14.** `map()` does not mutate the original array; it returns a new array with the same length.

**15.** API reshaping needs one output object for each input object, which matches `map()`'s one-to-one transformation model.
