# Day 291 — Enterprise State Architecture and Data Flow

Unify local state, feature state, server data, form state and cross-application state using explicit ownership rules.

## Goal
Prevent the capstone from becoming a single global-state application.

## State Rules
- component state for local UI
- feature state for coordinated feature workflows
- SignalStore for meaningful feature complexity
- server state owned by data-access/cache patterns
- forms own editable form state
- URL owns navigational state
- cross-MFE state kept minimal and contractual

## Exercise
Create a state map for Candidate, Recruiter and Admin. For every state item, document owner, source, consumers and update mechanism.

## Common Mistakes
Globalizing everything; duplicating server state; deriving the same state in multiple stores.

## Interview Questions
1. How do you decide where state belongs?
2. What problem does a facade or feature store solve?
3. Why is cross-MFE global state risky?

## Outcome
The capstone has predictable state ownership and data flow.