---
id="angular-day-153"
title="Generics Fundamentals"
slug="day-153-generics-fundamentals"
dayLabel="Day 153"
level=Intermediate
estimatedMinutes=90
order=153
track=angular
youtubeVideos=[]
---
# Day 153 — Generics Fundamentals

## Goal
Build reusable code without losing type information.

## Example
~~~ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const job = first<Job>(jobs);
~~~

## Concept
Generics parameterize types. They are especially useful for API envelopes, reusable components, utilities, and repositories.

## Exercise
Create a generic `ApiResponse<T>` and a generic collection helper.

## Common Mistakes
- Adding generics where a concrete type is clearer.
- Using `any` inside a generic abstraction.
- Making generic names meaningless.

## Interview Questions
1. What problem do generics solve?
2. Generic vs `any)?
3. Where would you use generics in Angular?

## Outcome
You can build reusable, type-preserving utilities.
