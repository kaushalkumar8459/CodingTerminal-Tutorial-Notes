---
id="angular-day-087"
title="Signals in Services and Feature State"
slug="day-087-signals-in-services-and-feature-state"
dayLabel: Day 87
level: Intermediate
estimatedMinutes: 75
order: 87
track: angular
youtubeVideos: []
---
# Day 87 — Signals in Services and Feature State

## Goal
Move signal state into a service when several components need the same feature state.

## Service Pattern
```ts
@Injectable()
export class JobFeatureState {
  private readonly jobsState = signal<Job[]>([]);

  readonly jobs = this.jobsState.asReadonly();

  readonly activeJobs = computed(() =>
    this.jobsState().filter(job => job.active)
  );

  addJob(job: Job): void {
    this.jobsState.update(jobs => [...jobs, job]);
  }
}
```

Consumers can read state while the service owns mutation.

## State Ownership
Ask: Who owns this state?

- modal open/closed → component
- feature filters → feature
- job collection shared by feature components → feature state service
- application-wide authenticated user → later application/auth architecture

Provider scope still matters. A feature service does not automatically need to be root-scoped.

## Exercise
Build JobDashboardState with jobs, selected job ID, search text, active jobs, selected job, and mutation methods.

## Common Mistakes
- Making every signal root-global.
- Exposing writable service state.
- Combining unrelated features into one service.
- Using a service for state needed by only one component.

## Interview Questions
1. When should signal state live in a service?
2. Why expose readonly signals?
3. How does DI provider scope affect state?
4. Is a signal service the same as NgRx?

## Outcome
You can build a small feature-state layer without an external state library.
