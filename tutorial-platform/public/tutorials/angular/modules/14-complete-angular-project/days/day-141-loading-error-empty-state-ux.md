---
id="angular-day-141"
title="Loading, Error and Empty-State UX"
slug="day-141-loading-error-empty-state-ux"
dayLabel="Day 141"
level=Advanced
estimatedMinutes=75
order=141
track=angular
youtubeVideos=[]
---
# Day 141 — Loading, Error and Empty-State UX

## Goal
Make every major JobHub workflow resilient to asynchronous conditions.

## Audit
Every API-backed screen should answer:
- What does the user see before data arrives?
- What does the user see while loading?
- What happens when there are no records?
- What happens when the server fails?
- Can the user retry?
- What happens during mutation?

## Reusable Components
Use shared LoadingState, EmptyState, ErrorState, and confirmation components where appropriate.

## Exercise
Perform a complete UX audit of Jobs, Profile, Applications, and Admin.

## Common Mistakes
- Spinner-only interfaces.
- Generic "Something went wrong" everywhere.
- Empty state shown for an actual server failure.
- No recovery action.

## Interview Questions
1. Why are async UI states part of architecture?
2. How do you design retry behavior?
3. What is the difference between initial loading and refresh?

## Outcome
The application communicates system state clearly.
