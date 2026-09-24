# Day 292 — API, Data Access and Error Boundaries

Harden the API layer with typed contracts, request handling, error mapping and feature-level recovery.

## Goal
Keep HTTP concerns out of presentation components and make failures understandable to users and developers.

## Architecture
- typed request/response contracts
- data-access services
- interceptors where cross-cutting behavior is appropriate
- domain/UI model mapping
- normalized error handling
- loading/empty/error states
- retry only when safe

## Exercise
Trace one Candidate, Recruiter and Admin request from UI action to API and back. Document every boundary.

## Common Mistakes
Catching every error and hiding it; retrying mutations blindly; exposing backend DTO details everywhere.

## Interview Questions
1. Where should API-to-UI mapping happen?
2. Which errors should be retried?
3. What belongs in an HTTP interceptor versus a feature service?

## Outcome
The API architecture is typed, testable and resilient to expected failures.