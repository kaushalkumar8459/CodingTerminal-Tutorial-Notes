---
id="angular-day-114"
title="Authentication Headers and Request Context"
slug="day-114-authentication-headers-and-request-context"
dayLabel="Day 114"
level=Intermediate
estimatedMinutes=75
order=114
track=angular
youtubeVideos=[]
---
# Day 114 — Authentication Headers and Request Context

## Goal
Understand authenticated HTTP requests without building the complete authentication architecture yet.

## Typical Pattern
Request → authentication interceptor → Authorization header → API

Do not hard-code tokens in components or API services.

## HttpContext
Some requests need different interceptor behavior. HttpContext can carry request-specific metadata, such as:
- skip loading indicator
- skip authentication for a public endpoint
- mark a request as cacheable

## Security Boundary
Frontend authentication configuration does not replace backend authorization. Browser-held credentials must be treated according to the application's security architecture.

## Exercise
Design one public endpoint and one protected endpoint using request context metadata.

## Common Mistakes
- Hard-coding tokens.
- Logging access tokens.
- Assuming an interceptor alone provides authentication.
- Treating frontend authorization as backend security.

## Interview Questions
1. Where should Authorization headers be added?
2. What is HttpContext?
3. Why is backend authorization still required?

## Outcome
You understand the HTTP authentication boundary.
