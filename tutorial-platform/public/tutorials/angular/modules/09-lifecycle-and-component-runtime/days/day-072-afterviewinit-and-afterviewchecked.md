---
title: AfterViewInit and AfterViewChecked
slug: day-072-afterviewinit-and-afterviewchecked
dayLabel: Day 72
level: Intermediate
estimatedMinutes: 75
order: 72
track: angular
youtubeVideos: []
---

# Day 72 — AfterViewInit and AfterViewChecked

## Goal

Understand view lifecycle timing and when code can safely interact with view-related dependencies.

## AfterViewInit

ngAfterViewInit runs after Angular initializes the component view and its child views.

It is useful when an operation genuinely requires the view to exist, such as integrating with a view-dependent third-party widget.

## AfterViewChecked

ngAfterViewChecked runs after Angular checks the component view and can run frequently.

Avoid expensive work here.

## Modern alternative

Angular also provides render callback APIs for work that should happen after rendering. Use the API that best matches the timing requirement instead of forcing every problem into a lifecycle hook.

## Exercise

Create a component with a view query and document why the operation must wait until the view exists.

## Common mistakes

- Performing heavy computation in ngAfterViewChecked
- Using view lifecycle hooks when a normal binding would work
- Assuming DOM manipulation is always necessary

## Interview questions

1. When does ngAfterViewInit run?
2. Why can ngAfterViewChecked be dangerous for expensive work?
3. When should view-dependent code run?

## Outcome

You understand view timing and can avoid unnecessary work during frequent checks.
