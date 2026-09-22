# Day 287 — Candidate Experience — Job Details, Saved Jobs and Applications

Complete the Candidate workflow from job details through saving and applying.

## Goal
Connect detail views, user actions, forms and API state without creating hidden coupling.

## Features
- route-based job details
- saved jobs
- application form
- validation and submission states
- success/error feedback
- navigation after actions

## Exercise
Build the complete application journey and test refresh, back-navigation, invalid forms and failed API requests.

## Common Mistakes
Mixing API models directly into every template; losing selected job identity; disabling UX feedback during asynchronous work.

## Interview Questions
1. Where should application state live?
2. How should a failed submission affect form state?
3. How do route parameters and API data work together?

## Outcome
The Candidate experience supports a complete job application journey.