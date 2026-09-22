---
id="angular-day-099"
title="FormArray and Repeating Fields"
slug="day-099-formarray-repeating-fields"
dayLabel: Day 99
level: Intermediate
estimatedMinutes: 90
order: 99
track: angular
youtubeVideos: []
---
# Day 99 — FormArray and Repeating Fields

## Goal

Model repeated form sections.

## Example

A candidate can have multiple skills.

```ts
readonly skills = this.fb.array([
  this.fb.nonNullable.control('')
]);
```

Template:

```html
@for (skill of skills.controls; track $index) {
  <input [formControl]="skill">
}
```

## Operations

Learn to:

- push
- insert
- removeAt
- clear
- inspect length

## Nested FormArray

A FormArray can contain FormGroups for repeated objects such as:

- previous jobs
- education
- certifications
- projects

## Exercise

Add a dynamic Work Experience section where users can add and remove previous jobs.

## Common Mistakes

- Using array indexes as business identifiers.
- Forgetting to validate each repeated control.
- Recreating the entire array unnecessarily.
- Ignoring keyboard and screen-reader usability.

## Interview Questions

1. What is FormArray?
2. FormArray vs FormGroup?
3. When should you use nested FormArrays?
4. How do you add/remove an item?

## Outcome

You can model repeated form sections cleanly.
