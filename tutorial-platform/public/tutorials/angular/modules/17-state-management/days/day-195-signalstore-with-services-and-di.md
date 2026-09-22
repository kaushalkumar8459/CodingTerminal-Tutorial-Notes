---
id="angular-day-195"
title="SignalStore with Services and DI"
slug="signalstore-with-services-and-di"
dayLabel="Day 195"
level=Advanced
estimatedMinutes=90
order=195
track=angular
youtubeVideos=[]
---

# Day 195 - SignalStore with Services and DI

## Goal
Connect SignalStore to typed Angular services and dependency injection.

## Concept
Connect SignalStore to typed Angular services and dependency injection.

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
Keep HTTP/data access focused on external communication while the store coordinates feature state.

## Exercise
Inject a JobApi service into a store and expose a clean search workflow.

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
