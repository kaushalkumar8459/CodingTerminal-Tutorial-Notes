---
id: "d6d08"
title: Directive and Pipe Design Patterns
slug: day-048-directive-and-pipe-design-patterns
dayLabel: Day 48
level: Intermediate
estimatedMinutes: 90
order: 48
track: angular
youtubeVideos: []
---

# Day 48 — Directive and Pipe Design Patterns

## Goal

Learn how to choose the right abstraction.

## Component vs directive vs pipe

Use a **component** when you own a UI structure.

Use a **directive** when you enhance an existing host element with reusable behavior.

Use a **pipe** when you transform a value for display.

Example:

    JobCardComponent
    appStatus
    salaryRange

## Keep abstractions small

A good directive or pipe should have:

- One clear responsibility
- A small public API
- Predictable behavior
- No unnecessary global dependencies
- Easy testability

## Performance awareness

Presentation transformations run as part of rendering. Avoid expensive repeated calculations in templates and pipes.

If a transformation is expensive or business-critical, consider where the value should be computed and owned rather than hiding the problem in a pipe.

## Practical exercise

Review ten pieces of logic from the Job Portal and classify each as:

- component
- directive
- pipe
- ordinary TypeScript function
- service (to be learned next)

Explain the decision.

## Interview questions

1. Component vs directive vs pipe?
2. When should a transformation remain a normal function?
3. Why avoid side effects in pipes?
4. What makes a directive reusable?

## Assignment

Refactor one previous component by extracting one genuine directive and one genuine pipe.

## Outcome

You can choose abstractions based on responsibility rather than Angular API familiarity.
