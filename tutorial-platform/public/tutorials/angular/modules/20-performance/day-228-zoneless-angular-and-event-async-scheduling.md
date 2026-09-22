# Day 228 — Zoneless Angular and Event/Async Scheduling

## Learning Goal
Understand how Angular 21 schedules change detection without relying on ZoneJS.

## Prerequisites
- Days 76–89: Signals
- Day 226: rendering
- Day 227: OnPush

## Angular 21+ Baseline
**Zoneless change detection is the default in Angular v21+.**

A new Angular 21 application normally does not need `provideZonelessChangeDetection()`. The provider remains useful for explicit configuration and for matching a zoneless production environment in TestBed.

## Zone-Based vs Zoneless

**Zone-based:** browser/async activity → ZoneJS → Angular synchronization

**Zoneless:** Angular-relevant notification → Angular schedules synchronization

Important notifications include:
- updating a signal read by a template
- setting a component input
- bound host/template listeners
- `ChangeDetectorRef.markForCheck()`
- attaching a marked view

## State Must Be Angular-Visible

```ts
readonly isLoading = signal(false);

loadJobs(): void {
  this.isLoading.set(true);
}
```

Do not assume an arbitrary asynchronous callback refreshes unrelated template state.

## NgZone Stability APIs
Do not build new zoneless logic around:
- `NgZone.onMicrotaskEmpty`
- `NgZone.onUnstable`
- `NgZone.onStable`
- `NgZone.isStable`

For render-timing needs, `afterNextRender` or `afterEveryRender` may be more appropriate.

## OnPush Clarification
OnPush is recommended for zoneless compatibility, but it is not mandatory.

## Testing
For tests intended to closely match a zoneless application, TestBed can use `provideZonelessChangeDetection()`. Existing tests do not need a blind rewrite merely to remove every `detectChanges()`.

## Exercise
Audit JobHub for zone-stability subscriptions, manual global refreshes, missing Angular state notifications and unnecessary change-detection calls.

## Interview Questions
1. Is zoneless default in Angular 21?
2. What schedules synchronization?
3. Is OnPush required?
4. What should replace generic NgZone stability logic?

## Expected Outcome
You can explain Angular 21's zoneless scheduling model and identify outdated ZoneJS assumptions.
