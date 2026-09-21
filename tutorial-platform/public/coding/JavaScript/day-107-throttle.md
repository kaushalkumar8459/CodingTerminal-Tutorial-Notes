# Day 107 — Throttle: Scroll, Resize, Mouse Trackers

Matches Tutorial Day 107 (Debouncing and Throttling). No limit on how far you extend these.

## Build a throttle utility

1. Write a `throttle(fn, interval)` function that returns a new function running `fn`
   at most once every `interval` milliseconds.
2. Test it by wrapping a `console.log` in `throttle()` and calling it rapidly and
   repeatedly (e.g. in a fast loop or fast repeated clicks) — confirm it logs at the
   expected reduced rate.

## Projects

3. **Scroll Tracker** — log the current scroll position (`window.scrollY`) using a
   throttled `scroll` event listener (e.g. every 200ms).
4. **Resize Tracker** — log the current window size using a throttled `resize` event
   listener.
5. **Mouse Movement Tracker** — log the current mouse coordinates (`event.clientX`,
   `event.clientY`) using a throttled `mousemove` event listener (mouse move fires
   EXTREMELY rapidly, making this a great throttle candidate).

## Concept

6. Compare the SAME mouse tracker with and without throttling — count roughly how many
   times it logs in a few seconds of moving your mouse, with vs without throttling.
7. Build a "back to top" button that becomes visible only after scrolling down a
   certain amount, using a throttled scroll listener to check the position.
8. Combine BOTH debounce (Day 106) and throttle in one page: a debounced search input
   AND a throttled scroll tracker, running independently.

## Interview-style questions

9. Why is `mousemove` a particularly strong candidate for throttling, compared to
   something like a button click?
10. What would happen to performance if you attached an UNTHROTTLED, expensive
    calculation directly to a `scroll` or `mousemove` listener?
11. How would you decide the right throttle INTERVAL for a given feature (too short
    vs too long)?

## Notes

- `scroll`, `resize`, and `mousemove` are the three classic real-world throttle
  candidates — they can all fire dozens or hundreds of times per second without
  throttling.
- Keep your `throttle()` utility alongside `debounce()` — both go into your Day 109
  personal utility library.
