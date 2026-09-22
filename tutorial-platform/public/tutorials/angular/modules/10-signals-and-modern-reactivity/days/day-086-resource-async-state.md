---
id="angular-day-086"
title="resource() — Async Resource State"
slug="day-086-resource-async-state"
dayLabel: Day 86
level: Advanced
estimatedMinutes: 90
order: 86
track: angular
youtubeVideos: []
---
# Day 86 — resource() — Async Resource State

## Goal
Understand asynchronous state inside Angular's signal-based model without introducing HttpClient yet.

## Why Resource?
signal(), computed(), and other signal APIs are synchronous. resource() connects asynchronous operations to signal-based state. citeturn0search2

## Basic Shape
```ts
readonly userId = signal(1);

readonly userResource = resource({
  params: () => ({ id: this.userId() }),

  loader: async ({ params }) => {
    await delay(500);
    return {
      id: params.id,
      name: 'User ' + params.id
    };
  }
});
```

The params computation is reactive. When its signal dependencies change, Angular can run the loader for the new parameters. citeturn0search2

## Important Boundary
Do not introduce HttpClient here. This lesson uses a local Promise-based loader so the learner understands reactive parameters, loading, resolved state, and errors first.

httpResource() is built on HttpClient and belongs after HTTP fundamentals. citeturn0search6

## Exercise
Build a User Preview with:
- user ID signal
- local delayed loader
- loading UI
- success UI
- error UI
- user ID change action

## Common Mistakes
- Treating resource as a replacement for every signal.
- Introducing HTTP too early.
- Ignoring loading and error states.
- Manually synchronizing async state with effects.

## Interview Questions
1. Why does resource exist?
2. What does params do?
3. When does the loader run?
4. Why teach httpResource later?

## Outcome
You understand the bridge between synchronous signal state and asynchronous data.
