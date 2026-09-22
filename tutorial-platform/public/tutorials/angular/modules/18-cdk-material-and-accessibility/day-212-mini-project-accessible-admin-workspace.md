---
id: "angular-day-212"
title: "Mini Project — Accessible Admin Workspace"
slug: "mini-project-accessible-admin-workspace"
day: 212
module: 18
track: "angular"
level: "Intermediate"
---

# Day 212 — Mini Project — Accessible Admin Workspace

## Goal

Combine CDK, Material, responsive behavior, and accessibility into one production-style feature.

## Project

Build an **Accessible Admin Workspace** for JobHub.

## Features

### Dashboard Shell

- responsive sidebar/navigation
- keyboard-friendly navigation
- visible focus states
- meaningful landmarks and headings

### Job Management

- Material-based search and filters
- accessible status controls
- responsive job table/list
- empty, loading, and error states

### Floating UI

- accessible account menu
- confirmation dialog
- contextual action popover
- correct focus restoration

### Dynamic UI

- CDK Overlay
- Portal-based side panel
- responsive behavior with CDK utilities where needed

### Interaction

- drag-and-drop priority list
- custom drag handle
- clear keyboard alternative for important actions

### Accessibility

- semantic HTML
- labels and accessible names
- keyboard-only workflow
- focus management
- announcements for important dynamic updates
- Angular Aria for at least one custom interaction pattern

## Suggested Structure

    admin-workspace/
    ├── layout/
    ├── navigation/
    ├── jobs/
    │   ├── job-list/
    │   ├── job-filters/
    │   └── job-actions/
    ├── overlays/
    ├── accessibility/
    └── shared-ui/

## Acceptance Criteria

- No critical workflow requires a mouse.
- Focus remains visible.
- Dialog/menu interactions have predictable keyboard behavior.
- Form controls have accessible labels.
- Dynamic status changes are communicated appropriately.
- Layout works across desktop, tablet, and mobile widths.
- Material theme is centralized.
- CDK utilities are used only where they solve a real behavior problem.
- Angular Aria is used for a deliberate custom interaction.
- No any is introduced.
- Use standalone components and modern Angular control flow.

## Interview Walkthrough

Be able to explain:

1. Why CDK was used instead of a custom overlay implementation.
2. Why some UI uses Material while other UI uses native HTML.
3. How focus is managed in floating UI.
4. How accessibility was tested.
5. How responsive behavior is separated from business logic.
6. Why Angular Aria was chosen for a custom interaction.

## Outcome

You have built an accessible, responsive admin workspace using Angular CDK, Material, and Angular Aria with clear boundaries between behavior, presentation, and feature logic.
