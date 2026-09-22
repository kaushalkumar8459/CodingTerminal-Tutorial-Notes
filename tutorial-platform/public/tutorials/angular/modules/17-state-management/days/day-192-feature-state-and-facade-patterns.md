---
id="angular-day-192"
title="Feature State and Facade Patterns"
slug="feature-state-and-facade-patterns"
dayLabel="Day 192"
level=Advanced
estimatedMinutes=90
order=192
track=angular
youtubeVideos=[]
---

# Day 192 - Feature State and Facade Patterns

## Goal
Organize feature state behind a focused API so components do not know storage details.

## Concept
Organize feature state behind a focused API so components do not know storage details.

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
A facade can coordinate state, services, and user actions without becoming a god service.

## Exercise
Refactor JobHub jobs into a feature facade with clear commands and readonly state.

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
