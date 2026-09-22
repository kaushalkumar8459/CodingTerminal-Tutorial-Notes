---
id="angular-day-178"
title="RxJS with Angular HttpClient"
slug="rxjs-with-httpclient"
dayLabel="Day 178"
level=Intermediate
estimatedMinutes=90
order=178
track=angular
youtubeVideos=[]
---

# Day 178 - RxJS with Angular HttpClient

## Goal
Use typed HttpClient Observables in declarative feature pipelines.

## Concept
Use typed HttpClient Observables in declarative feature pipelines.

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
UI event, typed request, HTTP Observable, RxJS pipeline, UI result. Keep API access in typed services.

## Exercise
Build a typed search service with loading, success, empty, and error states.

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
