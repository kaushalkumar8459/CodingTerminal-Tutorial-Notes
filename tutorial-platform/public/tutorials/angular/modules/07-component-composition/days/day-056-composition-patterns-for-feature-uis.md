id="cc7d7"
---
title: Composition Patterns for Feature UIs
slug: day-056-composition-patterns-for-feature-uis
dayLabel: Day 56
level: Intermediate
estimatedMinutes: 90
order: 56
track: angular
youtubeVideos: []
---

# Day 56 — Composition Patterns for Feature UIs

## Goal

Combine reusable UI primitives into complete feature screens.

## Example architecture

    JobsPage
      ├── PageHeader
      ├── SearchBar
      ├── FilterPanel
      ├── SummaryCards
      ├── JobTable
      │     └── JobRow
      └── EmptyState

The page owns feature state. Reusable children expose contracts.

## Container vs presentational responsibility

A feature/container component usually coordinates:

- feature state
- navigation
- business decisions

A presentational component usually handles:

- rendering
- user-facing events
- small local UI state

This is a design guideline, not a requirement to create two components for every screen.

## Practical exercise

Compose a Student Dashboard using:

- PageHeader
- StatCard
- ProgressBar
- CourseCard
- EmptyState

Keep the page-level mock data in the dashboard.

## Common mistakes

- Making every component stateful
- Passing unrelated data through many levels
- Putting feature business rules in generic UI components
- Overusing inheritance instead of composition

## Interview questions

1. Container vs presentational component?
2. Why favor composition?
3. Where should feature state live?
4. How do you avoid prop drilling?

## Assignment

Design a Faculty Dashboard using at least six reusable components.

## Outcome

You can assemble feature screens from reusable building blocks while preserving ownership.
