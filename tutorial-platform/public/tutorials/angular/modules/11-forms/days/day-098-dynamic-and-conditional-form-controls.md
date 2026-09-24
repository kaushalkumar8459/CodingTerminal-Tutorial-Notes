---
id: "angular-day-098"
title: "Dynamic and Conditional Form Controls"
slug: "day-098-dynamic-and-conditional-form-controls"
dayLabel: Day 98
level: Intermediate
estimatedMinutes: 90
order: 98
track: angular
youtubeVideos: []
---
# Day 98 — Dynamic and Conditional Form Controls

## Goal

Change a form structure when the user's choices require different fields.

## Example

If employment type is Contractor, show contract duration.

The UI condition and form model must stay synchronized.

## Add a Control

Reactive forms allow controls to be added and removed programmatically.

Conceptually:

```ts
this.form.addControl('contractDuration', this.fb.nonNullable.control(0));
this.form.removeControl('contractDuration');
```

Use the appropriate typed form design so dynamic fields remain type-safe.

## Conditional Validation

A field may become required only for a particular selection.

When the rule changes, update validators and then recalculate validity.

## Exercise

Create an employment form:

- employment type
- company
- contract duration only for contractors
- notice period
- current salary

## Common Mistakes

- Hiding a field without considering its form control.
- Leaving obsolete validators active.
- Losing user values when unnecessarily recreating controls.
- Mixing template conditions and form-model rules inconsistently.

## Interview Questions

1. How do you add a control dynamically?
2. How do you remove one?
3. How do you change validators at runtime?
4. Why must UI and form model stay synchronized?

## Outcome

You can build forms whose structure changes with user choices.
