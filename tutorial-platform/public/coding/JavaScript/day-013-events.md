# Day 013 — Events (Browser)

Matches Tutorial Day 13 (JavaScript Events). Build these as small standalone HTML+JS pages.
No limit on how many you build/extend.

## Basic

1. Add a button that logs "Clicked!" to the console using `addEventListener("click", ...)`.
2. Add a text input that logs its current value on every keystroke (`input` event).
3. Add a text input that logs its value only when it loses focus (`change` event).
4. Add a form with one field and prevent the default submit reload using `event.preventDefault()`.
5. Add a button that changes its own text when clicked.

## Concept / Projects

6. **Counter** — a button that increases a number shown on the page each time it's clicked,
   plus a second button that resets it to 0.
7. **Character Counter** — a text area where a live character count updates as the user types.
8. **Password Visibility Toggle** — a password field with a button/icon that switches the
   input's type between `password` and `text` to show/hide the value.
9. **Button Color Changer** — a button that changes its own background color each time it's
   clicked (cycle through a fixed list of colors).
10. **Live Input Preview** — a text input that mirrors what's typed into a `<p>`/`<div>` on
    the page in real time.

## Interview-style questions

11. What is the difference between the `input` and `change` events on a text field?
12. What does `event.preventDefault()` do, and when would you need it?
13. What does `event.target` refer to, and why is it useful in a click handler attached to
    a list of buttons?

## Notes

- These are meant to be tiny real HTML pages (one `.html` + one `.js` file each, or inline
  `<script>` for speed) — actually click around in a browser to see the behavior, don't just
  read the code.
- Keep using `console.log()` liberally while building these — it's the fastest way to
  confirm an event handler actually fired.
