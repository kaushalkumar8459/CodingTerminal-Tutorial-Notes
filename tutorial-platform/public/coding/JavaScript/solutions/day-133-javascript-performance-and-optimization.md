# Day 133 Solutions — JavaScript Performance & Optimization

## 1. Debounce

```js
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

## 2. Throttle

```js
function throttle(fn, delay) {
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();

    if (now - lastTime >= delay) {
      lastTime = now;
      fn(...args);
    }
  };
}
```

## 3. Memoization

```js
function memoize(fn) {
  const cache = new Map();

  return (value) => {
    if (cache.has(value)) {
      return cache.get(value);
    }

    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}
```

## 4. Lazy loading

```js
const module = await import("./heavy-feature.js");
module.start();
```

## Interview Takeaway

Do not optimize blindly. Measure the bottleneck, change one thing, and measure again.
