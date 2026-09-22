---
id: angular-day-256
title: Feature-Based Architecture and Application Boundaries
day: 256
module: 23
---

# Day 256 — Feature-Based Architecture and Application Boundaries

## Goal

Learn to organize a large Angular application around features instead of technical file types.

## Angular guidance

Angular's style guide recommends organizing code by feature areas and grouping closely related files together. It discourages broad folders organized only by type, such as components, directives, and services. citeturn0search0

## Feature-first example

Instead of:

~~~text
components/
services/
models/
pipes/
guards/
~~~

A feature-oriented structure can look like:

~~~text
features/
  jobs/
    pages/
    components/
    data-access/
    state/
  applications/
    pages/
    data-access/
    state/
  recruiter/
    pages/
    data-access/
~~~

The exact names are less important than ownership.

## Application boundary

A feature boundary should answer:

> Which code belongs to this business capability?

For example, job search may own filters, job list, job details, saved-job behavior, and job-specific API mapping.

## Exercise

Split JobHub into Candidate, Recruiter, Admin, and Authentication boundaries. Identify what each feature owns.

## Common mistakes

- Creating one global models folder for every model.
- Moving every reusable class into shared.
- Making every feature depend on every other feature.
- Confusing a folder boundary with a real dependency boundary.

## Interview questions

1. What is feature-based architecture?
2. Why is feature-first organization useful?
3. What makes a feature boundary healthy?
4. Why can a global services folder become difficult to maintain?

## Outcome

You can identify meaningful feature boundaries before choosing implementation details.
