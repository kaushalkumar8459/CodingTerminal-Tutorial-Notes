# Day 104 — Solution: Iterators

**1–5. Range and countdown**

```js
function range(start, end, step = 1) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          const done = step > 0 ? current > end : current < end;
          const result = { value: current, done };
          current += step;
          return result;
        },
      };
    },
  };
}
for (const number of range(1, 5, 2)) console.log(number);
const iterator = range(1, 3)[Symbol.iterator]();
let result;
while (!(result = iterator.next()).done) console.log(result.value);

class Countdown {
  constructor(start) {
    this.start = start;
  }
  *[Symbol.iterator]() {
    for (let value = this.start; value >= 0; value--) yield value;
  }
}
console.log([...new Countdown(3)]);
const [first, second] = new Countdown(5);
```

**6–8. Custom iterables**

```js
function customIterator(array) {
  let index = 0;
  return {
    next: () =>
      index < array.length
        ? { value: array[index++], done: false }
        : { value: undefined, done: true },
  };
}
class WordIterator {
  constructor(sentence) {
    this.words = sentence.split(/\s+/);
  }
  *[Symbol.iterator]() {
    yield* this.words;
  }
}
function entriesIterable(object) {
  return {
    *[Symbol.iterator]() {
      for (const key of Object.keys(object)) yield [key, object[key]];
    },
  };
}
```

**9–10. Pagination**

```js
function paginationIterator(items, pageSize) {
  let index = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index >= items.length) return { done: true };
      const value = items.slice(index, (index += pageSize));
      return { value, done: false };
    },
  };
}
console.log(
  [
    ...paginationIterator(
      Array.from({ length: 25 }, (_, i) => i + 1),
      10,
    ),
  ].map((page) => page.length),
); // [10, 10, 5]
```

An iterable provides `[Symbol.iterator]()` returning an iterator; an iterator provides `next()` objects with `value` and `done`. Plain objects lack the iterator protocol by default.
