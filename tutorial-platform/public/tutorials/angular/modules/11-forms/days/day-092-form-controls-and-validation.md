---
id="angular-day-092"
title="Form Controls and Validation"
slug="day-092-form-controls-and-validation"
dayLabel: Day 92
level: Beginner
estimatedMinutes: 75
order: 92
track: angular
youtubeVideos: []
---
# Day 92 — Form Controls and Validation

## Goal

Validate user input and display useful feedback.

## Built-In Validators

Template-driven forms support validation attributes such as:

```html
<input
  name="email"
  [(ngModel)]="email"
  required
  email
>
```

Angular tracks validation state on the control.

Useful states include:

- valid / invalid
- touched / untouched
- dirty / pristine

## Error UX

Do not show every error immediately.

A common pattern is:

```html
@if (emailControl.invalid && emailControl.touched) {
  <p>Email is invalid.</p>
}
```

## Exercise

Add validation to a registration form:

- name required
- email required and valid
- password required
- minimum password length
- terms checkbox required

## Common Mistakes

- Showing errors before the user interacts.
- Validating only on submit.
- Writing complex validation expressions repeatedly.
- Ignoring accessible labels and error messages.

## Interview Questions

1. What is touched?
2. What is dirty?
3. What is pristine?
4. How should validation messages be displayed?

## Outcome

You can build basic validated forms with useful interaction feedback.
