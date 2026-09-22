# Day 286 — Candidate Experience — Job Search and Discovery

Build the Candidate job discovery workflow with filtering, sorting, pagination and responsive UI states.

## Goal
Create a realistic job-search experience using the project's data-access and state patterns.

## Features
- search by keyword/location
- filters and sorting
- loading, empty and error states
- pagination or incremental loading
- typed API models
- URL query state where useful

## Exercise
Implement the workflow from route entry to API request to rendered results. Keep server data, UI state and form state clearly separated.

## Common Mistakes
Triggering requests directly from many components; losing filter state during navigation; rendering large lists without tracking strategy.

## Interview Questions
1. Which state belongs in the URL?
2. When would RxJS be useful in search interactions?
3. How would you prevent unnecessary API requests?

## Outcome
Candidates can efficiently search and discover jobs through a production-style workflow.