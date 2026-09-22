# Day 120 — Why Authentication & Authorization?

## Goal
Why Authentication & Authorization?

## Concept
Authentication answers “Who are you?” Authorization answers “What are you allowed to do?”. JobHub has candidates, recruiters and admins, so identity and permissions must be separate. A route guard improves navigation UX but is not a security boundary. The backend must enforce authorization for every protected operation.

## Practical Exercise
JobHub exercise: list which screens require authentication, recruiter access, or admin access. Then identify which checks must happen on the backend.

## Common Mistakes
Common mistakes: treating hidden buttons as security; putting secrets in frontend code; assuming guards protect APIs.

## Interview Questions
Interview: Authentication verifies identity. Authorization determines allowed actions. Angular guards control client navigation; backend authorization remains authoritative.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.