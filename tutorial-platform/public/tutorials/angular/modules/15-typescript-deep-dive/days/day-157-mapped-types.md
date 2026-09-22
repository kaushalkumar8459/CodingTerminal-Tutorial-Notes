---
id="angular-day-157"
title="Mapped Types"
slug="day-157-mapped-types"
dayLabel="Day 157"
level=Advanced
estimatedMinutes=90
order=157
track=angular
youtubeVideos=[]
---
# Day 157 — Mapped Types

## Goal
Transform every property of a type systematically.

## Example
~~~ts
type Flags<T> = {
  [K in keyof T]: boolean;
};

interface Permissions {
  canCreate: string;
  canEdit: string;
  canDelete: string;
}

type PermissionFlags = Flags<Permissions>;
~~~

## Concept
Mapped types iterate over keys from another type and can add readonly or optional modifiers.

## Exercise
Create a type that converts a form model into a validation-state model.

## Common Mistakes
- Writing complex mapped types before a simpler utility type.
- Losing property names through overly broad index signatures.

## Interview Questions
1. What does `in keyof` do?
2. How can mapped types change optionality?
3. Where could mapped types help in Angular?

## Outcome
You can create reusable type transformations.
