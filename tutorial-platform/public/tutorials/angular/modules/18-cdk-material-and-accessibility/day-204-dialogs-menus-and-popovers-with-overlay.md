---
id: "angular-day-204"
title: "Dialogs, Menus and Popovers with Overlay"
slug: "dialogs-menus-and-popovers-with-overlay"
day: 204
module: 18
track: "angular"
level: "Intermediate"
---

# Day 204 — Dialogs, Menus and Popovers with Overlay

## Goal

Build floating interactions that are positioned correctly and remain usable across viewport sizes.

## Concept

Use connected positioning when content belongs to an origin element. Important concerns include origin and overlay position, fallback positions, backdrop behavior, outside clicks, Escape handling, focus management, and scrolling.

Angular Aria also provides accessible headless patterns such as menus while CDK Overlay can provide positioning infrastructure.

## Example

A user menu can be anchored to an avatar button and repositioned when the viewport changes.

    <button type="button" (click)="toggleMenu()">
      Account
    </button>

The menu must preserve keyboard navigation and focus semantics rather than only responding to pointer clicks.

## Mental Model

**Floating UI needs both positioning and interaction semantics.**

## Exercise

Create an accessible account menu and a confirmation dialog for JobHub.

## Common Mistakes

- Pointer-only menus
- No Escape handling
- Lost focus after closing
- Overlay content that can escape the viewport

## Interview Questions

1. What is connected overlay positioning?
2. Why is focus management important for dialogs?
3. How should Escape behave in modal UI?
4. What is the difference between a dialog and a popover?

## Outcome

You can design floating UI with positioning, keyboard, focus, and dismissal behavior in mind.
