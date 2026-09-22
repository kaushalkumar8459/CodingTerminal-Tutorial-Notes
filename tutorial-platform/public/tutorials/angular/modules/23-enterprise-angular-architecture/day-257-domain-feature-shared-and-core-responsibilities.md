---
id: angular-day-257
title: Domain, Feature, Shared and Core Responsibilities
day: 257
module: 23
---

# Day 257 — Domain, Feature, Shared and Core Responsibilities

## Goal

Understand common architectural areas and prevent responsibility leakage.

## A useful model

~~~text
Domain
  Business concepts and rules

Feature
  User-facing business workflows

Shared
  Reusable UI and framework-neutral utilities

Core / Application infrastructure
  Cross-cutting application capabilities
~~~

These are responsibility categories, not mandatory Angular modules.

## Domain

Examples include Job, Application, Candidate, Recruiter, and Permission. Domain code should avoid depending on page-specific UI components.

## Feature

A feature owns a workflow such as searching jobs, creating jobs, reviewing applications, or managing users.

## Shared

Good shared candidates:

- Button
- Modal shell
- form-field wrapper
- common accessibility helper
- framework-neutral utility

Bad shared candidates:

- JobServiceForEverything
- feature-specific state
- arbitrary business logic

## Core / application infrastructure

Typical cross-cutting concerns include authentication, configuration, HTTP infrastructure, global error handling, and observability.

Modern standalone Angular does not require the old NgModule-based CoreModule or SharedModule pattern. Keep the responsibility concepts, not the legacy module ceremony.

## Exercise

For ten JobHub files, classify each as Domain, Feature, Shared, Application/Core, or Wrong ownership.

## Common mistakes

- Putting everything reusable into Shared.
- Treating Core as a second dumping ground.
- Putting business rules into generic UI components.
- Making Domain depend on Angular-specific infrastructure unnecessarily.

## Outcome

You can distinguish reusable code from globally owned infrastructure and feature-owned business behavior.
