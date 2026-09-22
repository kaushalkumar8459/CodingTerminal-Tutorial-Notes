---
id: "angular-day-117"
title: "API Configuration and Environment-Safe URLs"
slug: "day-117-api-configuration-and-environment-safe-urls"
dayLabel: "Day 117"
level: Intermediate
estimatedMinutes: 75
order: 117
track: angular
youtubeVideos: []
---
# Day 117 — API Configuration and Environment-Safe URLs

## Goal
Avoid scattering backend URLs through application code.

## Configuration
Create typed application configuration containing apiBaseUrl. Data-access services consume that configuration when constructing endpoints.

## Principles
- local, test, staging, and production may use different endpoints
- configuration should be centralized
- secrets do not belong in browser configuration
- deployment-specific values need an appropriate build-time or runtime strategy

## Exercise
Create typed application configuration with apiBaseUrl and use it in JobApiService.

## Common Mistakes
- hard-coded localhost URLs
- committing secrets
- duplicating base URLs
- mixing configuration with business logic

## Interview Questions
1. Why centralize API URLs?
2. Should secrets be stored in frontend environment files?
3. Build-time vs runtime configuration?

## Outcome
You can create environment-safe API configuration boundaries.
