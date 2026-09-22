---
id="angular-day-186"
title="State Management Problems and State Ownership"
slug="state-management-problems-and-state-ownership"
dayLabel="Day 186"
level=Intermediate
estimatedMinutes=75
order=186
track=angular
youtubeVideos=[]
---

# Day 186 - State Management Problems and State Ownership

## Goal
Understand why state management becomes a problem as an Angular application grows.

## Concept
Understand why state management becomes a problem as an Angular application grows.

## Example
~~~ts
interface FeatureState {
  items: Job[];
  selectedId: number | null;
  loading: boolean;
}

readonly items = signal<Job[]>([]);
readonly selectedId = signal<number | null>(null);
readonly selectedJob = computed(() =>
  items().find(job => job.id === selectedId()) ?? null
);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
State is data plus ownership plus update rules. The first question is not which library to use; it is who owns the state.

## Exercise
Classify JobHub values as local UI, feature, shared client, server, or form state.

## Common Mistakes
- Making every value global.
- Duplicating the same source state in multiple places.
- Mutating shared collections directly.
- Mixing API transport with state ownership.
- Creating a store before understanding the state boundary.

## Interview Questions
1. What problem does this topic solve?
2. Where should this state live?
3. What should be source state versus derived state?
4. When would you avoid this pattern?

## Outcome
You can explain the state boundary, implement it with strict TypeScript, and justify the design choice.
