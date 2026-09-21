---
title: Forms and Validation
slug: day-098-forms-and-validation
dayLabel: Day 98
level: Advanced
estimatedMinutes: 30
order: 98
track: javascript
---

# Day 98 [Advanced]: Forms and Validation

## Goal

Learn to handle form submission, read form data with `FormData`, and build custom validation with clear error messages.

## Prerequisites

- Day 13 (submit event, preventDefault), Day 92–93 (DOM selection/manipulation)

## Explanation

Forms are one of the most common real-world interactive elements — handling them properly means intercepting the `submit` event (preventing the default page reload), reading the entered values, validating them, and showing clear feedback when something's wrong. `FormData` provides a convenient way to read ALL of a form's field values at once, rather than selecting and reading each input individually.

## Topic by Topic

### Topic 1: Handling form submission

Theory:
Listen for the `submit` event on the `<form>` element itself (not the button); always call `event.preventDefault()` to stop the default full-page reload/navigation.

Code Example:

```html
<form id="signupForm">
  <input name="email" type="email" />
  <button type="submit">Sign Up</button>
</form>
```

```js
document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault(); // stop the default page reload
  console.log("Form submitted!");
});
```

**Explanation:** Without `preventDefault()`, submitting this form would reload the entire page — intercepting the event lets you handle the submission entirely with JavaScript instead.

**Key Points:**

- Listen for `submit` on the `<form>` element, not a click on the button.
- Always call `event.preventDefault()` first, to stop the default page reload.
- This is the standard starting point for any JavaScript-handled form.

### Topic 2: Reading form data with `FormData`

Theory:
`new FormData(formElement)` creates an object representing all of the form's current field values, accessible via `.get(fieldName)`.

Code Example:

```js
document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  console.log(formData.get("email"));
});
```

**Explanation:** `FormData` reads directly from the form's `name` attributes — `formData.get("email")` retrieves the value of the input with `name="email"`, without needing to manually select and read that specific input.

**Key Points:**

- `FormData` requires each input to have a `name` attribute to be readable this way.
- `.get(fieldName)` retrieves a specific field's current value.
- This is often more convenient than manually selecting and reading every individual input.

### Topic 3: Custom validation

Theory:
Beyond built-in HTML validation attributes (`required`, `type="email"`), custom JavaScript validation lets you check more complex rules and show your own error messages.

Code Example:

```js
function validateForm(formData) {
  const errors = {};
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !email.includes("@")) {
    errors.email = "Please enter a valid email";
  }
  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}
```

**Explanation:** `validateForm` collects ALL validation errors into one object, rather than stopping at the first one — allowing you to display multiple error messages to the user at once, which is generally a better user experience.

**Key Points:**

- Custom validation lets you check rules beyond what HTML attributes alone support.
- Collecting all errors together (rather than stopping at the first) is usually better UX.
- Keep validation logic in a dedicated function, separate from the submit handler itself.

### Topic 4: Displaying validation errors

Theory:
Show validation errors by inserting/updating error message elements near their corresponding fields, typically using `textContent` and `classList` from Day 93.

Code Example:

```js
function displayErrors(errors) {
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = "")); // clear old errors

  for (const field in errors) {
    const errorEl = document.querySelector(`#${field}-error`);
    if (errorEl) errorEl.textContent = errors[field];
  }
}

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const errors = validateForm(formData);

  if (Object.keys(errors).length === 0) {
    console.log("Form is valid! Submitting...");
  } else {
    displayErrors(errors);
  }
});
```

**Explanation:** This combines everything: preventing the default reload, reading the data, validating it, and either proceeding or showing clear error messages — a complete, realistic form-handling flow.

**Key Points:**

- Clear previous error messages before showing new ones, to avoid stale errors lingering.
- `Object.keys(errors).length === 0` is a clean way to check "are there any validation errors at all?"
- This complete flow (prevent default → read data → validate → respond) is the standard pattern for any real form.

## Recap

- Always `preventDefault()` on form `submit` to stop the default page reload.
- `FormData` conveniently reads all form field values via their `name` attributes.
- Custom validation collects and displays clear error messages, going beyond basic HTML validation attributes.

## What's Next

Practice for today: `public/coding/JavaScript/day-098-forms.md` — build a Registration Form. Day 99 covers browser storage and cookies in more depth.
