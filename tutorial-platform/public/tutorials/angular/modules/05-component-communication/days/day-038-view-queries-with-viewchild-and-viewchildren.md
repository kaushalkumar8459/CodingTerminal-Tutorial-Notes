id="c5d07"
---
title: View Queries with viewChild and viewChildren
slug: day-038-view-queries-with-viewchild-and-viewchildren
dayLabel: Day 38
level: Intermediate
estimatedMinutes: 90
order: 38
track: angular
youtubeVideos: []
---

# Day 38 — View Queries with viewChild() and viewChildren()

## Goal

Understand how a component can obtain references to elements or child components in its own view.

## viewChild()

A signal-based view query can reference a child component:

    readonly jobCard =
      viewChild(JobCardComponent);

Read it only when the view contains the queried item.

## Required query

When the queried item must exist:

    readonly searchInput =
      viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

Template:

    <input #searchInput />

Use required queries only when the view contract guarantees the element exists.

## viewChildren()

Use viewChildren() when multiple matching children are present:

    readonly cards = viewChildren(JobCardComponent);

The result is a signal containing the matching references.

## When to use queries

Good use cases include:

- Focus management
- Calling a narrow imperative UI API
- Measuring or interacting with view elements
- Coordinating a small local widget

Do not use view queries as a replacement for normal input/output communication.

## Practical exercise

Create a JobList with multiple JobCards and:

- query the cards
- add a focusable search input
- expose a small focus method
- keep business state in the parent

## Common mistakes

- Using queries to bypass component contracts
- Assuming queried elements always exist
- Performing business logic through DOM references
- Confusing view queries with content queries

## Interview questions

1. What does viewChild() do?
2. viewChild vs viewChildren?
3. When is a view query appropriate?
4. Why not use DOM queries for business state?

## Assignment

Create a reusable list component that can focus its first input without exposing its internal DOM structure.

## Outcome

You understand modern signal-based view queries and their appropriate scope.
