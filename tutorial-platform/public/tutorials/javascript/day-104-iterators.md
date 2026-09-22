---
title: Iterators
slug: day-104-iterators
dayLabel: Day 104
level: Advanced
estimatedMinutes: 30
order: 104
track: javascript
---

# Day 104 [Advanced]: Iterators

## Goal

Understand the iterator/iterable protocol — the mechanism that makes `for...of` (Day 22) work — and build your own custom iterators.

## Prerequisites

- Day 22 (`for...of`), Day 72/74 (Set, which is also iterable)

## Explanation

You've been using `for...of` since Day 22 on arrays, strings, Sets, and Maps — but have you wondered HOW `for...of` knows how to step through each of these different types? The answer: each of them implements the **iterable protocol** — they have a special method (`Symbol.iterator`) that returns an **iterator**, an object with a `.next()` method that returns `{ value, done }` each time it's called.

Understanding this protocol lets you build your OWN custom iterable objects — things that work with `for...of` even though they're not built-in types like arrays.

## Topic by Topic

### Topic 1: The iterator protocol — `.next()`

Theory:
An iterator is any object with a `.next()` method that returns `{ value, done }` — `value` is the current item, `done` is `true` once there's nothing left.

Code Example:

```js
function createRangeIterator(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    },
  };
}

const iterator = createRangeIterator(1, 3);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**Explanation:** Each call to `.next()` gives the next value and advances internally; once `current` exceeds `end`, `done: true` signals there's nothing more to give.

**Key Points:**

- An iterator is any object with a `.next()` method returning `{ value, done }`.
- `done: false` means there's a valid `value`; `done: true` means iteration is complete.
- This manual iterator can be called repeatedly, but doesn't yet work with `for...of` directly — that requires the iterable protocol, next.

### Topic 2: The iterable protocol — `Symbol.iterator`

Theory:
An object is "iterable" (usable with `for...of`) if it has a method named `[Symbol.iterator]` that RETURNS an iterator (like the one from Topic 1).

Code Example:

```js
function createRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          if (current <= end) {
            return { value: current++, done: false };
          }
          return { value: undefined, done: true };
        },
      };
    },
  };
}

for (const num of createRange(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

**Explanation:** `[Symbol.iterator]` is a special, well-known method name JavaScript looks for — because `createRange(...)` has it, `for...of` can automatically use it to step through the values, one at a time.

**Key Points:**

- `[Symbol.iterator]` is the specific method name `for...of` looks for on any object.
- Arrays, strings, Sets, and Maps all implement this protocol internally — that's WHY `for...of` works on them.
- Implementing `[Symbol.iterator]` yourself makes ANY custom object usable with `for...of`.

### Topic 3: Building a custom iterable class

Theory:
Classes can implement `[Symbol.iterator]` as a method, making instances of that class directly usable with `for...of`.

Code Example:

```js
class NumberCollection {
  constructor(...numbers) {
    this.numbers = numbers;
  }

  [Symbol.iterator]() {
    let index = 0;
    const numbers = this.numbers;
    return {
      next() {
        if (index < numbers.length) {
          return { value: numbers[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const collection = new NumberCollection(10, 20, 30);
for (const num of collection) {
  console.log(num); // 10, 20, 30
}
```

**Explanation:** `NumberCollection` isn't an array, but because it implements `[Symbol.iterator]`, `for...of` works on it exactly as if it were — this pattern lets you make ANY custom data structure "feel native" to iterate over.

**Key Points:**

- Any class can implement `[Symbol.iterator]` to become genuinely iterable.
- This is exactly how arrays, Sets, and Maps achieve their `for...of` support internally.
- Building your own iterable class is a strong sign of deep JavaScript understanding.

### Topic 4: Manually consuming an iterator without `for...of`

Theory:
Since an iterator is just an object with `.next()`, you can manually call it in a `while` loop, checking `done` yourself — useful for understanding exactly what `for...of` does automatically.

Code Example:

```js
const range = createRange(1, 3);
const iterator = range[Symbol.iterator]();

let result = iterator.next();
while (!result.done) {
  console.log(result.value);
  result = iterator.next();
}
```

**Explanation:** This manually replicates exactly what `for...of` does behind the scenes — get the iterator, repeatedly call `.next()`, use `value` until `done` becomes `true`.

**Key Points:**

- `for...of` is essentially a clean, convenient shorthand for this manual `.next()`/`done` loop.
- Understanding this manual version demystifies exactly what `for...of` is doing internally.
- This connects directly to generators (Day 105), which provide an even easier way to build iterators.

## Recap

- An iterator is an object with `.next()` returning `{ value, done }`; an iterable has `[Symbol.iterator]` returning such an iterator.
- Arrays, strings, Sets, and Maps all implement this protocol internally, which is why `for...of` works on them.
- You can build custom iterable objects/classes by implementing `[Symbol.iterator]` yourself.

## What's Next

Practice for today: `public/coding/JavaScript/day-104-iterators.md`. Day 105 covers generators — a much easier way to build iterators.
