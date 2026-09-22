---
id="angular-day-161"
title="Modules, Imports and Type-Only Imports"
slug="day-161-modules-imports-and-type-only-imports"
dayLabel="Day 161"
level=Intermediate
estimatedMinutes=75
order=161
track=angular
youtubeVideos=[]
---
# Day 161 — Modules, Imports and Type-Only Imports

## Goal
Organize TypeScript code into clear module boundaries.

## Example
~~~ts
import type { Job } from './job.model';
import { JobService } from './job.service';

export type JobId = number;
export { JobService };
~~~

## Concept
Understand named/default exports, imports, re-exports, module boundaries, and `import type`.

## Mental Model
A type import communicates that a dependency is needed only for type checking. Runtime imports and type-only imports should not be confused.

## Exercise
Split a job feature into models, utilities, and service modules with clean public exports.

## Common Mistakes
- Creating barrel files that hide circular dependencies.
- Importing runtime values as type-only.
- Exporting internal implementation details.

## Interview Questions
1. Named vs default export?
2. Why use `import type`?
3. What is a circular dependency?

## Outcome
You can structure TypeScript code for maintainable Angular features.
