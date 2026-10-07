# Day 034 — forEach()

Matches Tutorial Day 34 (Array Modification In Depth) — practice moves into `forEach()`
here, ahead of Tutorial Day 36. No limit on how many you solve.

## Basic

1. Use `.forEach()` to print every item in an array of numbers.
2. Use `.forEach()` to print every item in an array of strings, in uppercase.
3. Use `.forEach()` to calculate the sum of all numbers in an array (accumulate in an
   outside variable).
4. Use `.forEach()` with the index parameter to print `"Item 1: ..."`, `"Item 2: ..."`, etc.
5. Use `.forEach()` to count how many items in an array meet a condition (e.g. numbers over 50).

## Concept

6. Given an array of user objects, use `.forEach()` to print each user's name.
7. Given an array of user objects, use `.forEach()` to modify each object (e.g. add an
   `isActive: true` property to every user).
8. Given an array of product objects, use `.forEach()` to calculate a grand total price.
9. Use `.forEach()` to build an HTML string (e.g. `<li>item</li>` per array item) —
   just build the string, no need for a real page.
10. Use `.forEach()` to count how many values in an array are strings vs numbers (mixed array).

## Interview-style questions

11. Does `.forEach()` return a new array? What does it actually return?
12. Can you `break` out of a `.forEach()` loop early? What would you use instead if you needed that?
13. What's the difference between using a regular `for` loop and `.forEach()` for the
    same task — when might you still prefer the regular `for` loop?

## Notes

- `.forEach()` doesn't return anything useful (`undefined`) — use it only when you want
  to run some action per item, not when you need to build a new array (that's `map()`,
  covered on Day 37).
- You cannot `break`/`continue` inside `.forEach()` — if you need early exit, a regular
  loop or `.some()`/`.every()` (Day 40) is the right tool instead.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

