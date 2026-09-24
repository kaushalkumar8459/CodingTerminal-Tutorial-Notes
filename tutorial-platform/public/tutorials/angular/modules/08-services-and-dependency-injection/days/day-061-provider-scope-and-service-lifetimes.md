---
title: Provider Scope and Service Lifetimes
slug: day-061-provider-scope-and-service-lifetimes
dayLabel: Day 61
level: Intermediate
estimatedMinutes: 70
order: 61
track: angular
youtubeVideos: []
---

# Day 61 — Provider Scope and Service Lifetimes

## Goal

Understand that service instances belong to injector scopes and that provider placement affects which instance is resolved.

## Root scope

~~~ts
@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {}
~~~

A root-provided service is available through the root injector and commonly represents application-wide behavior or state.

## Why scope matters

If a service owns signal state, its provider scope determines which consumers share that state.

## Hierarchical DI

~~~text
Application injector
       │
       ├── Feature/component injector
       │       └── Child component injector
       └── Another feature
~~~

Angular resolves dependencies through this hierarchy.

## Choosing scope

Use root scope for application-wide behavior or state. Use a narrower scope when state or behavior belongs only to a feature or component subtree.

A service is not automatically a singleton in every provider configuration.

## Exercise

Create CounterService with a signal. Provide it at a component boundary and compare two component subtrees.

## Interview questions

1. Is every Angular service a singleton?
2. What is hierarchical DI?
3. Why intentionally provide a service at component scope?

## Assignment

Draw the injector hierarchy for an app with root, dashboard, job details, and profile areas. Decide which services should be root-scoped and which should be feature-scoped.

## Outcome

You can reason about service instances instead of assuming every injected service is globally shared.
