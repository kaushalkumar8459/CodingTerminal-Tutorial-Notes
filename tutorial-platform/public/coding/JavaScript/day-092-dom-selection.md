# Day 092 — DOM Selection: Dynamic User List

Matches Tutorial Day 92 (DOM Introduction). Build these as real HTML+JS pages you
actually open in a browser. No limit on how far you extend them.

## Basic

1. Select an element by ID and log its `textContent`.
2. Select an element by class using `querySelector()`.
3. Select all elements of a given class using `querySelectorAll()`, and log how many
   were found.
4. Select an element using an attribute selector (e.g. `querySelector('[data-role="admin"]')`).
5. Try selecting an element that doesn't exist, and confirm the result is `null` /
   an empty `NodeList` (don't let this crash your script).

## Project: Dynamic User List

6. Given an array of user objects (`{name, email}`) defined in your JavaScript, write
   code that creates the necessary DOM elements and displays each user as a list item
   inside a `<ul>` already present in your HTML (you don't need `createElement()` skills
   yet if you'd rather build the HTML as a string and set it via `innerHTML` — that's
   fine for today, `createElement()` is covered fully tomorrow).
7. Add a search input above the list; as the user types, filter the DISPLAYED list to
   only show users whose name matches (reuse your Module 3 filter skills).
8. Add a count display showing "Showing X of Y users" that updates as the search
   filters the list.
9. Select the search input itself using `querySelector()`, and log its current value
   whenever it changes.

## Interview-style questions

10. What's the difference between `document.getElementById()` and
    `document.querySelector()` in terms of what selectors they accept?
11. Why does `querySelectorAll()` return a `NodeList` instead of a true array, and
    what's one practical consequence of that (hint: think about which array methods
    work directly on it)?

## Notes

- Actually open your HTML file in a real browser and interact with it — reading DOM
  code without seeing it run misses most of the learning value.
- Use the browser's DevTools Console (`F12`) throughout — `console.log()` your selected
  elements to confirm you're selecting exactly what you expect before moving on.
