---
id: "cc7d4"
title: Template Fragments and Dynamic UI Composition
slug: day-053-template-fragments-and-dynamic-ui-composition
dayLabel: Day 53
level: Intermediate
estimatedMinutes: 90
order: 53
track: angular
youtubeVideos: []
---

# Day 53 — Template Fragments and Dynamic UI Composition

## Goal

Understand how Angular can compose reusable template content without turning every piece of markup into a component.

## The problem

Sometimes a repeated piece of template is local to one component. Creating a new component may add unnecessary API and lifecycle complexity.

Angular template fragments can help keep local template composition readable.

## Composition choices

Use:

- A normal template section for simple local markup.
- A template fragment for reusable local template content.
- A component when the piece has its own responsibility and API.
- Content projection when the caller supplies markup to a reusable container.

## Practical exercise

Build a dashboard with:

- Summary section
- Empty state
- Loading state
- Recent activity

Identify which parts should remain local template composition and which deserve components.

## Design rule

Do not create abstractions merely because Angular provides an API. Create them when they improve ownership, reuse, or readability.

## Common mistakes

- Creating dozens of tiny components
- Duplicating complex templates
- Using dynamic components for static content
- Confusing local template composition with reusable component APIs

## Interview questions

1. When should markup become a component?
2. When is local template composition enough?
3. Why avoid unnecessary abstraction?
4. Component vs template fragment?

## Assignment

Refactor a dashboard template and justify each extracted component.

## Outcome

You can choose the smallest useful composition mechanism.
