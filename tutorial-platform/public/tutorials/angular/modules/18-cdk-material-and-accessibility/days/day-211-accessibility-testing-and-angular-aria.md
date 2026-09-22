---
id: "angular-day-211"
title: "Accessibility Testing and Angular Aria"
slug: day-211-accessibility-testing-and-angular-aria
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

Angular Aria provides headless directives for common WAI-ARIA interaction patterns. It handles keyboard navigation, ARIA attributes, focus management, and screen-reader support while leaving HTML structure and CSS to the application.

**Angular 21 status:** Angular Aria was introduced in Angular 21 as a **Developer Preview**, not a stable API. The Angular v21 API reference marks its Aria APIs as Developer Preview. Developer Preview APIs can change outside Angular's normal stability/deprecation guarantees. Therefore, this lesson teaches Angular Aria as an important modern capability to evaluate, but not as a stable production dependency for an Angular 21 project. Angular Aria became stable in Angular 22, so always check the target Angular version before adopting or upgrading it.

## Example

Use Angular Aria when you need a custom visual design and want a standardized accessible interaction pattern, while checking the target Angular version and API maturity first.

For Angular 21, keep native HTML, CDK accessibility utilities, and Angular Material available as stable alternatives depending on the requirement.

    import {Menu, MenuContent, MenuItem, MenuTrigger} from '@angular/aria/menu';

## Angular Aria vs Other Angular Accessibility Tools

| Requirement | Typical choice |
|---|---|
| Standard interaction | Native HTML |
| Focus/announcement utilities | CDK a11y |
| Custom-styled accessible interaction pattern | Angular Aria |
| Ready-made styled UI component | Angular Material |

These tools are complementary rather than interchangeable.

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
5. What was Angular Aria's maturity status in Angular 21?
6. Why should Angular Aria examples be checked against the target Angular version?

## Outcome

You can choose Angular Aria for custom accessible interactions and build a repeatable accessibility-testing workflow.
