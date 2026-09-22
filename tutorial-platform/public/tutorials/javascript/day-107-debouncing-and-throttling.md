---
title: Debouncing and Throttling
slug: day-107-debouncing-and-throttling
dayLabel: Day 107
level: Advanced
estimatedMinutes: 25
order: 107
track: javascript
---

# Day 107 [Advanced]: Debouncing and Throttling

## Goal

Fully understand debouncing (Day 106 preview) and throttling — two related but distinct techniques for controlling how often a function runs in response to rapid events.

## Prerequisites

- Day 106 (debounce practice preview)

## Explanation

Both **debouncing** and **throttling** limit how often a function actually runs, in response to events that can fire very rapidly (typing, scrolling, resizing, mouse movement). **Debouncing** waits until the events STOP happening for a specified pause, then runs the function once. **Throttling** instead runs the function at most once every fixed interval, REGARDLESS of how many events keep firing — guaranteeing regular execution even during continuous activity.

## Topic by Topic

### Topic 1: Debouncing — wait for a pause

Theory:
A debounced function only runs after events stop firing for a specified delay — every new event resets the waiting timer.

Code Example:

```js
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId); // cancel any pending call
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const debouncedSearch = debounce(
  (term) => console.log("Searching:", term),
  500,
);
```

**Explanation:** Each call to the debounced function cancels the PREVIOUS pending timeout and starts a new one — the actual `fn` only ever runs once the calls genuinely stop for the full `delay` period.

**Key Points:**

- Debouncing waits for a pause in activity before running — ideal for search-as-you-type, form validation, or window resize "final" handling.
- Every new call resets the timer, so continuous rapid calls never let the function run until they stop.
- This is exactly the utility you built and tested on Day 106.

### Topic 2: Throttling — run at most once per interval

Theory:
A throttled function runs immediately on the FIRST call, then IGNORES further calls until a fixed interval has passed — guaranteeing regular execution during continuous activity.

Code Example:

```js
function throttle(fn, interval) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= interval) {
      fn(...args);
      lastRun = now;
    }
  };
}

const throttledScroll = throttle(
  () => console.log("Scroll position checked"),
  200,
);
```

**Explanation:** Unlike debounce (which waits for a full pause), throttle runs the function periodically THROUGHOUT continuous activity — at most once every `interval` milliseconds, no matter how many events fire in between.

**Key Points:**

- Throttling guarantees the function runs periodically DURING continuous activity, not just after it stops.
- Ideal for scroll position tracking, mouse-move tracking, or resize handlers where you need REGULAR updates, not just a final one.
- The core difference from debounce: throttle runs DURING activity; debounce runs only AFTER activity stops.

### Topic 3: Choosing between debounce and throttle

Theory:
The choice depends on whether you need "one final result after things settle" (debounce) or "regular updates throughout continuous activity" (throttle).

Code Example:

```js
// Debounce - search box: only search once the user stops typing
searchInput.addEventListener("input", debounce(handleSearch, 500));

// Throttle - scroll tracking: need REGULAR position updates while scrolling
window.addEventListener("scroll", throttle(handleScroll, 200));
```

**Explanation:** Search only needs to happen once typing has genuinely paused (debounce fits); scroll tracking needs periodic updates continuously WHILE scrolling is happening (throttle fits) — using the wrong one for either would feel noticeably worse.

**Key Points:**

- Debounce: "wait until it stops, then do the final thing" — search boxes, form validation, resize "settled" handling.
- Throttle: "keep doing it periodically while it's happening" — scroll tracking, mouse-move tracking, button spam prevention.
- Choosing correctly significantly affects the user experience of the resulting feature.

### Topic 4: Combining with real event listeners

Theory:
Both debounce and throttle wrap an existing function, producing a new function you attach as the actual event listener — the underlying event handling logic doesn't change at all.

Code Example:

```js
function handleResize() {
  console.log(`Window size: ${window.innerWidth}x${window.innerHeight}`);
}

window.addEventListener("resize", throttle(handleResize, 300));
```

**Explanation:** `handleResize` itself is completely unaware it's being throttled — `throttle()` simply wraps it, producing a new function that's what actually gets attached as the listener.

**Key Points:**

- Debounce/throttle are wrapper functions — they don't change your original function's logic at all.
- This separation of concerns (your logic, plus a separate rate-limiting wrapper) is clean and reusable.
- Both utilities are genuinely production-used patterns, not just learning exercises.

## Recap

- Debouncing waits for a pause in activity before running once; throttling runs at most once per fixed interval, even during continuous activity.
- Choose debounce for "final result after settling" (search, validation); throttle for "regular updates during activity" (scroll, resize).
- Both wrap an existing function without changing its logic, producing a new rate-limited version to use as the actual event listener.

## What's Next

Practice for today: `public/coding/JavaScript/day-107-throttle.md` — scroll, resize, and mouse trackers. Day 108 covers internationalization with the `Intl` object.
