---
title: OnDestroy and Cleanup
slug: day-073-ondestroy-and-cleanup
dayLabel: Day 73
level: Intermediate
estimatedMinutes: 70
order: 73
track: angular
youtubeVideos: []
---

# Day 73 — OnDestroy and Cleanup

## Goal

Learn how component-owned resources should be released when a component is destroyed.

## OnDestroy

    export class EditorComponent implements OnDestroy {
      ngOnDestroy(): void {
        // Release component-owned resources.
      }
    }

Cleanup may include:

- third-party widget instances
- manually created event listeners
- timers created outside Angular's automatic management
- subscriptions in legacy or RxJS-based code

## Modern cleanup

Angular provides lifecycle-aware utilities such as DestroyRef for registering cleanup close to the resource that needs it.

    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      // cleanup
    });

## Ownership rule

The code that creates a resource should make its cleanup responsibility clear.

## Exercise

Create a local timer-like resource and ensure it is cleaned up when the component is destroyed. Document who owns the resource.

## Common mistakes

- Creating resources without a cleanup plan
- Cleaning up resources owned by another service
- Keeping obsolete listeners alive after component destruction

## Interview questions

1. Why is cleanup important?
2. What is DestroyRef?
3. What kinds of resources may need explicit cleanup?

## Outcome

You can identify component-owned resources and give them a clear cleanup strategy.
