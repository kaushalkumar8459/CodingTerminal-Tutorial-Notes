---
id: "angular-day-176"
title: "Hot, Cold and Multicasted Observables"
slug: day-176-hot-cold-and-multicasting
dayLabel: "Day 176"
level: Intermediate
estimatedMinutes: 90
order: 176
track: angular
youtubeVideos: []
---

# Day 176 - Hot, Cold and Multicasted Observables

## Goal
Understand producer sharing and multicasting with share and related concepts.

## Concept
Understand producer sharing and multicasting with share and related concepts.

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
Ask whether subscribers create separate producer work or share one execution. Sharing is not automatically permanent caching.

## Exercise
Compare two subscriptions to a cold timer with a shared version.

## Common Mistakes
- Choosing an operator without defining required behavior.

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
