---
id="angular-day-183"
title="RxJS Anti-Patterns and Performance"
slug="rxjs-anti-patterns-and-performance"
dayLabel="Day 183"
level=Advanced
estimatedMinutes=90
order=183
track=angular
youtubeVideos=[]
---

# Day 183 - RxJS Anti-Patterns and Performance

## Goal
Recognize nested subscribe, duplicate subscriptions, unnecessary sharing, unbounded replay, stale requests, and overuse of RxJS.

## Concept
Recognize nested subscribe, duplicate subscriptions, unnecessary sharing, unbounded replay, stale requests, and overuse of RxJS.


## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

## Mental Model
Correct stream ownership and subscription behavior come before micro-optimization.

## Exercise
Review a poor job-search pipeline and remove duplicate work, races, leaks, and unnecessary transformations.

## Common Mistakes
- Choosing an operator without defining required behavior.
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
