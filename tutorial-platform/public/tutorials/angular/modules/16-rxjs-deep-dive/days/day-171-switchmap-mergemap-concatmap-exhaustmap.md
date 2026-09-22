---
id: "angular-day-171"
title: "Flattening: switchMap, mergeMap, concatMap and exhaustMap"
slug: day-171-switchmap-mergemap-concatmap-exhaustmap
dayLabel: "Day 171"
level: Intermediate
estimatedMinutes: 90
order: 171
track: angular
youtubeVideos: []
---

# Day 171 - Flattening: switchMap, mergeMap, concatMap and exhaustMap

## Goal
Learn how flattening operators control concurrent inner Observables.

## Concept
Learn how flattening operators control concurrent inner Observables.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

Adapt the example to the day's problem instead of copying it mechanically.

### Operator selection
- switchMap: latest request wins when stale work should be abandoned.
- mergeMap: concurrent work is allowed.
- concatMap: work is serialized in source order.
- exhaustMap: ignore new triggers while one operation is active.

## Mental Model
switchMap favors latest work, mergeMap allows concurrency, concatMap queues in order, exhaustMap ignores new triggers while busy.

## Exercise
Implement typeahead search, concurrent analytics, ordered saves, and submit protection.

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
