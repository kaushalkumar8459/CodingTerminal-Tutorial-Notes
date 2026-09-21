---
title: Generators
slug: day-105-generators
dayLabel: Day 105
level: Advanced
estimatedMinutes: 30
order: 105
track: javascript
---

# Day 105 [Advanced]: Generators

## Goal

Learn generator functions (`function*`) and `yield` — a much simpler way to build iterators than the manual approach from Day 104.

## Prerequisites

- Day 104 (iterators, `Symbol.iterator`)

## Explanation

Building custom iterators manually (Day 104) works, but requires a lot of boilerplate — manually tracking state and writing `.next()` yourself. **Generator functions** (`function* name() { }`) solve this elegantly: calling a generator function doesn't run its body immediately — it returns a special **generator object** (which is ALREADY both an iterator AND iterable). Inside the generator, `yield value` pauses execution and produces a value, resuming exactly where it left off the NEXT time `.next()` is called.

## Topic by Topic

### Topic 1: Basic generator syntax

Theory:
`function* name() { yield value; }` defines a generator. Calling it returns a generator object; each call to `.next()` runs until the next `yield`, pausing there.

Code Example:

```js
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

**Explanation:** Each `.next()` call resumes the generator's execution from exactly where it last paused, running until the NEXT `yield` (or the function's end) — this is a huge simplification compared to Day 104's manual iterator state tracking.

**Key Points:**

- `function*` (with an asterisk) defines a generator function.
- `yield value` pauses execution and produces that value; the next `.next()` call resumes right after it.
- Generator objects automatically implement BOTH the iterator (`.next()`) and iterable (`Symbol.iterator`) protocols.

### Topic 2: Using generators with `for...of`

Theory:
Since generator objects are automatically iterable, they work directly with `for...of` — no extra `[Symbol.iterator]` boilerplate needed.

Code Example:

```js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

**Explanation:** Compare this to Day 104's manual `createRange()` implementation — the generator version is dramatically shorter, using a familiar `for` loop with `yield` instead of manually managing `.next()`/`done` state.

**Key Points:**

- Generators work directly with `for...of`, spread, and destructuring — automatically iterable.
- Writing a generator with a regular loop + `yield` is far simpler than manually implementing `[Symbol.iterator]`.
- This is the standard, modern way to build custom sequences in JavaScript.

### Topic 3: Generators for infinite sequences

Theory:
Since generators pause and resume, they can represent INFINITE sequences safely — values are only produced as they're actually requested, never all at once.

Code Example:

```js
function* infiniteCounter() {
  let count = 1;
  while (true) {
    // infinite loop - but SAFE, because of yield pausing it
    yield count++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3
// Never actually loops forever in one go - only produces values when asked
```

**Explanation:** Even though the `while (true)` loop never technically ends, `yield` pauses it after EACH value — the generator only does more work when `.next()` is called again, making infinite sequences perfectly safe to define.

**Key Points:**

- Generators can safely represent infinite sequences, since `yield` pauses between each value.
- Values are computed lazily — only when actually requested via `.next()`.
- This is impossible to do safely with a regular function returning a full array upfront.

### Topic 3: Passing values into `.next()`

Theory:
`.next(value)` can pass a value INTO the generator, becoming the result of the `yield` expression that was paused.

Code Example:

```js
function* conversation() {
  const name = yield "What is your name?";
  const age = yield `Hi ${name}, how old are you?`;
  return `${name} is ${age} years old.`;
}

const convo = conversation();
console.log(convo.next().value); // "What is your name?"
console.log(convo.next("Zara").value); // "Hi Zara, how old are you?"
console.log(convo.next(28).value); // "Zara is 28 years old."
```

**Explanation:** The value passed into `.next("Zara")` becomes the result of the `yield "What is your name?"` expression, assigned to `name` — this two-way communication is a more advanced generator feature, useful for interactive/step-based flows.

**Key Points:**

- `.next(value)` sends a value INTO the generator, resuming it with that value as the `yield` expression's result.
- This enables two-way communication between the generator and whoever is calling `.next()`.
- This is a more advanced pattern — most everyday generator use is simpler, just producing values outward.

### Topic 4: Generators vs manual iterators

Theory:
Generators are almost always the preferred way to build custom sequences today, compared to Day 104's manual iterator approach.

Practical:
Whenever you need a custom "sequence of values" (whether finite or infinite), reach for a generator function first — manually implementing `[Symbol.iterator]` is now mostly useful for understanding the underlying mechanism, which Day 104 already covered.

**Key Points:**

- Generators dramatically simplify building custom iterables compared to manual `[Symbol.iterator]` implementation.
- Both approaches produce genuinely iterable results — generators are just far less boilerplate.
- Understanding BOTH (Day 104's manual approach and today's generators) gives you a complete picture of how iteration works in JavaScript.

## Recap

- `function*`/`yield` define generators — calling one returns a generator object that's both iterator and iterable.
- Generators work directly with `for...of`, and can safely represent infinite sequences via lazy evaluation.
- `.next(value)` can send values into a generator, enabling two-way communication for more advanced use cases.

## What's Next

Practice for today: `public/coding/JavaScript/day-105-generators.md`. Day 106 covers memory management — the JavaScript memory lifecycle and common leak causes.
