---
id="angular-day-158"
title="Conditional Types"
slug="day-158-conditional-types"
dayLabel="Day 158"
level=Advanced
estimatedMinutes=90
order=158
track=angular
youtubeVideos=[]
---
# Day 158 — Conditional Types

## Goal
Build types that choose a result based on another type.

## Example
~~~ts
type IdOf<T> = T extends { id: infer I } ? I : never;

type JobId = IdOf<{ id: number; title: string }>;
~~~

## Concept
Conditional types use the form `T extends U ? X : Y`. Learn distributive behavior and `infer` at a practical level.

## Exercise
Create a type that extracts the data type from a generic success result.

## Common Mistakes
- Using conditional types where a normal generic is clearer.
- Forgetting unions can distribute through conditional types.

## Interview Questions
1. What is a conditional type?
2. What does `infer` do?
3. What is distributive conditional typing?

## Outcome
You can read and create advanced library-style type utilities.
