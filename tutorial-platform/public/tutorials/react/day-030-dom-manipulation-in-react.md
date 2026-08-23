---
title: DOM Manipulation in React
description: Learn React-first DOM manipulation, refs, effects, measurement, focus, scrolling, media APIs, and third-party DOM ownership.
slug: day-030-dom-manipulation-in-react
dayLabel: Day 30
level: Intermediate
estimatedMinutes: 150
order: 30
track: react
---
# Day 30 [Intermediate]: DOM Manipulation in React

## Goal

Learn how to perform necessary imperative DOM operations without abandoning React's declarative model.

> Let React own application UI. Use refs and DOM APIs for narrow imperative escape hatches such as focus, scrolling, measurement, media control, and isolated third-party integrations.

## Prerequisites

- Day 29: `useRef`
- `useState`
- `useEffect`
- basic DOM APIs
- controlled forms
- cleanup functions

## Learning Outcomes

By the end of this day, you can:

- explain declarative vs imperative UI
- decide when a DOM ref is appropriate
- focus and select an element safely
- scroll to an element after it is committed
- control media elements through refs
- measure DOM layout correctly
- distinguish `useEffect` from `useLayoutEffect`
- use `ResizeObserver` for changing dimensions
- understand callback refs
- isolate third-party DOM ownership
- implement cleanup for imperative resources
- avoid competing DOM sources of truth
- account for Strict Mode development behavior
- avoid browser-only APIs during server rendering
- build accessible focus and scrolling behavior

