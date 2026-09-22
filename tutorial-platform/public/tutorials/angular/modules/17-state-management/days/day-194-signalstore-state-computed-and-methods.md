---
id: "angular-day-194"
title: "SignalStore State, Computed and Methods"
slug: day-194-signalstore-state-computed-and-methods
dayLabel: "Day 194"
level: Advanced
estimatedMinutes: 90
order: 194
track: angular
youtubeVideos: []
---

# Day 194 - SignalStore State, Computed and Methods

## Goal
Compose source state, derived values, and methods in a SignalStore feature.

## Concept
Compose source state, derived values, and methods in a SignalStore feature.

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
State holds source data, computed values expose derived state, and methods define intentional transitions.

## Exercise
Build a job-filter store with active-filter count and reset methods.

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
