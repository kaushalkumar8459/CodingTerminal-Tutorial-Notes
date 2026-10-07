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

<!-- codingterminal-solution:start -->

# Day 098 — Solution: Registration Form

```js
const form = document.querySelector("#registration");
const fields = ["name", "email", "phone", "password", "confirmPassword"];
function setError(name, message) {
  const field = form.elements[name];
  document.querySelector(`#${name}-error`).textContent = message;
  field.classList.toggle("invalid", Boolean(message));
}
function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  const at = data.email.indexOf("@");
  if (at < 1 || data.email.indexOf(".", at) === -1)
    errors.email = "Enter a valid email";
  if (!/^\d{10}$/.test(data.phone))
    errors.phone = "Phone must contain 10 digits";
  if (data.password.length < 8)
    errors.password = "Password must have 8 characters";
  if (data.confirmPassword !== data.password)
    errors.confirmPassword = "Passwords must match";
  return errors;
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validate(data);
  fields.forEach((name) => setError(name, errors[name] || ""));
  if (Object.keys(errors).length === 0) {
    console.log(data);
    form.reset();
  }
});
form.elements.email.addEventListener("blur", (event) =>
  setError(
    "email",
    validate({
      email: event.target.value,
      name: "x",
      phone: "0000000000",
      password: "12345678",
      confirmPassword: "12345678",
    }).email || "",
  ),
);
form.elements.password.addEventListener("input", (event) => {
  document.querySelector("#strength").textContent =
    event.target.value.length >= 12
      ? "strong"
      : event.target.value.length >= 8
        ? "medium"
        : "weak";
});
form.addEventListener("input", () => {
  document.querySelector("#submit").disabled = fields.some(
    (name) => !form.elements[name].value,
  );
});
```

## Interview-style questions

**13.** Showing all errors lets users fix the complete form in one pass instead of repeatedly submitting to discover one issue at a time.

**14.** Blur validation gives timely feedback while the user still has context, while submit validation remains the final safety check.

**15.** `preventDefault()` stops the browser from navigating or reloading before your validation and error display code runs.

<!-- codingterminal-solution:end -->

