# Day 243 — Incremental Hydration and Event Replay

## Goal

Understand how Angular can delay hydration of deferred sections while preserving a usable server-rendered page.

## Incremental Hydration

Incremental hydration builds on:

- SSR;
- hydration;
- `@defer`;
- hydration triggers;
- event replay.

Current Angular enables incremental hydration by default as part of `provideClientHydration()`. It can be disabled with `withNoIncrementalHydration()` when a project has a specific reason.

A deferred block can use a `hydrate` trigger to control when its server-rendered content becomes hydrated on the client.

## Event Replay

A user can interact with visible server-rendered content before its client event listeners are ready.

Event replay captures supported events and replays them after the relevant code is hydrated.

Incremental hydration enables event replay automatically. If incremental hydration is enabled, adding `withEventReplay()` separately is unnecessary.

## Example

A JobHub job-detail page could:

- render the job summary immediately;
- defer recommendations;
- defer a secondary analytics widget;
- hydrate the recommendations only when the user reaches or interacts with that area.

The important question is **what can safely remain non-interactive for a while?**

## Important Distinction

`@defer` is a code-loading/rendering primitive. Incremental hydration adds hydration timing to deferred content in an SSR application.

Do not treat every `@defer` block as automatically appropriate for hydration deferral.

## Exercise

Design three JobHub `@defer` regions and choose a hydration trigger for each. Explain why the primary job actions remain available.

## Common Mistakes

- Deferring critical interactions.
- Adding hydration triggers without understanding user interaction.
- Assuming incremental hydration means "hydrate everything later."
- Manually enabling event replay when the current incremental-hydration configuration already enables it.

## Interview Questions

1. What is incremental hydration?
2. How does `@defer` participate in incremental hydration?
3. What problem does event replay solve?
4. What is the current relationship between incremental hydration and event replay?

## Outcome

You can explain and design incremental hydration without confusing it with ordinary lazy loading.
