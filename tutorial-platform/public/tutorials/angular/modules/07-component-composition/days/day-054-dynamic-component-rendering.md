id="cc7d5"
---
title: Dynamic Component Rendering
slug: day-054-dynamic-component-rendering
dayLabel: Day 54
level: Intermediate
estimatedMinutes: 100
order: 54
track: angular
youtubeVideos: []
---

# Day 54 — Dynamic Component Rendering

## Goal

Render a component dynamically when the component type is selected at runtime.

## When dynamic rendering helps

Examples:

- Dashboard widgets selected by configuration
- Plugin-like UI areas
- Dynamic dialogs
- Different editors selected by type

Do not use dynamic rendering when a normal @if, @switch, or static component tree is clearer.

## Concept

A view container can host a component created at runtime.

Modern Angular supports dynamic component creation through APIs such as ViewContainerRef.createComponent().

Conceptual example:

    const ref = this.viewContainer.createComponent(StatsWidgetComponent);

The returned component reference can be configured and managed by the owning feature.

## Practical exercise

Create a DashboardWidgetHost that can display one of:

- StatsWidget
- JobsWidget
- AlertsWidget

Choose the widget type from local configuration.

## Common mistakes

- Dynamically creating static UI
- Forgetting cleanup/lifecycle ownership
- Building an unnecessary plugin architecture
- Using component references to bypass normal contracts

## Interview questions

1. What is dynamic component rendering?
2. When would you use createComponent()?
3. Why not dynamically render every component?
4. Who owns a dynamically created component?

## Assignment

Build a dynamic widget area with three widget types and a clear owner for their lifecycle.

## Outcome

You understand when runtime component composition is appropriate.
