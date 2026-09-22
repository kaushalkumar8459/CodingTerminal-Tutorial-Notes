---
title: Mini Project — Component Lifecycle Monitor
slug: mini-project-component-lifecycle-monitor
dayLabel: Day 75
level: Advanced
estimatedMinutes: 120
order: 75
track: angular
youtubeVideos: []
---

# Day 75 — Mini Project: Component Lifecycle Monitor

## Goal

Build a small Angular application that makes component lifecycle behavior observable and practical.

## Project

Create a Lifecycle Monitor containing:

- parent component
- child component
- dynamic show/hide control
- changing child input
- view-dependent child element
- lifecycle event log
- cleanup indicator

## Required behavior

### 1. Create and destroy

A button should show and hide the child component so learners can observe creation and destruction.

### 2. Input changes

The parent changes a child input. The child displays the current value and demonstrates appropriate input-change handling.

### 3. View timing

Use a view query for an element that genuinely requires view availability. Explain why the operation cannot happen earlier.

### 4. Cleanup

Register a component-owned cleanup operation using an appropriate Angular lifecycle API.

### 5. Lifecycle log

Display a simple list of lifecycle events for learning purposes.

## Architecture

    LifecycleMonitorPage
            ↓
    LifecycleParent
            ↓
    LifecycleChild
       ├── input state
       ├── view query
       └── cleanup

## Acceptance criteria

- Uses standalone components.
- Uses modern @if control flow.
- Uses signal inputs where appropriate.
- Demonstrates initialization.
- Demonstrates input changes.
- Demonstrates view timing.
- Demonstrates cleanup.
- Avoids expensive work in frequent lifecycle hooks.
- Does not introduce HTTP, external state libraries, or unnecessary RxJS.
- Each lifecycle API has a documented reason for being present.

## Reflection

1. Which lifecycle APIs did you actually need?
2. Which code could have been declarative instead?
3. Which operation required the view to exist?
4. What resource did the component own?
5. What would happen if cleanup were removed?

## Outcome

You can reason about Angular component runtime behavior instead of memorizing lifecycle hook names. This prepares you for the next module, where modern signals and reactive state become the primary focus.
