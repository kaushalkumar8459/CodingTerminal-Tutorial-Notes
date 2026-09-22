---
id="angular-day-106"
title="HttpClient and provideHttpClient"
slug="day-106-httpclient-and-providehttpclient"
dayLabel="Day 106"
level=Beginner
estimatedMinutes=75
order=106
track=angular
youtubeVideos=[]
---
# Day 106 — HttpClient and provideHttpClient

## Goal
Configure Angular's HTTP client and make the first request.

## Setup
Modern standalone Angular applications configure HttpClient with provideHttpClient() in application providers.

Inject HttpClient with inject() rather than putting transport logic in the component.

## First Request
A basic data-access method can call GET with a typed response such as JobDto[].

## Important Boundary
Keep the first request simple, then move HTTP details into a service.

## Exercise
Configure HttpClient and create a temporary request against a mock endpoint.

## Common Mistakes
- Forgetting provideHttpClient().
- Calling APIs directly from many components.
- Hard-coding URLs throughout the application.
- Ignoring response typing.

## Interview Questions
1. What does provideHttpClient() do?
2. How is HttpClient injected?
3. Why use a service around HttpClient?

## Outcome
You can configure and inject Angular HttpClient.
