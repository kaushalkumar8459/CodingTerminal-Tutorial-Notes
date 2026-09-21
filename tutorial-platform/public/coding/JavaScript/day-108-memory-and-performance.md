# Day 108 — Memory & Performance

Matches Tutorial Day 108 (Internationalization with Intl) — practice returns to memory
and performance topics from Day 106, applying them more deeply. No limit on how many
you investigate.

## Basic

1. Use `Intl.NumberFormat` to display a price in at least 3 different currencies.
2. Use `Intl.DateTimeFormat` to display today's date in at least 3 different locale
   formats.
3. Format a large number (over a million) with `Intl.NumberFormat` and confirm the
   thousand separators appear correctly for a locale of your choice.

## Memory & performance concept review

4. Identify a piece of code from an EARLIER day's practice that adds an event listener
   — add a corresponding `removeEventListener()` call for it, using a named function
   reference (per Day 95/106).
5. Identify a scenario in your Day 99 Todo App (or similar project) where an
   ever-growing array/cache could become a memory concern in a long-running session —
   write a comment explaining how you'd address it.
6. Rewrite a closure-heavy function from Day 53-57 and identify EXACTLY what data it's
   keeping alive via closure — confirm it's intentional and not an accidental leak.
7. Build a simple "cache with a maximum size" — a `Map`-based cache that automatically
   removes the OLDEST entry once it exceeds a maximum number of entries (a simple LRU-style
   cache), to avoid unbounded growth.
8. Use `WeakMap` (Day 74) to store metadata about DOM elements (simulated with plain
   objects) without risking memory leaks if those elements are later removed.

## Interview-style questions

9. Why is it important to `removeEventListener()` in long-running applications
   (like single-page apps that never fully reload)?
10. What's a simple technique for preventing a cache from growing indefinitely and
    consuming excessive memory over time?
11. Why does `Intl` handle formatting more reliably than manual string manipulation
    for prices/dates across different regions?

## Notes

- Today intentionally revisits Day 106's memory concepts with more hands-on practice,
  alongside `Intl` — both are "professional polish" topics that matter more as
  applications grow larger and longer-lived.
- The "cache with a maximum size" pattern (#7) is a genuinely useful, production-relevant
  technique worth remembering.
