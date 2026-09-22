---
id="angular-day-149"
title="Interfaces and Type Aliases"
slug="day-149-interfaces-and-type-aliases"
dayLabel="Day 149"
level=Beginner
estimatedMinutes=75
order=149
track=angular
youtubeVideos=[]
---
# Day 149 — Interfaces and Type Aliases

## Goal
Model application contracts cleanly.

## Concept
Interfaces are useful for extensible object contracts. Type aliases can describe objects, unions, tuples, primitives, and compositions.

## Example
~~~ts
interface User {
  id: number;
  name: string;
}

type UserRole = 'candidate' | 'recruiter' | 'admin';

type AuthUser = User & {
  role: UserRole;
};
~~~

## Mental Model
Choose a type representation based on the shape and composition you need, not by habit.

## Exercise
Create types for Job, User, Application, and UserRole. Compose an AuthUser type.

## Common Mistakes
- Treating interface and type as universally interchangeable.
- Creating giant interfaces for unrelated concerns.
- Mixing API DTOs and UI models without a reason.

## Interview Questions
1. Interface vs type alias?
2. What does intersection `&` mean?
3. Can a type alias represent a union?

## Outcome
You can create clear domain contracts for Angular features.
