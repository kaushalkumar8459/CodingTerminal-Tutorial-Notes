---
id: "angular-day-151"
title: "Union, Literal and Intersection Types"
slug: "day-151-union-literal-and-intersection-types"
dayLabel: "Day 151"
level: Intermediate
estimatedMinutes: 75
order: 151
track: angular
youtubeVideos: []
---
# Day 151 — Union, Literal and Intersection Types

## Goal
Represent constrained values and composed object shapes.

## Example
~~~ts
type Status = 'draft' | 'published' | 'closed';

type Candidate = {
  id: number;
  name: string;
};

type ContactDetails = {
  email: string;
};

type CandidateProfile = Candidate & ContactDetails;
~~~

## Mental Model
Union means one of several possibilities. Intersection combines requirements.

## Exercise
Create union types for job status, application status, and user roles. Compose a profile from smaller types.

## Common Mistakes
- Using `string` when only a few values are valid.
- Confusing union with intersection.
- Creating impossible intersections.

## Interview Questions
1. Union vs intersection?
2. What is a literal type?
3. Why are literal unions useful in Angular state?

## Outcome
You can model finite business states precisely.
