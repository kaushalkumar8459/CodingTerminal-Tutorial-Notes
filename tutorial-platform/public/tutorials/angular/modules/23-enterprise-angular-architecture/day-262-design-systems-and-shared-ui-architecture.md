---
id: angular-day-262
title: Design Systems and Shared UI Architecture
day: 262
module: 23
---

# Day 262 — Design Systems and Shared UI Architecture

## Goal

Design a shared UI layer that stays reusable without becoming coupled to business features.

## Shared UI should provide

- visual primitives
- accessibility behavior
- layout primitives
- form controls
- feedback components
- consistent interaction patterns

## Shared UI should not own

- job-search API calls
- recruiter permissions
- candidate-specific business rules
- application workflows

For example:

~~~text
SharedButton
  ↓
Feature JobCreatePage
  ↓
JobCreateService
~~~

not:

~~~text
SharedButton
  ↓
JobService
~~~

## Public API thinking

Treat shared UI as a product:

- stable inputs
- stable outputs
- documented behavior
- accessibility expectations
- visual consistency
- tests
- controlled breaking changes

## Exercise

Choose five JobHub UI components and classify them as feature component, shared UI primitive, domain component, or application shell component. Define the public API of one shared component.

## Common mistakes

- Putting business logic inside reusable controls.
- Creating giant configurable components.
- Sharing feature components just to avoid duplication.
- Breaking consumers through uncontrolled UI changes.

## Outcome

You can build a shared design-system layer without turning it into a business-logic dependency.
