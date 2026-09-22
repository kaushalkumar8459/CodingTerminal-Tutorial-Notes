# Day 096 — Event Bubbling/Capturing Experiment

Matches Tutorial Day 96 (Event Propagation). No limit on how many variations you try.

## The experiment

1. Build 3 nested `<div>` elements (outer, middle, inner), each with a click listener
   that logs its own name. Click the INNERMOST one and observe the console output order.
2. Add `event.stopPropagation()` to the MIDDLE div's listener, click the inner div
   again, and observe how the output changes.
3. Rebuild the same 3 nested divs, but this time add all three listeners with
   `{ capture: true }` — click the inner div and observe the NEW output order
   (should be outer → middle → inner, the opposite of default bubbling).
4. Combine capturing AND bubbling listeners on the SAME elements (some with
   `{ capture: true }`, some without) — click the inner div and carefully trace/predict
   the full order before checking the actual console output.

## Concept

5. Build a click listener on a `<button>` INSIDE an `<a>` tag (a link wrapping a
   button) — click the button and observe whether the link's default navigation
   behavior also happens (test with and without `preventDefault()`).
6. Build a form with a submit button; add a click listener on the button that calls
   `stopPropagation()`, and a SEPARATE listener on the form's `submit` event — observe
   whether stopping propagation on the button's click affects the form's submit event
   at all (these are different event types entirely — a useful distinction to notice).
7. Write a short summary (in comments) explaining, in your own words: what problem
   would you use `stopPropagation()` to solve in a REAL application (think about
   nested clickable elements, like a delete button inside a clickable card)?

## Interview-style questions

8. In what order do nested click listeners fire, by default (capturing, target,
   bubbling — which order do handlers actually run in without any special options)?
9. What's a realistic, practical reason you might need `stopPropagation()` in a real UI
   (e.g. a card that's clickable, containing a delete button that's ALSO clickable)?
10. Why is `preventDefault()` unrelated to whether an event continues to bubble or not?

## Notes

- This is one of those topics that's much clearer through direct experimentation than
  through reading alone — actually build the nested divs and click around, watching the
  console output for each variation.
- The "clickable card with a delete button inside it" scenario (question #9) is an
  extremely common real-world use case for `stopPropagation()` — keep it in mind for
  future projects.
