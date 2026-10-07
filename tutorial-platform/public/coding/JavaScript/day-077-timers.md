# Day 077 — Timers (setTimeout, setInterval, clearTimeout, clearInterval)

Matches Tutorial Day 77 (Synchronous vs Asynchronous JavaScript). No limit on how far
you extend these projects.

## Basic

1. Use `setTimeout()` to print a message after 2 seconds.
2. Use `setInterval()` to print a message every 1 second, then use `clearInterval()`
   to stop it after 5 repeats.
3. Use `clearTimeout()` to cancel a `setTimeout()` before it ever fires.
4. Chain multiple `setTimeout()` calls to print messages at 1, 2, and 3 seconds.
5. Predict, then verify: does `setTimeout(fn, 0)` run immediately, or after the rest of
   the current synchronous code finishes?

## Projects

6. **Countdown** — given a starting number of seconds, print a countdown once per
   second, then print `"Liftoff!"` when it reaches 0.
7. **Stopwatch** — build a simple stopwatch with `start()`, `stop()`, and
   `getElapsedSeconds()` functions, using `setInterval()` internally to track elapsed time.
8. **Digital Clock** — print the current time (hours:minutes:seconds) every second,
   continuously, using `setInterval()` and `new Date()`.

## Interview-style questions

9. What's the difference between `setTimeout()` and `setInterval()`?
10. Why is it important to `clearInterval()` an interval you no longer need (think
    about what happens if you just let it run forever)?
11. Does `setTimeout(fn, 1000)` guarantee the callback runs at EXACTLY 1000ms? Why or
    why not (hint: think about what else might be running on the call stack at that moment)?

## Notes

- Timers are your first hands-on taste of real asynchronous behavior — notice how the
  rest of your code keeps running immediately, without waiting for the timer.
- Always keep a reference to interval/timeout IDs if you might need to cancel them later
  — losing the reference means you can never stop it.

<!-- codingterminal-solution:start -->

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

<!-- codingterminal-solution:end -->

