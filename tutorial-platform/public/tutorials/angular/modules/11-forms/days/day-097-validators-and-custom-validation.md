---
id="angular-day-097"
title="Validators and Custom Validation"
slug="day-097-validators-and-custom-validation"
dayLabel: Day 97
level: Intermediate
estimatedMinutes: 90
order: 97
track: angular
youtubeVideos: []
---
# Day 97 — Validators and Custom Validation

## Goal

Build reusable validation rules.

## Built-In Validators

Common validators include:

- required
- min
- max
- minLength
- maxLength
- email
- pattern

Example:

```ts
email: this.fb.nonNullable.control('', [
  Validators.required,
  Validators.email
])
```

## Custom Validator

A synchronous validator returns null when valid or an error object when invalid.

Conceptually:

```ts
function forbiddenCompany(): ValidatorFn {
  return control => {
    const value = String(control.value).trim().toLowerCase();

    return value === 'example'
      ? { forbiddenCompany: true }
      : null;
  };
}
```

Keep validators pure and reusable.

## Exercise

Create:

- minimum experience validator
- forbidden company validator
- allowed skill validator

## Common Mistakes

- Returning false instead of null/error object.
- Putting business side effects inside validators.
- Duplicating the same rule across components.
- Using validation to perform API calls.

## Interview Questions

1. What does a ValidatorFn return?
2. Why return null for valid input?
3. Synchronous vs asynchronous validation?
4. Where should reusable validators live?

## Outcome

You can create maintainable validation rules.
