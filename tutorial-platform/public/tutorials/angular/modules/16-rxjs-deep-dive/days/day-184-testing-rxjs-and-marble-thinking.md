---
id="angular-day-184"
title="Testing RxJS and Marble Thinking"
slug="testing-rxjs-and-marble-thinking"
dayLabel="Day 184"
level=Advanced
estimatedMinutes=90
order=184
track=angular
youtubeVideos=[]
---

# Day 184 - Testing RxJS and Marble Thinking

## Goal
Test values, errors, completion, timing, and subscription behavior when timing matters.

## Concept
Test values, errors, completion, timing, and subscription behavior when timing matters.


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
Use timelines to reason about debounce, cancellation, queueing, and combination before writing tests.

## Exercise
Draw timelines for debounce, switchMap cancellation, concatMap queueing, and combineLatest.

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
