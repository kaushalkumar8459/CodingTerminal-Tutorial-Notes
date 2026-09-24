---
id: "angular-day-094"
title: "Reactive Forms Fundamentals"
slug: "day-094-reactive-forms-fundamentals"
dayLabel: Day 94
level: Intermediate
estimatedMinutes: 75
order: 94
track: angular
youtubeVideos: []
---
# Day 94 — Reactive Forms Fundamentals

## Goal

Move from template-defined forms to an explicit form model in TypeScript.

## Why Reactive Forms?

Reactive forms are useful when you need:

- complex validation
- dynamic controls
- programmatic updates
- predictable form structure
- reusable form logic
- stronger typing

## Basic Shape

```ts
readonly form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
});
```

Template:

```html
<form [formGroup]="form" (ngSubmit)="save()">
  <input formControlName="name">
  <input formControlName="email">
  <button type="submit">Save</button>
</form>
```

## Mental Model

```
TypeScript form model
       ↓
     template
       ↓
     user input
       ↓
  form state/value
```

## Exercise

Rebuild the registration form from Day 92 using reactive forms.

## Common Mistakes

- Mixing form approaches without a reason.
- Duplicating values outside the form model.
- Treating reactive forms as merely a different template syntax.

## Interview Questions

1. Why use reactive forms?
2. What is formControlName?
3. What does [formGroup] do?
4. When are reactive forms preferable?

## Outcome

You can create a basic reactive form.
