---
id="angular-day-118"
title="API Architecture and Data Access Patterns"
slug="day-118-api-architecture-and-data-access-patterns"
dayLabel="Day 118"
level=Advanced
estimatedMinutes=90
order=118
track=angular
youtubeVideos=[]
---
# Day 118 — API Architecture and Data Access Patterns

## Goal
Combine HTTP concepts into a maintainable feature architecture.

## Recommended Boundary
Component → Feature State / Facade → Data Access Service → HttpClient → Backend

Not every feature needs all layers. Add a layer when it solves a real problem.

## Responsibilities
- component → presentation and interaction
- feature state → UI state and orchestration
- API service → transport
- mapper → DTO/domain conversion
- interceptor → cross-cutting HTTP behavior
- configuration → environment-specific values

## Avoid
- giant ApiService
- HTTP calls in templates
- endpoint URLs in components
- duplicate loading flags across unrelated components
- global state for every API response

## Exercise
Draw and implement the architecture for the Job Dashboard.

## Interview Questions
1. What is a data-access layer?
2. When is a facade useful?
3. Why should architecture stay proportional to feature complexity?

## Outcome
You can structure API-backed Angular features without unnecessary abstraction.
