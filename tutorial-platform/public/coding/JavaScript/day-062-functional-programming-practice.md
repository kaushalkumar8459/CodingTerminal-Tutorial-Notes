# Day 062 — Functional Programming Practice

Matches Tutorial Day 62 (Advanced Object Concepts). Combines map/filter/reduce, closures,
higher-order functions, and pure functions together. No limit on how many you solve.

## Basic — pure functions

1. Write a "pure" function `add(a, b)` that always returns the same output for the same
   input and has no side effects (no logging, no modifying outside variables).
2. Write an "impure" version of the same function that modifies an outside variable, and
   explain in a comment why it's impure.
3. Rewrite an impure function from an earlier day's practice (any day) to be pure instead.

## Concept — combining functional techniques

4. Use `.map()` combined with a helper pure function (not an inline arrow) to transform
   an array of prices with tax applied.
5. Use `.filter()` combined with a closure-based function (e.g. a function returned from
   `isAbovePrice(threshold)`) to filter products dynamically by different thresholds.
6. Use `.reduce()` to implement a `pipe(...)`-like function that runs a value through
   multiple transformation functions in sequence (e.g. `pipe(double, addOne)(5)`).
7. Write a `compose(...)` function similar to `pipe` but applying functions right-to-left
   instead of left-to-right.
8. Combine a higher-order function with a closure: write `createValidator(rule)` that
   returns a validation function customized by `rule`.

## Interview-style questions

9. What makes a function "pure," and why are pure functions considered easier to test
   and reason about?
10. How does `pipe()`/`compose()` relate to the higher-order function concepts from
    Day 56?
11. Why might functional programming techniques (pure functions, avoiding mutation)
    reduce bugs in larger applications?

## Notes

- "Functional programming" isn't a completely separate topic from what you've already
  learned — it's really just a disciplined STYLE of using functions, closures, and
  higher-order functions, all of which you've already practiced extensively.
- `pipe`/`compose` patterns show up frequently in real-world utility libraries and some
  frameworks — worth having genuine hands-on practice with both directions.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

