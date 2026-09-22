---
id: angular-day-274
title: Shared Dependencies and Version Strategy
day: 274
module: 24
---

# Day 274 — Shared Dependencies and Version Strategy

## Goal

Understand dependency-sharing trade-offs, singleton behavior, version compatibility, upgrade frequency, and public platform contracts. Create a JobHub dependency-sharing matrix.

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


## Native Federation Dependency Sharing

Shared dependencies are a runtime compatibility decision, not simply a bundle-size optimization.

For Angular applications, commonly shared platform dependencies may include Angular packages and other libraries that must behave as singletons. The exact configuration syntax is package-version-specific.

A useful policy is:

1. share only dependencies that benefit from sharing;
2. keep Angular package versions compatible across host/remotes;
3. test singleton behavior for libraries that maintain registries or global state;
4. avoid sharing feature-specific business libraries unless there is a deliberate contract;
5. review dependency upgrades as a platform change.

Do not blindly use `shareAll()` forever. It can be convenient for learning, but production architectures should understand what is actually being shared.

## Angular 21 Rule

Do not assume an older `strictVersion`, `requiredVersion`, or sharing option has identical behavior in every Native Federation release. Verify the generated configuration and package documentation for the installed version.
