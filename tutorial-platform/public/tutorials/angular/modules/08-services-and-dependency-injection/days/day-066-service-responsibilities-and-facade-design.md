---
title: Service Responsibilities and Facade Design
slug: service-responsibilities-and-facade-design
dayLabel: Day 66
level: Intermediate
estimatedMinutes: 75
order: 66
track: angular
youtubeVideos: []
---

# Day 66 — Service Responsibilities and Facade Design

## Goal

Keep services focused and understand the facade pattern without overengineering.

## A bad service

~~~text
AppService
 ├── jobs
 ├── users
 ├── theme
 ├── notifications
 └── reports
~~~

Easy DI access does not justify putting every concern into one service.

## Focused services

~~~text
JobService
UserService
NotificationService
ThemeService
~~~

Each should have a meaningful responsibility.

## Facade concept

A feature facade gives UI code a small API while coordinating internal services.

~~~ts
@Injectable()
export class JobFacade {
  private readonly jobService = inject(JobService);
  private readonly filterService = inject(JobFilterService);

  readonly jobs = this.jobService.jobs;
  readonly filteredJobs = computed(() =>
    this.filterService.apply(this.jobs())
  );
}
~~~

## When a facade helps

Use one when a feature has multiple collaborating services, components otherwise know too much, or the feature needs a stable UI-facing boundary. Do not create a facade for every tiny service.

## Exercise

Refactor a hypothetical JobAppService into a local job data service, job filter service, and job facade. No HTTP is required.

## Interview questions

1. What is a facade?
2. Why can a giant service be difficult to maintain?
3. When is a facade unnecessary?

## Outcome

You can design service boundaries around responsibilities rather than convenience.
