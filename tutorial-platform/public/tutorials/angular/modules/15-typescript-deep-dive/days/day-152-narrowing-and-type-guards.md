---
id="angular-day-152"
title="Narrowing and Type Guards"
slug="day-152-narrowing-and-type-guards"
dayLabel="Day 152"
level=Intermediate
estimatedMinutes=75
order=152
track=angular
youtubeVideos=[]
---
# Day 152 — Narrowing and Type Guards

## Goal
Safely work with values whose type is initially broad.

## Example
~~~ts
function displayId(value: string | number): string {
  if (typeof value === 'number') {
    return value.toString();
  }

  return value.toUpperCase();
}
~~~

## Concept
Type guards narrow a union to a more specific type. Learn `typeof`, `in`, `instanceof`, equality checks, and custom predicates.

## Exercise
Create a type guard for API results that can be success or failure.

## Common Mistakes
- Using unsafe assertions instead of narrowing.
- Assuming a runtime object automatically matches a TypeScript interface.
- Writing guards that do not actually validate the needed fields.

## Interview Questions
1. What is narrowing?
2. What is a user-defined type guard?
3. Why are type guards important at API boundaries?

## Outcome
You can safely branch on union types.
