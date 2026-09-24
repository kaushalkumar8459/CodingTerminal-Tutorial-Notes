---
id: "angular-day-136"
title: "Job Details and Saved Jobs"
slug: "day-136-job-details-and-saved-jobs"
dayLabel: "Day 136"
level: Intermediate
estimatedMinutes: 90
order: 136
track: angular
youtubeVideos: []
---
# Day 136 — Job Details and Saved Jobs

## Goal
Build the job-detail and saved-job workflow.

## Features
- route parameter based details
- company information
- requirements
- salary/location summary
- save/unsave job
- saved jobs list
- application action

## Component Communication
Use explicit inputs/outputs for reusable cards and action controls.

## Data Flow
Route → feature state → API service → UI model → components.

## Exercise
Implement /jobs/:id and /jobs/saved.

## Common Mistakes
- Passing large global objects through every component.
- Duplicating job detail loading logic.
- Letting a presentational card call the API directly.

## Interview Questions
1. How do route parameters reach a feature?
2. How should a reusable JobCard trigger save?
3. Where should save-job API logic live?

## Outcome
You can build connected detail and collection views.
