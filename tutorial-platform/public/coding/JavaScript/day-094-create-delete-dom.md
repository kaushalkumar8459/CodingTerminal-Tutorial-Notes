# Day 094 — Create/Delete DOM: Dynamic Todo List

Matches Tutorial Day 94 (Creating and Removing Elements). No limit on how far you extend this.

## Basic

1. Create a new `<li>` element with `createElement()`, set its text, and `append()` it
   to an existing `<ul>`.
2. Create and append 5 list items in a loop, each with different text.
3. Select an existing list item and `.remove()` it.
4. Use `.prepend()` to add a new item to the TOP of a list instead of the bottom.
5. Use `.replaceWith()` to swap one list item for a newly created one.

## Project: Dynamic Todo List

6. Build a todo list with an input field and an "Add" button — clicking "Add" creates
   a new `<li>` with the input's text and appends it to the list, then clears the input.
7. Add a delete button to EACH todo item (created dynamically alongside the item
   itself) that removes just that specific item when clicked.
8. Prevent adding empty todos (validate the input isn't just whitespace before creating
   a new item).
9. Add a "Clear All" button that removes every todo item from the list at once.
10. Add a counter showing how many todo items currently exist, updating every time one
    is added or removed.

## Interview-style questions

11. Why must a new element be INSERTED into the DOM (via `append`/`prepend`) before
    it becomes visible on the page?
12. What's the difference between removing an element with `.remove()` versus just
    hiding it with CSS (`display: none`)?
13. Why might delete buttons need to be created dynamically alongside each todo item,
    rather than existing once in the static HTML?

## Notes

- This is your first project where EVERY visible item is created entirely by
  JavaScript — a genuinely dynamic page, not just editing pre-existing HTML.
- Watch out for a common bug: forgetting to attach the delete button's click handler
  to the SPECIFIC item just created, rather than accidentally reusing a handler meant
  for a different item.
