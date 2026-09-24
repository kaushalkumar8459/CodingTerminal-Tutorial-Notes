---
id: "angular-day-166"
title: "Why RxJS in Angular?"
slug: day-166-why-rxjs-in-angular
dayLabel: "Day 166"
level: Beginner
estimatedMinutes: 60
order: 166
track: angular
youtubeVideos: []
---

# Day 166 - Why RxJS in Angular?

## Goal
Understand why RxJS belongs in Angular after Signals, Forms, HTTP, and TypeScript.

## Concept
Understand why RxJS belongs in Angular after Signals, Forms, HTTP, and TypeScript.

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
Signal is good for current state. Observable is useful for values arriving over time, events, HTTP workflows, timing, cancellation, and composition.

## Exercise
Identify five Angular problems and choose Signal, Promise, or Observable for each.

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
