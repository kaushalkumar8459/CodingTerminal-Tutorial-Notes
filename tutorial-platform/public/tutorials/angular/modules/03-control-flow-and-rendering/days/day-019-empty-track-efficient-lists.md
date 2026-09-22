---
title: @empty track and Efficient Lists
slug: day-019-empty-track-efficient-lists
dayLabel: Day 19
level: Beginner
estimatedMinutes: 60
order: 19
track: angular
youtubeVideos: []
---

# Day 19 [Beginner]: @empty, track and Efficient Lists

## Goal

Handle empty collections and understand stable item tracking.

## @empty

A good list needs a useful empty state:

```html
@for (product of products; track product.id) {
  <p>{{ product.name }}</p>
} @empty {
  <p>No products found.</p>
}
```

This is better than showing a blank area.

## Why track?

Angular needs to understand which rendered item corresponds to which data item when a collection changes.

Prefer a stable unique identifier:

```html
@for (product of products; track product.id) {
  ...
}
```

Avoid tracking by array index when items can be inserted, removed, or reordered.

For truly stable primitive values, tracking by the value itself can be appropriate:

```html
@for (skill of skills; track skill) {
  <li>{{ skill }}</li>
}
```

## Practical Exercise

Create a product list with:

- Product rendering.
- Empty state.
- Stable product IDs.
- Add product.
- Remove product.
- Reorder product.

Observe how the tracking key represents item identity.

## Common Mistake

Do not choose `$index` automatically just because it is available.

```html
@for (product of products; track $index) {
```

This can be inappropriate when the collection changes order or membership.

## Interview Questions

**What does `@empty` do?** Renders fallback content when a `@for` collection has no items.

**Why should a list have a tracking key?** Stable identity helps Angular efficiently reconcile rendered items.

**Should index always be used for tracking?** No. A stable item identity is generally preferable when available.
