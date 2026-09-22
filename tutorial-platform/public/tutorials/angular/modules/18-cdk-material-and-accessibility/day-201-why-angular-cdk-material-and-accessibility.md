---
id: "angular-day-201"
title: "Why Angular CDK, Material and Accessibility?"
slug: "why-angular-cdk-material-and-accessibility"
day: 201
module: 18
track: "angular"
level: "Intermediate"
---

# Day 201 — Why Angular CDK, Material and Accessibility?

## Goal

Understand why Angular applications need reusable behavior primitives, UI components, and accessibility practices.

## Concept

Think in layers:

1. Native HTML and browser behavior
2. Angular component composition
3. CDK behavior primitives
4. Material visual components
5. Accessibility semantics and interaction

CDK provides behavior primitives without forcing a visual design. Material provides reusable UI components. Accessibility makes the resulting application usable by people with different interaction and assistive-technology needs.

## Example

A modal feature may use native buttons and headings, CDK Overlay for positioning, CDK accessibility utilities for focus management, and Material when a ready-made component is appropriate.

## Mental Model

**CDK = behavior toolbox. Material = component library. Accessibility = usability requirement.**

## Exercise

Take an existing JobHub screen and identify three places where native HTML, CDK, or Material would be appropriate.

## Common Mistakes

- Using Material for every element
- Building custom keyboard behavior unnecessarily
- Treating accessibility as optional
- Replacing semantic HTML with generic elements

## Interview Questions

1. What is Angular CDK?
2. How is CDK different from Angular Material?
3. Why should native HTML be preferred when it already provides the required behavior?
4. What does accessibility mean for an Angular component?

## Outcome

You can choose the appropriate UI layer instead of reaching for a library automatically.
