# Day 014 — Local Storage

Matches Tutorial Day 14 (Browser Storage). No limit on how many you solve/extend.

## Basic

1. Save your name to Local Storage and read it back with `getItem`.
2. Save a number as a string to Local Storage, read it back, and convert it back to a number.
3. Remove a single key from Local Storage and confirm it's gone (`getItem` returns `null`).
4. Clear all of Local Storage and confirm every key is gone.
5. Save an object using `JSON.stringify()`, then read and `JSON.parse()` it back.
6. Save an array of strings using JSON, then read it back and print each item.
7. Check if a key exists in Local Storage before trying to use its value.
8. Save a value to Session Storage instead of Local Storage, and describe how its lifetime differs.
9. Overwrite an existing Local Storage key with a new value and confirm the update.
10. Save today's date (as a string) to Local Storage as a "last visited" marker.

## Concept

11. Build a `saveUser(user)` / `loadUser()` pair of functions that stringify/parse automatically.
12. Build a "theme preference" toggle that saves `"light"`/`"dark"` to Local Storage and
    reads it back on page load.
13. Build a simple visit counter that increments a number in Local Storage every time the
    page loads.
14. Handle the case where a key doesn't exist yet (first-time visit) without crashing.
15. Build a function `clearAppData()` that removes only your app's specific keys, without
    wiping unrelated Local Storage data.

## Project: Persistent Notes App

16. Build a small notes app with:
    - An input + "Add Note" button.
    - Notes are displayed in a list on the page.
    - Each note has a "Delete" button.
    - All notes are saved to Local Storage as a JSON array.
    - When the page is reloaded, previously saved notes still appear.

## Interview-style questions

17. Why can Local Storage only store strings, and what's the standard workaround for
    storing objects/arrays?
18. What's the practical difference between Local Storage and Session Storage?
19. Why should you avoid storing sensitive data (like passwords) in Local Storage?

## Notes

- Always wrap `JSON.parse()` calls in a `try/catch` in real projects — corrupted or
  missing data can otherwise crash your app (a light preview of Day 89's error handling).
- Test your Notes App by refreshing the page after adding notes — if they disappear,
  something in your save/load logic needs fixing.
