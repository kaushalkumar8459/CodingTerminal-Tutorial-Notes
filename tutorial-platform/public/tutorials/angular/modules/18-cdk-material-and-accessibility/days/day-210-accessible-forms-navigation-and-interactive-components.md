---
id: "angular-day-210"
title: "Accessible Forms, Navigation and Interactive Components"
slug: day-210-accessible-forms-navigation-and-interactive-components
day: 210
module: 18
track: "angular"
level: "Intermediate"
---

# Day 210 — Accessible Forms, Navigation and Interactive Components

## Goal

Make everyday Angular screens usable with keyboard and assistive technology.

## Concept

Apply accessibility to labels and form errors, headings and landmarks, buttons and links, menus and dialogs, keyboard focus order, disabled/loading states, validation messaging, and route navigation.

Prefer native semantic elements. For dynamic ARIA values, use Angular attribute binding such as [attr.aria-label].

## Example

    <label for="job-search">Search jobs</label>
    <input id="job-search" type="search" [value]="query()" />

    <button
      type="button"
      [attr.aria-label]="'Save ' + job.title"
      (click)="save(job)"
    >
      Save
    </button>

## Mental Model

**Semantic HTML first, ARIA when needed, custom interaction only when justified.**

## Exercise

Audit the JobHub application using only keyboard navigation.

## Common Mistakes

- Placeholder used as the only label
- Icon-only buttons without accessible names
- Poor heading hierarchy
- Removing focus outlines
- Error messages that are invisible to assistive technology

## Interview Questions

1. Why prefer semantic HTML?
2. When should ARIA be used?
3. How do you provide an accessible name?
4. What makes form validation accessible?

## Outcome

You can design common Angular screens with accessibility built into their structure.
