---
id: "angular-day-189"
title: "State Modeling and Immutable Updates"
slug: "day-189-state-modeling-and-immutable-updates"
dayLabel: "Day 189"
level: Intermediate
estimatedMinutes: 90
order: 189
track: angular
youtubeVideos: []
---

# Day 189 - State Modeling and Immutable Updates

## Goal
90

## Concept
90

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
Model state with explicit domain types and predictable immutable updates.

## Exercise
A good state model makes valid states easy to represent and invalid states difficult to create.

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
