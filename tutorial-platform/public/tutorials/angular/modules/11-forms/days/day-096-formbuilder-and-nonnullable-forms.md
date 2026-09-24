---
id: "angular-day-096"
title: "FormBuilder and Non-Nullable Forms"
slug: "day-096-formbuilder-and-nonnullable-forms"
dayLabel: Day 96
level: Intermediate
estimatedMinutes: 75
order: 96
track: angular
youtubeVideos: []
---
# Day 96 — FormBuilder and Non-Nullable Forms

## Goal

Reduce repetitive form construction and improve type safety.

## FormBuilder

Inject FormBuilder:

```ts
private readonly fb = inject(FormBuilder);
```

Then build:

```ts
readonly form = this.fb.nonNullable.group({
  name: '',
  email: '',
  experience: 0
});
```

Using nonNullable forms makes the control values non-nullable when the form is initialized with concrete defaults.

## Why This Matters

A typed form should communicate valid application assumptions instead of forcing null checks everywhere.

## Exercise

Convert the Job Application form to a non-nullable FormBuilder model.

## Common Mistakes

- Using any to silence form typing.
- Making every field nullable without a business reason.
- Hiding type problems with casts.

## Interview Questions

1. What does FormBuilder do?
2. Why use nonNullable?
3. Why is strong typing important in forms?

## Outcome

You can create concise, typed reactive form models.
