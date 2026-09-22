---
id: "angular-day-211"
title: "Accessibility Testing and Angular Aria"
slug: "accessibility-testing-and-angular-aria"
day: 211
module: 18
track: "angular"
level: "Intermediate"
---

# Day 211 — Accessibility Testing and Angular Aria

## Goal

Learn how to verify accessibility and use Angular Aria for complex interaction patterns.

## Concept

Accessibility verification should combine:

1. semantic/code review
2. keyboard-only testing
3. focus testing
4. screen-reader testing
5. automated accessibility checks
6. responsive/zoom testing

Angular Aria provides headless directives for patterns such as menus, tabs, listboxes, comboboxes, and toolbars. It handles keyboard navigation, ARIA attributes, focus management, and screen-reader support while leaving HTML and CSS to the application.

## Example

Use Angular Aria when you need a custom visual design but still want a standardized accessible interaction pattern.

    import {Menu, MenuContent, MenuItem, MenuTrigger} from '@angular/aria/menu';

## Mental Model

**Automated tests find classes of problems; human keyboard and assistive-technology testing finds interaction problems.**

## Exercise

Create a custom-styled accessible menu with Angular Aria and test it without a mouse.

## Common Mistakes

- Treating an automated audit as proof of full accessibility
- Adding ARIA without implementing the required behavior
- Replacing native controls unnecessarily
- Testing only with a mouse

## Interview Questions

1. What is Angular Aria?
2. How is Angular Aria different from Material?
3. Why is accessibility testing not only automated?
4. What is a headless UI pattern?

## Outcome

You can choose Angular Aria for custom accessible interactions and build a repeatable accessibility-testing workflow.
