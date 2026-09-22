---
id="angular-day-135"
title="Job Search and Filtering"
slug="day-135-job-search-and-filtering"
dayLabel="Day 135"
level=Intermediate
estimatedMinutes=90
order=135
track=angular
youtubeVideos=[]
---
# Day 135 — Job Search and Filtering

## Goal
Build the primary candidate job-search experience.

## Features
- keyword search
- location filter
- work-mode filter
- employment type
- salary range
- sorting
- pagination
- clear filters

## State
Keep:
- search criteria
- result list
- loading state
- empty state
- error state
- selected job

in the feature boundary.

## Exercise
Connect the search form to the Job API and render results with reusable cards.

## Common Mistakes
- Mixing search form state with API DTOs.
- Duplicating filter logic in multiple components.
- Triggering requests for every UI change without an intentional strategy.

## Interview Questions
1. Where should search state live?
2. Client-side vs server-side filtering?
3. How do you avoid stale search results?

## Outcome
You can build a realistic API-backed search feature.
