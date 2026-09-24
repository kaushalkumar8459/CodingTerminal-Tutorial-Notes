---
title: Mini Project — Job Management Service Layer
slug: day-068-mini-project-job-management-service-layer
dayLabel: Day 68
level: Advanced
estimatedMinutes: 120
order: 68
track: angular
youtubeVideos: []
---

# Day 68 — Mini Project — Job Management Service Layer

## Goal

Build a complete local Job Management feature proving your understanding of services, DI, provider scope, signal state, configuration, and service boundaries.

## Project

Create a Job Management page with job list, search/filter controls, selected-job details, status summary, create/update simulation using local data, and reusable job state.

No backend or HTTP is required.

## Suggested architecture

~~~text
JobManagementPage
        ↓
    JobFacade
     ↙   ↓   ↘
Data   State  Filter
Service Service Service
~~~

## Requirements

### Job model

~~~ts
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: 'open' | 'closed' | 'draft';
}
~~~

Seed at least six jobs.

### Data service

Provide local methods such as getJobs(), addJob(job), and updateJob(job).

### State service

Use private writable signals and readonly public signals. Include jobs, selected job, search term, and selected status. Add computed values for filtered jobs and summary counts.

### Filter service

Keep filtering rules separate from UI code.

### Facade

Expose a small feature API: jobs, filteredJobs, selectedJob, summary, selectJob(), setSearchTerm(), setStatus(), and addJob().

### Configuration

Create an APP_CONFIG InjectionToken containing at least application name and default page size.

### Provider scope

Choose and document root or route scope. Prefer route-scoped feature state for this exercise so learners observe ownership and lifecycle.

## Acceptance criteria

- Components do not contain shared job business logic.
- Services are injected with Angular DI.
- inject() is used in modern Angular code.
- Signal state is owned by the service layer.
- Writable signals are not exposed unnecessarily.
- Filtering is not duplicated across components.
- Configuration uses an InjectionToken.
- Provider scope is intentional and documented.
- The facade presents a small API to the UI.
- No HTTP, RxJS, external state library, or authentication is introduced.

## Stretch tasks

- Add a second route with a separate feature-scoped state instance.
- Add a local notification service.
- Add a useFactory provider for derived configuration.
- Add a logging abstraction using useClass.

## Reflection

1. Why should the page not own all job logic?
2. Why separate state and data services?
3. Why is provider scope important?
4. When would root scope be better?
5. When would a facade become unnecessary complexity?

## Outcome

You have built a structured Angular service layer and are ready for the next dependency-driven application capabilities.
