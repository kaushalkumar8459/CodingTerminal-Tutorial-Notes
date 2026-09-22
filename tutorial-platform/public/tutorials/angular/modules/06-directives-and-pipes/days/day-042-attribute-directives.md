---
id: "d6d02"
title: Attribute Directives
slug: day-042-attribute-directives
dayLabel: Day 42
level: Beginner
estimatedMinutes: 75
order: 42
track: angular
youtubeVideos: []
---

# Day 42 — Attribute Directives

## Goal

Understand attribute directives and how they attach behavior or presentation to an existing host element.

## Built-in examples

Angular provides attribute directives such as:

- NgClass
- NgStyle

These change classes or styles without creating a new component.

## Directive mental model

A directive attaches to an existing host:

    <button appHighlight>Save</button>

The button remains a button. The directive adds behavior.

## Standalone directive

    import { Directive } from '@angular/core';

    @Directive({
      selector: '[appHighlight]',
      standalone: true
    })
    export class HighlightDirective {}

Import the directive into the standalone component that uses it.

## Practical exercise

Create a HighlightDirective and apply it to:

- Job cards
- Important buttons
- Warning messages

Start with a simple static class behavior.

## Common mistakes

- Giving a directive a component-like responsibility
- Selecting elements too broadly
- Hiding important business logic inside DOM behavior
- Forgetting to import a standalone directive

## Interview questions

1. What is an attribute directive?
2. Name Angular built-in attribute directives.
3. Why does a directive use an attribute-style selector?
4. Directive vs component?

## Assignment

Create an appBadge directive that adds a visual status class.

## Outcome

You can recognize and create basic attribute directives.
