# Day 105 — Solution: Generators

```js
function* countUp(max) {
  for (let value = 1; value <= max; value++) yield value;
}
for (const value of countUp(3)) console.log(value);
console.log([...countUp(3)]);
function* range(start, end) {
  for (let value = start; value <= end; value++) yield value;
}
function* characters(text) {
  yield* text;
}
```

**6–8. Generators**

```js
function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
function* numberGenerator(start, step) {
  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}
function* passwordGenerator(length) {
  while (true)
    yield Array.from(
      { length },
      () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
          Math.floor(Math.random() * 62)
        ],
    ).join("");
}
const ids = idGenerator();
const todos = ["Read", "Practice"].map((text) => ({
  id: ids.next().value,
  text,
}));
```

**10–12. Take, pagination, Fibonacci**

```js
function take(generator, count) {
  const values = [];
  for (let i = 0; i < count; i++) values.push(generator.next().value);
  return values;
}
function* paginate(items, size) {
  for (let i = 0; i < items.length; i += size) yield items.slice(i, i + size);
}
function* fibonacci() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
console.log(take(fibonacci(), 10));
```

Generators produce values lazily and pause at `yield`, so infinite sequences are safe to define but must be consumed with a limit. A closure counter can also generate IDs; a generator makes pausing and resuming the sequence explicit.
