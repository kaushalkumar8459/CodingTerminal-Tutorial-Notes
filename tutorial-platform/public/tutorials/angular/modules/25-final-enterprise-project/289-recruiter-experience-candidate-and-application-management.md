# Day 289 — Recruiter Experience — Candidate and Application Management

Build recruiter workflows for reviewing applications and candidate progress.

## Goal
Handle richer collections, filters, details and state transitions without creating feature-wide global state unnecessarily.

## Features
- application list
- candidate details
- status transitions
- filtering and sorting
- notes or review metadata
- permission-aware actions

## Exercise
Implement a recruiter application workspace and model its state ownership explicitly before choosing SignalStore state.

## Common Mistakes
Putting every table interaction into global state; coupling candidate screens to recruiter list internals; missing failure recovery.

## Interview Questions
1. Which state is transient and which is shared?
2. How would you model status transitions safely?
3. How do you keep a feature testable?

## Outcome
Recruiters can review and manage candidate applications with clear state boundaries.