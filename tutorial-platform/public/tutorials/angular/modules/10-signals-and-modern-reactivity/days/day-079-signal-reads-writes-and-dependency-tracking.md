---
id="angular-day-079"
title="Signal Reads, Writes & Dependency Tracking"
slug="day-079-signal-reads-writes-and-dependency-tracking"
dayLabel: Day 79
level: Beginner
estimatedMinutes: 60
order: 79
track: angular
youtubeVideos: []
---
# Day 79 — Signal Reads, Writes & Dependency Tracking

## Goal
Understand how Angular builds the reactive dependency graph.

## Producer and Consumer
Reading a signal inside a reactive context establishes a dependency. Computed functions, effects, and component template rendering are examples of reactive contexts. citeturn0search1

```
jobs + search
     ↓
filteredJobs
     ↓
template
```

## Dynamic Dependencies
```ts
readonly showCount = signal(false);
readonly count = signal(10);

readonly message = computed(() => {
  if (this.showCount()) {
    return 'Count: ' + this.count();
  }
  return 'Count is hidden';
});
```

Dependencies can change depending on which signals are actually read during the computation. citeturn0search1

## OnPush
When an OnPush component reads a signal in its template, Angular tracks the signal as a dependency of that component. citeturn0search1

## Debugging Checklist
1. Is the signal read with ()?
2. Is it updated with set() or update()?
3. Is it actually a signal?
4. Did you mutate nested state?
5. Is the signal read in the expected reactive context?

## Interview Questions
1. What creates a signal dependency?
2. What is a reactive context?
3. Are computed dependencies static?
4. How do signals interact with OnPush?

## Outcome
You understand the signal graph rather than treating signals as magic variables.
