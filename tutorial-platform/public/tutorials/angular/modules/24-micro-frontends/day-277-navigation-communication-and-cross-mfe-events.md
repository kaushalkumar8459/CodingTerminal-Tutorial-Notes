---
id: angular-day-277
title: Navigation, Communication and Cross-MFE Events
day: 277
module: 24
---

# Day 277 — Navigation, Communication and Cross-MFE Events

## Goal

Use the smallest communication mechanism that works: URL state, direct inputs and outputs, typed contracts, explicit events, and shared state only when ownership is truly cross-application.

## Concepts

- Identify the architectural boundary before selecting federation tooling.
- Keep contracts small, typed, and intentionally versioned.
- Keep business ownership inside the remote that owns the capability.
- Share platform capabilities deliberately rather than sharing all implementation details.
- Treat runtime configuration, deployment, observability, rollback, security, and performance as part of the architecture.

## JobHub Exercise

Apply today's concept to JobHub. Document the host/remote boundary, dependency direction, communication contract, failure behavior, and major trade-offs.

## Common Mistakes

- Introducing MFE only because an application is large.
- Sharing every dependency or service.
- Letting remotes import each other's internals.
- Treating the remote boundary as a security boundary.
- Ignoring deployment, caching, rollback, or performance.


## Communication Hierarchy

Use the smallest contract that solves the problem:

1. URL/path/query parameters for navigable state;
2. component inputs/outputs when the relationship is direct;
3. typed custom events for explicit cross-MFE notifications;
4. shared platform services for truly cross-application concerns;
5. shared state only when ownership is genuinely application-wide.

Avoid making every remote subscribe to every other remote.

## Version Note

Native Federation does not remove Angular routing or browser communication rules. The exact helper APIs for loading a remote can change between package releases; keep communication contracts independent from those implementation details.
