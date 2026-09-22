# Day 233 — Profiling, Angular DevTools and Performance Diagnostics

## Goal
Measure runtime performance before changing code.

## Angular DevTools
Angular DevTools includes a Profiler that records Angular execution activity and helps identify components consuming rendering time.

## Workflow
reproduce → record → identify hotspot → change one thing → record again

## Browser Tools
Inspect long tasks, scripting, rendering, painting, network timing, LCP, and layout shifts.

## Exercise
Profile JobHub before and after changing a deliberately expensive list item. Record interaction duration, rendered item count, major hotspot, and the measured improvement.

## Common Mistakes
- Treating development profiling as production truth.
- Changing multiple variables at once.
- Assuming the slowest-looking component is always the root cause.
- Using unrepresentative benchmarks.

## Interview Questions
1. What does Angular DevTools Profiler show?
2. Why measure before optimizing?
3. What is a long task?
4. How do browser and Angular profiling complement each other?

## Outcome
You can perform a repeatable performance investigation.