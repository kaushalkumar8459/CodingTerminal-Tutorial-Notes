---
id: angular-module-24
title: Micro Frontends
slug: micro-frontends
level: Advanced
order: 24
track: angular
---

# Module 24 — Micro Frontends

**Days:** 269–280  
**Prerequisites:** Days 1–268

## Goal

Learn how to split a large Angular platform into independently owned and deployable frontend applications without creating unnecessary runtime or architectural complexity.

## Learning sequence

269. Why Micro Frontends?
270. Micro Frontend Architecture and When to Use It
271. Host, Remote and Application Boundaries
272. Angular Native Federation Fundamentals
273. Remote Routes, Components and Contracts
274. Shared Dependencies and Version Strategy
275. Shared UI, Services and Authentication
276. Runtime Configuration and Environment-Aware Remote Loading
277. Navigation, Communication and Cross-MFE Events
278. Deployment, Caching and Failure Isolation
279. Micro Frontend Performance, Security and Governance
280. Mini Project — Enterprise JobHub Micro Frontends

## Principles

- Micro frontends solve organizational and deployment problems, not merely code-size problems.
- Start with clear domain boundaries before introducing runtime composition.
- Keep host responsibilities small and explicit.
- Treat remotes as independently owned feature applications.
- Minimize cross-MFE communication.
- Share only dependencies and contracts that genuinely need to be shared.
- Avoid creating a distributed monolith.
- Design failure states because a remote can fail independently.
- Treat runtime configuration and remote URLs as deployment concerns.
- Do not expose secrets in browser configuration.
- Measure startup, navigation, bundle, and remote-loading performance.
- Keep authentication and authorization authoritative on the backend.

## Capstone

Split JobHub into independently owned Candidate, Recruiter, and Admin frontends composed by a lightweight host application.
