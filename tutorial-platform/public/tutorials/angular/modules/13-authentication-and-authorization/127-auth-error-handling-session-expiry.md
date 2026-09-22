# Day 127 — Authentication Errors and Session Expiry

## Goal
Authentication Errors and Session Expiry

## Concept
Treat authentication failures according to their meaning. A 401 commonly indicates missing or invalid authentication. A 403 means the authenticated principal is not permitted to perform the operation. Network and server errors need different UX. Centralized 401 handling must avoid redirect loops and accidental retries.

## Practical Exercise
JobHub exercise: design UX for an expired session, a recruiter attempting an admin operation, and an unavailable login server.

## Common Mistakes
Common mistakes: treating 401 and 403 identically; infinite refresh loops; clearing all application data on every error; exposing sensitive server details.

## Interview Questions
Interview: 401 and 403 represent different states: authentication is missing/invalid versus the authenticated request being forbidden.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.