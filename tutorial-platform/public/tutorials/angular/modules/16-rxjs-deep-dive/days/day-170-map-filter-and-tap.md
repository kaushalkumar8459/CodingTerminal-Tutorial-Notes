---
id: "angular-day-170"
title: "Operators: map, filter and tap"
slug: day-170-map-filter-and-tap
dayLabel: "Day 170"
level: Beginner
estimatedMinutes: 75
order: 170
track: angular
youtubeVideos: []
---

# Day 170 - Operators: map, filter and tap

## Goal
Use map for transformation, filter for selection, and tap for observation without changing values.

## Concept
Use map for transformation, filter for selection, and tap for observation without changing values.

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
Keep transformations and side effects separate. Operator order matters.

## Exercise
Filter active jobs, map to titles, and use tap only for logging.

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
