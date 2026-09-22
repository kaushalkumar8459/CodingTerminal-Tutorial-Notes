id="c5d06"
---
title: Content Projection with ng-content
slug: day-037-content-projection-with-ng-content
dayLabel: day-037-content-projection-with-ng-content
dayLabel: Day 37
level: Intermediate
estimatedMinutes: 90
order: 37
track: angular
youtubeVideos: []
---

# Day 37 — Content Projection with ng-content

## Goal

Create reusable wrapper components whose structure is fixed while the parent supplies content.

## Why projection?

A reusable Card component may own:

- border
- spacing
- header/footer layout

But callers may need different content.

## Basic example

Child:

    <section class="card">
      <ng-content />
    </section>

Parent:

    <app-card>
      <h2>Angular Jobs</h2>
      <p>12 jobs found.</p>
    </app-card>

The parent supplies content and the Card supplies the container structure.

## Multiple slots

Use selectors for named content areas:

    <header>
      <ng-content select="[card-title]" />
    </header>

    <main>
      <ng-content />
    </main>

Parent:

    <app-card>
      <h2 card-title>Jobs</h2>
      <p>Latest openings</p>
    </app-card>

## Practical exercise

Build a reusable Panel component with:

- title slot
- body slot
- actions slot

Use it on two different pages.

## Common mistakes

- Using projection when a simple input is clearer
- Putting business state inside a presentational wrapper
- Forgetting selector matching for named slots
- Confusing projected content with the component's own view

## Interview questions

1. What is content projection?
2. Why use ng-content?
3. What are multiple projection slots?
4. Projection vs input?

## Assignment

Build a reusable Alert component that projects custom message content and actions.

## Outcome

You can create flexible container components without tightly coupling them to page content.
