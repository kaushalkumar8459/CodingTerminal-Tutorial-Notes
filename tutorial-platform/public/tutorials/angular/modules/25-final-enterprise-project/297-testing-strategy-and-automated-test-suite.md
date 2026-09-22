# Day 297 — Testing Strategy and Automated Test Suite

Create a layered automated test suite for the final JobHub application.

## Goal
Verify business behavior and integration boundaries without making tests brittle.

## Coverage
- services and data-access
- components and user interaction
- forms and validation
- signals and feature state
- HTTP requests
- routing and guards
- shared UI contracts
- MFE integration boundaries where practical

## Exercise
Write tests around critical Candidate application, Recruiter publishing and Admin permission workflows. Run the suite in CI mode.

## Common Mistakes
Testing implementation details; snapshot-heavy tests with little behavior coverage; mocking everything; ignoring failed requests.

## Interview Questions
1. What should a frontend test prove?
2. When should you use TestBed?
3. How do you test HttpClient without calling a real backend?

## Outcome
Critical JobHub workflows are protected by a maintainable Vitest suite.