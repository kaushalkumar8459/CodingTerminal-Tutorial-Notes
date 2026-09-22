id="d6d03"
---
title: Custom Attribute Directives
slug: day-043-custom-attribute-directives
dayLabel: Day 43
level: Beginner
estimatedMinutes: 90
order: 43
track: angular
youtubeVideos: []
---

# Day 43 — Custom Attribute Directives

## Goal

Build a reusable directive with configurable behavior.

## Example

A HighlightDirective can receive a color:

    readonly color = input('gold');

The directive can react to that input and update its host presentation.

Usage:

    <div appHighlight [color]="highlightColor">
      Featured Job
    </div>

A directive should keep its contract small and predictable.

## Practical exercise

Build an appStatus directive.

Requirements:

- Accept a status input.
- Support Active, Pending, Finished, and Cancelled.
- Apply a corresponding host class.
- Keep status mapping inside the directive.
- Do not mutate application state.

## Design rule

A directive should enhance its host. It should not secretly become a service, page controller, or global state manager.

## Common mistakes

- Overloading one directive with many unrelated behaviors
- Mutating business data from a presentation directive
- Creating hidden side effects
- Using a directive when a component is needed for substantial UI

## Interview questions

1. How can a custom directive accept configuration?
2. What makes a directive reusable?
3. Where should business state live?
4. Directive vs reusable component?

## Assignment

Create an appPermissionHint directive that displays a non-security-related visual hint for a demo permission value.

## Outcome

You can create configurable attribute directives with clear boundaries.
