---
id: "angular-day-156"
title: "keyof, typeof, Indexed Access and as const"
slug: "day-156-keyof-typeof-indexed-access-and-as-const"
dayLabel: "Day 156"
level: Advanced
estimatedMinutes: 90
order: 156
track: angular
youtubeVideos: []
---
# Day 156 — keyof, typeof, Indexed Access and as const

## Goal
Generate types from existing values and type structures.

## Example
~~~ts
const jobStatuses = ['draft', 'published', 'closed'] as const;
type JobStatus = typeof jobStatuses[number];

interface Job {
  id: number;
  title: string;
  status: JobStatus;
}

type JobKey = keyof Job;
type JobTitle = Job['title'];
~~~

## Concept
`keyof` gets keys, `typeof` can derive a type from a value, indexed access selects a property type, and `as const` preserves literal values.

## Exercise
Create a readonly configuration object and derive its key and value unions.

## Common Mistakes
- Confusing runtime `typeof` with TypeScript type queries.
- Forgetting that `as const` narrows values and adds readonly semantics.
- Using string literals in multiple unrelated places.

## Interview Questions
1. What does `keyof` produce?
2. How can `typeof` derive a type?
3. Why use `as const`?

## Outcome
You can derive types instead of duplicating them.
