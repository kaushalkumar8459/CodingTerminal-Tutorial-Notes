---
title: Modern Lifecycle Utilities and Render Callbacks
slug: day-074-modern-lifecycle-utilities-and-render-callbacks
dayLabel: Day 74
level: Advanced
estimatedMinutes: 80
order: 74
track: angular
youtubeVideos: []
---

# Day 74 — Modern Lifecycle Utilities and Render Callbacks

## Goal

Learn modern Angular lifecycle utilities and understand when post-render callbacks are more appropriate than traditional hooks.

## DestroyRef

DestroyRef provides a lifecycle-aware way to register destruction behavior.

    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      console.log('cleanup');
    });

This is useful in services or reusable functions that need access to the lifetime of the current injection context.

## Render callbacks

Some operations need to happen after Angular has rendered. Modern Angular provides render callback APIs for these cases.

Use them for work such as view-dependent browser integration when ordinary bindings are not enough.

## Avoid lifecycle cargo cult

Do not replace every ngAfterViewInit with a render callback automatically. First identify the exact timing requirement.

Ask:

1. Is this initialization?
2. Is this reacting to input/state?
3. Does this require the view?
4. Does this need to happen after rendering?
5. Does this resource need destruction cleanup?

## Exercise

Take three lifecycle examples from previous days and classify each as initialization, input reaction, view interaction, post-render work, or cleanup.

## Interview questions

1. What problem does DestroyRef solve?
2. When are render callbacks useful?
3. Why should lifecycle APIs be chosen based on timing?

## Outcome

You can select a modern lifecycle utility based on the actual runtime requirement.
