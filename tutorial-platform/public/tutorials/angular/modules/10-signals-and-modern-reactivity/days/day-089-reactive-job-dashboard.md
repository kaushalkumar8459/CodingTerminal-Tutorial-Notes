---
id: "angular-day-089"
title: "Mini Project — Reactive Job Dashboard"
slug: "day-089-reactive-job-dashboard"
dayLabel: Day 89
level: Intermediate
estimatedMinutes: 120
order: 89
track: angular
youtubeVideos: []
---
# Day 89 — Mini Project: Reactive Job Dashboard

## Goal
Build a complete feature using the signal APIs from Days 76–88.

## Project
Create a Reactive Job Dashboard using local mock data.

Each job should contain:
- id
- title
- company
- location
- workMode
- status
- salary

## Required Reactive State
Use signal() for:
- jobs
- search text
- selected status
- selected location
- selected job
- local UI state

Use computed() for:
- filtered jobs
- result count
- active job count
- selected job details

Use linkedSignal() where a selected filter depends on a changing set of valid options.

Use resource() for a local asynchronous preview. Do not use HttpClient.

## Component APIs
Use:
- input() for child data
- output() for child events
- model() only for genuine two-way values
- viewChild() only for a meaningful view interaction

## One Genuine Effect
Use one justified effect, such as persisting a UI preference to localStorage.

## Suggested Components
```
ReactiveJobDashboard
├── JobToolbar
├── JobFilterPanel
├── JobList
│   └── JobCard
├── JobDetails
└── EmptyState
```

## Acceptance Criteria
- [ ] Standalone components
- [ ] Modern @if, @for, and @switch
- [ ] signal() for source state
- [ ] computed() for derived state
- [ ] effect() only for a real side effect
- [ ] linkedSignal() where justified
- [ ] input(), output(), and model() used appropriately
- [ ] viewChild() used only where needed
- [ ] resource() used for local async work
- [ ] explicit state ownership
- [ ] explicit loading, empty, success, and error UI
- [ ] no RxJS
- [ ] no HttpClient
- [ ] no NgRx/SignalStore
- [ ] no unnecessary lifecycle hooks
- [ ] no duplicated derived state

## Suggested Structure
```
reactive-job-dashboard/
├── components/
├── state/
│   └── job-dashboard.state.ts
├── models/
│   └── job.model.ts
└── reactive-job-dashboard.component.ts
```

## Interview Questions
1. signal vs RxJS for local synchronous state?
2. signal vs computed?
3. When is effect appropriate?
4. When is linkedSignal useful?
5. What problem does resource solve?
6. How do signals interact with OnPush?
7. How should feature state be owned?
8. When might a state-management library become justified?

## Extension Challenge
Add persisted filters, keyboard focus management, dynamic empty-state messages, recently viewed selection, and local async refresh.

## Outcome
The learner can now build a meaningful Angular feature with modern signal-based reactivity and is ready to move into Forms.
