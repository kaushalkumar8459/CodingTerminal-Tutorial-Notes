---
id: "angular-day-119"
title: "Mini Project — Job Search API Dashboard"
slug: "day-119-job-search-api-dashboard"
dayLabel: "Day 119"
level: Intermediate
estimatedMinutes: 120
order: 119
track: angular
youtubeVideos: []
---
# Day 119 — Mini Project: Job Search API Dashboard

## Goal
Build the first fully API-backed Angular feature.

## Features
- search jobs
- filter by location
- filter by work mode
- view job details
- create a saved-job record
- update saved-job status
- delete a saved job
- refresh results
- display loading, empty, and error states

## Architecture
JobSearchPage → JobSearchFeatureState → JobApiService → HttpClient → REST API

## Requirements
- typed DTOs
- UI/domain models
- mapper functions
- provideHttpClient()
- functional interceptor
- correlation ID
- centralized API configuration
- explicit request/error handling
- signal-based feature state
- httpResource() for one read-only reactive search flow

## Acceptance Criteria
- [ ] No API URLs inside presentation components
- [ ] No any
- [ ] Typed request and response models
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Intentional retry strategy
- [ ] HTTP mutations handled separately from reads where appropriate
- [ ] Interceptor has one clear responsibility
- [ ] API configuration is centralized
- [ ] DTO-to-UI mapping is explicit
- [ ] No secrets in frontend code
- [ ] Standalone components
- [ ] Modern @if/@for/@switch
- [ ] No external state library

## Extension Challenge
Add pagination, server-side sorting, request cancellation, and an API response envelope.

## Interview Questions
1. How do you structure Angular API integration?
2. Where should HTTP calls live?
3. What is an interceptor?
4. Why map DTOs?
5. How do you handle loading and errors?
6. When would you use httpResource?
7. How do you configure API URLs safely?
8. How do you prevent duplicate API logic?

## Outcome
After Day 119, the learner can build a maintainable Angular feature backed by a REST API.

Next: Authentication & Authorization.
