---
id="angular-day-093"
title="Form Groups and Form State"
slug="day-093-form-groups-and-form-state"
dayLabel: Day 93
level: Beginner
estimatedMinutes: 60
order: 93
track: angular
youtubeVideos: []
---
# Day 93 — Form Groups and Form State

## Goal

Understand the hierarchy of Angular form state.

## Form Tree

A form can be thought of as:

```
Form
 └── Controls
      ├── name
      ├── email
      └── phone
```

A group combines related controls and exposes aggregate state.

## Interaction State

Learn:

- valid / invalid
- pending
- touched / untouched
- dirty / pristine
- submitted

## Why Aggregate State Matters

A submit button may depend on the whole form:

```html
<button [disabled]="form.invalid">
  Submit
</button>
```

The application should not maintain another manually synchronized boolean such as isFormValid.

## Exercise

Take yesterday's registration form and identify:

- individual control state
- form-level state
- submission state
- error display conditions

## Interview Questions

1. What is FormGroup?
2. How does child state affect parent state?
3. Why avoid duplicating form validity in another variable?
4. What is pending?

## Outcome

You understand Angular form state as a hierarchy instead of isolated inputs.
