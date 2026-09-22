---
id="angular-day-084"
title="Signal Queries with viewChild() and viewChildren()"
slug="day-084-signal-queries-viewchild-viewchildren"
dayLabel: Day 84
level: Intermediate
estimatedMinutes: 75
order: 84
track: angular
youtubeVideos: []
---
# Day 84 — Signal Queries with viewChild() and viewChildren()

## Goal
Use modern signal-based view queries only when a component genuinely needs access to its rendered view.

## Element Query
```ts
readonly searchInput =
  viewChild<ElementRef<HTMLInputElement>>('searchInput');
```

Template:

```html
<input #searchInput />
```

The query is read as a signal.

## Required Query
```ts
readonly panel =
  viewChild.required<ElementRef<HTMLDivElement>>('panel');
```

Use required when the queried target must exist.

## Multiple Children
```ts
readonly cards = viewChildren(JobCardComponent);
```

## Good Uses
- focus management
- third-party widget integration
- measuring a rendered element
- coordinating child instances when an input/output contract is insufficient

## Avoid Queries When
- normal bindings solve the problem
- CSS solves the problem
- output() provides a clearer communication contract
- content projection is more appropriate

## Exercise
Build a job list with a focus-search action and job-card queries. Keep normal data flow through inputs and outputs.

## Interview Questions
1. viewChild() vs viewChildren()?
2. When should a query be required?
3. Why should queries not replace component communication?

## Outcome
You can use signal queries without creating unnecessary coupling.
