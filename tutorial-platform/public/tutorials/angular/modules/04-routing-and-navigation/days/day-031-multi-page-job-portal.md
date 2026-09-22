id="r4n10"
---
title: Mini Project — Multi-Page Job Portal
slug: day-031-multi-page-job-portal
dayLabel: Day 31
level: Intermediate
estimatedMinutes: 150
order: 31
track: angular
youtubeVideos: []
---

# Day 31 — Mini Project: Multi-Page Job Portal

## Goal

Build a frontend-only multi-page Angular job portal using the routing concepts from Days 23–30.

Use local mock data. Do not introduce HTTP, RxJS, authentication backends, or external state libraries yet.

## Pages

Public:

- Home
- Jobs
- Job Details
- About

Protected demo:

- Saved Jobs

Fallback:

- Not Found

## Route design

    /
    /jobs
    /jobs/:id
    /about
    /saved-jobs

Jobs should support query parameters such as:

    /jobs?search=angular&location=delhi&sort=recent

## Required concepts

### Navigation

Use RouterLink, RouterLinkActive, and programmatic navigation where appropriate.

### Route parameters

Use /jobs/:id for job details.

### Query parameters

Use query parameters for Search, Location, and Sort.

### Layout

Create a shared application shell with Header, Navigation, Main RouterOutlet, and Footer.

### Guard

Protect Saved Jobs with a demo functional guard. A local signal such as isLoggedIn can be used. Do not implement real authentication yet.

### Lazy loading

Lazy-load at least one feature route, such as Saved Jobs.

## Suggested model

    export interface Job {
      id: number;
      title: string;
      company: string;
      location: string;
      type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
      skills: string[];
      postedDaysAgo: number;
    }

Create at least 10 mock jobs.

## Acceptance criteria

- [ ] Multiple working URLs
- [ ] Header navigation works
- [ ] Active route is visually identifiable
- [ ] Job list uses @for
- [ ] Job details use a route parameter
- [ ] Search/filter state uses query parameters
- [ ] Saved Jobs is protected by a functional guard
- [ ] At least one feature is lazy-loaded
- [ ] Not Found works
- [ ] Browser Back/Forward works
- [ ] Deep-link refresh is tested in the hosting setup
- [ ] No *ngIf or *ngFor
- [ ] No any

## Stretch goals

- Add nested routes under Jobs
- Add a job application form later with the Forms module
- Add real API data later with HTTP
- Replace the demo guard with real authentication later

## Interview questions

1. How would you design routes for a large Angular application?
2. Why use route parameters for job details?
3. Why use query parameters for search and filters?
4. Why lazy-load feature routes?
5. Why is a frontend guard not enough for authorization?
6. How would you handle deep-link refresh in production?

## Final outcome

The learner can build and reason about a multi-page Angular SPA.

Next dependency: Component Communication. The learner now has enough screens and reusable UI pieces to understand parent/child communication.
