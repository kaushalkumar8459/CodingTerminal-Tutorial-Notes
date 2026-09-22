---
id="angular-day-082"
title="Signal Inputs with input()"
slug="day-082-signal-inputs-with-input"
dayLabel: Day 82
level: Intermediate
estimatedMinutes: 60
order: 82
track: angular
youtubeVideos: []
---
# Day 82 — Signal Inputs with input()

## Goal
Use signal inputs for explicit parent-to-child reactive data flow.

## Example
```ts
readonly job = input.required<Job>();

readonly isRemote = computed(() =>
  this.job().workMode === 'Remote'
);
```

Read the input as a signal with job(). A required input makes the component contract explicit.

## Optional Input
```ts
readonly label = input('Job');
```

## Mental Model
```
Parent
  ↓
input()
  ↓
child reactive state
  ↓
computed / template
```

## Exercise
Create JobSummaryComponent with:
- required Job input
- optional display mode
- computed salary label
- computed remote badge
- modern @if rendering

## Common Mistakes
- Treating input signals like ordinary properties.
- Trying to write to an input from the child.
- Copying input data unnecessarily.
- Using effect() when computed() is enough.

## Interview Questions
1. What is a signal input?
2. input() vs input.required()?
3. How is a signal input read?
4. Why combine signal inputs with computed()?

## Outcome
You can create reactive child components with modern input APIs.
