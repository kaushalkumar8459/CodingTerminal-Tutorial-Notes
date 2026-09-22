---
id="angular-day-110"
title="Loading, Success, Empty and Error States"
slug="day-110-loading-success-empty-error-states"
dayLabel="Day 110"
level=Intermediate
estimatedMinutes=75
order=110
track=angular
youtubeVideos=[]
---
# Day 110 — Loading, Success, Empty and Error States

## Goal
Build UI that correctly represents asynchronous data.

## State Model
A request commonly moves through idle → loading → success or error. A successful request can still return an empty collection.

Therefore distinguish:
- loading
- success with data
- success with empty collection
- error

## Signal Example
Use signals for jobs, isLoading, and errorMessage when local feature state is sufficient.

## Template Pattern
Use modern @if and @for to render loading, error, empty, and data states in that order.

## Exercise
Convert the local Job Dashboard into a request-driven state model.

## Common Mistakes
- Showing an empty state while loading.
- Treating errors as empty results.
- Leaving stale data visible without communicating refresh state.

## Interview Questions
1. Why separate empty and error?
2. What is stale data?
3. How should refresh state differ from initial loading?

## Outcome
You can design predictable async UI states.
