---
id: "angular-day-116"
title: "httpResource() and Signal-Based HTTP State"
slug: "day-116-httpresource-signal-based-http-state"
dayLabel: "Day 116"
level: Advanced
estimatedMinutes: 90
order: 116
track: angular
youtubeVideos: []
---
# Day 116 — httpResource() and Signal-Based HTTP State

## Goal
Connect Angular's resource model to real HTTP requests after learning HttpClient fundamentals.

## Why httpResource?
httpResource provides a signal-based approach for reactive HTTP data and builds on Angular's HttpClient infrastructure.

## Mental Model
Reactive parameters → httpResource → HTTP request → resource state → template

The important concepts are:
- reactive request parameters
- loading state
- value state
- error state
- replacement/cancellation behavior

Use the current Angular documentation for exact API options because this API evolves with Angular releases.

## When to Use It
Use httpResource when reactive signal-driven fetching fits the feature. Do not replace every existing HttpClient service automatically.

Traditional HttpClient remains useful for commands, mutations, reusable data-access methods, and custom orchestration.

## Exercise
Convert a read-only Job Search query to signal-driven HTTP resource state.

## Interview Questions
1. What problem does httpResource solve?
2. How does it relate to resource?
3. When might plain HttpClient be preferable?

## Outcome
You can evaluate signal-based HTTP data fetching without confusing it with HttpClient fundamentals.
