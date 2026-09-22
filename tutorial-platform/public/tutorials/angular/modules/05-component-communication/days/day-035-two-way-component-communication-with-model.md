id="c5d04"
---
title: Two-Way Component Communication with model()
slug: day-035-two-way-component-communication-with-model
dayLabel: Day 35
level: Beginner
estimatedMinutes: 75
order: 35
track: angular
youtubeVideos: []
---

# Day 35 — Two-Way Component Communication with model()

## Goal

Understand Angular's model() API for components that intentionally expose a two-way bindable value.

## Why model()?

Some reusable controls have a value that the parent both provides and expects the child to update.

Examples:

- Toggle
- Rating
- Quantity selector
- Custom input
- Expand/collapse control

## Example

Child:

    import { model } from '@angular/core';

    export class RatingComponent {
      readonly rating = model(0);

      increase(): void {
        this.rating.update(value => Math.min(value + 1, 5));
      }
    }

Parent:

    <app-rating [(rating)]="rating" />

The model creates the value contract and corresponding change behavior needed for two-way binding.

## Important rule

Two-way binding should be used when the child is a reusable value-control. Do not use it as an excuse to make every component share mutable state.

## Practical exercise

Build a QuantitySelector:

- minimum 1
- maximum 10
- increment
- decrement
- parent binds with [(quantity)]

## Common mistakes

- Using model() everywhere
- Confusing model() with global state
- Allowing invalid values
- Hiding important business decisions inside a generic control

## Interview questions

1. What problem does model() solve?
2. When is two-way component binding appropriate?
3. model() vs input() + output()?
4. Is model() global state?

## Assignment

Create a reusable Rating component with [(rating)] binding.

## Outcome

You can deliberately design two-way bindable Angular components.
