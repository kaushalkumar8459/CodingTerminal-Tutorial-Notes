# Day 229 — @for Tracking and Efficient List Rendering

## Goal
Learn how stable item identity affects DOM reuse and rendering performance.

## Example
~~~html
@for (job of jobs(); track job.id) {
  <app-job-card [job]="job" />
} @empty {
  <p>No jobs found.</p>
}
~~~

Prefer a stable database ID or other domain identifier. Avoid index identity when items can be inserted, removed, or reordered.

## Exercise
Build a 1,000-item JobHub list and test adding, removing, and reordering records.

## Common Mistakes
- Omitting track for dynamic lists.
- Using unstable identity values.
- Treating track as a replacement for profiling.
- Rendering huge complex lists when pagination or virtualization fits the UX better.

## Interview Questions
1. Why does @for need track?
2. What makes a good tracking key?
3. Why can index identity be inefficient?
4. When is virtualization preferable?

## Outcome
You can design efficient collection rendering with stable identity.