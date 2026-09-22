---
id: angular-day-280
title: Mini Project — Enterprise JobHub Micro Frontends
day: 280
module: 24
---

# Day 280 — Mini Project — Enterprise JobHub Micro Frontends

## Goal

Build a JobHub host with Candidate, Recruiter, and Admin remotes. Implement route-based loading, explicit contracts, runtime remote configuration, shared platform capabilities, fallback states, deployment ownership, rollback planning, and performance measurement.

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


## Version-Safe Implementation Rule

Use Angular 21 as the curriculum baseline and select a currently compatible `@angular-architects/native-federation` release before implementation.

Record the exact versions in the project README/package manifest. Do not mix configuration copied from multiple Native Federation major versions.

## Implementation

Create:

- Host
- Candidate remote
- Recruiter remote
- Admin remote

The host owns:

- application shell;
- authentication bootstrap;
- global navigation;
- runtime remote configuration;
- shared platform contracts;
- remote failure UX.

Each remote owns its domain UI and business behavior.

## Acceptance Tests

Verify:

- each remote loads independently;
- a remote can fail without blanking the entire host;
- route contracts remain stable;
- shared Angular dependencies are compatible;
- runtime URLs can change without rebuilding the host;
- authenticated authorization remains backend-controlled;
- remote loading and navigation performance are measured.

## Architecture Review

Document the exact Native Federation package version, Angular version, shared dependencies, exposed contracts, runtime manifest format, deployment strategy, rollback strategy, and known limitations.

The purpose is not merely to make three remotes load. The learner must be able to explain why the boundaries exist and how version changes are managed.
