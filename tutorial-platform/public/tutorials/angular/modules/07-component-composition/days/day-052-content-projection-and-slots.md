---
id: "cc7d3"
title: Content Projection and Slots in Real Components
slug: day-052-content-projection-and-slots
dayLabel: Day 52
level: Intermediate
estimatedMinutes: 90
order: 52
track: angular
youtubeVideos: []
---

# Day 52 — Content Projection and Slots in Real Components

## Goal

Use content projection to make reusable components flexible without exposing their internal layout.

## Basic projection

    <app-panel>
      <h2>Recent Jobs</h2>
      <p>Latest openings</p>
    </app-panel>

Panel:

    <section>
      <ng-content />
    </section>

## Multiple slots

A reusable modal shell may define:

    <header>
      <ng-content select="[modal-title]" />
    </header>

    <main>
      <ng-content select="[modal-body]" />
    </main>

    <footer>
      <ng-content select="[modal-actions]" />
    </footer>

## When projection is better than inputs

Use projection when the consumer needs to provide arbitrary markup or richer content.

Use inputs when the component only needs data such as:

    [title]="title"

## Practical exercise

Build a DialogShell with title, body, and actions slots.

Use it for:

- Delete confirmation
- Job application information
- Help content

## Common mistakes

- Using projection for simple text that should be an input
- Making slot selectors unclear
- Letting projected content depend on private implementation details

## Interview questions

1. What is content projection?
2. When should you use projection instead of inputs?
3. How do multiple slots work?
4. Does projected content become part of the child's own view?

## Assignment

Create a reusable CardShell with header, content, and footer slots.

## Outcome

You can create flexible components without tightly coupling their internal markup to consumers.
