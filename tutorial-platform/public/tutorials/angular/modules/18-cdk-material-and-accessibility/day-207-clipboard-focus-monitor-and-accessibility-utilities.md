---
id: "angular-day-207"
title: "Clipboard, Focus Monitor and Accessibility Utilities"
slug: "clipboard-focus-monitor-and-accessibility-utilities"
day: 207
module: 18
track: "angular"
level: "Intermediate"
---

# Day 207 — Clipboard, Focus Monitor and Accessibility Utilities

## Goal

Use focused CDK utilities instead of rebuilding browser interaction infrastructure.

## Concept

Explore:

- CDK Clipboard for copy operations
- FocusMonitor for understanding how focus arrived
- LiveAnnouncer for announcing important dynamic messages
- cdkTrapFocus for constrained focus areas
- keyboard-oriented interaction design

## Example

A job reference can expose a copy action while announcing the result to assistive technology.

    <button type="button" (click)="copyJobId()">
      Copy job ID
    </button>

The visible confirmation and screen-reader announcement should represent the same state change.

## Mental Model

**Focus is state. Announcements are UI output. Accessibility utilities help synchronize interaction and communication.**

## Exercise

Add copy-to-clipboard and accessible status announcements to JobHub.

## Common Mistakes

- Using alerts for every status message
- Trapping focus without an escape path
- Removing visible focus indicators
- Assuming mouse interaction represents keyboard interaction

## Interview Questions

1. What does FocusMonitor help with?
2. Why is LiveAnnouncer useful?
3. When should focus be trapped?
4. Why should keyboard focus remain visible?

## Outcome

You can improve interaction quality with focused CDK accessibility utilities.
