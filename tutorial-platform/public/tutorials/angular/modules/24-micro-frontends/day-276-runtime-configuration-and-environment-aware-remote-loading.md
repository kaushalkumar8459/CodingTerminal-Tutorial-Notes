---
id: angular-day-276
title: Runtime Configuration and Environment-Aware Remote Loading
day: 276
module: 24
---

# Day 276 — Runtime Configuration and Environment-Aware Remote Loading

## Goal

Separate build-time and runtime deployment configuration. Design environment-aware remote URLs and remote-unavailable fallback behavior. Browser configuration is not a secret store.

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


## Runtime Manifest Pattern

A dynamic host can keep remote locations in runtime configuration so the same build can be promoted across environments.

Conceptually:

~~~json
{
  "candidate": "https://example.com/candidate/remoteEntry.json",
  "recruiter": "https://example.com/recruiter/remoteEntry.json"
}
~~~

The exact manifest filename and loading API depend on the installed Native Federation release.

Treat this configuration as public browser configuration. Remote URLs are **not secrets**.

Validate remote configuration before loading it and define a user-visible fallback when a remote is unavailable.

## Angular 21 / Package-Version Rule

Do not hard-code a Native Federation configuration format from a different major version. Generate or inspect the configuration for the installed package, then adapt the runtime configuration to that generated contract.
