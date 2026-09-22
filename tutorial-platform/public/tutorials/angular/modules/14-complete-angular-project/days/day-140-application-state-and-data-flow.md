---
id="angular-day-140"
title="Application State and Data Flow"
slug="day-140-application-state-and-data-flow"
dayLabel="Day 140"
level=Advanced
estimatedMinutes=90
order=140
track=angular
youtubeVideos=[]
---
# Day 140 — Application State and Data Flow

## Goal
Review state ownership across the complete application before introducing external state-management libraries later.

## State Categories
### Local UI State
Examples:
- modal open
- selected tab
- expanded card

### Feature State
Examples:
- job search filters
- job results
- current profile edit state

### Shared Application State
Examples:
- authenticated user
- permissions
- application-wide configuration

## Principle
Keep state as close as practical to the feature that owns it.

## Data Flow
```
User Action
 ↓
Component/Event
 ↓
Feature State or Service
 ↓
API
 ↓
Response
 ↓
State
 ↓
UI
```

## Exercise
Audit JobHub and label every important state value as local, feature, or shared.

## Common Mistakes
- Making every value global.
- Duplicating the same source of truth.
- Using services as uncontrolled global state.

## Interview Questions
1. What is state ownership?
2. When should state be shared?
3. Why avoid global state by default?

## Outcome
You understand the state-management boundary before learning dedicated state libraries.
