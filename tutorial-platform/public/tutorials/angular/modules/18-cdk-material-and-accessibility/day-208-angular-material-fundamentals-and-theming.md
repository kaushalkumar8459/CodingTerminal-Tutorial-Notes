---
id: "angular-day-208"
title: "Angular Material Fundamentals and Theming"
slug: "angular-material-fundamentals-and-theming"
day: 208
module: 18
track: "angular"
level: "Intermediate"
---

# Day 208 — Angular Material Fundamentals and Theming

## Goal

Understand when Angular Material is appropriate and how to establish a consistent visual system.

## Concept

Angular Material is Angular's reusable UI component library. It builds on CDK behavior and provides components designed with accessibility in mind.

Learn:

- installing and configuring Material
- standalone component imports
- typography
- theme tokens and configuration
- density
- color roles
- component customization
- light/dark theme architecture

## Example

Prefer importing only the Material components used by a standalone feature.

    @Component({
      standalone: true,
      imports: [MatButton],
    })
    export class SaveButton {}

Keep application-specific branding in a theme layer instead of scattering overrides throughout components.

## Mental Model

**Design tokens create consistency; components consume the design system.**

## Exercise

Create a JobHub Material theme with consistent buttons, form fields, cards, navigation, and feedback components.

## Common Mistakes

- Global CSS overrides everywhere
- Mixing several unrelated design systems
- Ignoring contrast and focus states
- Importing components without understanding their accessibility behavior

## Interview Questions

1. Why use Angular Material?
2. How is Material related to CDK?
3. What is a design token?
4. Why should theme configuration be centralized?

## Outcome

You can introduce Material without turning the application into an unstructured collection of UI components.
