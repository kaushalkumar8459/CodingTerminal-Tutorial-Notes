# Day 118 — Solution: Advanced Patterns

**Event emitter**

```js
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(name, callback) {
    if (!this.events.has(name)) this.events.set(name, new Set());
    this.events.get(name).add(callback);
  }
  off(name, callback) {
    this.events.get(name)?.delete(callback);
  }
  emit(name, ...args) {
    for (const callback of this.events.get(name) || []) callback(...args);
  }
}
const emitter = new EventEmitter();
const first = (value) => console.log(value);
const second = (value) => console.log(value * 2);
emitter.on("data", first);
emitter.on("data", second);
emitter.emit("data", 3);
emitter.off("data", first);
emitter.emit("data", 4);
```

**Retry**

```js
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
async function retry(asyncFn, maxAttempts, delayMs = 0) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) await delay(delayMs);
    }
  }
  throw lastError;
}
let attempts = 0;
retry(async () => {
  if (++attempts < 3) throw new Error("try again");
  return "success";
}, 3).then(console.log);
```

**Rate limiter:** this version blocks excess calls during a fixed window.

```js
function rateLimiter(fn, maxCalls, windowMs) {
  const calls = [];
  return (...args) => {
    const now = Date.now();
    while (calls[0] <= now - windowMs) calls.shift();
    if (calls.length >= maxCalls)
      return Promise.reject(new Error("Rate limit exceeded"));
    calls.push(now);
    return Promise.resolve(fn(...args));
  };
}
```

An EventEmitter resembles DOM `addEventListener`/dispatch: listeners subscribe by event name and emit/dispatch invokes them. Retry handles transient network failures. Rate limiting caps calls in a window; debounce waits for silence and throttle limits frequency without a fixed quota window.
