---
id="angular-day-148"
title="Type Inference and Variable Declarations"
slug="day-148-type-inference-and-variable-declarations"
dayLabel="Day 148"
level=Beginner
estimatedMinutes=60
order=148
track=angular
youtubeVideos=[]
---
# Day 148 — Type Inference and Variable Declarations

## Goal
Learn when TypeScript can infer a type and when an explicit annotation improves a public contract.

## Concept
TypeScript often derives types from initial values. Use `const` when a binding should not be reassigned and `let` when it can change.

## Example
~~~ts
const role = 'candidate';
let page = 1;
page = 2;

const roles = ['candidate', 'recruiter'];
~~~

## Mental Model
Inference reduces noise; explicit types communicate important boundaries.

## Exercise
Remove unnecessary annotations from a small Angular model while keeping public service and function contracts explicit.

## Common Mistakes
- Annotating every local variable.
- Assuming `const` makes an object immutable.
- Using broad annotations that throw away useful inference.

## Interview Questions
1. What is type inference?
2. Does `const` make an object readonly?
3. When should you explicitly annotate a type?

## Outcome
You can use inference without sacrificing type safety.
