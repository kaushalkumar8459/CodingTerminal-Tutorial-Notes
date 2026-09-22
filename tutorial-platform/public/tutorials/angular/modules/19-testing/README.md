---
id: "angular-module-19"
title: "Testing"
slug: "testing"
level: "Intermediate"
order: 19
track: "angular"
---

# Module 19 — Testing

**Days 213–224**

Angular's current testing setup uses Vitest for new CLI projects, with jsdom providing a DOM environment by default. Angular also provides dedicated utilities for components, services, HTTP, and routing.

## Learning Principles

- Test behavior and contracts, not implementation details.
- Keep each test focused and deterministic.
- Prefer real Angular wiring when it is cheap and meaningful.
- Mock external boundaries, not every object.
- Test components through their rendered DOM and public interactions.
- Use HTTP and routing test utilities instead of real network requests or uncontrolled navigation.
- Treat coverage as a signal, not the goal itself.
- Run the suite in CI on every change.

## Day Sequence

| 213 | Why Angular Testing, Vitest and Test Strategy |
| 214 | TestBed and Angular Testing Utilities |
| 215 | Service Testing and Dependency Mocking |
| 216 | Component Testing Basics |
| 217 | Component DOM and User Interaction Testing |
| 218 | Testing Inputs, Outputs and Content |
| 219 | Testing Signals, Forms and Async State |
| 220 | HTTP Testing and API Services |
| 221 | Routing, Guards and Navigation Testing |
| 222 | Directives, Pipes and Shared UI Testing |
| 223 | Test Quality, Coverage, Debugging and CI |
| 224 | Mini Project — JobHub Test Suite |

## Core Tools

- Vitest
- TestBed
- ComponentFixture
- HttpTestingController
- RouterTestingHarness
- Angular testing utilities
- Browser-based testing when real browser behavior matters

## Outcome

By Day 224, learners can design, implement, debug, and maintain a practical Angular test suite covering services, components, signals, forms, HTTP, routing, guards, directives, pipes, and shared UI.
