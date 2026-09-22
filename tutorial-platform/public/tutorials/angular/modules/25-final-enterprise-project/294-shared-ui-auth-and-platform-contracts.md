# Day 294 — Shared UI, Auth and Platform Contracts

Stabilize the contracts used by the host and remotes for UI, authentication and platform capabilities.

## Goal
Share only capabilities that genuinely need consistency across applications.

## Shared Capabilities
- design-system components
- session/auth contract
- notifications
- configuration access
- navigation primitives
- telemetry hooks

## Exercise
Review every shared dependency and classify it as platform capability, business capability or feature implementation. Move business logic out of shared platform code.

## Common Mistakes
Creating a shared business store; exposing private component APIs; versioning shared packages without a compatibility plan.

## Interview Questions
1. What should never become a shared MFE dependency?
2. How do shared contracts affect independent deployment?
3. How can shared platform code remain backward compatible?

## Outcome
Host/remotes share a small, intentional platform contract.