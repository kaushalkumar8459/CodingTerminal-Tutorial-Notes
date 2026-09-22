# Day 296 — Accessibility, Security and UX Hardening

Perform the final quality pass across accessibility, security and failure-oriented user experience.

## Goal
Treat non-functional requirements as part of feature completion.

## Checklist
- semantic HTML and keyboard navigation
- focus management
- accessible names and states
- responsive layouts
- XSS-safe rendering
- secure authentication/session behavior
- CSP/Trusted Types where deployment supports them
- safe handling of sensitive data
- unauthorized and expired-session UX
- loading, empty, error and offline-aware states where appropriate

## Exercise
Audit one complete workflow with keyboard-only navigation and a security review checklist. Fix issues at the architecture level when possible.

## Common Mistakes
Using ARIA to compensate for incorrect HTML; trusting client-side authorization; logging tokens or personal data; ignoring error states.

## Interview Questions
1. What is progressive enhancement for accessibility?
2. Why is security a system concern rather than a component concern?
3. How should sensitive data be treated in frontend logs?

## Outcome
The capstone is more usable, secure and resilient.