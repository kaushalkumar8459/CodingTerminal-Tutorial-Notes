---
id: "angular-day-150"
title: "Functions and Function Types"
slug: "day-150-functions-and-function-types"
dayLabel: "Day 150"
level: Beginner
estimatedMinutes: 75
order: 150
track: angular
youtubeVideos: []
---
# Day 150 — Functions and Function Types

## Goal
Write functions with precise inputs, outputs, optional parameters, defaults, and reusable function types.

## Example
~~~ts
type JobFilter = (job: Job) => boolean;

function formatTitle(title: string, prefix = ''): string {
  return prefix ? prefix + title : title;
}
~~~

## Concept
Function signatures are contracts. They make service APIs and reusable utilities easier to consume safely.

## Exercise
Create typed functions for filtering jobs, calculating application counts, and formatting salary ranges.

## Common Mistakes
- Omitting return types on exported APIs when the contract should be explicit.
- Making parameters optional when callers actually require them.
- Using overly broad callback types.

## Interview Questions
1. What is a function type?
2. Optional vs default parameter?
3. Why type callback parameters?

## Outcome
You can design predictable function contracts.
