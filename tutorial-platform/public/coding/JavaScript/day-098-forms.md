# Day 098 — Forms: Registration Form

Matches Tutorial Day 98 (Forms and Validation). No limit on how far you extend this.

## Project: Registration Form

Build a registration form with fields: `name`, `email`, `phone`, `password`,
`confirm password`. Implement:

1. Prevent default submission and read all fields using `FormData`.
2. Validate `name` is non-empty.
3. Validate `email` contains `@` and a `.` after it (basic check is fine for now —
   real regex validation comes on Day 103).
4. Validate `phone` is exactly 10 digits (numbers only).
5. Validate `password` is at least 8 characters.
6. Validate `confirm password` exactly matches `password`.
7. Display a clear error message next to EACH invalid field (don't just show one
   generic error for the whole form).
8. On successful validation, clear all error messages, log the collected data, and
   reset the form.

## Concept

9. Add live validation: validate the email field as soon as the user leaves it (an
   `input`'s `blur` event), instead of waiting until form submission.
10. Add a live "password strength" indicator that updates as the user types (e.g.
    weak/medium/strong based on length and character variety).
11. Disable the submit button until all required fields have SOME value (even before
    full validation runs), then re-enable full validation on submit.
12. Add a visual indicator (e.g. a red border via `classList`) on invalid fields, in
    addition to the text error message.

## Interview-style questions

13. Why is collecting ALL validation errors before displaying them usually better UX
    than stopping and only showing the FIRST error found?
14. What's the benefit of validating a field on `blur` (as soon as the user leaves it)
    in addition to validating on final form submission?
15. Why should you always call `event.preventDefault()` even while you're still
    building/testing form validation logic?

## Notes

- Build this as a real, functioning HTML page — test with various invalid inputs
  deliberately (empty fields, mismatched passwords, invalid emails) to confirm every
  validation rule actually works.
- Keep your validation logic in clearly separated functions (one function per field,
  or one function collecting all errors) rather than one giant tangled submit handler.
