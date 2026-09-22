---
title: Creating Services with @Injectable
slug: creating-services-with-injectable
dayLabel: Day 59
level: Beginner
estimatedMinutes: 60
order: 59
track: angular
youtubeVideos: []
---

# Day 59 — Creating Services with @Injectable

## Goal

Create an Angular service and understand @Injectable and providedIn.

## Create a service

~~~bash
ng generate service services/job
~~~

~~~ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  getJobCount(): number {
    return 3;
  }
}
~~~

@​Injectable marks a class for Angular's DI system. providedIn: 'root' registers it with the root injector.

## Consume it

~~~ts
export class JobListComponent {
  private readonly jobService = inject(JobService);
  readonly jobCount = this.jobService.getJobCount();
}
~~~

Prefer Angular DI over manually constructing a service with new. Manual construction bypasses Angular's dependency graph.

## Exercise

Create CourseService with getCourseCount(), getCourseTitle(), and isPublished(). Inject it into a component and display the results.

## Common mistakes

- Forgetting @Injectable
- Manually constructing services
- Putting UI markup inside services
- Creating one service for unrelated features

## Interview questions

1. What is @Injectable?
2. What does providedIn: 'root' do?
3. Why inject instead of using new?

## Outcome

You can create and consume a basic Angular service.
