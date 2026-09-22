---
id: "angular-day-203"
title: "CDK Overlay Fundamentals"
slug: day-203-cdk-overlay-fundamentals
day: 203
module: 18
track: "angular"
level: "Intermediate"
---

# Day 203 — CDK Overlay Fundamentals

## Goal

Understand how Angular CDK Overlay creates floating UI outside the normal component layout.

## Concept

Overlays are useful for menus, popovers, tooltips, dialogs, contextual actions, and floating panels.

Core concepts:

- Overlay
- OverlayRef
- position strategies
- backdrop
- scroll strategies
- portal attachment

## Example

A feature can create a centered overlay with a backdrop and attach dynamic content to it.

    const overlayRef = overlay.create({
      hasBackdrop: true,
      positionStrategy: overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

## Mental Model

**Create overlay → configure position → attach content → respond to close events → dispose.**

## Exercise

Build a reusable confirmation overlay that supports confirm and cancel actions.

## Common Mistakes

- Forgetting to dispose overlays
- Hard-coding viewport coordinates
- Ignoring scroll and viewport boundaries
- Mixing overlay infrastructure with business logic

## Interview Questions

1. What problem does CDK Overlay solve?
2. What is OverlayRef?
3. What is a position strategy?
4. Why must dynamically created overlays be cleaned up?

## Outcome

You understand the infrastructure behind floating Angular UI.
