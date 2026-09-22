---
id: angular-day-269
title: Why Micro Frontends?
day: 269
module: 24
---

# Day 269 — Why Micro Frontends?

## Goal

Understand the organizational, domain, and deployment problems MFE can solve. Compare MFE with normal feature-based Angular architecture and identify when a modular monolith is sufficient.

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

## Interview Questions

1. Why would you choose micro frontends instead of a modular monolith?
2. What belongs in a host versus a remote?
3. How should cross-MFE communication be designed?
4. What are the major performance and deployment risks?

## Outcome

You can explain Why Micro Frontends? using explicit ownership, contracts, trade-offs, and production considerations.
