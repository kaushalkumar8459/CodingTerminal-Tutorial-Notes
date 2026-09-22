---
title: Why Services & Dependency Injection?
slug: day-058-why-services-and-dependency-injection
dayLabel: Day 58
level: Beginner
estimatedMinutes: 60
order: 58
track: angular
youtubeVideos: []
---

# Day 58 — Why Services & Dependency Injection?

## Goal

Understand why component-only applications become difficult to maintain and why Angular provides services and Dependency Injection (DI).

## The problem

Components are responsible primarily for UI and user interaction. As an application grows, putting business rules, reusable calculations, shared data, and workflows directly into components creates duplication and large components.

Imagine two job components both calculating application status. If the rule is copied, a change must be made twice.

## With a service

~~~ts
@Injectable({ providedIn: 'root' })
export class JobService {
  getStatusLabel(status: string): string {
    return status === 'open' ? 'Apply Now' : 'Closed';
  }
}
~~~

The component asks the service for reusable behavior instead of owning that business rule.

## Mental model

~~~text
Component
   ↓ needs
Service
   ↓ resolved by
Injector
~~~

DI answers: “Which dependency should Angular provide here?”

## Exercise

Create a local JobService with getJobs(), getOpenJobs(), and getStatusLabel(). Do not add HTTP or RxJS yet.

## Interview questions

1. Why do Angular applications use services?
2. What problem does DI solve?
3. Does every service need to be provided globally?
4. Should all component logic move into services?

## Assignment

Take a component with at least three non-UI responsibilities and identify which responsibilities belong in a service.

## Outcome

You can explain why services exist and why DI is preferable to manually constructing shared dependencies.
