---
id="angular-day-181"
title="Subscription Lifecycle with takeUntilDestroyed"
slug="subscription-lifecycle-and-takeuntildestroyed"
dayLabel="Day 181"
level=Advanced
estimatedMinutes=75
order=181
track=angular
youtubeVideos=[]
---

# Day 181 - Subscription Lifecycle with takeUntilDestroyed

## Goal
Use takeUntilDestroyed for lifecycle-safe imperative subscriptions in Angular.

## Concept
Use takeUntilDestroyed for lifecycle-safe imperative subscriptions in Angular.
\n## Lifecycle\nAngular can infer the current DestroyRef inside an injection context. Pass DestroyRef explicitly when using takeUntilDestroyed outside that context.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

## Mental Model
Prefer declarative consumption when possible. When subscribing imperatively, make lifetime explicit.

## Exercise
Create a notification listener and verify it stops after component destruction.

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
