---
id="angular-day-078"
title="computed() — Derived State"
slug="day-078-computed-derived-state"
dayLabel: Day 78
level: Beginner
estimatedMinutes: 60
order: 78
track: angular
youtubeVideos: []
---
# Day 78 — computed() — Derived State

## Goal
Calculate values from signals without duplicating state.

## Example
```ts
readonly price = signal(1000);
readonly quantity = signal(2);
readonly total = computed(() => this.price() * this.quantity());
```

computed() creates a read-only signal derived from other signals. It is lazy and memoized, and Angular tracks its dependencies. citeturn0search1

## Filtering
```ts
readonly jobs = signal<Job[]>([]);
readonly search = signal('');

readonly filteredJobs = computed(() => {
  const term = this.search().trim().toLowerCase();
  if (!term) return this.jobs();

  return this.jobs().filter(job =>
    job.title.toLowerCase().includes(term)
  );
});
```

Keep jobs and search as source state. Let filteredJobs be derived state.

## Exercise
Build product search with product list, search, category, computed filtered products, and computed result count.

## Common Mistakes
- Trying to set a computed signal.
- Using effect() to calculate derived state.
- Maintaining source and derived values separately.

## Interview Questions
1. What is computed()?
2. Is it writable?
3. Why is computed better than duplicated state?
4. What does memoized mean?

## Outcome
You can model derived state with one clear source of truth.
