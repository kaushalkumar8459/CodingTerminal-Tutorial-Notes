---
id="angular-day-107"
title="GET Requests and Typed Responses"
slug="day-107-get-requests-and-typed-responses"
dayLabel="Day 107"
level=Beginner
estimatedMinutes=75
order=107
track=angular
youtubeVideos=[]
---
# Day 107 — GET Requests and Typed Responses

## Goal
Fetch server data with a typed response.

## API Model
Create a JobDto containing id, title, company, location, and workMode.

## GET Request
Use HttpClient.get<JobDto[]>('/api/jobs') so the application has a compile-time expectation for the response shape.

The generic type does not validate untrusted JSON at runtime.

## Query Parameters
Use HttpClient request options for filters such as location, page, and search.

## Exercise
Build JobApiService with getJobs(), getJob(id), and optional search parameters.

## Common Mistakes
- Using any for API responses.
- Assuming TypeScript validates server data at runtime.
- Mixing DTO definitions with UI-specific display logic.

## Interview Questions
1. How do you type an HttpClient response?
2. Does a TypeScript interface validate JSON at runtime?
3. Where should API models live?

## Outcome
You can create typed GET data-access methods.
