# Day 106 — Debounce: Search Box

Matches Tutorial Day 106 (Memory Management) — practice previews debouncing here, ahead
of Tutorial Day 107's full explanation. No limit on how far you extend this.

## Build a debounce utility

1. Write a `debounce(fn, delay)` function that returns a new function which only
   actually calls `fn` after `delay` milliseconds have passed WITHOUT it being called
   again (each new call resets the timer).
2. Test your `debounce()` by wrapping a simple `console.log` and calling the debounced
   version rapidly several times in a row — confirm `console.log` only actually runs
   ONCE, after you stop calling it.

## Project: Debounced Search Box

3. Build a search input that logs the search term to the console on every keystroke
   (`input` event) WITHOUT debouncing first — notice how many times it fires while typing.
4. Wrap the same search handler with your `debounce()` function (e.g. 500ms delay),
   and confirm it now only fires once you've stopped typing for half a second.
5. Simulate an "API call" (a function that just logs "Searching for: ...") and confirm
   it's only called once per pause in typing, not on every keystroke.
6. Add a visual "Searching..." indicator that shows immediately when typing starts,
   and hides once the debounced search actually fires.

## Concept

7. Experiment with different debounce delays (100ms, 500ms, 1500ms) and describe how
   the user experience changes with each.
8. Combine debouncing with your Day 89 error-handling patterns: simulate a debounced
   search that sometimes "fails," and handle that gracefully.

## Interview-style questions

9. What problem does debouncing solve, in your own words?
10. Why does calling the debounced function again RESET the timer, rather than adding
    to a queue of pending calls?
11. What's a realistic scenario (beyond search boxes) where debouncing would be useful?

## Notes

- Debouncing is one of the most practically useful patterns in real front-end
  development — search-as-you-type is the classic example, but it applies anywhere
  rapid, repeated events should only trigger one final action.
- Keep your `debounce()` utility — you'll add `throttle()` alongside it tomorrow, and
  both become part of your Day 109 personal utility library.
