---
id="angular-day-113"
title="HTTP Interceptors"
slug="day-113-http-interceptors"
dayLabel="Day 113"
level=Intermediate
estimatedMinutes=90
order=113
track=angular
youtubeVideos=[]
---
# Day 113 — HTTP Interceptors

## Goal
Centralize cross-cutting HTTP behavior.

## Common Uses
- authentication
- correlation IDs
- logging
- timing
- global error handling
- loading indicators

## Functional Interceptor
Modern Angular supports functional interceptors. An interceptor receives a request and next handler, and can clone the immutable request before forwarding it.

Register functional interceptors through provideHttpClient and withInterceptors.

## Exercise
Create an interceptor that adds a correlation ID to outgoing API requests.

## Common Mistakes
- Mutating the original request.
- Putting feature-specific business logic in a global interceptor.
- Creating many interceptors with overlapping responsibilities.

## Interview Questions
1. Why clone HttpRequest?
2. What belongs in an interceptor?
3. Functional vs class-based interceptors?

## Outcome
You can centralize cross-cutting transport behavior.
