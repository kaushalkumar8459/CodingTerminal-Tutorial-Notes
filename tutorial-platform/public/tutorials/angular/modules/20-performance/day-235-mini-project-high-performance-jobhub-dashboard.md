# Day 235 — Mini Project: High-Performance JobHub Dashboard

## Goal
Apply the complete performance workflow to a realistic Angular feature.

## Project
Optimize a JobHub dashboard containing job search, filters, saved jobs, company logos, analytics, large result lists, and authenticated user state.

## Requirements

### Rendering
- signal-driven local state;
- focused component boundaries;
- stable @for track identities;
- no expensive template calculations.

### Loading
- lazy-load secondary routes;
- use @defer for appropriate secondary dashboard sections;
- keep the initial critical UI small.

### Assets
- optimize job/company images;
- use NgOptimizedImage where appropriate;
- load only required font variants.

### Network
- identify duplicate requests;
- reduce unnecessary response data;
- avoid request waterfalls where possible;
- apply an appropriate caching strategy.

### Measurement
Record a baseline before optimization and repeat the same scenario after each major change.

Create a report:

~~~text
Problem:
Evidence:
Change:
Before:
After:
Trade-off:
~~~

## Final Review
1. Which bottleneck was actually measured?
2. Which optimization produced the largest meaningful improvement?
3. Which optimization was rejected because it was unnecessary?
4. What trade-offs were introduced?
5. How would you monitor this feature after deployment?

## Interview Walkthrough
Explain the project in this order:

symptom → measurement → root cause → optimization → verification → trade-off

## Outcome
You can diagnose and improve Angular performance using evidence rather than applying optimization patterns blindly.