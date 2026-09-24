---
id: "angular-day-111"
title: "HttpClient Services and API Boundaries"
slug: "day-111-httpclient-services-api-boundaries"
dayLabel: "Day 111"
level: Intermediate
estimatedMinutes: 75
order: 111
track: angular
youtubeVideos: []
---
# Day 111 — HttpClient Services and API Boundaries

## Goal
Move HTTP details into a focused data-access service.

## Boundary
Component → Feature/Data Access Service → HttpClient → API

## Service Responsibilities
- endpoint details
- request options
- DTO types
- transport concerns

## Feature Responsibilities
- UI state
- selection
- presentation
- user interaction
- orchestration

## Exercise
Refactor all Job API calls into JobApiService.

## Common Mistakes
- One giant API service for every domain.
- Components knowing endpoint URLs.
- Services containing unrelated UI state.

## Interview Questions
1. Why wrap HttpClient?
2. What belongs in a data-access service?
3. One API service or many?

## Outcome
You can establish a clean transport boundary.
