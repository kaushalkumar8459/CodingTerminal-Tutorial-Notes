---
id: "angular-day-154"
title: "Generic Constraints and Defaults"
slug: "day-154-generic-constraints-and-defaults"
dayLabel: "Day 154"
level: Intermediate
estimatedMinutes: 75
order: 154
track: angular
youtubeVideos: []
---
# Day 154 — Generic Constraints and Defaults

## Goal
Control what generic types are allowed to represent.

## Example
~~~ts
interface Identifiable {
  id: number;
}

function byId<T extends Identifiable>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}
~~~

## Concept
Constraints express minimum capabilities. Generic defaults make APIs easier to consume when a common type exists.

## Exercise
Create a generic repository contract constrained to entities with an id.

## Common Mistakes
- Over-constraining generics.
- Assuming `extends` means class inheritance in every generic context.
- Hiding simple code behind excessive generic abstraction.

## Interview Questions
1. What does `T extends X` mean?
2. Why constrain a generic?
3. When are generic defaults useful?

## Outcome
You can create reusable abstractions with meaningful constraints.
