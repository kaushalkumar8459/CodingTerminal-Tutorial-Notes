id="cc7d1"
---
title: Why Component Composition
slug: day-050-why-component-composition
dayLabel: Day 50
level: Intermediate
estimatedMinutes: 60
order: 50
track: angular
youtubeVideos: []
---

# Day 50 — Why Component Composition?

## Goal

Understand how multiple focused components can form a larger feature without creating a giant component.

## The problem

A dashboard can contain:

- Header
- Sidebar
- Toolbar
- Cards
- Tables
- Filters
- Empty states
- Dialogs

One component owning all of this becomes difficult to understand and reuse.

## Composition mental model

Think in layers:

    Page
      ↓
    Feature components
      ↓
    Reusable UI components
      ↓
    Native HTML elements

Each component should own a clear responsibility.

## Example

A Job Dashboard might be composed of:

    JobDashboard
      ├── JobToolbar
      ├── JobSummary
      ├── JobFilters
      └── JobTable
            └── JobRow

The page coordinates. Smaller components render focused pieces.

## Practical exercise

Take the Day 49 Product Catalog and identify:

- page components
- feature components
- reusable UI components

Do not code yet. First draw the component tree.

## Common mistakes

- Creating components for every tiny HTML element
- One giant feature component
- Deep component trees without clear ownership
- Reusing components with too many configuration flags

## Interview questions

1. What is component composition?
2. Why split a large component?
3. How deep should a component tree be?
4. What makes a component genuinely reusable?

## Assignment

Design a component tree for an Admin Dashboard before implementation.

## Outcome

You can reason about component boundaries before writing code.
