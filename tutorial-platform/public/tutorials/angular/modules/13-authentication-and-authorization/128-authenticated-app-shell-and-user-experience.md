# Day 128 — Authenticated App Shell and User Experience

## Goal
Authenticated App Shell and User Experience

## Concept
An authenticated shell should react to explicit session states: checking, authenticated or unauthenticated. Centralize session-aware layout instead of repeating authentication logic in every page. Preserve intended destinations after login, show appropriate navigation, provide logout, and handle expiry cleanly.

## Practical Exercise
JobHub exercise: design public, candidate, recruiter and admin navigation while keeping navigation visibility separate from backend authorization.

## Common Mistakes
Common mistakes: authentication flicker during bootstrap; duplicating role checks; hiding navigation without protecting routes and APIs; losing the intended destination.

## Interview Questions
Interview: A centralized authenticated shell provides one place for session-aware layout and reduces duplicated auth decisions.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.