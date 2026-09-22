---
id="angular-day-188"
title="Service-Based State with Signals"
slug="service-based-state-with-signals"
dayLabel="Day 188"
level=Intermediate
estimatedMinutes=90
order=188
track=angular
youtubeVideos=[]
---

# Day 188 - Service-Based State with Signals

## Goal
Build shared feature state with an injectable service, writable signals, computed signals, and readonly public state.

## Concept
Build shared feature state with an injectable service, writable signals, computed signals, and readonly public state.

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
A focused service can own state while components consume a readonly reactive API.

## Exercise
Create a JobSelectionService with selected job, computed metadata, and explicit update methods.

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
