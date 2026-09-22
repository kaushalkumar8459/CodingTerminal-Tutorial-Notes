---
title: Services & Dependency Injection
slug: services-and-dependency-injection
level: Beginner
order: 8
track: angular
---

# Module 8 — Services & Dependency Injection

## Goal

Learn how Angular moves shared business logic out of components and provides reusable dependencies through Dependency Injection (DI).

## Days

- Day 58 — Why Services & Dependency Injection?
- Day 59 — Creating Services with @Injectable
- Day 60 — inject() and Dependency Injection
- Day 61 — Provider Scope and Service Lifetimes
- Day 62 — Component and Route-Level Providers
- Day 63 — Service-Owned Signal State
- Day 64 — InjectionToken and Configuration
- Day 65 — Provider Recipes
- Day 66 — Service Responsibilities and Facade Design
- Day 67 — Feature Service Architecture
- Day 68 — Mini Project: Job Management Service Layer

## Dependency flow

Components → shared logic problem → services → DI → provider scope → service state → configuration tokens → provider recipes → service boundaries → feature architecture → project.

## Intentionally deferred

HTTP, RxJS, authentication, external state libraries, and testing are introduced later. This module uses local/mock data so learners understand services and DI first.

## Outcome

By the end, learners can create focused services, inject them with modern APIs, choose provider scopes intentionally, keep shared feature state in signals, use injection tokens, and build a clean service layer.
