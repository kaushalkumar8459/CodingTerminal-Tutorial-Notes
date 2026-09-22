---
title: ngOnChanges and Input Changes
slug: ngonchanges-and-input-changes
dayLabel: Day 71
level: Intermediate
estimatedMinutes: 75
order: 71
track: angular
youtubeVideos: []
---

# Day 71 — ngOnChanges and Input Changes

## Goal

Understand how Angular reacts when component inputs change and when ngOnChanges is appropriate.

## Modern inputs

A child component can receive a signal input:

    readonly job = input.required<Job>();

For many modern Angular cases, signals make reacting to the current input straightforward:

    readonly title = computed(() => this.job().title);

## ngOnChanges

The lifecycle API ngOnChanges remains important for maintenance and interviews. It provides metadata about input changes.

    export class JobCardComponent implements OnChanges {
      readonly job = input.required<Job>();

      ngOnChanges(changes: SimpleChanges): void {
        // Inspect relevant input changes when required.
      }
    }

Use it when you genuinely need change metadata or compatibility with an existing lifecycle-based design.

## Better modern pattern

If the requirement is simply to derive something from the input, prefer computed.

If the requirement is an imperative side effect when reactive state changes, evaluate whether effect or another appropriate API is better.

## Exercise

Build a JobCard that receives a job input and displays derived status information. Add an ngOnChanges example only for observing change metadata.

## Common mistakes

- Copying every input into local state
- Using ngOnChanges for simple derivation
- Performing expensive work on every input change

## Interview questions

1. What is ngOnChanges?
2. When is computed preferable?
3. What information does SimpleChanges provide?

## Outcome

You can distinguish input derivation from true input-change handling.
