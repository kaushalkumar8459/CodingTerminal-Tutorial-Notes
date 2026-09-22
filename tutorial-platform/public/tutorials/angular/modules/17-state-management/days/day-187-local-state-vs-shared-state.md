---
id="angular-day-187"
title="Local State vs Shared State"
slug="local-state-vs-shared-state"
dayLabel="Day 187"
level=Intermediate
estimatedMinutes=75
order=187
track=angular
youtubeVideos=[]
---

# Day 187 - Local State vs Shared State

## Goal
Decide when state should remain inside a component and when it must be shared.

## Concept
Decide when state should remain inside a component and when it must be shared.

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
Keep state at the narrowest scope that satisfies its consumers. Sharing state does not automatically mean global state.

## Exercise
Take a dashboard and move each state value to the smallest valid owner.

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
