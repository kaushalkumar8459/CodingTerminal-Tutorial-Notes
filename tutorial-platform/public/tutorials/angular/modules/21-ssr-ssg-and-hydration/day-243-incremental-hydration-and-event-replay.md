# Day 243 — Incremental Hydration and Event Replay

## Goal

Understand advanced hydration for applications where the entire page does not need to become interactive immediately.

## Incremental Hydration

Incremental hydration works with @defer blocks so parts of an SSR application can remain dehydrated and become interactive according to their triggers. Current Angular hydration configuration enables incremental hydration by default. citeturn0search1turn0search4

## Event Replay

Event replay captures supported user events that occur before hydration completes and replays them after the relevant application code is ready. citeturn0search9

## Example Thinking

A public JobHub page might render:

- job summary immediately;
- reviews as deferred content;
- advanced recommendations later.

The goal is not to defer everything. It is to keep important content available while delaying unnecessary interactivity.

## Exercise

Design a JobHub job-detail page with one immediately interactive region and two deferred regions. Explain the hydration triggers.

## Common Mistakes

- Deferring critical interactions.
- Assuming every deferred component improves performance.
- Forgetting that deferred content still needs correct server rendering.
- Adding custom hydration configuration without understanding defaults.

## Interview Questions

1. What is incremental hydration?
2. How does @defer relate to hydration?
3. What is event replay?
4. Why might incremental hydration improve startup performance?

## Outcome

You understand how SSR, @defer, hydration, and event replay fit together.
