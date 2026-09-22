# Day 225 — Why Angular Performance Matters

## Goal
Understand performance as an engineering problem and learn to separate symptoms from bottlenecks.

## Concept
Performance includes initial load, JavaScript execution, rendering, interaction latency, network work, assets, memory, and perceived responsiveness.

## Mental Model
request → download → parse → execute → render → interact

Optimize the stage that is actually slow.

## Exercise
Audit one JobHub page and identify a possible bottleneck in each stage.

## Common Mistakes
- Optimizing without measuring.
- Treating bundle size as the only metric.
- Adding memoization everywhere.
- Removing useful functionality for synthetic benchmarks.

## Interview Questions
1. Load performance vs runtime performance?
2. Why profile before optimizing?
3. What is a request waterfall?
4. Why can a small bundle still feel slow?

## Outcome
You can classify a performance problem before choosing a solution.