# Day 054 — Solution: Advanced Closure Problems

```js
function once(fn) {
  let called = false, result;
  return (...args) => { if (!called) { called = true; result = fn(...args); } return result; };
}

function memoize(fn) {
  const cache = new Map();
  return (argument) => {
    if (!cache.has(argument)) cache.set(argument, fn(argument));
    return cache.get(argument);
  };
}

function createCounter(start = 0) {
  let count = start;
  return { increment: () => ++count, decrement: () => --count, getValue: () => count, reset: () => { count = start; } };
}

function createLogger(prefix) {
  let logCount = 0;
  const logger = (message) => { logCount++; console.log(`[${prefix}] ${message}`); };
  logger.getLogCount = () => logCount;
  return logger;
}

function createIdGenerator(startingId = 1) {
  let nextId = startingId;
  return () => nextId++;
}
```

**6. Memoization test**

```js
const slowSquare = memoize((number) => { for (let i = 0; i < 1e6; i++); return number * number; });
console.time("first"); slowSquare(10); console.timeEnd("first");
console.time("second"); slowSquare(10); console.timeEnd("second");
```

**9–10. Use the closures**

```js
const nextId = createIdGenerator();
const records = ["A", "B", "C"].map((name) => ({ id: nextId(), name }));
const logger = createLogger("COUNTER");
const counter = createCounter();
logger(`value: ${counter.increment()}`);
logger(`value: ${counter.decrement()}`);
```

## Interview-style questions

**11.** Memoization uses a closure to retain a private cache between calls while hiding that cache from outside code.

**12.** All counters would share one global variable, so changing one counter would change the others and make independent state impossible.

**13.** Closure privacy is convention-based through inaccessible local variables and methods. `#field` is language-enforced private class state with class-specific syntax and rules.
