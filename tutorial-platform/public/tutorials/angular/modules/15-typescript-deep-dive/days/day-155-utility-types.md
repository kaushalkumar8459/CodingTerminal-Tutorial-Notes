---
id="angular-day-155"
title="Utility Types"
slug="day-155-utility-types"
dayLabel="Day 155"
level=Intermediate
estimatedMinutes=90
order=155
track=angular
youtubeVideos=[]
---
# Day 155 — Utility Types

## Goal
Transform existing types instead of duplicating them.

## Examples
~~~ts
interface Job {
  id: number;
  title: string;
  salary: number;
  remote: boolean;
}

type JobDraft = Omit<Job, 'id'>;
type JobPreview = Pick<Job, 'id' | 'title'>;
type EditableJob = Partial<Job>;
type ReadonlyJob = Readonly<Job>;
~~~

## Concept
Learn `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, and `NonNullable`.

## Exercise
Build create, update, preview, and readonly models from one domain type.

## Common Mistakes
- Using `Partial` when required fields should remain required.
- Copying types instead of deriving them.
- Assuming utility types validate runtime data.

## Interview Questions
1. Pick vs Omit?
2. Partial vs Required?
3. What does Record represent?

## Outcome
You can derive maintainable application models.
