---
id: angular-day-272
title: Angular Native Federation Fundamentals
day: 272
module: 24
---

# Day 272 — Angular Native Federation Fundamentals

## Goal

Learn host, remote, exposed capability, remote entry, shared dependency, and federation configuration concepts. Build a small host plus Candidate remote proof of concept.

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


## Angular 21 + Native Federation Version Note

Native Federation is provided by the third-party `@angular-architects/native-federation` package; it is not an Angular framework API. Pin and test a package version compatible with the Angular version used by the workspace rather than copying an unpinned command from an old tutorial.

For this curriculum, Angular 21 is the baseline. Verify the package's current compatibility matrix/release notes before installing.

A typical Angular setup uses the package's schematic, for example:

~~~bash
ng add @angular-architects/native-federation --project shell --type dynamic-host
~~~

and a remote:

~~~bash
ng add @angular-architects/native-federation --project candidate --type remote
~~~

The exact generated configuration belongs to the installed package version. Teach the architecture first; do not assume every generated filename or option is permanent.

Native Federation uses browser-native ES modules/import maps and integrates with Angular's CLI/build tooling. It is distinct from webpack Module Federation, although the architectural mental model is similar.

## Version-Safe Rule

Always verify:

- Angular version;
- Native Federation package version;
- Node version;
- generated CLI/build configuration;
- shared dependency compatibility.

Do not copy configuration from a Native Federation article written for another major version without checking its release documentation.
