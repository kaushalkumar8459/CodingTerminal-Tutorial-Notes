# Day 051 — Higher-Order Functions (customMap, customFilter, customForEach, customReduce)

Matches Tutorial Day 51 (The Spread Operator). Important interview practice day — build
your own versions of the array methods you've been using. No limit on extending further.

## Build your own array methods

1. Implement `customForEach(array, callback)` that mimics `.forEach()` using a plain loop.
2. Implement `customMap(array, callback)` that mimics `.map()`, returning a new array.
3. Implement `customFilter(array, callback)` that mimics `.filter()`, returning a new array.
4. Implement `customReduce(array, callback, initialValue)` that mimics `.reduce()`.
5. Test each of your custom implementations against the REAL built-in method on the same
   input, and confirm they produce identical results.

## Concept

6. Implement `customFind(array, callback)` that mimics `.find()`.
7. Implement `customSome(array, callback)` that mimics `.some()`, stopping early once a match is found.
8. Implement `customEvery(array, callback)` that mimics `.every()`, stopping early once a
   failure is found.
9. Add support for the optional `(item, index, array)` callback signature in your
   `customMap`/`customFilter` (matching how the real methods work).
10. Implement `customReduce` WITHOUT an initial value parameter, using the first array
    element as the starting accumulator (matching real `.reduce()` behavior) — handle
    the empty-array edge case.

## Interview-style questions

11. Why is this exercise ("reimplement built-in array methods") such a common and
    valuable interview question?
12. What is a "higher-order function," in your own words, based on what you just built
    (hint: think about functions that accept OTHER functions as arguments)?
13. Which of your custom implementations was the trickiest to get exactly right, and why?

## Notes

- This is one of the most valuable exercises in the whole course for truly understanding
  how array methods work internally — take your time and test thoroughly against the
  real built-in versions.
- A "higher-order function" is simply a function that takes another function as an
  argument, or returns a function — `customMap`, `customFilter`, etc. are all higher-order
  functions, and so are the real `.map()`/`.filter()`/`.reduce()`.

<!-- codingterminal-solution:start -->

# Day 051 — Solution: Higher-Order Functions

```js
function customForEach(array, callback) {
  for (let index = 0; index < array.length; index++) callback(array[index], index, array);
}

function customMap(array, callback) {
  const result = [];
  for (let index = 0; index < array.length; index++) result.push(callback(array[index], index, array));
  return result;
}

function customFilter(array, callback) {
  const result = [];
  for (let index = 0; index < array.length; index++) if (callback(array[index], index, array)) result.push(array[index]);
  return result;
}

function customReduce(array, callback, initialValue) {
  let index = 0;
  let accumulator = initialValue;
  if (arguments.length < 3) {
    if (array.length === 0) throw new TypeError("Reduce of empty array");
    accumulator = array[0];
    index = 1;
  }
  for (; index < array.length; index++) accumulator = callback(accumulator, array[index], index, array);
  return accumulator;
}

const values = [1, 2, 3];
console.log(customMap(values, (value) => value * 2));
console.log(customFilter(values, (value) => value > 1));
console.log(customReduce(values, (sum, value) => sum + value, 0));
console.log(customMap(values, (value, index) => value + index));
```

**6–8. Find, some, and every**

```js
function customFind(array, callback) { for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) return array[i]; return undefined; }
function customSome(array, callback) { for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) return true; return false; }
function customEvery(array, callback) { for (let i = 0; i < array.length; i++) if (!callback(array[i], i, array)) return false; return true; }
```

**5. Compare with built-ins**

```js
console.log(JSON.stringify(customMap(values, (x) => x * 2)) === JSON.stringify(values.map((x) => x * 2)));
console.log(JSON.stringify(customFilter(values, (x) => x > 1)) === JSON.stringify(values.filter((x) => x > 1)));
console.log(customReduce(values, (a, b) => a + b, 0) === values.reduce((a, b) => a + b, 0));
```

**11–13.** This is valuable because it tests iteration, callback contracts, edge cases, and API behavior. A higher-order function accepts a function or returns one, allowing the operation to be supplied separately. `reduce()` is usually trickiest because empty arrays, initial values, indexes, and accumulator rules all matter.

<!-- codingterminal-solution:end -->

