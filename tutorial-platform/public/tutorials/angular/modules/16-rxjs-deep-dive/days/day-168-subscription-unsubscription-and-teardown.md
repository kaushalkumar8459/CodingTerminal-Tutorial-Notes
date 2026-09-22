---
id: "angular-day-168"
title: "Subscription, Unsubscription and Teardown"
slug: day-168-subscription-unsubscription-and-teardown
dayLabel: "Day 168"
level: Beginner
estimatedMinutes: 75
order: 168
track: angular
youtubeVideos: []
---

# Day 168 - Subscription, Unsubscription and Teardown

## Goal
Understand when Observable work starts and how resources are released.

## Concept
Understand when Observable work starts and how resources are released.

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
Define pipeline, subscribe, emit, then unsubscribe or complete and run teardown.

## Exercise
Create an interval and verify behavior before and after unsubscribe.

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
