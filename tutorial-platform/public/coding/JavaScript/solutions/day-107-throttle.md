# Day 107 — Solution: Throttle

```js
function throttle(fn, interval) {
  let lastRun = 0;
  let timeoutId;
  return function (...args) {
    const remaining = interval - (Date.now() - lastRun);
    if (remaining <= 0) {
      clearTimeout(timeoutId);
      lastRun = Date.now();
      fn.apply(this, args);
    } else if (!timeoutId)
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        lastRun = Date.now();
        fn.apply(this, args);
      }, remaining);
  };
}
const log = throttle((value) => console.log(value), 200);
for (let i = 0; i < 20; i++) log(i);

window.addEventListener(
  "scroll",
  throttle(() => console.log(window.scrollY), 200),
);
window.addEventListener(
  "resize",
  throttle(() => console.log(innerWidth, innerHeight), 200),
);
window.addEventListener(
  "mousemove",
  throttle((event) => console.log(event.clientX, event.clientY), 200),
);
const topButton = document.querySelector("#top");
window.addEventListener(
  "scroll",
  throttle(() => {
    topButton.hidden = window.scrollY < 400;
  }, 200),
);
```

Throttle limits frequency while allowing periodic updates, unlike debounce which waits for silence. A 200 ms interval is common for visual trackers; choose based on responsiveness and work cost. Expensive unthrottled scroll/mouse handlers can block the main thread and cause jank.
