---
id: "d6d01"
title: Why Directives and Pipes
slug: day-041-why-directives-and-pipes
dayLabel: Day 41
level: Beginner
estimatedMinutes: 60
order: 41
track: angular
youtubeVideos: []
---

# Day 41 — Why Directives and Pipes?

## Goal

Understand the problem directives and pipes solve.

## Three useful roles

A **component** usually owns a piece of UI.

A **directive** adds reusable behavior to existing elements or components.

A **pipe** transforms a value for display.

Mental model:

    Component → UI structure
    Directive → UI behavior
    Pipe → Display transformation

## Example

A JobCard is a component.

A reusable highlight-on-hover behavior can be a directive.

A salary value such as 85000 can be formatted with a pipe.

## Why not put everything in a component?

If the same behavior is needed across buttons, cards, and inputs, creating a component for each use may be unnecessary. A directive can attach behavior without owning the surrounding markup.

Similarly, display formatting should not clutter templates with repeated transformation logic.

## Practical exercise

Identify these as component, directive, or pipe:

- Job Card
- Highlight important job
- Format salary
- User Avatar
- Convert date to readable text

## Common mistakes

- Creating a directive when a component is clearer
- Putting business calculations into presentation pipes
- Using pipes to mutate application state
- Repeating DOM behavior in many components

## Interview questions

1. What is a directive?
2. Component vs directive?
3. What is a pipe?
4. Why separate display transformation from business logic?

## Assignment

Review a previous project and identify two behaviors that could be reusable directives and two display transformations that could be pipes.

## Outcome

You can recognize when a directive or pipe is a better abstraction.
