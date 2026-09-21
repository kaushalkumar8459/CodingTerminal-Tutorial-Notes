# Day 095 — DOM Events Projects

Matches Tutorial Day 95 (DOM Events In Depth). Build each as a small real HTML+JS page.
No limit on how far you extend them.

## Projects

1. **Counter** — buttons to increment/decrement a number displayed on the page, plus a
   reset button.
2. **Calculator** — a basic calculator UI (buttons for digits and `+ - * /`) that builds
   up an expression and calculates the result on `=`.
3. **Character Counter** — a `<textarea>` with a live character count that updates on
   every keystroke, and turns red if it exceeds a maximum length.
4. **Password Toggle** — a password field with a button/icon that shows/hides the
   password by toggling the input's `type`.
5. **Image Preview** — a file input (`<input type="file">`) that shows a preview of the
   selected image immediately, before any upload (hint: research `URL.createObjectURL()`
   or `FileReader`).

## Concept

6. Add keyboard support to the calculator: typing digits and operators on the keyboard
   should work the same as clicking the buttons.
7. Add a "Enter to calculate" keyboard shortcut to the calculator using `keydown` and
   checking `event.key === "Enter"`.
8. Add hover effects to the calculator buttons using `mouseover`/`mouseout` (or CSS
   `:hover` if you prefer, and note the tradeoff in a comment).
9. Add validation to the character counter: disable a "submit" button if the count is
   over the maximum.

## Interview-style questions

10. Why might you handle BOTH click events AND keyboard events for the same
    calculator actions?
11. What's the practical difference between using CSS `:hover` versus JavaScript
    `mouseover`/`mouseout` for a hover effect — when would you need JavaScript
    specifically?

## Notes

- These five projects are genuinely useful portfolio pieces — take the time to make
  them look reasonably polished, not just functionally correct.
- Test each project by actually clicking/typing in a real browser repeatedly — DOM
  event bugs often only show up through actual interaction, not code review alone.
