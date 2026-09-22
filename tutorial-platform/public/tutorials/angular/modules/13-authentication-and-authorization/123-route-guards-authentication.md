# Day 123 — Route Guards for Authentication

## Goal
Route Guards for Authentication

## Concept
Use Angular route guards to control access to protected navigation. A functional guard can inject AuthService and Router and return true for an authenticated user or a UrlTree redirecting to login. Guards are client-side navigation control only. A user can still call APIs directly, so the server must validate authentication and authorization.

## Practical Exercise
JobHub exercise: protect candidate, recruiter and admin routes and test direct navigation while unauthenticated.

## Common Mistakes
Common mistakes: treating guards as security; putting expensive API calls into guards; creating one giant guard for every business rule.

## Interview Questions
Interview: A guard cannot prevent direct API access. It controls Angular navigation.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.