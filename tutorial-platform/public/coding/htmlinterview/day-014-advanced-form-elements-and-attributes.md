# Day 014 — Advanced Form Elements and Attributes

Matches Tutorial Day 14 (Advanced Form Elements and Attributes).

## Basic

1. Create a `select` with a placeholder option and an `optgroup`.
2. Add a `datalist` for optional suggestions.
3. Show a calculated value with `output` and label what it represents.
4. Add a progress indicator for a task that is 3/5 complete.
5. Set up a POST file-upload form with multipart encoding.
6. Use two submit buttons with different endpoints or methods and explain the override.

## Concept Questions

7. How does `datalist` differ from `select`?
8. What do `meter` and `progress` each represent?
9. Why is `novalidate` potentially harmful?
10. What is the purpose of `form="form-id"`?

## Challenge

11. Build a registration form with session selection, city suggestions, a file upload, a default save action, and a separate preview action. Give each control a label and name.

## Notes

- Do not trust hidden fields, file names, or client-side validation as security controls.
- Inspect the form request in developer tools; actual endpoints must exist to process it.