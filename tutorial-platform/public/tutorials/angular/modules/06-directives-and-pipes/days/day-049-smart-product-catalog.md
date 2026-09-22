id="d6d09"
---
title: Mini Project — Smart Product Catalog
slug: day-049-smart-product-catalog
dayLabel: Day 49
level: Intermediate
estimatedMinutes: 150
order: 49
track: angular
youtubeVideos: []
---

# Day 49 — Mini Project: Smart Product Catalog

## Goal

Build a product catalog that demonstrates reusable directives and pipes while preserving clean component boundaries.

## Features

Create:

- Product List
- Product Card
- Product Details
- Search/filter UI
- Empty state
- Product status indicators

Use local data only.

## Required directive work

Create at least two directives:

1. Status directive — changes host presentation based on product status.
2. Highlight directive — provides reusable visual emphasis.

## Required pipe work

Create at least three pipes:

1. Price display or price range
2. Product status label
3. Relative date or simple display transformation

Also use built-in pipes such as currency and date.

## Required rendering

Use:

- @if
- @for
- @empty
- track

Do not use *ngIf or *ngFor in new code.

## Design requirements

- Components own UI structure.
- Directives own reusable host behavior.
- Pipes own display transformation.
- No directive performs API calls.
- No pipe changes business state.
- No global state library.
- No HTTP or RxJS required.

## Acceptance criteria

- [ ] At least two custom directives
- [ ] At least three custom pipes
- [ ] At least three built-in pipes
- [ ] @if / @for / @empty used
- [ ] Clear component/directive/pipe responsibilities
- [ ] No *ngIf or *ngFor
- [ ] No any
- [ ] No HTTP
- [ ] No RxJS
- [ ] Local mock data only
- [ ] Empty and populated states work

## Interview questions

1. Component vs directive vs pipe?
2. When would you use a directive instead of a component?
3. Pure vs impure pipe?
4. Why should a pipe avoid side effects?
5. Why should business state not live in a presentation directive?

## Final outcome

The learner can create and evaluate reusable Angular directives and pipes.

Next dependency: Component Composition. The learner now understands reusable components and reusable behavior, so the next step is composing larger UI structures from them.
