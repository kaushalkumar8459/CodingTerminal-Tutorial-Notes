---
id: angular-day-261
title: State Architecture at Enterprise Scale
day: 261
module: 23
---

# Day 261 — State Architecture at Enterprise Scale

## Goal

Decide where state belongs before choosing a state-management mechanism.

## State ownership

Classify state as:

- component-local UI state
- feature state
- shared application state
- server state
- form state
- URL state

Examples:

~~~text
isFilterPanelOpen → local UI state
jobSearchResults  → feature/server state
currentUser       → application state
searchQuery       → URL state
applicationForm   → form state
~~~

## Architecture rule

Keep state as close as practical to the feature that owns it. Do not put every signal or observable into a global store.

## SignalStore

SignalStore can be useful when a feature has multiple consumers, derived state, async workflows, coordinated updates, and a clear state boundary.

A simple component should not require a global store just to hold one boolean.

## Exercise

For JobHub, classify 20 state values into the six categories above. Identify state that should move out of a component, state that should move out of global storage, and duplicated state that can be derived.

## Common mistakes

- Globalizing everything.
- Duplicating server data in several stores.
- Storing derived values instead of computing them.
- Mixing form state with application state.

## Outcome

You can design state ownership before selecting Signals, services, SignalStore, or another mechanism.
