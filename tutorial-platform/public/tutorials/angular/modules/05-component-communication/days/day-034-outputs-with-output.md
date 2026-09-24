---
id: "c5d03"
title: Outputs with output()
slug: day-034-outputs-with-output
dayLabel: Day 34
level: Beginner
estimatedMinutes: 75
order: 34
track: angular
youtubeVideos: []
---

# Day 34 — Outputs with output()

## Goal

Send events from a child component to its parent.

## Basic example

Child:

    import { Component, output } from '@angular/core';

    export class JobCardComponent {
      readonly apply = output<number>();

      applyForJob(): void {
        this.apply.emit(101);
      }
    }

Parent:

    <app-job-card (apply)="onApply($event)" />

    onApply(jobId: number): void {
      console.log('Apply clicked:', jobId);
    }

The child announces what happened. The parent decides what to do.

## Event design

Prefer meaningful domain events:

    readonly favoriteToggled = output<boolean>();

rather than exposing internal implementation details.

## No shared mutation

The child should not directly reach into parent state. Emit an event and let the owner update its state.

## Practical exercise

Extend JobCard with:

- Apply button
- Favorite button
- apply output
- favoriteToggled output

The parent owns the resulting state.

## Common mistakes

- Naming events like DOM implementation details
- Emitting an entire component when only an ID is needed
- Mutating parent state directly
- Putting business workflows inside the presentational child

## Interview questions

1. What is output()?
2. Who owns the state after an output event?
3. Why use domain-oriented event names?
4. output() vs EventEmitter?

## Assignment

Build a reusable ProductCard that emits select and delete events.

## Outcome

You can design child-to-parent event contracts using output().
