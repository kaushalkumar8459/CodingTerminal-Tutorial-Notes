---
id="angular-day-081"
title="Signals in Component Templates"
slug="day-081-signals-in-component-templates"
dayLabel: Day 81
level: Beginner
estimatedMinutes: 60
order: 81
track: angular
youtubeVideos: []
---
# Day 81 — Signals in Component Templates

## Goal
Build reactive templates directly from signal state.

## Example
```ts
readonly isMenuOpen = signal(false);

toggleMenu(): void {
  this.isMenuOpen.update(open => !open);
}
```

```html
<button (click)="toggleMenu()">Toggle</button>

@if (isMenuOpen()) {
  <nav>Menu content</nav>
}
```

Signals work naturally with the modern control flow learned in Module 3.

## Reactive Lists
```html
@if (isLoading()) {
  <p>Loading...</p>
} @else if (visibleJobs().length === 0) {
  <p>No jobs found.</p>
} @else {
  @for (job of visibleJobs(); track job.id) {
    <app-job-card [job]="job" />
  }
}
```

Prefer computed() for filtered or derived collections.

## OnPush
Angular tracks signal reads in OnPush templates and can mark affected components when signal values change. citeturn0search1

## Exercise
Build a notification panel with unread count, open/closed state, notification list, computed unread notifications, and empty state.

## Common Mistakes
- Repeating expensive calculations in templates.
- Duplicating derived state.
- Forgetting ().
- Creating one giant signal for unrelated state.

## Outcome
You can build reactive UI using signals and modern Angular control flow.
