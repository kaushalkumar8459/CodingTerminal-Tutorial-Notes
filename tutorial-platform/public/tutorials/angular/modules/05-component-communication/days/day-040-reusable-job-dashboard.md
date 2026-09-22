---
id: "c5d09"
title: Mini Project — Reusable Job Dashboard
slug: day-040-reusable-job-dashboard
dayLabel: Day 40
level: Intermediate
estimatedMinutes: 150
order: 40
track: angular
youtubeVideos: []
---

# Day 40 — Mini Project: Reusable Job Dashboard

## Goal

Build a reusable job dashboard that demonstrates component communication without introducing global state.

## Components

Create:

- JobDashboard
- JobSearch
- JobFilters
- JobList
- JobCard
- QuantitySelector or SavedJobsToggle
- Reusable Panel

## Communication requirements

### JobSearch

- emits search text with output()

### JobFilters

- emits selected filters with output()

### JobList

- receives the filtered job collection with input()

### JobCard

- receives a required Job with input.required()
- emits Apply and Favorite events with output()

### SavedJobsToggle

Use model() for its intentionally two-way value.

### Reusable Panel

Use content projection for custom title/body/actions.

## View query requirement

Use viewChildren() or viewChild() for one small UI interaction such as focusing a search control. Do not use queries for business state.

## State ownership

JobDashboard owns the page-level state.

Children should communicate through their contracts rather than modifying dashboard state directly.

## Acceptance criteria

- [ ] Standalone components only
- [ ] input() / input.required() used where appropriate
- [ ] output() used for child events
- [ ] model() used for one genuine two-way value
- [ ] ng-content used for reusable content
- [ ] viewChild() or viewChildren() used for one narrow UI interaction
- [ ] Modern @if / @for syntax
- [ ] No *ngIf or *ngFor
- [ ] No any
- [ ] No global state library
- [ ] No HTTP or RxJS required
- [ ] Clear state ownership
- [ ] Components have focused responsibilities

## Stretch goals

- Add an empty state and loading simulation
- Add keyboard-friendly focus behavior
- Extract reusable UI contracts into shared interfaces
- Later connect the dashboard to a service when Services & DI are introduced

## Interview questions

1. input() vs output() vs model()?
2. When should siblings communicate through their parent?
3. What is content projection useful for?
4. When should you use a view query?
5. When should local component communication become shared service state?
6. How would you prevent a reusable component from becoming tightly coupled to a feature?

## Final outcome

The learner can design reusable Angular components with explicit communication contracts.

Next dependency: Directives & Pipes. After components can communicate, learners are ready to create reusable behavior and presentation transformations.
