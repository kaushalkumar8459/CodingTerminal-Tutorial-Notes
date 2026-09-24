---
id: "d6d04"
title: Host Bindings and Host Listeners
slug: day-044-host-bindings-and-host-listeners
dayLabel: Day 44
level: Intermediate
estimatedMinutes: 90
order: 44
track: angular
youtubeVideos: []
---

# Day 44 — Host Bindings and Host Listeners

## Goal

Control host element properties and respond to host events from a directive.

## Host binding

A directive can expose a host property or class:

    @HostBinding('class.highlighted')
    highlighted = false;

Modern Angular also supports the host metadata API:

    @Directive({
      selector: '[appHighlight]',
      host: {
        '[class.highlighted]': 'highlighted'
      }
    })

Prefer the host metadata approach for new code when it keeps the directive contract clear.

## Host events

A directive can react to host events:

    @Directive({
      selector: '[appHoverHighlight]',
      host: {
        '(mouseenter)': 'setHovered(true)',
        '(mouseleave)': 'setHovered(false)'
      }
    })

## Practical exercise

Create a HoverCardDirective that:

- Adds a visual class on pointer enter.
- Removes it on pointer leave.
- Works on cards and buttons.
- Does not manipulate global state.

## Common mistakes

- Direct DOM manipulation when Angular bindings are enough
- Listening to unnecessary global events
- Building complex application workflows in directives
- Making a directive dependent on one page

## Interview questions

1. What is host binding?
2. What is a host listener?
3. Why keep host behavior local?
4. Why prefer Angular bindings over manual DOM mutation?

## Assignment

Create a FocusRingDirective that manages a visual focus state.

## Outcome

You can build reusable directives that respond to host events and expose host state.
