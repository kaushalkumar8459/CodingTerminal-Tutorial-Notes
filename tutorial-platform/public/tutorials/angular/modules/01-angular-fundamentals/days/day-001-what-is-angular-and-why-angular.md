---
title: What is Angular and Why Angular?
slug: day-001-what-is-angular-and-why-angular
dayLabel: Day 1
level: Beginner
estimatedMinutes: 60
order: 1
track: angular
youtubeVideos: []
---

# Day 1 [Beginner]: What is Angular and Why Angular?

## Goal

By the end of this lesson, you should be able to:

- Explain what Angular is and why it is used.
- Understand the difference between Angular and plain JavaScript.
- Explain what a framework provides.
- Understand the role of components and templates.
- Recognize the major Angular concepts you will learn later.
- Understand why this course introduces concepts only when the application needs them.

## Prerequisites

- Basic HTML
- Basic CSS
- Basic JavaScript
- A code editor such as VS Code
- Basic understanding of how a browser displays a web page

No previous Angular experience is required.

---

## 1. What is Angular?

Angular is a web application framework for building frontend applications.

It provides an integrated approach for building applications with:

- Components
- Templates
- Routing
- Forms
- Dependency Injection
- HTTP communication
- Reactive state
- Validation
- Testing
- Development and build tooling

A simple mental model:

    HTML + CSS + JavaScript
              ↓
            Angular
              ↓
      Structured web application

Angular does not replace HTML, CSS, or JavaScript. It provides structure and tools around them so that larger applications can be built and maintained more systematically.

---

## 2. Why Do We Need Angular?

A small page can easily be built with HTML and JavaScript:

    <button id="counterButton">Click</button>
    <p id="counterValue">0</p>

    <script>
      let count = 0;

      document
        .getElementById("counterButton")
        .addEventListener("click", () => {
          count++;
          document.getElementById("counterValue").textContent = count;
        });
    </script>

This works.

The problem becomes more visible when the application grows.

Imagine an application with:

- 50 screens
- Login and logout
- User permissions
- Multiple forms
- API calls
- Search and filters
- Tables
- Dialogs
- Notifications
- Navigation
- Complex business rules
- Multiple developers

Angular gives the application a consistent structure for handling these kinds of requirements.

The important idea is:

> Angular is most valuable when we are building an application, not just a single web page.

---

## 3. What Does a Framework Give Us?

Without a framework, developers may have to select and organize many pieces themselves:

    UI rendering
    Routing
    Forms
    Validation
    HTTP
    Dependency management
    Application structure
    Testing
    Build tooling

Angular provides an integrated platform for these concerns.

Think of it as:

    Angular
    ├── Components
    ├── Templates
    ├── Routing
    ├── Forms
    ├── Dependency Injection
    ├── HTTP
    ├── Reactivity
    ├── Testing
    └── Build tooling

A framework does not automatically make bad application design good. Developers still need to choose sensible boundaries and write maintainable code.

---

## 4. Angular vs JavaScript

Angular does not replace JavaScript.

Angular applications are primarily developed using:

- TypeScript
- HTML
- CSS

TypeScript builds on JavaScript, while Angular provides the application framework.

A simplified learning model is:

    JavaScript
        ↓
    TypeScript
        ↓
     Angular
        ↓
    Web application

This is a learning model rather than a strict dependency diagram.

### Plain JavaScript

You may manually:

- Find DOM elements.
- Add event listeners.
- Update DOM content.
- Create elements.
- Remove elements.
- Manage application state.

### Angular

You organize the UI into components and describe the UI with templates. Angular handles much of the connection between application state and rendered UI.

We will learn the exact APIs later, when we have a practical reason to use them.

---

## 5. What is an Angular Component?

A component is a fundamental building block of an Angular application's user interface.

A component combines:

    Component
    ├── Class      → logic and state
    ├── Template   → UI
    └── Styles     → presentation

For example, a profile application could be divided into:

    Application
    │
    ├── Header
    ├── Profile
    │   ├── ProfileCard
    │   └── ProfileDetails
    └── Footer

Instead of one huge HTML page, the application can be organized into smaller UI responsibilities.

A conceptual component class might look like:

    export class WelcomeComponent {
      name = 'Angular Learner';
    }

Its template might display:

    <h1>Welcome, {{ name }}</h1>

We will learn how this works in detail during the next lessons.

---

## 6. Why Components Matter

Components help us divide an application into understandable pieces.

For a job portal, we might have:

    Job Portal
    │
    ├── Header
    ├── SearchBar
    ├── FilterPanel
    ├── JobList
    │   └── JobCard
    ├── Pagination
    └── Footer

This gives us clear responsibilities.

For example:

- SearchBar handles search UI.
- FilterPanel handles filter UI.
- JobList displays jobs.
- JobCard displays one job.
- Header provides application navigation.

Later, component communication will become necessary when these components need to exchange information. That is why communication is taught after component fundamentals.

---

## 7. Templates

A template describes the UI of a component.

Example:

    <h1>Welcome to CodingTerminals</h1>
    <p>Learn Angular step by step.</p>

Angular templates extend normal HTML with Angular template capabilities.

Later we will learn:

- Interpolation
- Property binding
- Event binding
- Two-way binding
- Built-in control flow
- Template expressions

For now, remember:

> The component class represents application logic and state, while the template describes what the user sees.

---

## 8. The Major Angular Building Blocks

Do not try to master all of these today. This is your course map.

### Components

Build reusable UI pieces.

Examples:

    LoginComponent
    ProfileComponent
    ProductCardComponent
    JobListComponent

### Templates

Describe component UI.

### Data Binding

Connect component state and the UI.

We will later learn:

- Interpolation
- Property binding
- Event binding
- Two-way binding

### Control Flow

Controls what is rendered.

Modern Angular provides built-in control flow such as:

    @if
    @for
    @switch

These will be introduced after templates and basic binding.

### Routing

Routing lets an application navigate between screens using URLs.

For example:

    /jobs
    /jobs/123
    /profile
    /settings

Routing will be introduced when our application has multiple screens and needs navigation.

### Services

Services provide reusable application logic and functionality.

Examples:

    UserService
    JobService
    NotificationService
    AuthService

We will introduce services after component fundamentals and communication, when shared logic becomes a real problem.

### Dependency Injection

Dependency Injection allows Angular to provide dependencies, such as services, to classes.

We will learn this together with services.

### Forms

Forms are used for collecting and validating user input.

Examples:

    Login
    Registration
    Profile
    Search
    Job Application

Forms will be introduced after templates, binding, and component fundamentals.

### HTTP

HTTP is used to communicate with backend APIs.

    Angular application
            ↓
          HTTP
            ↓
        Backend API
            ↓
         Database

HTTP will be introduced after the learner can build a UI that needs real backend data.

### Signals

Signals are Angular's modern reactive primitives for representing and deriving reactive state.

We will study signals in depth later rather than treating them as a syntax to memorize on Day 1.

---

## 9. Angular Application Mental Model

For now, remember this simplified flow:

    User
      ↓
    Component
      ↓
    State
      ↓
    Template
      ↓
    Browser UI

When the user interacts with the application, application state can change and Angular can update the UI accordingly.

Later, we will add more pieces:

    User
      ↓
    Component
      ↓
    Services / State
      ↓
    HTTP API
      ↓
    Backend
      ↓
    Data
      ↓
    UI

Do not worry about implementing this yet.

---

## 10. Angular and the Browser

The browser understands web technologies such as:

- HTML
- CSS
- JavaScript

Angular applications are developed using TypeScript, templates, and styles. Angular's tooling processes the application so that it can run in the browser.

A simplified development flow is:

    Developer
       ↓
    TypeScript + HTML + CSS
       ↓
    Angular tooling
       ↓
    Browser application
       ↓
    Browser

The browser ultimately executes the application's generated JavaScript and renders the resulting HTML and CSS.

---

## 11. Modern Angular

This course focuses on modern Angular development.

Primary patterns will include:

- Standalone components
- Modern built-in control flow
- Signal-based reactivity
- Signal inputs and outputs
- Signal-based queries
- Modern dependency injection with inject
- Modern Angular tooling
- Modern testing practices

Older Angular patterns are still important when maintaining existing applications, so legacy APIs will be covered later for maintenance and interview knowledge.

The learning rule is:

> Learn modern Angular first. Learn legacy Angular when there is a reason to understand existing code.

---

## 12. Learn by Problem, Not by API

This is the most important rule of this course.

We will not introduce a feature simply because Angular has that feature.

We introduce it when the application creates a problem.

### Need: Display information

Learn:

    Component
    ↓
    Template
    ↓
    Interpolation

### Need: React to a button click

Learn:

    Event binding

### Need: Pass data from one component to another

Learn:

    Component inputs and outputs

### Need: Move between screens

Learn:

    Routing

### Need: Share business logic

Learn:

    Services
    ↓
    Dependency Injection

### Need: Build a user form

Learn:

    Forms
    ↓
    Validation

### Need: Load backend data

Learn:

    HTTP

### Need: Manage reactive state

Learn:

    Signals

This prevents beginners from memorizing APIs without understanding their purpose.

---

## 13. Course Dependency Order

The core Angular path follows this dependency order:

    Angular Fundamentals
            ↓
    Templates & Data Binding
            ↓
    Control Flow & Rendering
            ↓
    Routing & Navigation
            ↓
    Component Communication
            ↓
    Directives & Pipes
            ↓
    Component Composition
            ↓
    Services & Dependency Injection
            ↓
    Lifecycle
            ↓
    Signals & Reactivity
            ↓
    Forms
            ↓
    HTTP & API Integration
            ↓
    Authentication & Authorization
            ↓
    Complete Angular Project

Only after the complete core Angular path will we go deeply into:

    TypeScript
    RxJS
    State Management
    Testing
    Performance
    SSR / SSG / Hydration
    Security
    Enterprise Architecture
    Micro Frontends

This separation is intentional.

---

# Practical Example: Job Portal

Imagine we are building a job portal.

The first screen might contain:

    Job Portal
    │
    ├── Header
    ├── Search
    ├── Filters
    ├── Job List
    │   ├── Job Card
    │   ├── Job Card
    │   └── Job Card
    └── Footer

At this stage, we only need to understand the UI structure.

Later, when we need:

- Clicking Apply → event binding
- Passing job information → component communication
- Moving to job details → routing
- Loading jobs from a server → HTTP
- Sharing user information → service/state
- Login → authentication
- Validating application information → forms

Each new requirement gives us a reason to learn another Angular feature.

---

# Hands-on Exercise

Do not create an Angular project yet.

Today is about understanding the foundation.

## Exercise 1: Break a Website into Components

Choose any application you use regularly:

- Shopping website
- Banking website
- Job portal
- Learning platform
- Video platform

Break one screen into possible components.

Example:

    Job Portal
    │
    ├── Header
    ├── SearchBar
    ├── FilterPanel
    ├── JobList
    │   └── JobCard
    ├── Pagination
    └── Footer

Answer:

1. Which components are reusable?
2. Which component represents the screen?
3. Which components display data?
4. Which components contain user interaction?

## Exercise 2: Identify the Future Angular Feature

For each requirement, identify the Angular concept that will eventually help.

1. Display a user's name.
2. Respond to a button click.
3. Move from Home to Profile.
4. Pass a user object to a child component.
5. Share user-related business logic.
6. Submit a registration form.
7. Load users from a backend.
8. Maintain reactive UI state.

Expected concepts:

    1 → Template / interpolation
    2 → Event binding
    3 → Routing
    4 → Component inputs
    5 → Services / Dependency Injection
    6 → Forms
    7 → HTTP
    8 → Signals

Do not implement them yet.

---

# Common Mistakes

## 1. Thinking Angular is a programming language

Angular is a framework.

You primarily use TypeScript, HTML, and CSS to build Angular applications.

## 2. Trying to learn every Angular API immediately

Angular has many APIs.

Do not memorize everything.

Learn each concept when the project creates a reason to use it.

## 3. Confusing Angular with AngularJS

Angular and AngularJS are different generations of Google's web frameworks.

This course focuses on modern Angular.

## 4. Starting with advanced architecture

Do not start a beginner project with:

- Micro Frontends
- Complex state management
- Enterprise architecture
- Multiple abstraction layers

First learn to build a complete Angular application.

## 5. Ignoring HTML, CSS, and JavaScript

Angular builds on web fundamentals.

Strong Angular developers still need strong HTML, CSS, and JavaScript knowledge.

## 6. Copying code without understanding the problem

Do not memorize APIs simply because they appear in a tutorial.

Always ask:

> What problem does this solve?

---

# Interview Questions

## 1. What is Angular?

Angular is a frontend web application framework used to build structured and maintainable web applications. It provides capabilities such as components, templates, routing, forms, dependency injection, HTTP communication, reactivity, testing, and development tooling.

## 2. Is Angular a programming language?

No. Angular is a framework. Angular applications are primarily developed using TypeScript, HTML, and CSS.

## 3. Why do we use Angular?

Angular provides an integrated structure and tools for building applications with reusable components, navigation, forms, dependency injection, HTTP communication, reactive state, testing, and other application-level capabilities.

## 4. What is a component?

A component is a fundamental building block of an Angular user interface. It combines a class containing application logic/state, a template describing the UI, and styling.

## 5. Does Angular replace JavaScript?

No. Angular does not replace JavaScript. Angular applications use TypeScript, which builds on JavaScript, together with HTML and CSS.

## 6. What is the difference between a framework and a library?

A library generally provides functionality that application code calls when needed. A framework provides a broader structure and set of conventions/capabilities for building an application.

The exact distinction can vary by ecosystem.

## 7. What are some major Angular features?

Major capabilities include:

- Components
- Templates
- Routing
- Forms
- Dependency Injection
- HTTP
- Signals and reactivity
- Testing
- Build tooling

## 8. What should a beginner learn first in Angular?

Start with fundamentals, components, templates, data binding, control flow, routing, and component communication. Then progressively introduce services, lifecycle, signals, forms, HTTP, authentication, and larger application architecture.

---

# Assessment Quiz

### Q1. Angular is primarily:

A. A database  
B. A frontend web application framework  
C. An operating system  
D. A programming language

**Answer:** B

### Q2. What is a fundamental building block of an Angular UI?

A. Component  
B. Database  
C. Server  
D. Git branch

**Answer:** A

### Q3. Which technologies are commonly used to build Angular applications?

A. TypeScript, HTML, CSS  
B. SQL only  
C. Java only  
D. Python only

**Answer:** A

### Q4. What problem does Angular help solve?

A. Organizing and building maintainable web applications  
B. Replacing the operating system  
C. Designing computer hardware  
D. Creating database servers

**Answer:** A

### Q5. Which Angular feature is used for navigation between application views?

A. Routing  
B. CSS  
C. npm  
D. Git

**Answer:** A

### Q6. Which feature is commonly used for reusable application logic?

A. Services  
B. CSS selectors  
C. HTML comments  
D. package-lock.json

**Answer:** A

### Q7. Why should beginners learn concepts progressively?

A. To connect each API to a real application problem  
B. To avoid writing code  
C. Because Angular has no documentation  
D. Because components are optional

**Answer:** A

---

# Assignment

Create a document named:

    day-001-angular-notes.txt

Answer these questions in your own words:

1. What is Angular?
2. Why do we need a frontend framework?
3. How is Angular different from plain JavaScript?
4. What is a component?
5. What is a template?
6. What is routing?
7. Why are services useful?
8. Why should beginners not start with advanced architecture?
9. List five major Angular capabilities.
10. Draw the component structure of a website you use.

## Acceptance Criteria

- [ ] Explain Angular without copying the definition.
- [ ] Explain what a component represents.
- [ ] Identify at least five Angular capabilities.
- [ ] Explain why routing is useful.
- [ ] Explain why services are useful.
- [ ] Break a real application screen into components.
- [ ] Explain why concepts should be learned according to application needs.

---

# Self Check

Before moving to Day 2, you should be able to explain:

- What Angular is
- Why Angular exists
- Angular vs JavaScript
- What a framework provides
- What a component is
- What a template is
- Why applications are divided into components
- What routing is
- What services are
- What forms are
- What HTTP is used for
- What Signals are at a high level
- Why concepts are introduced progressively

If you cannot explain these concepts without looking at the notes, review this lesson before continuing.

---

# Quick Revision

- Angular → frontend web application framework.
- TypeScript → primary language used for Angular application development.
- Component → fundamental UI building block.
- Template → describes a component's UI.
- Routing → navigation between application views and URLs.
- Service → reusable application logic or functionality.
- Forms → collect and validate user input.
- HTTP → communicate with backend APIs.
- Signals → modern Angular reactive state primitives.
- Framework → provides broader application structure and capabilities.

---

# Day 1 Outcome

You have not built an Angular application yet, and that is intentional.

You have built the mental foundation needed to understand why Angular exists.

The core mental model is:

    Problem
      ↓
    Large frontend application
      ↓
    Need structure + reusable UI + application capabilities
      ↓
    Angular
      ↓
    Components + Templates + Routing + Services + Forms + HTTP + Reactivity

## Next Day

**Day 2: Angular Development Environment & First Project**

We will now have a reason to create an Angular application.

You will learn:

- Node.js and npm's role
- Angular CLI
- Creating your first Angular application
- Running the development server
- Understanding the generated application at a high level
- Seeing your first Angular component running in the browser

We will not go deep into every generated file yet. Those files will be introduced when the learner has a reason to understand them.
