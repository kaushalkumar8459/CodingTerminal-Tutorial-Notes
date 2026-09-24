---
id: "angular-day-173"
title: "Combination: combineLatest, forkJoin and zip"
slug: day-173-combine-latest-forkjoin-zip
dayLabel: "Day 173"
level: Intermediate
estimatedMinutes: 90
order: 173
track: angular
youtubeVideos: []
---

# Day 173 - Combination: combineLatest, forkJoin and zip

## Goal
Combine multiple Observable sources with different synchronization rules.

## Concept
Combine multiple Observable sources with different synchronization rules.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

Adapt the example to the day's problem instead of copying it mechanically.


## Mental Model
combineLatest is for ongoing combined state, forkJoin for finite parallel work, and zip for positional pairing.

## Exercise
Combine filters, load two finite resources together, and pair two finite sequences.

## Common Mistakes
- Choosing an operator without defining the required behavior.
- Creating nested subscriptions for dependent async work.
- Ignoring subscription lifetime.
- Using RxJS where simple synchronous state is clearer.

## Interview Questions
1. What problem does this topic solve?
2. How is it different from a nearby RxJS concept?
3. What lifecycle or concurrency issue matters here?
4. When would you avoid this technique?

## Outcome
You can explain the topic, implement it in typed Angular code, and justify the design choice.
