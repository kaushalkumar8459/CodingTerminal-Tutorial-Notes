---
id: "angular-day-174"
title: "Error Handling: catchError, retry and finalize"
slug: day-174-error-handling-catcherror-retry-finalize
dayLabel: "Day 174"
level: Intermediate
estimatedMinutes: 90
order: 174
track: angular
youtubeVideos: []
---

# Day 174 - Error Handling: catchError, retry and finalize

## Goal
Handle failure, retry safe work, and perform cleanup with catchError, retry, and finalize.

## Concept
Handle failure, retry safe work, and perform cleanup with catchError, retry, and finalize.

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
Request, retry policy, recovery or failure, cleanup. Retry only when the operation is safe.

## Exercise
Build a request pipeline with limited retry, visible failure, and loading cleanup.

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
