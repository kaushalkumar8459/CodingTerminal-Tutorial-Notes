---
id="angular-day-083"
title="output() and model() for Reactive Component APIs"
slug="day-083-output-and-model-reactive-component-apis"
dayLabel: Day 83
level: Intermediate
estimatedMinutes: 75
order: 83
track: angular
youtubeVideos: []
---
# Day 83 — output() and model() for Reactive Component APIs

## Goal
Choose the correct modern component communication API.

## Child-to-Parent
```ts
readonly saved = output<Job>();

save(): void {
  this.saved.emit(this.job());
}
```

Use output() for an explicit event.

## Two-Way Value
```ts
readonly selected = model<string>('');
```

Parent:

```html
<app-filter [(selected)]="selectedFilter" />
```

Use model() when the child owns a value that should support two-way binding.

## Decision Guide
- Parent → child value: input()
- Child → parent event: output()
- Genuine two-way value: model()

## Exercise
Build JobStatusSelector with status options, model() for selected status, and output() for an explicit apply action.

## Common Mistakes
- Using two-way binding for every interaction.
- Making every input a model.
- Mixing business logic into reusable UI components.

## Interview Questions
1. What is output()?
2. When should model() be used?
3. Is model() a replacement for input() and output()?
4. How do you keep component contracts explicit?

## Outcome
You can design clean reactive component APIs.
