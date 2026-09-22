---
id="angular-day-109"
title="Request Parameters, Headers and Options"
slug="day-109-request-parameters-headers-options"
dayLabel="Day 109"
level=Intermediate
estimatedMinutes=75
order=109
track=angular
youtubeVideos=[]
---
# Day 109 — Request Parameters, Headers and Options

## Goal
Build requests with explicit options.

## Query Parameters
Use HttpParams when parameters need controlled construction.

Typical parameters include page, pageSize, search, location, and sort.

## Headers
Use HttpHeaders or interceptor logic for request metadata. Common examples include correlation IDs and content negotiation.

## Other Options
Learn the purpose of:
- params
- headers
- observe
- responseType
- context
- withCredentials

## Exercise
Create a paginated job request with page, pageSize, search, location, and a correlation header.

## Common Mistakes
- Building query strings manually.
- Duplicating common headers.
- Putting authentication headers in every service method.

## Interview Questions
1. HttpParams vs manual URL construction?
2. What are HTTP headers?
3. What is HttpContext used for?

## Outcome
You can construct explicit and maintainable HTTP requests.
