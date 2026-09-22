id="c5d08"
---
title: Component Communication Patterns and Boundaries
slug: day-039-component-communication-patterns-and-boundaries
dayLabel: Day 39
level: Intermediate
estimatedMinutes: 90
order: 39
track: angular
youtubeVideos: []
---

# Day 39 — Component Communication Patterns and Boundaries

## Goal

Design component APIs that remain understandable as an application grows.

## Communication decision guide

Ask these questions in order:

1. Is the data owned by the parent?
   - Use input().
2. Did the child produce an event?
   - Use output().
3. Is this a reusable control with an intentionally two-way value?
   - Consider model().
4. Does the component need caller-supplied markup?
   - Use content projection.
5. Does the component need a narrow reference to its own view?
   - Consider viewChild() or viewChildren().
6. Is state shared across unrelated components or routes?
   - Consider a service or state store.

## Good component boundary

A JobCard should know how to display a Job and announce user actions.

It should not know:

- which route to navigate to
- how authentication works
- how the backend saves applications
- which global store is used

The page or feature layer should coordinate those concerns.

## Practical exercise

Review the Job Portal from Day 31 and split a large component into:

- JobSearch
- JobFilters
- JobList
- JobCard
- JobDetails

Define the communication contract for each boundary before coding.

## Common mistakes

- Giant components
- Excessive inputs
- Generic events with unclear payloads
- Children that own state belonging to the page
- Using services to hide poorly designed component boundaries

## Interview questions

1. What makes a component API maintainable?
2. How do you decide where state belongs?
3. When should a component emit an event?
4. When should shared state move to a service?

## Assignment

Write the input/output/model contract for five components before implementing them.

## Outcome

You can design explicit component boundaries instead of connecting components arbitrarily.
