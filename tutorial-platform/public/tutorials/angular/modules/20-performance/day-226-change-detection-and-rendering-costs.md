# Day 226 — Change Detection and Rendering Costs

## Goal
Understand how Angular keeps the DOM synchronized and why rendering work can become expensive.

## Concept
Change detection determines whether application state requires DOM updates. The useful question is not only whether change detection runs, but how much work happens during checking and rendering.

Expensive template expressions, large component trees, repeated DOM work, and unnecessary updates can increase cost.

## Mental Model
state change → Angular notification → view checking → template evaluation → DOM update

## Exercise
Find three JobHub template expressions that could become expensive as data grows. Decide whether each should be computed, cached, moved into state, or left alone.

## Common Mistakes
- Assuming every check recreates every DOM node.
- Calling expensive functions repeatedly from templates.
- Optimizing before measuring.

## Interview Questions
1. What is change detection?
2. What makes template rendering expensive?
3. Does every check recreate the DOM?
4. Why are expensive template computations risky?

## Outcome
You can reason about rendering cost instead of treating change detection as a black box.