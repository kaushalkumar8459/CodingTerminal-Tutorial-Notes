---
id: "angular-day-088"
title: "Signal Patterns, Anti-Patterns & Reactive UI States"
slug: "day-088-signal-patterns-antipatterns-reactive-ui-states"
dayLabel: Day 88
level: Intermediate
estimatedMinutes: 90
order: 88
track: angular
youtubeVideos: []
---
# Day 88 — Signal Patterns, Anti-Patterns & Reactive UI States

## Goal
Bring the signal APIs together into maintainable feature patterns.

## State Classification
- Source state → signal()
- Derived state → computed()
- Dependent writable state → linkedSignal()
- Imperative side effect → effect()
- Async state → resource()

## Explicit UI States
A feature commonly needs:

```
Idle
Loading
Success
Error
Empty
```

For local demos, model the state explicitly:

```ts
readonly status =
  signal<'idle' | 'loading' | 'success' | 'error'>('idle');
```

Then use modern control flow:

```html
@switch (status()) {
  @case ('loading') { <p>Loading...</p> }
  @case ('success') { <p>Loaded</p> }
  @case ('error') { <p>Something went wrong.</p> }
  @default { <p>Ready</p> }
}
```

## Anti-Patterns
Avoid:
- signal for every temporary expression
- effect for derived state
- duplicated source and derived state
- public writable service state
- giant global state objects
- unnecessary deep mutation
- view queries used instead of component contracts
- RxJS for simple synchronous state

## Exercise
Refactor an intentionally messy Job Dashboard and identify source state, computed state, linked state, effects, and ownership boundaries.

## Interview Questions
1. How do you decide whether a value should be a signal?
2. What is a signal anti-pattern?
3. How should loading/error state be modeled?
4. Why minimize sources of truth?

## Outcome
You can review signal-based code and identify unnecessary complexity.
