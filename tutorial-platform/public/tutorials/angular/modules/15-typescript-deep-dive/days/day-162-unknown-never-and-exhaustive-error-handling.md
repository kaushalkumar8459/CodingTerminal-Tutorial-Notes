---
id="angular-day-162"
title="unknown, never and Exhaustive Error Handling"
slug="day-162-unknown-never-and-exhaustive-error-handling"
dayLabel="Day 162"
level=Advanced
estimatedMinutes=90
order=162
track=angular
youtubeVideos=[]
---
# Day 162 — unknown, never and Exhaustive Error Handling

## Goal
Handle unsafe values and finite states without unsafe casts.

## Example
~~~ts
function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${String(value)}`);
}

type Result =
  | { kind: 'success'; data: Job[] }
  | { kind: 'error'; message: string };

function message(result: Result): string {
  switch (result.kind) {
    case 'success':
      return `${result.data.length} jobs`;
    case 'error':
      return result.message;
    default:
      return assertNever(result);
  }
}
~~~

## Concept
Use `unknown` for values that have not been safely established. Use `never` for impossible states and exhaustive checks.

## Exercise
Create an exhaustive UI state model for loading, success, empty, and error.

## Common Mistakes
- Catching errors as `any`.
- Casting unknown data without validation.
- Forgetting a union member after adding a new state.

## Interview Questions
1. Why is `unknown` safer than `any`?
2. What does `never` mean?
3. How does exhaustive checking work?

## Outcome
You can design safer error and state handling.
