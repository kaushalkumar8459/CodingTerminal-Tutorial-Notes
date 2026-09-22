---
id: "angular-day-180"
title: "RxJS + Signals Interop: toSignal and toObservable"
slug: day-180-rxjs-signals-interop
dayLabel: "Day 180"
level: Advanced
estimatedMinutes: 90
order: 180
track: angular
youtubeVideos: []
---

# Day 180 - RxJS + Signals Interop: toSignal and toObservable

## Goal
Bridge RxJS streams and Angular Signals with toSignal and toObservable.

## Concept
Bridge RxJS streams and Angular Signals with toSignal and toObservable.

## Angular Interop
Use @angular/core/rxjs-interop. toSignal exposes the latest Observable value as a Signal and toObservable exposes a Signal as an Observable. Avoid repeatedly creating toSignal for the same Observable.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

Adapt the example to the day's problem instead of copying it mechanically.

### Angular interop
Use @angular/core/rxjs-interop. toSignal exposes the latest Observable value as a Signal. toObservable exposes a Signal as an Observable. Avoid repeatedly creating toSignal for the same Observable.

## Mental Model
Use RxJS for stream composition and Signals for synchronous Angular-facing state when that boundary is clearer.

## Exercise
Convert an API result Observable to a Signal, then convert a search Signal to an Observable and debounce it.

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
