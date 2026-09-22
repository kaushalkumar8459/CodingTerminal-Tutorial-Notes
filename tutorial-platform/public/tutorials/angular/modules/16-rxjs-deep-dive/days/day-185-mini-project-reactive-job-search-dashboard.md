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

## Concept
Build a production-style reactive job search feature using typed TypeScript, HttpClient, RxJS, and Signals.

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
- Search is debounced and stale searches are cancelled.
- Filters and pagination produce predictable requests.
- Loading, empty, success, and error states are visible.
- Retry policy is intentional.
- Genuine imperative subscriptions are lifecycle-safe.
- API and UI models are separated when needed.
- RxJS handles streams and Signals handle suitable current UI state.

## Example
~~~ts
const result$ = source$.pipe(
  map(value => transform(value)),
  filter(value => isUseful(value)),
  tap(value => console.log(value)),
);
~~~

## Mental Model
User input, query stream, debounce, filtering, API request, cancellation policy, result state, Signal-backed UI.

## Exercise
Build the dashboard and verify typed APIs, cancellation, lifecycle safety, error handling, and clear stream ownership.

## Common Mistakes
- Choosing an operator without defining required behavior.
- Creating nested subscriptions for dependent async work.
- Ignoring subscription lifetime.
- Using RxJS where simple synchronous state is clearer.

## Interview Questions
1. What problem does this topic solve?
2. How is it different from a nearby RxJS concept?
3. What lifecycle or concurrency issue matters here?
4. When would you avoid this technique?

## Outcome
You can explain the topic, implement it in typed Angular code, and justify the design choice.

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
