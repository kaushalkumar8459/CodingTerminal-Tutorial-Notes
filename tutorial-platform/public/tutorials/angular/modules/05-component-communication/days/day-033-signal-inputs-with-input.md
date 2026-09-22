---
id: "c5d02"
title: Signal Inputs with input()
slug: day-033-signal-inputs-with-input
dayLabel: Day 33
level: Beginner
estimatedMinutes: 75
order: 33
track: angular
youtubeVideos: []
---

# Day 33 — Signal Inputs with input()

## Goal

Pass data from a parent component to a child using Angular's signal-based input API.

## Basic example

Child:

    import { Component, input } from '@angular/core';

    export class JobCardComponent {
      readonly title = input.required<string>();
    }

Template:

    <h3>{{ title() }}</h3>

Parent:

    <app-job-card [title]="job.title" />

An input is read like a signal, so use parentheses in TypeScript and templates when reading it.

## Optional input

    readonly subtitle = input<string>('');

## Required input

    readonly job = input.required<Job>();

Required inputs make the component contract explicit.

## Input transforms and derived values

Use an input transform when a value needs a simple normalization. Use computed() for values derived from inputs.

Avoid putting unrelated business workflows into input definitions.

## Practical exercise

Create a reusable JobCardComponent with:

- required job input
- optional highlighted input
- computed display text
- template rendering

Use the parent job list to supply the values.

## Common mistakes

- Mutating input state directly
- Forgetting that an input signal is read with ()
- Making every input required without a reason
- Passing large objects when a small explicit contract is enough

## Interview questions

1. What does input() return?
2. How do you declare a required input?
3. Why are signal inputs useful?
4. Can a child mutate an input?

## Assignment

Build a ProductCard using input.required().

## Outcome

You can define clear parent-to-child contracts with modern signal inputs.
