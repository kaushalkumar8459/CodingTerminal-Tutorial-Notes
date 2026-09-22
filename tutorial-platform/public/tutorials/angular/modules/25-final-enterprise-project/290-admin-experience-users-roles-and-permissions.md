# Day 290 — Admin Experience — Users, Roles and Permissions

Build the Admin workspace for users, roles and permission management.

## Goal
Demonstrate enterprise authorization concepts through a realistic administration feature.

## Features
- user list and search
- role assignment
- permission display
- guarded administrative actions
- confirmation and error states
- audit-oriented UI boundaries

## Exercise
Create an Admin feature with explicit permission checks and API contracts. Treat the server as authoritative for every protected mutation.

## Common Mistakes
Hiding a button and assuming that is security; allowing arbitrary role values; sharing admin business logic with unrelated features.

## Interview Questions
1. What is RBAC?
2. Why are permissions more granular than roles?
3. How should unauthorized API responses be handled?

## Outcome
The project contains a realistic permission-aware Admin workspace.