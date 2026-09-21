# Day 062 — Solution: Functional Programming Practice

**1. Pure function**

```js
function add(a, b) {
  return a + b;
}
```

**2. Impure version**

```js
let total = 0;
function impureAdd(a, b) {
  total += a + b;
  return total;
}
// It is impure because it changes the outside variable `total`.
```

**3. Pure rewrite**

```js
function calculateTotal(previousTotal, a, b) {
  return previousTotal + a + b;
}
```

**4. Map with helper**

```js
function addTax(price) {
  return price * 1.1;
}
const pricesWithTax = [100, 200].map(addTax);
```

**5. Closure-based filter**

```js
function isAbovePrice(threshold) {
  return (product) => product.price > threshold;
}
const products = [{ price: 50 }, { price: 200 }];
const expensive = products.filter(isAbovePrice(100));
```

**6. Pipe left to right**

```js
function pipe(...functions) {
  return (value) => functions.reduce((result, fn) => fn(result), value);
}
const double = (value) => value * 2;
const addOne = (value) => value + 1;
console.log(pipe(double, addOne)(5)); // 11
```

**7. Compose right to left**

```js
function compose(...functions) {
  return (value) => functions.reduceRight((result, fn) => fn(result), value);
}
console.log(compose(addOne, double)(5)); // 11
```

**8. Validator factory**

```js
function createValidator(rule) {
  return (value) => rule(value);
}
const isLongEnough = createValidator((value) => value.length >= 8);
```

## Interview-style questions

**9.** A pure function has no observable side effects and always gives the same output for the same inputs, making it easier to test and reason about.

**10.** `pipe` and `compose` accept functions as arguments and return a new function, so they are higher-order functions.

**11.** Avoiding shared mutation reduces hidden interactions between parts of an application, making behavior more predictable.
