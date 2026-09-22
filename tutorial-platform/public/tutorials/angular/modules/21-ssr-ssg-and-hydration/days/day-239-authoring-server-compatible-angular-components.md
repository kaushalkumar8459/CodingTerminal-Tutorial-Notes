# Day 239 — Authoring Server-Compatible Angular Components

## Goal

Write components that behave correctly when rendered outside the browser.

## Problem

Server rendering does not provide the same browser environment as client execution.

Browser-specific APIs include:

- window
- document
- localStorage
- sessionStorage
- navigator
- direct DOM manipulation

Avoid executing these APIs during server rendering.

## Better Pattern

Use Angular lifecycle/platform-specific mechanisms for browser-only work. Angular's SSR guidance recommends platform-specific providers and warns against using browser/server checks directly in templates when they cause different server and client DOM.

## Example

Prefer browser-only initialization in an appropriate render callback rather than changing the rendered template between server and browser.

## Exercise

Audit JobHub for direct browser API access and move browser-only work to an appropriate boundary.

## Common Mistakes

- Calling localStorage in a service constructor.
- Reading window during module initialization.
- Rendering different HTML on server and client.
- Using direct DOM manipulation unnecessarily.

## Interview Questions

1. Why can window fail during SSR?
2. Why is direct DOM manipulation risky?
3. Where should browser-only initialization happen?
4. Why should server and client markup remain consistent?

## Outcome

You can author components that survive server rendering safely.
