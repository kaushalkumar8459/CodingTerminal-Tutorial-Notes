# Day 224 — Mini Project: JobHub Test Suite

## Project Goal
Build a focused test suite for the JobHub application from Days 130–145.

This is a behavior and regression exercise, not a coverage contest.

## Test Scope

### Pure Logic
Test salary filtering, sorting and status rules with plain Vitest where Angular is unnecessary.

### Services
Test saved-job rules, profile business rules and dependency injection with TestBed when DI matters.

### Components
Test loading, empty, error and success UI; user actions; signal rendering; and form validation.

### Component Contracts
Test input(), output(), model() where used, and content projection.

### HTTP
Use provideHttpClientTesting() and HttpTestingController. Test success, empty response and server failure.

### Routing
Use RouterTestingHarness. Test job details, route parameters, recruiter protection, login redirect and query parameters.

### Reusable UI
Test directives, pipes and shared components at the smallest useful level. Use component harnesses when a supported harness exists.

### SignalStore
If JobHub uses SignalStore, test public state, methods, derived state and async success/error state. Do not test private implementation details.

## Test Matrix

| Area | Behavior |
|---|---|
| Search | keyword and location return matching jobs |
| Saved jobs | duplicate save is ignored |
| Details | route ID loads the correct job |
| Auth | unauthenticated recruiter is redirected |
| Form | invalid application cannot submit |
| HTTP | server failure produces error UI |
| Shared UI | Save button emits the expected action |
| State | loading → success is represented correctly |

## Capstone Flow
Pick one feature and test:

**user action → component state → service/store → HTTP boundary → response → rendered UI**

Keep the suite deterministic. Do not call real external services.

## Final Challenge
Add a regression test for a bug you intentionally introduce, then fix the bug without weakening the test.

## Interview Questions
1. Where would you mock in a feature using signals, SignalStore, HttpClient and routing?
2. Where would you keep real Angular wiring?
3. How would you investigate a flaky JobHub test?
4. Which tests would you keep if CI became too slow?

## Expected Outcome
By Day 224, you can build and maintain Angular tests with Vitest, TestBed, HTTP testing, RouterTestingHarness, component interaction tests, reactive-state tests and reusable-component tests.
