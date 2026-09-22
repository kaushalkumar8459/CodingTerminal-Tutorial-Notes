id="c5d05"
---
title: Parent Child Communication Patterns
slug: day-036-parent-child-communication-patterns
dayLabel: Day 36
level: Beginner
estimatedMinutes: 90
order: 36
track: angular
youtubeVideos: []
---

# Day 36 — Parent–Child Communication Patterns

## Goal

Combine inputs, outputs, and model() into practical component relationships.

## Pattern 1 — Parent owns state

The parent holds the source of truth.

    <app-job-card
      [job]="job"
      (apply)="onApply($event)" />

This is the preferred starting point for most local component relationships.

## Pattern 2 — Reusable value control

Use model() when a component intentionally exposes a two-way value.

    <app-quantity [(quantity)]="quantity" />

## Pattern 3 — Sibling components

Siblings normally communicate through their common parent:

    SearchBar → Parent → JobList

Do not create direct sibling references just to avoid a parent event handler.

## Pattern 4 — When a service becomes appropriate

If unrelated components or multiple routes need the same business state, a service can become the shared owner. Services and dependency injection are introduced in the next major module.

## Practical exercise

Build a Jobs page containing:

- SearchBar
- FilterPanel
- JobList
- JobCard

The page coordinates communication.

Requirements:

- SearchBar emits the search term.
- FilterPanel emits selected filters.
- JobList receives filtered jobs.
- JobCard receives a job and emits Apply.

## Common mistakes

- Turning every sibling relationship into a service
- Using global state for a local page
- Passing unrelated data through many layers
- Making a child responsible for parent-owned business state

## Interview questions

1. How should siblings communicate?
2. Who should own state?
3. When should communication move to a service?
4. What is prop drilling and when is it a problem?

## Assignment

Draw the data-flow diagram for the Jobs page.

## Outcome

You can choose a communication pattern based on ownership and scope.
