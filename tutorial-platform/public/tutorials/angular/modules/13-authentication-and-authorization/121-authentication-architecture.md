# Day 121 — Authentication Architecture

## Goal
Authentication Architecture

## Concept
Design authentication before building the login component. A clean flow is Login UI → Auth API → session/token establishment → auth state → authenticated shell → API requests. The login component owns UI concerns; an AuthService owns authentication operations; auth state represents session status; interceptors handle cross-cutting HTTP behavior; guards protect navigation.

## Practical Exercise
JobHub exercise: draw the flow from /login to /jobs to /admin and identify where identity, navigation protection and API authorization happen.

## Common Mistakes
Common mistakes: putting all auth logic in the login component; making every feature know token details; treating a browser role as proof of permission.

## Interview Questions
Interview: Authentication infrastructure should be separated from feature services because identity/session handling is a cross-cutting platform concern.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.