---
id="angular-day-198"
title="Cross-Feature State and Boundaries"
slug="cross-feature-state-and-boundaries"
dayLabel="Day 198"
level=Advanced
estimatedMinutes=90
order=198
track=angular
youtubeVideos=[]
---

# Day 198 - Cross-Feature State and Boundaries

## Goal
Design communication between feature stores without hidden global coupling.

## Concept
Design communication between feature stores without hidden global coupling.

## Example
~~~ts
const selectedId = signal<number | null>(null);
const selectedJob = computed(() =>
  jobs().find(job => job.id === selectedId()) ?? null
);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
Prefer shared contracts and explicit commands over direct access to another feature's private state.

## Exercise
Connect candidate jobs and saved-jobs features through a narrow contract.


## Common Mistakes
- Making every value global.
- Duplicating source state.
- Mutating shared collections directly.
- Mixing API transport with state ownership.
- Creating a store before understanding the boundary.

## Interview Questions
1. What problem does this topic solve?
2. Where should this state live?
3. What is source state versus derived state?
4. When would you avoid this pattern?

## Outcome
You can implement the pattern with strict TypeScript and justify the state boundary.
