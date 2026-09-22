# Day 129 — Mini Project — Authenticated Job Portal

## Goal
Mini Project — Authenticated Job Portal

## Concept
Build a small JobHub authentication foundation. Public pages include Home and Login. Candidate features include job search, details, saved jobs and apply. Recruiter features include job management and application review. Admin features include user management. Use AuthService for session state, an auth guard for navigation, permission checks for UI capabilities, an HTTP interceptor for authenticated requests, feature services for business APIs, and backend authorization as the final security boundary.

## Practical Exercise
Acceptance checklist: session bootstrap has a checking state; protected routes redirect; role-aware navigation works; UI permission checks do not replace backend authorization; logout clears authentication and sensitive state; 401 and 403 differ; credentials are not logged; authentication logic is not duplicated.

## Common Mistakes
Interview challenge: explain why each responsibility belongs in AuthService, guard, interceptor, feature service and backend. Then explain what an attacker could still do after modifying the Angular application in the browser.

## Interview Questions
Outcome: a complete authentication and authorization foundation ready for the larger JobHub project.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.