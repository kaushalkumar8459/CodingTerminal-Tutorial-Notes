---
id: "angular-day-169"
title: "Creation Operators"
slug: day-169-creation-operators
dayLabel: "Day 169"
level: Beginner
estimatedMinutes: 75
order: 169
track: angular
youtubeVideos: []
---

# Day 169 - Creation Operators

## Goal
Create streams from values, arrays, promises, timers, and errors.

## Concept
Create streams from values, arrays, promises, timers, and errors.

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
Creation answers where a stream comes from. Transformation answers what happens to its values.

## Exercise
Create a finite stream, timer stream, promise stream, and error stream.

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
