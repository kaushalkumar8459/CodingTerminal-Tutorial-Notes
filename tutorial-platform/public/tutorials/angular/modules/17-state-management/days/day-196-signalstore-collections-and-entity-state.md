---
id: "angular-day-196"
title: "SignalStore for Collections and Entity-Like State"
slug: day-196-signalstore-collections-and-entity-state
dayLabel: "Day 196"
level: Advanced
estimatedMinutes: 90
order: 196
track: angular
youtubeVideos: []
---

# Day 196 - SignalStore for Collections and Entity-Like State

## Goal
Manage collections, selection, updates, removal, and lookup with predictable identity operations.

## Concept
Manage collections, selection, updates, removal, and lookup with predictable identity operations.

## Example
~~~ts
const selectedId = signal<number | null>(null);
const selectedJob = computed(() =>
  jobs().find(job => job.id === selectedId()) ?? null
);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
Collection state needs clear add, update, remove, select, and lookup rules.

## Exercise
Build a job collection with selected ID, lookup, add, update, remove, and visible-job derivation.


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
