---
title: inject() and Dependency Injection
slug: inject-and-dependency-injection
dayLabel: Day 60
level: Beginner
estimatedMinutes: 60
order: 60
track: angular
youtubeVideos: []
---

# Day 60 — inject() and Dependency Injection

## Goal

Understand Angular's modern inject() API and the DI resolution process.

## Modern style

~~~ts
export class JobListComponent {
  private readonly jobService = inject(JobService);
}
~~~

The component declares what it needs; Angular resolves the dependency from the active injector.

## Mental model

~~~text
Component → JobService → Injector → Service instance
~~~

## Multiple dependencies

~~~ts
export class JobListComponent {
  private readonly jobService = inject(JobService);
  private readonly configService = inject(AppConfigService);
}
~~~

Keep dependencies focused. Many unrelated dependencies can indicate unclear responsibilities.

## Injection context

inject() works where Angular has an injection context, such as supported class field initializers and constructors. Do not call it from an arbitrary function without an injection context.

## Exercise

Create NotificationService and JobService. Inject both into one feature component, with one focused responsibility per service.

## Interview questions

1. What does inject() do?
2. Where can it be called?
3. How is DI different from manually creating an object?

## Outcome

You understand the basic Angular DI resolution model and can use inject() as the primary modern injection style.
