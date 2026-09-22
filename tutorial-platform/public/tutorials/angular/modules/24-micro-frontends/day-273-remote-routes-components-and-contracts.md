---
id: angular-day-273
title: Remote Routes, Components and Contracts
day: 273
module: 24
---

# Day 273 — Remote Routes, Components and Contracts

## Goal

Design small stable contracts using routes, exposed components, typed inputs and outputs, URL state, and explicit interfaces. Avoid exposing remote internals.

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


## Version-Safe Remote Loading

The exact `loadRemoteModule` overloads and generated configuration can vary by Native Federation release. Treat the installed package's TypeScript types and current documentation as the source of truth.

The architectural pattern remains stable:

~~~ts
{
  path: 'candidate',
  loadComponent: () =>
    loadRemoteModule('candidate', './Component')
      .then(m => m.AppComponent),
}
~~~

For a remote-owned route tree, expose a routing contract and lazy-load it from the host. Keep the exposed name stable even if the remote's internal file structure changes.

Do not expose arbitrary internal services, stores, or implementation files merely because federation makes them technically loadable.
