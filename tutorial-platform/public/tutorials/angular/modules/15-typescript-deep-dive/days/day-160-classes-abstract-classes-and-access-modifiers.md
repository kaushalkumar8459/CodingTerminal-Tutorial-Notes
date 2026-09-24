---
id: "angular-day-160"
title: "Classes, Abstract Classes and Access Modifiers"
slug: "day-160-classes-abstract-classes-and-access-modifiers"
dayLabel: "Day 160"
level: Intermediate
estimatedMinutes: 90
order: 160
track: angular
youtubeVideos: []
---
# Day 160 — Classes, Abstract Classes and Access Modifiers

## Goal
Understand class-based TypeScript for Angular services, models, and legacy code.

## Example
~~~ts
abstract class EntityService<T extends { id: number }> {
  abstract getById(id: number): T | undefined;
}

class JobService extends EntityService<Job> {
  getById(id: number): Job | undefined {
    return jobs.find(job => job.id === id);
  }
}
~~~

## Concept
Learn public, private, protected, readonly, constructors, inheritance, abstract classes, and when composition is preferable.

## Exercise
Build a small abstract repository contract and concrete job implementation.

## Common Mistakes
- Using inheritance when composition is simpler.
- Treating TypeScript private as a security boundary.
- Putting too much business logic into domain classes.

## Interview Questions
1. Abstract class vs interface?
2. private vs protected?
3. When is composition preferable to inheritance?

## Outcome
You can understand and maintain class-based TypeScript without forcing classes everywhere.
