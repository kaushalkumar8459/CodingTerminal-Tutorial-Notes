---
title: Feature Service Architecture
slug: feature-service-architecture
dayLabel: Day 67
level: Advanced
estimatedMinutes: 80
order: 67
track: angular
youtubeVideos: []
---

# Day 67 — Feature Service Architecture

## Goal

Combine DI, service scope, signals, configuration, and focused responsibilities into a small feature architecture.

## Example structure

~~~text
jobs/
├── pages/
│   ├── job-list-page.ts
│   └── job-details-page.ts
├── components/
│   ├── job-card.ts
│   └── job-filters.ts
└── services/
    ├── job-data.service.ts
    ├── job-filter.service.ts
    ├── job-state.service.ts
    └── job-facade.service.ts
~~~

This is an example, not a mandatory structure. Keep architecture proportional to feature complexity.

## Responsibility split

Data service owns local/mock job data. Filter service owns reusable filtering rules. State service owns feature signals. Facade coordinates the public feature API.

## Data flow

~~~text
Page
 ↓
Facade
 ├── Data service
 ├── Filter service
 └── State service
~~~

The UI should not need to know every internal implementation detail.

## Provider scope

If feature state should be isolated per route, provide the state/facade at route level. If it must be shared application-wide, root scope may be appropriate.

## Design checklist

1. What responsibility does it own?
2. Who consumes it?
3. What should its lifetime be?
4. Does it need state?
5. Does it need configuration?
6. Can the public API be smaller?

## Exercise

Design a local Job Management feature with page, job card, filters, state service, data service, and facade.

## Common mistakes

- Creating layers before there is a problem
- Duplicating state between component and service
- Exposing internal services unnecessarily
- Choosing root scope by habit

## Outcome

You can assemble a maintainable service layer without unnecessary abstraction.
