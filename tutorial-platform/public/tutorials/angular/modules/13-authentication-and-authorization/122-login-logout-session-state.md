# Day 122 — Login, Logout and Session State

## Goal
Login, Logout and Session State

## Concept
Model authentication as explicit state instead of a boolean. Useful states are checking, authenticated and unauthenticated. On application startup, restore or check the session before deciding that the user is logged out. Login establishes the session and updates auth state. Logout invalidates the session when required, clears authentication state and sensitive feature state, then navigates to a public page.

## Practical Exercise
JobHub exercise: implement an AuthService with signal-based status and current user state. Do not store passwords.

## Common Mistakes
Common mistakes: showing logged-out UI while session restoration is still running; leaving private data in feature state after logout; assuming logout means only clearing browser storage.

## Interview Questions
Interview: A checking state prevents incorrect UI while session restoration is in progress.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.