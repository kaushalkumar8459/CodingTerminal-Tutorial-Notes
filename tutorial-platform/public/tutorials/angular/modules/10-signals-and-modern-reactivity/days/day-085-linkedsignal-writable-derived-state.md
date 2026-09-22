---
id="angular-day-085"
title="linkedSignal() — Writable Derived State"
slug="day-085-linkedsignal-writable-derived-state"
dayLabel: Day 85
level: Intermediate
estimatedMinutes: 75
order: 85
track: angular
youtubeVideos: []
---
# Day 85 — linkedSignal() — Writable Derived State

## Goal
Handle state that depends on another signal but must also be manually writable.

## Problem
Suppose available shipping options change. The selected option should follow a valid default when the options change, but the user must also be able to select another option.

linkedSignal() is designed for this dependent writable state. citeturn0search3

## Example
```ts
readonly options = signal(['Email', 'Courier', 'Pickup']);

readonly selectedOption =
  linkedSignal(() => this.options()[0]);

select(option: string): void {
  this.selectedOption.set(option);
}
```

## Decision Guide
- Pure derived value → computed()
- Derived but manually writable → linkedSignal()
- Independent writable state → signal()

## Exercise
Create a Job Location Selector where selected location follows available locations but can also be changed by the user.

## Common Mistakes
- Using effect() to copy state.
- Using computed() when manual writes are required.
- Using linkedSignal() for unrelated independent state.

## Interview Questions
1. What problem does linkedSignal solve?
2. How is it different from computed?
3. Why is an effect not the preferred synchronization mechanism?

## Outcome
You can model dependent writable state correctly. citeturn0search3
