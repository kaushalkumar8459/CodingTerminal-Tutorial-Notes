# Day 235 — Mini Project: High-Performance JobHub Dashboard

## Learning Goal
Diagnose and improve a realistic JobHub dashboard using measurement rather than arbitrary optimization rules.

## Prerequisites
- Days 225–234
- JobHub from Days 130–145

## Scenario
The dashboard contains search, filters, a large result list, saved jobs, company images, authenticated state, analytics and reporting UI.

Users report slow initial loading and lag while changing filters.

## Phase 1 — Baseline
Create one repeatable scenario:
1. open the dashboard in a fresh session
2. search for a common keyword
3. render a large result set
4. open analytics
5. change filters repeatedly

Record initial load, LCP, search interaction, list update, analytics open, request count and major chunks.

## Phase 2 — Diagnose
Use:
- Network panel
- Performance panel
- Angular DevTools Profiler

Classify each issue as loading, rendering, network, asset, interaction or architecture.

## Phase 3 — Optimize

### Rendering
- signal-driven local state
- focused component boundaries
- stable `@for (...; track job.id)`
- no expensive template calculations

### Loading
- lazy routes
- `@defer` for appropriate secondary UI

### Assets
- `NgOptimizedImage` where appropriate
- correct dimensions
- only required font variants

### Network
- remove duplicate requests
- avoid unnecessary sequential requests
- reduce oversized responses
- use suitable caching

### Zoneless
Ensure application state reaches Angular through supported notification paths. Do not add ZoneJS merely to hide a missing state notification.

## Phase 4 — Verify
Repeat the **same scenario**:

```text
Optimization:
Before:
After:
Evidence:
Trade-off:
```

Reject changes that do not provide meaningful benefit or damage UX, accessibility or maintainability.

## Final Review
1. What was the actual bottleneck?
2. What evidence identified it?
3. Which change produced the measurable improvement?
4. Which optimization was rejected?
5. What trade-off was introduced?
6. How would you monitor this after deployment?

## Interview Walkthrough
**symptom → measurement → root cause → optimization → verification → trade-off**

## Expected Outcome
You can diagnose, optimize and defend Angular performance decisions using measurable evidence.
