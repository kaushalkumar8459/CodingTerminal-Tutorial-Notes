# Day 104 — Iterators (range, customIterator, paginationIterator)

Matches Tutorial Day 104 (Iterators). No limit on how many you build.

## Basic

1. Build a `range(start, end)` function returning an iterable object usable with
   `for...of`, producing numbers from `start` to `end`.
2. Build a `range(start, end, step)` version supporting a custom step size (e.g. every
   2nd number).
3. Manually consume your `range()` iterator using a `while` loop and `.next()`,
   without using `for...of`.
4. Build a custom iterable `Countdown` class that counts DOWN from a given starting
   number to 0.
5. Confirm your `Countdown` instances work correctly with `for...of`, `[...spread]`,
   and destructuring (e.g. `const [first, second] = new Countdown(5)`).

## Concept — customIterator

6. Build a `customIterator(array)` function that returns a plain iterator (with just
   `.next()`, not necessarily a full iterable) over an array's values.
7. Build an iterable `WordIterator` class that iterates over the WORDS of a sentence
   (splitting on spaces internally), usable with `for...of`.
8. Build an iterable that iterates over an object's `[key, value]` pairs (similar to
   what `Object.entries()` already gives you, but built manually with
   `[Symbol.iterator]`).

## Challenge — paginationIterator

9. Build a `paginationIterator(items, pageSize)` that returns an iterable where each
   `.next()` call gives you the NEXT PAGE (an array of up to `pageSize` items), until
   all items have been paginated through.
10. Test your `paginationIterator` with a list of 25 items and a page size of 10 —
    confirm it produces exactly 3 pages (10, 10, 5).

## Interview-style questions

11. What two things does an object need to be considered "iterable" in JavaScript?
12. Why does `for...of` work on arrays/strings/Sets/Maps but NOT on plain objects
    by default?
13. What's the practical difference between an "iterator" and something that's
    "iterable"?

## Notes

- Building your own iterables is genuinely advanced, valuable JavaScript knowledge —
  don't worry if it takes some time to feel natural.
- The `paginationIterator` challenge is a great preview of a genuinely useful,
  real-world pattern (loading data page by page).

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

