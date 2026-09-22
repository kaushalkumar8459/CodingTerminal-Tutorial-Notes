---
title: First Mini Project - Personal Profile App
slug: day-007-first-mini-project-profile-app
dayLabel: Day 7
level: Beginner
estimatedMinutes: 120
order: 7
track: angular
youtubeVideos: []
---

# Day 7 [Beginner]: First Mini Project — Personal Profile App

## Goal

Build your first small Angular application using only concepts learned in Days 1–6.

## Project Rule

Do not introduce advanced concepts simply to make the project larger.

Not required yet:

- Routing
- Services
- HTTP
- RxJS
- State management
- Authentication
- Complex directives
- Micro Frontends

These topics have dedicated places later in the roadmap.

## Project Requirements

Build:

~~~text
Personal Profile App
│
├── Header
├── Profile Card
├── Skills
├── About
└── Footer
~~~

Display:

- Name
- Professional title
- Location
- Short introduction
- Skills
- Contact information
- Footer

## 1. Create the Project

If you are continuing from previous days, use your existing project.

Otherwise:

~~~bash
ng new angular-profile-app
cd angular-profile-app
ng serve
~~~

Use the modern standalone Angular approach.

## 2. Generate Components

~~~bash
ng g c profile-header
ng g c profile-card
ng g c skills
ng g c about
ng g c profile-footer
~~~

Keep each component focused.

## 3. Profile Header

Example:

~~~html
<header>
  <h1>CodingTerminals</h1>
  <p>Angular Learning Journey</p>
</header>
~~~

Add component-specific styling.

## 4. Profile Card

Class:

~~~ts
export class ProfileCardComponent {
  name = 'Angular Learner';
  role = 'Frontend Developer';
  location = 'India';
  introduction = 'Learning modern Angular step by step.';
}
~~~

Template:

~~~html
<article class="profile-card">
  <h2>{{ name }}</h2>
  <p>{{ role }}</p>
  <p>{{ location }}</p>
  <p>{{ introduction }}</p>
</article>
~~~

Interpolation is used because the UI needs to display component data.

## 5. Skills

For this first project, keep the skills explicit:

~~~ts
export class SkillsComponent {
  skillOne = 'Angular';
  skillTwo = 'TypeScript';
  skillThree = 'HTML';
  skillFour = 'CSS';
}
~~~

Template:

~~~html
<section>
  <h2>Skills</h2>
  <ul>
    <li>{{ skillOne }}</li>
    <li>{{ skillTwo }}</li>
    <li>{{ skillThree }}</li>
    <li>{{ skillFour }}</li>
  </ul>
</section>
~~~

We intentionally do not introduce @for yet. Modern control flow belongs to the next appropriate module.

## 6. About

Example:

~~~html
<section>
  <h2>About</h2>
  <p>I am learning to build modern web applications with Angular.</p>
</section>
~~~

## 7. Footer

Example:

~~~html
<footer>
  <p>Angular Fundamentals — Day 7</p>
</footer>
~~~

## 8. Compose the Application

The root component imports the standalone components it uses.

Conceptually:

~~~ts
@Component({
  selector: 'app-root',
  imports: [
    ProfileHeaderComponent,
    ProfileCardComponent,
    SkillsComponent,
    AboutComponent,
    ProfileFooterComponent
  ],
  templateUrl: './app.html'
})
export class AppComponent {}
~~~

The root template:

~~~html
<app-profile-header />

<main>
  <app-profile-card />
  <app-skills />
  <app-about />
</main>

<app-profile-footer />
~~~

Exact generated filenames/import paths depend on Angular CLI configuration.

## 9. Styling

Keep component-owned styles with their components.

Example:

~~~scss
.profile-card {
  max-width: 30rem;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
}
~~~

Use semantic HTML.

## 10. Verify

Run:

~~~bash
ng serve
~~~

Check the browser.

Then:

~~~bash
ng build
~~~

Fix all compilation errors before considering the project complete.

## 11. Project Structure

Conceptually:

~~~text
src/
└── app/
    ├── profile-header/
    ├── profile-card/
    ├── skills/
    ├── about/
    ├── profile-footer/
    └── app.*
~~~

Do not create services, stores, guards, interceptors or API clients. There is no requirement for them yet.

## 12. What You Have Learned

~~~text
Angular
  ↓
Standalone Components
  ↓
Templates
  ↓
Component Styles
  ↓
Interpolation
  ↓
Component Composition
  ↓
Application Bootstrap
~~~

This is enough to build a small static component-based application.

## 13. Why We Stop Here

The application now creates natural questions:

> How do I navigate to another screen?

That creates the reason for **Routing**.

> How do I pass data from one component to another?

That creates the reason for **Component Communication**.

> How do I share logic?

That creates the reason for **Services and Dependency Injection**.

> How do I load data from a backend?

That creates the reason for **HTTP**.

Those topics belong later.

## Final Challenge

Improve the profile application with:

- Professional layout
- Profile image placeholder
- Skills section
- About section
- Contact information
- Responsive CSS
- Semantic HTML

Do not add external libraries.

## Interview Questions

### Why use multiple components?

They give UI areas clear responsibilities and make the application easier to understand and maintain.

### Why use standalone components?

They allow components to declare template dependencies directly without requiring NgModules.

### Why use component-specific styles?

They keep presentation close to the UI responsibility and reduce accidental global styling.

### Why did we not use a service?

The project has no shared business logic or data-access requirement yet.

### Why did we not use routing?

The project is a single screen, so routing is not required.

### Why did we not use RxJS?

There is no asynchronous stream problem in this project.

## Module Assessment

You should be able to explain:

- Angular
- Angular CLI
- Node.js
- npm
- Angular project structure
- main.ts
- index.html
- bootstrapApplication
- Components
- Standalone components
- Selectors
- Templates
- Component styles
- Global styles
- Interpolation
- Component composition

You should also be able to:

- Create an Angular application.
- Generate components.
- Import standalone components.
- Compose a page.
- Use interpolation.
- Add component styles.
- Run the development server.
- Build the application.

## Module 1 Final Assignment

Create a polished **Personal Profile App** from scratch.

### Required Components

~~~text
App
├── ProfileHeader
├── ProfileCard
├── Skills
├── About
└── ProfileFooter
~~~

### Technical Requirements

- Standalone components.
- Separate templates where appropriate.
- Component-specific styles.
- Interpolation.
- Semantic HTML.
- No unnecessary third-party libraries.
- No RxJS.
- No state-management library.
- No HTTP.
- No routing.

### Acceptance Criteria

- [ ] Application starts with ng serve.
- [ ] Production build succeeds with ng build.
- [ ] All required components render.
- [ ] Components have clear responsibilities.
- [ ] Standalone component approach is used.
- [ ] Component data is displayed through interpolation.
- [ ] Styling is organized sensibly.
- [ ] HTML is semantic.
- [ ] No unnecessary architecture is introduced.

## Module 1 Completion

You should now be able to say:

> I can create a modern Angular application, understand its basic structure, create standalone components, build their templates and styles, compose components into a page, and explain how the application starts.

## Next Module

**Module 2 — Templates & Data Binding**

The natural next question is:

> How do I make the UI display and respond to changing data?

That creates the reason to learn:

- Interpolation in depth
- Property binding
- Attribute binding
- Class binding
- Style binding
- Event binding
- Two-way binding
- Template expressions
- Binding best practices
