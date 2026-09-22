---
id: "angular-day-191"
title: "Async State and Request Lifecycles"
slug: day-191-async-state-and-request-lifecycles
dayLabel: "Day 191"
level: Advanced
estimatedMinutes: 90
order: 191
track: angular
youtubeVideos: []
---

# Day 191 - Async State and Request Lifecycles

## Goal
Model loading, success, empty, error, refresh, and stale states for asynchronous work.

## Concept
Model loading, success, empty, error, refresh, and stale states for asynchronous work.

## Example
~~~ts
const state = signal({
  items: [] as Job[],
  loading: false,
  error: null as string | null,
});

const visibleJobs = computed(() => state().items);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
Async state is more than a boolean loading flag. Model the lifecycle explicitly and keep request orchestration separate from presentation.

## Exercise
Design typed request state for JobHub search and handle initial load, refresh, success, and failure.

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
