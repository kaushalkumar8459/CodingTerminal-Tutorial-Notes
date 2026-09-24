---
id: "angular-day-205"
title: "CDK Portal and Dynamic Content"
slug: day-205-cdk-portal-and-dynamic-content
day: 205
module: 18
track: "angular"
level: "Intermediate"
---

# Day 205 — CDK Portal and Dynamic Content

## Goal

Understand how CDK Portal separates content from the location where it is rendered.

## Concept

A portal represents attachable content. Common concepts include Portal, TemplatePortal, ComponentPortal, and PortalOutlet.

This is useful for dynamic panels, overlays, reusable shells, and feature-driven content placement.

## Example

A template can be attached to an overlay when a user opens a contextual panel.

    const portal = new TemplatePortal(templateRef, viewContainerRef);
    overlayRef.attach(portal);

For component-driven content, a ComponentPortal can create the component at runtime.

## Mental Model

**The component owns content; the portal decides where that content is rendered.**

## Exercise

Build a reusable admin side panel whose content can be attached to an overlay.

## Common Mistakes

- Using dynamic rendering when ordinary composition is simpler
- Losing ownership of cleanup
- Creating hidden dependency chains between portal content and its host

## Interview Questions

1. What is a Portal?
2. When would you use TemplatePortal?
3. When is ComponentPortal useful?
4. How does Portal relate to Overlay?

## Outcome

You can use CDK Portal for deliberate dynamic content composition.
