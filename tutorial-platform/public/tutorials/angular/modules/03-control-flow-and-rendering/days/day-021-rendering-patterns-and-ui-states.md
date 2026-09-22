---
title: Rendering Patterns and UI States
slug: day-021-rendering-patterns-and-ui-states
dayLabel: Day 21
level: Beginner
estimatedMinutes: 75
order: 21
track: angular
youtubeVideos: []
---

# Day 21 [Beginner]: Rendering Patterns and UI States

## Goal

Combine control-flow blocks to model realistic UI states.

## The Four Common States

Many screens need at least:

```text
Loading
Success
Empty
Error
```

A simple state model:

```ts
viewState = 'loading';
```

The template can render the appropriate experience.

## Example

```html
@switch (viewState) {
  @case ('loading') {
    <p>Loading products...</p>
  }
  @case ('success') {
    @for (product of products; track product.id) {
      <p>{{ product.name }}</p>
    } @empty {
      <p>No products found.</p>
    }
  }
  @case ('error') {
    <p>Unable to load products.</p>
  }
}
```

The HTTP/API layer is intentionally not introduced yet. Use local component state to simulate these conditions.

## Nested Control Flow

Nested blocks are valid when they represent real UI relationships.

Avoid deeply nested templates that become difficult to read.

## Practical Exercise

Create a Product Catalog screen with buttons that simulate:

- Loading.
- Success with products.
- Success with no products.
- Error.

Use `@switch`, `@for`, and `@empty`.

## Design Principle

Every meaningful application state should have a deliberate UI.

Do not treat an empty list as an error. Do not treat a loading state as success.

## Interview Questions

**What UI states commonly appear in data-driven screens?** Loading, success, empty, and error are common examples.

**Should empty and error be the same state?** No. They represent different user situations and usually need different messages/actions.

## Assignment

Build a reusable mental model for handling loading, success, empty, and error states without adding HTTP yet.
