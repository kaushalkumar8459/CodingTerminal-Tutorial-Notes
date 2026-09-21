# Day 097 — Event Delegation: Dynamic Todo List

Matches Tutorial Day 97 (Event Delegation). Rebuild Day 94's Todo List using delegation
this time. No limit on how far you extend it.

## Rebuild the Todo List with delegation

1. Rebuild the Day 94 Dynamic Todo List, but this time attach ONLY ONE click listener
   on the `<ul>` (or a wrapping container), instead of attaching a listener to each
   individual delete button.
2. Inside the single delegated listener, use `event.target` and `.closest()` to
   determine whether a delete button was clicked, and which specific `<li>` to remove.
3. Add a "complete" toggle: clicking directly on the todo TEXT (not the delete button)
   toggles a `completed` class on that item — handle this in the SAME delegated
   listener, distinguishing it from delete-button clicks.
4. Confirm that todo items added AFTER the page first loads are still fully
   interactive (both delete and complete-toggle) without any extra code needed for them.

## Concept

5. Build a delegated listener on a table (or list) of "products," where clicking a
   row highlights it (toggles a `selected` class), using delegation instead of
   per-row listeners.
6. Combine delegation with a `data-id` attribute on each item, so your delegated
   handler can identify exactly WHICH item (by ID) was interacted with, not just its
   position.
7. Compare the total number of event listeners in your delegated version vs. a
   non-delegated version with 50 todo items — count them explicitly and note the
   difference.

## Interview-style questions

8. Why does event delegation automatically work for elements added to the page AFTER
   the delegated listener was set up?
9. What's the role of `.closest()` in a typical event delegation handler?
10. When would event delegation NOT be worth using (think about a single static button
    that never changes)?

## Notes

- Compare this rebuild directly against your Day 94 version — delegation should feel
  like a genuine simplification, not just a different way to write the same thing.
- `event.target.closest(selector)` is the single most important tool for delegation —
  make sure it feels comfortable before moving on.
