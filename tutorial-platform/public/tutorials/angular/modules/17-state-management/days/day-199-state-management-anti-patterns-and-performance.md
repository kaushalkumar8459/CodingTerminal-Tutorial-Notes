---
id: "angular-day-199"
title: "State Management Anti-Patterns and Performance"
slug: day-199-state-management-anti-patterns-and-performance
dayLabel: "Day 199"
level: Advanced
estimatedMinutes: 90
order: 199
track: angular
youtubeVideos: []
---

# Day 199 - State Management Anti-Patterns and Performance

## Goal
Recognize over-global state, duplicated state, mutable collections, giant stores, unnecessary selectors, and accidental recomputation.

## Concept
Recognize over-global state, duplicated state, mutable collections, giant stores, unnecessary selectors, and accidental recomputation.

## Example
~~~ts
const selectedId = signal<number | null>(null);
const selectedJob = computed(() =>
  jobs().find(job => job.id === selectedId()) ?? null
);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
Good architecture minimizes ownership ambiguity and unnecessary reactive work.

## Exercise
Audit a deliberately over-engineered JobHub store and split responsibilities.


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
