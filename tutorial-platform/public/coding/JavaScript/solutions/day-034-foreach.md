# Day 034 — Solution: forEach()

**1–5. Basic practice**

```js
const numbers = [10, 25, 60];
numbers.forEach((number) => console.log(number));
["red", "blue"].forEach((color) => console.log(color.toUpperCase()));

let sum = 0;
numbers.forEach((number) => {
  sum += number;
});
console.log(sum); // 95

numbers.forEach((number, index) => console.log(`Item ${index + 1}: ${number}`));
let overFifty = 0;
numbers.forEach((number) => {
  if (number > 50) overFifty++;
});
```

**6. Print user names**

```js
const users = [{ name: "Asha" }, { name: "Ben" }];
users.forEach((user) => console.log(user.name));
```

**7. Modify each user**

```js
users.forEach((user) => {
  user.isActive = true;
});
```

**8. Product grand total**

```js
const products = [
  { price: 10, quantity: 2 },
  { price: 25, quantity: 3 },
];
let total = 0;
products.forEach((product) => {
  total += product.price * product.quantity;
});
console.log(total); // 95
```

**9. Build an HTML string**

```js
let html = "";
["Home", "About"].forEach((item) => {
  html += `<li>${item}</li>`;
});
console.log(html);
```

**10. Count strings and numbers**

```js
const mixed = [1, "a", 2, "b", true];
const counts = { strings: 0, numbers: 0 };
mixed.forEach((value) => {
  if (typeof value === "string") counts.strings++;
  if (typeof value === "number") counts.numbers++;
});
console.log(counts); // { strings: 2, numbers: 2 }
```

## Interview-style questions

**11.** `forEach()` returns `undefined`; it is for performing an action, not creating an output array.

**12.** No. Use a regular `for` loop for `break`, or use `some()` when you need to stop after a match.

**13.** A regular loop supports `break`, `continue`, reverse iteration, and custom steps. `forEach()` is concise when every item should receive the same action.
