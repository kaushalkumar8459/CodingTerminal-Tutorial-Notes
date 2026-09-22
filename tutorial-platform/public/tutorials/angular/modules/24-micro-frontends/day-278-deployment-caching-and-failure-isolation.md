---
id: angular-day-278
title: Deployment, Caching and Failure Isolation
day: 278
module: 24
---

# Day 278 — Deployment, Caching and Failure Isolation

## Goal

Plan independent remote deployment, asset caching, compatibility, rollback, and failure isolation. Test unavailable remotes, network failures, invalid configuration, and incompatible contracts.

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


## Deployment Contract

Treat each remote as an independently deployable artifact with:

- immutable/versioned assets where practical;
- a compatible remote manifest;
- cache-control appropriate for the asset type;
- rollback to a known-compatible version;
- health/error telemetry;
- a host fallback.

Do not deploy a host that requires a remote version that has already been deleted.

## Failure Scenarios

Test:

- remote URL unavailable;
- remote manifest invalid;
- network timeout;
- remote JavaScript failure;
- incompatible shared dependency;
- incompatible exposed contract.

A micro frontend improves deployment independence only when the contracts and release process support that independence.

## Native Federation Version Note

The generated build/start/deployment artifacts are package-version-specific. Verify the installed Native Federation release's production startup instructions instead of copying an old `server.mjs`, `fstart.mjs`, or manifest workflow blindly.
