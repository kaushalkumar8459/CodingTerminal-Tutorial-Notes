# Day 242 — Hydration Constraints and Debugging

## Goal

Diagnose hydration mismatches systematically.

## Core Rule

The server-generated DOM structure must match the client-generated structure. Angular warns that direct DOM manipulation and server/client rendering differences can cause hydration errors. citeturn0search0

Common causes:

- direct DOM APIs;
- invalid HTML;
- browser-only conditions that change markup;
- third-party libraries that manipulate DOM;
- inconsistent whitespace configuration;
- different data during server and client rendering.

## Debugging Workflow

1. Reproduce the mismatch.
2. Identify the component Angular reports.
3. Compare server HTML with client output.
4. Remove browser-only rendering differences.
5. Replace direct DOM manipulation with Angular APIs where possible.
6. Use skip-hydration only when a genuine boundary requires it.

## Exercise

Create a deliberate server/client rendering mismatch in a safe demo component, observe the error, then fix the cause.

## Common Mistakes

- Using skip hydration as the first solution.
- Hiding the mismatch instead of fixing it.
- Assuming every third-party library is hydration-safe.
- Ignoring invalid HTML.

## Interview Questions

1. What causes a hydration mismatch?
2. Why is direct DOM manipulation risky?
3. Why must server and client markup match?
4. When might skip hydration be justified?

## Outcome

You can debug hydration from evidence instead of trial and error.
