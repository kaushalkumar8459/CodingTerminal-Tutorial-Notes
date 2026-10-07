# Day 010 — Function Parameters

Matches Tutorial Day 10 (Functions Introduction). No limit on how many you solve.

## Basic

1. Write a `greeting(name)` function that prints a personalized greeting.
2. Write a function with two parameters that returns their sum.
3. Write a function with three parameters that returns their average.
4. Write a function `greeting(name = "Guest")` using a default parameter — call it with and without an argument.
5. Write a function that returns a value vs one that only `console.log()`s it — show the difference by trying to reuse each result.
6. Write a function `calculateTax(amount, rate = 0.18)` using a default rate.
7. Write a function `fullName(first, last)` that returns the combined name.
8. Write a function that takes 4 parameters and returns them combined into one sentence.
9. Write a function with a default parameter that depends on another parameter's typical value (e.g. `discount(price, percent = 10)`).
10. Call the same function multiple times with different arguments and print each result.

## Concept

11. Write a function `calculateDiscount(price, percent)` that returns the discounted price.
12. Write a function `calculateSalary(basic, hra, deductions)` that returns net salary.
13. Write a function `calculateEMI(principal, rate, months)` using a simplified EMI formula.
14. Write a function `generateUsername(firstName, lastName)` that returns a lowercase combined username.
15. Write a function that demonstrates function scope: declare a variable inside a function and show it's not accessible outside.
16. Write a function with 5 parameters, 2 of which have defaults — call it in a few different ways.
17. Write a function `formatPrice(amount, currency = "INR")` returning a formatted string.
18. Build a small set of 3 reusable functions that call each other (e.g. `calculateTotal()` uses `calculateTax()`).
19. Show what happens when you call a function with fewer arguments than parameters (log the "missing" parameter).
20. Show what happens when you call a function with more arguments than parameters (the extras are simply ignored, unless you use `arguments` or rest params).

## Interview-style questions

21. What happens to a parameter that doesn't receive an argument when the function is called?
22. Why are default parameters useful, and how do they interact with `undefined` arguments specifically?
23. What is function scope, and why can't code outside a function see variables declared inside it?

## Notes

- Default parameters only kick in when an argument is `undefined` — passing `null` or `0`
  explicitly will NOT trigger the default. Test this yourself to see it firsthand.
- Keep functions focused on one clear task each — if a function is trying to do 3 different
  things, it's usually a sign to split it into smaller functions.

<!-- codingterminal-solution:start -->

# Day 010 — Solution: Function Parameters

Reference solutions for `day-010-function-parameters.md`. Try the practice file
yourself first before checking these.

## Basic

**1. `greeting(name)`**

```js
function greeting(name) {
  console.log(`Hello, ${name}!`);
}

greeting("Dev"); // "Hello, Dev!"
```

**2. Sum of two parameters**

```js
function sum(a, b) {
  return a + b;
}

console.log(sum(4, 6)); // 10
```

**3. Average of three parameters**

```js
function averageOfThree(a, b, c) {
  return (a + b + c) / 3;
}

console.log(averageOfThree(10, 20, 30)); // 20
```

**4. Default parameter**

```js
function greeting2(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greeting2("Nina"); // "Hello, Nina!"
greeting2(); // "Hello, Guest!"
```

**5. Return vs console.log — the difference**

```js
function addReturn(a, b) {
  return a + b;
}
function addLogOnly(a, b) {
  console.log(a + b);
}

const resultA = addReturn(2, 3);
const resultB = addLogOnly(2, 3); // prints 5, but returns nothing

console.log(resultA * 2); // 10 — works fine, resultA is a real number
console.log(resultB * 2); // NaN — resultB is undefined, since addLogOnly never returns anything
```

**6. `calculateTax` with a default rate**

```js
function calculateTax(amount, rate = 0.18) {
  return amount * rate;
}

console.log(calculateTax(1000)); // 180
console.log(calculateTax(1000, 0.05)); // 50
```

**7. `fullName(first, last)`**

```js
function fullName(first, last) {
  return `${first} ${last}`;
}

console.log(fullName("Amit", "Shah")); // "Amit Shah"
```

**8. Four parameters combined into one sentence**

```js
function describePerson(name, age, city, job) {
  return `${name} is ${age} years old, lives in ${city}, and works as a ${job}.`;
}

console.log(describePerson("Ria", 29, "Pune", "designer"));
```

**9. Default parameter depending on typical value**

```js
function discount(price, percent = 10) {
  return price - price * (percent / 100);
}

console.log(discount(1000)); // 900
console.log(discount(1000, 25)); // 750
```

**10. Same function, different arguments**

```js
console.log(sum(1, 2)); // 3
console.log(sum(100, 200)); // 300
console.log(sum(-5, 5)); // 0
```

## Concept

**11. `calculateDiscount(price, percent)`**

```js
function calculateDiscount(price, percent) {
  return price - price * (percent / 100);
}

console.log(calculateDiscount(2000, 15)); // 1700
```

**12. `calculateSalary(basic, hra, deductions)`**

```js
function calculateSalary(basic, hra, deductions) {
  return basic + hra - deductions;
}

console.log(calculateSalary(30000, 8000, 2000)); // 36000
```

**13. `calculateEMI(principal, rate, months)`**

```js
function calculateEMI(principal, rate, months) {
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * (1 + monthlyRate) ** months) /
    ((1 + monthlyRate) ** months - 1);
  return Number(emi.toFixed(2));
}

console.log(calculateEMI(500000, 8, 24)); // approx EMI for a simplified formula
```

**14. `generateUsername(firstName, lastName)`**

```js
function generateUsername(firstName, lastName) {
  return (firstName + lastName).toLowerCase();
}

console.log(generateUsername("Meera", "Iyer")); // "meeraiyer"
```

**15. Function scope demonstration**

```js
function showScope() {
  const secretValue = "only visible inside here";
  console.log(secretValue);
}

showScope(); // "only visible inside here"
// console.log(secretValue); // ReferenceError — secretValue doesn't exist out here
```

**16. Five parameters, two with defaults**

```js
function createOrder(item, quantity, price, currency = "INR", express = false) {
  return { item, quantity, price, currency, express };
}

console.log(createOrder("Pen", 3, 20));
console.log(createOrder("Pen", 3, 20, "USD", true));
```

**17. `formatPrice(amount, currency = "INR")`**

```js
function formatPrice(amount, currency = "INR") {
  const symbols = { INR: "₹", USD: "$", EUR: "€" };
  const symbol = symbols[currency] ?? currency;
  return `${symbol}${amount.toFixed(2)}`;
}

console.log(formatPrice(499)); // "₹499.00"
console.log(formatPrice(49.5, "USD")); // "$49.50"
```

**18. Three functions calling each other**

```js
function calculateTaxAmount(amount, rate = 0.18) {
  return amount * rate;
}

function calculateTotal(amount) {
  return amount + calculateTaxAmount(amount);
}

function printReceipt(amount) {
  console.log(`Total (with tax): ${calculateTotal(amount).toFixed(2)}`);
}

printReceipt(1000); // "Total (with tax): 1180.00"
```

**19. Fewer arguments than parameters**

```js
function showThree(a, b, c) {
  console.log(a, b, c);
}

showThree(1, 2); // 1 2 undefined — the missing parameter becomes undefined
```

**20. More arguments than parameters**

```js
function showTwo(a, b) {
  console.log(a, b);
}

showTwo(1, 2, 3, 4); // 1 2 — the extra arguments (3, 4) are simply ignored
```

## Interview-style questions

**21. Missing argument behavior**

A parameter that doesn't receive an argument automatically becomes `undefined` inside
the function (unless it has a default value, in which case the default is used
instead).

**22. Why default parameters are useful**

They provide a sensible fallback value automatically, removing the need for manual
`if (value === undefined) { ... }` checks inside the function body. They only trigger
when the argument is `undefined` — explicitly passing `null` or `0` does NOT activate
the default.

**23. Function scope**

Function scope means variables declared inside a function only exist within that
function's own execution — they're created fresh each call and destroyed once the
function finishes. Code outside the function has no way to reach in and access them,
which keeps functions self-contained and prevents accidental interference between
different parts of a program.

<!-- codingterminal-solution:end -->

