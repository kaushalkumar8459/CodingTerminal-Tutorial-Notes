---
id: "angular-day-147"
title: "Types, Arrays, Tuples and Objects"
slug: "day-147-types-arrays-tuples-and-objects"
dayLabel: "Day 147"
level: Beginner
estimatedMinutes: 75
order: 147
track: angular
youtubeVideos: []
---
# Day 147 — Types, Arrays, Tuples and Objects

## Goal
Build a strong foundation with primitive types and structured values.

## Concept
Learn `string`, `number`, `boolean`, `null`, `undefined`, arrays, tuples, and object types.

## Examples
~~~ts
let name: string = 'Asha';
let years: number = 4;
let skills: string[] = ['Angular', 'TypeScript'];
let location: { city: string; country: string } = {
  city: 'Delhi',
  country: 'India'
};

let apiResult: [number, string] = [200, 'OK'];
~~~

## Mental Model
Arrays represent collections of one general shape. Tuples represent a fixed positional structure.

## Exercise
Model a job-search filter as an object and an API status pair as a tuple.

## Common Mistakes
- Using `Object` instead of a useful object shape.
- Mixing unrelated tuple positions.
- Forgetting that arrays are mutable at runtime.

## Interview Questions
1. Array vs tuple?
2. `null` vs `undefined`?
3. Why use explicit object types?

## Outcome
You can model common Angular data without falling back to `any`.
