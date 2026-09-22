---
id: "cc7d2"
title: Reusable UI Components
slug: day-051-reusable-ui-components
dayLabel: Day 51
level: Intermediate
estimatedMinutes: 90
order: 51
track: angular
youtubeVideos: []
---

# Day 51 — Reusable UI Components

## Goal

Build small UI components with predictable APIs.

## Good reusable components

Examples:

- Button
- Badge
- Card
- Avatar
- Empty State
- Loading Indicator
- Modal shell
- Panel

A reusable component should expose only the configuration its consumers actually need.

## Example

    <app-status-badge
      [label]="job.status"
      [variant]="job.status" />

The component should not know how a Job is stored or fetched.

## API design

Consider:

- Required inputs
- Optional inputs
- Outputs for user actions
- Sensible defaults
- Accessible semantics
- Stable naming

Use input() and output() from the previous module.

## Practical exercise

Create:

- AppButton
- StatusBadge
- EmptyState
- Card

Use them on two different feature screens.

## Common mistakes

- Feature-specific names for generic components
- Too many inputs
- Generic "config" objects containing everything
- Components that secretly call APIs
- Components coupled to routing or authentication

## Interview questions

1. What makes a UI component reusable?
2. How do you design a component API?
3. Why avoid giant config objects?
4. Should a Button component call an API?

## Assignment

Create a reusable Button with variants, disabled state, and an action output.

## Outcome

You can build reusable UI primitives with explicit contracts.
