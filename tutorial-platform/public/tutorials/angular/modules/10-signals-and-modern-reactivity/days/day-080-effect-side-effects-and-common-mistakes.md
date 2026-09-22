---
id: "angular-day-080"
title: "effect() — Side Effects and Common Mistakes"
slug: "day-080-effect-side-effects-and-common-mistakes"
dayLabel: Day 80
level: Intermediate
estimatedMinutes: 75
order: 80
track: angular
youtubeVideos: []
---
# Day 80 — effect() — Side Effects and Common Mistakes

## Goal
Use effect() for genuine side effects, not for ordinary state derivation.

## Example
```ts
readonly theme = signal('light');

constructor() {
  effect(() => {
    localStorage.setItem('theme', this.theme());
  });
}
```

Effects run when the signals they read change and are intended for synchronization with imperative or non-signal APIs.

## Do Not Do This
```ts
effect(() => {
  this.total.set(this.price() * this.quantity());
});
```

Prefer computed():

```ts
readonly total = computed(() => this.price() * this.quantity());
```

Angular recommends computed() for derived values and linkedSignal() for writable derived state; effects should be used when a side effect is actually required.

## Cleanup
Effects can register cleanup logic with onCleanup. Angular also cleans up component-associated effects when the component is destroyed.

## Exercise
Persist a theme preference to localStorage with one justified effect.

## Common Mistakes
- Effect for derived state.
- Effect chains.
- Circular updates.
- Heavy work in effects.
- Ignoring injection-context requirements.

## Interview Questions
1. What is effect()?
2. When should it be used?
3. Why not use it instead of computed()?
4. How does cleanup work?

## Outcome
You can distinguish derivation from side effects.
