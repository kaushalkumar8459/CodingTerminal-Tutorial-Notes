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
