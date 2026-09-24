---
title: Why Component Lifecycle Matters
slug: day-069-why-component-lifecycle-matters
dayLabel: Day 69
level: Intermediate
estimatedMinutes: 60
order: 69
track: angular
youtubeVideos: []
---

# Day 69 — Why Component Lifecycle Matters

## Goal

Understand why Angular components have a lifecycle and why timing matters.

## Mental model

    Create → Initialize → Inputs change → Render/update → View ready → Destroy

Angular controls when a component is created, checked, rendered, and destroyed. Lifecycle APIs let your code participate at specific points.

## Why timing matters

Ask:

- Has the component instance been created?
- Are its child views available?
- Is the component about to be destroyed?

The correct API depends on the answer.

## Prefer declarative Angular first

Prefer:

- template bindings for UI
- signals for reactive state
- computed values for derived state
- inputs and outputs for component contracts

Use lifecycle APIs when you need a lifecycle-dependent operation.

## Exercise

Create a component that displays a visible timeline of its major lifecycle stages. Do not add HTTP or RxJS.

## Interview questions

1. What is an Angular component lifecycle?
2. Why should lifecycle hooks not be used for every piece of logic?
3. Which lifecycle stage is associated with cleanup?

## Outcome

You can identify lifecycle problems before choosing a hook.
