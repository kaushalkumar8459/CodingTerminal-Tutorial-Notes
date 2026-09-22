---
title: Control Flow and Rendering
slug: control-flow-and-rendering
level: Beginner
order: 3
track: angular
---

# Module 3: Control Flow and Rendering

## Purpose

The Profile UI can now display data and respond to user actions. The next real problem is:

**How do we show, hide, repeat, and switch UI based on application state?**

This module introduces Angular's modern built-in control flow.

## Dependency Flow

```text
Component data
   ↓
@if
   ↓
@else / @else if
   ↓
@for
   ↓
@empty
   ↓
@switch / @case
   ↓
track
   ↓
Rendering and empty/loading/error states
   ↓
Dynamic UI mini project
```

## Days

| Day | Topic |
|---|---|
| 16 | Introduction to Angular Control Flow |
| 17 | @if and Conditional Rendering |
| 18 | @for and List Rendering |
| 19 | @empty, track and Efficient Lists |
| 20 | @switch and Multiple UI States |
| 21 | Rendering Patterns and UI States |
| 22 | Mini Project: Product Catalog UI |

## Modern Angular Rule

Use built-in control flow such as `@if`, `@for`, and `@switch` for new code.

Legacy structural directives such as `*ngIf` and `*ngFor` should be learned later for maintaining existing applications, not as the primary syntax for this course.

## Module Project

Build a **Product Catalog UI** that can:

- Show products conditionally.
- Render a product list.
- Handle an empty list.
- Track list items.
- Display different product statuses.
- Switch between loading, success, empty, and error states.

## Completion Criteria

The learner should be able to:

- Explain Angular built-in control flow.
- Use `@if / @else if / @else`.
- Render collections with `@for`.
- Use `@empty`.
- Understand why `track` matters.
- Use `@switch / @case / @default`.
- Design clear loading, empty, success, and error UI states.
