---
id: "angular-day-202"
title: "CDK Layout and Responsive Utilities"
slug: "cdk-layout-and-responsive-utilities"
day: 202
module: 18
track: "angular"
level: "Intermediate"
---

# Day 202 — CDK Layout and Responsive Utilities

## Goal

Build responsive UI behavior without scattering viewport checks throughout components.

## Concept

Responsive layout should primarily be handled by CSS. Use Angular/CDK utilities when JavaScript behavior genuinely needs to react to viewport or layout changes.

Focus on:

- responsive CSS first
- BreakpointObserver for behavior changes
- MediaMatcher when direct media-query matching is needed
- keeping viewport logic at the feature boundary

## Example

A dashboard can keep its sidebar visible on desktop and switch to compact navigation on smaller screens.

    import {inject} from '@angular/core';
    import {BreakpointObserver} from '@angular/cdk/layout';

    private readonly breakpointObserver = inject(BreakpointObserver);

    readonly isHandset = this.breakpointObserver.observe('(max-width: 768px)');

For UI state derived from an observable, integrate it deliberately with Angular signal/RxJS interop rather than duplicating subscriptions.

## Mental Model

**CSS controls layout; Angular reacts only when behavior must change.**

## Exercise

Make the JobHub admin shell responsive for desktop, tablet, and mobile.

## Common Mistakes

- Reading window.innerWidth everywhere
- Duplicating breakpoint logic in many components
- Using JavaScript for CSS-only layout decisions

## Interview Questions

1. When should CSS handle responsiveness?
2. What is BreakpointObserver?
3. Why should viewport logic have a clear ownership boundary?

## Outcome

You can build responsive Angular features without coupling business logic to screen dimensions.
