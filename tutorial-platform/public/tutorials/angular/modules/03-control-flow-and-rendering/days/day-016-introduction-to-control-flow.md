---
title: Introduction to Angular Control Flow
slug: day-016-introduction-to-control-flow
dayLabel: Day 16
level: Beginner
estimatedMinutes: 60
order: 16
track: angular
youtubeVideos: []
---

# Day 16 [Beginner]: Introduction to Angular Control Flow

## Goal

Understand why an application needs conditional and repeated rendering.

## The Problem

Our Profile UI currently renders known content.

Real applications need questions such as:

- Should this message be visible?
- Are there any products?
- Which products should be rendered?
- Which status should be shown?
- What should the user see while data is loading?

These are rendering decisions.

## Control Flow

Conceptually:

```text
Application state
      ↓
Rendering decision
      ↓
UI
```

Angular's modern built-in control flow provides:

- `@if` for conditions.
- `@for` for collections.
- `@switch` for multiple alternatives.
- `@empty` for empty collections.

## Example

```html
@if (isAvailable) {
  <p>Available</p>
} @else {
  <p>Not Available</p>
}
```

The template decides what should be rendered based on component state.

## Why Not Learn Everything at Once?

First understand the problem:

```text
Need a condition → @if
Need a list → @for
Need multiple alternatives → @switch
Need empty-list UI → @empty
```

## Legacy Syntax

Existing Angular projects may contain:

```html
<div *ngIf="isAvailable"></div>
<div *ngFor="let item of items"></div>
```

These are important for maintenance and interviews, but this course uses modern built-in control flow for new code.

## Exercise

Take the Profile UI and identify:

- One piece of content that should be conditional.
- One future collection that should be rendered repeatedly.
- One status with multiple possible values.

Do not build the list yet.

## Interview Questions

### What is control flow in Angular?

It determines which template content should be rendered based on application state.

### What modern control-flow blocks does Angular provide?

`@if`, `@for`, `@switch`, and related blocks such as `@empty`.

## Assignment

Write three UI requirements and choose the appropriate control-flow block for each.

## Outcome

You understand why conditional and repeated rendering are necessary before learning their syntax.
