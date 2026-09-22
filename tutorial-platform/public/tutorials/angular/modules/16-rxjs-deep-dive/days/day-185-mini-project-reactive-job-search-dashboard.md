---
id="angular-day-185"
title="Mini Project - Reactive Job Search Dashboard"
slug="mini-project-reactive-job-search-dashboard"
dayLabel="Day 185"
level=Advanced
estimatedMinutes=120
order=185
track=angular
youtubeVideos=[]
---

# Day 185 - Mini Project - Reactive Job Search Dashboard

## Goal
Build a production-style reactive job search feature using typed TypeScript, HttpClient, RxJS, and Signals.

## Features
- Debounced search
- switchMap cancellation
- Filters and pagination
- Loading, empty, success, and error states
- Intentional retry policy
- Lifecycle-safe subscriptions
- Signal and RxJS interop

## Suggested Structure
~~~text
job-search/
  models/
  data-access/
  services/
  components/
  pages/
  state/
~~~

## Acceptance Criteria
- No any.
- No nested subscriptions.
- Stale searches cannot update the UI.
- API and UI models are separated when needed.
- RxJS owns stream composition and Signals own suitable current UI state.

## Interview Questions
1. Why use switchMap for search?
2. Where is concatMap safer?
3. How would you test debounce and cancellation?
4. Why convert an Observable result to a Signal?

## Outcome
You can build and explain a realistic reactive Angular feature.
