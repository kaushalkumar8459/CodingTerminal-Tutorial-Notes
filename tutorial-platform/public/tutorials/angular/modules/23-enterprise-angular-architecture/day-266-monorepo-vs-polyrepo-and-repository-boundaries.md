---
id: angular-day-266
title: Monorepo vs Polyrepo and Repository Boundaries
day: 266
module: 23
---

# Day 266 — Monorepo vs Polyrepo and Repository Boundaries

## Goal

Understand repository boundaries as an organizational and technical decision.

## Monorepo

Multiple applications and libraries live in one repository.

Potential benefits:

- easier coordinated changes
- shared tooling
- centralized dependency management
- easier cross-project refactoring

Potential costs:

- larger repository
- tooling complexity
- broader CI considerations
- coordination around shared dependencies

## Polyrepo

Applications or services are maintained in separate repositories.

Potential benefits:

- stronger repository ownership
- independent release pipelines
- isolated dependency lifecycles

Potential costs:

- duplicated tooling
- cross-repository coordination
- versioned shared packages
- more release management

## Decision criteria

Ask:

1. Do teams release independently?
2. How often do projects change together?
3. Who owns shared libraries?
4. How tightly coupled are deployments?
5. How large is the organization?
6. What CI/CD boundaries already exist?

There is no universal winner.

## Exercise

Compare two JobHub setups: one repository versus candidate/recruiter/admin in separate repositories. Write three benefits and three costs for each.

## Outcome

You can explain monorepo and polyrepo trade-offs without treating either as a universal rule.
