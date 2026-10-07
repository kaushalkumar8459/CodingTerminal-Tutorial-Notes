# Day 035 — map()

Matches Tutorial Day 35 (Array Searching and Extraction) — practice moves into `map()`
here, ahead of Tutorial Day 37. No limit on how many you solve.

## Basic

1. Use `.map()` to double every number in an array.
2. Use `.map()` to square every number in an array.
3. Use `.map()` to convert an array of strings to all uppercase.
4. Use `.map()` to extract just the `name` property from an array of user objects.
5. Use `.map()` to add `10%` tax to an array of prices, returning the new prices.

## Concept

6. Use `.map()` to format an array of numbers as currency strings (e.g. `499` → `"$499.00"`).
7. Use `.map()` to convert an array of product objects into an array of formatted display
   strings (e.g. `"Laptop - $55000"`).
8. Given an array of raw API-style objects, use `.map()` to reshape each one into a
   simpler object with only the fields you need.
9. Use `.map()` combined with a ternary to label numbers as `"even"`/`"odd"`.
10. Use `.map()` to convert an array of Celsius temperatures into Fahrenheit.
11. Use `.map()` to add an `index`-based ID to each item in an array of objects (e.g. `id: index + 1`).
12. Chain `.map()` with `.join()` to convert a transformed array back into a single string.

## Interview-style questions

13. What's the key difference between `.map()` and `.forEach()`?
14. Does `.map()` mutate the original array? What does it return?
15. Why is `.map()` a good fit for "reshaping API data" tasks specifically?

## Notes

- `.map()` ALWAYS returns a new array of the same length as the original — one output
  value per input value. If you find yourself skipping items, you actually want
  `.filter()` (tomorrow) instead.
- Try rewriting a few of your Day 34 `.forEach()` answers using `.map()` where it fits,
  to feel the difference between "do something per item" and "transform into something new."

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

