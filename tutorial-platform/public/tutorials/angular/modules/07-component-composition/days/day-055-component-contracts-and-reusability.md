id="cc7d6"
---
title: Component Contracts and Reusability
slug: day-055-component-contracts-and-reusability
dayLabel: Day 55
level: Intermediate
estimatedMinutes: 90
order: 55
track: angular
youtubeVideos: []
---

# Day 55 — Component Contracts and Reusability

## Goal

Design reusable components that can survive changes in the feature around them.

## Contract checklist

A reusable component should define:

- What data it accepts
- What events it emits
- What content can be projected
- Which states it supports
- Which assumptions it makes
- What it does not own

## Example

JobCard owns:

- Displaying a Job
- User-facing actions

JobCard does not own:

- Job API calls
- Authentication
- Global saved-job state
- Routing decisions

## Configuration strategy

Prefer focused inputs:

    [variant]="variant"
    [disabled]="disabled"

over a giant:

    [config]="everything"

Use model() only when two-way value ownership is genuinely part of the component contract.

## Practical exercise

Review Button, Card, Badge, JobCard, and EmptyState.

For each, document:

- inputs
- outputs
- model values
- projected slots
- state ownership

## Common mistakes

- Leaking implementation details
- Too many boolean inputs
- Generic config objects
- Hidden service dependencies
- Components that cannot be tested without the whole application

## Interview questions

1. What is a component contract?
2. How do you avoid tight coupling?
3. Why can too many boolean inputs be a smell?
4. What should a reusable component not own?

## Assignment

Refactor one component until its public API can be documented in ten lines or less.

## Outcome

You can evaluate reusable components by their contracts and ownership boundaries.
