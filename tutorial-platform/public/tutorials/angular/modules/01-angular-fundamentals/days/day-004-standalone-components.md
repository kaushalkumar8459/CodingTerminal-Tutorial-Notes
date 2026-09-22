---
title: Standalone Components
slug: day-004-standalone-components
dayLabel: Day 4
level: Beginner
estimatedMinutes: 75
order: 4
track: angular
youtubeVideos: []
---

# Day 4 [Beginner]: Standalone Components

## Goal

Understand components, standalone components, selectors and component composition.

## Prerequisites

- Days 1–3 completed
- Working Angular project

## 1. Why Components?

A real application contains many UI responsibilities.

Example:

~~~text
Profile App
├── Header
├── ProfileCard
├── Skills
└── Footer
~~~

Components let us divide the UI into understandable pieces.

## 2. What is a Component?

A component is a fundamental building block of Angular UI.

Conceptually:

~~~text
Component
├── Class      → logic and state
├── Template   → UI
└── Styles     → presentation
~~~

## 3. Standalone Components

Modern Angular applications use standalone components.

A simplified component:

~~~ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  template: '<h2>Profile</h2>'
})
export class ProfileCardComponent {}
~~~

In modern Angular, standalone is the normal approach and generated components may not need an explicit standalone property.

The important idea is that the component can declare the dependencies its template needs directly.

## 4. Generate a Component

Run:

~~~bash
ng generate component profile-card
~~~

or:

~~~bash
ng g c profile-card
~~~

The exact generated filenames depend on CLI configuration and Angular version.

## 5. Component Selector

A component has a selector.

Example:

~~~ts
@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCardComponent {}
~~~

Another component can use it:

~~~html
<app-profile-card />
~~~

The class name and selector are different concepts:

~~~text
ProfileCardComponent → TypeScript class
app-profile-card      → template selector
~~~

## 6. Using a Standalone Component

A parent component can import the child:

~~~ts
@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent],
  template: '<app-profile-card />'
})
export class AppComponent {}
~~~

The import path depends on your project structure.

The flow is:

~~~text
Parent
  ↓
imports child
  ↓
Template uses selector
  ↓
Child renders
~~~

## 7. Why Standalone?

Standalone components make dependencies explicit and remove the need for an NgModule just to declare the component.

This creates a simple mental model:

~~~text
Component
  ↓
Its imports
  ↓
Its template dependencies
~~~

## 8. Standalone vs Legacy NgModule

Older applications may contain:

~~~text
AppModule
FeatureModule
SharedModule
CoreModule
~~~

You should understand these patterns for maintenance.

For new code in this course:

> Standalone components are the primary approach.

NgModules will be covered later as a legacy/maintenance topic.

## 9. Practical Example

Create ProfileCard.

Class:

~~~ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCardComponent {}
~~~

Template:

~~~html
<article>
  <h2>Angular Learner</h2>
  <p>Frontend Developer</p>
</article>
~~~

Styles:

~~~scss
article {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
}
~~~

Import the component into the root component and render it.

## 10. Component Boundaries

Good boundaries have meaningful responsibilities:

~~~text
ProfileCard
SearchBar
Navigation
Footer
~~~

Avoid vague components such as:

~~~text
EverythingComponent
CommonComponent
MainComponent
~~~

Do not create a component simply to increase the number of files.

## Common Mistakes

- Forgetting to import a standalone component into the consuming component.
- Confusing a selector with a class name.
- Creating giant components.
- Starting with legacy NgModule patterns.
- Creating components for every small HTML element.

## Hands-on Practice

1. Generate profile-card.
2. Create its template.
3. Add styles.
4. Import it into the root component.
5. Render it.
6. Generate profile-header.
7. Render both components.

Multiple components now exist, but they do not need complex communication yet.

## Interview Questions

### What is a standalone component?

A component that can declare its template dependencies directly without requiring an NgModule declaration.

### Why use standalone components?

They simplify dependency management and make template dependencies explicit.

### What is a selector?

The template-facing identifier used to reference a component.

### Are NgModules irrelevant?

No. Existing applications may use them and developers may need to maintain them. They are not the primary new-code approach in this course.

## Assignment

Build:

~~~text
Profile App
├── ProfileHeader
├── ProfileCard
└── ProfileFooter
~~~

Requirements:

- All are standalone components.
- Root component imports and renders them.
- Each component has a clear responsibility.
- Do not add services or state management.

## Self Check

Explain:

- Component
- Standalone component
- Selector
- Component class
- Component template
- Component composition

## Day 4 Outcome

You can now create and compose standalone Angular components.

Next: **Component Templates and Styles**.
