---
id="angular-day-101"
title="Custom Form Controls and ControlValueAccessor"
slug="day-101-custom-form-controls-controlvalueaccessor"
dayLabel: Day 101
level: Advanced
estimatedMinutes: 90
order: 101
track: angular
youtubeVideos: []
---
# Day 101 — Custom Form Controls and ControlValueAccessor

## Goal

Make a reusable custom component behave like a native Angular form control.

## The Problem

Suppose you build:

```
<app-rating />
```

You want consumers to use it with a form:

```html
<app-rating formControlName="rating" />
```

Angular needs a bridge between the custom component and the forms API.

## ControlValueAccessor

A ControlValueAccessor connects a custom UI component to Angular forms.

Core responsibilities include:

- write a value into the component
- notify Angular when the user changes the value
- notify Angular when the control is touched
- respond to disabled state

## Exercise

Build a reusable RatingControl with:

- 1–5 rating
- keyboard interaction
- disabled state
- touched state
- form integration

## Common Mistakes

- Forgetting to call the registered change callback.
- Forgetting touched notification.
- Ignoring disabled state.
- Making the custom control depend on a specific parent form.

## Interview Questions

1. What is ControlValueAccessor?
2. Why is it needed?
3. What callbacks does a custom control implement?
4. How do you support disabled state?

## Outcome

You can build reusable form controls that integrate with Angular's forms API.
