---
id: angular-day-267
title: Architecture Decision Records Governance and Code Standards
day: 267
module: 23
---

# Day 267 — Architecture Decision Records, Governance and Code Standards

## Goal

Learn how teams preserve architectural decisions over time.

## Architecture Decision Record

An ADR should capture:

1. Context
2. Decision
3. Alternatives considered
4. Consequences

Example:

~~~text
ADR-001
Decision: Feature-first application organization

Context:
The application contains several independent business domains.

Decision:
Organize code around business features.

Alternatives:
Technical-type folders.

Consequence:
Feature ownership becomes clearer, but shared contracts need deliberate design.
~~~

## Governance

Enterprise governance can include:

- coding standards
- linting
- formatting
- dependency rules
- pull-request checks
- test expectations
- security checks
- accessibility requirements
- release policies

Governance should reduce accidental inconsistency without preventing reasonable engineering decisions.

## Exercise

Create three ADRs for JobHub:

- feature-first organization
- state ownership strategy
- API/data-access boundary

For each, document one rejected alternative and one consequence.

## Common mistakes

- Writing ADRs after the decision has been forgotten.
- Documenting implementation trivia instead of architectural decisions.
- Creating rules nobody can explain.
- Using governance as a substitute for engineering judgment.

## Outcome

You can make architecture decisions explicit, reviewable, and maintainable.
