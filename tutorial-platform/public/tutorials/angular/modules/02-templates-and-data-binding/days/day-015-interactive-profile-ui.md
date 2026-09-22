---
title: Mini Project Interactive Profile UI
slug: day-015-interactive-profile-ui
dayLabel: Day 15
level: Beginner
estimatedMinutes: 120
order: 15
track: angular
youtubeVideos: []
---

# Day 15 [Beginner]: Mini Project — Interactive Profile UI

## Goal

Combine the template and data-binding concepts from Days 8–14.

## Project

Build an **Interactive Profile UI** using standalone components.

Suggested structure:

```text
profile/
├── profile-page
├── profile-card
├── profile-editor
└── profile-summary
```

Do not add routing or services yet. The project is intentionally local and small.

## Requirements

### Profile Card

Display:

- Name
- Role
- Location
- Profile image
- Introduction

Use interpolation, property binding, attribute binding, and class binding.

### Profile Editor

Allow editing:

- Name
- Role
- Location

Use `[(ngModel)]`.

### Actions

Provide:

- Save
- Reset
- Toggle availability

Use event binding.

### Visual State

Show an Available/Not Available badge using class binding and meaningful accessibility attributes.

## Suggested State

```ts
profile = {
  name: 'Asha Sharma',
  role: 'Frontend Developer',
  location: 'Delhi',
};

isAvailable = true;
isSaving = false;
```

## Acceptance Criteria

- [ ] Application runs successfully.
- [ ] Profile values come from component state.
- [ ] Image uses property binding.
- [ ] Availability changes through an event.
- [ ] CSS class reflects availability.
- [ ] ARIA label is meaningful.
- [ ] Editor uses `[(ngModel)]`.
- [ ] Save and reset work.
- [ ] No RxJS.
- [ ] No service.
- [ ] No routing.
- [ ] No HTTP/API.
- [ ] No external state library.

## Why Routing Comes Next

The learner now has multiple meaningful UI areas. The next natural problem is:

**How do we navigate between different screens without putting everything into one component?**

That is why Routing comes next.

## Final Challenge

Add an Edit mode.

- View mode displays the profile.
- Edit mode displays the editor.
- A button switches modes.
- Save returns to view mode.
- Cancel restores the previous values.

Do not introduce routing yet.

## Interview Questions

**Interpolation vs property binding?** Interpolation is primarily text-oriented; property binding intentionally binds an expression to a DOM or directive property.

**What does event binding do?** Connects browser events to Angular template logic.

**What does two-way binding do?** Synchronizes supported control state with component state.

**Why keep templates simple?** It improves readability, maintainability, and reasoning.

## Module Completion

Before starting Routing, explain:

- Templates
- Interpolation
- Property binding
- Attribute binding
- Class/style binding
- Event binding
- Two-way binding
- `ngModel` and `FormsModule`
- Template vs component responsibilities
