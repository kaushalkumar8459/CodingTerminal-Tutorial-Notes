---
id: "angular-day-102"
title: "Form UX: Errors, Dirty, Touched, Pending & Submission"
slug: "day-102-form-ux-errors-dirty-touched-pending-submission"
dayLabel: Day 102
level: Intermediate
estimatedMinutes: 75
order: 102
track: angular
youtubeVideos: []
---
# Day 102 — Form UX: Errors, Dirty, Touched, Pending & Submission

## Goal

Turn technically valid forms into usable forms.

## Error Timing

A practical strategy:

- untouched → avoid noisy error
- touched + invalid → show relevant error
- submitted + invalid → reveal remaining required errors

## State-Based UX

Use existing form state instead of manually tracking duplicates.

Useful concepts:

- touched
- dirty
- pristine
- valid
- invalid
- pending
- submitted

## Submission Flow

A robust submission flow should:

1. prevent invalid submission
2. mark relevant controls for validation feedback
3. preserve entered values
4. show submission state
5. display a success result only after valid submission

## Accessibility

Use:

- real labels
- clear error text
- meaningful button names
- keyboard-accessible custom controls
- appropriate descriptions for complex fields

## Exercise

Improve the Job Application form with professional error messages and keyboard-friendly UX.

## Interview Questions

1. touched vs dirty?
2. What is pending?
3. Why should error timing matter?
4. How do you make form errors accessible?

## Outcome

You can design form feedback around user interaction instead of exposing raw validator state.
