---
id: "angular-day-206"
title: "Drag and Drop"
slug: "drag-and-drop"
day: 206
module: 18
track: "angular"
level: "Intermediate"
---

# Day 206 — Drag and Drop

## Goal

Build sortable and transferable interfaces with Angular CDK Drag and Drop.

## Concept

Important APIs include cdkDrag, cdkDropList, cdkDragHandle, cdkDropListConnectedTo, and cdkDropListDropped.

The CDK supports free dragging, sortable lists, transferring items between lists, custom handles, previews, placeholders, axis locking, and drag delays.

## Example

    <div cdkDropList (cdkDropListDropped)="drop($event)">
      @for (job of jobs(); track job.id) {
        <article cdkDrag [cdkDragData]="job">
          {{ job.title }}
        </article>
      }
    </div>

Keep the underlying state update immutable and explicit.

## Mental Model

**CDK handles interaction; your feature owns the resulting state.**

## Exercise

Create a Kanban board with Open, In Progress, and Done columns.

## Common Mistakes

- Mutating state without understanding the resulting change
- Forgetting keyboard/accessibility considerations
- Using drag and drop where a simpler action is better
- Making the whole card draggable when only a handle should initiate dragging

## Interview Questions

1. What is cdkDropList?
2. How do you move an item between lists?
3. Why use cdkDragData?
4. How can dragging be restricted to a handle?

## Outcome

You can implement practical sortable and cross-list drag-and-drop experiences.
