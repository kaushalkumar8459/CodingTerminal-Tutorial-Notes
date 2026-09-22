# Day 223 — Test Quality, Coverage, Debugging and CI

## Learning Goal
Make the test suite maintainable and useful in development and CI.

## Quality Rules
A good test is deterministic, focused, readable, fast enough for normal development, and meaningful when it fails.

## Coverage
Coverage is a signal, not the definition of quality. Prioritize business-critical behavior, failure paths, security-sensitive flows and regression-prone features.

## Debugging Workflow
1. Read the failure.
2. Identify whether setup, action or assertion failed.
3. Reproduce the smallest case.
4. Inspect state or rendered DOM.
5. Check async completion and cleanup.
6. Fix the product or test based on evidence.

## Flaky Test Causes
- arbitrary timeouts
- shared mutable state
- real network calls
- order dependence
- incomplete async cleanup
- random dates/data
- unstable selectors

## Regression Test
If JobHub incorrectly displays Saved after a failed API request:
1. reproduce the bug
2. write a failing test
3. fix the implementation
4. keep the test

## CI Shape

~~~text
install
→ lint/typecheck
→ unit tests
→ coverage/report
→ build
~~~

Use the repository's actual scripts rather than inventing commands.

## Exercise
Introduce the failed-save bug and create the regression test before fixing it.

## Interview Questions
1. Is 100% coverage required?
2. What makes a test flaky?
3. How should CI use tests?
4. How would you investigate an intermittent failure?

## Expected Outcome
You can judge test quality, debug failures and integrate testing into a CI workflow.
