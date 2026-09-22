---
id="angular-day-100"
title="Cross-Field Validation"
slug="day-100-cross-field-validation"
dayLabel: Day 100
level: Intermediate
estimatedMinutes: 90
order: 100
track: angular
youtubeVideos: []
---
# Day 100 — Cross-Field Validation

## Goal

Validate rules that depend on more than one control.

## Example

Confirm password must equal password.

The validator belongs at the appropriate group level because it needs both values.

Conceptually:

```ts
const passwordMatch: ValidatorFn = group => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;

  return password === confirm
    ? null
    : { passwordMismatch: true };
};
```

## Other Examples

- minimum salary <= maximum salary
- start date <= end date
- country determines allowed state
- remote role requires a remote location

## Exercise

Add salary range validation to a Job Search form.

## Common Mistakes

- Putting a cross-field rule on only one unrelated control.
- Reading stale values.
- Showing a group-level error in the wrong location.
- Mixing validation with submission logic.

## Interview Questions

1. What is cross-field validation?
2. Where should it live?
3. How do you display a group-level error?

## Outcome

You can implement business rules involving multiple fields.
