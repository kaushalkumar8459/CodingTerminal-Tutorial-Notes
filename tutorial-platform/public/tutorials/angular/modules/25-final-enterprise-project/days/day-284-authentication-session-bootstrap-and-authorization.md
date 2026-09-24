# Day 284 — Authentication, Session Bootstrap and Authorization

Integrate authentication bootstrap, session state and permission-aware application behavior.

## Goal
Make protected application experiences work consistently across the host and feature applications.

## Architecture
- session bootstrap
- authentication state
- route protection
- role and permission checks
- authenticated API requests
- session-expiry handling
- backend authorization as the final authority

## Exercise
Implement a login/session flow using a contract or mock API, then protect Candidate, Recruiter and Admin capabilities with explicit permissions.

## Common Mistakes
Relying only on frontend authorization; storing secrets in browser configuration; scattering token logic across components.

## Interview Questions
1. What is the difference between authentication and authorization?
2. Why can frontend guards never replace backend authorization?
3. Where should authentication behavior be centralized?

## Outcome
The application has a coherent authentication and authorization boundary.