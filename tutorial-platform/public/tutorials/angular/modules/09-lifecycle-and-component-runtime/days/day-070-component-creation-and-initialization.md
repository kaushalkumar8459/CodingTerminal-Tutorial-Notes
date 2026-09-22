---
title: Component Creation and Initialization
slug: day-070-component-creation-and-initialization
dayLabel: Day 70
level: Intermediate
estimatedMinutes: 70
order: 70
track: angular
youtubeVideos: []
---

# Day 70 — Component Creation and Initialization

## Goal

Understand component creation and initialization, especially constructor/class initialization versus Angular lifecycle callbacks.

## Creation versus initialization

A class instance is created first. Angular then establishes its component context and processes inputs and the view through its lifecycle.

Keep constructors simple. Use them for basic class initialization and DI setup rather than application workflows.

## OnInit

    export class ProfileComponent implements OnInit {
      ngOnInit(): void {
        console.log('Component initialized');
      }
    }

Use ngOnInit for initialization that depends on Angular having initialized the component's inputs.

## Signals and initialization

If a value can be represented directly by a signal or computed value, do that instead of creating lifecycle code merely to copy state.

## Exercise

Create a profile component with inputs and derived display state. Identify which values require initialization and which should be computed.

## Common mistakes

- Putting every setup operation in the constructor
- Using ngOnInit for simple derived values
- Copying input values into duplicate local state without a reason

## Interview questions

1. Difference between constructor and ngOnInit?
2. When is ngOnInit useful?
3. Should computed state be initialized manually?

## Outcome

You understand initialization timing and can avoid unnecessary lifecycle code.
