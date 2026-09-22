---
id: "angular-day-105"
title: "Why HTTP & API Integration?"
slug: "day-105-why-http-api-integration"
dayLabel: "Day 105"
level: Beginner
estimatedMinutes: 60
order: 105
track: angular
youtubeVideos: []
---
# Day 105 — Why HTTP & API Integration?

## Prerequisites

- Days 1–104
- Services and dependency injection
- Signals and forms

## Goal
Understand why a frontend needs an API and what happens when Angular communicates with a backend.

## From Local Data to Real Data
Real applications need to fetch, create, update, and delete server data, while handling loading, failures, and authentication.

## Mental Model
Angular UI → feature/data-access service → HTTP request → backend API → HTTP response → state → UI

## HTTP Methods
- GET → read
- POST → create
- PUT → replace
- PATCH → partial update
- DELETE → remove

## Exercise
Design a Job API with GET /jobs, GET /jobs/:id, POST /jobs, PATCH /jobs/:id, and DELETE /jobs/:id.

## Interview Questions
1. What is HTTP?
2. What is a REST API?
3. GET vs POST?
4. PUT vs PATCH?
5. Why should components not own API details?

## Outcome
You understand the frontend-to-backend boundary.


## Real-World JobHub Scenario

Candidate search moves from local arrays to backend-owned data. The UI should consume a typed data-access boundary while loading, empty, success, and error states remain explicit.

## Common Mistakes

- Calling `HttpClient` directly from every component.
- Assuming every response succeeds.
- Mixing transport DTOs with UI models without a boundary.
- Treating HTTP as synchronous local state.

## Challenge

Design a `JobApiService` contract that can replace local job data without forcing `JobCardComponent` to know endpoint details.

## Expected Outcome

You can explain why API access belongs behind a clear data-access boundary and identify the states a remote request can enter.
