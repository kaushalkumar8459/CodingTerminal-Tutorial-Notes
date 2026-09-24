---
id: "angular-day-138"
title: "User Profile and Preferences"
slug: "day-138-user-profile-and-preferences"
dayLabel: "Day 138"
level: Intermediate
estimatedMinutes: 90
order: 138
track: angular
youtubeVideos: []
---
# Day 138 — User Profile and Preferences

## Goal
Build a profile area using forms, signals, services, and HTTP.

## Features
- profile information
- skills
- preferred locations
- work mode
- notification preferences
- profile completeness

## Derived State
Use computed signals for values such as profile completeness instead of manually synchronizing derived fields.

## Exercise
Create a profile form and persist changes through a ProfileApiService.

## Common Mistakes
- Storing derived state redundantly.
- Mixing account identity with editable profile data.
- Saving every keystroke without an intentional product requirement.

## Interview Questions
1. What belongs in user identity vs profile state?
2. When should computed state be used?
3. How do you handle save failures?

## Outcome
You can build a realistic authenticated profile workflow.
