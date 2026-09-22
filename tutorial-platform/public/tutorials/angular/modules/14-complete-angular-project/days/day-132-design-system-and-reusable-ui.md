---
id="angular-day-132"
title="Design System and Reusable UI"
slug="day-132-design-system-and-reusable-ui"
dayLabel="Day 132"
level=Intermediate
estimatedMinutes=90
order=132
track=angular
youtubeVideos=[]
---
# Day 132 — Design System and Reusable UI

## Goal
Build the reusable UI foundation before feature screens multiply.

## Components
Create reusable components such as:
- Button
- Input
- Badge
- Card
- Modal
- EmptyState
- LoadingState
- ErrorState
- Pagination
- ConfirmDialog

## Contracts
Use signal inputs and outputs to make component APIs explicit.

A reusable component should not know whether it is being used by Jobs, Profile, or Admin.

## Exercise
Create a small JobHub UI kit and replace duplicated markup with reusable components.

## Common Mistakes
- Over-generalizing components.
- Adding business logic to generic UI.
- Creating a component for every tiny HTML fragment.

## Interview Questions
1. What makes a component reusable?
2. How do you design component inputs and outputs?
3. When should UI stay local instead of becoming shared?

## Outcome
You can build a consistent UI foundation for a feature-rich Angular application.
