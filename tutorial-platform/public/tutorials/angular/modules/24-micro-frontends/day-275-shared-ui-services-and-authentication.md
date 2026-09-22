---
id: angular-day-275
title: Shared UI, Services and Authentication
day: 275
module: 24
---

# Day 275 — Shared UI, Services and Authentication

## Goal

Design shared platform capabilities such as design-system UI, authentication contracts, permission contracts, telemetry, notifications, and configuration while avoiding shared business-state coupling.

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


## Shared Platform Boundary

Prefer sharing **contracts and platform capabilities** over sharing mutable business state.

Good candidates:

- design-system components;
- authentication/session contract;
- permission contract;
- telemetry;
- notifications;
- runtime configuration.

Avoid creating a global "everything service" consumed by every remote.

Authentication is also not a security boundary. A remote must not rely only on host-provided UI state for authorization. Backend authorization remains authoritative.

## Version Note

If the host and remote share Angular services or libraries, verify that the installed Native Federation version supports the intended sharing model and that the shared packages are compatible. Do not assume an example from an older major release remains configuration-compatible.
