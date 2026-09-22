# Day 125 — Authentication Interceptors and Token Flow

## Goal
Authentication Interceptors and Token Flow

## Concept
Authenticated HTTP requests commonly flow from component → API service → HttpClient → authentication interceptor → backend. A functional interceptor can add an Authorization header when the backend uses bearer tokens. Cookie-based sessions may use a different mechanism. Credentials should only be sent where appropriate and must never be logged.

## Practical Exercise
JobHub exercise: design an interceptor that attaches credentials only to the configured API origin and leaves public requests unchanged.

## Common Mistakes
Common mistakes: attaching credentials to every URL; logging authorization headers; creating recursive token-refresh requests.

## Interview Questions
Interview: Interceptors centralize cross-cutting request behavior instead of repeating it in every API service.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.