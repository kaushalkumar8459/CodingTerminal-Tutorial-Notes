---
id: "angular-day-164"
title: "Type-Safe Architecture Patterns"
slug: "day-164-type-safe-architecture-patterns"
dayLabel: "Day 164"
level: Advanced
estimatedMinutes: 120
order: 164
track: angular
youtubeVideos: []
---
# Day 164 — Type-Safe Architecture Patterns

## Goal
Combine advanced TypeScript features into maintainable Angular architecture.

## Pattern 1 — Result Types
~~~ts
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
~~~

## Pattern 2 — Typed Repository
~~~ts
interface Repository<T extends { id: number }> {
  getById(id: number): T | undefined;
  save(value: T): void;
}
~~~

## Pattern 3 — Finite UI State
~~~ts
type ViewState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty' }
  | { status: 'error'; message: string };
~~~

## Architecture Rules
- Define domain types near their feature boundary.
- Keep API DTOs explicit.
- Derive variants with utility types where appropriate.
- Prefer discriminated unions for finite states.
- Keep generic abstractions small and understandable.
- Validate unknown runtime data before treating it as a domain model.

## Exercise
Refactor a small Angular job feature into typed models, repository contracts, request models, result types, and UI state.

## Common Mistakes
- Over-engineering generic abstractions.
- Creating types that mirror implementation instead of domain behavior.
- Using type assertions to hide architectural problems.

## Interview Questions
1. How do you design type-safe API boundaries?
2. When should you use a discriminated union?
3. How do you prevent `any` from spreading through a codebase?

## Outcome
You can use TypeScript as an architectural tool, not just an annotation language.
