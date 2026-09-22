# Day 298 — CI/CD, Deployment and Release Strategy

Prepare the enterprise project for automated validation and independent deployment.

## Goal
Make every application buildable, testable and releasable through a repeatable pipeline.

## Pipeline
- dependency installation
- lint/static checks
- unit tests
- production builds
- artifact creation
- security/dependency checks
- environment configuration
- deployment
- smoke verification
- rollback strategy

## MFE Release Concerns
Remotes should be deployable independently, while the host must remain compatible with published remote contracts.

## Exercise
Define a release pipeline for host and each remote and document how a failed remote release is rolled back.

## Common Mistakes
Coupling all deployments into one release; publishing untested remote contracts; storing secrets in repository configuration.

## Interview Questions
1. What makes an MFE deployment independent?
2. How do you handle incompatible remote contracts?
3. What should happen when production deployment succeeds but a remote is unhealthy?

## Outcome
JobHub has a documented, repeatable CI/CD and release strategy.