# Day 124 — Role and Permission-Based Access

## Goal
Role and Permission-Based Access

## Concept
Roles group responsibilities such as candidate, recruiter and admin. Permissions describe concrete capabilities such as jobs.read, jobs.create, jobs.edit and users.manage. Permission checks can control UI availability, but the backend must independently verify permission.

## Practical Exercise
JobHub exercise: map candidate, recruiter and admin roles to concrete permissions and use those permissions for UI capability checks.

## Common Mistakes
Common mistakes: checking roles everywhere; trusting browser-supplied permissions; hiding an action and assuming it is protected.

## Interview Questions
Interview: Roles are coarse groupings; permissions provide finer-grained capability checks.

## Outcome
You can apply this concept in a realistic Angular application without confusing client-side UX with backend security.