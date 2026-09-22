---
id="angular-module-17"
title="State Management"
slug="state-management"
level=Advanced
order=17
track=angular
---

# Module 17 - State Management

## Purpose
Learn how Angular application state grows from local component state into feature and application state.

The module starts with state ownership and service-based patterns, then introduces SignalStore only when shared feature state becomes complex enough to justify a dedicated state abstraction.

## Sequence
186. State Management Problems and State Ownership
187. Local State vs Shared State
188. Service-Based State with Signals
189. State Modeling and Immutable Updates
190. Derived State and Selectors
191. Async State and Request Lifecycles
192. Feature State and Facade Patterns
193. SignalStore Fundamentals
194. SignalStore State, Computed and Methods
195. SignalStore with Services and DI
196. SignalStore for Collections and Entity-Like State
197. SignalStore Async Workflows
198. Cross-Feature State and Boundaries
199. State Management Anti-Patterns and Performance
200. Mini Project - JobHub State Management

## Learning Rules
- State ownership comes before state libraries.
- Keep local UI state local.
- Use services with signals for small shared state.
- Introduce SignalStore only when feature state has enough complexity to justify it.
- Keep API/data-access responsibilities separate from state orchestration.
- Keep server state, client state, form state, and transient UI state conceptually distinct.
- Prefer immutable updates and explicit state transitions.
- Do not turn every value into global state.

## Important Angular Version Note
This curriculum targets modern Angular 21+ and uses signal-based state patterns. SignalStore is taught as an ecosystem state-management tool after learners understand Angular signals and RxJS. APIs should be checked against the version used by the learner's project.

## Final Project
**JobHub State Management** - refactor the existing JobHub application into clear local, feature, shared, and application-level state boundaries.

## Dependency Boundary
Previous: RxJS Deep Dive (Days 166-185)

Current: State Management (Days 186-200)

Next: CDK, Material and Accessibility (Days 201-212)

## Outcome
By Day 200, learners can decide where state belongs, model it clearly, build signal-based services, use SignalStore for complex feature state, and avoid unnecessary global state.
