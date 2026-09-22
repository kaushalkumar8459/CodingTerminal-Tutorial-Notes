---
id: angular-day-259
title: Dependency Direction and Layered Architecture
day: 259
module: 23
---

# Day 259 — Dependency Direction and Layered Architecture

## Goal

Learn how to control dependencies so that features do not become tightly coupled.

## Dependency direction

One practical model is:

~~~text
UI
 ↓
Application / Feature
 ↓
Domain
 ↓
Infrastructure
~~~

The exact layering can vary, but the direction should be intentional.

## Example

A Job page may depend on a Job use-case service. It should not need to know which HTTP endpoint is used, which headers are required, how API DTOs are converted, or which storage implementation is selected.

## Dependency rule

Ask:

> If this lower-level implementation changes, how many unrelated files must change?

Fewer affected consumers generally means a stronger boundary.

## Avoid circular dependencies

Bad:

~~~text
jobs → applications
   ↑       ↓
   └───────┘
~~~

If two features need the same business concept, consider whether that concept belongs in a shared domain contract rather than one feature importing another feature's internals.

## Exercise

Draw JobHub's dependency graph. Mark every dependency as allowed, questionable, or circular. Remove one unnecessary dependency.

## Common mistakes

- Calling the API directly from every component.
- Importing feature internals from another feature.
- Creating interfaces everywhere without a real substitution need.
- Hiding circular dependencies instead of fixing ownership.

## Outcome

You can explain and enforce dependency direction in a large Angular codebase.
