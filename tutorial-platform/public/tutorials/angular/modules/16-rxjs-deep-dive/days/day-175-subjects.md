---
id="angular-day-175"
title="Subjects: Subject, BehaviorSubject and ReplaySubject"
slug="subjects"
dayLabel="Day 175"
level=Intermediate
estimatedMinutes=90
order=175
track=angular
youtubeVideos=[]
---

# Day 175 - Subjects: Subject, BehaviorSubject and ReplaySubject

## Goal
Understand Subject variants. Subject has no retained value, BehaviorSubject stores a current value, and ReplaySubject replays configured history.

## Concept
Understand Subject variants. Subject has no retained value, BehaviorSubject stores a current value, and ReplaySubject replays configured history.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

## Mental Model
A Subject introduces an imperative producer into a reactive system. Use it deliberately rather than replacing every Signal with one.

## Exercise
Create notification, current-selection, and recent-history examples.

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
