---
id="angular-day-077"
title="signal() — Writable Reactive State"
slug="day-077-signal-writable-reactive-state"
dayLabel: Day 77
level: Beginner
estimatedMinutes: 60
order: 77
track: angular
youtubeVideos: []
---
# Day 77 — signal() — Writable Reactive State

## Goal
Create and update reactive state with signal().

## Example
```ts
import { Component, signal } from '@angular/core';

export class CounterComponent {
  readonly count = signal(0);

  increment(): void {
    this.count.update(value => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
```

Read a signal by calling it: count(). Writable signals provide set() and update(). citeturn0search1

## Objects and Arrays
Signals can hold complex values. Prefer immutable updates:

```ts
readonly profile = signal({ name: 'Asha', available: true });

rename(name: string): void {
  this.profile.update(profile => ({ ...profile, name }));
}
```

## Exercise
Build Job Preferences with role, experience, remote preference, and salary expectation signals.

## Common Mistakes
- Forgetting () when reading.
- Mutating nested state directly.
- Creating signals for values that are purely derived.
- Exposing writable state unnecessarily.

## Interview Questions
1. What is a writable signal?
2. set() vs update()?
3. Can a signal contain objects?
4. How do you read a signal?

## Outcome
You can model independent writable UI state.
