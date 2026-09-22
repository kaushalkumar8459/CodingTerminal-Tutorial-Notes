---
title: Lifecycle & Component Runtime
slug: lifecycle-and-component-runtime
level: Intermediate
order: 9
track: angular
---

# Module 9 — Lifecycle & Component Runtime

## Goal

Understand when Angular creates, renders, updates, and destroys components, and use lifecycle APIs only when they solve a real problem.

## Days

- Day 69 — Why Component Lifecycle Matters
- Day 70 — Component Creation and Initialization
- Day 71 — ngOnChanges and Input Changes
- Day 72 — AfterViewInit and AfterViewChecked
- Day 73 — OnDestroy and Cleanup
- Day 74 — Modern Lifecycle Utilities and Render Callbacks
- Day 75 — Mini Project: Component Lifecycle Monitor

## Dependency flow

Component creation → initialization → input changes → view rendering → cleanup → modern lifecycle utilities → project.

## Teaching rule

Prefer normal Angular bindings, signals, computed values, and declarative templates before reaching for lifecycle hooks. A lifecycle hook should solve a specific timing or integration problem.

## Outcome

Learners can explain the component lifecycle, choose the correct lifecycle API, react to input changes, perform view-related work safely, and clean up component-owned resources.
