# Day 080 — Promise Basics

Matches Tutorial Day 80 (The JavaScript Runtime) — practice previews Promises here,
ahead of Tutorial Day 83's full explanation. No limit on how many you build.

## Basic

1. Create a `new Promise((resolve, reject) => { resolve("Done!"); })` and log its
   result using `.then()`.
2. Create a Promise that calls `reject(new Error("Something went wrong"))`, and log
   the error using `.catch()`.
3. Create a Promise that uses `setTimeout()` internally to resolve after a delay
   (simulating an async operation).
4. Create a Promise-based version of your Day 78 `login(username, password)` function
   — return a `new Promise` instead of using a callback parameter.
5. Call your Promise-based `login()` and handle both success (`.then()`) and failure
   (`.catch()`).

## Concept

6. Build Promise-based versions of `getUser`, `getOrders`, and `getProducts` from
   Day 78, each wrapped in `setTimeout()` to simulate delay.
7. Build a `simulatePayment(amount)` function returning a Promise that resolves if
   `amount > 0`, and rejects otherwise.
8. Build a `simulateFileUpload(fileSizeMB)` function returning a Promise that resolves
   after a delay proportional to file size (larger files "take longer").
9. Create a Promise, then log something IMMEDIATELY after creating it (before
   `.then()` fires) — observe and explain the order of the output.

## Interview-style questions

10. What are the three states a Promise can be in?
11. Once a Promise is `resolved` or `rejected`, can it ever change to a different
    state again?
12. Why is a Promise generally considered clearer than a plain callback-based async
    function, based on what you experienced with callback hell on Day 79?

## Notes

- A Promise is a placeholder for a value that isn't available yet, but will be (or
  will fail) at some point — creating one doesn't block anything, exactly like the
  Web APIs from today's tutorial.
- Keep your Day 78 callback-based functions handy — you'll be comparing them directly
  against these Promise-based rewrites over the next few days.
