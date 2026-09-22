---
id: "angular-day-190"
title: "Derived State and Selectors"
slug: day-190-derived-state-and-selectors
dayLabel: "Day 190"
level: Advanced
estimatedMinutes: 90
order: 190
track: angular
youtubeVideos: []
---

# Day 190 - Derived State and Selectors

## Goal
Build derived state with computed values and selector-like functions.

## Concept
Build derived state with computed values and selector-like functions.

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
Store source facts; derive values instead of duplicating them. A derived value should have one source of truth.

## Exercise
Create selectors for visible jobs, active filter count, selected job, and pagination metadata.

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
