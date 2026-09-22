---
title: @switch and Multiple UI States
slug: day-020-switch-multiple-ui-states
dayLabel: Day 20
level: Beginner
estimatedMinutes: 60
order: 20
track: angular
youtubeVideos: []
---

# Day 20 [Beginner]: @switch and Multiple UI States

## Goal

Render one of several UI alternatives based on a single state value.

## Basic Syntax

```ts
status = 'active';
```

```html
@switch (status) {
  @case ('active') {
    <p>Active</p>
  }
  @case ('pending') {
    <p>Pending</p>
  }
  @case ('finished') {
    <p>Finished</p>
  }
  @default {
    <p>Unknown status</p>
  }
}
```

## Why @switch?

If a single value can represent several mutually exclusive states, `@switch` can make the template easier to scan than a long chain of unrelated conditions.

## Practical Example

A job card can have:

```text
Not Started
Active
Reviewed
Verified
Finished
Cancelled
```

Represent the state once:

```ts
jobStatus = 'active';
```

Then choose the corresponding UI with `@switch`.

## Exercise

Create a job status component with at least five states.

For each state:

- Display a different message.
- Display a different action.
- Keep the state value in one component property.

## Interview Questions

**What is `@switch` used for?** Rendering different blocks based on one expression's value.

**What is `@default`?** The fallback when no case matches.

## Assignment

Build a status panel for an order with Pending, Processing, Shipped, Delivered, and Cancelled states.
