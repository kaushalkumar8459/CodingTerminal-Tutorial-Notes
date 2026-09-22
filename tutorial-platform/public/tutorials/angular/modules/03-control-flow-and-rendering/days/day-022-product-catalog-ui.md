---
title: Mini Project Product Catalog UI
slug: day-022-product-catalog-ui
dayLabel: Day 22
level: Beginner
estimatedMinutes: 120
order: 22
track: angular
youtubeVideos: []
---

# Day 22 [Beginner]: Mini Project — Product Catalog UI

## Goal

Build a small product catalog using Angular's modern built-in control flow.

## Requirements

Create a Product Catalog that supports:

- Product list.
- Empty state.
- Product status.
- Loading simulation.
- Error simulation.
- Product count.
- Product details.
- Add/remove product actions.

## Suggested State

```ts
products = [
  { id: 1, name: 'Laptop', price: 70000, status: 'available' },
  { id: 2, name: 'Keyboard', price: 3000, status: 'out-of-stock' },
];

viewState = 'success';
```

## Required Control Flow

### Conditional UI

Use `@if` for a simple condition such as showing the catalog toolbar.

### List

Use:

```html
@for (product of products; track product.id) {
  ...
} @empty {
  ...
}
```

### Multiple Statuses

Use `@switch` for product status.

### View States

Use `@switch` or another clear arrangement for loading, success, and error states.

## Acceptance Criteria

- [ ] Application runs successfully.
- [ ] Product list is rendered with `@for`.
- [ ] Product identity uses a stable tracking key.
- [ ] Empty list has an intentional empty state.
- [ ] Product status uses `@switch`.
- [ ] Conditional toolbar uses `@if`.
- [ ] Loading state is visible.
- [ ] Error state is visible.
- [ ] Empty and error states are different.
- [ ] No `*ngIf` or `*ngFor` is used for the new implementation.
- [ ] No service, HTTP, RxJS, or external state library is introduced.

## Final Challenge

Add a category filter using local component state.

Requirements:

- All products.
- Electronics.
- Accessories.
- Empty result state.

Do not introduce a service or HTTP API yet. The purpose is to master rendering decisions.

## Interview Questions

### 1. What is `@if`?

A built-in Angular control-flow block for conditional rendering.

### 2. What is `@for`?

A built-in Angular control-flow block for rendering a collection.

### 3. Why is `track` important?

It provides item identity so Angular can efficiently reconcile collection changes.

### 4. What is `@empty`?

Fallback content rendered when a `@for` collection has no items.

### 5. When is `@switch` useful?

When one state value has several mutually exclusive UI alternatives.

## Module Completion

Before starting Routing, explain:

- Why applications need control flow.
- `@if / @else if / @else`.
- `@for`.
- `@empty`.
- `track`.
- Context variables such as `$index`.
- `@switch / @case / @default`.
- Loading, success, empty, and error UI states.
- Why modern built-in control flow is the primary syntax for this course.

## Why Routing Comes Next

The learner can now build multiple UI sections and render dynamic content.

The next problem is:

**How do we turn these screens into navigable application pages?**

That is the reason Routing is introduced in Module 4.
