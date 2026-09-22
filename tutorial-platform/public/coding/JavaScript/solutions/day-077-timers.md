# Day 077 — Solution: Timers

```js
setTimeout(() => console.log("after two seconds"), 2000);
let repeats = 0;
const intervalId = setInterval(() => {
  console.log("tick");
  if (++repeats === 5) clearInterval(intervalId);
}, 1000);
const timeoutId = setTimeout(() => console.log("cancelled"), 1000);
clearTimeout(timeoutId);
setTimeout(() => console.log("one second"), 1000);
setTimeout(() => console.log("two seconds"), 2000);
setTimeout(() => console.log("three seconds"), 3000);
console.log("sync first");
```

**6. Countdown**

```js
function countdown(seconds) {
  let remaining = seconds;
  const id = setInterval(() => {
    console.log(remaining ? remaining-- : "Liftoff!");
    if (remaining < 0) clearInterval(id);
  }, 1000);
}
```

**7. Stopwatch**

```js
function createStopwatch() {
  let startedAt = 0,
    elapsed = 0,
    id;
  return {
    start() {
      if (!id) {
        startedAt = Date.now() - elapsed;
        id = setInterval(() => {}, 1000);
      }
    },
    stop() {
      if (id) {
        elapsed = Date.now() - startedAt;
        clearInterval(id);
        id = undefined;
      }
    },
    getElapsedSeconds() {
      return Math.floor((id ? Date.now() - startedAt : elapsed) / 1000);
    },
  };
}
```

**8. Digital clock**

```js
const clockId = setInterval(
  () => console.log(new Date().toLocaleTimeString()),
  1000,
);
// clearInterval(clockId) when the clock is no longer needed.
```

## Interview-style questions

**9.** `setTimeout` runs once; `setInterval` schedules repeated runs until cleared.

**10.** An uncleared interval keeps executing and retains resources, creating unnecessary work or preventing cleanup.

**11.** The delay is a minimum scheduling delay. The callback waits until the call stack is clear and the event loop can run it.
