---
id: "angular-day-200"
title: "Mini Project - JobHub State Management"
slug: day-200-mini-project-jobhub-state-management
dayLabel: "Day 200"
level: Advanced
estimatedMinutes: 120
order: 200
track: angular
youtubeVideos: []
---

# Day 200 - Mini Project - JobHub State Management

## Goal
Refactor JobHub into a production-style state architecture using local signals, services, RxJS workflows, and SignalStore where justified.

## Concept
Refactor JobHub into a production-style state architecture using local signals, services, RxJS workflows, and SignalStore where justified.

## Example
~~~ts
const selectedId = signal<number | null>(null);
const selectedJob = computed(() =>
  jobs().find(job => job.id === selectedId()) ?? null
);
~~~

Adapt the example to the day's state-management problem.

## Mental Model
Use the smallest state mechanism that fits each concern and document every state boundary.

## Exercise
Implement the project, test transitions, and explain why each state value lives where it does.

## Suggested Structure
~~~text
jobhub/
  core/
  jobs/
  saved-jobs/
  profile/
  shared/
~~~

## Acceptance Criteria
- Local UI state remains local.
- Shared feature state has one clear owner.
- API services do not become state stores.
- SignalStore is used only where feature complexity justifies it.
- Derived state is not duplicated.
- Async state has explicit loading and error behavior.
- No any and no hidden cross-feature coupling.

## Interview Questions
1. Why is this state local, shared, or feature-owned?
2. Why use SignalStore here instead of a service with signals?
3. How would you prevent duplicated server state?
4. How would you test state transitions?

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
