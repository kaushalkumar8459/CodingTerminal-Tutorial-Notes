---
title: Service-Owned Signal State
slug: day-063-service-owned-signal-state
dayLabel: Day 63
level: Intermediate
estimatedMinutes: 75
order: 63
track: angular
youtubeVideos: []
---

# Day 63 — Service-Owned Signal State

## Goal

Use a service to own shared local state with Angular signals.

## Why move state into a service?

A component's state belongs to that component. Several components may need the same feature state, such as JobList, JobFilters, and JobSummary. A feature service can become the shared owner.

## Example

~~~ts
@Injectable({ providedIn: 'root' })
export class JobStoreService {
  private readonly jobsState = signal<Job[]>([]);
  private readonly selectedJobIdState = signal<number | null>(null);

  readonly jobs = this.jobsState.asReadonly();
  readonly selectedJobId = this.selectedJobIdState.asReadonly();

  readonly openJobs = computed(() =>
    this.jobs().filter(job => job.status === 'open')
  );

  setJobs(jobs: Job[]): void { this.jobsState.set(jobs); }
  selectJob(id: number): void { this.selectedJobIdState.set(id); }
}
~~~

## Why asReadonly()?

The service owns mutation. Consumers can read the signal without receiving a writable API.

## State ownership rule

The owner of state should own its mutations. Do not expose writable signals everywhere unless there is a deliberate reason.

## Exercise

Create CourseCatalogService with course list, selected course, published/filtered computed state, and methods to select and replace courses.

## Common mistakes

- Exposing writable state unnecessarily
- Putting every application's state into one service
- Duplicating service state in components
- Treating every service as a global store

## Interview questions

1. Why keep signal state inside a service?
2. Why expose readonly signals?
3. When is service-based state sufficient?

## Outcome

You can build shared feature state using signals without introducing an external state library.
