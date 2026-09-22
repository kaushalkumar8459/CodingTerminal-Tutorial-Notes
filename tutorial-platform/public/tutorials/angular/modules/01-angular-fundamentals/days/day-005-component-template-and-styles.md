---
title: Component Template and Styles
slug: day-005-component-template-and-styles
dayLabel: Day 5
level: Beginner
estimatedMinutes: 75
order: 5
track: angular
youtubeVideos: []
---

# Day 5 [Beginner]: Component Template and Styles

## Goal

Learn how a component class, template and styles work together.

## Prerequisites

- Days 1–4 completed
- Basic HTML and CSS

## 1. Why Templates and Styles?

Yesterday we created components.

Now we need to give them useful UI.

A component commonly contains:

~~~text
Component
├── TypeScript class
├── HTML template
└── Component styles
~~~

## 2. Template

A template is the HTML-based view associated with a component.

Example:

~~~html
<article>
  <h2>Angular Developer</h2>
  <p>Build modern web applications.</p>
</article>
~~~

A component can use an inline template:

~~~ts
@Component({
  selector: 'app-job-card',
  template: '<h2>Angular Developer</h2>'
})
export class JobCardComponent {}
~~~

Or an external template:

~~~ts
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.html'
})
export class JobCardComponent {}
~~~

External templates are often easier to maintain as the UI grows.

## 3. Component Styles

A component can have its own stylesheet:

~~~ts
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss'
})
export class JobCardComponent {}
~~~

Example:

~~~scss
article {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
}
~~~

## 4. Component vs Global Styles

Component styles belong to a component's UI.

Global styles are for application-wide concerns such as:

- Base typography
- CSS variables
- Reset rules
- Global layout rules

Do not put every component's CSS into the global stylesheet.

## 5. Style Encapsulation

Angular normally scopes component styles so they do not unintentionally affect unrelated components.

The exact behavior depends on the configured view encapsulation mode.

For now remember:

> Keep component-owned styling with the component.

## 6. Component Class and Template Data

The class can contain state:

~~~ts
export class ProfileCardComponent {
  name = 'Angular Learner';
  role = 'Frontend Developer';
}
~~~

The template can display it:

~~~html
<h2>{{ name }}</h2>
<p>{{ role }}</p>
~~~

This introduces interpolation naturally because the UI needs to display component data.

Data binding is studied in depth in Module 2.

## 7. Semantic HTML

Angular templates are still HTML.

Prefer:

~~~html
<button type="button">Save</button>
~~~

for an action rather than using a clickable div.

Use:

- headings for headings
- buttons for actions
- links for navigation
- lists for lists
- form controls for input

Accessibility starts with good HTML.

## 8. Practical Example

Class:

~~~ts
export class ProfileCardComponent {
  name = 'Aarav';
  role = 'Angular Developer';
  location = 'India';
}
~~~

Template:

~~~html
<article class="profile-card">
  <h2>{{ name }}</h2>
  <p>{{ role }}</p>
  <p>{{ location }}</p>
  <button type="button">View Profile</button>
</article>
~~~

Styles:

~~~scss
.profile-card {
  max-width: 24rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
}
~~~

We have not introduced services, HTTP, RxJS, state management or routing because this component does not need them.

## Common Mistakes

- Putting all component CSS globally.
- Using non-semantic HTML for actions.
- Making templates unnecessarily complex.
- Putting too much business logic in templates.
- Ignoring component responsibility.

## Hands-on Practice

Create:

~~~text
ProfileCard
ProfileHeader
ProfileFooter
~~~

Give each:

- A template
- Component-specific styles
- A clear responsibility

Use interpolation to display at least two class properties.

## Interview Questions

### What is an Angular template?

The HTML-based view associated with a component.

### What are component styles?

Styles associated with a component's UI.

### What is interpolation?

Angular template syntax that evaluates an expression and displays its result as text, such as {{ title }}.

### Why use semantic HTML?

It improves meaning, accessibility, maintainability and expected browser behavior.

## Assignment

Build a Profile Card containing:

- Name
- Role
- Location
- Short description
- View Profile button

Requirements:

- Standalone component.
- Separate template.
- Separate styles.
- At least three class properties.
- Interpolation.
- Semantic HTML.

## Self Check

Explain:

- Component class
- Template
- Component styles
- Global styles
- Interpolation at a basic level
- Semantic HTML

## Day 5 Outcome

Your components now have meaningful UI and styling.

Next: **Angular Application Flow**.
